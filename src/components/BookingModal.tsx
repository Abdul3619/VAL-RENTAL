import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { X, Calendar, User, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import type { Car } from '../data/cars';
import { whatsappLink } from '../data/site';
import { EMPTY_FORM, type BookingDraft, type BookingForm } from '../lib/bookingDraft';

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
  car: Car | null;
  draft: BookingDraft | null;
  onDraftChange: (draft: BookingDraft | null) => void;
  onClose: () => void;
}

const inputClass = 'w-full bg-obsidian border border-gold/30 rounded-sm py-2 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-alabaster focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all';

export default function BookingModal({ car, draft, onDraftChange, onClose }: BookingModalProps) {
  const { t, lang } = useLanguage();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isOpen = !!car;

  // The draft only applies to the car it was started for
  const active = car && draft && draft.carId === car.id ? draft : null;
  const step = active?.step ?? 1;
  const formData: BookingForm = active?.form ?? EMPTY_FORM;

  const save = (patch: Partial<BookingDraft>) => {
    if (!car) return;
    onDraftChange({ carId: car.id, step, form: formData, ...patch });
  };

  // Close on Escape, keep the page behind from scrolling, and move focus into the dialog
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    setTimeout(() => dialogRef.current?.querySelector<HTMLElement>('input, button')?.focus(), 50);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus?.();
    };
  }, [isOpen]);

  const today = toDateInputValue(new Date());
  const days = rentalDays(formData.pickup, formData.dropoff);
  const estimatedTotal = car ? days * car.price : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    save({ form: { ...formData, [e.target.name]: e.target.value } });
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
    save({ step: 2 });
  };

  const handleConfirm = () => {
    if (!car) return;
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
    const url = whatsappLink(message);
    // window.open(..., 'noopener') always returns null, which made every popup look blocked; open normally and
    // detach the new tab from this page instead.
    const opened = window.open(url, '_blank');
    if (opened) opened.opener = null;
    onDraftChange(null);
    if (!opened) {
      // Pop-up blocked: open WhatsApp in this tab instead so the request isn't lost
      window.location.href = url;
      return;
    }
    setSent(true);
  };

  // Closing keeps the draft so the visitor can pick up where they left off
  function handleClose() {
    onClose();
    setTimeout(() => { setSent(false); setError(null); }, 300);
  }

  // Cancel throws the draft away
  function handleCancel() {
    onDraftChange(null);
    handleClose();
  }

  return (
    <AnimatePresence>
      {isOpen && car && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm" onClick={handleClose}>
          <motion.div
            ref={dialogRef}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="bg-[#111] border border-gold/20 rounded-lg w-full max-w-lg overflow-hidden shadow-2xl shadow-gold/10 relative max-h-[95vh] overflow-y-auto"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            <button onClick={handleClose} aria-label={t('booking.close_window')} className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-alabaster/70 hover:text-gold transition-colors z-10">
              <X className="w-6 h-6" />
            </button>

            <div className="p-6 md:p-8">
              <h2 id="booking-title" className="text-2xl font-bold text-gold mb-2">{t('booking.title')}</h2>
              <p className="text-alabaster/70 mb-2">{lang === 'en' ? car.nameEn : car.nameAr}</p>
              {!sent && <p className="text-xs text-alabaster/60 mb-6">{t('booking.step')} {step} / 2 · {t('booking.saved_note')}</p>}

              {sent ? (
                <div className="space-y-6 text-center py-8">
                  <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-10 h-10 text-gold" /></div>
                  <h3 className="text-2xl font-bold text-alabaster">{t('booking.success_title')}</h3>
                  <p className="text-alabaster/80 text-lg max-w-sm mx-auto leading-relaxed">{t('booking.success_msg')}</p>
                  <button onClick={handleClose} className="press w-full py-4 mt-4 bg-gold text-obsidian rounded-sm hover:bg-gold/90 transition-colors font-bold">{t('booking.close')}</button>
                </div>
              ) : step === 1 ? (
                <form onSubmit={handleNext} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="booking-pickup" className="block text-sm font-medium text-alabaster/80 mb-1">{t('booking.pickup')}</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" aria-hidden="true" />
                        <input required type="date" id="booking-pickup" name="pickup" min={today} value={formData.pickup} onChange={handleChange} className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="booking-dropoff" className="block text-sm font-medium text-alabaster/80 mb-1">{t('booking.dropoff')}</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" aria-hidden="true" />
                        <input required type="date" id="booking-dropoff" name="dropoff" min={formData.pickup || today} value={formData.dropoff} onChange={handleChange} className={inputClass} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="booking-name" className="block text-sm font-medium text-alabaster/80 mb-1">{t('booking.name')}</label>
                    <div className="relative">
                      <User className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" aria-hidden="true" />
                      <input required type="text" id="booking-name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="booking-phone" className="block text-sm font-medium text-alabaster/80 mb-1">{t('booking.phone')}</label>
                    <div className="relative">
                      <Phone className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" aria-hidden="true" />
                      <input required type="tel" id="booking-phone" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} className={`${inputClass} text-left`} dir="ltr" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="booking-requests" className="block text-sm font-medium text-alabaster/80 mb-1">{t('booking.requests')}</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 rtl:left-auto rtl:right-3 top-3 w-4 h-4 text-gold/60" aria-hidden="true" />
                      <textarea id="booking-requests" name="requests" value={formData.requests} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} />
                    </div>
                  </div>
                  {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={handleCancel} className="press flex-1 py-3 border border-gold/40 text-gold rounded-sm hover:bg-gold/10 transition-colors font-medium">{t('booking.cancel')}</button>
                    <button type="submit" className="press flex-1 py-3 bg-gold text-obsidian rounded-sm hover:bg-gold/90 transition-colors font-bold">{t('booking.next')}</button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <dl className="bg-obsidian border border-gold/10 rounded-sm p-4 space-y-3">
                    <h3 className="font-bold text-alabaster border-b border-gold/10 pb-2 mb-3">{t('booking.summary')}</h3>
                    {[
                      [t('booking.pickup'), formData.pickup],
                      [t('booking.dropoff'), formData.dropoff],
                      [t('booking.days'), String(days)],
                      [t('booking.total'), `${estimatedTotal} ${lang === 'en' ? 'SAR' : 'ريال'}`],
                      [t('booking.name'), formData.name],
                      [t('booking.phone'), formData.phone],
                      ...(formData.requests ? [[t('booking.requests'), formData.requests]] : []),
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4 text-sm">
                        <dt className="text-alabaster/70">{label}:</dt>
                        <dd className="text-alabaster font-medium text-end truncate max-w-[60%]" dir={label === t('booking.phone') ? 'ltr' : undefined}>{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="pt-2 flex gap-3">
                    <button onClick={() => save({ step: 1 })} className="press flex-1 py-3 border border-gold/40 text-gold rounded-sm hover:bg-gold/10 transition-colors font-medium">{t('booking.back')}</button>
                    <button onClick={handleConfirm} className="press flex-1 py-3 bg-[#1a8f47] text-white rounded-sm hover:bg-[#167a3c] transition-colors font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" /> {t('booking.confirm')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
