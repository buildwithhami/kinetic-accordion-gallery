'use client';

import React, { useEffect, useRef } from 'react';
import { galleryData, GalleryItem } from '@/data/galleryData';

export type { GalleryItem };

interface KineticAccordionProps {
  items?: GalleryItem[];
}

export default function KineticAccordion({ items = galleryData }: KineticAccordionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>('.accordion-card'));

    const isMobileView = () => window.innerWidth < 768;
    const getViewTier = () => (window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop');
    let currentViewTier = getViewTier();

    const resetAccordion = () => {
      cards.forEach((c) => {
        c.style.removeProperty('flex');
        c.classList.remove('active', 'mobile-active');
      });
    };

    const updateMobileGallery = () => {
      if (!isMobileView()) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const totalScrollableDistance = section.offsetHeight - windowHeight;
        const currentScrollTop = -rect.top;
        const scrollProgress = Math.max(0, Math.min(1, currentScrollTop / totalScrollableDistance));

        const activeIndex = Math.floor(scrollProgress * cards.length);
        const targetIndex = Math.min(activeIndex, cards.length - 1);

        cards.forEach((c, idx) => {
          if (idx === targetIndex) {
            c.style.flex = '3';
            c.classList.add('mobile-active');
          } else {
            c.style.flex = '1';
            c.classList.remove('mobile-active');
          }
        });
      }
    };

    const initAccordion = () => {
      resetAccordion();
      if (isMobileView()) updateMobileGallery();
    };

    initAccordion();

    let resizeRaf: number | null = null;
    const handleResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        const tier = getViewTier();
        if (tier !== currentViewTier) {
          currentViewTier = tier;
          initAccordion();
        } else if (tier === 'mobile') {
          updateMobileGallery();
        }
      });
    };
    window.addEventListener('resize', handleResize);

    const expandCard = (card: HTMLElement) => {
      if (isMobileView()) return;
      cards.forEach((c) => {
        c.style.flex = '1';
        c.classList.remove('active', 'mobile-active');
      });
      card.style.flex = window.innerWidth < 1024 ? '2.8' : '3.5';
      card.classList.add('active');
    };

    const cardCleanups: (() => void)[] = [];
    cards.forEach((card) => {
      const onMouseEnter = () => {
        if (!isMobileView()) expandCard(card);
      };
      const onClick = (e: MouseEvent) => {
        e.stopPropagation();
        if (!isMobileView()) {
          expandCard(card);
        }
      };

      card.addEventListener('mouseenter', onMouseEnter);
      card.addEventListener('click', onClick);

      cardCleanups.push(() => {
        card.removeEventListener('mouseenter', onMouseEnter);
        card.removeEventListener('click', onClick);
      });
    });

    const onMouseLeave = () => {
      if (!isMobileView()) resetAccordion();
    };
    container.addEventListener('mouseleave', onMouseLeave);

    let scrollTicking = false;
    const handleScroll = () => {
      if (!isMobileView() || scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        updateMobileGallery();
        scrollTicking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mouseleave', onMouseLeave);
      cardCleanups.forEach((cleanup) => cleanup());
    };
  }, [items]);

  return (
    <section ref={sectionRef} id="kinetic-accordion" className="relative py-12 md:py-24 h-[300vh] md:h-auto bg-[#050505] w-full">
      <div className="sticky md:relative top-0 md:top-auto h-screen md:h-auto flex flex-col justify-center max-w-7xl mx-auto px-6 overflow-hidden">
        <div className="w-full h-[900px] md:h-[500px] flex flex-col md:flex-row gap-4 transition-all duration-500" ref={containerRef} id="accordion-container">
          {items.map((item) => (
            <div
              key={item.id}
              className="accordion-card relative h-full rounded-3xl cursor-pointer flex-1 transition-all duration-500 border border-neutral-800 bg-[#0a0a0a]"
            >
              <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${item.bgImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white shrunk-content z-10 pointer-events-none">
                <h3 className="text-sm md:text-lg font-cinzel font-bold tracking-wider truncate">{item.title}</h3>
              </div>

              <div className="absolute inset-x-4 md:inset-x-6 bottom-8 md:bottom-10 flex flex-col items-center justify-end text-center text-white expanded-content z-10">
                <span className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase text-stone-300 mb-3 font-medium px-2 text-balance">{item.subtitle}</span>
                <a
                  href={item.buttonHref}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-black pointer-events-auto"
                >
                  {item.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}