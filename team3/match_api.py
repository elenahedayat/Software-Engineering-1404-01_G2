import requests
from django.utils import timezone
from .models import UserInteraction, UserProfileFeature

def sync_and_store_data(user_id):
    COMMENT_API = f"http://comment-service/api/ratings/user={user_id}"
    WIKI_API_BASE = "http://wiki-service/api/wiki/content?place="

    try:
        response = requests.get(COMMENT_API)
        if response.status_code != 200:
            return "Error: Could not fetch comments"
        
        user_logs = response.json() #[ {placeId, rate, created_at}, ... ]

        for log in user_logs:
            place_id = log['placeId']
            
            wiki_res = requests.get(f"{WIKI_API_BASE}{place_id}")
            category = "Unknown"
            if wiki_res.status_code == 200:
                category = wiki_res.json().get('category', 'Unknown')

            #save or updata in UserInteraction 
            UserInteraction.objects.update_or_create(
                user_id=user_id,
                item_id=place_id,
                interaction_type='rate',
                defaults={
                    'value': float(log['rate']),
                    'created_at': log['created_at'],
                    'item_type': 'place'
                }
            )

            feature, created = UserProfileFeature.objects.get_or_create(
                user_id=user_id,
                category=category,
                defaults={'weight': 0, 'source': 'interaction'}
            )
            #sum score
            feature.weight += float(log['rate'])
            feature.updated_at = timezone.now()
            feature.save()

        return True
    except Exception as e:
        print(f"Sync Error: {e}")
        return False