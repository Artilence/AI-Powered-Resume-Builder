from rest_framework import serializers
from ..models import Project
from datetime import date

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'profile', 'name', 'description', 'link', 'start_date', 'end_date']

    # Validate the 'name' field (required and at least 3 characters long)
    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError("Project name is required.")
        if len(value) < 3:
            raise serializers.ValidationError("Project name must be at least 3 characters long.")
        return value

    # Validate the 'start_date' field (ensure it's not in the future)
    def validate_start_date(self, value):
        if not value:
            raise serializers.ValidationError("Start Date is required.")
        if value > date.today():
            raise serializers.ValidationError("Start date cannot be in the future.")
        return value

    # Validate 'end_date' (optional, but ensure it's after the start date if provided)
    def validate_end_date(self, value):
        start_date = self.initial_data.get('start_date')  # Get the start date from the raw data
        if value:  # Only check if 'end_date' is provided
            if start_date and value < start_date:
                raise serializers.ValidationError("End date cannot be earlier than the start date.")
        return value

    # General validation method for cross-field validation (e.g., start_date < end_date)
    def validate(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        
        if start_date and end_date:
            if start_date > end_date:
                raise serializers.ValidationError("Start date cannot be later than end date.")
        
        return data
