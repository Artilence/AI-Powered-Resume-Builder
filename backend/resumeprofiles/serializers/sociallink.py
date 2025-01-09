from rest_framework import serializers
from .models import SocialLink
import re

class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ['id', 'userprofile', 'platform', 'url']

    # Validate the 'platform' field to ensure it's not empty and has a reasonable length
    def validate_platform(self, value):
        if not value:
            raise serializers.ValidationError("Platform is required.")
        if len(value) < 3:
            raise serializers.ValidationError("Platform name must be at least 3 characters long.")
        return value

    # Validate the 'url' field to ensure it's a valid URL and not empty
    def validate_url(self, value):
        if not value:
            raise serializers.ValidationError("URL is required.")
        # Validate URL format using regex
        url_pattern = r"^(https?://)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$"
        if not re.match(url_pattern, value):
            raise serializers.ValidationError("Invalid URL format.")
        return value

    # Optional: Validate 'userprofile' field to ensure that a valid Profile is provided
    def validate_userprofile(self, value):
        if not value:
            raise serializers.ValidationError("User profile is required.")
        return value
