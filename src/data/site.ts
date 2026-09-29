// Business details for the demo brand. Velocity Rentals is fictional, so no WhatsApp number is set: links open
// WhatsApp with the message ready and let the visitor choose the chat. Put a real client's number here
// (international format, digits only, e.g. '9665XXXXXXXX') and every WhatsApp link will go straight to them.
export const SITE = {
  name: 'Velocity Rentals',
  nameAr: 'فيلوسيتي للتأجير',
  whatsappNumber: '',
};

export function whatsappLink(text: string) {
  const base = SITE.whatsappNumber ? `https://wa.me/${SITE.whatsappNumber}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(text)}`;
}
