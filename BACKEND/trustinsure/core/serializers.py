from rest_framework import serializers
from .models import Policy, Claim, Payment

class PolicySerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Policy
        fields = '__all__'

class ClaimSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Claim
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Payment
        fields = '__all__'
