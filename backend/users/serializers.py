from rest_framework import serializers
from .models import CustomUser

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "mobile_number",
            "address",
            "city",
            "postal_code",
            "state",
            "country",
        ]
