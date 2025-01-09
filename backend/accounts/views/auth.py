from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from ..models import User
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken
from drf_spectacular.utils import extend_schema
from ..serializers.views import CustomTokenRefreshSerializer, LogoutSerializer, MeSerializer



# Authenticate user and return access and refresh tokens
@extend_schema(
    tags=['Authentication'],
    description="Authenticate user and return access and refresh tokens in cookies."
)
class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        try:
            # Extract tokens from response
            access_token = response.data['access']
            refresh_token = response.data['refresh']

            # Decode access token to extract user information
            decoded_token = AccessToken(access_token)
            user_id = decoded_token['user_id']

            # Fetch user
            user = User.objects.get(id=user_id)

            # Add user info to response
            response.data['user'] = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }

            # Set cookies
            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,  # Change to True in production
                samesite='Lax',
                max_age=300
            )
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='Lax',
                max_age=86400
            )

            # Remove tokens from response body
            del response.data['access']
            del response.data['refresh']

        except Exception as e:
            print(f"Error during login: {e}")
            return Response(
                {"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return response
  


@extend_schema(
    tags=["Authentication"],
    description="Refresh access token using the refresh token stored in cookies.",
    responses={
        200: {"description": "New access token issued."},
        401: {"description": "Invalid or expired refresh token."},  # Explicitly document 401
    }
)
class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]
    serializer_class = CustomTokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        refresh_cookie = request.COOKIES.get('refresh_token')
        serializer = self.get_serializer(
            data={'refresh': refresh_cookie} if refresh_cookie else {}
        )

        try:
            serializer.is_valid(raise_exception=True)
            new_access = serializer.validated_data['access']

            response = Response({"detail": "Token refreshed."})
            response.set_cookie(
                key='access_token',
                value=new_access,
                httponly=True,
                secure=True,
                samesite='Lax',
                max_age=300
            )
            return response

        except ValidationError as e:
            print(f"Validation error: {e.detail}")
            return Response({"error": "Invalid or expired refresh token."}, status=status.HTTP_401_UNAUTHORIZED)




# Logout user and remove tokens from cookies
@extend_schema(
    tags=['Authentication'],
    description="Logout the user by blacklisting the refresh token and clearing cookies."
)
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LogoutSerializer

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception as e:
                print(f"Error blacklisting token: {e}")
                return Response({"error": "Invalid or expired refresh token."}, status=status.HTTP_400_BAD_REQUEST)

        response = Response({"message": "Logout successful."}, status=status.HTTP_205_RESET_CONTENT)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response



# Get user data
# validate access token and return user data

class MeView(APIView):
    permission_classes = [IsAuthenticated]


    @extend_schema(
        tags=["User"],
        description="Retrieve the authenticated user's details.",
        responses={
            200: MeSerializer,  # Use the serializer for a successful response
            401: {"description": "Access token is missing or invalid."},  # Explicitly document 401
        }
    )
    def get(self, request):

        user = request.user
        serializer_class = MeSerializer
        serializer = MeSerializer(user)
        return Response(serializer.data)
