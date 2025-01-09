from django.db import models
from .profile import Profile 

class Education(models.Model):
    userprofile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='education')  
    institution = models.CharField(max_length=255,null=False,blank=False)  
    degree = models.CharField(max_length=255,null=False,blank=False) 
    description = models.TextField(blank=True, null=True)  
    start_date = models.DateField(null=False,blank=False)  
    end_date = models.DateField(null=True, blank=True) 

    def __str__(self):
        return f"{self.degree} from {self.institution} ({self.start_date} - {self.end_date if self.end_date else 'Present'})"

    class Meta:
        verbose_name = "Education"
        verbose_name_plural = "Educations"
