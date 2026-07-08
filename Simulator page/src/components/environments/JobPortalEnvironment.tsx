import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building2, MapPin, Globe, MessageSquare, FileText, AlertCircle, ExternalLink, ChevronRight, Calendar, Users, Star, Send } from 'lucide-react';
import { useInvestigationStore } from '../../store/investigationStore';

const CASE_ID = 5;

export default function JobPortalEnvironment() {
  const { addClue } = useInvestigationStore();
  const [tab, setTab] = useState<'listing' | 'company' | 'email' | 'chat'>('listing');
  const [domainChecked, setDomainChecked] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'me' | 'hr' }>>([
    { text: 'Congratulations on being selected! Please share your Aadhaar and PAN to proceed.', sender: 'hr' },
  ]);
  const [inputText, setInputText] = useState('');
  const [typing, setTyping] = useState(false);
  const [autoResponseIndex, setAutoResponseIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const autoResponses = [
    'Also please transfer the ₹2,500 security deposit within 24 hours to confirm your position.',
    'Yes, offer letter will be sent after deposit confirmation. This is our standard process. Please hurry, the position may be given to another candidate.',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputText, sender: 'me' }]);
    setInputText('');

    // If there are more auto-responses, show typing indicator and send next response
    if (autoResponseIndex < autoResponses.length) {
      setTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { text: autoResponses[autoResponseIndex], sender: 'hr' }]);
        setAutoResponseIndex(prev => prev + 1);
        setTyping(false);
      }, 1500 + Math.random() * 1000);
    }
  };

  const handleClue = (id: string, label: string, detail: string) => {
    addClue(CASE_ID, { id, label, detail, timestamp: Date.now() });
  };

  return (
    <div className="h-full flex flex-col bg-[#f3f2ef] rounded-xl overflow-hidden border border-slate-300">
      {/* LinkedIn-style Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-700 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">in</span>
          </div>
          <span className="text-blue-800 font-bold">LinkedIn</span>
        </div>
        <div className="flex-1 bg-gray-100 rounded px-3 py-1.5 text-gray-400 text-sm">Search</div>
        <div className="flex items-center gap-3 text-gray-500">
          <Briefcase size={20} />
          <MessageSquare size={20} />
          <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">A</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 flex">
        {[
          { id: 'listing', label: 'Job Listing' },
          { id: 'company', label: 'Company' },
          { id: 'email', label: 'Offer Email' },
          { id: 'chat', label: 'HR Chat' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === t.id
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {tab === 'listing' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 size={28} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-gray-900 font-bold text-xl">Remote Data Entry Executive</h2>
                  <p className="text-blue-700 font-medium">TechVision Global Solutions Pvt. Ltd.</p>
                  <div className="flex items-center gap-3 mt-1 text-gray-500 text-sm">
                    <span className="flex items-center gap-1"><MapPin size={13} />Work from Home</span>
                    <span className="flex items-center gap-1"><Briefcase size={13} />Full-time</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Salary', value: '₹45,000/month', highlight: true },
                  { label: 'Experience', value: 'No experience needed' },
                  { label: 'Posted', value: '2 days ago' },
                ].map((item) => (
                  <div key={item.label} className={`rounded-lg p-3 ${item.highlight ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className={`text-sm font-semibold ${item.highlight ? 'text-green-700' : 'text-gray-700'}`}>{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Job Description</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Enter data into company systems from home</li>
                  <li>• Flexible hours — work anytime</li>
                  <li>• No prior experience or qualifications required</li>
                  <li>• Earn ₹45,000 guaranteed monthly</li>
                </ul>
              </div>

              <div
                onClick={() => handleClue('rf5-4', 'Unrealistic salary offer', '₹45,000/month for no-experience data entry is 4x industry standard — a major red flag')}
                className="bg-amber-50 border border-amber-200 rounded-lg p-3 cursor-pointer hover:border-amber-400 transition-colors mb-4"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle size={14} className="text-amber-500 mt-0.5" />
                  <p className="text-amber-700 text-xs">The salary of ₹45,000 for data entry with no experience is unusual. Click to record observation.</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Required Documents</h3>
                <div
                  onClick={() => handleClue('rf5-6', 'Requests sensitive documents upfront', 'Asking for Aadhaar, PAN, and bank account details before any interview is document fraud preparation')}
                  className="space-y-1 cursor-pointer hover:bg-amber-50 -mx-2 px-2 py-2 rounded transition-colors"
                >
                  {['Aadhaar Card (front & back)', 'PAN Card', 'Bank Account Details (for salary)', 'Photograph'].map((doc) => (
                    <div key={doc} className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText size={13} className="text-gray-400" />
                      <span>{doc}</span>
                    </div>
                  ))}
                  <p className="text-xs text-amber-600 mt-1">← Tap to record: Documents requested before interview</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'company' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 size={32} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-gray-900 font-bold text-xl">TechVision Global Solutions Pvt. Ltd.</h2>
                  <div className="flex items-center gap-3 mt-1 text-gray-500 text-sm">
                    <span>IT Services</span>
                    <span>•</span>
                    <span>11-50 employees</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => {
                    setDomainChecked(true);
                    handleClue('rf5-1', 'Company domain is newly registered', 'techvision-global-jobs.in was registered only 3 weeks ago — a legitimate company would have years of history');
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-amber-50 cursor-pointer transition-colors border border-gray-100 hover:border-amber-200"
                >
                  <Globe size={16} className="text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-600">techvision-global-jobs.in</p>
                    {domainChecked && <p className="text-xs text-amber-600">Registered 3 weeks ago — Domain age: 21 days</p>}
                  </div>
                  <ExternalLink size={14} className="text-gray-400" />
                  {domainChecked && <AlertCircle size={14} className="text-amber-500" />}
                </div>

                <div
                  onClick={() => handleClue('rf5-2', 'No traceable physical address', 'Address on website returns a vacant plot on Google Maps — no real office exists')}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-amber-50 cursor-pointer transition-colors border border-gray-100 hover:border-amber-200"
                >
                  <MapPin size={16} className="text-gray-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">Plot 47, Sector 18, Noida, UP 201301</p>
                    <p className="text-xs text-gray-400">Click to check on Maps</p>
                  </div>
                  <ExternalLink size={14} className="text-gray-400" />
                </div>

                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Users size={16} className="text-gray-500" />
                    <p className="text-sm font-medium text-gray-700">LinkedIn Members</p>
                  </div>
                  <p className="text-gray-500 text-xs">No employees found associated with this company</p>
                </div>

                <div
                  onClick={() => handleClue('rf5-5', 'LinkedIn profile has no connections', 'Recruiter LinkedIn created 2 weeks ago with generic photo, 0 connections, and no work history')}
                  className="p-3 rounded-lg bg-gray-50 hover:bg-amber-50 cursor-pointer transition-colors border border-gray-100 hover:border-amber-200"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">P</div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Prashant Sharma — HR Manager</p>
                      <p className="text-xs text-amber-500">Account created 14 days ago • 0 connections</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">Click to record: Recruiter has no LinkedIn history</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'email' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="border-b border-gray-100 pb-4 mb-4">
                <h3 className="font-bold text-gray-900 text-lg">Congratulations! Job Offer — TechVision Global Solutions</h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p>From: hr@techvision-global-jobs.in</p>
                  <p>To: you@gmail.com</p>
                </div>
              </div>
              <div className="text-gray-700 text-sm space-y-3 leading-relaxed">
                <p>Dear Applicant,</p>
                <p>We are pleased to offer you the position of <strong>Remote Data Entry Executive</strong> at TechVision Global Solutions Pvt. Ltd.</p>
                <p>Salary: <strong className="text-green-700">₹45,000 per month</strong></p>
                <p>Please complete your onboarding by paying the <strong>refundable security deposit of ₹2,500</strong> to confirm your position.</p>
                <div
                  onClick={() => handleClue('rf5-3', 'Registration fee required', 'Legitimate employers NEVER charge candidates fees — ₹2,500 "security deposit" is the scam itself')}
                  className="bg-red-50 border border-red-200 rounded-lg p-3 cursor-pointer hover:border-red-400 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle size={14} className="text-red-500 mt-0.5" />
                    <div>
                      <p className="text-red-600 font-medium">Pay ₹2,500 security deposit</p>
                      <p className="text-red-400 text-xs mt-0.5">UPI: techvisionhr@ybl</p>
                      <p className="text-xs text-red-400 mt-1">Click to record: This fee demand is the actual fraud</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-xs italic">This amount will be fully refunded after 3 months of successful employment.</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'chat' && (
          <div className="max-w-2xl flex flex-col h-full">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full">
              <div className="bg-blue-700 px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">P</div>
                <div>
                  <p className="text-white font-medium text-sm">Prashant Sharma</p>
                  <p className="text-blue-200 text-xs">HR Manager, TechVision</p>
                </div>
              </div>
              <div className="flex-1 p-4 space-y-3 bg-gray-50 overflow-y-auto">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs rounded-xl px-3 py-2 text-sm ${
                      msg.sender === 'me' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-xl px-3 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="border-t border-gray-200 p-3 bg-white flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || typing}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg p-2 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
