import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { whatsappLink } from '../data/site';

export default function FloatingActions() {
  const { lang } = useLanguage();
  // No call button: the demo brand has no real phone number (see src/data/site.ts)
  return (
    <a
      href={whatsappLink(lang === 'en' ? 'Hello, I would like to ask about renting a car.' : 'مرحباً، أود الاستفسار عن استئجار سيارة.')}
      target="_blank"
      rel="noopener noreferrer"
      className="press fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 w-14 h-14 bg-[#25D366] text-obsidian rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform"
      aria-label={lang === 'en' ? 'Chat on WhatsApp' : 'تواصل عبر واتساب'}
    >
      <MessageCircle className="w-7 h-7" aria-hidden="true" />
    </a>
  );
}
