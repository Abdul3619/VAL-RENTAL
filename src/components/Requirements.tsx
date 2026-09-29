import { BadgeCheck, CalendarClock, CreditCard, IdCard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import IllustrativeBadge from './IllustrativeBadge';

// Typical rental requirements and FAQ. Example terms for the demo brand: a real client must confirm their own
// age limits, deposit and insurance terms before this goes live.
export default function Requirements() {
  const { t, lang } = useLanguage();
  const items = [
    { icon: IdCard, title: t('req.license'), text: t('req.license_desc') },
    { icon: CalendarClock, title: t('req.age'), text: t('req.age_desc') },
    { icon: BadgeCheck, title: t('req.id'), text: t('req.id_desc') },
    { icon: CreditCard, title: t('req.deposit'), text: t('req.deposit_desc') },
  ];
  const faqs = [1, 2, 3, 4].map((n) => ({ q: t(`faq.q${n}`), a: t(`faq.a${n}`) }));

  return (
    <section id="requirements" className="py-24 bg-[#0f0f0f] border-t border-gold/10" aria-labelledby="req-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="req-heading" className="text-4xl font-bold text-gold mb-4">{t('req.title')}</h2>
          <p className="text-alabaster/80 text-lg">{t('req.subtitle')}</p>
          <p className="mt-4 text-gold"><IllustrativeBadge label={lang === 'en' ? 'Example terms' : 'شروط توضيحية'} /></p>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {items.map((it) => (
            <li key={it.title} className="bg-[#111] border border-gold/15 rounded-lg p-6">
              <it.icon className="w-8 h-8 text-gold mb-4" aria-hidden="true" />
              <h3 className="font-bold text-alabaster mb-2">{it.title}</h3>
              <p className="text-alabaster/75 text-sm leading-relaxed">{it.text}</p>
            </li>
          ))}
        </ul>
        <h2 className="text-3xl font-bold text-gold mb-8 text-center">{t('faq.title')}</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group bg-[#111] border border-gold/15 rounded-lg p-5">
              <summary className="cursor-pointer list-none flex justify-between items-center font-semibold text-alabaster">
                {f.q}
                <span className="ms-4 text-gold transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-alabaster/80">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
