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
    'hero.subheadline': 'Premium SUVs, sedans and sports cars, delivered to you across the region.',
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
    'booking.days': 'Rental Days',
    'booking.total': 'Estimated Total',
    'booking.success_title': 'Almost Done',
    'booking.success_msg': 'Your reservation details are ready in WhatsApp. Send the message to submit your request, and the team will confirm with you shortly.',
    'booking.close': 'Close Window',
    'vip.title': 'VIP Airport & Residence Pick-up',
    'vip.desc': 'Seamless transitions from arrival to the driver\'s seat, with complimentary delivery to your location anywhere we serve in the region.',
    'vip.cta': 'Learn More',
    'reviews.title': 'What Our Travelers Say',
    'reviews.subtitle': 'What renting with us is like.',
    'footer.rights': 'All rights reserved.',
    'footer.sampleReviews': 'Reviews shown are sample content.',
    'footer.builtBy': 'Built by Abdulwahab Abdullahi',
    'footer.contactDev': 'Contact the developer',
    'car.seg.suv': '4x4',
    'car.seg.sedan': 'Executive',
    'car.seg.sports': 'Performance',
    'booking.step': 'Step',
    'booking.saved_note': 'Your progress is saved on this device.',
    'booking.close_window': 'Close',
    'resume.title': 'Continue your booking',
    'resume.continue': 'Continue',
    'resume.discard': 'Discard',
    'vip.airport': 'Direct handover at the regional airport.',
    'reviews.sample': 'Sample review',
    'req.title': 'Rental requirements',
    'req.subtitle': 'What you need to rent with us.',
    'req.license': 'Valid driving licence',
    'req.license_desc': 'A local licence, or an international driving permit with your home licence.',
    'req.age': 'Minimum age',
    'req.age_desc': 'Drivers must be 21 or older; 25 or older for sports and exotic cars.',
    'req.id': 'ID or passport',
    'req.id_desc': 'A national ID or passport matching the booking name.',
    'req.deposit': 'Refundable deposit',
    'req.deposit_desc': 'Held on a card and released when the car is returned in the same condition.',
    'faq.title': 'Frequently asked questions',
    'faq.q1': 'Is insurance included?',
    'faq.a1': 'Every rental includes basic insurance. Full cover with a lower excess can be added when you book.',
    'faq.q2': 'Can I get the car delivered?',
    'faq.a2': 'Yes. We deliver to hotels, homes and the airport across the areas we serve, free of charge.',
    'faq.q3': 'What is the fuel policy?',
    'faq.a3': 'Cars are delivered with a full tank and should be returned full, or refuelling is charged at cost.',
    'faq.q4': 'Can I change or cancel my booking?',
    'faq.a4': 'Message us on WhatsApp. Changes and cancellations more than 48 hours before pick-up are free.',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.fleet': 'الأسطول',
    'nav.services': 'الخدمات',
    'nav.reviews': 'التقييمات',
    'hero.headline': 'فخامة التنقل. أناقة الصحراء.',
    'hero.subheadline': 'سيارات دفع رباعي وسيدان ورياضية فاخرة، نوصلها إليك في أنحاء المنطقة.',
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
    'booking.days': 'عدد أيام الإيجار',
    'booking.total': 'الإجمالي التقديري',
    'booking.success_title': 'خطوة أخيرة',
    'booking.success_msg': 'تفاصيل حجزك جاهزة في واتساب. أرسل الرسالة لتقديم طلبك، وسيتواصل معك الفريق للتأكيد قريباً.',
    'booking.close': 'إغلاق النافذة',
    'vip.title': 'استقبال كبار الشخصيات من المطار ومكان الإقامة',
    'vip.desc': 'انتقال سلس من لحظة وصولك إلى مقعد السائق، مع توصيل مجاني إلى موقعك في جميع المناطق التي نخدمها.',
    'vip.cta': 'اعرف المزيد',
    'reviews.title': 'ماذا يقول مسافرونا',
    'reviews.subtitle': 'كيف تبدو تجربة الاستئجار معنا.',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.sampleReviews': 'التقييمات المعروضة هي محتوى توضيحي.',
    'footer.builtBy': 'تطوير عبد الوهاب عبدالله',
    'footer.contactDev': 'تواصل مع المطور',
    'car.seg.suv': 'دفع رباعي',
    'car.seg.sedan': 'تنفيذية',
    'car.seg.sports': 'أداء عالٍ',
    'booking.step': 'الخطوة',
    'booking.saved_note': 'يتم حفظ تقدمك على هذا الجهاز.',
    'booking.close_window': 'إغلاق',
    'resume.title': 'أكمل حجزك',
    'resume.continue': 'متابعة',
    'resume.discard': 'تجاهل',
    'vip.airport': 'تسليم مباشر في المطار الإقليمي.',
    'reviews.sample': 'تقييم توضيحي',
    'req.title': 'متطلبات الاستئجار',
    'req.subtitle': 'ما تحتاجه للاستئجار معنا.',
    'req.license': 'رخصة قيادة سارية',
    'req.license_desc': 'رخصة محلية، أو رخصة قيادة دولية مع رخصة بلدك.',
    'req.age': 'الحد الأدنى للعمر',
    'req.age_desc': 'يجب ألا يقل عمر السائق عن 21 عاماً، و25 عاماً للسيارات الرياضية والفاخرة جداً.',
    'req.id': 'الهوية أو جواز السفر',
    'req.id_desc': 'هوية وطنية أو جواز سفر مطابق لاسم الحجز.',
    'req.deposit': 'تأمين مسترد',
    'req.deposit_desc': 'يُحجز على البطاقة ويُعاد عند إرجاع السيارة بنفس الحالة.',
    'faq.title': 'الأسئلة الشائعة',
    'faq.q1': 'هل التأمين مشمول؟',
    'faq.a1': 'كل إيجار يشمل تأميناً أساسياً، ويمكن إضافة تغطية شاملة بتحمل أقل عند الحجز.',
    'faq.q2': 'هل يمكن توصيل السيارة إلي؟',
    'faq.a2': 'نعم. نوصل مجاناً إلى الفنادق والمنازل والمطار في المناطق التي نخدمها.',
    'faq.q3': 'ما هي سياسة الوقود؟',
    'faq.a3': 'تُسلم السيارات بخزان ممتلئ ويجب إرجاعها ممتلئة، وإلا تُحتسب تكلفة التعبئة.',
    'faq.q4': 'هل يمكنني تعديل الحجز أو إلغاؤه؟',
    'faq.a4': 'راسلنا عبر واتساب. التعديل والإلغاء مجانيان قبل 48 ساعة من موعد الاستلام.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');
  const [restored, setRestored] = useState(false);

  // Remember the visitor's language. The prerendered HTML is English, so the saved choice is applied after hydration.
  useEffect(() => {
    try {
      if (window.localStorage.getItem('velocity:lang') === 'ar') setLang('ar');
    } catch { /* storage unavailable */ }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try { window.localStorage.setItem('velocity:lang', lang); } catch { /* ignore */ }
  }, [lang, restored]);

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
