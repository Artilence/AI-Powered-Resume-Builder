from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.middleware.csrf import get_token
from rest_framework.response import Response
from ..models import User
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.tokens import AccessToken
from drf_spectacular.utils import extend_schema




# 2. Login View (Public)
# get access and refresh tokens 
@extend_schema(tags=['Authentication'])
class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    
    def post(self, request, *args, **kwargs):
        print('login view')
        response = super().post(request, *args, **kwargs)

        # Get tokens from response
        access_token = response.data['access']
        refresh_token = response.data['refresh']

        # Decode access token to extract user information
        decoded_token = AccessToken(access_token)
        user_id = decoded_token['user_id']

        # Fetch user from database
        user = User.objects.get(id=user_id)

        # Add user info to response data
        response.data['user'] = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }

        # Set HttpOnly cookies for tokens
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=False,  # Change to True in production
            samesite='Lax',
            max_age=300  # 5 minutes
        )
        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=86400  # 1 day
        )

        # Remove tokens from response body
        del response.data['access']
        del response.data['refresh']

        return response
    
# 3. Custom Refresh Serializer
# for validating refresh token from cookies
class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        request = self.context['request']
        refresh_cookie = request.COOKIES.get('refresh_token')  # Extract refresh token from cookies

        if refresh_cookie:
            # Inject the refresh token into the attrs for validation
            attrs['refresh'] = refresh_cookie  
            return super().validate(attrs)  # Continue default validation
        
        # If no refresh token is found in cookies, raise error
        raise ValidationError('No refresh token found in cookies')


# 4. Custom Refresh View
# for validating refresh token from cookies
# and returning a new access token
@extend_schema(tags=['Tokens Validation'])
class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        refresh_cookie = request.COOKIES.get('refresh_token')  # Extract refresh token from cookies
        
        # Pass the refresh token to serializer explicitly if available
        serializer = self.get_serializer(
            data={'refresh': refresh_cookie} if refresh_cookie else {}
        )

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            print('Validation error:', e.detail)
            return Response({"error": "Invalid or expired refresh token"}, status=status.HTTP_401_UNAUTHORIZED)

        # If successful, issue new access token
        new_access = serializer.validated_data['access']
        response = Response({"detail": "Token refreshed"})
        response.set_cookie(
            key='access_token',
            value=new_access,
            httponly=True,
            secure=False,  # Set to True for production
            samesite='Lax',
            max_age=300
        )
        return response




@extend_schema(tags=['Authentication'])
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        print('Refresh Token:\n', refresh_token)
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()  # Invalidate refresh token
                print('Token successfully blacklisted.')
            except ValidationError as e:
                print('Validation Error:', e.detail)
                return Response({"error": "Invalid or expired refresh token"}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print('Unexpected Error:', str(e))
                return Response({"error": "An error occurred during logout."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Remove both access and refresh tokens from cookies
        response = Response({"detail": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response
    
# 5. /me Endpoint (Protected User Data)
# get user data
@extend_schema(tags=['Tokens Validation'])
class MeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        print(request.user)
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })

    