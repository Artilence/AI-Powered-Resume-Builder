from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken
from .models import CustomUser


# Custom Auth Verification Class
# for cookie based authentication
# check if access token is valid and if it is, return the user
class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        
        access_token = request.COOKIES.get('access_token')
        refresh_token = request.COOKIES.get('refresh_token')
        
        # if no access token is found, return None
        if not access_token:
            return None  

        try:
            # validate the access token
            validated_token = AccessToken(access_token)
            user_id = validated_token['user_id']

            # Retrieve the user
            user = CustomUser.objects.get(id=user_id)
            return (user, validated_token)

        except Exception as e:
            # if the access token is invalid or expired, raise an authentication failed exception

            raise AuthenticationFailed('Invalid or expired token')
