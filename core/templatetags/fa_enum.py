from django import template
from django.utils.encoding import force_str

register = template.Library()

_MAPPING = {
    "economy": "اقتصادی",
    "economic": "اقتصادی",
    "economical": "اقتصادی",
    "medium": "متوسط",
    "normal": "متوسط",
    "standard": "متوسط",
    "moderate": "متوسط",
    "luxury": "لوکس",
    "lux": "لوکس",
    "draft": "پیش‌نویس",
    "active": "فعال",
    "finished": "تمام‌شده",
    "done": "تمام‌شده",
    "completed": "تمام‌شده",
    "cancelled": "لغوشده",
    "canceled": "لغوشده",
}


@register.filter(name="fa_enum")
def fa_enum(value):
    """
    Translate common enum/status/budget English strings to Persian.
    Returns the original value if no mapping is found.
    """
    if value is None:
        return value

    text = force_str(value).strip()
    if not text:
        return value

    mapped = _MAPPING.get(text.lower())
    return mapped if mapped is not None else value
