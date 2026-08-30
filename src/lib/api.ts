/**
 * طبقة الاتصال بالباكند — تُستخدم فقط للوحة تحكم الأدمن (تسجيل الدخول
 * وعرض الطلبات المستلمة عبر البريد). كل النماذج العامة بالموقع (تواصل،
 * حجز روبوت، التسجيل كمدرّب، دورة، نشرة) لا تستخدم هذا الملف إطلاقاً —
 * شوفي src/lib/mailto.ts. العنوان يُقرأ من متغير بيئة حتى يسهل تغييره وقت النشر.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    let detail = 'حدث خطأ غير متوقع';
    try {
      const body = await res.json();
      detail = body.detail ?? detail;
    } catch {
      /* الرد مو JSON — نتجاهل ونستخدم الرسالة الافتراضية */
    }
    throw new ApiError(detail, res.status);
  }

  return res.json() as Promise<T>;
}

/* ═══════════ المصادقة ═══════════ */

export type LoginPayload = { email: string; password: string };
export type UserOut = {
  id: number; email: string; full_name: string;
  phone: string | null; role: string; created_at: string;
};
export type Token = { access_token: string; token_type: string; user: UserOut };

/* ═══════════ لوحة التحكم ═══════════ */

export type RequestStatus = 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';

export type DashboardStats = {
  total_contact_messages: number; new_contact_messages: number;
  total_robot_requests: number; new_robot_requests: number;
  total_trainer_applications: number; new_trainer_applications: number;
  total_enrollments: number; new_enrollments: number;
  total_subscribers: number; total_users: number;
};

export type ContactMessageOut = {
  id: number; full_name: string; email: string; phone: string | null;
  subject: string; message: string; status: RequestStatus; created_at: string;
};

export type RobotRequestOut = {
  id: number; robot_slug: string; robot_name: string; request_type: string;
  full_name: string; email: string; phone: string; organization: string | null;
  notes: string | null; status: RequestStatus; created_at: string;
};

export type TrainerApplicationOut = {
  id: number; full_name: string; email: string; phone: string;
  specialty: string; experience: string; cv_url: string | null;
  status: RequestStatus; created_at: string;
};

export type CourseEnrollmentOut = {
  id: number; course_slug: string; course_name: string; full_name: string;
  email: string; phone: string; delivery: string; payment_status: string;
  status: RequestStatus; created_at: string;
};

export type NewsletterOut = { id: number; email: string; created_at: string };

/* رمز الدخول يُخزّن بالمتصفح فقط — الدوال أدناه تقرأه تلقائياً */
const TOKEN_KEY = 'aljazari_admin_token';

export const adminAuth = {
  saveToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  getToken: () => (typeof window === 'undefined' ? null : localStorage.getItem(TOKEN_KEY)),
  clearToken: () => localStorage.removeItem(TOKEN_KEY),
};

async function adminRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = adminAuth.getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401 || res.status === 403) {
    adminAuth.clearToken();
    throw new ApiError('انتهت الجلسة — سجّلي الدخول من جديد', res.status);
  }

  if (!res.ok) {
    let detail = 'حدث خطأ غير متوقع';
    try {
      const body = await res.json();
      detail = typeof body.detail === 'string' ? body.detail : detail;
    } catch { /* تجاهل */ }
    throw new ApiError(detail, res.status);
  }

  return res.json() as Promise<T>;
}

export const admin = {
  login: (data: LoginPayload) =>
    request<Token>('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),

  me: () => adminRequest<UserOut>('/api/auth/me'),

  stats: () => adminRequest<DashboardStats>('/api/admin/stats'),

  contactMessages: (status?: string) =>
    adminRequest<ContactMessageOut[]>(`/api/admin/contact-messages${status ? `?status=${status}` : ''}`),
  robotRequests: (status?: string) =>
    adminRequest<RobotRequestOut[]>(`/api/admin/robot-requests${status ? `?status=${status}` : ''}`),
  trainerApplications: (status?: string) =>
    adminRequest<TrainerApplicationOut[]>(`/api/admin/trainer-applications${status ? `?status=${status}` : ''}`),
  enrollments: (status?: string) =>
    adminRequest<CourseEnrollmentOut[]>(`/api/admin/enrollments${status ? `?status=${status}` : ''}`),
  subscribers: () => adminRequest<NewsletterOut[]>('/api/admin/subscribers'),

  updateStatus: (resource: string, id: number, status: RequestStatus) =>
    adminRequest<{ detail: string }>(`/api/admin/${resource}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  updatePayment: (id: number, payment_status: 'awaiting' | 'paid') =>
    adminRequest<{ detail: string }>(`/api/admin/enrollments/${id}/payment`, {
      method: 'PATCH',
      body: JSON.stringify({ payment_status }),
    }),
};