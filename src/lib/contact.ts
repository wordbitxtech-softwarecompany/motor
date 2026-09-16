/**
 * Central contact configuration.
 *
 * No placeholder phone numbers or addresses are published. When real,
 * verified business contact details are available, fill these in and the
 * whole site (header, footer, model pages, CTAs) updates automatically.
 */

/** Set to a verified E.164 number (e.g. '923001234567') to enable WhatsApp CTAs. */
export const WHATSAPP_NUMBER: string | null = null;

/** Set to a verified public phone number to display it site-wide. */
export const PUBLIC_PHONE: string | null = null;

/** Monitored enquiry inbox. */
export const CONTACT_EMAIL = 'info@motor.wordbitxtech.com';

/** Registered office / correspondence address. Null hides the address block. */
export const OFFICE_ADDRESS: string | null = null;

export const HAS_WHATSAPP = WHATSAPP_NUMBER !== null;
export const HAS_PHONE = PUBLIC_PHONE !== null;

/**
 * Returns a WhatsApp deep link when a verified number is configured,
 * otherwise falls back to the contact page so no CTA is ever broken.
 */
export function enquiryLink(message?: string): string {
  if (WHATSAPP_NUMBER) {
    const q = message ? `?text=${encodeURIComponent(message)}` : '';
    return `https://wa.me/${WHATSAPP_NUMBER}${q}`;
  }
  return '/contact';
}

/** Label for the primary enquiry CTA. */
export const ENQUIRY_LABEL = HAS_WHATSAPP ? 'WhatsApp' : 'Enquire';

/** True when the link is external (so we add target/rel). */
export const ENQUIRY_EXTERNAL = HAS_WHATSAPP;
