from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from PIL import Image
from .predict import predictBallType

class PredictView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        try:
            print(request.FILES)
            image_file = request.FILES.get('image')

            if not image_file:
                return Response({"error": "No image file uploaded. 'image' key is missing in request.FILES."}, status=400)

            # Load the image using PIL
            image = Image.open(image_file)

            # Dummy prediction function – replace with your actual logic
            result = predictBallType(image)

            return Response({"result": result}, status=200)

        except Exception as e:
            # Send back full error details for debugging
            return Response({"error": str(e)}, status=500)