---
name: Correct Gemini Image Generation Model ID
description: The correct model ID for image generation is gemini-2.5-flash-image. Previous models (gemini-2.0-flash-exp) are deprecated and return 404.
type: feedback
---

Use `gemini-2.5-flash-image` as the model ID for all image generation calls.

**Why:** The model `gemini-2.0-flash-exp` was deprecated and returns 404 NOT_FOUND. Confirmed via Context7 docs for googleapis/python-genai (2026-03-15).

**How to apply:** In every `client.models.generate_content()` call, use `model='gemini-2.5-flash-image'`. Also use `response_modalities=['IMAGE']` in the config. The `image_config` parameter with `aspect_ratio` is optional.

**Python pattern:**
```python
from google import genai
from google.genai import types

client = genai.Client(api_key=os.environ['GEMINI_API_KEY'])
response = client.models.generate_content(
    model='gemini-2.5-flash-image',
    contents='your prompt here',
    config=types.GenerateContentConfig(response_modalities=['IMAGE'])
)
```

**Environment:** API key is in `/Users/muthuemil/Documents/Auggie/orderflow-astro/.env`. Must use a Python venv (`.venv/`) because macOS blocks system-wide pip installs. Run `source .venv/bin/activate` before executing.
