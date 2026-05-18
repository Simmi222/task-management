from rest_framework import viewsets, permissions, status
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from .models import Task
from .serializers import TaskSerializer, TaskReadSerializer
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

    def perform_update(self, serializer):
        """Check permissions before updating"""
        task = serializer.instance
        user = self.request.user
        
        # Get user role safely
        user_role = getattr(user, 'role', 'USER')
        user_id = user.id
        
        # Check if user has permission to update this task
        if user_role == 'ADMIN':
            # Admin can update any task
            serializer.save()
            return
        
        if user_role == 'MANAGER':
            # Manager can update any task
            serializer.save()
            return
        
        if task.assigned_to_id == user_id:
            # User can update their assigned tasks
            serializer.save()
            return
        
        # No permission
        raise PermissionDenied(
            detail=f'You do not have permission to update this task. Your role: {user_role}, Task assigned to: {task.assigned_to_id}'
        )
