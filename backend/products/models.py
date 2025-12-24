from django.db import models

class Product(models.Model):

    # BASIC INFO
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    # PRICING
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )

    # INVENTORY
    stock = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=True)

    # CATEGORY & BRAND
    category = models.CharField(max_length=100, blank=True, null=True)
    brand = models.CharField(max_length=100, blank=True, null=True)

    # PRODUCT IMAGE
    image = models.ImageField(upload_to="products/", blank=True, null=True)

    # RATING (for frontend Rating component)
    rating = models.FloatField(default=0.0)
    reviews_count = models.PositiveIntegerField(default=0)

    # EXTRA PRODUCT DETAILS
    material = models.CharField(max_length=100, blank=True, null=True)
    color = models.CharField(max_length=50, blank=True, null=True)
    weight = models.CharField(max_length=50, blank=True, null=True)

    # TIMESTAMPS
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
