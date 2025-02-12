import uuid
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
    cert_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)  # Unique certificate identifier
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')
    recipient_name = models.CharField(max_length=255)
    course_name = models.CharField(max_length=255)
    issued_by = models.CharField(max_length=255)  # Organization/Institution issuing the certificate
    ipfs_cid = models.CharField(max_length=100, unique=True)  # IPFS CID of the certificate file
    duration_valid = models.IntegerField(default=0)
    blockchain_tx_hash = models.CharField(max_length=100, blank=True, null=True)  # Transaction hash for verification
    verified = models.BooleanField(default=False)  # True if stored on blockchain

    def __str__(self):
        return f"{self.recipient_name} - {self.course_name} ({self.cert_id})"

