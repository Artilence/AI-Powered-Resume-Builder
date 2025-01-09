from django.db import models
from .profile import Profile 

class SocialLink(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='social_links')  
    platform = models.CharField(max_length=100,blank=True,null=False)  
    url = models.URLField(blank=False,null=True)  

    def __str__(self):
        return f"{self.platform} - {self.url}"

    class Meta:
        verbose_name = "Social Link"
        verbose_name_plural = "Social Links"
