from django.urls import path, include
from rest_framework import routers
from .views import PolicyViewSet, ClaimViewSet, PaymentViewSet, ussd_entry, sms_webhook

router = routers.DefaultRouter()
router.register(r'policies', PolicyViewSet, basename='policies')
router.register(r'claims', ClaimViewSet, basename='claims')
router.register(r'payments', PaymentViewSet, basename='payments')

urlpatterns = [
    path('', include(router.urls)),
    path('ussd/', ussd_entry, name='ussd-entry'),
    path('sms/', sms_webhook, name='sms-webhook'),
]
