from django.db import models
from django.contrib.auth import get_user_model  # Provides active User model (CUSTOM USER)

class Profile(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='profiles',db_index=True)  # One-to-many relationship with User
    profile_name = models.CharField(max_length=100,null=False,blank=False)  #Name of profile e.g:SOFTWARE ENGINEER
    profile_picture = models.TextField()  
    name= models.CharField(max_length=100,null=False,blank=False)
    position= models.CharField(max_length=100,null=False,blank=False)
    email = models.EmailField(null=False,blank=False)  
    phone = models.CharField(max_length=15,null=False,blank=False) 
    address = models.CharField(max_length=200,null=False,blank=False)
    summary = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)  

    def __str__(self):
        return f"{self.profile_name} - {self.user.username}"


    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"