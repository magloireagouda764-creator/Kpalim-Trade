import { sendEmail, type EmailResult } from '@/lib/email';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function sendWelcomeEmail(name: string, email: string): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: `Bienvenue sur Kpalimé-Trad, ${name} !`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2D5A27;">Bienvenue ${name} ! 🎉</h1>
        <p>Votre compte Kpalimé-Trad a été créé avec succès.</p>
        <p>Découvrez dès maintenant :</p>
        <ul>
          <li>🛍️ La marketplace locale</li>
          <li>🌴 Les sites touristiques de Kpalimé</li>
          <li>🏨 Les hébergements disponibles</li>
          <li>🎉 Les événements à venir</li>
        </ul>
        <a href="${BASE_URL}" style="display: inline-block; padding: 12px 24px; background: #2D5A27; color: white; text-decoration: none; border-radius: 8px;">Explorer la plateforme</a>
        <p style="margin-top: 2rem; color: #666; font-size: 14px;">L'équipe Kpalimé-Trad</p>
      </div>
    `,
    text: `Bienvenue ${name} ! Votre compte Kpalimé-Trad a été créé. Visitez ${BASE_URL}`,
  });
}

export async function sendOrderConfirmation(email: string, reference: string, total: number): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: `Commande ${reference} confirmée`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2D5A27;">Commande confirmée ✅</h1>
        <p>Votre commande <strong>${reference}</strong> a été enregistrée.</p>
        <p><strong>Total : ${total.toLocaleString('fr-FR')} FCFA</strong></p>
        <p>Vous pouvez suivre votre commande depuis votre espace personnel.</p>
        <a href="${BASE_URL}/orders" style="display: inline-block; padding: 12px 24px; background: #2D5A27; color: white; text-decoration: none; border-radius: 8px;">Suivre ma commande</a>
      </div>
    `,
  });
}

export async function sendPasswordReset(email: string, resetToken: string): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: 'Réinitialisation de votre mot de passe',
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2D5A27;">Réinitialisation du mot de passe</h1>
        <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
        <a href="${BASE_URL}/reset-password?token=${resetToken}" style="display: inline-block; padding: 12px 24px; background: #2D5A27; color: white; text-decoration: none; border-radius: 8px;">Réinitialiser</a>
        <p style="margin-top: 1rem; color: #666; font-size: 14px;">Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
      </div>
    `,
  });
}
