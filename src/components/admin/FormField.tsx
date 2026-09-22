import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface Props { type?: 'text' | 'email' | 'number' | 'select' | 'textarea'; label: string; name: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; options?: { value: string; label: string }[]; required?: boolean; placeholder?: string; }

export function FormField({ type = 'text', label, name, value, onChange, options, required, placeholder }: Props) {
  if (type === 'select' && options) return <Select label={label} name={name} value={String(value)} onChange={onChange} options={options} required={required} />;
  if (type === 'textarea') return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-kpalime-dark">{label}</label>
      <textarea id={name} name={name} value={String(value)} onChange={onChange} required={required} placeholder={placeholder} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-kpalime-green focus:ring-2 focus:ring-kpalime-green/20 focus:outline-none transition-all" />
    </div>
  );
  return <Input label={label} type={type} name={name} value={String(value)} onChange={onChange} required={required} placeholder={placeholder} />;
}
