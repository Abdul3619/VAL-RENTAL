export interface Car {
  id: number;
  nameEn: string;
  nameAr: string;
  price: number;
  image: string;
  category: 'suv' | 'sedan' | 'sports';
}

export const cars: Car[] = [
  {
    id: 1,
    nameEn: 'Toyota Land Cruiser VXR',
    nameAr: 'تويوتا لاند كروزر VXR',
    price: 1200,
    category: 'suv',
    image: '/land-cruiser.jpg',
  },
  {
    id: 2,
    nameEn: 'Lexus LX 600',
    nameAr: 'لكزس LX 600',
    price: 1800,
    category: 'suv',
    image: '/lexus-lx.jpg',
  },
  {
    id: 3,
    nameEn: 'Nissan Patrol Platinum',
    nameAr: 'نيسان باترول بلاتينيوم',
    price: 1100,
    category: 'suv',
    image: '/nissan-patrol.jpg',
  },
  {
    id: 4,
    nameEn: 'Mercedes-Benz G-Class',
    nameAr: 'مرسيدس جي كلاس',
    price: 2500,
    category: 'suv',
    image: '/g-class.jpg',
  },
  {
    id: 5,
    nameEn: 'Mercedes-Benz S-Class',
    nameAr: 'مرسيدس اس كلاس',
    price: 2000,
    category: 'sedan',
    image: '/s-class.jpg',
  },
  {
    id: 6,
    nameEn: 'BMW 7 Series',
    nameAr: 'بي ام دبليو الفئة السابعة',
    price: 1900,
    category: 'sedan',
    image: '/bmw-7.jpg',
  },
  {
    id: 7,
    nameEn: 'Porsche 911 Carrera',
    nameAr: 'بورش 911 كاريرا',
    price: 2800,
    category: 'sports',
    image: '/porsche-911.jpg',
  },
  {
    id: 8,
    nameEn: 'Range Rover Autobiography',
    nameAr: 'رينج روفر أوتوبيوغرافي',
    price: 2200,
    category: 'suv',
    image: '/range-rover.jpg',
  },
  {
    id: 9,
    nameEn: 'Lamborghini Urus',
    nameAr: 'لامبورجيني أوروس',
    price: 3500,
    category: 'sports',
    image: '/lamborghini-urus.jpg',
  }
];
