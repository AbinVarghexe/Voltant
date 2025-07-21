import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaXTwitter
} from 'react-icons/fa6';

const heroImages = [
  {
    path: '/assets/images/Home/Hero/hero1.jpg',
    title: (
      <>
        For a Sustainable Tomorrow,<br />Save Energy Today.
      </>
    )
  },
  {
    path: '/assets/images/Home/Hero/hero2.jpg',
    title: (
      <>
        Turning Waste into Power,<br /> Fueling a Greener Future.
      </>
    )
  },
  {
    path: '/assets/images/Home/Hero/hero3.jpg',
    title: (
      <>
        Maximize Efficiency,<br /> Minimize Waste.
      </>
    )
  }
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showSocialTray, setShowSocialTray] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imageDuration = 8000; // 8 seconds per image

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Carousel logic
  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / imageDuration, 1);
      setProgress(newProgress);
      if (newProgress >= 1) {
        setCurrentIndex((prev) => (prev + 1) % heroImages.length);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Show social tray only on desktop
  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => setShowSocialTray(true), 2500);
    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Image Container */}
      <div className="absolute inset-0 z-[1] bg-black overflow-hidden">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img.path}
            alt="Hero Slide"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            draggable={false}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            currentIndex === 0
              ? 'radial-gradient(circle, rgba(144, 238, 144, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%)'
              : currentIndex === 1
                ? 'radial-gradient(circle, rgba(135, 206, 235, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%)'
                : 'radial-gradient(circle, rgba(135, 206, 235, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%)',
          mixBlendMode: 'multiply'
        }}
      />

      {/* Social Media Icons - Desktop Only */}
      {!isMobile && showSocialTray && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            duration: 0.8
          }}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 z-20"
        >
          {[FaYoutube, FaInstagram, FaFacebook, FaLinkedin, FaXTwitter].map((Icon, index) => (
            <a
              key={index}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white p-1 block hover:text-primary transition-colors duration-200"
              aria-label={Icon.name.replace('Fa', '')}
            >
              <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                <Icon size={24} />
              </motion.div>
            </a>
          ))}
        </motion.div>
      )}

      {/* Text Content - Now using dvh units */}
      <motion.div
        key={`caption-${currentIndex}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className={`absolute ${isMobile ? 'bottom-[20dvh] left-4 max-w-[80%]'
          : 'bottom-20 sm:bottom-32 md:bottom-[200px] left-8 sm:left-12 md:left-[100px]'
          } z-10 text-white text-left`}
        style={{ maxWidth: isMobile ? '80%' : '500px' }}
      >
        <h3 className={`${isMobile ? 'text-xl leading-snug'
          : 'text-3xl sm:text-4xl md:text-[2.45rem] leading-tight'
          } font-normal m-0 font-['Cairo'] drop-shadow-lg`}>
          {heroImages[currentIndex].title}
        </h3>
      </motion.div>

      {/* Progress Indicators - Using dvh units */}
      <div className={`absolute ${isMobile ? 'bottom-[10dvh]'
        : 'bottom-6 sm:bottom-8 md:bottom-[30px]'
        } left-0 right-0 flex justify-center gap-2 sm:gap-5 md:gap-[20px] z-10`}>
        {heroImages.map((_, index) => (
          <div
            key={index}
            className={`${isMobile ? 'h-1' : 'h-1 md:h-[4px]'
              } rounded-[2px] overflow-hidden transition-all duration-300`}
            style={{
              width: index === currentIndex ? (isMobile ? '80px' : '100px') : (isMobile ? '40px' : '50px'),
              backgroundColor: 'rgba(255,255,255,0.3)',
            }}
          >
            <div
              className="h-full rounded-[2px] bg-white transition-all duration-100"
              style={{
                width: index === currentIndex
                  ? `${progress * 100}%`
                  : index < currentIndex
                    ? '100%'
                    : '0%'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;