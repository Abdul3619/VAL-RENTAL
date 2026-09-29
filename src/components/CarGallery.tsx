import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { CarImage } from '../data/cars';

// Swipeable photo gallery for one car. Works with any number of images; with a single image it simply
// shows that photo. Swipe, the arrow buttons, the dots or the arrow keys change the photo.
export default function CarGallery({ images, name, className = '', sizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw' }: {
  images: CarImage[];
  name: string;
  className?: string;
  sizes?: string;
}) {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const start = useRef<number | null>(null);
  const count = images.length;
  const rtl = lang === 'ar';

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);
  // In right-to-left layouts the "next" direction is to the left.
  const next = () => go(1);
  const prev = () => go(-1);

  const onPointerDown = (e: PointerEvent) => { start.current = e.clientX; };
  const onPointerUp = (e: PointerEvent) => {
    if (start.current === null) return;
    const dx = e.clientX - start.current;
    start.current = null;
    if (Math.abs(dx) < 40 || count < 2) return;
    const forward = rtl ? dx > 0 : dx < 0;
    forward ? next() : prev();
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (count < 2) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); rtl ? prev() : next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); rtl ? next() : prev(); }
  };

  return (
    <div
      className={`relative overflow-hidden select-none touch-pan-y ${className}`}
      role="group"
      aria-roledescription="carousel"
      aria-label={name}
      tabIndex={count > 1 ? 0 : -1}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => { start.current = null; }}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${(rtl ? 1 : -1) * index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={img.src} className={`relative w-full h-full shrink-0 ${loaded[i] ? '' : 'skeleton'}`} aria-hidden={i !== index}>
            <img
              src={img.src}
              srcSet={img.srcSet}
              sizes={sizes}
              alt={rtl ? img.altAr : img.altEn}
              loading="lazy"
              decoding="async"
              draggable={false}
              onLoad={() => setLoaded((l) => ({ ...l, [i]: true }))}
              ref={(el) => { if (el?.complete && el.naturalWidth > 0 && !loaded[i]) setLoaded((l) => ({ ...l, [i]: true })); }}
              className={`w-full h-full object-cover transition-opacity duration-500 ${loaded[i] ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button type="button" onClick={rtl ? next : prev} aria-label={rtl ? 'الصورة التالية' : 'Previous photo'} className="press absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-obsidian/70 text-alabaster flex items-center justify-center hover:bg-gold hover:text-obsidian focus-visible:ring-2 focus-visible:ring-gold">
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={rtl ? prev : next} aria-label={rtl ? 'الصورة السابقة' : 'Next photo'} className="press absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-obsidian/70 text-alabaster flex items-center justify-center hover:bg-gold hover:text-obsidian focus-visible:ring-2 focus-visible:ring-gold">
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
          <div className="absolute top-3 inset-x-0 z-10 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${rtl ? 'صورة' : 'Photo'} ${i + 1} / ${count}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-gold' : 'w-1.5 bg-alabaster/60 hover:bg-alabaster'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
