import datetime
from django.db import models
from django.test import TestCase
from post.models import Post


class TestPost(TestCase):

    def setUp(self):
        self.post1 = Post.objects.create(
            title = "Testpost",
            price = "420",
            location = "Oslo",
            category = "Concert",
            description = "Wow, a test post!"
            # Leaving "saleOrBuy blank because it should default "Sell"
        )
    
    def test_contents(self):
        self.assertEquals(self.post1.title, "Testpost")
        self.assertEquals(self.post1.price, "420")
        self.assertEquals(self.post1.location, "Oslo")
        self.assertEquals(self.post1.category, "Concert")
        self.assertEquals(self.post1.description, "Wow, a test post!")

    def test_default_sell(self):
        # Asserting that "saleOrBuy" defaults to sell
        self.assertEquals(self.post1.saleOrBuy, "Sell")

    # def test_valid_location(self):
        # Asserting that creating a post with invalid location throws an exception

    # def test_valid_category(self):
        # Asserting that creating a post with invalid category throws an exception
       
    # To test: choosing invalid locations, post categories and sale/buy states will not work
    # def test_Illegal_Location(self):
    
    ## TODO : Functionality
