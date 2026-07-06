import re
import unicodedata

def clean_text(text):
    if not text:
        return ""

    # lowercase
    text = text.lower()

    # enlever accents (é → e)
    text = unicodedata.normalize("NFKD", text)
    text = "".join([c for c in text if not unicodedata.combining(c)])

    # enlever ponctuation
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)

    # enlever espaces multiples
    text = re.sub(r"\s+", " ", text).strip()

    return text
