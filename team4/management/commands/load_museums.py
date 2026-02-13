from django.core.management.base import BaseCommand
from team4.models import Facility, City, Category, Amenity
from team4.fields import Point
import json, os

class Command(BaseCommand):
    help = 'Load museums from museums.json'

    def handle(self, *args, **options):
        path = 'team4/fixtures/museums.json'
        if not os.path.exists(path): return self.stdout.write(self.style.ERROR(f'❌ File not found: {path}'))

        with open(path, 'r', encoding='utf-8') as f: data = json.load(f)

        # Create "Museum" Category (ID 2)
        cat_obj, _ = Category.objects.using('team4').get_or_create(
            category_id=2,
            defaults={'name_fa': 'موزه', 'name_en': 'Museum', 'marker_color': 'blue'}
        )

        created, updated = 0, 0
        self.stdout.write(f"🚀 Loading {len(data)} museums...")

        for item in data:
            try:
                city = City.objects.using('team4').get(city_id=item['city_id'])
            except City.DoesNotExist: continue

            loc = Point(item['location']['longitude'], item['location']['latitude'])
            
            defaults = {
                'name_fa': item['name_fa'], 'name_en': item['name_en'],
                'category': cat_obj, 'city': city,
                'address': item.get('address', ''), 'location': loc,
                'description_fa': item.get('description_fa', ''),
                'description_en': item.get('description_en', ''),
                'avg_rating': item.get('avg_rating', 0),
                'review_count': item.get('review_count', 0),
                'status': True, 'price_tier': 'moderate'
            }

            obj, is_new = Facility.objects.using('team4').update_or_create(
                fac_id=item['id'], defaults=defaults
            )
            
            if item.get('amenities'):
                valid_am = Amenity.objects.using('team4').filter(amenity_id__in=item['amenities'])
                obj.amenities.set(valid_am)

            if is_new: created += 1
            else: updated += 1

        self.stdout.write(self.style.SUCCESS(f'\n✅ Done: {created} Created, {updated} Updated.'))