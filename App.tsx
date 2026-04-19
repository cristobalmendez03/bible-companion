import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router';
import { I18nProvider, useI18n } from '@/hooks/useI18n';
import { ThemeProvider } from '@/hooks/useTheme';
import { useQuestionLimit } from '@/hooks/useQuestionLimit';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Toast from '@/components/Toast';
import EmailModal from '@/components/EmailModal';
import Chatbot from '@/components/Chatbot';
import StickyBanner from '@/components/StickyBanner';
import LanguageSelector from '@/components/LanguageSelector';
import UpgradeModal from '@/components/UpgradeModal';
import BackToTop from '@/components/BackToTop';
import Hero from '@/sections/Hero';
import HowItWorks from '@/sections/HowItWorks';
import Features from '@/sections/Features';
import Audience from '@/sections/Audience';
import Comparison from '@/sections/Comparison';
import Testimonials from '@/sections/Testimonials';
import Pricing from '@/sections/Pricing';
import FAQ from '@/sections/FAQ';
import FinalCTA from '@/sections/FinalCTA';
import Footer from '@/sections/Footer';
import NotFound from '@/pages/NotFound';

function AppShell({ children }: { children: React.ReactNode }) {
  const { t, setLang, hasSelectedLang } = useI18n();
  const { hasReachedLimit } = useQuestionLimit();

  const [showLangSelector, setShowLangSelector] = useState(!hasSelectedLang);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  const handleLangSelect = useCallback((lang: 'en' | 'es') => {
    setLang(lang);
    setShowLangSelector(false);
  }, [setLang]);

  const openEmailModal = useCallback(() => setEmailModalOpen(true), []);
  const closeEmailModal = useCallback(() => setEmailModalOpen(false), []);
  const openUpgradeModal = useCallback(() => setUpgradeModalOpen(true), []);
  const closeUpgradeModal = useCallback(() => setUpgradeModalOpen(false), []);

  // Auto-open upgrade when limit reached
  const [limitTriggered, setLimitTriggered] = useState(false);
  if (hasReachedLimit && !limitTriggered) {
    setLimitTriggered(true);
    setTimeout(() => setUpgradeModalOpen(true), 500);
  }

  return (
    <>
      {/* STEP 1: Language Selector — blocks everything until selected */}
      <LanguageSelector isOpen={showLangSelector} onSelect={handleLangSelect} />

      {/* STEP 2: Preloader + Main UI (only after language selected) */}
      {!showLangSelector && (
        <>
          <Preloader verses={t.preloader.verses} />
          <Navbar onEmailModalOpen={openEmailModal} />
          <Toast />

          <EmailModal
            isOpen={emailModalOpen}
            onClose={closeEmailModal}
            title={t.modal.title}
            namePlaceholder={t.modal.namePlaceholder}
            emailPlaceholder={t.modal.emailPlaceholder}
            submitText={t.modal.submit}
            disclaimer={t.modal.disclaimer}
            thanksMessage={t.modal.thanks}
          />

          <UpgradeModal isOpen={upgradeModalOpen} onClose={closeUpgradeModal} />

          <main>{children}</main>

          <Footer />
          <BackToTop />
          <Chatbot onUpgradeClick={openUpgradeModal} />
          <StickyBanner onUpgradeClick={openUpgradeModal} />
        </>
      )}
    </>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <Audience />
      <Comparison />
      <Testimonials />
      <Pricing onFreePlanClick={() => {}} />
      <FAQ />
      <FinalCTA />
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<AppShell><HomePage /></AppShell>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </I18nProvider>
  );
}
