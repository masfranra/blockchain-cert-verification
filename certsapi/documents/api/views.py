import logging
import qrcode
import re
import uuid
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
from datetime import datetime, timedelta
from django.db.models import Count, Q
from django.utils.timezone import now




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
        
        # Clean the cert_id by removing any non-UUID characters
        if cert_id:
            # Remove any leading/trailing whitespace and non-alphanumeric characters except hyphens
            cert_id = re.sub(r'[^a-fA-F0-9\-]', '', cert_id.strip())
            
            # Validate UUID format
            try:
                uuid.UUID(cert_id)
            except (ValueError, TypeError):
                message = "Invalid certificate ID format"
                response_data = {
                    "message": message,
                    "error": "INVALID_UUID_FORMAT"
                }
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        
        if not cert_id:
            message = "Certificate ID is required"
            response_data = {
                "message": message,
                "error": "MISSING_CERT_ID"
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
            
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
        today = datetime.today().strftime("%d %b %Y")


        

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
        qr_data = f"http://localhost:3000/certificate/verify?code=${custom_uuid}"  # QR code points to verification URL
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


class DashboardStatsView(GenericAPIView):
    """
    API view to get dashboard statistics for the authenticated user
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        # Get all certificates created by this user
        total_certificates = Document.objects.filter(created_by=user).count()
        
        # Get verified certificates count
        verified_certificates = Document.objects.filter(
            created_by=user, 
            verified=True
        ).count()
        
        # Get unique recipients count
        unique_recipients = Document.objects.filter(
            created_by=user
        ).values('recipient_name').distinct().count()
        
        # Get this month's certificates
        current_month_start = now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        this_month_certificates = Document.objects.filter(
            created_by=user,
            create_date__gte=current_month_start
        ).count()
        
        # Get last month's certificates for comparison
        last_month_start = (current_month_start - timedelta(days=1)).replace(day=1)
        last_month_certificates = Document.objects.filter(
            created_by=user,
            create_date__gte=last_month_start,
            create_date__lt=current_month_start
        ).count()
        
        # Calculate growth percentage
        this_month_growth = 0
        if last_month_certificates > 0:
            this_month_growth = ((this_month_certificates - last_month_certificates) / last_month_certificates) * 100
        elif this_month_certificates > 0:
            this_month_growth = 100
            
        # Calculate verification rate
        verification_rate = 0
        if total_certificates > 0:
            verification_rate = (verified_certificates / total_certificates) * 100
            
        # Get unique course count
        unique_courses = Document.objects.filter(
            created_by=user
        ).values('course_name').distinct().count()
        
        stats = {
            'total_certificates': total_certificates,
            'verified_certificates': verified_certificates,
            'unique_recipients': unique_recipients,
            'this_month_certificates': this_month_certificates,
            'this_month_growth': round(this_month_growth, 1),
            'verification_rate': round(verification_rate, 1),
            'unique_courses': unique_courses
        }
        
        return Response(stats, status=status.HTTP_200_OK)


class RecentCertificatesView(GenericAPIView):
    """
    API view to get recent certificates for the authenticated user
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        limit = request.GET.get('limit', 5)
        
        try:
            limit = int(limit)
            if limit > 50:  # Prevent too large requests
                limit = 50
        except ValueError:
            limit = 5
            
        recent_certificates = Document.objects.filter(
            created_by=user
        ).order_by('-create_date')[:limit]
        
        certificates_data = []
        for cert in recent_certificates:
            certificates_data.append({
                'id': str(cert.cert_id),
                'recipient': cert.recipient_name,
                'course': cert.course_name,
                'issued_by': cert.issued_by,
                'issue_date': cert.create_date.isoformat(),
                'status': 'verified' if cert.verified else 'pending',
                'ipfs_cid': cert.ipfs_cid,
                'ipfs_url': cert.ipfsUrl
            })
            
        return Response({
            'certificates': certificates_data,
            'total_count': len(certificates_data)
        }, status=status.HTTP_200_OK)