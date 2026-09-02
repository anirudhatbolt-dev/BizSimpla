'use client';

import {
  ArrowRight,
  Check,
  Menu,
  Star,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

const heroImage = '/Gemini_Generated_Image_hydkmdhydkmdhydk.png';

const featureImages = [
  '/Gemini_Generated_Image_u97wdxu97wdxu97w_(1).png',
  '/Gemini_Generated_Image_hcmou7hcmou7hcmo_(1).png',
  '/Gemini_Generated_Image_qj51myqj51myqj51_(1).png',
];

const features = [
  {
    eyebrow: '01 / Ask at the right moment',
    title: 'Photo reviews, automatically',
    points: [
      'Text and email sent the moment a job wraps up',
      'Customers are prompted to attach a photo before they post',
      'Photos flow straight into your Google Business Profile',
    ],
    align: 'text',
  },
  {
    eyebrow: '02 / Say what matters',
    title: 'Reviews that actually rank',
    points: [
      'Smart prompts guide customers toward the specific, searchable language Google rewards',
      'No scripts for you to write or manage',
      'Your profile climbs local search over time, not just star count',
    ],
    align: 'visual',
  },
  {
    eyebrow: '03 / Stay responsive without lifting a finger',
    title: 'Replies sent for you',
    points: [
      'Every review gets a thoughtful, on-brand reply, automatically',
      'Sounds like your business, not a bot',
      'Hours back every week you\u2019d otherwise spend catching up',
    ],
    align: 'text',
  },
];

function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: 'bizsimpler' });
      cal('ui', {
        cssVarsPerTheme: { light: { 'cal-brand': '#111111' }, dark: { 'cal-brand': '#ffffff' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <Cal
      namespace="bizsimpler"
      calLink="onekadian/bizsimpler"
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
    />
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#111111]">
      <header className="site-header">
      <link rel="icon" href="/favicon.ico" sizes="any" />
        <div className="site-header-inner">
          <a className="brand" href="#top" aria-label="Biz Simpler. home">
            <span className="brand-mark"><Star className="h-4 w-4 fill-current" /></span>
            <span>Biz Simpler<span className="brand-dot">.</span></span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#book-a-call">Book a call</a>
          </nav>
          <div className="desktop-actions">
            <a className="button button-dark button-small" href="#book-a-call">Book a call <ArrowRight className="h-4 w-4" /></a>
          </div>
          <button className="mobile-menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="#how-it-works" onClick={() => setMobileOpen(false)}>How it works</a>
            <a href="#book-a-call" onClick={() => setMobileOpen(false)}>Book a call</a>
          </nav>
        )}
      </header>

      <section id="top" className="hero-section">
        <div className="hero-grid" />
        <div className="hero-content page-shell">
          <h1>You got a 5-star review? <span className="hero-highlight">Congratulations &mdash; Google didn&rsquo;t like that.</span></h1>
          <p className="hero-copy">Turns out the internet&rsquo;s pickiest algorithm doesn&rsquo;t care how happy your customer was. It cares if the review has a photo, real words, and a reply. We fix all three, automatically.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#book-a-call">Book a discovery call <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="hero-proof"><span><Check className="h-4 w-4" /> No card needed to talk</span><span><Check className="h-4 w-4" /> 15-minute call</span><span><Check className="h-4 w-4" /> Built for busy owners</span></div>
          <div className="hero-visual">
            <img src={heroImage} alt="Biz Simpler dashboard showing collected reviews and ratings" />
          </div>
        </div>
      </section>

      <section id="features" className="section section-features page-shell">
        <div className="section-intro centered">
          <p className="section-kicker">The complete review engine</p>
          <h2>More proof. Less chasing.</h2>
          <p>Turn the moments after a great job into a steady stream of reviews that help the right customers find you.</p>
        </div>
        <div className="feature-list">
          {features.map((feature, index) => (
            <article className={`feature-row ${feature.align === 'visual' ? 'feature-row-reverse' : ''}`} key={feature.title}>
              <div className="feature-copy-card">
                <p className="feature-eyebrow">{feature.eyebrow}</p>
                <h3>{feature.title}</h3>
                <ul>{feature.points.map((point) => <li key={point}><span className="check-circle"><Check className="h-3.5 w-3.5" /></span><span>{point}</span></li>)}</ul>
              </div>
              <div className="feature-visual">
                <img src={featureImages[index]} alt={`Illustration for ${feature.title}`} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="section how-section">
        <div className="narrow-shell">
          <div className="section-intro centered">
            <p className="section-kicker">Simple by design</p>
            <h2>How it works</h2>
          </div>
          <div className="steps-list">
            <div className="step"><span className="step-number">1</span><p>Right after a job&rsquo;s done, we text and email the customer a <strong>review request with a photo prompt.</strong></p></div>
            <div className="step"><span className="step-number">2</span><p>They leave a <strong>photo-attached, keyword-rich review</strong> on Google &mdash; guided the whole way by smart prompts.</p></div>
            <div className="step"><span className="step-number">3</span><p>No response yet? <strong>Automatic reminders</strong> go out. Once the review lands, it gets a <strong>reply &mdash; also automatic.</strong></p></div>
          </div>
        </div>
      </section>

      <section id="book-a-call" className="section cal-section page-shell">
        <div className="section-intro centered">
          <p className="section-kicker">Book a call</p>
          <h2>Let&rsquo;s talk.</h2>
          <p>Pick a time that works. 15 minutes, no pressure.</p>
        </div>
        <div className="cal-embed-wrapper">
          <CalEmbed />
        </div>
      </section>

      <section id="why-reviewly" className="founder-section">
        <div className="narrow-shell founder-inner">
          <p className="founder-title">Hi.</p>
          <div className="founder-copy">
            <p>You just scrolled past the part where most sites show you a pricing table. We didn&rsquo;t build one. <strong>Book a call instead</strong> &mdash; it&rsquo;ll make more sense that way, and honestly we&rsquo;d rather talk to you than sell to a scroll.</p>
            <p>Here&rsquo;s the actual problem, if you&rsquo;re still reading. You did the job well. Customer was happy. Somebody said &ldquo;leave us a review&rdquo; on the way out, maybe pointed at a QR code taped near the register. And then... nothing. Or worse &mdash; two words. <strong>&ldquo;Great service.&rdquo; Google shrugs.</strong> The next customer searching for you never even sees it.</p>
            <p>That&rsquo;s not a review problem. That&rsquo;s an asking problem. <strong>Nobody taught your customers how to write a review that actually helps you</strong> &mdash; with a photo, with the right words, at the right moment, before they forget why they were even impressed.</p>
            <p>So we built the thing that asks properly. Right after the job. With a photo prompt. With language that Google actually rewards. And when the review lands, somebody replies &mdash; automatically, in your voice.</p>
            <p><strong>You did the hard part already. You did good work.</strong> We just make sure the internet finds out.</p>
          </div>
        </div>
      </section>

      <section className="section cta-section page-shell">
        <div className="cta-card">
          <h2>Your next review shouldn&rsquo;t need a QR code and a prayer. <span>Book a call.</span></h2>
          <a className="button button-primary" href="#book-a-call">Book a call <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>

      <footer id="footer" className="site-footer">
        <div className="footer-inner page-shell">
          <a className="brand" href="#top"><span className="brand-mark"><Star className="h-4 w-4 fill-current" /></span><span>Biz Simpler<span className="brand-dot">.</span></span></a>
          <p className="footer-note">A smarter way to grow your reputation.</p>
          <div className="footer-links"><a href="#footer">Privacy</a><a href="#footer">Terms</a><a href="#book-a-call">Contact</a></div>
          <p className="copyright">&copy; 2026 Biz Simpler. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
