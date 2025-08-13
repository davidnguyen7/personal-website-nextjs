'use client';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';
import ReactLenis, {LenisRef} from 'lenis/react';
import {useEffect, useRef} from 'react';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function AnimationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);
  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    return () => {
      gsap.ticker.remove(update);
    };
  });

  useGSAP(() => {
    gsap.to('#animation-wrapper', {visibility: 'visible', duration: 0});
  }, []);

  return (
    <>
      <ReactLenis root options={{autoRaf: false}} ref={lenisRef} />
      <div id="animation-wrapper" style={{visibility: 'hidden'}}>
        {children}
      </div>
    </>
  );
}
