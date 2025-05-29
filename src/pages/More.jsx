import React from 'react';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ChatButton from '../components/common/ChatButton';
import HeroSection from '../components/common/SectionComponents/HeroSection';
import SeamlessChargingSection from '../components/common/SectionComponents/SeamlessChargingSection';
import MidSection from '../components/common/SectionComponents/MidSection';
import ProfilesSection from '../components/common/SectionComponents/ProfilesSection';

import { moreData } from '../utils/sectionData';

const More = () => (
  <>
    <ChatButton phoneNumber='+971506419857' />
    <div className='flex flex-col min-h-screen bg-white px-0 overflow-hidden'>
      <HeroSection
        title={moreData.hero.title}
        showSubtitle={moreData.hero.showSubtitle}
        subtitle={moreData.hero.subtitle}
        breadcrumbs={moreData.hero.breadcrumbs}
        heroImage={moreData.hero.heroImage}
      />
      <div className='w-full flex flex-col items-center justify-center px-0 md:px-20'>
        <SeamlessChargingSection
          title={moreData.seamlessCharging.title}
          paragraphs={moreData.seamlessCharging.paragraphs}
        />
      </div>
      <section className='w-full py-16'>
        <MidSection
          backgroundImage={moreData.midSection.backgroundImage}
          sectionTitle={moreData.midSection.sectionTitle}
          features={moreData.midSection.features}
        />
      </section>
      <ProfilesSection
        sectionTitle={moreData.profiles.sectionTitle}
        leftProfiles={moreData.profiles.leftProfiles}
        rightProfiles={moreData.profiles.rightProfiles}
        buttonText={moreData.profiles.buttonText}
        showButton={moreData.profiles.showButton}
      />
    </div>
    <footer />
  </>
);

export default More;
