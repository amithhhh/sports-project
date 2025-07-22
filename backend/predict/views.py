from .models import ImageUpload
from .serializers import ImageUploadSerializers
from .predict import predictBallType
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class PredictView(APIView):
    def post(self, request, format=None):
        try:
            serializer = ImageUploadSerializers(data=request.data)

            if serializer.is_valid():
                instance = serializer.save()
                image = instance.image
                result = predictBallType(image)
                return Response({"result": result}, status=200)
            return Response(serializer.errors, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=500)