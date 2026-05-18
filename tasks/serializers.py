from rest_framework import serializers
from .models import Task
from users.serializers import UserSerializer
from projects.serializers import ProjectSerializer

class TaskSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'status', 'project', 'assigned_to', 'created_at')

class TaskReadSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    assigned_to = UserSerializer(read_only=True)
    
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'status', 'project', 'assigned_to', 'created_at')
