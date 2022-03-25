from django.db import models
from django.test import TestCase
from post.models import Transaction
from post.models import Post


class TestTransaction(TestCase):

    def setUp(self):
        self.post1 = Post.objects.create(
            title = "Testpost",
            price = "420",
            location = "Oslo",
            category = "Concert",
            description = "Wow, a test post!"
        )
        self.transaction1 = Transaction.objects.create(
            post = self.post1,
            ratingFromSeller = None,
            ratingFromBuyer = None
        )
    
    def test_postContents(self):
        self.assertEquals(self.transaction1.post.title, "Testpost")
        self.assertEquals(self.transaction1.post.price, "420")
        self.assertEquals(self.transaction1.post.description, "Wow, a test post!")
    
    def test_sellerRate(self):
        self.transaction1.ratingFromSeller = 3
        self.assertEquals(self.transaction1.ratingFromSeller, 3)

    def test_buyerRate(self):
        self.transaction1.ratingFromBuyer = 3
        self.assertEquals(self.transaction1.ratingFromBuyer, 3)
    
    def test_valid_user(self):
        self.assertEquals(self.transaction1.user, None)
        # TODO: Validate fields from Django.Auth User model