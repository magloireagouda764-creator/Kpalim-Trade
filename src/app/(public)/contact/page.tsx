import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-kpalime-green">Nous contacter</h1>
      <p className="text-gray-600">Une question, une suggestion ou un partenariat ? N'hésitez pas à nous écrire.</p>
      <div className="p-6 rounded-xl border border-gray-100 space-y-4">
        <div><p className="text-sm text-gray-500">Email</p><a href="mailto:contact@kpalime-trad.tg" className="font-medium text-kpalime-green hover:underline">contact@kpalime-trad.tg</a></div>
        <div><p className="text-sm text-gray-500">Téléphone</p><a href="tel:+22890000000" className="font-medium text-kpalime-green hover:underline">+228 90 00 00 00</a></div>
        <div><p className="text-sm text-gray-500">Adresse</p><p className="font-medium">Kpalimé, Région des Plateaux, Togo</p></div>
      </div>
    </div>
  );
}
