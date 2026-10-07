# Yaadein — Photo & Video Replacement Guide
Updated 7 October 2026

## 1. What is live now
Six original ten-second films are used instead of the sample YouTube clips. Every film has a 1280px desktop version, a 640px mobile version and a JPEG still preview. MP4 is used when supported, with WebM for browsers without MP4 support. Files are hosted through Lovable Assets rather than streamed from GitHub.

- Home: venue-entrance background; all six films in Watch the moments.
- About: guests header; asymmetric feature-film layout with guests, brand reveal and estate.
- Events: entrance header; swipeable portrait collection with entrance, courtyard, dandiya and estate.
- Gallery: courtyard header; six-film grid followed by the existing photograph collection.
- Blog: brand-reveal header.
- Contact: estate header above the enquiry section.

All decorative playback is silent and loops. Full films open in an accessible dialog with native playback controls and Escape-to-close. The original supplied clips are ten seconds; displayed durations now reflect that. Film display titles are editorial labels based on the filenames, not verified event names or locations.

## 2. Original files and compression
The originals are in the project’s `videos/` directory. The supplied GitHub URL returned 404 from the public API during this update; matching original files were already present locally and were used. `videos/test.mp4` is one byte and is not a valid film, so it is excluded.

Sizes below are decimal MB; the reduction compares original footage with desktop/mobile MP4 output.

| Key | Original filename | Original | Desktop MP4 | Mobile MP4 | Desktop / mobile reduction |
|---|---|---:|---:|---:|---:|
| brand | `Gold_text_reveals_brand_title_20261007105130.mp4` | 7.83 MB | 2.15 MB | 0.75 MB | 72% / 90% |
| estate | `Guests_celebrating_at_luxury_estate_20261007103205.mp4` | 13.16 MB | 2.83 MB | 0.80 MB | 79% / 94% |
| guests | `Guests_celebrating_at_luxury_venue_20261007104512.mp4` | 8.36 MB | 1.72 MB | 0.50 MB | 79% / 94% |
| dandiya | `Guests_dancing_with_dandiya_sticks_20261007103229.mp4` | 17.95 MB | 3.97 MB | 1.09 MB | 78% / 94% |
| entrance | `Luxury_celebration_venue_entranc…_1080p_20261007101522.mp4` | 14.17 MB | 2.84 MB | 0.79 MB | 80% / 94% |
| courtyard | `Palace_courtyard_prepared_for_ce…_20261007101335.mp4` | 12.77 MB | 2.63 MB | 0.73 MB | 79% / 94% |

## 3. Where media and code live

| Location | Purpose |
|---|---|
| `src/assets/` | Existing bundled photos: hero.jpg, wedding.jpg, corporate.jpg, social.jpg, birthday.jpg, sangeet.jpg, lanterns.jpg, team.jpg |
| `src/assets/videos/` | CDN pointer files, not video bytes: `<key>-desktop.mp4.asset.json`, `<key>-mobile.mp4.asset.json`, matching WebM pointers and `<key>-poster.jpg.asset.json` |
| `src/lib/data.ts` | Photo imports, image map, event categories, showcase photos, blog photos, testimonials and contact information |
| `src/lib/media.ts` | Video pointer imports, video titles, original filenames, duration, homepage background and page-header mappings |
| `src/components/site/EventVideo.tsx` | Silent autoplay, device/format selection, lazy loading, pause/play control, offscreen pausing and poster fallback |
| `src/components/site/FilmGallery.tsx` | Film tiles, distinct collection layouts and fullscreen film dialog |
| `src/components/site/PageHero.tsx` | Compact video title/header on non-home pages |
| `src/routes/index.tsx` | Homepage hero, story photos, event showcase and Watch the moments layout |
| `src/routes/about.tsx`, `events.tsx`, `gallery.tsx` | Page-specific film selections and content |
| `src/routes/blog.tsx`, `contact.tsx` | Blog and enquiry content, each with compact video header |
| `src/styles.css` | Shared theme, typography and visual tokens |

### Exact edit points
- **Photo map:** `src/lib/data.ts:11`
- **Event category photos:** `src/lib/data.ts:25`
- **Gallery/showcase photos:** `src/lib/data.ts:32`
- **Blog images:** `src/lib/data.ts:49`
- **Film titles, durations and files:** `src/lib/media.ts:34`
- **Homepage background selection:** `src/lib/media.ts:43`
- **Homepage/gallery film order:** `src/lib/media.ts:44`
- **Non-home header selections:** `src/lib/media.ts:46`
- **About film selection:** `src/routes/about.tsx:70`
- **Events film selection:** `src/routes/events.tsx:58`
- **Gallery collection:** `src/routes/gallery.tsx:42`
- **Watch the moments layout:** `src/routes/index.tsx:319`

Line references are accurate for this version but move when code is edited; search for the named export or function if that happens.

## 4. Replace a photo
For an existing bundled photograph, keep the same filename in `src/assets/` and replace its contents with your new image; every reference updates together. For example, `wedding.jpg` is reused across categories, gallery and blog. Avoid changing a shared photo if only one event should change.

For a new individual image, use Lovable Assets, then import its pointer into `src/lib/data.ts` and use `.url` in the relevant category, showcase or post record:

```bash
lovable-assets create --file /tmp/new-wedding.jpg --filename new-wedding.jpg > src/assets/new-wedding.jpg.asset.json
```

```tsx
import weddingPhoto from "@/assets/new-wedding.jpg.asset.json";
// In the individual showcase/category/post record:
img: weddingPhoto.url
```

Do not hand-edit the pointer URL or asset ID. Suggested photos: JPEG/WebP, landscape 1600–1920px for wide sections; portrait 1000–1400px for event cards; typically below 300–500KB. Match the intended aspect ratio, keep important faces away from edges, and update descriptive alt text where needed. Existing photos are placeholder imagery from the initial site and should be replaced with approved brand photography.

## 5. Replace or add a video
1. Keep the raw original outside the served asset directories during processing.
2. Create a desktop MP4, mobile MP4, matching WebM versions and a still poster.
3. Upload each optimized file with Lovable Assets, keeping its JSON output as a pointer in `src/assets/videos/`.
4. Import those pointers in `src/lib/media.ts`; update the appropriate record in `videoLibrary`.
5. Update its real duration and original filename. Set `heroFilm` for Home, `pageFilms` for compact page headers, and `eventFilms` for the main film order.
6. Update the page-specific `FilmGallery` selections for About or Events if necessary.

### Compression recipe
Use your actual input filename; output files below are examples. Do not paste the placeholder filename without replacing it.

```bash
ffmpeg -i ORIGINAL.mp4 -an -vf "scale=1280:-2,fps=24" -c:v libx264 -preset fast -crf 27 -pix_fmt yuv420p -movflags +faststart desktop.mp4
ffmpeg -i ORIGINAL.mp4 -an -vf "scale=640:-2,fps=24" -c:v libx264 -preset fast -crf 29 -pix_fmt yuv420p -movflags +faststart mobile.mp4
ffmpeg -i desktop.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 36 -deadline realtime -cpu-used 6 desktop.webm
ffmpeg -i mobile.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 36 -deadline realtime -cpu-used 6 mobile.webm
ffmpeg -ss 1 -i ORIGINAL.mp4 -frames:v 1 -vf "scale=960:-2" -q:v 3 poster.jpg
```

`-an` removes audio for lightweight previews. For future full films needing sound, upload a separate full version with audio and use it in the dialog rather than silently removing meaningful sound.

```bash
lovable-assets create --file /tmp/desktop.mp4 --filename new-film-desktop.mp4 > src/assets/videos/new-film-desktop.mp4.asset.json
```

Repeat the upload for mobile MP4, both WebM versions and poster. In code, imported pointer objects supply `.url`, not the object itself. Never delete CDN assets still used by older deployments. Assets are immutable: new uploads receive new URLs.

## 6. Why playback starts faster
- Posters display before video data is ready.
- Phones download the smaller 640px version instead of 1080p originals.
- 24fps, optimized quality and no audio lower transfer size.
- MP4 faststart moves playback metadata to the beginning.
- Only nearby previews receive a source; offscreen and hidden-tab videos pause.
- Native films replace YouTube embeds; no iframe/player scripts load.
- CDN delivery supports byte-range requests and long-lived caching.
- Reduced-motion and data-saving users see posters until they explicitly press Play.

Autoplay is requested silently with `muted` and `playsInline`; battery settings and browser policy can still block it. The pause/play button and still preview keep the page usable. A failed film shows a retry state in the dialog. Fast loading depends on connection quality; compression is not a guarantee of instant playback everywhere.

## 7. Verification and remaining content
Verified locally in Chromium: homepage video progresses; all five non-home headers progress; fullscreen film progresses and Escape closes it; all six pages have no horizontal overflow at 360, 390 and 430px; mobile sources use smaller renditions; reduced-motion does not auto-download/play video; no runtime errors. Current automated navigation test passes and latest preview compilation is successful. Chromium here lacks H.264 support, so WebM playback was exercised end to end; MP4 byte delivery was checked, but actual Safari/iOS/MP4 playback remains a device-level check.

This update does not verify portfolio claims, testimonials, contact details, event dates or venue locations from the initial demo content. Replace those with approved real business information before launch. No publishing action was performed.
