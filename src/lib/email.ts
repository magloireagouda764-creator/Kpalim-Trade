/**
 * Service email abstrait.
 * Supporte plusieurs fournisseurs : Resend, SendGrid, Nodemailer.
 * Pour le MVP, les emails sont loggés en console.
 */

export interface EmailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendEmail(input: EmailInput): Promise<EmailResult> {
  // ⚠️ IMPLEMENTATION RÉELLE À AJOUTER
  // Exemple avec Resend :
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // const { data, error } = await resend.emails.send({ from: 'noreply@kpalime-trad.tg', ...input });
  
  // Pour le MVP, on log l'email
  console.log('📧 Email simulé :', {
    to: input.to,
    subject: input.subject,
    bodyLength: input.html.length,
  });

  return {
    success: true,
    messageId: `mock-${Date.now()}`,
  };
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
