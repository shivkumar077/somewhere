import { useState, useEffect } from 'react';

export interface ResponsiveState {
  width: number;
  height: number;
  aspect: number;
  isNarrowFoldable: boolean; // < 320px (e.g. 280px cover screens)
  isSmallMobile: boolean;    // < 360px
  isMobile: boolean;         // < 640px
  isTablet: boolean;         // 640px - 1024px
  isDesktop: boolean;        // >= 1024px
  isUltrawide: boolean;      // >= 1920px
  isShortLandscape: boolean; // height < 520px && width > height
  isPortrait: boolean;
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;
    const aspect = w / Math.max(1, h);
    return {
      width: w,
      height: h,
      aspect,
      isNarrowFoldable: w < 320,
      isSmallMobile: w < 360,
      isMobile: w < 640,
      isTablet: w >= 640 && w < 1024,
      isDesktop: w >= 1024,
      isUltrawide: w >= 1920,
      isShortLandscape: h < 520 && w > h,
      isPortrait: h > w,
    };
  });

  useEffect(() => {
    let timeoutId: number;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const aspect = w / Math.max(1, h);
        setState({
          width: w,
          height: h,
          aspect,
          isNarrowFoldable: w < 320,
          isSmallMobile: w < 360,
          isMobile: w < 640,
          isTablet: w >= 640 && w < 1024,
          isDesktop: w >= 1024,
          isUltrawide: w >= 1920,
          isShortLandscape: h < 520 && w > h,
          isPortrait: h > w,
        });
      }, 50);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return state;
}
