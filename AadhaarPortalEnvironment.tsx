import React, { useState } from 'react';
import { AlertCircle, Shield, Globe, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useInvestigationStore } from '../../store/investigationStore';

const CASE_ID = 14;

export default function AadhaarPortalEnvironment() {
  const { addClue } = useInvestigationStore();
  const [screen, setScreen] = useState<'sms' | 'portal' | 'form'>('sms');
  const [otpRequested, setOtpRequested] = useState(false);

  const handleClue = (id: string, label: string, detail: string) => {
    addClue(CASE_ID, { id, label, detail, timestamp: Date.now() });
  };

  return (
    <div className="h-full flex flex-col bg-[#0d1520] rounded-xl overflow-hidden border border-slate-700/50">
      <div className="flex border-b border-slate-800">
        {(['sms', 'portal', 'form'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setScreen(t)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              screen === t ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t === 'sms' ? '📱 SMS Alert' : t === 'portal' ? '🌐 Portal' : '📝 Update Form'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {screen === 'sms' && (
          <div className="bg-[#111] min-h-full p-5">
            <div className="max-w-sm mx-auto bg-[#1a1a2e] rounded-2xl overflow-hidden border border-slate-700">
              <div className="bg-[#16213e] px-4 py-3 border-b border-slate-700">
                <button
                  onClick={() => handleClue('rf14-1', 'UIDAI website is uidai.gov.in not the linked domain', 'Real UIDAI communications come from official domains — SMS links should go to uidai.gov.in only')}
                  className="text-amber-400 text-sm font-mono hover:underline"
                >
                  +91 8273946512
                </button>
                <p className="text-slate-500 text-xs">Unknown number</p>
              </div>
              <div className="p-4">
                <div className="bg-[#0d1117] rounded-xl p-4 border border-slate-700">
                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-2xl">🪪</span>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      <strong>UIDAI ALERT:</strong> Your Aadhaar card will be <strong className="text-red-400">deactivated within 30 days</strong> due to non-compliance with updated KYC norms.
                      <br /><br />
                      Update your Aadhaar details immediately to avoid deactivation.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setScreen('portal');
                      handleClue('rf14-1', 'UIDAI website is uidai.gov.in not the linked domain', 'Link leads to aadhaar-update-online.in — not the official uidai.gov.in');
                    }}
                    className="w-full bg-blue-700 text-white rounded-lg py-2 text-sm font-medium"
                  >
                    Update at: aadhaar-update-online.in
                  </button>
                  <div
                    onClick={() => handleClue('rf14-2', 'UIDAI does not deactivate Aadhaar via SMS', 'Aadhaar cards have NO expiry date and CANNOT be deactivated via SMS notification — this threat is completely fabricated')}
                    className="mt-2 text-xs text-amber-400 bg-amber-900/20 rounded p-2 cursor-pointer hover:bg-amber-900/40 transition-colors"
                  >
                    "Deactivated in 30 days" ← Tap to note: Aadhaar has no expiry date
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-emerald-900/10 border border-emerald-700/30 rounded-xl p-4 max-w-sm mx-auto">
              <p className="text-emerald-400 text-xs font-semibold mb-2">Official UIDAI Information:</p>
              <p className="text-gray-400 text-xs">Aadhaar cards do NOT have an expiry date. UIDAI never sends deactivation threats via SMS. Update Aadhaar only at uidai.gov.in or authorized enrollment centers.</p>
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
                onClick={() => handleClue('rf14-1', 'UIDAI website is uidai.gov.in not the linked domain', 'aadhaar-update-online.in is NOT uidai.gov.in — this is a fraudulent impersonation site')}
                className="flex-1 flex items-center gap-1.5 bg-white border border-amber-300 rounded px-2 py-1 text-xs font-mono text-amber-600 hover:border-amber-500 transition-colors"
              >
                <Globe size={11} />
                http://aadhaar-update-online.in
                <span className="ml-auto text-red-500">Not UIDAI!</span>
              </button>
            </div>

            <div className="p-5">
              <div className="text-center mb-5">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl">🇮🇳</span>
                  <div>
                    <p className="font-bold text-blue-800">Unique Identification Authority of India</p>
                    <p className="text-xs text-gray-500">Government of India</p>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                  <p className="text-red-700 font-semibold text-sm">⚠ URGENT: Aadhaar Update Required</p>
                  <p className="text-red-500 text-xs mt-1">Deadline: 30 days | Card will be deactivated if not updated</p>
                </div>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => {
                    setScreen('form');
                    handleClue('rf14-3', 'Form requests OTP from mobile', 'Entering your Aadhaar number triggers a real UIDAI OTP — criminals intercept it to do real Aadhaar operations on your behalf');
                  }}
                  className="border border-gray-300 rounded-xl p-4 hover:border-blue-400 cursor-pointer transition-colors"
                >
                  <p className="text-gray-500 text-xs mb-1">Enter Aadhaar Number to begin</p>
                  <div className="flex gap-2 mb-2">
                    {[1, 2, 3].map((g) => (
                      <div key={g} className="flex-1 border border-gray-200 rounded px-2 py-1 text-center text-gray-400 text-sm">XXXX</div>
                    ))}
                  </div>
                  <p className="text-xs text-blue-600">→ Tap to proceed to update form</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === 'form' && (
          <div className="bg-white min-h-full p-5">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Aadhaar Details Update</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Aadhaar Number</label>
                <div className="border border-gray-300 rounded-lg px-3 py-2 text-gray-400 text-sm font-mono">XXXX XXXX XXXX</div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Full Name</label>
                <div className="border border-gray-300 rounded-lg px-3 py-2 text-gray-400 text-sm">As on Aadhaar</div>
              </div>
              <div
                onClick={() => {
                  setOtpRequested(true);
                  handleClue('rf14-3', 'Form requests OTP from mobile', 'Fraudsters enter your Aadhaar on real UIDAI and get OTP sent to you — they then ask you to share it, completing real authentication on their behalf');
                }}
                className="cursor-pointer"
              >
                <label className="text-xs text-gray-500 block mb-1">OTP (sent to registered mobile)</label>
                <div className="border-2 border-amber-300 rounded-lg px-3 py-2 text-gray-400 text-sm bg-amber-50">
                  Enter OTP
                </div>
                {otpRequested && (
                  <p className="text-amber-600 text-xs mt-1">This OTP was generated on real UIDAI using your Aadhaar number. Sharing it gives them authentication. Click to record.</p>
                )}
              </div>

              <div
                onClick={() => handleClue('rf14-4', 'Asks for biometric details online', 'Biometrics (fingerprint/iris) cannot be updated online — only at UIDAI authorized enrollment centers with biometric devices')}
                className="cursor-pointer"
              >
                <label className="text-xs text-gray-500 block mb-1">Biometric Update <span className="text-red-500">*</span></label>
                <div className="border-2 border-red-300 bg-red-50 rounded-lg p-3">
                  <p className="text-red-600 text-xs font-medium">Upload fingerprint image for biometric update</p>
                  <p className="text-red-400 text-xs mt-1">← Click: Biometrics cannot be updated online — only at physical centers</p>
                </div>
              </div>

              <div
                onClick={() => handleClue('rf14-5', 'Page has UIDAI logo but wrong favicon', 'Page uses UIDAI logo and colors but browser tab shows generic icon and footer reveals non-government origin')}
                className="bg-slate-50 border border-slate-200 rounded-lg p-3 cursor-pointer hover:border-amber-300 transition-colors"
              >
                <p className="text-slate-500 text-xs">Check: Browser favicon shows a generic globe icon instead of government seal — Click to record</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
