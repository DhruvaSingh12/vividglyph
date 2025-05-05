import { useEffect, useState, useRef } from 'react';

type ResizeHandler = (entry: ResizeObserverEntry) => void;

export function useResizeObserver(
  ref: React.RefObject<HTMLElement>,
  callback: ResizeHandler
) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    // Clean up any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Create new observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length) return;
      
      const entry = entries[0];
      
      // Update local state
      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);
      
      // Call the callback with the entry
      callback(entry);
    });
    
    // Start observing
    resizeObserver.observe(ref.current);
    observerRef.current = resizeObserver;
    
    // Clean up when unmounted
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, callback]);

  return { width, height };
}