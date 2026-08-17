'use client';

import React from 'react';

/**
 * حاجز أخطاء خفيف — يلف أي تأثير بصري زخرفي (WebGL/canvas خلفيات متحركة).
 * إذا صار خطأ غير متوقع بأي تأثير من هذا النوع (مثلاً جهاز ما يدعم WebGL2)،
 * هذا الحاجز يمنع الخطأ من إسقاط الصفحة كاملة — بس يخفي التأثير الزخرفي
 * بهدوء ويسجل الخطأ بالـ console، والمحتوى الحقيقي (نصوص، أزرار...) يضل شغال.
 *
 * الاستخدام: لف أي مكوّن زخرفي فقط (خلفية متحركة، تأثير جسيمات...) — لا تلف
 * محتوى أساسي بيه، لأن الفولباك الافتراضي هو "لا تعرض شي".
 */
export default class DecorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('DecorBoundary: decorative effect crashed, hiding it', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
