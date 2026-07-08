import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, ChevronRight, AlertCircle, Shield, ExternalLink, ArrowLeft, Lock } from 'lucide-react';
import { useInvestigationStore } from '../../store/investigationStore';

const CASE_ID = 3;

const smsMessages = [
  {
    id: 'courier',
    sender: '+91 9823456712',
    displayName: 'Courier Service',
    preview: 'Package delivery failed. Pay ₹2 to reschedule.',
    messages: [
      {
        id: 'c1',
        text: 'India Post: Your package (AWB#UNCONFIRMED) could not be delivered. A re-delivery fee of ₹2 is required. Pay now: http://indpost-delivery-fee-pay.xyz/redeliver?id=938472',
        time: '2:14 PM',
        isIncoming: true,
      },
    ],
  },
  {
    id: 'airtel',
    sender: 'AIRTEL',
    displayName: 'Airtel',
    preview: 'Your bill is due on Dec 5',
    messages: [
      { id: 'a1', text: 'Your Airtel postpaid bill of ₹999 is due on December 5. Pay at airtel.in/pay to avoid late charges.', time: '9:00 AM', isIncoming: true },
    ],
  },
  {
    id: 'hdfc',
    sender: 'HDFC-BK',
    displayName: 'HDFC Bank',
    preview: 'Your account has been credited ₹5,000',
    messages: [
      { id: 'h1', text: 'HDFC Bank: INR 5,000.00 credited to your A/C XX4821 on 04-Nov-24 by NEFT. Avl Bal: INR 28,450.00', time: '8:30 AM', isIncoming: true },
    ],
  },
];

export default function SMSCourierEnvironment() {
  const { addClue } = useInvestigationStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [paymentPageOpen, setPaymentPageOpen] = useState(false);
  const [senderInspected, setSenderInspected] = useState(false);
  const [urlInspected, setUrlInspected] = useState(false);

  const handleClue = (id: string, label: string, detail: string) => {
    addClue(CASE_ID, { id, label, detail, timestamp: Date.now() });
  };

  const selectedThread = smsMessages.find((m) => m.id === selected);

  return (
    <div className="h-full flex bg-[#0a0a0f] rounded-xl overflow-hidden border border-slate-700/50">
      {/* SMS List */}
      <div className={`${selected ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-72 border-r border-slate-800`}>
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800">
          <h2 className="text-white font-semibold">Messages</h2>
          <p className="text-xs text-slate-400 mt-0.5">3 conversations</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {smsMessages.map((thread) => (
            <div
              key={thread.id}
              onClick={() => setSelected(thread.id)}
              className={`flex items-center gap-3 px-4 py-3 border-b border-slate-800 cursor-pointer hover:bg-slate-800/40 transition-colors ${
                thread.id === 'courier' ? 'bg-slate-900/80' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                thread.id === 'courier' ? 'bg-amber-600/30' : 'bg-slate-700'
              }`}>
                {thread.id === 'courier' ? (
                  <AlertCircle size={18} className="text-amber-400" />
                ) : (
                  <MessageSquare size={18} className="text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-0.5">
                  <span className={`text-sm font-medium ${thread.id === 'courier' ? 'text-amber-300' : 'text-white'}`}>
                    {thread.displayName}
                  </span>
                  <span className="text-xs text-slate-500">Today</span>
                </div>
                <p className="text-xs text-slate-400 truncate">{thread.preview}</p>
              </div>
              <ChevronRight size={14} className="text-slate-600" />
            </div>
          ))}
        </div>
      </div>

      {/* Message View */}
      {selected && selectedThread && (
        <div className="flex-1 flex flex-col">
          <div className="bg-slate-900 px-4 py-3 flex items-center gap-3 border-b border-slate-800">
            <button onClick={() => setSelected(null)} className="md:hidden text-slate-400">
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
              <button
                onClick={() => {
                  if (selected === 'courier') {
                    setSenderInspected(true);
                    handleClue('rf3-1', 'Sender is a random number', 'Sender shows as a 10-digit mobile number (+91 9823456712) instead of a registered sender ID like INDPOST');
                  }
                }}
                className={`text-left hover:opacity-80 transition-opacity px-2 py-0.5 rounded ${
                  senderInspected && selected === 'courier' ? 'bg-amber-500/10 border border-amber-500/30' : ''
                }`}
              >
                <p className="text-white font-semibold">{selectedThread.displayName}</p>
                <p className={`text-xs font-mono ${senderInspected && selected === 'courier' ? 'text-amber-400' : 'text-slate-400'}`}>
                  {selectedThread.sender}
                  {senderInspected && selected === 'courier' && <AlertCircle size={11} className="inline ml-1.5" />}
                </p>
              </button>
            </div>
            <Phone size={18} className="text-slate-400" />
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-[#0d0d12]">
            {selectedThread.messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isIncoming ? 'justify-start' : 'justify-end'} mb-3`}>
                <div className={`max-w-xs rounded-2xl px-4 py-3 ${
                  msg.isIncoming ? 'bg-slate-800 rounded-tl-sm' : 'bg-blue-600 rounded-tr-sm'
                }`}>
                  {selected === 'courier' ? (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-200">
                        <span className="text-white font-medium">India Post: </span>
                        Your package (AWB#UNCONFIRMED) could not be delivered. A re-delivery fee of ₹2 is required. Pay now:
                      </p>
                      <button
                        onClick={() => {
                          setUrlInspected(true);
                          setPaymentPageOpen(true);
                          handleClue('rf3-2', 'Suspicious payment link domain', 'Link goes to indpost-delivery-fee-pay.xyz not the official indiapost.gov.in');
                        }}
                        className={`block text-sm font-mono px-2 py-1 rounded transition-all ${
                          urlInspected
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-700 text-blue-400 hover:bg-slate-600'
                        }`}
                      >
                        indpost-delivery-fee-pay.xyz/...
                        {urlInspected && <AlertCircle size={11} className="inline ml-1.5" />}
                      </button>
                      <div
                        onClick={() => handleClue('rf3-3', 'No tracking number provided', 'AWB shows as "UNCONFIRMED" — real delivery SMS always includes a valid tracking ID')}
                        className="cursor-pointer text-xs text-slate-400 hover:text-amber-400 transition-colors"
                      >
                        AWB#<span className="text-amber-400 font-mono">UNCONFIRMED</span> ← Click to note
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-200">{msg.text}</p>
                  )}
                  <p className="text-xs text-slate-500 mt-1 text-right">{msg.time}</p>
                </div>
              </div>
            ))}

            {/* Payment page */}
            <AnimatePresence>
              {paymentPageOpen && selected === 'courier' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 border border-slate-700 rounded-xl overflow-hidden"
                >
                  <div className="bg-slate-800 px-3 py-2 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-xs font-mono text-red-400">⚠ indpost-delivery-fee-pay.xyz</span>
                  </div>
                  <div className="bg-white p-5">
                    <div className="text-center mb-4">
                      <p className="text-gray-700 font-bold text-sm">India Post Payment Portal</p>
                      <p className="text-red-500 text-xs mt-1">Pay ₹2 Re-delivery Fee</p>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <label className="text-xs text-gray-500 block mb-0.5">Card Number</label>
                        <div className="border border-gray-300 rounded px-3 py-2 text-gray-400 text-xs">4532 •••• •••• ••••</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-gray-500 block mb-0.5">Expiry</label>
                          <div className="border border-gray-300 rounded px-3 py-2 text-gray-400 text-xs">MM/YY</div>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 block mb-0.5">CVV</label>
                          <div
                            onClick={() => handleClue('rf3-4', 'Payment page requests full card details', 'Non-bank website asking for card number, expiry, and CVV — this is credential theft for larger fraud')}
                            className="border border-gray-300 rounded px-3 py-2 text-gray-400 text-xs cursor-pointer hover:border-amber-400 transition-colors"
                          >
                            •••
                          </div>
                        </div>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded p-2">
                        <p className="text-red-600 text-xs font-medium">⚠ Do not enter real payment details — this is a phishing page.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {selected !== 'courier' && (
              <div className="text-center mt-8">
                <p className="text-slate-500 text-sm">This message appears legitimate. Focus on the suspicious courier SMS.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {!selected && (
        <div className="flex-1 hidden md:flex items-center justify-center bg-[#0a0a0f]">
          <div className="text-center">
            <MessageSquare size={40} className="text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">Select a message thread</p>
          </div>
        </div>
      )}
    </div>
  );
}
