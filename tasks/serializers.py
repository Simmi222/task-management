from rest_framework import serializers
from .models import Task
from users.serializers import UserSerializer
from projects.serializers import ProjectSerializer

class TaskSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    assigned_to_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    assigned_to = UserSerializer(read_only=True)
    
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'status', 'project', 'assigned_to', 'assigned_to_id', 'created_at')
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Make fields optional for partial updates
        request = self.context.get('request')
        if request and request.method == 'PATCH':
            for field_name in self.fields:
                if field_name not in ['id', 'project', 'assigned_to', 'created_at']:
                    self.fields[field_name].required = False
    
    def create(self, validated_data):
        """Create task and handle assigned_to_id"""
        assigned_to_id = validated_data.pop('assigned_to_id', None)
        task = Task.objects.create(**validated_data)
        
        if assigned_to_id:
            from users.models import User
            try:
                user = User.objects.get(id=assigned_to_id)
                task.assigned_to = user
                task.save()
            except User.DoesNotExist:
                pass
        
        return task

class TaskReadSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    assigned_to = UserSerializer(read_only=True)
    
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'status', 'project', 'assigned_to', 'created_at')
