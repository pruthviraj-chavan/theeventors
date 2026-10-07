<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Media architecture
- Keep all film metadata and placement mappings in `src/lib/media.ts`; CDN pointer imports prevent large runtime media from entering the source bundle.
- Use `EventVideo` for silent previews and `FilmModal` for full playback; shared loading and accessibility behavior must stay consistent across pages.
- Store desktop/mobile MP4 and WebM renditions plus JPEG poster pointers under `src/assets/videos`; optimize offline with no audio and select a browser-supported format before playback.

## Brand assets
- Use the shared navigation Logo for website branding and derive the favicon from the same supplied PNG; use a light-lettering rendition on dark surfaces for legibility.
- Keep the owner phone in CONTACT and generate enquiry destinations through whatsappLink so all contact actions stay consistent.
- Keep the owner address in CONTACT so contact and footer always display the same approved location.

## Section motion
- Use the shared useAutoScroll hook for continuous preview rows; pause offscreen, on interaction and for reduced motion to preserve usability and performance.
