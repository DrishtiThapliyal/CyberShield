import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, AlertCircle, ArrowRight, CheckCircle2, Shield, Info } from 'lucide-react';
import { useInvestigationStore } from '../../store/investigationStore';

const CASE_ID = 4;

export default function UPIQREnvironment() {
  const { addClue } = useInvestigationStore();
  const [screen, setScreen] = useState<'home' | 'qr-details' | 'pin-screen'>('home');
  const [step, setStep] = useState(0);
  const [cluesFound, setCluesFound] = useState<Set<string>>(new Set());

  const handleClue = (id: string, label: string, detail: string) => {
    addClue(CASE_ID, { id, label, detail, timestamp: Date.now() });
    setCluesFound((prev) => new Set([...prev, id]));
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-b from-[#0a0a12] to-[#060b14]">
      <div className="w-80 bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
        {/* Phone Status Bar */}
        <div className="bg-blue-700 px-5 py-3 flex items-center justify-between">
          <span className="text-white text-xs font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-1.5 bg-white rounded-sm" />
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        </div>

        {/* UPI App Header */}
        <div className="bg-blue-700 px-5 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs">UPI Payments</p>
              <p className="text-white font-bold text-lg">PhonePe</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 min-h-96">
          {screen === 'home' && (
            <div className="p-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                <p className="text-gray-500 text-xs mb-1">Balance</p>
                <p className="text-gray-800 font-bold text-xl">₹28,450.00</p>
              </div>

              {/* Seller Message */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-amber-800 text-xs font-medium">Message from Buyer (Vikram)</p>
                </div>
                <p className="text-gray-700 text-sm italic">
                  "Scan this QR code I've sent to <strong>receive your ₹15,000 payment</strong>. It's faster this way."
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center mb-3">
                <p className="text-gray-500 text-xs mb-3">QR Code from Buyer</p>
                <div
                  onClick={() => {
                    setScreen('qr-details');
                    handleClue('rf4-1', 'Scanning QR sends money, not receives', 'UPI QR codes always initiate OUTGOING payments — to receive money you only share your UPI ID');
                  }}
                  className="w-32 h-32 bg-gray-100 border-2 border-gray-200 rounded-xl mx-auto flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors relative"
                >
                  <QrCode size={80} className="text-gray-600" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/5 rounded-xl transition-colors">
                    <span className="text-xs text-gray-400 opacity-0 hover:opacity-100 transition-opacity">Tap to inspect</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">Tap to inspect QR details</p>
              </div>

              <button
                onClick={() => {
                  setScreen('qr-details');
                  handleClue('rf4-1', 'Scanning QR sends money, not receives', 'UPI QR codes always initiate OUTGOING payments from the scanner — never incoming');
                }}
                className="w-full bg-blue-600 text-white rounded-xl py-3 text-sm font-semibold"
              >
                Scan & Inspect QR
              </button>
            </div>
          )}

          {screen === 'qr-details' && (
            <div className="p-4">
              <button onClick={() => setScreen('home')} className="text-blue-600 text-sm mb-4 flex items-center gap-1">
                ← Back
              </button>
              <div className="bg-white rounded-2xl p-4 shadow-sm mb-3">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">Transaction Details</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-500 text-sm">Payment To</span>
                    <span className="text-gray-800 text-sm font-medium font-mono">vikramtrades@ybl</span>
                  </div>
                  <div
                    onClick={() => handleClue('rf4-3', 'QR requests specific amount', 'QR shows exact sale price ₹15,000 — designed to make you think it\'s the payment you\'re receiving')}
                    className="flex justify-between items-center border-b border-gray-100 pb-2 cursor-pointer hover:bg-amber-50 -mx-2 px-2 rounded transition-colors"
                  >
                    <span className="text-gray-500 text-sm">Amount</span>
                    <div className="text-right">
                      <span className="text-red-500 text-sm font-bold">₹15,000.00</span>
                      <p className="text-xs text-amber-500">← Tap to inspect</p>
                    </div>
                  </div>
                  <div
                    onClick={() => handleClue('rf4-5', 'Request uses collect method', 'UPI collect request type confirmed — entering PIN will DEBIT your account, not credit it')}
                    className="flex justify-between items-center border-b border-gray-100 pb-2 cursor-pointer hover:bg-amber-50 -mx-2 px-2 rounded transition-colors"
                  >
                    <span className="text-gray-500 text-sm">Type</span>
                    <div className="text-right">
                      <span className="text-orange-500 text-sm font-mono font-medium">COLLECT REQUEST</span>
                      <p className="text-xs text-amber-500">← Tap to inspect</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Description</span>
                    <span className="text-gray-700 text-sm">"Payment for laptop"</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-3">
                <div className="flex items-start gap-2">
                  <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-red-600 text-xs">
                    <strong>WARNING:</strong> This is a COLLECT REQUEST. Entering your PIN will SEND ₹15,000 FROM your account to vikramtrades@ybl.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setScreen('pin-screen');
                  handleClue('rf4-2', 'Seller pressures urgency', 'Buyer insisted you scan immediately — urgency is a pressure tactic to prevent careful reading');
                  handleClue('rf4-4', 'No bank notification received', 'No credit alert from bank received yet — if the buyer had paid, you would see a bank credit SMS first');
                }}
                className="w-full bg-gray-200 text-gray-600 rounded-xl py-3 text-sm font-semibold"
              >
                Proceed (See what happens)
              </button>
            </div>
          )}

          {screen === 'pin-screen' && (
            <div className="p-4">
              <button onClick={() => setScreen('qr-details')} className="text-blue-600 text-sm mb-4">← Back</button>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield size={32} className="text-blue-500" />
                </div>
                <p className="text-gray-800 font-semibold">Enter UPI PIN</p>
                <p className="text-gray-400 text-xs mt-1">to PAY ₹15,000 to vikramtrades@ybl</p>
              </div>
              <div className="flex justify-center gap-3 mb-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                  </div>
                ))}
              </div>
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 text-center">
                <AlertCircle size={20} className="text-red-500 mx-auto mb-2" />
                <p className="text-red-700 font-semibold text-sm">This would debit ₹15,000 FROM you</p>
                <p className="text-red-500 text-xs mt-1">Entering your UPI PIN confirms PAYMENT, not receipt. You need a PIN only when sending money.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
