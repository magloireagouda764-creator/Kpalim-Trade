import { connectDB } from '@/lib/mongodb';
import { AuditLog } from '@/models/AuditLog';

interface LogInput {
  adminId: string;
  action: string;
  modelType: string;
  modelId?: string;
  changes?: Record<string, unknown>;
  ip?: string;
}

export async function logAdminAction(input: LogInput) {
  await connectDB();
  return AuditLog.create(input);
}

export async function getRecentLogs(limit = 50) {
  await connectDB();
  return AuditLog.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('adminId', 'name email')
    .lean();
}
