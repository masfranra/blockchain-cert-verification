import logging
import qrcode
from django.http import FileResponse
from rest_framework.generics import (
    CreateAPIView,
    GenericAPIView,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UploadSerializer, CreateCertificateSerializer
from accounts.models import User
from documents.models import Document
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from io import BytesIO
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import ImageReader
from django.http import HttpResponse
from documents.ipfs_services import ipfs_cid_check
from rest_framework.parsers import MultiPartParser, FormParser

logger = logging.getLogger(__name__)

class UpLoadView(GenericAPIView):
    permission_classes = [
        IsAuthenticated
    ]
    serializer_class = UploadSerializer


    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        recipient_name = serializer.validated_data['recipient_name']
        course_name = serializer.validated_data['course_name']
        ipfs_cid = serializer.validated_data['ipfs_cid']
        issued_by = serializer.validated_data['issued_by']
        duration_valid = serializer.validated_data['duration_valid']
        ipfsUrl = serializer.validated_data['ipfsUrl']
        user = request.user

        result = ipfs_cid_check(ipfs_cid)
        if result:
            return Response(
            {"error": "This IPFS CID already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )


        document = Document.objects.create(
            created_by=user,
            recipient_name=recipient_name,
            course_name=course_name,
            ipfs_cid=ipfs_cid,
            issued_by=issued_by,
            duration_valid=duration_valid,
            ipfsUrl=ipfsUrl
        )

        response_data = {
            "success": True,
            "documentId": document.cert_id,
            "message": "successfully stored the document",
        }

        return Response(response_data, status=status.HTTP_201_CREATED)
        

        


class VerifyCertView(GenericAPIView):
    permission_classes = [
       AllowAny
    ]
    

    def post(self, request, *args, **kwargs):
        
        cert_id = request.GET.get("code")
        logger.info(
                f"Request data {cert_id}"
            )
        try:
            certificate = Document.objects.get(cert_id=cert_id)
            message = (
            "This certificate exists in the database"
            )
            response_data = {
                "recipient": certificate.recipient_name,
                "course": certificate.course_name,
                "issued_by": certificate.issued_by,
                "blockchain_verified": certificate.verified,
                "ipfs_cid": certificate.ipfs_cid,
                "ipfsUrl": certificate.ipfsUrl,
                "cert_id": certificate.cert_id,
                "message": message,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Document.DoesNotExist:
            message = (
            "This certificate does not exist in the database"
            )
            response_data = {
                
                "message": message
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)
        
class GenerateCertificateView(GenericAPIView):
    permission_classes = [
        IsAuthenticated
    ]

    serializer_class = CreateCertificateSerializer
    parser_classes = (MultiPartParser, FormParser)
        
    def post(self, request, *args, **kwargs):
        print("Request Data:", request.data)  # Debugging line
        print("Request Files:", request.FILES)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        recipient_name = serializer.validated_data['recipient_name']
        imageFile = serializer.validated_data['imageFile']

        if not imageFile:
            print("Image not uploaded")
       

        template_path = "certificates/template.pdf"  # Your PDF template
        output = BytesIO()

        # Read the PDF template
        pdf_reader = PdfReader(template_path)
        pdf_writer = PdfWriter()

        # Create an overlay with dynamic text
        overlay = BytesIO()
        c = canvas.Canvas(overlay, pagesize=letter)
        c.setFont("Helvetica", 20)
        c.setFillColorRGB(1, 1, 1)  # White color
        c.drawString(280, 268, recipient_name)  # Name
        # c.drawString(250, 450, f"Certificate ID: {cert_id}")  # Cert ID
        if imageFile:
            image_reader = ImageReader(imageFile)
            c.drawImage(image_reader, 100, 500, width=100, height=100) 

        # === Step 2: Generate QR Code ===
        qr = qrcode.QRCode(box_size=5, border=2)
        qr_data = f"https://verify.certificate.com/4"  # QR code points to verification URL
        qr.add_data(qr_data)
        qr.make(fit=True)

        qr_img = qr.make_image(fill="black", back_color="white")

        qr_buffer = BytesIO()
        qr_img.save(qr_buffer, format="PNG")
        qr_reader = ImageReader(qr_buffer)
        
        # Add QR code image to the certificate
        c.drawImage(qr_reader, 400, 100, width=80, height=80)
        c.save()

        overlay.seek(0)
        overlay_pdf = PdfReader(overlay)

        # Merge overlay with the first page of the template
        first_page = pdf_reader.pages[0]
        first_page.merge_page(overlay_pdf.pages[0])

        pdf_writer.add_page(first_page)

        # Save final PDF
        pdf_writer.write(output)
        output.seek(0)

        response = HttpResponse(output, content_type="application/pdf")
        response["Content-Disposition"] = f'attachment; filename="certificate_new.pdf"'
        return response