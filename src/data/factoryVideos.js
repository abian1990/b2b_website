/**
 * Factory tour videos.
 *
 * Cloudflare Pages: each static file must be ≤ 25 MiB.
 * - ≤25MB: put under /public/videos/ → src: '/videos/xxx.mp4'
 * - larger: upload to R2/CDN, set VITE_MEDIA_BASE, use mediaUrl('/videos/xxx.mp4')
 * Keep masters in /media/videos/ (gitignored). Never commit oversized files into public/.
 */
import posterWorkshop from '../assets/part1.webp'
import posterAssembly from '../assets/factory2.webp'
import posterQc from '../assets/factory3.webp'

/** @typedef {{ id: string, title: string, subtitle: string, src: string, poster: string, type?: string }} FactoryVideo */

const MEDIA_BASE = (import.meta.env.VITE_MEDIA_BASE || '').replace(/\/$/, '')

/** Resolve relative /videos/... against optional CDN base (R2 custom domain). */
export const mediaUrl = (path) => {
  if (!path) return path
  if (/^https?:\/\//i.test(path)) return path
  return MEDIA_BASE ? `${MEDIA_BASE}${path.startsWith('/') ? path : `/${path}`}` : path
}

/** @type {FactoryVideo[]} */
export const factoryVideos = [
  {
    id: 'factory-tour',
    title: 'Factory Tour',
    subtitle: 'Production Floor',
    src: mediaUrl('/videos/factory-tour.mp4'),
    poster: posterWorkshop,
    type: 'video/mp4'
  }
]

export { posterWorkshop, posterAssembly, posterQc, MEDIA_BASE }
