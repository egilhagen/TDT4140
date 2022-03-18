from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from post import views

router = routers.DefaultRouter()
router.register(r'posts', views.PostView, 'post')
router.register(r'transactions', views.TransactionView, 'transaction')

urlpatterns = [
    path('api/', include(router.urls)),
]