import React, { useRef } from "react";
import { useIntersection } from "react-use";

export function MobileScrollReveal({ 
  children, 
  minHeight = "80px" 
}: { 
  children: React.ReactNode, 
  minHeight?: string 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '250px', // pre-render 250px before it enters viewport
    threshold: 0
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  // If it's desktop, always render. If mobile, render when intersecting or before intersection object is ready
  const isVisible = !isMobile || !intersection || intersection.isIntersecting;

  return (
    <div 
      ref={ref} 
      style={{ 
        minHeight: isMobile ? minHeight : 'auto', 
        transition: 'opacity 0.3s', 
        opacity: isVisible ? 1 : 0 
      }}
    >
      {isVisible ? children : null}
    </div>
  );
}
