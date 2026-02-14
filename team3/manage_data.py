import sqlite3
import uuid
from datetime import datetime

def seed_database():
    db_path = 'team3/team3.sqlite3'
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        print(f"Connected to {db_path} successfully.")

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_profile_features (
                feature_id TEXT PRIMARY KEY,
                user_id TEXT,
                category TEXT,
                weight REAL,
                source TEXT,
                updated_at TEXT
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_interactions (
                interaction_id TEXT PRIMARY KEY,
                user_id TEXT,
                item_id TEXT,
                item_type TEXT,
                interaction_type TEXT,
                created_at TEXT
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS location_context (
                location_id TEXT PRIMARY KEY,
                user_id TEXT,
                location TEXT,
                radius_km REAL,
                created_at TEXT
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS recommendations (
                recommendation_id TEXT PRIMARY KEY,
                user_id TEXT,
                item_id TEXT,
                item_type TEXT,
                score REAL,
                reason_type TEXT,
                reason_description TEXT,
                user_feedback TEXT,
                generated_at TEXT,
                feedback_at TEXT
            )
        """)

        now = datetime.now().isoformat()

       
        popular_items = [
            ('popular_place_1', 'Golestan Palace', 'place'),
            ('popular_place_2', 'Naqsh-e Jahan', 'place'),
            ('popular_place_3', 'Persepolis', 'place'),
            ('popular_event_1', 'Nowruz Festival', 'event'),
            ('popular_route_1', 'Caspian Coast Route', 'route'),
        ]

        for ref_id, name, p_type in popular_items:
            rec_id = f"rec_{uuid.uuid4().hex[:12]}"
            cursor.execute("""
                INSERT OR IGNORE INTO recommendations 
                (recommendation_id, user_id, item_id, item_type, score, reason_type, reason_description, generated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (rec_id, 'system_init', ref_id, p_type, 1.0, 'popularity', f"Popular {p_type}: {name}", now))

        for u_label in ['u100', 'u300']:
            cursor.execute("""
                INSERT OR IGNORE INTO user_profile_features 
                (feature_id, user_id, category, weight, source, updated_at)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (str(uuid.uuid4()), u_label, 'general', 1.0, 'manual', now))
            
            cursor.execute("""
                INSERT OR IGNORE INTO location_context 
                (location_id, user_id, location, radius_km, created_at)
                VALUES (?, ?, ?, ?, ?)
            """, (str(uuid.uuid4()), u_label, 'POINT(51.3890 35.6892)', 100.0, now))

        conn.commit()
        print("Done! All 4 tables created and seeded based on Phase 5 models.")

    except sqlite3.Error as e:
        print(f"Database Error: {e}")
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    seed_database()