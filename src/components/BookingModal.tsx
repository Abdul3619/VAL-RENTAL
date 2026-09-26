import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Calendar, User, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Car } from '../data/cars';

const WHATSAPP_NUMBER = '966501622496';

// yyyy-mm-dd in the visitor's local time (matches <input type="date"> values)
function toDateInputValue(date: Date) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

// Number of rental days between pick-up and drop-off (minimum one day)
function rentalDays(pickup: string, dropoff: string) {
  if (!pickup || !dropoff) return 0;
  const ms = new Date(dropoff).getTime() - new Date(pickup).getTime();
  return Math.max(1, Math.round(ms / 86400000));
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null;
}

export default function BookingModal({ isOpen, onClose, car }: BookingModalProps) {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    name: '',
    phone: '',
    requests: ''
  });

  const [error, setError] = useState<string | null>(null);

  // Close on Escape and keep the page behind the modal from scrolling
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  if (!isOpen || !car) return null;

  const today = toDateInputValue(new Date());
  const days = rentalDays(formData.pickup, formData.dropoff);
  const estimatedTotal = days * car.price;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.pickup < today) {
      setError(lang === 'en' ? 'The pick-up date cannot be in the past.' : 'لا يمكن أن يكون تاريخ الاستلام في الماضي.');
      return;
    }
    if (formData.dropoff < formData.pickup) {
      setError(lang === 'en' ? 'The drop-off date must be on or after the pick-up date.' : 'يجب أن يكون تاريخ التسليم في نفس يوم الاستلام أو بعده.');
      return;
    }
    if (formData.phone.replace(/\D/g, '').length < 8) {
      setError(lang === 'en' ? 'Please enter a valid phone number.' : 'يرجى إدخال رقم هاتف صحيح.');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleConfirm = () => {
    const carName = lang === 'en' ? car.nameEn : car.nameAr;
    const message = [
      '*New Booking Request*',
      '',
      `*Vehicle:* ${carName}`,
      `*Pick-up:* ${formData.pickup}`,
      `*Drop-off:* ${formData.dropoff}`,
      `*Rental days:* ${days}`,
      `*Estimated total:* ${estimatedTotal} SAR`,
      `*Name:* ${formData.name}`,
      `*Phone:* ${formData.phone}`,
      `*Requests:* ${formData.requests || 'None'}`,
    ].join('\n');
    // Encode every field so characters like & or # in a name or request don't cut the message short
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const opened = window.open(url, '_blank', 'noopener');
    if (!opened) {
      // Pop-up blocked: open WhatsApp in this tab instead so the request isn't lost
      window.location.href = url;
      return;
    }
    setStep(3);
  };

  function handleClose() {
    onClose();
    setTimeout(() => {
      setStep(1);
      setError(null);
      setFormData({ pickup: '', dropoff: '', name: '', phone: '', requests: '' });
    }, 300);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm">
      <div role="dialog" aria-modal="true" aria-labelledby="booking-title" className="bg-[#111] border border-gold/20 rounded-lg w-full max-w-lg overflow-hidden shadow-2xl shadow-gold/10 relative max-h-[95vh] overflow-y-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <button 
          onClick={handleClose}
          aria-label={t('booking.cancel')}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-alabaster/50 hover:text-gold transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 md:p-8">
          <h3 id="booking-title" className="text-2xl font-bold text-gold mb-2">{t('booking.title')}</h3>
          <p className="text-alabaster/60 mb-6">{lang === 'en' ? car.nameEn : car.nameAr}</p>

          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-pickup" className="block text-sm font-medium text-alabaster/80 mb-1">{t('booking.pickup')}</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                    <input 
                      required
                      type="date" 
                      id="booking-pickup"
                      name="pickup"
                      min={today}
                      value={formData.pickup}
                      onChange={handleChange}
                      className="w-full bg-obsidian border border-gold/20 rounded-sm py-2 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-alabaster focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="booking-dropoff" className="block text-sm font-medium text-alabaster/80 mb-1">{t('booking.dropoff')}</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                    <input 
                      required
                      type="date" 
                      id="booking-dropoff"
                      name="dropoff"
                      min={formData.pickup || today}
                      value={formData.dropoff}
                      onChange={handleChange}
                      className="w-full bg-obsidian border border-gold/20 rounded-sm py-2 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-alabaster focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="booking-name" className="block text-sm font-medium text-alabaster/80 mb-1">{t('booking.name')}</label>
                <div className="relative">
                  <User className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                  <input 
                    required
                    type="text" 
                    id="booking-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-obsidian border border-gold/20 rounded-sm py-2 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-alabaster focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="booking-phone" className="block text-sm font-medium text-alabaster/80 mb-1">{t('booking.phone')}</label>
                <div className="relative">
                  <Phone className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                  <input 
                    required
                    type="tel" 
                    id="booking-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-obsidian border border-gold/20 rounded-sm py-2 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-alabaster focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="booking-requests" className="block text-sm font-medium text-alabaster/80 mb-1">{t('booking.requests')}</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 rtl:left-auto rtl:right-3 top-3 w-4 h-4 text-gold/50" />
                  <textarea 
                    id="booking-requests"
                    name="requests"
                    value={formData.requests}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-obsidian border border-gold/20 rounded-sm py-2 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-alabaster focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 border border-gold/30 text-gold rounded-sm hover:bg-gold/10 transition-colors font-medium"
                >
                  {t('booking.cancel')}
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-gold text-obsidian rounded-sm hover:bg-gold/90 transition-colors font-bold"
                >
                  {t('booking.next')}
                </button>
              </div>
            </form>
          ) : step === 2 ? (
            <div className="space-y-6">
              <div className="bg-obsidian border border-gold/10 rounded-sm p-4 space-y-3">
                <h4 className="font-bold text-alabaster border-b border-gold/10 pb-2 mb-3">{t('booking.summary')}</h4>
                
                <div className="flex justify-between text-sm">
                  <span className="text-alabaster/60">{t('booking.pickup')}:</span>
                  <span className="text-alabaster font-medium">{formData.pickup}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-alabaster/60">{t('booking.dropoff')}:</span>
                  <span className="text-alabaster font-medium">{formData.dropoff}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-alabaster/60">{t('booking.days')}:</span>
                  <span className="text-alabaster font-medium">{days}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-alabaster/60">{t('booking.total')}:</span>
                  <span className="text-alabaster font-medium">{estimatedTotal} {lang === 'en' ? 'SAR' : 'ريال'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-alabaster/60">{t('booking.name')}:</span>
                  <span className="text-alabaster font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-alabaster/60">{t('booking.phone')}:</span>
                  <span className="text-alabaster font-medium" dir="ltr">{formData.phone}</span>
                </div>
                {formData.requests && (
                  <div className="flex justify-between text-sm">
                    <span className="text-alabaster/60">{t('booking.requests')}:</span>
                    <span className="text-alabaster font-medium text-right max-w-[60%] truncate">{formData.requests}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-gold/30 text-gold rounded-sm hover:bg-gold/10 transition-colors font-medium"
                >
                  {t('booking.back')}
                </button>
                <button 
                  onClick={handleConfirm}
                  className="flex-1 py-3 bg-[#25D366] text-white rounded-sm hover:bg-[#25D366]/90 transition-colors font-bold flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  {t('booking.confirm')}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center py-8">
              <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-gold" />
              </div>
              <h4 className="text-2xl font-bold text-alabaster">{t('booking.success_title')}</h4>
              <p className="text-alabaster/70 text-lg max-w-sm mx-auto leading-relaxed">
                {t('booking.success_msg')}
              </p>
              <button 
                onClick={handleClose}
                className="w-full py-4 mt-4 bg-gold text-obsidian rounded-sm hover:bg-gold/90 transition-colors font-bold"
              >
                {t('booking.close')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
