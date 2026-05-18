from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role == 'ADMIN')

class IsManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.role in ['MANAGER', 'ADMIN'])

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Object-level permission for projects owner or Admin
    """
    def has_object_permission(self, request, view, obj):
        if request.user.role == 'ADMIN':
            return True
        return obj.owner == request.user

class IsTaskParticipantOrAdmin(permissions.BasePermission):
    """
    For Tasks: assigned user, project owner, or admin
    """
    def has_object_permission(self, request, view, obj):
        if request.user.role == 'ADMIN':
            return True
        if obj.project.owner == request.user:
            return True
        return obj.assigned_to == request.user
