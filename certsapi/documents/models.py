from django.db import models
from accounts.models import User

# Create your models here.

class TimestampMixin(models.Model):
    """
    Model mixin that provides timestamping fields.
    """

    create_date = models.DateTimeField("date created", auto_now_add=True)
    modify_date = models.DateTimeField("date modified", auto_now=True)

    class Meta:
        abstract = True

class Document(TimestampMixin):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')
    title = models.CharField(max_length=255)
    description =models.TextField()
    ipfs_cid = models.CharField(max_length=255, unique=True)  # Store the CID from IPFS

    def __str__(self):
        """
        Returns a string representation of the Document.
        """
        return f"{self.title} + {self.user}"

