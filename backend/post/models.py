from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=120)
    price = models.CharField(max_length=120)
    date=models.CharField(max_length=120)
    description=models.TextField
    location=models.CharField(max_length=50)
    category=models.CharField(max_length=50,default='DEFAULT VALUE')
    
    #owner=
    #saleOrBuy = models.BooleanField(default=False)

    def _str_(self):
        return self.title
