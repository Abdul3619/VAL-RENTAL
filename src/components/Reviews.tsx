import { useLanguage } from '../context/LanguageContext';
import { Star, Quote } from 'lucide-react';
import IllustrativeBadge from './IllustrativeBadge';

const reviews = [
  {
    id: 1,
    nameEn: 'Ahmad D.',
    nameAr: 'أحمد د.',
    textEn: 'Exceptional service. They delivered the Land Cruiser directly to my hotel. The car was spotless and the process was incredibly fast.',
    textAr: 'خدمة استثنائية. قاموا بتوصيل لاند كروزر مباشرة إلى فندقي. السيارة كانت نظيفة جداً والعملية سريعة للغاية.',
    rating: 5,
  },
  {
    id: 2,
    nameEn: 'Sarah M.',
    nameAr: 'سارة م.',
    textEn: 'The VIP airport pick-up saved me so much time. A representative was waiting for me as soon as I landed. Highly recommend Velocity Rentals for business travelers.',
    textAr: 'خدمة الاستقبال من المطار وفرت علي الكثير من الوقت. كان المندوب بانتظاري فور هبوطي. أوصي بشدة بفيلوسيتي للتأجير للمسافرين من رجال الأعمال.',
    rating: 5,
  },
  {
    id: 3,
    nameEn: 'Khalid R.',
    nameAr: 'خالد ر.',
    textEn: 'Premium fleet and professional staff. The prices are very competitive given the level of luxury and convenience they provide with the free delivery.',
    textAr: 'أسطول فاخر وموظفون محترفون. الأسعار تنافسية جداً بالنظر إلى مستوى الفخامة والراحة التي يقدمونها مع التوصيل المجاني.',
    rating: 5,
  }
];

export default function Reviews() {
  const { t, lang } = useLanguage();

  return (
    <section id="reviews" className="py-24 bg-obsidian border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gold mb-4">{t('reviews.title')}</h2>
          <p className="text-alabaster/80 text-lg">{t('reviews.subtitle')}</p>
          <p className="mt-4 text-gold"><IllustrativeBadge label={lang === 'en' ? 'Illustrative example' : 'مثال توضيحي'} /></p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-[#111] p-8 rounded-lg border border-gold/10 relative">
              <Quote className="absolute top-6 right-6 rtl:right-auto rtl:left-6 w-12 h-12 text-gold/10" aria-hidden="true" />
              <div className="flex gap-1 mb-6" role="img" aria-label={`${review.rating} / 5`}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-alabaster/80 mb-6 leading-relaxed relative z-10">
                "{lang === 'en' ? review.textEn : review.textAr}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                  {(lang === 'en' ? review.nameEn : review.nameAr).charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-alabaster">
                    {lang === 'en' ? review.nameEn : review.nameAr}
                  </p>
                  <span className="text-xs text-alabaster/70">{t('reviews.sample')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
