from rest_framework import serializers
from ..models.profile import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user', 'profile_name', 'profile_picture', 'name', 'position', 
                  'phone', 'email', 'address', 'summary', 'created_at', 'updated_at']

    # Optional: Add custom validation or methods for the fields if necessary
    def validate_phone(self, value):
        if len(value) < 10:
            raise serializers.ValidationError("Phone number must be at least 10 digits.")
        return value

    def validate_email(self, value):
        if '@' not in value or '.' not in value:
            raise serializers.ValidationError("Please provide a valid email address.")
        return value
    
       
