import { useLocalStorage } from './useLocalStorage';

export interface BookingForm {
  pickup: string;
  dropoff: string;
  name: string;
  phone: string;
  requests: string;
}

export interface BookingDraft {
  carId: number;
  step: 1 | 2;
  form: BookingForm;
}

export const EMPTY_FORM: BookingForm = { pickup: '', dropoff: '', name: '', phone: '', requests: '' };

// The in-progress booking (car, step and fields) is kept on this device so closing the window or reloading
// the page doesn't lose it. It is cleared when the visitor cancels or sends the request.
export function useBookingDraft() {
  return useLocalStorage<BookingDraft | null>('velocity:booking-draft', null);
}
