from rest_framework import serializers
from ..models import Skill,ProfileSkill,Profile

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']

    # Validate 'name' field to ensure it's not empty and is unique
    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError("Skill name is required.")
        if len(value) < 2:
            raise serializers.ValidationError("Skill name must be at least 2 characters long.")
        return value

class ProfileSkillSerializer(serializers.ModelSerializer):
    # Adding nested serializers for 'profile' and 'skill' if you want to include full details, 
    # otherwise you can just use the primary key fields
    profile = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all())
    skill = serializers.PrimaryKeyRelatedField(queryset=Skill.objects.all())

    class Meta:
        model = ProfileSkill
        fields = ['id', 'profile', 'skill', 'proficiency']

    # Validate 'profile' field
    def validate_profile(self, value):
        if not value:
            raise serializers.ValidationError("Profile is required.")
        return value

    # Validate 'skill' field
    def validate_skill(self, value):
        if not value:
            raise serializers.ValidationError("Skill is required.")
        return value

    # Validate 'proficiency' field (optional, but ensure it's not too short if provided)
    def validate_proficiency(self, value):
        if value and len(value) < 3:
            raise serializers.ValidationError("Proficiency level should be at least 3 characters long.")
        return value

    # Optional: Validate the uniqueness of the combination of profile and skill if necessary
    def validate(self, data):
        profile = data.get('profile')
        skill = data.get('skill')
        # Ensure the combination of profile and skill is unique
        if ProfileSkill.objects.filter(profile=profile, skill=skill).exists():
            raise serializers.ValidationError("This profile already has this skill.")
        return data