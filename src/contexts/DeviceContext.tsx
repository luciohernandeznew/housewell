import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { debounce } from 'lodash';

interface DeviceContextValue {
  isMobile: boolean;
  windowSize: {
    width: number;
    height: number;
  };
}

export const DeviceContext = createContext<DeviceContextValue | undefined>(undefined);

export function useDevice() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
}

interface DeviceProviderProps {
  children: ReactNode;
  initialIsMobile: boolean;
}

// this context provider provides 
export function DeviceProvider({ children, initialIsMobile }: DeviceProviderProps) {
  const [windowSize, setWindowSize] = useState({
    width: initialIsMobile ? 0 : 1500,
    height: initialIsMobile ? 0 : 1500,
  });
  const [isMobile, setIsMobile] = useState(initialIsMobile);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      if (window.innerWidth < 768 && !isMobile) {
        setIsMobile(true);
      } else if (window.innerWidth >= 768 && isMobile) {
        setIsMobile(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial window size

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, windowSize.width]);

  return (
    <DeviceContext.Provider value={{ isMobile, windowSize }}>
      {children}
    </DeviceContext.Provider>
  );
}
