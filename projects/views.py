from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer
from core.permissions import IsManager, IsOwnerOrAdmin

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    
    def get_queryset(self):
        user = self.request.user
        if getattr(user, 'role', '') == 'ADMIN':
            return Project.objects.all()
        if getattr(user, 'role', '') == 'USER':
            return Project.objects.filter(tasks__assigned_to=user).distinct()
        return Project.objects.filter(owner=user)

    def get_permissions(self):
        if self.action in ['create', 'destroy']:
            permission_classes = [permissions.IsAuthenticated, IsManager]
        elif self.action in ['update', 'partial_update']:
            permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
