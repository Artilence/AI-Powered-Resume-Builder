from rest_framework import serializers
from ..models.experience import Experience
from datetime import date

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'userprofile', 'company', 'start_date', 'end_date', 'position', 'description']

    # Optional: Add custom validation or methods for the fields if necessary
    def validate_company(self, value):
        if not value:
            raise serializers.ValidationError("Company name cannot be empty.")
        return value

    def validate_position(self, value):
        if not value:
            raise serializers.ValidationError("Position cannot be empty.")
        return value

    def validate_start_date(self, value):
        if value > date.today():
            raise serializers.ValidationError("Start date cannot be in the future.")
        return value
