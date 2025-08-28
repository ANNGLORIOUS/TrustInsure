from django.db import models
from django.contrib.auth.models import User

class Policy(models.Model):
    POLICY_TYPES = [
        ('HEALTH','Health'),('VEHICLE','Vehicle'),('FUNERAL','Funeral'),('CROP','Crop')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='policies')
    policy_type = models.CharField(max_length=20, choices=POLICY_TYPES)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()
    premium_amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)

    def __str__(self): return f"{self.user.username} - {self.policy_type}"

class Claim(models.Model):
    STATUS = [('pending','pending'),('approved','approved'),('rejected','rejected')]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='claims')
    policy = models.ForeignKey(Policy, on_delete=models.CASCADE, related_name='claims')
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS, default='pending')
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self): return f"Claim #{self.id} - {self.user.username}"

class Payment(models.Model):
    STATUS = [('pending','pending'),('completed','completed'),('failed','failed')]
    METHODS = [('momo','MobileMoney'),('airtime','Airtime'),('card','Card')]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    policy = models.ForeignKey(Policy, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS, default='pending')
    payment_method = models.CharField(max_length=20, choices=METHODS)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self): return f"Payment #{self.id} - {self.user.username}"
