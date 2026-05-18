from django.urls import path
from .views import RegisterView, ProfileView, ListUsersView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('me/', ProfileView.as_view(), name='auth_me'),
    path('list/', ListUsersView.as_view(), name='list_users'),
]
