import { useMediaQuery } from 'react-responsive';
import deviceWidth from '../constants/deviceWidth';

interface returnUseDeviceDetectionInterface {
  device: 'desktop' | 'mobile' | 'tablet';
  id: 1 | 2 | 3;
}

export default function useDeviceDetection(): returnUseDeviceDetectionInterface {
  const isDesktop = useMediaQuery({ minWidth: deviceWidth.minDesktop + 'px' });
  const isTablet = useMediaQuery({ minWidth: deviceWidth.minTablet + 'px' });
  const isMobile = useMediaQuery({ maxWidth: deviceWidth.maxMobile + 'px' });

  if (isDesktop) return { device: 'desktop', id: 3 };
  if (isTablet) return { device: 'tablet', id: 2 };
  if (isMobile) return { device: 'mobile', id: 1 };

  return { device: 'mobile', id: 1 }; // valor padrao se der erro
}
