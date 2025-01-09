from rest_framework import serializers
from ..models import Hobby,ProfileHobby,Profile


class HobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = ['id', 'name']

    # Validate 'name' field to ensure it's not empty and is unique
    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError("Hobby name is required.")
        if len(value) < 3:
            raise serializers.ValidationError("Hobby name must be at least 3 characters long.")
        return value


class ProfileHobbySerializer(serializers.ModelSerializer):
    # Adding nested serializers for 'profile' and 'hobby' if you want to include full details, 
    # otherwise you can just use the primary key fields
    profile = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all())
    hobby = serializers.PrimaryKeyRelatedField(queryset=Hobby.objects.all())

    class Meta:
        model = ProfileHobby
        fields = ['id', 'profile', 'hobby']

    # Validate 'profile' field
    def validate_profile(self, value):
        if not value:
            raise serializers.ValidationError("Profile is required.")
        return value

    # Validate 'hobby' field
    def validate_hobby(self, value):
        if not value:
            raise serializers.ValidationError("Hobby is required.")
        return value

    # Optional: Validate the uniqueness of the combination of profile and hobby if necessary
    def validate(self, data):
        profile = data.get('profile')
        hobby = data.get('hobby')
        # Ensure the combination of profile and hobby is unique
        if ProfileHobby.objects.filter(profile=profile, hobby=hobby).exists():
            raise serializers.ValidationError("This profile already has this hobby.")
        return data