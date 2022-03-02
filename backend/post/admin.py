from django.contrib import admin
from .models import Post

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'date', 'location', 'description', 'category', 'user', 'saleOrBuy', 'contactInfo' )

# Register your models here.

admin.site.register(Post, PostAdmin)