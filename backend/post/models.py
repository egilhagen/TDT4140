from pickle import FALSE, TRUE
from django.db import models
import datetime
from django.contrib.auth.models import User

from post.enums import LocationChoices, TypeChoices, SaleOrBuy


class Post(models.Model):
    title = models.CharField(max_length=120)
    price = models.CharField(max_length=120)
    date=models.DateField(default=datetime.date.today)
    location=models.CharField(max_length=50, choices=LocationChoices.choices())
    category=models.CharField(max_length=50, choices=TypeChoices.choices())
    description=models.CharField(max_length=300)
    hidden=models.BooleanField(default=False)
    user = models.ForeignKey(
        to=User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='post',
        verbose_name=("User"),
    )
    saleOrBuy = models.CharField(max_length=30, choices=SaleOrBuy.choices(), default='Sell')
    contactInfo = models.CharField(max_length=120)

    def _str_(self):
        return self.title
