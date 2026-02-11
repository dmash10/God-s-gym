/**
 * Generates a WhatsApp URL with a prefilled message.
 * @param phone The phone number (with country code, no + or spaces)
 * @param message The message to prefill
 * @returns A formatted WhatsApp URL
 */
export function getWhatsAppUrl(phone: string, message: string): string {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
