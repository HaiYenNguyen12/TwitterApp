# Generated by Django 4.0.6 on 2022-07-19 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0004_liketweet_tweet_like_tweet_timestamp_liketweet_tweet_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='liketweet',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='tweet',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
