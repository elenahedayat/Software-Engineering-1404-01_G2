from rest_framework.views import APIView
from rest_framework.response import Response
from .services import RecommendationService
from .models import Interaction

class RecommendationAPIView(APIView):
    def get(self, request):
        service = RecommendationService()
        recommendations = service.get_recommendations(request.user, request.GET)
        return Response(recommendations)

class FeedbackAPIView(APIView):
    def post(self, request):
        place_id = request.data.get('place_id')
        Interaction.objects.create(
            user=request.user,
            place_id=place_id,
            type=request.data.get('type', 'CLICK'),
            context=request.data.get('context', {})
        )
        return Response({"status": "Success"}, status=201)