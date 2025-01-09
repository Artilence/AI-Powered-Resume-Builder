from rest_framework import serializers
from ..models import Education
from datetime import date

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'userprofile', 'institution', 'degree', 'description', 'start_date', 'end_date']

    # Validate the 'institution' field (required)
    def validate_institution(self, value):
        if not value:
            raise serializers.ValidationError("Institution name is required.")
        if len(value) < 3:
            raise serializers.ValidationError("Institution name must be at least 3 characters long.")
        return value

    # Validate the 'degree' field (required)
    def validate_degree(self, value):
        if not value:
            raise serializers.ValidationError("Degree is required.")
        if len(value) < 3:
            raise serializers.ValidationError("Degree name must be at least 3 characters long.")
        return value

    # Validate the 'description' field (optional)
    def validate_description(self, value):
        if value and len(value) < 10:
            raise serializers.ValidationError("Description should be at least 10 characters long.")
        return value

    # Validate 'start_date' (required, ensure it's not in the future)
    def validate_start_date(self, value):
        if value > date.today():
            raise serializers.ValidationError("Start date cannot be in the future.")
        return value

    # Validate 'end_date' (optional, but ensure it's after the start date if provided)
    def validate_end_date(self, value):
        start_date = self.initial_data.get('start_date')
        if value and start_date and value < start_date:
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
