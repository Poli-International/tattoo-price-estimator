# AI Tattoo Price & Image Studio - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Schemas](#data-schemas)
3. [Calculation / Logic Algorithms](#calculation--logic-algorithms)
4. [API Reference](#api-reference)
5. [Integration Guide](#integration-guide)
6. [Customization](#customization)
7. [Performance](#performance)
8. [Browser Compatibility](#browser-compatibility)
9. [Security](#security)
10. [Version History](#version-history)
11. [Support / Contact](#support--contact)

---

## Architecture Overview

### Technology Stack

| Layer | Technology |
|---|---|
| **UI Framework** | React 19.2.3 (via CDN import map) |
| **Styling** | Tailwind CSS (CDN), custom CSS files |
| **Runtime** | ES Modules (type="module") |
| **AI/Image Processing** | @google/genai 1.28.0 (CDN) |
| **State Persistence** | localStorage |
| **Build Output** | Vite-bundled JS (assets/main-DJHx3FeF.js, assets/embed-ZgpJOVr1.js) |

### File Structure

```
/tattoo-price-estimator/
├── index.html                  # Main tool page with tab navigation
├── embed.html                  # Standalone embed version
├── documentation.html          # In-app documentation tab content
├── css/
│   ├── poli-standard.css
│   └── style.css
├── assets/
│   ├── main-DJHx3FeF.js        # Main React bundle (full page)
│   ├── embed-ZgpJOVr1.js       # Embed React bundle (no header/footer)
│   └── useHistoryState-COdHYAH-.js  # Shared dependency (React, scheduler, DOM)
```

### Component / Logic Breakdown

The tool is a single-page React application with two primary modes:

1. **Price Estimator** (`I === "estimator"`)
   - Form panel (size, style, complexity, placement, color scheme, artist experience, machine type)
   - Results panel (price breakdown, visualizer, artist finder)
   - FREE mode (formula-based) vs PREMIUM mode (AI-powered with BYOK)

2. **AI Image Studio** (`I === "imageStudio"`)
   - Text-to-image generation (Gemini Pro Vision)
   - Image editing (prompt-based)
   - Background removal
   - Image upscaling
   - Variation generation

### State Management

- **Form state**: `useHistoryState` custom hook with undo/redo (stored in localStorage as `tattooEstimatorAutoSave`)
- **Drafts**: Stored in localStorage as `tattooEstimatorSavedDrafts`
- **Dark mode**: Stored in localStorage as `poli-dark-mode`

---

## Data Schemas

### Form State Object (`defaultFormState`)

```javascript
{
  width: 6,                    // Number - inches
  height: 8,                   // Number - inches
  style: "AMERICAN_TRADITIONAL", // String - tattoo style enum
  complexity: "MEDIUM",        // String - complexity level enum
  placement: "OUTER_BICEP",    // String - body placement enum
  colorScheme: "BLACK_GREY",   // String - color scheme enum
  artistExperience: "EXPERIENCED", // String - experience level enum
  machineType: "ROTARY",       // String - machine type enum
  imageBase64: null,           // String|null - base64 image data
  imageMimeType: null          // String|null - MIME type of uploaded image
}
```

### Style Enum (`Se`)

Values include: `AMERICAN_TRADITIONAL`, `BLACKWORK`, and others (exact enum values determined by the imported module).

### Complexity Enum (`Nt`)

Values include: `MEDIUM` and others (exact enum values determined by the imported module).

### Placement Enum (`G`)

Values include: `OUTER_BICEP`, `HAND`, `FOOT` and others (exact enum values determined by the imported module).

### Color Scheme Enum (`be`)

Values include: `BLACK_GREY`, `FULL_COLOR` and others (exact enum values determined by the imported module).

### Artist Experience Enum (`Ut`)

Values include: `EXPERIENCED` and others (exact enum values determined by the imported module).

### Machine Type Enum (`jt`)

Values include: `ROTARY` and others (exact enum values determined by the imported module).

### Currency Enum (`Rt`)

Values include: `USD` and others (exact enum values determined by the imported module).

### Drafts Object

```javascript
{
  "draftName1": { /* full form state object */ },
  "draftName2": { /* full form state object */ }
}
```

### Image Studio State

```javascript
{
  generationPrompt: "A photorealistic tattoo of a wolf howling at a geometric moon",
  generationStylePreset: "Photorealistic",
  generationNegativePrompt: "",
  generationArtisticInfluence: "",
  generationAspectRatio: "1:1",
  generationImageQuality: 92,
  generatedImageUrl: null,     // String|null
  generatedImageSaturation: 100,
  sourceImageUrl: null,        // String|null (uploaded image for editing)
  editPrompt: "Add a retro, grainy film filter",
  editedImageUrl: null,        // String|null
  editedImageSaturation: 100,
  variationImages: [],         // Array of data URLs
  upscaledImageUrl: null       // String|null
}
```

---

## Calculation / Logic Algorithms

### FREE Mode Pricing (`Pt` function)

The FREE mode uses a formula-based calculation with the following steps:

1. **Area Calculation**: `width × height` (square inches)
2. **Base Rate**: Derived from style and complexity
3. **Placement Multiplier**: Adjusts based on body location difficulty
4. **Color Scheme Adjustment**: Additional cost for full color vs black/grey
5. **Artist Experience Multiplier**: Higher rates for more experienced artists
6. **Machine Type Factor**: Rotary vs coil machine adjustment
7. **Session Breakdown**: Large pieces split into multiple sessions

### PREMIUM Mode Pricing (`Mt` function)

The PREMIUM mode uses AI analysis with the following steps:

1. **Input Validation**: Same as FREE mode
2. **AI Analysis**: Sends form data (including optional image) to Gemini API
3. **Smart Estimation**: AI returns detailed breakdown considering all factors
4. **Image Analysis**: If an image is uploaded, the AI analyzes the design complexity

### Validation Function (`ge`)

```javascript
function validateForm(formState) {
  const errors = {};
  if (formState.width <= 0) errors.width = "Width must be a positive number.";
  if (formState.height <= 0) errors.height = "Height must be a positive number.";
  if (!formState.style) errors.style = "Please select a tattoo style.";
  if (!formState.complexity) errors.complexity = "Please select a design complexity.";
  if (!formState.placement) errors.placement = "Please select a body placement.";
  if (!formState.colorScheme) errors.colorScheme = "Please select a color scheme.";
  if (formState.style === "BLACKWORK" && formState.colorScheme === "FULL_COLOR") {
    errors.colorScheme = "Full Color is not compatible with Blackwork style.";
  }
  if ((formState.placement === "HAND" || formState.placement === "FOOT") && 
      (formState.width > 6 || formState.height > 6)) {
    if (formState.width > 6) errors.width = 'Max width for this placement is ~6".';
    if (formState.height > 6) errors.height = 'Max height for this placement is ~6".';
  }
  return errors;
}
```

### Image Quality Adjustment (`ut`)

```javascript
async function adjustImageQuality(dataUrl, quality) {
  if (quality >= 100) return dataUrl;
  
  const img = new Image();
  await img.load(dataUrl);
  
  const canvas = document.createElement("canvas");
  const scale = 0.5 + 0.5 * (quality / 100);
  canvas.width = img.width * scale;
  canvas.height = img.height * scale;
  
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  const qualityRatio = quality / 100;
  return canvas.toDataURL("image/jpeg", qualityRatio);
}
```

### Image Analysis (`$t`)

When an image is uploaded in PREMIUM mode, the AI analyzes it to extract:
- `style`: Detected tattoo style
- `complexity`: Estimated complexity level

### Artist Finder (`Ft`)

Uses the Geolocation API to:
1. Get user's current position (latitude/longitude)
2. Query nearby tattoo artists via an API endpoint (`zt`)
3. Return a list of artists with distance information

---

## API Reference

### Public Functions / Handlers

#### `handleSubmit` (`mt`)
- **Signature**: `async () => void`
- **Behavior**: Validates form, then calculates price (FREE or PREMIUM based on mode)
- **Side effects**: Sets loading state, clears previous results, updates error state

#### `handleImageUpload` (`gt`)
- **Signature**: `(event: Event) => void`
- **Behavior**: Reads uploaded image file, converts to base64, triggers AI analysis in PREMIUM mode
- **Parameters**: File input change event

#### `handleImageRemove` (`ht`)
- **Signature**: `() => void`
- **Behavior**: Clears uploaded image data from form state

#### `handleGenerate` (`ft`)
- **Signature**: `async () => void`
- **Behavior**: Generates tattoo image from text prompt using Gemini API
- **Side effects**: Sets generating state, updates generated image URL

#### `handleEdit` (`St`)
- **Signature**: `async () => void`
- **Behavior**: Edits uploaded image based on text instruction using Gemini API
- **Side effects**: Sets editing state, updates edited image URL

#### `handleRemoveBackground` (`bt`)
- **Signature**: `async () => void`
- **Behavior**: Removes background from uploaded image using Gemini API
- **Side effects**: Sets removing state, updates source image URL

#### `handleUpscale` (`It`)
- **Signature**: `async () => void`
- **Behavior**: Upscales image using Gemini API
- **Side effects**: Sets upscaling state, updates upscaled image URL

#### `handleGenerateVariations` (`Et`)
- **Signature**: `async (imageDataUrl: string) => void`
- **Behavior**: Generates 3 variations of the given image using Gemini API
- **Side effects**: Sets generating state, updates variation images array

#### `handleFindArtists` (`Ft`)
- **Signature**: `async () => void`
- **Behavior**: Gets user location and queries nearby tattoo artists
- **Side effects**: Sets loading state, updates artists array

#### `useAsReference` (`xe`)
- **Signature**: `(imageDataUrl: string) => void`
- **Behavior**: Sets the image as reference for price estimation, switches to estimator tab

#### `undo` / `redo` (`Fe`, `Ae`)
- **Signature**: `() => void`
- **Behavior**: Undo/redo form state changes

#### `saveDraft` / `loadDraft` / `deleteDraft` (`Ue`, `Ne`, `ke`)
- **Signature**: `(name: string) => void`
- **Behavior**: Save current form state as draft, load a saved draft, delete a draft

#### `copyEmbedCode`
- **Signature**: `() => void`
- **Behavior**: Copies the embed iframe code to clipboard

---

## Integration Guide

### Standalone Embedding

The tool can be embedded in any website using an iframe:

```html
<iframe 
  src="https://poliinternational.com/tools/tattoo-price-estimator/index.html" 
  width="100%" 
  height="1200" 
  frameborder="0" 
  style="border-radius:12px; border: 1px solid #333;">
</iframe>
```

### Embed Version

For a cleaner embed without the Poli International header/footer, use:

```html
<iframe 
  src="https://poliinternational.com/tools/tattoo-price-estimator/embed.html" 
  width="100%" 
  height="1200" 
  frameborder="0" 
  style="border-radius:12px; border: 1px solid #333;">
</iframe>
```

### Dependencies

The tool is **dependency-free** for the integrator. All dependencies are loaded via CDN:
- React 19.2.3 (from `aistudiocdn.com`)
- Tailwind CSS (from `cdn.tailwindcss.com`)
- Google Fonts (Roboto)
- @google/genai 1.28.0 (from `aistudiocdn.com`)

No server-side setup, API keys, or build process required for basic embedding.

### Tab Navigation

The tool includes built-in tab navigation:
- **Tool tab**: Main interactive tool
- **Documentation tab**: In-app documentation
- **Embed Code tab**: Copy embed code

---

## Customization

### Dark Mode

The tool defaults to dark mode. Users can toggle between dark and light modes using the sun/moon icon button in the header. The preference is persisted in `localStorage` under the key `poli-dark-mode`.

### Currency

Users can select their preferred currency via the `setCurrency` function. Available currencies are defined in the `Rt` enum (includes USD and others).

### API Key (PREMIUM Mode)

For PREMIUM mode, users must provide their own Google Gemini API key. The key is managed via the `onApiKeyChange` callback and is used for AI-powered features.

---

## Performance

### State Persistence

- Form state is auto-saved to `localStorage` every second (debounced via `Ct(c, 1000)`)
- Drafts are saved immediately on save action
- Dark mode preference is saved immediately on toggle

### Image Processing

- Image quality adjustment uses canvas operations (client-side)
- AI operations (generation, editing, background removal) are async and show loading states
- Image data is stored as base64 strings in memory

### Bundle Size

The tool uses two separate bundles:
- `main-DJHx3FeF.js`: Full page version (includes header, footer, navigation)
- `embed-ZgpJOVr1.js`: Embed version (minimal UI)

Shared dependencies are in `useHistoryState-COdHYAH-.js`.

---

## Browser Compatibility

The tool requires modern browser features:

| Feature | Minimum Support |
|---|---|
| **ES Modules** | Chrome 61+, Firefox 60+, Safari 11+, Edge 16+ |
| **Import Maps** | Chrome 89+, Firefox 108+, Safari 16.4+, Edge 89+ |
| **Canvas API** | Chrome 4+, Firefox 3.5+, Safari 3+, Edge 12+ |
| **Geolocation API** | Chrome 5+, Firefox 3.5+, Safari 5+, Edge 12+ |
| **localStorage** | Chrome 4+, Firefox 3.5+, Safari 4+, Edge 8+ |
| **FileReader API** | Chrome 6+, Firefox 3.6+, Safari 6+, Edge 12+ |

**Note**: The tool uses `importmap` which requires relatively modern browsers. For older browsers, a polyfill or build step would be needed.

---

## Security

### Input Handling

- All user inputs are validated client-side before processing
- File uploads are restricted to image types (MIME type checking)
- Image data is processed as base64 strings (no server upload)
- Form validation prevents invalid combinations (e.g., blackwork + full color)

### XSS Prevention

- React's built-in JSX escaping prevents XSS in rendered content
- User-provided text (prompts, descriptions) is rendered as text content, not HTML
- The tool does not use `dangerouslySetInnerHTML`
- All URLs and external links use `target="_blank"` with `rel="noopener noreferrer"`

### API Key Handling

- The Gemini API key is stored in React state (memory only)
- No server-side storage of API keys
- Keys are sent directly to Google's API, not to any intermediary

### localStorage

- Only non-sensitive data is stored (form state, drafts, dark mode preference)
- No authentication tokens, passwords, or personal data stored
- Data is stored as plain JSON (not encrypted)

### Geolocation

- Location is only accessed when user clicks "Find Artists"
- Location data is sent to a Poli International API endpoint
- User must grant permission via browser prompt
- Timeout of 10 seconds for location request

---

## Version History

### Version 1.0.0 (Current)

- Initial release of AI Tattoo Price & Image Studio
- FREE mode: Formula-based pricing calculator
- PREMIUM mode: AI-powered pricing with image analysis
- AI Image Studio: Text-to-image generation, editing, background removal, upscaling, variations
- Artist finder with geolocation
- Dark/light mode toggle
- Draft save/load/delete functionality
- Undo/redo for form state
- Embed support via iframe
- Multi-currency support

---

## Support / Contact

For technical support, bug reports, or integration assistance:

- **Email**: support@poliinternational.com
- **Website**: https://poliinternational.com
- **Documentation**: https://poliinternational.com/tattoo-price-estimator-documentation/
- **Ko-fi**: https://ko-fi.com/C0C81NEXBV

---

*Technical Standard provided by Poli International Engineering*
