from django.db import models
from django.contrib.postgres.fields import ArrayField

class City(models.Model):
    city_id = models.CharField(primary_key=True, max_length=50)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255, null=True, blank=True)
    total_score = models.FloatField(default=0.0)
    feature = models.JSONField(default=dict)

    def __str__(self):
        return self.name

class Place(models.Model):
    place_id = models.CharField(primary_key=True, max_length=50)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='places')
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=255, null=True, blank=True)
    total_score = models.FloatField(default=0.0)
    feature = models.JSONField(default=dict)

    def __str__(self):
        return self.name

class Cluster(models.Model):
    cluster_id = models.CharField(primary_key=True, max_length=50)
    algorithm = models.CharField(max_length=100)
    centroid_vector = ArrayField(models.FloatField(), size=60, null=True)

class User(models.Model):
    user_id = models.CharField(primary_key=True, max_length=50)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)
    cluster = models.ForeignKey(Cluster, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    embed_vector = ArrayField(models.FloatField(), size=60, null=True)

class Interaction(models.Model):
    interaction_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    type = models.CharField(max_length=20)
    context = models.JSONField(default=dict)
    timestamp = models.DateTimeField(auto_now_add=True)

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'place')

class ABConfig(models.Model):
    strategy_id = models.AutoField(primary_key=True)
    strategy_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=False)

class UserOfflineFeed(models.Model):
    feed_id = models.AutoField(primary_key=True)
    cluster = models.OneToOneField(Cluster, on_delete=models.CASCADE)
    recommended_places = models.JSONField()
    generated_at = models.DateTimeField(auto_now=True)

class RecommendationLog(models.Model):
    log_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    strategy = models.ForeignKey(ABConfig, on_delete=models.CASCADE)
    recommended_items = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True)