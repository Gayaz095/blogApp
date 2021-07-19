from django.db import models
from django.contrib.auth.models import User


class Article(models.Model):
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE
    )
    subject = models.CharField(max_length=30)
    information = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.subject+'-'+str(self.user_id)
