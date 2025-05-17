'use client'; // needed for React hooks in Next.js 13 app directory

import { toast } from 'sonner';

export const showSuccess = (msg) => toast.success(msg);
export const showError = (msg) => toast.error(msg);
export const showWarning = (msg) => toast.warning(msg);
export const showInfo = (msg) => toast.info(msg);
