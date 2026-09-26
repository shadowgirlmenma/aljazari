'use client';

import { Toaster } from 'sonner';
import { useTheme } from '@/components/ThemeProvider';

/** غلاف صغير حول Toaster (sonner) حتى تتبدل ألوان إشعارات التنبيه هي
 * الثانية مع الوضع الداكن/الفاتح، بدل ما تضل ثابتة على الداكن دايماً. */
export default function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="top-center"
      richColors
      theme={theme}
      toastOptions={{
        style: theme === 'dark'
          ? {
              background: '#1a0a2e',
              border: '1px solid rgba(168,139,250,0.3)',
              color: '#fff',
            }
          : {
              background: '#ffffff',
              border: '1px solid rgba(124,71,224,0.25)',
              color: '#1a0b33',
            },
      }}
    />
  );
}
