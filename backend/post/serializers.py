from rest_framework import serializers
from .models import Post, Transaction


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'price', 'date', 'description','hidden', 'location', 'category', 'user', 'saleOrBuy', 'contactInfo', 'postOwnerUsername' )


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'post', 'seller', 'buyer', 'ratingFromSeller', 'ratingFromBuyer')
        