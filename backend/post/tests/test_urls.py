from django.test import SimpleTestCase
from django.urls import reverse, resolve
import backend.urls


""" class TestUrls(SimpleTestCase):
    
    def test_user_url_is_resolved(self):
        url = reverse('X')
        print("Win! {}".format(resolve(url)))
        self.assertEquals(resolve(url).func,) """

## TODO : URLpatterns missing names to find reverse