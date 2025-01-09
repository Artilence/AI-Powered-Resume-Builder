from django.db import models
from .profile import Profile  

class Certification(models.Model):
    userprofile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='certifications',db_index=True)  # FK to Profile
    title = models.CharField(max_length=255,blank=False)
    organization = models.CharField(max_length=255,blank=False)  
    start_date=models.DateField(blank=True,null=True)
    end_date = models.DateField(null=True, null=True) 
    url = models.URLField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.title} issued by {self.issuer} on {self.issue_date}"

    class Meta:
        verbose_name = "Certification"
        verbose_name_plural = "Certifications"
