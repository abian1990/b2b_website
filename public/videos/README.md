# Factory videos for Cloudflare Pages

**Hard limit:** Pages rejects any file **> 25 MiB**. Do not put `factory-tour.mov` (~40MB) here.

## Options

1. **Compress** master from `media/videos/` to H.264 MP4 ≤ ~20MB, then copy here:
   ```bash
   ffmpeg -i media/videos/factory-tour.mov -c:v libx264 -crf 28 -preset medium \
     -vf "scale='min(1280,iw)':-2" -c:a aac -b:a 96k -movflags +faststart \
     public/videos/factory-tour.mp4
   ```
2. **R2 / CDN**: upload large file, set Pages build env `VITE_MEDIA_BASE=https://cdn.yourdomain.com`,
   then register the clip in `src/data/factoryVideos.js` with `mediaUrl('/videos/...')`.

After adding an mp4, uncomment the entry in `factoryVideos.js`.
