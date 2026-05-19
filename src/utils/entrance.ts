export type EntranceLoadSeq = 0 | 1 | 2 | 3 | 4;

/** Scroll-triggered fade-in (intersect observer + reduced motion). */
export function entranceIntersect(extra = ''): string {
  return [
    'intersect-once',
    'intersect-quarter',
    'motion-safe:opacity-0',
    'motion-safe:intersect:animate-fade',
    'fade-stagger',
    extra,
  ]
    .filter(Boolean)
    .join(' ');
}

/** Load-time sequenced entrance (homepage hero); parent needs `entrance-load`. */
export function entranceLoad(seq: EntranceLoadSeq): string {
  return `entrance-fade entrance-seq-${seq}`;
}
