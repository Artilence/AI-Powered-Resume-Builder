from django.db import models
from .profile import Profile

class Language(models.Model):
    name = models.CharField(max_length=255, unique=True)  

    def __str__(self):
        return self.name

# Junction table
class ProfileLanguage(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='profile_languages') 
    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='profile_languages') 
    proficiency = models.CharField(max_length=50, blank=True, null=True)  

    def __str__(self):
        return f"{self.profile.user.username} - {self.language.name} - {self.fluency_level}"

    class Meta:
        verbose_name = "Profile Language"
        verbose_name_plural = "Profile Languages"
        db_table = 'profile_language' 
        ordering = ['profile', 'language'] 
