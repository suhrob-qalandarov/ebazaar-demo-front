"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  Code, Globe, Zap, Target,
  Award, Users, Phone, Mail,
  MapPin, ChevronRight, LucideIcon
} from "lucide-react";
import type { Locale } from "@/types/locale";
import type { DynamicHomeData } from "@/types/dynamic";
import { getStaticContent } from "@/content";

/** * TypeScript Interfeyslari
 */
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ValueItemProps {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface ContactItemProps {
  icon: LucideIcon;
  href?: string;
  text: string;
}

interface HomePageProps {
  locale: Locale;
  dynamicData?: DynamicHomeData;
}

/** * Framer Motion Animatsiyalari
 */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  }
};

const HomePage: React.FC<HomePageProps> = ({ locale, dynamicData }) => {
  const content = getStaticContent(locale);

  return (
    <div className="min-h-screen bg-transparent">
      {/* --- Hero Section: Mobile/iPad (Full Screen Image) & Desktop (Split Layout) --- */}
      <motion.section
        className="relative w-full overflow-hidden md:rounded-b-[6rem] lg:rounded-b-none"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Mobile/iPad: Full Screen Hero Image */}
        <div className="lg:hidden relative w-full h-screen">
          <div className="absolute inset-0 z-0">
            <Image
              src="/main/bazar_tashkenta_chorsu.webp"
              alt="Bazar Toshkent Chorsu"
              fill
              priority
              className="object-cover"
              quality={90}
            />
            {/* Overlay gradient for better text readability */}
            <div 
              className="absolute inset-0" 
              style={{
                background: 'linear-gradient(to bottom, var(--hero-overlay-start), var(--hero-overlay-middle), var(--hero-overlay-end))'
              }}
            />
          </div>

          {/* Text overlay on the image */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <motion.div
              variants={fadeInUp}
              className="text-center px-4"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
                {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-lg">
                {content.hero.subtitle}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Desktop: Split Layout with Dark Blue Background */}
        <div className="hidden lg:flex min-h-screen relative" style={{ backgroundColor: 'rgb(15, 23, 42)' }}>
          {/* Left Side: Content Box */}
          <div className="max-w-7xl mx-auto w-full px-8 py-16 relative z-10 flex-1">
            <div className="h-full min-h-[80vh] flex flex-col justify-start pt-40">
              {/* SVG uchun joy */}
              <motion.div
                variants={fadeInUp}
                className="mb-6 px-8 relative z-10"
              >
                {/* SVG ni shu yerga copy-paste qiling */}
              </motion.div>

              {/* Text above quote box */}
              <motion.div
                variants={fadeInUp}
                className="mb-8 text-white max-w-sm px-8 relative z-10"
              >
                <p className="text-lg leading-relaxed">
                  <span className="font-bold text-xl">EverbestLab</span> — e-kommersiyalar uchun baxtli va sodiq mijozlarni olib keluvchi texnologik kompaniya.
                </p>
              </motion.div>

              {/* Content Box - Logo pastidan */}
              <motion.div
                variants={fadeInUp}
                className="relative left-5 z-10"
              >
                <div className="p-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-500/20 transform lg:-rotate-2 max-w-[370px] min-h-[200px] flex items-center">
                  <p className="text-xl font-medium leading-relaxed italic">
                    "{content.quote.text}"
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Image Box - Positioned to touch right and top edges (from navbar) */}
          <motion.div
            variants={fadeInUp}
            className="hidden lg:block absolute right-0 top-0 w-[62%] h-[95%] rounded-bl-[4rem] overflow-visible shadow-2xl group"
          >
            <div className="relative w-full h-full group/image-container">
              <div className="absolute inset-0 rounded-bl-[4rem] overflow-hidden">
                <Image
                  src="/main/def-3.jpg"
                  alt="Bazar Toshkent Chorsu"
                  fill
                  priority
                  className="object-cover object-right transition-transform duration-700 group-hover:scale-103 group-hover/image-container:scale-103"
                  style={{ objectPosition: 'left top' }}
                  quality={90}
                />
                {/* Gradient overlay from left to create depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-transparent" />
                {/* Subtle vignette effect on bottom-right */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
                {/* Decorative corner accent */}
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-600/20 to-transparent blur-3xl" />
              </div>
              
              {/* Text Overlay on Image */}
              <motion.div
                variants={fadeInUp}
                className="absolute top-40 left-8 z-30 space-y-4"
              >
                <h1 className="text-5xl xl:text-6xl font-extrabold leading-tight text-white whitespace-nowrap drop-shadow-2xl">
                  Bozor ustidan to'liq nazorat
                </h1>
                <h1 className="text-5xl xl:text-6xl font-extrabold leading-tight text-white drop-shadow-2xl max-w-2xl">
                  Savdo va boshqaruv uchun ishonchli yechim
                </h1>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Company About Section --- */}
      <motion.div
        className="max-w-6xl mx-auto px-4 py-16 space-y-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <section className="text-center space-y-6 pt-8">
          <motion.div variants={fadeInUp}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-sm font-semibold border border-blue-500/20 dark:bg-blue-400/10 dark:text-blue-400">
              {content.about.badge}
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            {content.about.title} <span className="text-blue-600 dark:text-blue-400">{content.about.titleHighlight}</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            <span className="font-bold text-slate-900 dark:text-slate-200">EverbestLab</span> — {content.about.description}
          </motion.p>
        </section>

        {/* --- Main Card Section --- */}
        <motion.section
          variants={fadeInUp}
          className="relative group overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-8 md:p-16 shadow-2xl shadow-blue-500/5"
        >
          <div className="absolute top-0 right-0 -z-10 h-80 w-80 bg-blue-500/10 blur-[120px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">{content.mission.title}</h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 text-lg">
                <p>{content.mission.text1}</p>
                <p>{content.mission.text2}</p>
              </div>
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold group"
              >
                {content.mission.buttonText} <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-500/20 transform lg:rotate-2">
              <p className="text-xl font-medium leading-relaxed italic">
                "{content.quote.text}"
              </p>
            </div>
          </div>
        </motion.section>

        {/* --- Services Grid --- */}
        <section className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Code size={28} />}
            title={content.services.programming.title}
            description={content.services.programming.description}
          />
          <ServiceCard
            icon={<Globe size={28} />}
            title={content.services.digitalization.title}
            description={content.services.digitalization.description}
          />
          <ServiceCard
            icon={<Zap size={28} />}
            title={content.services.consulting.title}
            description={content.services.consulting.description}
          />
        </section>

        {/* --- Values --- */}
        <section className="grid sm:grid-cols-3 gap-12 py-10">
          <ValueItem
            icon={Target}
            label={content.values.goal.label}
            description={content.values.goal.description}
          />
          <ValueItem
            icon={Award}
            label={content.values.quality.label}
            description={content.values.quality.description}
          />
          <ValueItem
            icon={Users}
            label={content.values.team.label}
            description={content.values.team.description}
          />
        </section>

        {/* --- Dynamic Data Section (when backend is ready) --- */}
        {dynamicData?.stats && (
          <motion.section
            variants={fadeInUp}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="p-8 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {dynamicData.stats.users}
              </div>
              <div className="text-slate-600 dark:text-slate-400">Foydalanuvchilar</div>
            </div>
            <div className="p-8 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {dynamicData.stats.projects}
              </div>
              <div className="text-slate-600 dark:text-slate-400">Loyihalar</div>
            </div>
            <div className="p-8 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {dynamicData.stats.clients}
              </div>
              <div className="text-slate-600 dark:text-slate-400">Mijozlar</div>
            </div>
          </motion.section>
        )}

        {/* --- Contact Footer --- */}
        <motion.section
          variants={fadeInUp}
          className="rounded-[3rem] bg-slate-900 dark:bg-blue-600 p-8 md:p-16 text-white shadow-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold">{content.contact.title}</h2>
              <p className="text-blue-100/70 text-lg">{content.contact.subtitle}</p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <ContactInfo icon={Phone} text={content.contact.phone} href={`tel:${content.contact.phone.replace(/\s/g, '')}`} />
                <ContactInfo icon={Mail} text={content.contact.email} href={`mailto:${content.contact.email}`} />
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              <a href="https://everbestlab.uz" target="_blank" className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold text-center hover:bg-blue-50 transition-colors shadow-lg">
                {content.contact.websiteButton}
              </a>
              <div className="flex items-center justify-center gap-3 text-white/60 text-sm">
                <MapPin size={16} /> {content.contact.location}
              </div>
            </div>
          </div>
        </motion.section>

      </motion.div>
    </div>
  );
};

/**
 * Komponentlar (Sub-components)
 */

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -10 }}
    className="p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group"
  >
    <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
  </motion.div>
);

const ValueItem: React.FC<ValueItemProps> = ({ icon: Icon, label, description }) => (
  <motion.div variants={fadeInUp} className="text-center space-y-4">
    <div className="mx-auto w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
      <Icon size={24} />
    </div>
    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{label}</h4>
    <p className="text-slate-500 dark:text-slate-400 text-sm">{description}</p>
  </motion.div>
);

const ContactInfo: React.FC<ContactItemProps> = ({ icon: Icon, href, text }) => (
  <a
    href={href}
    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all"
  >
    <Icon size={20} className="text-blue-300" />
    <span className="font-medium">{text}</span>
  </a>
);

export default HomePage;

