from django.db import models
from .profile import Profile 

class Skill(models.Model):
    name = models.CharField(max_length=255,unique=True)  
    

    def __str__(self):
        return self.name


# Junction table
class ProfileSkill(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='profile_skills')  # ForeignKey to Profile
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='profile_skills')  # ForeignKey to Skill
    proficiency = models.CharField(max_length=50, blank=True, null=True)  # Example additional field (proficiency level)

    def __str__(self):
        return f"{self.profile.user.username} - {self.skill.name} - {self.proficiency}"

    class Meta:
        verbose_name = "Profile Skill"
        verbose_name_plural = "Profile Skills"
        db_table = 'profile_skill'  # Custom table name
        ordering = ['profile', 'skill']  # Default ordering by profile and skill
