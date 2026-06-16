import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ExternalLink, CheckCircle2, Shield, Globe, BookOpen, FileText } from 'lucide-react';
import { useInvestigationStore } from '../../store/investigationStore';

const CASE_ID = 13;

export default function ScholarshipPortalEnvironment() {
  const { addClue } = useInvestigationStore();
  const [screen, setScreen] = useState<'email' | 'portal' | 'form'>('email');
  const [schemeVerified, setSchemeVerified] = useState(false);

  const handleClue = (id: string, label: string, detail: string) => {
    addClue(CASE_ID, { id, label, detail, timestamp: Date.now() });
  };

  return (
    <div className="h-full flex flex-col bg-[#0d1520] rounded-xl overflow-hidden border border-slate-700/50">
      <div className="flex border-b border-slate-800">
        {([
          { id: 'email', label: '📧 Email Received' },
          { id: 'portal', label: '🌐 Scholarship Portal' },
          { id: 'form', label: '📝 Application Form' },
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
        {screen === 'email' && (
          <div className="bg-white min-h-full p-5">
            <div className="border-b border-gray-100 pb-4 mb-4">
              <h3 className="font-bold text-gray-900 text-lg">Congratulations! PM Digital Youth Scholarship 2024</h3>
              <div className="mt-2 text-sm space-y-0.5">
                <p className="text-gray-500">From: <span className="text-blue-600">scholarships@pmdigitalyouth-apply.com</span></p>
                <p className="text-gray-500">To: student@gmail.com</p>
              </div>
            </div>
            <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded p-3">
                <span className="text-2xl">🇮🇳</span>
                <div>
                  <p className="font-bold">Government of India — Ministry of Education</p>
                  <p className="text-xs text-gray-500">PM Digital Youth Scholarship Programme 2024</p>
                </div>
              </div>
              <p>Dear Student,</p>
              <p>
                Based on your academic records, you have been <strong>pre-selected</strong> for the
                <strong> PM Digital Youth Scholarship 2024</strong> worth ₹75,000 per year.
              </p>
              <p>
                To complete your application and receive your scholarship disbursement, please visit our portal and submit your details including bank account information.
              </p>
              <button
                onClick={() => setScreen('portal')}
                className="bg-orange-500 text-white px-4 py-2 rounded font-medium text-sm flex items-center gap-2"
              >
                Apply Now
                <ExternalLink size={14} />
              </button>
              <div
                onClick={() => {
                  setSchemeVerified(true);
                  handleClue('rf13-4', 'Scheme name does not exist', '"PM Digital Youth Scholarship 2024" does not appear on scholarships.gov.in — the official NSP portal');
                }}
                className="bg-amber-50 border border-amber-200 rounded p-2 cursor-pointer hover:border-amber-400 transition-colors"
              >
                <p className="text-amber-700 text-xs">Click to verify scheme on scholarships.gov.in</p>
                {schemeVerified && <p className="text-red-500 text-xs mt-1">Not found on official NSP portal</p>}
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
              <button
                onClick={() => handleClue('rf13-1', 'Portal domain is not gov.in', 'URL is scholarship-india-apply.com not the official scholarships.gov.in — .com domain is not a government site')}
                className="flex-1 flex items-center gap-1.5 bg-white border border-amber-300 rounded px-2 py-1 text-xs font-mono text-amber-600 hover:border-amber-500 transition-colors"
              >
                <Globe size={11} />
                scholarship-india-apply.com/pm-digital-2024
                <AlertCircle size={10} className="ml-auto" />
              </button>
            </div>
            <div className="p-5">
              <div className="text-center mb-5">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-3xl">🇮🇳</span>
                  <div>
                    <p className="font-bold text-gray-900">Government of India</p>
                    <p className="text-xs text-gray-500">Ministry of Education — Scholarship Portal</p>
                  </div>
                </div>
                <h2 className="text-orange-600 font-bold text-xl">PM Digital Youth Scholarship 2024</h2>
                <p className="text-gray-500 text-sm">Last date to apply: <span className="text-red-500 font-medium">December 15, 2024</span></p>
              </div>

              <div className="space-y-3 mb-4">
                <div
                  onClick={() => handleClue('rf13-2', 'Registration fee for a scholarship', 'No legitimate government scholarship ever charges an application fee — ₹200 fee is the actual fraud')}
                  className="bg-red-50 border border-red-300 rounded-xl p-4 cursor-pointer hover:border-red-500 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle size={16} className="text-red-500" />
                    <p className="text-red-700 font-semibold">Application Processing Fee: ₹200</p>
                  </div>
                  <p className="text-red-500 text-xs">Pay via UPI/Debit Card before submitting. Non-refundable.</p>
                  <p className="text-red-400 text-xs mt-1">← Click to record: Legitimate scholarships are always FREE to apply</p>
                </div>

                <div
                  onClick={() => handleClue('rf13-5', 'Grammar and spelling errors', 'Multiple grammatical errors on what claims to be a Government of India portal — official portals are error-free')}
                  className="bg-amber-50 border border-amber-200 rounded-xl p-3 cursor-pointer hover:border-amber-400 transition-colors"
                >
                  <p className="text-gray-600 text-sm italic">
                    "This portal is providing opportunities to deserving students in all part of India to get benefited from this scholarship. Please to fill all details correctly for eligibilities check."
                  </p>
                  <p className="text-amber-600 text-xs mt-1">← Multiple grammar errors — Click to record</p>
                </div>
              </div>

              <button
                onClick={() => setScreen('form')}
                className="w-full bg-orange-500 text-white rounded-xl py-3 font-bold text-sm"
              >
                Fill Application Form
              </button>
            </div>
          </div>
        )}

        {screen === 'form' && (
          <div className="bg-white min-h-full p-5">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Scholarship Application Form</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Full Name</label>
                <div className="border border-gray-300 rounded-lg px-3 py-2 text-gray-400 text-sm">Enter full name</div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Aadhaar Number</label>
                <div className="border border-gray-300 rounded-lg px-3 py-2 text-gray-400 text-sm">XXXX-XXXX-XXXX</div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Bank Account Number</label>
                <div className="border border-gray-300 rounded-lg px-3 py-2 text-gray-400 text-sm">For scholarship disbursement</div>
              </div>
              <div
                onClick={() => handleClue('rf13-3', 'Requests full bank account credentials', 'Scholarship disbursement needs only account number and IFSC — never internet banking passwords')}
                className="cursor-pointer"
              >
                <label className="text-xs text-gray-500 block mb-1">Internet Banking Password <span className="text-red-500">*Required</span></label>
                <div className="border-2 border-red-300 rounded-lg px-3 py-2 text-gray-400 text-sm bg-red-50">
                  ••••••••
                </div>
                <p className="text-red-500 text-xs mt-1">← This field should never exist. Click to record.</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <AlertCircle size={14} className="text-red-500 inline mr-1.5" />
                <span className="text-red-600 text-xs font-medium">No legitimate portal ever asks for your internet banking password</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
