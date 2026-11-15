import { useWindowDimensions } from 'react-native';

export const breakpoints = { tablet: 700, desktop: 1100 } as const;

/** Layout facts derived from the window, so screens adapt to phone, tablet and desktop. */
export const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= breakpoints.tablet;
  const isDesktop = width >= breakpoints.desktop;
  const contentWidth = Math.min(width, isDesktop ? 1180 : isTablet ? 900 : width);

  return {
    width,
    height,
    isPhone: !isTablet,
    isTablet,
    isDesktop,
    contentWidth,
    gridColumns: isDesktop ? 4 : isTablet ? 3 : 2,
    gutter: isTablet ? 32 : 20,
  };
};
