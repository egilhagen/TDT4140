import datetime
from venv import create
from django.contrib.auth.models import User
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
        self.assertEquals(self.post1.description, "Wow, a test post!")

    def test_default_sell(self):
        # Asserting that "saleOrBuy" defaults to sell
        self.assertEquals(self.post1.saleOrBuy, "Sell")

    def test_valid_location(self):
        self.assertEquals(self.post1.location, "Oslo")
        # TODO: Make sure that inputting an invalid location doesn't work

    def test_valid_category(self):
        self.assertEquals(self.post1.category, "Concert")
        # TODO: Same as above

    def test_valid_user(self):
        self.assertEquals(self.post1.user, None)
        # TODO: Validate fields from Django.Auth User model

    # To test: choosing invalid locations, post categories and sale/buy states will not work
    # def test_Illegal_Location(self):
    
    ## TODO : Functionality