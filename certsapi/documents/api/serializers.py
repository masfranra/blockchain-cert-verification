from documents.models import Document
from rest_framework import serializers


class UploadSerializer(serializers.Serializer):
     
    recipient_name = serializers.CharField(max_length=255)
    course_name = serializers.CharField(max_length=255)
    ipfs_cid = serializers.CharField(max_length=255)
    issued_by = serializers.CharField(max_length=255)
    duration_valid = serializers.CharField(max_length=255)
    ipfsUrl = serializers.CharField(max_length=255)
    cert_id = serializers.CharField(max_length=255)

    class Meta:
        model = Document
        fields = [
            "recipient_name",
            "course_name",
            "ipfs_cid",
            "issued_by",
            "duration_valid",
            "cert_id"

        ]

class CreateCertificateSerializer(serializers.Serializer):

    imageFile = serializers.ImageField(required=True)
    recipient_name = serializers.CharField(max_length=255)
    course_name = serializers.CharField(max_length=255)
    issued_by = serializers.CharField(max_length=255)
    duration_valid = serializers.CharField(max_length=255)
    # ipfsUrl = serializers.CharField(max_length=255)

    





