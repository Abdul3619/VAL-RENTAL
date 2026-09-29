// Car photos: PLACEHOLDER/DEMO images (free stock photos of each model, plus front and side detail crops made from
// the same photo). Each car reads from an `images` array of any length, so a future owner dashboard can simply
// supply its own uploaded photos in the same shape.
const files = import.meta.glob('../assets/cars/*.webp', { eager: true, import: 'default' }) as Record<string, string>;

export interface CarImage {
  src: string;
  srcSet: string;
  altEn: string;
  altAr: string;
}

export interface Car {
  id: number;
  slug: string;
  nameEn: string;
  nameAr: string;
  price: number;
  category: 'suv' | 'sedan' | 'sports';
  images: CarImage[];
}

const VIEWS = [
  { key: 'main', en: '', ar: '' },
  { key: 'front', en: 'front detail', ar: 'تفاصيل الواجهة الأمامية' },
  { key: 'side', en: 'side and wheel detail', ar: 'تفاصيل الجانب والعجلات' },
];

function galleryFor(slug: string, nameEn: string, nameAr: string): CarImage[] {
  return VIEWS.flatMap((view) => {
    const lg = files[`../assets/cars/${slug}-${view.key}-lg.webp`];
    const sm = files[`../assets/cars/${slug}-${view.key}-sm.webp`];
    if (!lg || !sm) return [];
    const width = view.key === 'main' ? 1600 : 1200;
    return [{
      src: sm,
      srcSet: `${sm} ${width / 2}w, ${lg} ${width}w`,
      altEn: view.en ? `${nameEn}, ${view.en}` : nameEn,
      altAr: view.ar ? `${nameAr}، ${view.ar}` : nameAr,
    }];
  });
}

const car = (id: number, slug: string, nameEn: string, nameAr: string, price: number, category: Car['category']): Car =>
  ({ id, slug, nameEn, nameAr, price, category, images: galleryFor(slug, nameEn, nameAr) });

export const cars: Car[] = [
  car(1, 'land-cruiser', 'Toyota Land Cruiser VXR', 'تويوتا لاند كروزر VXR', 1200, 'suv'),
  car(2, 'lexus-lx', 'Lexus RX', 'لكزس RX', 1400, 'suv'),
  car(3, 'nissan-patrol', 'Nissan Patrol Platinum', 'نيسان باترول بلاتينيوم', 1100, 'suv'),
  car(4, 'g-class', 'Mercedes-Benz G-Class', 'مرسيدس جي كلاس', 2500, 'suv'),
  car(5, 's-class', 'Mercedes-Benz S-Class', 'مرسيدس اس كلاس', 2000, 'sedan'),
  car(6, 'bmw-7', 'BMW 7 Series', 'بي ام دبليو الفئة السابعة', 1900, 'sedan'),
  car(7, 'porsche-911', 'Porsche 911 Carrera', 'بورش 911 كاريرا', 2800, 'sports'),
  car(8, 'range-rover', 'Range Rover Autobiography', 'رينج روفر أوتوبيوغرافي', 2200, 'suv'),
  car(9, 'lamborghini-urus', 'Lamborghini Urus', 'لامبورجيني أوروس', 3500, 'sports'),
];
