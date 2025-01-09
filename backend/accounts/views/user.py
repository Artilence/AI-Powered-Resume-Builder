from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import User
from ..serializers.user import UserSerializer
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import AllowAny  # Add this import for allowing anyone to create

# UserViewSet for handling CRUD operations on the User model
@extend_schema(tags=['User CRUD'])
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  # Get all users
    serializer_class = UserSerializer  # Use the UserSerializer for serialization

    # Set default permission classes for all actions
    permission_classes = [IsAuthenticated]  # Only authenticated users can access by default

    def get_permissions(self):
        """
        Override get_permissions to apply different permission classes based on the action
        """
        if self.action == 'create':
            # Allow anyone to create a user
            return [AllowAny()]
        return super().get_permissions()  # For other actions, use IsAuthenticated

    def get_queryset(self):
        """
        Optionally restrict the returned users to the current authenticated user.
        """
        queryset = User.objects.all()
        # If you want to restrict users to their own data, uncomment the following:
        # return queryset.filter(id=self.request.user.id)
        return queryset

    def perform_create(self, serializer):
        # Add any custom logic for creating a user if needed (e.g., logging, custom actions)
        serializer.save()
    