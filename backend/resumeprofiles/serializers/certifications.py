from rest_framework import serializers
from ..models import Certification
from datetime import date

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ['id', 'profile', 'title', 'organization', 'start_date', 'end_date', 'url']

    # Validate the 'title' field
    def validate_title(self, value):
        if not value:
            raise serializers.ValidationError("Certification title is required.")
        if len(value) < 3:
            raise serializers.ValidationError("Certification title must be at least 3 characters long.")
        return value

    # Validate the 'organization' field
    def validate_organization(self, value):
        if not value:
            raise serializers.ValidationError("Organization name is required.")
        if len(value) < 3:
            raise serializers.ValidationError("Organization name must be at least 3 characters long.")
        return value

    # Validate 'start_date' to ensure it's not in the future
    def validate_start_date(self, value):
        if value and value > date.today():
            raise serializers.ValidationError("Start date cannot be in the future.")
        return value

    # Validate 'end_date' (optional, but ensure it's after the start date if provided)
    def validate_end_date(self, value):
        start_date = self.initial_data.get('start_date')
        if value and start_date and value < start_date:
            raise serializers.ValidationError("End date cannot be earlier than the start date.")
        return value

    # Validate the 'url' field (optional, but ensure it's a valid URL if provided)
    def validate_url(self, value):
        if value and not value.startswith("http://") and not value.startswith("https://"):
            raise serializers.ValidationError("URL must start with 'http://' or 'https://'.")
        return value

    # General validation method for cross-field validation
    def validate(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        
        if start_date and end_date:
            if start_date > end_date:
                raise serializers.ValidationError("Start date cannot be later than end date.")
        
        return data
