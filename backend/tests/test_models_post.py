from django.test import TestCase
from ticking.models import User
import datetime
from django.db import models
from post.models import Post

class TestUser(TestCase):

    def setUp(self):
        self.user1 = User.objects.create(
            name='User 1',
            email='user.1@ntnu.no',
            username='Username1',
            ## Leaving "has_logged_in" blank since it should default to false
        )

    def test_default_login_false(self):
        self.assertEquals(self.user1.has_logged_in, False)
    
    ## TODO : More testing when there's more to test

class TestPost(TestCase):

    def setUp(self):
        self.post1 = Post.objects.create(
            title = "Testpost",
            price = "420",
            date = models.DateField(default=datetime.date.today),
            location = "Oslo",
            category = "Concert",
            description = "Wow, a test post!"
            # Like user: leaving "saleOrBuy blank because it should default "Sell"
        )

    # To test: choosing invalid locations, post categories and sale/buy states will not work
    # def test_Illegal_Location(self):
        
    
    def check_Default_Sell(self):
        self.assertEquals(self.post1.saleOrBuy, "Sell")
            
    ## TODO : Functionality