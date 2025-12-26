"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  Code, Globe, Zap, Target,
  Award, Users, Phone, Mail,
  MapPin, ChevronRight, LucideIcon
} from "lucide-react";

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

const AboutPage: React.FC = () => {
  return (
      <div className="min-h-screen bg-transparent">
        {/* --- Full Screen Hero Image Section --- */}
        <motion.section
            className="relative w-full h-screen overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          </div>
          
          {/* Optional: Add some text overlay on the image if needed */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <motion.div
                variants={fadeInUp}
                className="text-center px-4"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 drop-shadow-2xl">
                EverbestLab
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-lg">
                Sifatli IT Yechimlar
              </p>
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
              Kompaniya haqida
            </span>
            </motion.div>
            <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              Sifatli <span className="text-blue-600 dark:text-blue-400">IT Yechimlar</span>
            </motion.h1>
            <motion.p
                variants={fadeInUp}
                className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
            >
              <span className="font-bold text-slate-900 dark:text-slate-200">EverbestLab</span> — 2019-yildan buyon O'zbekistonda bizneslarni raqamlashtirish orqali ularning rivojlanishiga hissa qo'shib kelmoqda.
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
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Bizning Missiyamiz</h2>
                <div className="space-y-4 text-slate-600 dark:text-slate-400 text-lg">
                  <p>Biznes jarayonlarini raqamlashtirish nafaqat vaqtni tejash, balki shaffoflikni ta'minlash demakdir.</p>
                  <p>Har bir loyihada sifat, innovatsiya va mijoz ehtiyojlarini birinchi o‘ringa qo‘yamiz.</p>
                </div>
                <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold group"
                >
                  Biz haqimizda ko'proq <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-500/20 transform lg:rotate-2">
                <p className="text-xl font-medium leading-relaxed italic">
                  "Bazaar Admin — bizning eng yirik mahsulotimiz bo'lib, bozorlardagi murakkab jarayonlarni sodda va samarali tizimga aylantiradi."
                </p>
              </div>
            </div>
          </motion.section>

          {/* --- Services Grid --- */}
          <section className="grid md:grid-cols-3 gap-8">
            <ServiceCard
                icon={<Code size={28} />}
                title="Dasturlash"
                description="Zamonaviy steklarda (Next.js, TS) veb va mobil ilovalar ishlab chiqamiz."
            />
            <ServiceCard
                icon={<Globe size={28} />}
                title="Raqamlashtirish"
                description="Bozorlar va savdo markazlari uchun maxsus avtomatlashtirish tizimlari."
            />
            <ServiceCard
                icon={<Zap size={28} />}
                title="IT Konsalting"
                description="Biznesingiz uchun eng to'g'ri texnologik strategiyani tanlashga yordam beramiz."
            />
          </section>

          {/* --- Values --- */}
          <section className="grid sm:grid-cols-3 gap-12 py-10">
            <ValueItem
                icon={Target}
                label="Aniq Maqsad"
                description="Mijozlarimiz muvaffaqiyati bizning asosiy ko'rsatkichimizdir."
            />
            <ValueItem
                icon={Award}
                label="Yuqori Sifat"
                description="Xalqaro standartlarga javob beradigan kod va dizayn."
            />
            <ValueItem
                icon={Users}
                label="Professional Jamoa"
                description="O'z ishining ustalari bo'lgan mutaxassislar birlashmasi."
            />
          </section>

          {/* --- Contact Footer --- */}
          <motion.section
              variants={fadeInUp}
              className="rounded-[3rem] bg-slate-900 dark:bg-blue-600 p-8 md:p-16 text-white shadow-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
              <div className="space-y-6 text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold">Loyihangiz bormi?</h2>
                <p className="text-blue-100/70 text-lg">Keling, uni birgalikda amalga oshiramiz!</p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <ContactInfo icon={Phone} text="+998 (97) 057-51-10" href="tel:+998970575110" />
                  <ContactInfo icon={Mail} text="info@everbestlab.uz" href="mailto:info@everbestlab.uz" />
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full max-w-xs">
                <a href="https://everbestlab.uz" target="_blank" className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold text-center hover:bg-blue-50 transition-colors shadow-lg">
                  Veb-saytga o'tish
                </a>
                <div className="flex items-center justify-center gap-3 text-white/60 text-sm">
                  <MapPin size={16} /> Toshkent, O'zbekiston
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

export default AboutPage;