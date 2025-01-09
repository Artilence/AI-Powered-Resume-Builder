from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework.exceptions import ValidationError
from ..models import User

# Validate refresh token and return new access token
class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        request = self.context['request']
        refresh_cookie = request.COOKIES.get('refresh_token')  # Extract refresh token from cookies

        if not refresh_cookie:
            raise ValidationError(
                {'refresh': 'No refresh token found in cookies.'},
                code='no_refresh_token'
            )

        # Inject the refresh token into the attrs for validation
        attrs['refresh'] = refresh_cookie
        return super().validate(attrs)

# Logout user and remove tokens from cookies
class LogoutSerializer(serializers.Serializer):
    message = serializers.CharField(default="User logged out successfully.")

# Get user data
class MeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # Add more fields if needed
