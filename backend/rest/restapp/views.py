from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse,  JsonResponse
import base64, re, json, hmac, hashlib, os
from .models import User

# TODO ------------
import boto3
import json
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

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='your-region')
appointments_table = dynamodb.Table('Appointments')

@csrf_exempt
def create_appointment(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')
            speciality = data.get('speciality')
            doctor = data.get('doctor')
            date = data.get('date')
            time = data.get('time')

            # Validate the user exists
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return JsonResponse({'error': 'User does not exist'}, status=404)

            # Create appointment in DynamoDB
            appointment_id = str(uuid.uuid4())
            appointments_table.put_item(
                Item={
                    'appointment_id': appointment_id,
                    'user_id': user_id,
                    'speciality': speciality,
                    'doctor': doctor,
                    'date': date,
                    'time': time
                }
            )
            return JsonResponse({'message': 'Appointment created successfully'}, status=201)
        except ValueError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def get_appointments(request, user_id):
    if request.method == 'GET':
        try:
            # Validate the user exists
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return JsonResponse({'error': 'User does not exist'}, status=404)

            # Retrieve appointments from DynamoDB
            response = appointments_table.query(
                IndexName='user_id-index',  # Assuming a secondary index on user_id
                KeyConditionExpression=boto3.dynamodb.conditions.Key('user_id').eq(user_id)
            )
            appointments = response.get('Items', [])
            return JsonResponse({'appointments': appointments}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)