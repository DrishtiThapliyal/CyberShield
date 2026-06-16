import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, AlertCircle, Phone, Zap, ExternalLink, ArrowLeft, Shield } from 'lucide-react';
import { useInvestigationStore } from '../../store/investigationStore';

const CASE_ID = 9;

export default function ElectricitySMSEnvironment() {
  const { addClue } = useInvestigationStore();
  const [screen, setScreen] = useState<'sms' | 'portal'>('sms');
  const [senderInspected, setSenderInspected] = useState(false);

  const handleClue = (id: string, label: string, detail: string) => {
    addClue(CASE_ID, { id, label, detail, timestamp: Date.now() });
  };

  return (
    <div className="h-full flex flex-col bg-[#0a0a0f] rounded-xl overflow-hidden border border-slate-700/50">
      <div className="flex border-b border-slate-800">
        {(['sms', 'portal'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setScreen(t)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              screen === t ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t === 'sms' ? '📱 SMS Message' : '🌐 Payment Portal'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {screen === 'sms' && (
          <div className="bg-[#111] min-h-full p-5">
            <div className="max-w-sm mx-auto">
              {/* SMS Thread */}
              <div className="bg-[#1a1a2e] rounded-2xl overflow-hidden border border-slate-700">
                <div className="bg-[#16213e] px-4 py-3 flex items-center gap-3 border-b border-slate-700">
                  <div className="w-9 h-9 bg-red-600/30 rounded-full flex items-center justify-center">
                    <Zap size={18} className="text-red-400" />
                  </div>
                  <div className="flex-1">
                    <button
                      onClick={() => {
                        setSenderInspected(true);
                        handleClue('rf9-1', 'Sender is a 10-digit mobile number', 'Sender shows +91 8734521096 — legitimate BESCOM uses registered sender ID "BESCOM" or "KPSCL"');
                      }}
                      className={`text-left transition-all px-1 py-0.5 rounded ${senderInspected ? 'bg-amber-500/10 border border-amber-500/30' : 'hover:bg-slate-700/40'}`}
                    >
                      <p className={`text-sm font-medium ${senderInspected ? 'text-amber-400' : 'text-white'}`}>
                        +91 8734521096
                        {senderInspected && <AlertCircle size={12} className="inline ml-1.5" />}
                      </p>
                    </button>
                    <p className="text-xs text-slate-400">Tap sender to inspect</p>
                  </div>
                  <Phone size={16} className="text-slate-400" />
                </div>

                <div className="p-4 space-y-3">
                  {/* The Scam SMS */}
                  <div className="bg-[#0d1117] rounded-xl p-4 border border-slate-700">
                    <div className="flex items-start gap-2 mb-3">
                      <Zap size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-200 leading-relaxed">
                        <strong>BESCOM ALERT:</strong> Your electricity connection will be disconnected <strong>TONIGHT at 9:30 PM</strong> due to non-payment of overdue bill of ₹1,847.
                        <br /><br />
                        To avoid disconnection, pay immediately:
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setScreen('portal');
                        handleClue('rf9-2', 'Payment link domain is unofficial', 'Link goes to bescom-pay-alert.xyz not the official bescom.co.in or kptcl.com');
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Pay Now at bescom-pay-alert.xyz
                    </button>
                    <div className="mt-3 space-y-2">
                      <div
                        onClick={() => handleClue('rf9-3', 'Extreme urgency: "Tonight"', 'Electricity boards give 15-30 days written notice before disconnection — never same-day SMS threats')}
                        className="text-xs text-red-400 bg-red-900/20 rounded-lg p-2 cursor-pointer hover:bg-red-900/40 transition-colors"
                      >
                        <AlertCircle size={11} className="inline mr-1.5" />
                        "Tonight at 9:30 PM" — Tap to note: Real utilities give advance written notice
                      </div>
                      <div className="text-xs text-slate-400">
                        Helpline: <span
                          onClick={() => handleClue('rf9-4', 'Customer care number is mobile number', 'Provided helpline is a personal mobile number — BESCOM helpline is 1912 (toll-free)')}
                          className="text-amber-400 cursor-pointer hover:underline font-mono"
                        >
                          +91 9283746510
                        </span> ← Tap to inspect
                      </div>
                      <div
                        onClick={() => handleClue('rf9-5', 'No account number mentioned', 'Real BESCOM SMS always includes your specific Consumer Account Number — this has none')}
                        className="text-xs text-slate-400 cursor-pointer hover:text-amber-400 transition-colors"
                      >
                        Consumer No: <span className="text-amber-400">Not provided</span> ← Tap to note
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 text-center">Today, 7:43 PM</p>
                </div>
              </div>

              {/* Real BESCOM for comparison */}
              <div className="mt-4 bg-emerald-900/10 border border-emerald-700/30 rounded-xl p-4">
                <p className="text-emerald-400 text-xs font-semibold mb-2">For comparison — What a real BESCOM SMS looks like:</p>
                <p className="text-gray-400 text-xs font-mono leading-relaxed">
                  BESCOM: Dear Consumer (Account: 1234567890), your bill of Rs.1847 for Oct-2024 is due by 30-Nov-2024. Pay at bescom.co.in or BESCOM app. Helpline: 1912
                </p>
              </div>
            </div>
          </div>
        )}

        {screen === 'portal' && (
          <div className="bg-white min-h-full">
            <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b border-gray-200">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex items-center gap-1.5 bg-white border border-gray-300 rounded px-2 py-1 text-xs font-mono text-red-500">
                <AlertCircle size={10} />
                http://bescom-pay-alert.xyz/pay
              </div>
            </div>
            <div className="p-5">
              <div className="text-center mb-5">
                <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap size={28} className="text-white" />
                </div>
                <h2 className="text-gray-900 font-bold text-xl">BESCOM Bill Payment</h2>
                <p className="text-gray-500 text-sm">Bangalore Electricity Supply Company</p>
              </div>

              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-4 text-center">
                <p className="text-red-700 font-bold">⚡ DISCONNECTION WARNING</p>
                <p className="text-red-600 text-sm mt-1">Tonight at 9:30 PM</p>
                <p className="text-gray-700 text-lg font-bold mt-2">Amount Due: ₹1,847</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Consumer Number</label>
                  <div className="border border-gray-300 rounded-lg px-3 py-2 text-gray-400 text-sm">Enter consumer number</div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Mobile Number (for OTP)</label>
                  <div className="border border-gray-300 rounded-lg px-3 py-2 text-gray-400 text-sm">Enter mobile number</div>
                </div>
                <div
                  onClick={() => handleClue('rf9-2', 'Payment link domain is unofficial', 'bescom-pay-alert.xyz is not the official BESCOM website. Official is bescom.co.in')}
                  className="bg-red-50 border border-red-200 rounded-lg p-3 cursor-pointer hover:border-red-400 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle size={14} className="text-red-500 mt-0.5" />
                    <p className="text-red-600 text-xs">The domain bescom-pay-alert.xyz is not the official BESCOM website. Click to record this finding.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
