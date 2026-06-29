import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Calendar, User, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Car } from '../data/cars';

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

  if (!isOpen || !car) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConfirm = () => {
    const carName = lang === 'en' ? car.nameEn : car.nameAr;
    const message = `*New Booking Request*%0A%0A*Vehicle:* ${carName}%0A*Pick-up:* ${formData.pickup}%0A*Drop-off:* ${formData.dropoff}%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Requests:* ${formData.requests || 'None'}`;
    window.open(`https://wa.me/966501622496?text=${message}`, '_blank');
    setStep(3);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setFormData({ pickup: '', dropoff: '', name: '', phone: '', requests: '' });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm">
      <div className="bg-[#111] border border-gold/20 rounded-lg w-full max-w-lg overflow-hidden shadow-2xl shadow-gold/10 relative" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-alabaster/50 hover:text-gold transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gold mb-2">{t('booking.title')}</h3>
          <p className="text-alabaster/60 mb-6">{lang === 'en' ? car.nameEn : car.nameAr}</p>

          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-alabaster/80 mb-1">{t('booking.pickup')}</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                    <input 
                      required
                      type="date" 
                      name="pickup"
                      value={formData.pickup}
                      onChange={handleChange}
                      className="w-full bg-obsidian border border-gold/20 rounded-sm py-2 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-alabaster focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-alabaster/80 mb-1">{t('booking.dropoff')}</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                    <input 
                      required
                      type="date" 
                      name="dropoff"
                      value={formData.dropoff}
                      onChange={handleChange}
                      className="w-full bg-obsidian border border-gold/20 rounded-sm py-2 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-alabaster focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-alabaster/80 mb-1">{t('booking.name')}</label>
                <div className="relative">
                  <User className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                  <input 
                    required
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-obsidian border border-gold/20 rounded-sm py-2 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-alabaster focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-alabaster/80 mb-1">{t('booking.phone')}</label>
                <div className="relative">
                  <Phone className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                  <input 
                    required
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-obsidian border border-gold/20 rounded-sm py-2 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-alabaster focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-alabaster/80 mb-1">{t('booking.requests')}</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 rtl:left-auto rtl:right-3 top-3 w-4 h-4 text-gold/50" />
                  <textarea 
                    name="requests"
                    value={formData.requests}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-obsidian border border-gold/20 rounded-sm py-2 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-alabaster focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>

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
