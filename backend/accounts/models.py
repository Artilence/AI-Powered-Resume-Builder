from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
   

    def create_user(self, username, email, password=None):
    #    Creates customUser 
        if not username:
            raise ValueError("Users must have a username.")
        if not email:
            raise ValueError("Users must have an email address.")

        email = self.normalize_email(email)
        user = self.model(
            username=username,
            email=email
        )
        user.set_password(password)  # hashes the password
        user.save(using=self._db)
        return user
    '''   
     FOR FUTURE IF WE ADD ADMIN USER
     def create_superuser(self, username, email, password=None):
      
         user = self.create_user(
            username=username,
            email=email,
            password=password
         )
        
         # If you eventually add is_staff/is_superuser fields, set them here:
        # user.is_staff = True
         # user.is_superuser = True
        user.save(using=self._db)
         return user
    '''

class CustomUser(AbstractBaseUser):
    """
    Custom user model with:
      - id (AutoField)
      - username (unique)
      - email (unique)
      - password (from AbstractBaseUser)
      - datejoined (auto_add)
      - updated_at (auto_now)
    """
    id = models.AutoField(primary_key=True)
    username = models.CharField( unique=True)
    email = models.EmailField(unique=True)
    datejoined = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # AbstractBaseUser includes:
    # - password
    # - last_login (optional)
    # - helper methods for authentication

    objects = CustomUserManager()

    # By default, AbstractBaseUser requires that you define a username field
    USERNAME_FIELD = 'username'  # Could also be 'email' if you want email login
    REQUIRED_FIELDS = ['email']  # Fields required when creating a superuser

    def save(self, *args, **kwargs):
      
        self.email = self.email.lower()
        self.username = self.username.lower()
        super(CustomUser, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.email})"