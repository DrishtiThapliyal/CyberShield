import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, ArrowRight, Shield, Phone, MessageSquare } from 'lucide-react';
import { useInvestigationStore } from '../../store/investigationStore';

const CASE_ID = 12;

export default function UPICollectEnvironment() {
  const { addClue } = useInvestigationStore();
  const [screen, setScreen] = useState<'home' | 'collect' | 'pin' | 'chat'>('home');

  const handleClue = (id: string, label: string, detail: string) => {
    addClue(CASE_ID, { id, label, detail, timestamp: Date.now() });
  };

  return (
    <div className="h-full flex items-center justify-center bg-[#060b14]">
      <div className="w-80 bg-white rounded-3xl overflow-hidden shadow-2xl">
        {/* Status bar */}
        <div className="bg-[#3a1f8c] px-5 py-3 flex items-center justify-between">
          <span className="text-white text-xs">10:24</span>
          <div className="flex gap-1">
            <div className="w-3 h-1.5 bg-white rounded-sm" />
          </div>
        </div>
        <div className="bg-[#3a1f8c] px-5 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">G</span>
            </div>
            <span className="text-white font-bold text-lg">GPay</span>
          </div>
        </div>

        <div className="bg-gray-50 min-h-96">
          {screen === 'home' && (
            <div className="p-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                <p className="text-gray-400 text-xs mb-0.5">Balance</p>
                <p className="text-gray-900 font-bold text-xl">₹35,200.00</p>
              </div>

              {/* Buyer Chat Preview */}
              <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare size={16} className="text-blue-500" />
                  <span className="text-sm font-semibold text-gray-800">Buyer Message (Sanjay)</span>
                </div>
                <p className="text-gray-600 text-sm italic leading-relaxed">
                  "Bhai, I have sent a GPay collect request for ₹25,000. <strong className="text-gray-900">Approve it to receive your payment.</strong> Check your pending requests!"
                </p>
              </div>

              {/* Pending Request Alert */}
              <div
                onClick={() => {
                  setScreen('collect');
                  handleClue('rf12-1', 'Collect request debits your account', 'A UPI collect request ALWAYS takes money FROM you when approved — it never sends money TO you');
                }}
                className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-4 cursor-pointer hover:border-amber-400 transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span className="text-purple-700 text-sm font-semibold">1 Pending Request</span>
                </div>
                <p className="text-gray-600 text-xs">Tap to view incoming collect request</p>
              </div>
            </div>
          )}

          {screen === 'collect' && (
            <div className="p-4">
              <button onClick={() => setScreen('home')} className="text-purple-600 text-sm mb-4 flex items-center gap-1">← Back</button>
              <div className="bg-white rounded-2xl p-4 shadow-sm mb-3">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-3">Collect Request Details</p>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500 text-sm">From</span>
                    <span className="text-gray-700 text-sm font-mono">sanjaybuyer22@oksbi</span>
                  </div>
                  <div
                    onClick={() => handleClue('rf12-4', 'Amount matches sale price exactly', 'Matching exact sale price ₹25,000 is deliberate — designed to make you think it\'s the expected payment')}
                    className="flex justify-between border-b border-gray-100 pb-2 cursor-pointer hover:bg-amber-50 -mx-2 px-2 rounded transition-colors"
                  >
                    <span className="text-gray-500 text-sm">Amount</span>
                    <div className="text-right">
                      <span className="text-red-600 font-bold text-lg">₹25,000</span>
                      <p className="text-xs text-amber-500">← Matches your sale price</p>
                    </div>
                  </div>
                  <div
                    onClick={() => handleClue('rf12-3', 'Note says "receive" but action is "pay"', 'The "note" or description is just text — it can say anything. The transaction TYPE determines money flow')}
                    className="flex justify-between border-b border-gray-100 pb-2 cursor-pointer hover:bg-amber-50 -mx-2 px-2 rounded transition-colors"
                  >
                    <span className="text-gray-500 text-sm">Note</span>
                    <div className="text-right">
                      <span className="text-gray-700 text-sm">"Payment for laptop"</span>
                      <p className="text-xs text-amber-500">← Just a label, not the actual action</p>
                    </div>
                  </div>
                  <div
                    onClick={() => handleClue('rf12-1', 'Collect request debits your account', 'COLLECT REQUEST type means: the initiator is requesting YOU to send them money')}
                    className="flex justify-between cursor-pointer hover:bg-amber-50 -mx-2 px-2 py-1 rounded transition-colors"
                  >
                    <span className="text-gray-500 text-sm">Type</span>
                    <div className="text-right">
                      <span className="text-orange-600 font-semibold text-sm">COLLECT REQUEST</span>
                      <p className="text-xs text-red-500">← You will SEND this money</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-3">
                <div className="flex items-start gap-2">
                  <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-red-600 text-xs">
                    <strong>IMPORTANT:</strong> Approving this will DEBIT ₹25,000 from your account and CREDIT it to sanjaybuyer22@oksbi. This is NOT receiving money.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setScreen('pin');
                  handleClue('rf12-2', 'PIN required means money leaves your account', 'You NEVER need a UPI PIN to receive money. PIN is only required when you are SENDING money');
                  handleClue('rf12-5', 'Buyer pressures quick approval', '"Please approve fast, I am waiting" is a pressure tactic to prevent you from reading the transaction details');
                }}
                className="w-full bg-purple-600 text-white rounded-xl py-3 text-sm font-semibold"
              >
                Approve Request
              </button>
            </div>
          )}

          {screen === 'pin' && (
            <div className="p-4">
              <button onClick={() => setScreen('collect')} className="text-purple-600 text-sm mb-4">← Back</button>
              <div className="text-center mb-6">
                <Shield size={32} className="text-purple-500 mx-auto mb-2" />
                <p className="text-gray-800 font-semibold">Enter UPI PIN</p>
                <p className="text-gray-400 text-xs mt-1">to SEND ₹25,000 to sanjaybuyer22@oksbi</p>
              </div>
              <div className="flex justify-center gap-3 mb-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-purple-300 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-purple-300" />
                  </div>
                ))}
              </div>
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 text-center">
                <AlertCircle size={20} className="text-red-500 mx-auto mb-2" />
                <p className="text-red-700 font-semibold text-sm">This sends ₹25,000 FROM your account</p>
                <p className="text-red-500 text-xs mt-1">Entering your UPI PIN on a Collect Request means YOU are paying THEM — not the other way around.</p>
              </div>
            </div>
          )}

          {screen === 'chat' && (
            <div className="p-4">
              <div className="space-y-3">
                {[
                  { text: 'I want to buy the laptop for ₹25,000', me: false },
                  { text: 'I have sent GPay collect request. Approve to receive money 😊', me: false },
                  { text: 'Can you just transfer directly to my UPI?', me: true },
                  { text: 'Please approve fast, I am waiting for confirmation. This is faster method', me: false },
                ].map((msg, i) => (
                  <div key={i} className={`flex ${msg.me ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs rounded-xl px-3 py-2 text-sm ${msg.me ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Nav */}
        <div className="bg-white border-t border-gray-200 px-4 py-3 flex justify-around">
          {[
            { icon: '🏠', label: 'Home', s: 'home' },
            { icon: '💬', label: 'Chat', s: 'chat' },
            { icon: '📊', label: 'History' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => item.s && setScreen(item.s as any)}
              className="flex flex-col items-center gap-0.5"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs text-gray-500">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
