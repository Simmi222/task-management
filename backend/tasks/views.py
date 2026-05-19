from rest_framework import viewsets, permissions, status
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from .models import Task
from .serializers import TaskSerializer, TaskReadSerializer
from projects.models import Project
from core.permissions import IsTaskParticipantOrAdmin, IsManager

class TaskViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        user = self.request.user
        if getattr(user, 'role', '') == 'ADMIN':
            return Task.objects.all()
        elif getattr(user, 'role', '') == 'MANAGER':
            return Task.objects.filter(project__owner=user)
        return Task.objects.filter(assigned_to=user)

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TaskReadSerializer
        return TaskSerializer

    def get_permissions(self):
        if self.action in ['create', 'destroy']:
            permission_classes = [permissions.IsAuthenticated, IsManager]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        """Handle task creation with assigned_to_id"""
        project_id = self.request.data.get('project')
        assigned_to_id = self.request.data.get('assigned_to_id')
        
        if not project_id:
            raise PermissionDenied(detail='Project is required')
        
        project = get_object_or_404(Project, id=project_id)
        
        if assigned_to_id:
            from users.models import User
            assigned_to = get_object_or_404(User, id=assigned_to_id)
            serializer.save(project=project, assigned_to=assigned_to)
        else:
            serializer.save(project=project)

    def perform_update(self, serializer):
        """Check permissions before updating"""
        user = self.request.user
        user_role = getattr(user, 'role', 'USER')
        
        # ADMIN and MANAGER can always update tasks
        if user_role in ['ADMIN', 'MANAGER']:
            serializer.save()
            return
        
        # Regular users can only update their own tasks
        task = serializer.instance
        if task.assigned_to_id == user.id:
            serializer.save()
            return
        
        raise PermissionDenied(detail='You can only update tasks assigned to you.')
