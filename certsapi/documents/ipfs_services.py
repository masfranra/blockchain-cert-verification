from documents.models import Document
from rest_framework.response import Response
from rest_framework import status

def ipfs_cid_check(ipfs_cid):
    document = Document.objects.filter(ipfs_cid=ipfs_cid).first()

    return document

