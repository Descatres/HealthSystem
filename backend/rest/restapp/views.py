from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse,  JsonResponse
import base64, re, json, hmac, hashlib, os
from .models import User

# TODO ------------
import json
import boto3
import redis
import uuid
from django.conf import settings
# ------------

# generates secret key to be used in all encryptions
secret_key = os.urandom(64)

def decode_base64(data, altchars=b'+/'):
    data = re.sub(rb'[^a-zA-Z0-9%s]+' % altchars, b'', data)  # normalize
    missing_padding = len(data) % 4
    if missing_padding:
        data += b'='* (4 - missing_padding)
    return base64.b64decode(data, altchars)

def base64url_encode(input):
    stringAsBytes = input.encode('ascii')
    stringAsBase64 = base64.urlsafe_b64encode(stringAsBytes).decode('utf-8').replace('=','')
    return stringAsBase64 

"""
    Parameters: expiration timestamp, user ID, userrole
    
    Creates a "header" object with some conf, a "payload" object containing user info
    Generates a signature based on header & payload, using a secret key.
    Returns a base64 encoded triple-token with header . payload . signature
"""
def jwt_creator(expiration, userid, userrole):
    header = {
        "alg": "HS256",
        "typ": "JWT"
    }
    payload = {'expired': expiration,
               'userid': userid,
               'userrole': userrole
               }
      
    
    total_params = str(base64url_encode(json.dumps(header))) + '.' + str(base64url_encode(json.dumps(payload)))
    signature = hmac.new(secret_key, total_params.encode(), hashlib.sha1).hexdigest()
    token = total_params + '.' + str(base64url_encode(signature))
    return token

"""
    Parameters: JWT token, secret key
    Returns: true if jwt token was created by this secret key (verify signature)
"""
def jwt_verify(token, sk):
    client_signature = decode_base64(token.split('.')[2].encode())
    params = token.split('.')[0] + '.' + token.split('.')[1]
    
    aux_signature = hmac.new(sk, params.encode(), hashlib.sha1).hexdigest()

    return hmac.compare_digest(aux_signature.encode(), client_signature)

def authenticate(email, password):
    print(email, password)
    try:
        user = User.objects.get(email=email)
        print(user.email, user.password) 
        if user.check_password(password):
            print('user found')
            return user
    except User.DoesNotExist:
        return None
    return None

@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
        except ValueError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        
        user = authenticate(email=email, password=password)
        # print(user)
        if user is not None:
            expiration = '50000'
            userid = str(user.id)
            userrole = 'user'
            token = jwt_creator(expiration, userid, userrole)
            
            return JsonResponse({'token': token}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    


# TODO ------------

# Initialize Redis client
redis_client = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=settings.REDIS_DB)


@csrf_exempt
def create_appointment(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            patient = data.get('patient')
            specialty = data.get('specialty')
            doctor = data.get('doctor')
            datetime = data.get('datetime')
            paid = data.get('paid', False)

            appointment_id = str(uuid.uuid4())
            appointments.put_item(
                Item={
                    'appointment_id': appointment_id,
                    'specialty': specialty,
                    'doctor': doctor,
                    'datetime': datetime,
                    'paid': paid,
                    'patient': patient
                }
            )

            # Update availability
            update_availability(doctor, datetime)

            return JsonResponse({'message': 'Appointment created successfully'}, status=201)
        except ValueError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

def update_availability(doctor, datetime):
    date, time = datetime.split()
    availability.update_item(
        Key={'doctor': doctor},
        UpdateExpression='SET #times.#time = list_append(if_not_exists(#times.#time, :empty_list), :date)',
        ExpressionAttributeNames={
            '#times': 'times',
            '#time': time
        },
        ExpressionAttributeValues={
            ':date': [date],
            ':empty_list': []
        }
    )

@csrf_exempt
def get_appointments(request):
    if request.method == 'GET':
        try:
            response = appointments.scan()
            appointments = response.get('Items', [])
            return JsonResponse({'appointments': appointments}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def reserve_appointment_slot(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            doctor = data.get('doctor')
            date = data.get('date')
            time = data.get('time')
            reservation_key = f"{date}_{time}_{doctor}"

            if redis_client.exists(reservation_key):
                return JsonResponse({'error': 'Slot already reserved'}, status=409)

            redis_client.setex(reservation_key, 60, 'reserved')
            return JsonResponse({'message': 'Slot reserved for 60 seconds'}, status=200)
        except ValueError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def get_user_appointments(request, email):
    if request.method == 'GET':
        try:
            # Query DynamoDB to get appointments for the given email (patient)
            response = appointments.scan(
                FilterExpression=boto3.dynamodb.conditions.Attr('patient').eq(email)
            )
            appointments = response.get('Items', [])
            return JsonResponse({'appointments': appointments}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def availability(request):
    if request.method == 'GET':
        try:
            response = availability.scan()
            appointments = response.get('Items', [])
            availability = {}

            for appointment in appointments:
                doctor = appointment['doctor']
                datetime = appointment['datetime']
                date, time = datetime.split()

                if doctor not in availability:
                    availability[doctor] = {}

                if date not in availability[doctor]:
                    availability[doctor][date] = []

                availability[doctor][date].append(time)

            return JsonResponse({'availability': availability}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
@csrf_exempt
def pay_for_appointment(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            appointment_id = data.get('appointment_id')
            
            response = appointments.get_item(Key={'appointment_id': appointment_id})
            appointment = response.get('Item')

            if appointment:
                doctor = appointment['doctor']
                datetime = appointment['datetime']

                # Update appointment to mark as paid
                appointments.update_item(
                    Key={'appointment_id': appointment_id},
                    UpdateExpression='SET paid = :paid',
                    ExpressionAttributeValues={':paid': True}
                )

                # Update availability
                update_availability(doctor, datetime)

                return JsonResponse({'message': 'Payment successful, availability updated'}, status=200)
            else:
                return JsonResponse({'error': 'Appointment not found'}, status=404)
        except ValueError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)