import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.fleet': 'Fleet',
    'nav.services': 'Services',
    'nav.reviews': 'Reviews',
    'hero.headline': 'Elite Mobility. Desert Elegance.',
    'hero.subheadline': 'We don\'t just rent cars; we provide the keys to the Kingdom.',
    'hero.cta': 'Reserve Your Vehicle',
    'garage.title': 'The Live Garage',
    'garage.subtitle': 'Our curated fleet of premium vehicles.',
    'car.daily': 'SAR / Day',
    'car.auto': 'Automatic',
    'car.4x4': '4x4',
    'car.leather': 'Leather',
    'car.inquire': 'Inquire via WhatsApp',
    'car.book': 'Book Now',
    'fleet.title': 'Our Complete Fleet',
    'fleet.subtitle': 'Choose from our extensive collection of premium vehicles.',
    'fleet.all': 'All Vehicles',
    'fleet.suv': 'Luxury SUVs',
    'fleet.sedan': 'Premium Sedans',
    'fleet.sports': 'Sports & Exotics',
    'fleet.view_all': 'View Full Fleet',
    'booking.title': 'Complete Your Reservation',
    'booking.pickup': 'Pick-up Date',
    'booking.dropoff': 'Drop-off Date',
    'booking.name': 'Full Name',
    'booking.phone': 'Phone Number',
    'booking.requests': 'Additional Requests (Optional)',
    'booking.next': 'Review Summary',
    'booking.summary': 'Booking Summary',
    'booking.confirm': 'Confirm via WhatsApp',
    'booking.back': 'Back',
    'booking.cancel': 'Cancel',
    'booking.car': 'Selected Vehicle',
    'booking.success_title': 'Request Sent Successfully',
    'booking.success_msg': 'Your reservation details have been forwarded to our WhatsApp (+966501622496). Our team will confirm with you shortly.',
    'booking.close': 'Close Window',
    'vip.title': 'VIP Airport & Residence Pick-up',
    'vip.desc': 'Seamless transitions from arrival to the driver\'s seat. Complimentary premium delivery to your location in Wadi ad-Dawasir.',
    'vip.cta': 'Learn More',
    'reviews.title': 'What Our Travelers Say',
    'reviews.subtitle': 'Authentic experiences from our esteemed clients.',
    'footer.rights': 'All rights reserved.',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.fleet': 'الأسطول',
    'nav.services': 'الخدمات',
    'nav.reviews': 'التقييمات',
    'hero.headline': 'فخامة التنقل. أناقة الصحراء.',
    'hero.subheadline': 'نحن لا نؤجر السيارات فحسب؛ بل نمنحك مفاتيح المملكة.',
    'hero.cta': 'احجز سيارتك',
    'garage.title': 'الأسطول المباشر',
    'garage.subtitle': 'مجموعتنا المختارة من السيارات الفاخرة.',
    'car.daily': 'ريال / يوم',
    'car.auto': 'أوتوماتيك',
    'car.4x4': 'دفع رباعي',
    'car.leather': 'جلد',
    'car.inquire': 'استفسر عبر واتساب',
    'car.book': 'احجز الآن',
    'fleet.title': 'أسطولنا الكامل',
    'fleet.subtitle': 'اختر من مجموعتنا الواسعة من السيارات الفاخرة.',
    'fleet.all': 'جميع السيارات',
    'fleet.suv': 'سيارات الدفع الرباعي الفاخرة',
    'fleet.sedan': 'سيدان فاخرة',
    'fleet.sports': 'رياضية وخارقة',
    'fleet.view_all': 'عرض الأسطول بالكامل',
    'booking.title': 'أكمل حجزك',
    'booking.pickup': 'تاريخ الاستلام',
    'booking.dropoff': 'تاريخ التسليم',
    'booking.name': 'الاسم الكامل',
    'booking.phone': 'رقم الهاتف',
    'booking.requests': 'طلبات إضافية (اختياري)',
    'booking.next': 'مراجعة الملخص',
    'booking.summary': 'ملخص الحجز',
    'booking.confirm': 'تأكيد عبر واتساب',
    'booking.back': 'رجوع',
    'booking.cancel': 'إلغاء',
    'booking.car': 'المركبة المختارة',
    'booking.success_title': 'تم إرسال الطلب بنجاح',
    'booking.success_msg': 'تم توجيه تفاصيل حجزك إلى واتساب الخاص بنا (+966501622496). سيقوم فريقنا بالتأكيد معك قريباً.',
    'booking.close': 'إغلاق النافذة',
    'vip.title': 'استقبال كبار الشخصيات من المطار ومكان الإقامة',
    'vip.desc': 'انتقال سلس من لحظة وصولك إلى مقعد السائق. توصيل مجاني فاخر إلى موقعك في وادي الدواسر.',
    'vip.cta': 'اعرف المزيد',
    'reviews.title': 'ماذا يقول مسافرونا',
    'reviews.subtitle': 'تجارب حقيقية من عملائنا الكرام.',
    'footer.rights': 'جميع الحقوق محفوظة.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  const t = (key: string) => {
    return translations[lang][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
