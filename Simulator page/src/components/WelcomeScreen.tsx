import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Target, BookOpen, TrendingUp, Phone, Globe } from 'lucide-react';
import { useInvestigationStore } from '../store/investigationStore';
import cases from '../data/cases';

const stats = [
  { value: '15', label: 'Simulations', note: 'Email, UPI, calls, portals' },
  { value: '₹1.25L Cr', label: 'Annual losses', note: 'India cyber fraud (2023)' },
  { value: '5M+', label: 'Cases filed', note: 'On cybercrime.gov.in, 2023' },
];

const features = [
  { icon: Target, title: 'No hints, no shortcuts', body: 'Explore real-looking Gmail, WhatsApp, and UPI interfaces. Discover red flags the same way you would in real life.' },
  { icon: ShieldCheck, title: 'Identify tactics', body: 'Learn to spot fake domains, urgency pressure, impersonation patterns, and psychological manipulation.' },
  { icon: BookOpen, title: 'Expert post-analysis', body: 'Full tactic breakdown after each case with official India cybercrime resources and prevention steps.' },
  { icon: TrendingUp, title: 'Track your growth', body: 'Progress is saved across sessions. Return at any time to re-investigate missed clues.' },
];

export default function WelcomeScreen() {
  const { selectCase, theme } = useInvestigationStore();
  const dk = theme === 'dark';

  return (
    <div className="min-h-full" style={{ background: 'var(--bg)' }}>
      <div className="max-w-2xl mx-auto px-8 pt-14 pb-12">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-8"
            style={{ color: 'var(--indigo)', background: 'var(--indigo-bg)', borderColor: 'var(--indigo-border)' }}
          >
            <ShieldCheck size={12} />
            India Cyber Fraud Detection Training
          </div>

          {/* Headline */}
          <h1 className="text-[42px] font-extrabold leading-[1.1] tracking-tight mb-4" style={{ color: 'var(--text-1)' }}>
            Spot fraud before<br />
            <span style={{ color: 'var(--indigo)' }}>it spots you.</span>
          </h1>

          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-2)' }}>
            15 interactive simulations built from real fraud cases in India.
            No instructions. No hints. Investigate like a professional.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 mb-12">
            <button
              onClick={() => selectCase(1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--indigo)' }}
            >
              Begin First Case
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => selectCase(cases[Math.floor(Math.random() * cases.length)].id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-colors"
              style={{ color: 'var(--text-2)', background: 'var(--surface)', borderColor: 'var(--border)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-2)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
            >
              Random Case
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }}
          className="grid grid-cols-3 gap-3 mb-10"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-4 border"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="text-xl font-extrabold font-mono mb-0.5" style={{ color: 'var(--text-1)' }}>{s.value}</div>
              <div className="text-xs font-semibold mb-0.5" style={{ color: 'var(--indigo)' }}>{s.label}</div>
              <div className="text-[11px]" style={{ color: 'var(--text-3)' }}>{s.note}</div>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.3 }}
          className="grid grid-cols-2 gap-3 mb-10"
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl p-4 border"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <f.icon size={16} className="mb-2.5" style={{ color: 'var(--indigo)' }} />
              <h3 className="text-[13px] font-semibold mb-1" style={{ color: 'var(--text-1)' }}>{f.title}</h3>
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-3)' }}>{f.body}</p>
            </div>
          ))}
        </motion.div>

        {/* Helpline strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26, duration: 0.3 }}>
          <div
            className="rounded-xl border p-4 flex flex-wrap items-center gap-4"
            style={{ background: 'var(--indigo-bg)', borderColor: 'var(--indigo-border)' }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--indigo)' }}>
              <Phone size={15} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>National Cybercrime Helpline</p>
              <p className="text-xs" style={{ color: 'var(--text-2)' }}>Report financial fraud 24/7 — Delhi: 011-20892633</p>
            </div>
            <span className="text-xl font-extrabold font-mono" style={{ color: 'var(--indigo)' }}>1930</span>
            <a
              href="https://cybercrime.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold hover:underline"
              style={{ color: 'var(--indigo)' }}
            >
              <Globe size={12} />cybercrime.gov.in
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
