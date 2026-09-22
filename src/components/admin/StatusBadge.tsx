import { Badge } from '@/components/ui/Badge';

const STYLES: Record<string, string> = {
  active: 'bg-green-100 text-green-700', approved: 'bg-green-100 text-green-700', published: 'bg-green-100 text-green-700', delivered: 'bg-green-100 text-green-700', visible: 'bg-green-100 text-green-700', resolved: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700', investigating: 'bg-yellow-100 text-yellow-700', preparing: 'bg-yellow-100 text-yellow-700',
  rejected: 'bg-red-100 text-red-700', cancelled: 'bg-red-100 text-red-700', suspended: 'bg-red-100 text-red-700', hidden: 'bg-red-100 text-red-700', reported: 'bg-red-100 text-red-700', failed: 'bg-red-100 text-red-700',
  inactive: 'bg-gray-100 text-gray-700', finished: 'bg-gray-100 text-gray-700', dismissed: 'bg-gray-100 text-gray-700',
  confirmed: 'bg-blue-100 text-blue-700', shipped: 'bg-indigo-100 text-indigo-700', new: 'bg-blue-100 text-blue-700',
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge className={STYLES[status] || 'bg-gray-100 text-gray-700'}>{status}</Badge>;
}
