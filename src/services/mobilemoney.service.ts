/**
 * Service Mobile Money abstrait.
 * Ce service prépare l'intégration avec un agrégateur de paiement
 * (CinetPay, FedaPay, KkiaPay, etc.) sans dépendre d'un fournisseur spécifique.
 * 
 * Pour activer un vrai fournisseur :
 * 1. Créer un compte chez l'agrégateur
 * 2. Ajouter les clés API dans .env.local
 * 3. Implémenter les appels HTTP dans les fonctions ci-dessous
 */

export interface MobileMoneyInitInput {
  amount: number; // En XOF
  phoneNumber: string;
  operator: 't-money' | 'flooz' | 'autre';
  orderId: string;
  customerName?: string;
}

export interface MobileMoneyInitResult {
  success: boolean;
  transactionId?: string;
  message?: string;
  redirectUrl?: string;
}

export async function initiateMobileMoneyPayment(input: MobileMoneyInitInput): Promise<MobileMoneyInitResult> {
  // ⚠️ IMPLEMENTATION RÉELLE À AJOUTER SELON L'AGRÉGATEUR CHOISI
  // Exemple de structure pour CinetPay :
  // const response = await fetch('https://api-checkout.cinetpay.com/v2/payment', { ... })
  
  // Pour le MVP, on simule une initialisation réussie
  // afin de permettre le développement du flux complet.
  const mockTransactionId = `MM-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  
  return {
    success: true,
    transactionId: mockTransactionId,
    message: 'Paiement Mobile Money initialisé (mode simulation)',
  };
}

export async function verifyMobileMoneyPayment(transactionId: string): Promise<{ status: 'success' | 'pending' | 'failed' }> {
  // ⚠️ IMPLEMENTATION RÉELLE À AJOUTER
  // Appeler l'API de vérification de l'agrégateur
  
  // Pour le MVP, on retourne un statut pending
  return { status: 'pending' };
}

export async function refundMobileMoneyPayment(transactionId: string, amount: number): Promise<boolean> {
  // ⚠️ IMPLEMENTATION RÉELLE À AJOUTER
  return false;
}
