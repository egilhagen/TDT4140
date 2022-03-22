from rest_framework import serializers
from .models import Post, Transaction


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'price', 'date', 'description','hidden', 'location', 'category', 'user', 'saleOrBuy', 'contactInfo' )


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'post', 'user', 'ratingFromSeller', 'ratingFromBuyer')
        