import { MessageCircle, Phone } from 'lucide-react';

export default function FloatingActions() {
  return (
    <>
      {/* WhatsApp - Bottom Right (or Left in RTL, but we can fix to screen positions) */}
      <a 
        href="https://wa.me/966501622496" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Call Now - Bottom Left (Mobile Only) */}
      <a 
        href="tel:+966501622496" 
        className="md:hidden fixed bottom-6 left-6 z-50 w-14 h-14 bg-gold text-obsidian rounded-full flex items-center justify-center shadow-lg shadow-gold/30 hover:scale-110 transition-transform"
        aria-label="Call Now"
      >
        <Phone className="w-6 h-6" />
      </a>
    </>
  );
}
