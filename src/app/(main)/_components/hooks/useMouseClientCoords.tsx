'use client';
import {useRef, useEffect} from 'react';
export interface MousePosition {
  x: number;
  y: number;
}

export function useMouseClientCoords() {
  const {current: mouse} = useRef<MousePosition>({x: 0, y: 0});

  useEffect(() => {
    const mouse_event_callback = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', mouse_event_callback);

    return () => {
      document.removeEventListener('mousemove', mouse_event_callback);
    };
  });

  return mouse;
}
