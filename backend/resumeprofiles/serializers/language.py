from rest_framework import serializers
from ..models import Language,ProfileLanguage,Profile

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['id', 'name']

    # Validate 'name' field to ensure it's not empty and is unique
    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError("Language name is required.")
        if len(value) < 2:
            raise serializers.ValidationError("Language name must be at least 2 characters long.")
        return value

class ProfileLanguageSerializer(serializers.ModelSerializer):
    # Adding nested serializers for 'profile' and 'language' if you want to include full details, 
    # otherwise you can just use the primary key fields
    profile = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all())
    language = serializers.PrimaryKeyRelatedField(queryset=Language.objects.all())

    class Meta:
        model = ProfileLanguage
        fields = ['id', 'profile', 'language', 'proficiency']

    # Validate 'profile' field
    def validate_profile(self, value):
        if not value:
            raise serializers.ValidationError("Profile is required.")
        return value

    # Validate 'language' field
    def validate_language(self, value):
        if not value:
            raise serializers.ValidationError("Language is required.")
        return value

    # Validate 'proficiency' field (optional, but ensure it's not too short if provided)
    def validate_proficiency(self, value):
        if value and len(value) < 3:
            raise serializers.ValidationError("Proficiency level should be at least 3 characters long.")
        return value

    # Optional: Validate the uniqueness of the combination of profile and language if necessary
    def validate(self, data):
        profile = data.get('profile')
        language = data.get('language')
        # Ensure the combination of profile and language is unique
        if ProfileLanguage.objects.filter(profile=profile, language=language).exists():
            raise serializers.ValidationError("This profile already has this language.")
        return data