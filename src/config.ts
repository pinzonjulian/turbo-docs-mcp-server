/**
 * Configuration for Turbo documentation files
 */
export interface DocFile {
  folder: string;
  file: string;
  name: string;
  description: string;
}

// Define individual tools for each documentation file
export const docFiles: DocFile[] = [
  // Handbook files
  {
    folder: 'handbook',
    file: '01_introduction.md',
    name: 'handbook-introduction',
    description: 'Introduction to Turbo - learn about HTML-over-the-wire approach, persistent processes, and how Turbo Drive, Frames, Streams, and Native work together to create fast web applications without heavy JavaScript frameworks'
  },
  {
    folder: 'handbook',
    file: '02_drive.md',
    name: 'handbook-drive',
    description: 'Turbo Drive navigation guide - covers page visits, application/restoration visits, link handling, form submissions, progress indicators, caching, prefetching, and view transitions for fast page navigation'
  },
  {
    folder: 'handbook',
    file: '03_page_refreshes.md',
    name: 'handbook-page-refreshes'
    , description: 'Page refresh techniques with morphing - learn about smooth page updates using DOM morphing with idiomorph, scroll preservation, excluding sections from morphing, and broadcasting refresh streams'
  },
  {
    folder: 'handbook',
    file: '04_frames.md',
    name: 'handbook-frames',
    description: 'Turbo Frames for page decomposition - covers independent page segments, scoped navigation, eager/lazy loading, cache benefits, targeting navigation, frame promotion to visits, and custom rendering'
  },
  {
    folder: 'handbook',
    file: '05_streams.md',
    name: 'handbook-streams',
    description: 'Turbo Streams for live updates - learn about the 9 stream actions (append, prepend, replace, update, remove, before, after, morph, refresh), WebSocket/SSE integration, and server-side template reuse'
  },
  {
    folder: 'handbook',
    file: '06_native.md',
    name: 'handbook-native',
    description: 'Hotwire Native for mobile apps - overview of iOS and Android native app development using Turbo-enabled web views for hybrid applications with native navigation and web content'
  },
  {
    folder: 'handbook',
    file: '07_building.md',
    name: 'handbook-building',
    description: 'Building Turbo applications - covers script handling, JavaScript bundling, caching strategies, installing behavior with Stimulus, making transformations idempotent, and persisting elements across page loads'
  },
  {
    folder: 'handbook',
    file: '08_installing.md',
    name: 'handbook-installing',
    description: 'Installing Turbo in your application - covers CDN installation, npm package setup, bundler integration, importing strategies, and Rails-specific installation with turbo-rails gem'
  },

  // Reference files
  {
    folder: 'reference',
    file: 'attributes.md',
    name: 'reference-attributes',
    description: 'Complete reference for Turbo data attributes and meta tags - covers all data-turbo-* attributes for controlling Drive behavior, frame navigation, caching, and automatically added attributes like aria-busy'
  },
  {
    folder: 'reference',
    file: 'drive.md',
    name: 'reference-drive',
    description: 'Turbo Drive API reference - detailed documentation of Drive methods, configuration options, and programmatic control of navigation behavior'
  },
  {
    folder: 'reference',
    file: 'events.md',
    name: 'reference-events',
    description: 'Turbo events reference - comprehensive list of all Turbo events fired during navigation, form submissions, frame updates, and stream processing for lifecycle management'
  },
  {
    folder: 'reference',
    file: 'frames.md',
    name: 'reference-frames',
    description: 'Turbo Frames API reference - detailed frame element attributes, JavaScript methods, lifecycle callbacks, and programmatic frame control'
  },
  {
    folder: 'reference',
    file: 'streams.md',
    name: 'reference-streams',
    description: 'Turbo Streams API reference - complete documentation of stream actions, JavaScript methods, custom action creation, and programmatic stream handling'
  }
];
