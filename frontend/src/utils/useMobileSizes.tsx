import { useWindowSize } from 'usehooks-ts';

export const useMobileSizes = () => {
  const { width } = useWindowSize();
  return {
    isMobile: width <= 1040,
    isTablet: width <= 1040 && width > 768,
    isDesktop: width > 1040,
    isNotDesktop: width <= 1040,
  };
};
