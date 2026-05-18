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
        try:
            task = self.get_object()
            user = self.request.user
            
            # Get user role safely
            user_role = getattr(user, 'role', 'USER')
            
            # Check if user has permission to update this task
            if user_role == 'ADMIN':
                serializer.save()
            elif user_role == 'MANAGER' and task.project.owner.id == user.id:
                serializer.save()
            elif task.assigned_to and task.assigned_to.id == user.id:
                # User can update their assigned tasks
                serializer.save()
            else:
                raise PermissionDenied(
                    detail='You do not have permission to update this task. Make sure task is assigned to you.'
                )
        except Task.DoesNotExist:
            raise PermissionDenied(
                detail='Task not found or you do not have permission to access it.'
            )
