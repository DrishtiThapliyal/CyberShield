import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Inbox, Star, Trash2, Search, Settings, ChevronDown,
  ExternalLink, AlertCircle, Mail, RefreshCw, MoreVertical,
  ArrowLeft, Shield,
} from 'lucide-react';
import { useInvestigationStore } from '../../store/investigationStore';

const CASE_ID = 1;

interface Email {
  id: string; from: string; fromAddress: string; subject: string; preview: string; time: string; isUnread: boolean; isUrgent?: boolean;
}

const emails: Email[] = [
  { id: 'kyc', from: 'SBI Bank Alert', fromAddress: 'alert@sbibank-kyc-alert.net', subject: 'URGENT: KYC Verification Required — Account Suspension in 24 Hours', preview: 'Dear Customer, Your SBI account requires immediate KYC update...', time: '10:42 AM', isUnread: true, isUrgent: true },
  { id: 'amazon', from: 'Amazon', fromAddress: 'shipment-tracking@amazon.in', subject: 'Your order has been shipped', preview: 'Your order #403-9182736 is on its way and will arrive by Friday...', time: '9:15 AM', isUnread: false },
  { id: 'electricity', from: 'BESCOM', fromAddress: 'noreply@bescom.co.in', subject: 'Electricity Bill - November 2024', preview: 'Your electricity bill for November is ₹1,847. Due date: Dec 5, 2024...', time: 'Yesterday', isUnread: false },
  { id: 'bank-stmt', from: 'HDFC Bank', fromAddress: 'statements@hdfcbank.com', subject: 'Your Monthly Account Statement - October 2024', preview: 'Please find attached your savings account statement for October 2024...', time: '2 days ago', isUnread: false },
];

const KYCEmailBody = ({ onClueFound }: { onClueFound: (id: string, label: string, detail: string) => void }) => {
  const [hoveredLink, setHoveredLink] = useState(false);
  const [senderInspected, setSenderInspected] = useState(false);
  const [linkInspected, setLinkInspected] = useState(false);
  const [websiteOpened, setWebsiteOpened] = useState(false);
  const [certChecked, setCertChecked] = useState(false);
  const [accountNo, setAccountNo] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="p-6 text-sm leading-relaxed">
      <div className="mb-5 pb-5 border-b border-gray-700">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-white font-semibold text-base">URGENT: KYC Verification Required</h3>
          <span className="text-xs text-gray-400">Mon, 4 Nov 2024, 10:42 AM</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs w-12">From:</span>
            <button onClick={() => { setSenderInspected(true); onClueFound('rf1-1', 'Suspicious sender domain', 'Sender uses sbibank-kyc-alert.net instead of the official sbi.co.in domain'); }}
              className={`text-sm font-mono transition-all px-2 py-0.5 rounded ${senderInspected ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 cursor-pointer'}`}>
              alert@sbibank-kyc-alert.net {senderInspected && <AlertCircle size={12} className="inline ml-1.5" />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs w-12">To:</span>
            <span className="text-gray-300 text-sm">you@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 text-gray-300">
        <p onClick={() => onClueFound('rf1-4', 'Generic salutation', 'Email says "Dear Customer" — SBI would use your registered name')} className="cursor-pointer hover:text-amber-300 transition-colors">Dear Customer,</p>
        <p>We have noticed that your <strong className="text-white">State Bank of India</strong> account KYC details are <span className="text-red-400 font-medium">incomplete and require immediate update</span>. Failure to update your KYC within <strong className="text-white"
          onClick={() => onClueFound('rf1-3', 'Urgency / threat language', 'Email threatens account suspension within 24 hours to create panic')}>24 hours</strong> will result in temporary suspension of all banking services including UPI, NEFT, and debit card transactions.</p>

        <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-red-400 mt-0.5 flex-shrink-0" size={18} />
            <div>
              <p className="text-red-300 font-medium mb-1">IMMEDIATE ACTION REQUIRED</p>
              <p className="text-gray-300 text-sm">Click the button below to update your KYC and prevent account suspension:</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-2">
          <div className="relative">
            <button onMouseEnter={() => setHoveredLink(true)} onMouseLeave={() => setHoveredLink(false)}
              onClick={() => { setLinkInspected(true); setWebsiteOpened(true); onClueFound('rf1-2', 'Phishing URL in link', 'Hovering reveals https://sbi-verify-kyc-secure.net — not sbi.co.in'); }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2">
              Update KYC Now <ExternalLink size={14} />
            </button>
            <AnimatePresence>
              {hoveredLink && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="absolute -bottom-8 left-0 bg-gray-900 border border-amber-500/50 rounded px-2 py-1 text-xs font-mono text-amber-400 whitespace-nowrap z-10">
                  https://sbi-verify-kyc-secure.net
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {linkInspected && websiteOpened && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 border border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-yellow-500/60" /><div className="w-3 h-3 rounded-full bg-green-500/60" /></div>
              <button onClick={() => { setCertChecked(true); onClueFound('rf1-5', 'SSL but fake domain', 'Site has HTTPS padlock but domain sbi-verify-kyc-secure.net is not official SBI'); }}
                className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded transition-all ${certChecked ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-slate-700 text-slate-300 hover:bg-slate-600 cursor-pointer'}`}>
                <Shield size={11} />https://sbi-verify-kyc-secure.net {certChecked && <AlertCircle size={11} className="text-amber-400 ml-1" />}
              </button>
            </div>
            <div className="bg-[#1a2744] p-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center"><span className="text-white font-bold text-sm">SBI</span></div>
                <div><p className="text-white font-bold">State Bank of India</p><p className="text-blue-300 text-xs">Secure KYC Update Portal</p></div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Account Number</label>
                  <input type="text" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} placeholder="Enter your account number"
                    className="w-full bg-[#0f1a2e] border border-slate-600 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:border-indigo-500/50 transition-colors" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Net Banking Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"
                    className="w-full bg-[#0f1a2e] border border-slate-600 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:border-indigo-500/50 transition-colors" />
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                  <p className="text-amber-400 text-xs font-medium">DO NOT enter real credentials on this website — it is a phishing page designed to steal your banking details.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <p className="text-gray-400 text-xs mt-4">If you believe you received this email by mistake, please ignore it. For assistance, contact our helpdesk at 1800-425-3800.</p>
        <div className="border-t border-gray-700 pt-4 mt-4">
          <p className="text-gray-400 text-xs">Regards,</p>
          <p className="text-white text-sm font-medium">SBI Customer Care Team</p>
          <p className="text-gray-500 text-xs">State Bank of India | Corporate Centre, Mumbai</p>
        </div>
      </div>
    </div>
  );
};

export default function GmailEnvironment() {
  const { addClue } = useInvestigationStore();
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const handleClue = (id: string, label: string, detail: string) => addClue(CASE_ID, { id, label, detail, timestamp: Date.now() });
  const openEmail = emails.find((e) => e.id === selectedEmail);

  return (
    <div className="h-full flex flex-col bg-[#111827] rounded-xl overflow-hidden border border-slate-700/50">
      <div className="flex items-center gap-4 px-4 py-3 bg-[#1f2937] border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full" style={{ background: 'linear-gradient(135deg, #ea4335, #fbbc04, #34a853, #4285f4)' }} />
          <span className="text-white font-bold text-lg">Gmail</span>
        </div>
        <div className="flex-1 max-w-lg"><div className="flex items-center gap-2 bg-[#374151] rounded-full px-4 py-2"><Search size={15} className="text-gray-400" /><span className="text-gray-400 text-sm">Search mail</span></div></div>
        <div className="flex items-center gap-3 ml-auto"><RefreshCw size={16} className="text-gray-400" /><Settings size={16} className="text-gray-400" /><div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"><span className="text-white text-xs font-bold">R</span></div></div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-44 bg-[#1f2937] border-r border-slate-700 p-2 flex-shrink-0">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 px-4 text-sm font-medium mb-4 flex items-center gap-2"><span className="text-xl leading-none">+</span> Compose</button>
          {[
            { icon: <Inbox size={14} />, label: 'Inbox', count: 1 },
            { icon: <Star size={14} />, label: 'Starred' },
            { icon: <Trash2 size={14} />, label: 'Trash' },
          ].map((item) => (
            <div key={item.label} className={`flex items-center gap-3 px-3 py-2 rounded-full text-sm cursor-pointer hover:bg-slate-700/50 transition-colors ${item.label === 'Inbox' ? 'bg-slate-700/60 text-white font-medium' : 'text-gray-400'}`}>
              {item.icon}<span>{item.label}</span>
              {item.count && <span className="ml-auto text-xs bg-blue-500 text-white rounded-full px-1.5">{item.count}</span>}
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {!selectedEmail ? (
            <>
              <div className="flex items-center gap-3 px-4 py-2 border-b border-slate-700 bg-[#1f2937]"><input type="checkbox" className="rounded" /><RefreshCw size={14} className="text-gray-400" /><MoreVertical size={14} className="text-gray-400" /></div>
              <div className="flex-1 overflow-y-auto">
                {emails.map((email) => (
                  <div key={email.id} onClick={() => setSelectedEmail(email.id)}
                    className={`flex items-center gap-3 px-4 py-3 border-b border-slate-700/50 cursor-pointer transition-colors hover:bg-slate-800/50 ${email.isUnread ? 'bg-[#1a2333]' : 'bg-transparent'}`}>
                    <input type="checkbox" className="rounded flex-shrink-0" onClick={(e) => e.stopPropagation()} />
                    <Star size={14} className="text-gray-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-sm w-36 truncate flex-shrink-0 ${email.isUnread ? 'text-white font-semibold' : 'text-gray-300'}`}>{email.from}</span>
                        {email.isUrgent && <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 rounded px-1.5 flex-shrink-0">URGENT</span>}
                        <span className={`text-sm truncate ${email.isUnread ? 'text-gray-200' : 'text-gray-400'}`}>{email.subject}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{email.preview}</p>
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0">{email.time}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto bg-[#111827]">
              <div className="flex items-center gap-3 px-4 py-2 border-b border-slate-700 bg-[#1f2937] sticky top-0">
                <button onClick={() => setSelectedEmail(null)} className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm"><ArrowLeft size={16} /><span>Back</span></button>
              </div>
              {openEmail?.id === 'kyc' && <KYCEmailBody onClueFound={handleClue} />}
              {openEmail?.id === 'amazon' && (
                <div className="p-6 text-sm text-gray-300 leading-relaxed">
                  <div className="mb-4 pb-4 border-b border-gray-700"><h3 className="text-white font-semibold mb-1">Your order has been shipped</h3><p className="text-xs text-gray-400">From: shipment-tracking@amazon.in | Today, 9:15 AM</p></div>
                  <p>Hi there,</p><p className="mt-3">Your order #403-9182736 is on its way! It was shipped via BlueDart and is expected to arrive by Friday, November 8.</p><p className="mt-3">You can track your package at any time from your Orders page on Amazon.in.</p><p className="mt-3">Thank you for shopping with us!</p><p className="mt-4 text-gray-400 text-xs">— The Amazon Delivery Team</p>
                </div>
              )}
              {openEmail?.id === 'electricity' && (
                <div className="p-6 text-sm text-gray-300 leading-relaxed">
                  <div className="mb-4 pb-4 border-b border-gray-700"><h3 className="text-white font-semibold mb-1">Electricity Bill - November 2024</h3><p className="text-xs text-gray-400">From: noreply@bescom.co.in | Yesterday</p></div>
                  <p>Dear Consumer,</p><p className="mt-3">Your electricity bill for November 2024 is <strong className="text-white">₹1,847.00</strong>. The due date for payment is December 5, 2024.</p><p className="mt-3">Consumer Account Number: <span className="font-mono">1234-5678-9012</span></p><p className="mt-3">Please pay online at bescom.co.in or through the BESCOM mobile app.</p><p className="mt-3">Helpline: 1912 (Toll Free)</p><p className="mt-4 text-gray-400 text-xs">— Bangalore Electricity Supply Company Limited</p>
                </div>
              )}
              {openEmail?.id === 'bank-stmt' && (
                <div className="p-6 text-sm text-gray-300 leading-relaxed">
                  <div className="mb-4 pb-4 border-b border-gray-700"><h3 className="text-white font-semibold mb-1">Your Monthly Account Statement - October 2024</h3><p className="text-xs text-gray-400">From: statements@hdfcbank.com | 2 days ago</p></div>
                  <p>Dear Customer,</p><p className="mt-3">Please find attached your savings account statement for the period October 1-31, 2024.</p><p className="mt-3">Account: XX4821 | Opening Balance: ₹23,450.00 | Closing Balance: ₹28,450.00</p><p className="mt-3">If you notice any unauthorized transactions, please call our 24x7 helpline at 1800-202-6161 immediately.</p><p className="mt-4 text-gray-400 text-xs">— HDFC Bank Customer Service</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
