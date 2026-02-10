from django.test import TestCase, Client
from django.contrib.auth.models import User as DjangoUser
from .models import User, City, Place, Cluster, UserOfflineFeed, Interaction
from django.urls import reverse


class RecommendationSystemTest(TestCase):
    def setUp(self):
        self.city = City.objects.create(
            city_id="c-01", name="Tehran", total_score=4.5
        )
        self.place = Place.objects.create(
            place_id="p-101", city=self.city, name="Milad Tower", total_score=4.8
        )
        self.cluster = Cluster.objects.create(
            cluster_id="cl-01", algorithm="K-Means"
        )

        self.django_user = DjangoUser.objects.create_user(username='kiyan', password='password123')
        self.app_user = User.objects.create(
            user_id="u-001", name="Kiyan", cluster=self.cluster, city=self.city
        )
        UserOfflineFeed.objects.create(
            cluster=self.cluster,
            recommended_places=[{"place_id": "p-101", "score": 0.95}]
        )

        self.client = Client()

    def test_guest_user_recommendation(self):
        response = self.client.get(reverse('get_recommendations'))
        self.assertEqual(response.status_code, 200)

        self.assertTrue(len(response.data) > 0)
        self.assertEqual(response.data[0].place_id, "p-101")

    def test_authenticated_user_recommendation(self):
        self.client.force_login(self.django_user)
        response = self.client.get(reverse('get_recommendations'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['place_id'], "p-101")

    def test_feedback_logging(self):
        self.client.force_login(self.django_user)
        feedback_data = {
            "place_id": "p-101",
            "type": "LIKE",
            "context": {"weather": "sunny", "device": "mobile"}
        }
        response = self.client.post(
            reverse('post_feedback'),
            data=feedback_data,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Interaction.objects.filter(type="LIKE").count(), 1)

    def test_performance_requirement(self):
        import time
        start_time = time.time()
        self.client.get(reverse('get_recommendations'))
        duration = (time.time() - start_time) * 1000  # Convert to ms
        self.assertLess(duration, 500)