import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, Heart, MessageCircle, Share2, MoreHorizontal, Users, CheckCircle2 } from 'lucide-react';
import { useInvestigationStore } from '../../store/investigationStore';

const CASE_ID = 6;

const testimonials = [
  { name: 'Rohan M.', text: 'Got ₹40,000 profit in first month! This is life-changing!', time: '2 hours ago' },
  { name: 'Sneha K.', text: '100% legit. Already withdrawn 3 times successfully!', time: '3 hours ago' },
  { name: 'Amit P.', text: 'Skeptical at first but now earning ₹1.5L monthly!', time: '5 hours ago' },
  { name: 'Priya R.', text: 'Best investment of my life! 40% returns guaranteed!', time: '1 day ago' },
];

export default function InvestmentScamEnvironment() {
  const { addClue } = useInvestigationStore();
  const [tab, setTab] = useState<'instagram' | 'telegram'>('instagram');
  const [engagementChecked, setEngagementChecked] = useState(false);
  const [sebiChecked, setSebiChecked] = useState(false);

  const handleClue = (id: string, label: string, detail: string) => {
    addClue(CASE_ID, { id, label, detail, timestamp: Date.now() });
  };

  return (
    <div className="h-full flex flex-col bg-[#0a0a0f] rounded-xl overflow-hidden border border-slate-700/50">
      <div className="flex border-b border-slate-800">
        {(['instagram', 'telegram'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
              tab === t ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t === 'instagram' ? '📸 Instagram Profile' : '✈ Telegram Group'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === 'instagram' && (
          <div className="bg-white min-h-full">
            {/* Instagram Profile */}
            <div className="px-4 py-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center text-2xl flex-shrink-0">💰</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">wealthgrowth_india</span>
                    <div
                      onClick={() => handleClue('rf6-2', 'Fake follower pattern', 'Account has 847,000 followers but engagement rate is under 0.1% — typical of bought followers')}
                      className="bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-amber-400 transition-all"
                      title="Inspect verification"
                    >
                      <CheckCircle2 size={10} className="text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center mb-2">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">142</p>
                      <p className="text-gray-500 text-xs">posts</p>
                    </div>
                    <div
                      onClick={() => {
                        setEngagementChecked(true);
                        handleClue('rf6-2', 'Fake follower pattern', '847K followers but only 200-300 likes per post = 0.03% engagement rate. Authentic accounts get 2-5%');
                      }}
                      className="cursor-pointer hover:bg-amber-50 rounded transition-colors"
                    >
                      <p className="font-bold text-gray-900 text-sm">847K</p>
                      <p className={`text-xs ${engagementChecked ? 'text-amber-600' : 'text-gray-500'}`}>followers</p>
                      {engagementChecked && <p className="text-xs text-amber-500">⚠ Low engagement</p>}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">12</p>
                      <p className="text-gray-500 text-xs">following</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-xs leading-relaxed">💹 Making Indians financially free | 40% monthly returns GUARANTEED | Telegram link in bio | SEBI registered*</p>
                </div>
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-3 gap-0.5 mb-4">
                {[
                  { bg: 'from-green-500 to-emerald-600', text: '+₹2.3L profit this month! 🚀' },
                  { bg: 'from-blue-500 to-cyan-600', text: 'Client testimonial 📊' },
                  { bg: 'from-purple-500 to-pink-600', text: 'Join now — limited slots' },
                  { bg: 'from-amber-500 to-orange-600', text: '40% monthly return PROOF' },
                  { bg: 'from-red-500 to-rose-600', text: 'Another withdrawal success!' },
                  { bg: 'from-teal-500 to-green-600', text: 'Bank statement real' },
                ].map((post, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (i === 3) handleClue('rf6-3', 'Profit screenshots unverifiable', 'Screenshots show large amounts but have no transaction ID, bank reference, or verifiable details');
                    }}
                    className={`aspect-square bg-gradient-to-br ${post.bg} flex items-center justify-center p-2 cursor-pointer hover:opacity-90 transition-opacity`}
                  >
                    <p className="text-white text-xs font-medium text-center leading-tight">{post.text}</p>
                  </div>
                ))}
              </div>

              {/* Recent Post */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 p-3 border-b border-gray-100">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-pink-600 flex items-center justify-center text-white text-xs">💰</div>
                  <span className="text-sm font-semibold text-gray-800">wealthgrowth_india</span>
                  <span className="ml-auto text-gray-400 text-xs">2h</span>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white text-center">
                  <p className="text-3xl font-bold mb-2">₹45,000</p>
                  <p className="text-sm opacity-90">PROFIT IN 30 DAYS</p>
                  <p className="text-xs opacity-70 mt-1">Client: Ramesh K. (verified member)</p>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-4 mb-2 text-gray-600">
                    <Heart size={18} /> <span className="text-sm">284</span>
                    <MessageCircle size={18} /> <span className="text-sm">12</span>
                    <Share2 size={18} />
                  </div>
                  <div
                    onClick={() => handleClue('rf6-3', 'Profit screenshots unverifiable', 'Profit screenshots show amounts but lack transaction IDs, bank reference numbers or audit trails')}
                    className="cursor-pointer bg-amber-50 rounded p-2 border border-amber-200 hover:border-amber-400 transition-colors"
                  >
                    <p className="text-xs text-amber-600">Click to note: This profit screenshot has no verifiable transaction reference</p>
                  </div>
                </div>
                <div className="px-3 pb-3 space-y-1">
                  {testimonials.slice(0, 2).map((t, i) => (
                    <p key={i} className="text-xs text-gray-600"><span className="font-semibold">{t.name.split(' ')[0]}</span> {t.text}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'telegram' && (
          <div className="bg-[#17212b] min-h-full p-4">
            <div className="bg-[#232e3c] rounded-xl overflow-hidden">
              <div className="bg-[#2b5278] px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl">💹</div>
                <div>
                  <p className="text-white font-semibold">WealthGrowth India Official</p>
                  <div
                    onClick={() => handleClue('rf6-4', 'Telegram group uses bots', '50,847 members but messages appear within seconds at all hours — bot-driven fake activity')}
                    className="flex items-center gap-1 cursor-pointer hover:bg-white/10 rounded px-1 py-0.5 -ml-1 transition-colors"
                  >
                    <Users size={12} className="text-blue-300" />
                    <span className="text-blue-300 text-xs">50,847 members</span>
                    <AlertCircle size={11} className="text-amber-400 ml-1" />
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                {[
                  { user: 'Admin', text: '🎉 CONGRATULATIONS to today\'s profit leaders! Join now before slots fill!', time: '2:14 PM', isAdmin: true },
                  { user: 'Rohan_M', text: 'Just withdrew ₹40,000 profit! This group is genuine 🙏', time: '2:15 PM' },
                  { user: 'Sneha_K', text: 'Third successful withdrawal this month! Highly recommended!', time: '2:16 PM' },
                  { user: 'Amit_P', text: 'Which plan should I start with? Already convinced!', time: '2:17 PM' },
                  { user: 'Admin', text: '⚡ LIMITED TIME: Invest ₹10,000 today and get 40% return in 30 days GUARANTEED! DM admin.', time: '2:18 PM', isAdmin: true },
                  { user: 'Priya_R', text: 'Screenshot proof below! Real money real returns!', time: '2:19 PM' },
                  { user: 'Kumar_S', text: 'I referred 5 friends already! 10% referral bonus is amazing!', time: '2:20 PM' },
                ].map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.isAdmin ? 'justify-start' : ''}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${msg.isAdmin ? 'bg-blue-600' : 'bg-slate-600'}`}>
                      {msg.user[0]}
                    </div>
                    <div className={`rounded-xl px-3 py-2 max-w-xs ${msg.isAdmin ? 'bg-blue-800/50' : 'bg-[#2b3f50]'}`}>
                      <p className={`text-xs font-semibold mb-0.5 ${msg.isAdmin ? 'text-blue-300' : 'text-gray-300'}`}>{msg.user}</p>
                      <p className="text-sm text-gray-200">{msg.text}</p>
                      <p className="text-xs text-gray-500 mt-1 text-right">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-700 p-3 space-y-2">
                <div
                  onClick={() => handleClue('rf6-6', 'Referral bonus structure', 'Paying referral commissions to bring new investors is the defining structure of a Ponzi scheme')}
                  className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 cursor-pointer hover:border-amber-500/50 transition-colors"
                >
                  <p className="text-amber-400 text-xs">Referral structure found — Click to record: This is a Ponzi indicator</p>
                </div>
                <div
                  onClick={() => {
                    setSebiChecked(true);
                    handleClue('rf6-5', 'No SEBI registration', 'SEBI registration number promised on profile is fake — no matching entity found at sebi.gov.in');
                  }}
                  className="bg-red-500/10 border border-red-500/20 rounded-lg p-2 cursor-pointer hover:border-red-500/50 transition-colors"
                >
                  <p className="text-xs text-slate-400">Check SEBI registration — Admin claims "SEBI registered" but provides no registration number</p>
                  {sebiChecked && <p className="text-red-400 text-xs mt-1">Not found on sebi.gov.in</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
