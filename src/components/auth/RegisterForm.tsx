'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types';

const ROLES: { value: UserRole; label: string }[] = [
  { value: 'client', label: 'Client (acheter)' },
  { value: 'vendor', label: 'Vendeur (boutique)' },
  { value: 'professional', label: 'Professionnel (services)' },
];

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('client');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password, role }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Erreur lors de l'inscription");
        return;
      }

      login('', data.user);
      router.push(role === 'vendor' ? '/vendor/dashboard' : '/dashboard');
    } catch {
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
      <h1 className="text-2xl font-bold text-center text-kpalime-green">Créer un compte</h1>

      {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>}

      <Input label="Nom complet" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input label="Téléphone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <Input label="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
      <Select label="Je suis" value={role} onChange={(e) => setRole(e.target.value as UserRole)} options={ROLES} />

      <Button type="submit" loading={loading} className="w-full">S'inscrire</Button>

      <p className="text-center text-sm text-gray-500">
        Déjà inscrit ?{' '}
        <Link href="/login" className="text-kpalime-green font-medium hover:underline" prefetch>Se connecter</Link>
      </p>
    </form>
  );
}
