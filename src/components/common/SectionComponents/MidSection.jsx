import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { heroIcons, homeImgs } from '../../../utils/localAssets'

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

const blurSectionVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

function Feature ({ icon, title, description }) {
  const [iconLoaded, setIconLoaded] = useState(false)
  
  // Get the icon path from local assets
  const iconPath = heroIcons[icon] || icon

  return (
    <motion.div
      className='flex items-center gap-[38px] md:gap-[38px] mt-10 first:mt-20 first:max-md:mt-6'
      variants={itemVariants}
    >
      {/* Desktop and Mobile: Icon */}
      {icon && (
        <div className='flex-shrink-0 relative'>
          {!iconLoaded && (
            <div className='absolute inset-0 flex items-center justify-center w-8 md:w-12 h-8 md:h-12'>
              <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <img
            src={iconPath}
            alt={`${title} icon`}
            className='aspect-[1] object-contain w-8 md:w-12 shrink-0 my-auto'
            onLoad={() => setIconLoaded(true)}
            style={{ opacity: iconLoaded ? 1 : 0, transition: 'opacity 0.5s' }}
          />
        </div>
      )}

      {/* Desktop: Title and Description */}
      <div className='grow shrink w-[415px] basis-auto max-md:hidden'>
        <div className="text-white font-['Cairo'] text-[24px] font-[400] leading-[100%]">
          {title}
        </div>
        <span className="text-white font-['Cairo'] text-[18px] font-[200] block mt-1">
          {description}
        </span>
      </div>

      {/* Mobile: Title and Description */}
      <div className='hidden max-md:block max-md:w-full'>
        <div className="text-white font-['Cairo'] text-[18px] font-[500] leading-[100%]">
          {title}
        </div>
        <span className="text-white font-['Cairo'] text-[14px] font-[200] block mt-2">
          {description}
        </span>
      </div>
    </motion.div>
  )
}

const MidSection = ({
  backgroundImage,
  sectionTitle = 'Why Choose Us?',
  features = []
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Get background image path from local assets or fallback to provided path
  const backgroundPath = homeImgs[backgroundImage] || backgroundImage

  return (
    <section className='relative h-auto min-h-screen md:h-[140vh] w-full overflow-hidden'>
      {!imageLoaded && (
        <div className='absolute inset-0 bg-gray-800 z-5 flex items-center justify-center'>
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={backgroundPath}
        alt='Section Background'
        className='w-full h-full object-cover absolute inset-0'
        onLoad={() => setImageLoaded(true)}
        style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 1s' }}
      />
        <div className='absolute inset-0 bg-black/50 md:bg-black/30 z-10'></div>
        <motion.div
          className='relative md:absolute top-0 left-0 backdrop-blur-sm w-full md:w-1/2 min-h-screen md:h-full flex justify-center items-center z-20 px-5 py-16 md:py-0 md:px-24 bg-transparent'
          initial='hidden'
          whileInView='visible'
          viewport={{ amount: 0.1 }}
          variants={blurSectionVariants}
        >
          <motion.div
            className='flex flex-col items-stretch w-full max-w-md mx-auto md:max-w-none md:mx-0'
            variants={containerVariants}
          >
            <motion.h2
              className='text-[32px] md:text-[40px] text-white max-md:text-[28px] ml-0 font-bold text-center md:text-left mb-8 md:mb-0'
              variants={itemVariants}
            >
              {sectionTitle}
            </motion.h2>

            <div className='space-y-8 space-x-4 md:space-x-0 md:space-y-0'>
              {features.map((feature, index) => (
                <Feature
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>          </motion.div>
        </motion.div>
      </section>
  )
}

export default MidSection
