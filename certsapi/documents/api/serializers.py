from rest_framework import serializers


class IPFSUploadSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    file = serializers.FileField()
    description = serializers.TextField()

    def validate(self, files):
        if files.size > 10 * 1024 * 1024:
            raise serializers.validationError("File must be under 10mbs")
        return files