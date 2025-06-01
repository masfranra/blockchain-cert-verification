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
import uuid
from datetime import datetime




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
        cert_id = serializer.validated_data['cert_id']
        user = request.user
        # check if cert_id exists
        cert_id_exists = Document.objects.filter(cert_id=cert_id)
        if cert_id_exists:
            return Response (
                {"error": "Certificate with this ID already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        ipfs_cid_exists = Document.objects.filter(ipfs_cid=ipfs_cid)
        if ipfs_cid_exists:
            print("Yes")
            return Response(
            {"error": "This IPFS CID already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )
        print("No")


        document = Document.objects.create(
            cert_id=cert_id,
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
            certificate.verified = True
            certificate.save()
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
        course_name = serializer.validated_data['course_name']
        valid_for = serializer.validated_data['duration_valid']
        today = datetime.today().strftime("%d %B %Y")


        

        if not imageFile:
            print("Image not uploaded")
       

        template_path = "certificates/template.pdf"  # Your PDF template
        output = BytesIO()
        print("Here")
        # Read the PDF template
        pdf_reader = PdfReader(template_path)
        pdf_writer = PdfWriter()

        # Create an overlay with dynamic text
        overlay = BytesIO()
        c = canvas.Canvas(overlay, pagesize=letter)
        c.setFont("Helvetica", 25)
        c.setFillColorRGB(0, 0, 0)  # White color
        c.drawString(350, 275, recipient_name)  # Name
        c.setFont("Helvetica-Bold" ,15)
        c.drawString(405, 450, valid_for) 
        c.setFont("Helvetica", 25)
        c.setFillColorRGB(1, 0, 0)
        c.drawString(350, 218, course_name) 
        c.setFont("Helvetica", 15)
        c.setFillColorRGB(0, 0, 0)
        c.drawString(230, 185, today)
        # c.drawString(250, 450, f"Certificate ID: {cert_id}")  # Cert ID
        if imageFile:
            image_reader = ImageReader(imageFile)
            c.drawImage(image_reader, 350, 340, width=100, height=100) 

        # === Step 2: Generate QR Code ===
        custom_uuid = uuid.uuid4()
        qr = qrcode.QRCode(box_size=5, border=2)
        qr_data = f"https://localhost:3000/certificate/verify?code=${custom_uuid}"  # QR code points to verification URL
        qr.add_data(qr_data)
        qr.make(fit=True)

        qr_img = qr.make_image(fill="black", back_color="white")

        qr_buffer = BytesIO()
        qr_img.save(qr_buffer, format="PNG")
        qr_reader = ImageReader(qr_buffer)
        
        # Add QR code image to the certificate
        c.drawImage(qr_reader, 70,390, width=80, height=80)
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
        response["X-Certificate-ID"] = str(custom_uuid)  # Include UUID in response header

        return response