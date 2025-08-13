'use client';
import SocialMediaRedirects, {
  SocialMedia,
} from '../_components/SocialMediaRedirects';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';

export default function ContactSection({
  socialMedia,
}: {
  socialMedia?: SocialMedia;
}) {
  useGSAP(() => {
    gsap.fromTo(
      '.hero#contact',
      {opacity: 0},
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          scrub: true,
          trigger: '.hero#contact',
          start: 'top 50%',
          end: 'clamp(top top)',
        },
      },
    );
  }, []);
  return (
    <div className="hero" id="contact">
      <div className="hero-content">
        <p>Want to get in touch?</p>
        <SocialMediaRedirects socialMedia={socialMedia} />
      </div>
    </div>
  );
}
