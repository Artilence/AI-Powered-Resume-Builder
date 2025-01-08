from django.db import models


from .profile import Profile

class Experience(models.Model):
    userprofile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='experiences', db_index=True)  # One-to-many relationship with Profile
    company = models.CharField(max_length=255) 
    start_date = models.DateField()  
    end_date = models.DateField()  
    position = models.CharField(max_length=100) 
    description = models.TextField() 

    def __str__(self):
        return f"{self.position} at {self.company} from {self.start_date} to {self.end_date if self.end_date else 'Present'}"
