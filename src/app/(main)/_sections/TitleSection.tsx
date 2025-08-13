'use client';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import SocialMediaRedirects, {
  SocialMedia,
} from '../_components/SocialMediaRedirects';

export default function TitleSection({
  socialMedia,
}: {
  socialMedia?: SocialMedia;
}) {
  useGSAP(() => {
    let title_hero_tl = gsap.timeline();
    title_hero_tl
      .fromTo(
        '.hero#title .big-text',
        {opacity: 0, y: 20},
        {opacity: 1, y: 0, duration: 0.5},
      )
      .fromTo(
        '.hero#title .top-text, .hero#title .bottom-text, .hero#title .social_media-redirects, nav',
        {opacity: 0},
        {
          opacity: 1,
          duration: 0.5,
        },
      );

    gsap.fromTo(
      '.hero#title > .hero-content',
      {opacity: 1},
      {
        opacity: 0,
        scrollTrigger: {
          trigger: '.hero#title',
          scrub: true,
          start: 'clamp(top top)',
          end: '+=75%',
        },
      },
    );
  }, []);

  return (
    <div className="hero" id="title">
      <div className="hero-content">
        <span className="top-text">Welcome to the website of</span>
        <h1 className="big-text">David Nguyen.</h1>
        <span className="bottom-text">
          (a software developer based in Sydney, Australia)
        </span>
        <SocialMediaRedirects socialMedia={socialMedia} />
      </div>
    </div>
  );
}
