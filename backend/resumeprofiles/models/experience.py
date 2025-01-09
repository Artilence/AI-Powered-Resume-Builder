from django.db import models


from .profile import Profile

class Experience(models.Model):
    userprofile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='experiences', db_index=True)  
    company = models.CharField(max_length=255,null=False,blank=False) 
    start_date = models.DateField(null=False,blank=False)  
    end_date = models.DateField(null=False,blank=False)  
    position = models.CharField(max_length=100,null=False,blank=False) 
    description = models.TextField(null=False,blank=False) 

    def __str__(self):
        return f"{self.position} at {self.company} from {self.start_date} to {self.end_date if self.end_date else 'Present'}"
    
    class Meta:
        verbose_name = "Experience"
        verbose_name_plural = "Experiences"