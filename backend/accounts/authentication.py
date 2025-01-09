from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken
from .models import User

class CookieJWTAuthentication(BaseAuthentication):
    """
    Custom authentication for cookie-based JWT.
    Validates access tokens from cookies and returns the authenticated user.
    """

    def authenticate(self, request):
        # Extract tokens from cookies
        access_token = request.COOKIES.get('access_token')

        if not access_token:
            return None  # No token found, user is unauthenticated

        try:
            # Decode and validate the access token
            validated_token = AccessToken(access_token)
            user_id = validated_token['user_id']

            # Retrieve and return the user
            user = User.objects.get(id=user_id)
            return (user, validated_token)

        except User.DoesNotExist:
            raise AuthenticationFailed("User not found.")

        except Exception:
            raise AuthenticationFailed("Invalid or expired token.")
