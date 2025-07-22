from rest_framework import serializers
from .models import ImageUpload

class ImageUploadSerializers(serializers.ModelSerializer):
    class Meta:
        model = ImageUpload
        fields = ['image']