---
name: Correct Gemini Image Generation Model ID
description: The correct model ID for image generation is gemini-2.5-flash-image. Previous models (gemini-2.0-flash-exp) are deprecated and return 404.
type: feedback
---

Use `gemini-3-pro-image-preview` (Nano Banana Pro) as the model ID for all image generation. NEVER use `gemini-2.5-flash-image` (Flash tier) because the quality is visibly poor and looks AI-generated.

**Why:** On 2026-03-15, images generated with `gemini-2.5-flash-image` were low quality and looked skewed/artificial. Switching to `gemini-3-pro-image-preview` with `image_size='2K'` produced sharp, photorealistic results at 2752x1536 native resolution.

**How to apply:** In every image generation call, use this exact pattern. ALWAYS set aspect_ratio and image_size.

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
