from rest_framework import serializers
from .models import User  # Make sure to import CustomUser here
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db import IntegrityError, DatabaseError
import re

# CustomUser Serializer
# for creating a new custom user
class UserSerializer(serializers.ModelSerializer):
    # password is write only
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User  
        # fields to be serialized
        fields = ['id', 'username', 'email', 'password']

    # Validate username -> check if it's valid, not taken, etc.
    def validate_username(self, value):
        # check if username already exists
        if User.objects.filter(username=value).exists():
            raise ValidationError("Username already exists")
        # check if username length is at least 4
        if len(value) < 4:
            raise serializers.ValidationError("Username must be at least 4 characters long")
        # check if username contains only letters, numbers, and underscores
        if not re.match(r'^[a-zA-Z0-9_]+$', value):
            raise serializers.ValidationError("Username must contain only letters, numbers, and underscores")
        return value

    # Validate email -> check if it's valid and not already taken
    def validate_email(self, value):
        # check if email already exists
        if User.objects.filter(email=value):
            raise ValidationError("A user with this email already exists.")
        # check if email is valid
        try:
            validate_email(value)
        except ValidationError:
            raise serializers.ValidationError("Invalid email format.")
        return value

    # Validate password -> check password strength
    def validate_password(self, value):
        # check if password length is at least 8
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        # check if password contains at least one uppercase letter
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        # check if password contains at least one lowercase letter
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError("Password must contain at least one lowercase letter.")
        # check if password contains at least one digit
        if not re.search(r'\d', value):
            raise serializers.ValidationError("Password must contain at least one digit.")
        # check if password contains at least one special character
        if not re.search(r'[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]', value):
            raise serializers.ValidationError("Password must contain at least one special character.")
        return value

    # Create user -> use the custom manager to create a new user
    def create(self, validated_data):
        try:
            # Attempt to create user
            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password']
            )
            return user

        except IntegrityError as e:
            # Handle specific constraint violations
            if 'user.username' in str(e):
                raise serializers.ValidationError({"username": "This username is already taken."})
            if 'user.email' in str(e):
                raise serializers.ValidationError({"email": "This email is already taken."})
            raise serializers.ValidationError("A data integrity error occurred. Please try again.")

        except DatabaseError as e:
            # Handle general database issues
            raise serializers.ValidationError("A database error occurred. Please try again later.")

        except KeyError as e:
            # Handle missing fields in validated_data
            raise serializers.ValidationError({str(e): "This field is required."})

        except Exception as e:
            # Catch-all for any other unexpected errors
            raise serializers.ValidationError("An unexpected error occurred. Please contact support.")
