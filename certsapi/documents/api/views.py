from django.http import FileResponse
from rest_framework.generics import (
    CreateAPIView,
    GenericAPIView,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import IPFSUploadSerializer
from accounts.models import User
from documents.models import Document
from django.shortcuts import get_object_or_404
from documents.ipfs_services import retrieve_file_from_ipfs, upload_file_to_ipfs
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status


class UpLoadToIPFS(GenericAPIView):
    permission_classes = [
        IsAuthenticated
    ]
    serializer_class = IPFSUploadSerializer


    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        title = serializers.validated_data['title']
        description = serializers.validated_data['description']
        user = request.user

        try:
            ipfs_cid = upload_file_to_ipfs(file)
            if ipfs_cid:
                document = Document.objects.create(
                    title=title,
                    description=description,
                    ipfs_cid=ipfs_cid,
                    owner=user
                )
                return Response({"CID": ipfs_cid}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        


class RetrieveFromIPFS(GenericAPIView):
    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request, document_id):

        try:
            ipfs_cid = get_object_or_404(Document, id=document_id)
            file_content = retrieve_file_from_ipfs(ipfs_cid)
            response = FileResponse(file_content, content_type="application/octet-stream")
            response['Content-Disposition'] = f'attachment; filename="{ipfs_cid}.file"'
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
    


