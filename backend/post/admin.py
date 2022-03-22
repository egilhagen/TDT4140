from django.contrib import admin
from .models import Post, Transaction

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'date', 'location', 'description', 'hidden', 'category', 'user', 'saleOrBuy', 'contactInfo')

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('post', 'user', 'ratingFromSeller', 'ratingFromBuyer')
# Register your models here.


admin.site.register(Post, PostAdmin)
admin.site.register(Transaction, TransactionAdmin)

