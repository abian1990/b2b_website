/**
 * Factory tour videos.
 * Put files under /public/videos/ (not src/assets) so Vite does not
 * process large media and browsers can range-request / cache them.
 *
 * Prefer H.264 MP4 (or WebM) under ~5–8MB each. Avoid shipping raw .mov.
 * Add entries here as you upload more clips.
 */
import posterWorkshop from '../assets/part1.webp'
import posterAssembly from '../assets/factory2.webp'
import posterQc from '../assets/factory3.webp'

/** @typedef {{ id: string, title: string, subtitle: string, src: string, poster: string, type?: string }} FactoryVideo */

/** @type {FactoryVideo[]} */
export const factoryVideos = [
  {
    id: 'factory-tour',
    title: 'Factory Tour',
    subtitle: 'Production Floor',
    src: '/videos/factory-tour.mov',
    poster: posterWorkshop,
    type: 'video/quicktime'
  }
  // Example for later:
  // {
  //   id: 'assembly-line',
  //   title: 'Assembly Line',
  //   subtitle: 'Automated Build',
  //   src: '/videos/assembly-line.mp4',
  //   poster: posterAssembly,
  //   type: 'video/mp4'
  // },
]

export { posterWorkshop, posterAssembly, posterQc }
