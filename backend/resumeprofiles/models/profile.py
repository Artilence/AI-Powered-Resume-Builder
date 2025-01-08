from django.db import models
from django.contrib.auth import get_user_model  # Provides active User model (CUSTOM USER)

class Profile(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='profiles',db_index=True)  # One-to-many relationship with User
    profile_name = models.CharField(max_length=100)  #Name of profile e.g:SOFTWARE ENGINEER
    profile_picture = models.TextField()  
    name= models.CharField(max_length=100)
    position= models.CharField(max_length=100)
    phone = models.CharField(max_length=15) 
    email = models.EmailField()  
    address = models.CharField(max_length=200)
    summary = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the profile was created
    updated_at = models.DateTimeField(auto_now=True)  # Timestamp when the profile was last updated

    def __str__(self):
        return f"{self.profile_name} - {self.user.username}"
