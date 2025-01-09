from django.db import models
from .profile import Profile

class Hobby(models.Model):
    name = models.CharField(max_length=255,unique=True)  

    def __str__(self):
        return self.name

# JunctionTable 
class ProfileHobby(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='profile_hobbies')  # ForeignKey to Profile
    hobby = models.ForeignKey(Hobby, on_delete=models.CASCADE, related_name='profile_hobbies')  # ForeignKey to Hobby

    def __str__(self):
        return f"{self.profile.user.username} - {self.hobby.name} - {self.hobby_type}"

    class Meta:
        verbose_name = "Profile Hobby"
        verbose_name_plural = "Profile Hobbies"
        db_table = 'profile_hobby'  # Custom table name
        ordering = ['profile', 'hobby']  # Default ordering by profile and hobby
