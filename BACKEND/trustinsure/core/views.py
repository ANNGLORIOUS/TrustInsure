from rest_framework import viewsets, permissions
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .models import Policy, Claim, Payment
from .serializers import PolicySerializer, ClaimSerializer, PaymentSerializer
from django.utils import timezone

# --- API ViewSets ---

class PolicyViewSet(viewsets.ModelViewSet):
    queryset = Policy.objects.select_related('user').all().order_by('-id')
    serializer_class = PolicySerializer

    def perform_create(self, serializer):
        # attach current user as owner
        serializer.save(user=self.request.user)

class ClaimViewSet(viewsets.ModelViewSet):
    queryset = Claim.objects.select_related('user','policy').all().order_by('-submitted_at')
    serializer_class = ClaimSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.select_related('user','policy').all().order_by('-date')
    serializer_class = PaymentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, date=timezone.now())

# --- USSD & SMS minimal examples ---

from django.http import HttpResponse
import africastalking, os
from django.conf import settings
africastalking.initialize(settings.AFRICASTALKING_USERNAME, settings.AFRICASTALKING_API_KEY)
sms = africastalking.SMS

@csrf_exempt
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def ussd_entry(request):
    """
    Africa's Talking will POST: sessionId, serviceCode, phoneNumber, text
    text is the navigation trail like '1*2*xyz'
    """
    text = request.POST.get('text','').strip()
    phone = request.POST.get('phoneNumber','').strip()

    if text == "":
        menu = "CON TrustInsure\n1. Buy Policy\n2. Submit Claim\n3. My Policies"
        return HttpResponse(menu)

    parts = text.split('*')
    if parts[0] == '1':  # Buy Policy
        if len(parts) == 1:
            return HttpResponse("CON Select Type:\n1. Health\n2. Vehicle\n3. Funeral\n4. Crop")
        if len(parts) == 2:
            return HttpResponse("CON Enter premium amount (e.g. 500):")
        if len(parts) == 3:
            # create user if missing, create simple policy with +30 days end_date
            user, _ = User.objects.get_or_create(username=phone)
            ptype_map = {'1':'HEALTH','2':'VEHICLE','3':'FUNERAL','4':'CROP'}
            ptype = ptype_map.get(parts[1],'HEALTH')
            premium = parts[2]
            from datetime import date, timedelta
            Policy.objects.create(
                user=user, policy_type=ptype, end_date=date.today()+timedelta(days=30),
                premium_amount=premium, is_active=True
            )
            return HttpResponse("END Policy created. You will receive an SMS soon.")
    if parts[0] == '2':  # Submit Claim
        if len(parts) == 1:
            return HttpResponse("CON Enter claim amount:")
        if len(parts) == 2:
            return HttpResponse("CON Enter short description:")
        if len(parts) == 3:
            user, _ = User.objects.get_or_create(username=phone)
            policy = Policy.objects.filter(user=user, is_active=True).first()
            if not policy:
                return HttpResponse("END No active policy found.")
            Claim.objects.create(user=user, policy=policy, amount=parts[1], description=parts[2])
            return HttpResponse("END Claim submitted. We’ll update you by SMS.")
    if parts[0] == '3':  # My Policies
        user = User.objects.filter(username=phone).first()
        if not user:
            return HttpResponse("END No policies.")
        count = user.policies.count()
        return HttpResponse(f"END You have {count} policy(ies).")

    return HttpResponse("END Invalid option.")

@csrf_exempt
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def sms_webhook(request):
    """
    Basic SMS receiver (optional). You can parse 'text' and 'from' to drive flows.
    """
    message = request.POST.get('text','')
    sender = request.POST.get('from','')
    # do something minimal
    return Response({"status":"ok"})
