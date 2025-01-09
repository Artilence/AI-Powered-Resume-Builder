from django.db import models
from .profile import Profile  

class Project(models.Model):
    userprofile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='projects',db_index=True)
    name = models.CharField(max_length=255,null=False,blank=False) 
    description = models.TextField(blank=True, null=True)  
    link = models.URLField(blank=True, null=True)  
    start_date = models.DateField(null=False,blank=False) 
    end_date = models.DateField(null=True, blank=True) 

    def __str__(self):
        return f"{self.name} - {self.userprofile.username} ({self.start_date} - {self.end_date if self.end_date else 'Present'})"

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"
