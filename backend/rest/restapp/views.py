from django.shortcuts import render
from django.http import HttpResponse
import base64, re, json, hmac, hashlib, os

# generates secret key to be used in all encryptions
secret_key = os.urandom(64)

"""
    Base64 encoder and decoder for the JWT
"""

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


def teste(request):
    return HttpResponse("Hello world!")

def login(request):
    print(request)
    return "logged"