import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Phone, Search, AlertCircle, Shield, Monitor, ExternalLink, ArrowLeft } from 'lucide-react';
import { useInvestigationStore } from '../../store/investigationStore';

const CASE_ID = 8;

const searchResults = [
  {
    id: 'fake',
    title: 'HDFC Bank Customer Care — 📞 1800-XXX-XXXX (Toll Free)',
    url: 'hdfc-bank-customer-helpline.com',
    desc: 'HDFC Bank Official Helpline. Call now for immediate assistance. Account issues, fraud, net banking support.',
    isAd: true,
    isFake: true,
  },
  {
    id: 'real',
    title: 'Contact Us - HDFC Bank',
    url: 'hdfcbank.com/content/bbp/repositories/723fb80a-2dde-42a3-9793-7ae1be57c87f',
    desc: 'HDFC Bank Customer Care Number: 1800 202 6161 | 1800 200 6161 (Toll Free). Available 24x7.',
    isAd: false,
    isFake: false,
  },
  {
    id: 'wiki',
    title: 'HDFC Bank — Wikipedia',
    url: 'en.wikipedia.org/wiki/HDFC_Bank',
    desc: 'HDFC Bank Limited is an Indian banking and financial services company headquartered in Mumbai.',
    isAd: false,
    isFake: false,
  },
];

const callTranscript = [
  { speaker: 'Agent', text: 'Hello, thank you for calling HDFC Bank customer care. How may I assist you today?' },
  { speaker: 'You', text: 'I have a problem with my account. Some unauthorized transactions have occurred.' },
  { speaker: 'Agent', text: 'I understand your concern. For security purposes, I need to verify your account. Can you please provide your account number and registered mobile number?' },
  { speaker: 'You', text: 'I can provide those. Is there anything else you need?' },
  { speaker: 'Agent', text: 'Yes, to resolve this quickly, please install AnyDesk on your phone. Our technical team will connect remotely to fix the issue directly from your device.' },
  { speaker: 'You', text: 'Is that really necessary? A bank wouldn\'t need remote access...' },
  { speaker: 'Agent', text: 'It\'s our new security protocol. Please install it and share the 9-digit code with me. This is completely safe and verified by RBI.' },
];

export default function FakeCustomerCareEnvironment() {
  const { addClue } = useInvestigationStore();
  const [screen, setScreen] = useState<'google' | 'call' | 'website'>('google');
  const [urlInspected, setUrlInspected] = useState(false);

  const handleClue = (id: string, label: string, detail: string) => {
    addClue(CASE_ID, { id, label, detail, timestamp: Date.now() });
  };

  return (
    <div className="h-full flex flex-col bg-[#202124] rounded-xl overflow-hidden border border-slate-700/50">
      <div className="flex border-b border-slate-700">
        {([
          { id: 'google', label: '🔍 Search Results' },
          { id: 'call', label: '📞 Call Transcript' },
          { id: 'website', label: '🌐 Website' },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setScreen(t.id)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              screen === t.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {screen === 'google' && (
          <div className="bg-white min-h-full p-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl font-bold"><span className="text-blue-600">G</span><span className="text-red-500">o</span><span className="text-amber-500">o</span><span className="text-blue-600">g</span><span className="text-green-600">l</span><span className="text-red-500">e</span></span>
              <div className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
                <Search size={16} className="text-gray-400" />
                <span className="text-gray-700 text-sm">HDFC bank customer care number</span>
              </div>
            </div>
            <div className="space-y-5">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => {
                    if (result.isFake) {
                      setScreen('website');
                      handleClue('rf8-1', 'Number from Google, not official website', 'Google search results can show paid fraudulent listings — only trust numbers from official bank website or card');
                    }
                  }}
                  className={`cursor-pointer group ${result.isFake ? 'bg-amber-50 border border-amber-200 rounded-xl p-3' : ''}`}
                >
                  {result.isAd && (
                    <span className="text-xs text-gray-500 border border-gray-300 rounded px-1 py-0.5 mr-2">Ad</span>
                  )}
                  <div className={`flex items-center gap-1.5 mb-0.5 ${result.isFake ? 'text-sm' : ''}`}>
                    <div className="w-4 h-4 bg-gray-200 rounded-sm" />
                    <span className={`text-xs text-gray-500 font-mono ${result.isFake ? 'text-amber-600' : ''}`}>{result.url}</span>
                    {result.isFake && <AlertCircle size={12} className="text-amber-500" />}
                  </div>
                  <p className={`text-lg ${result.isFake ? 'text-blue-800 font-semibold' : 'text-blue-700'} group-hover:underline`}>{result.title}</p>
                  <p className="text-sm text-gray-600">{result.desc}</p>
                  {result.isFake && (
                    <div className="mt-2 text-xs text-amber-600 flex items-center gap-1">
                      <AlertCircle size={11} />
                      This appears first but is a paid fraudulent listing — click to investigate
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div
              onClick={() => handleClue('rf8-1', 'Number from Google, not official website', 'Fraudsters buy Google Ads to rank fake helplines above real ones — always verify from official sources')}
              className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 cursor-pointer hover:border-blue-400 transition-colors"
            >
              <p className="text-blue-700 text-xs">Click to record: Google Ads can be purchased by anyone — fraudulent numbers appear above legitimate ones</p>
            </div>
          </div>
        )}

        {screen === 'call' && (
          <div className="p-5">
            <div className="bg-slate-800 rounded-xl overflow-hidden">
              <div className="bg-slate-700 px-4 py-3 flex items-center gap-3">
                <Phone size={18} className="text-green-400" />
                <div>
                  <p className="text-white font-medium text-sm">Call in Progress</p>
                  <div
                    onClick={() => handleClue('rf8-5', 'Phone number is personal mobile number', 'Legitimate bank helplines use toll-free 1800 numbers — this is a personal mobile: +91 9876543210')}
                    className="flex items-center gap-1 cursor-pointer hover:bg-white/10 rounded px-1 py-0.5 -ml-1 transition-colors"
                  >
                    <span className="text-amber-400 text-xs font-mono">+91 9876543210</span>
                    <AlertCircle size={10} className="text-amber-400" />
                  </div>
                </div>
                <div className="ml-auto text-green-400 text-sm font-mono">04:23</div>
              </div>
              <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
                {callTranscript.map((line, i) => (
                  <div key={i} className={`flex gap-2 ${line.speaker === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-xl px-3 py-2 max-w-xs ${line.speaker === 'You' ? 'bg-blue-700' : 'bg-slate-700'}`}>
                      <p className={`text-xs font-semibold mb-0.5 ${line.speaker === 'You' ? 'text-blue-200' : 'text-gray-300'}`}>
                        {line.speaker}
                      </p>
                      <p className="text-sm text-gray-200">{line.text}</p>
                    </div>
                  </div>
                ))}
                <div
                  onClick={() => handleClue('rf8-2', 'Agent requests AnyDesk/TeamViewer install', 'No legitimate bank ever requires remote desktop software — this gives the fraudster full control of your device')}
                  className="bg-red-900/30 border border-red-500/30 rounded-lg p-3 cursor-pointer hover:border-red-500/60 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle size={14} className="text-red-400 mt-0.5" />
                    <p className="text-red-300 text-xs">Remote access request detected! Click to record this critical red flag.</p>
                  </div>
                </div>
                <div
                  onClick={() => handleClue('rf8-3', 'Agent asks for OTP verbally', 'Bank agents NEVER ask for OTP — OTP is a one-time password meant only for you, not to be shared with anyone')}
                  className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-3 cursor-pointer hover:border-amber-500/40 transition-colors"
                >
                  <p className="text-amber-400 text-xs">The "agent" will ask for your OTP next. Click to pre-emptively record this behavior.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === 'website' && (
          <div className="bg-white min-h-full">
            <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b border-gray-200">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <button
                onClick={() => {
                  setUrlInspected(true);
                  handleClue('rf8-4', 'Website has no HTTPS padlock', 'Site uses plain HTTP at hdfc-bank-customer-helpline.com — official bank sites always use HTTPS');
                }}
                className={`flex-1 flex items-center gap-1.5 bg-white border rounded px-3 py-1 text-xs font-mono transition-all ${
                  urlInspected ? 'border-amber-400 text-amber-600' : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                {urlInspected ? (
                  <AlertCircle size={11} className="text-amber-500" />
                ) : (
                  <Globe size={11} className="text-gray-400" />
                )}
                http://hdfc-bank-customer-helpline.com
                {urlInspected && <span className="ml-auto text-amber-500">No HTTPS!</span>}
              </button>
            </div>
            <div className="p-5">
              <div className="text-center mb-5 border-b border-gray-100 pb-5">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">HDFC</span>
                </div>
                <h2 className="text-blue-800 font-bold text-xl">HDFC Bank Customer Care</h2>
                <p className="text-gray-500 text-sm">24/7 Support | Immediate Assistance</p>
              </div>
              <div className="text-center mb-5">
                <p className="text-3xl font-bold text-green-700">📞 1800-XXX-XXXX</p>
                <p className="text-gray-500 text-sm mt-1">Call now for instant resolution</p>
              </div>
              <div
                onClick={() => handleClue('rf8-4', 'Website has no HTTPS padlock', 'http:// not https:// — fraudulent sites often skip SSL. Check the address bar for the padlock icon')}
                className="bg-red-50 border border-red-200 rounded-lg p-3 cursor-pointer hover:border-red-400 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <Shield size={14} className="text-red-500 mt-0.5" />
                  <p className="text-red-600 text-xs">Notice: Address bar shows "http://" not "https://" — no SSL certificate. Click to record this finding.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
