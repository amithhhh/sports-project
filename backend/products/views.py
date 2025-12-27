from rest_framework import generics, filters
from .models import Product
from .serializers import productSerializer


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = productSerializer

    # 🔍 SEARCH SUPPORT
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description', 'category']


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = productSerializer
