# views/user_views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import User
from ..serializers import UserSerializer
from drf_spectacular.utils import extend_schema
# UserViewSet for handling CRUD operations on the User model
@extend_schema(tags=['User CRUD'])
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  # Get all users
    serializer_class = UserSerializer  # Use the UserSerializer for serialization
    permission_classes = [IsAuthenticated]  # Only authenticated users can access

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
