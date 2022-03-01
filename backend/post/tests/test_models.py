from django.test import TestCase
from users.models import User

class TestModels(TestCase):

    def setUp(self):
        self.user1 = User.objects.create(
            name='User 1',
            email='user.1@ntnu.no',
            username='Username1',
            ## Leaving "has_logged_in" blank since it defaults to false
        )

    def test_default_login_false(self):
        self.assertEquals(self.user1.has_logged_in, False)
    
    ## TODO : More testing when there's more to test