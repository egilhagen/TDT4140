from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'price', 'date', 'description','hidden', 'location', 'category', 'user', 'saleOrBuy', 'contactInfo', 'flagged' )
