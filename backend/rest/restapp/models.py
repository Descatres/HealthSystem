from django.db import models
import hashlib

class User(models.Model):
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
 
    def set_password(self, raw_password):
        self.password = hashlib.sha256(raw_password.encode('utf-8')).hexdigest()
        self.save()

    def check_password(self, raw_password):
        return self.password == raw_password
