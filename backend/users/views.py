from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth import get_user_model
#from rest_framework.decorators import api_view, permission_classes
#from rest_framework.permissions import IsAuthenticated
#from rest_framework.response import Response
#from rest_framework import status
from .serializers import UserUpdateSerializer

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "city": user.city,
        "pincode":user.postal_code
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def syncUser(request):
    email = request.data.get("email")
    username = request.data.get("username")
    first_name = request.data.get("firstname")
    last_name = request.data.get("lastname")

    if not email or not username:
        return Response({"error": "Username and email are required"}, status=status.HTTP_400_BAD_REQUEST)

    user, created = User.objects.get_or_create(
        email=email,
        defaults={
            "username": username,
            "first_name": first_name or "",
            "last_name": last_name or ""
        }
    )

    if not created:
        user.username = username  # Optional: update username as well if needed
        user.first_name = first_name or ""
        user.last_name = last_name or ""
        user.save()

    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        "key": token.key,
        "email": user.email,
        "username": user.username,
        "first_name": user.first_name,
        "last_name": user.last_name
    }, status=status.HTTP_200_OK)

def get_user_from_token(authToken):
    try:
        Token.objects.get(key=authToken)
        user = token.user
        return user
    except Token.DoesNotExist:
        return None

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_info(request):
    user = request.user
    serializer = UserUpdateSerializer(user, data=request.data, partial=True)  
    # partial=True → only update fields provided

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Additional Information saved successfully"},
            status=status.HTTP_200_OK
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

