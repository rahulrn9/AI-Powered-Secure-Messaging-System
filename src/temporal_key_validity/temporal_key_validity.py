from datetime import datetime, timedelta
def is_valid(created, hrs=24): return datetime.utcnow() < created + timedelta(hours=hrs)
