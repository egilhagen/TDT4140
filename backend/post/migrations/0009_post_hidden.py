# Generated by Django 4.0.2 on 2022-03-18 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0008_alter_post_contactinfo'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='hidden',
            field=models.BooleanField(default=False),
        ),
    ]