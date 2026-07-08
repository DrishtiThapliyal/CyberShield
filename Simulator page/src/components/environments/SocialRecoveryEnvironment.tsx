import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, Search, Star, ExternalLink, MessageSquare, Lock, Shield, Send } from 'lucide-react';
import { useInvestigationStore } from '../../store/investigationStore';

const CASE_ID = 15;

const fakeReviews = [
  { name: 'Neeraj S.', rating: 5, text: 'Got my account back in 2 hours! 100% genuine service.', date: '2 days ago' },
  { name: 'Pooja M.', rating: 5, text: 'Very fast and professional. Highly recommend!', date: '2 days ago' },
  { name: 'Vijay K.', rating: 5, text: 'Trusted service. Money well spent.', date: '2 days ago' },
  { name: 'Ananya R.', rating: 5, text: 'Recovered account in 1 hour. Amazing!', date: '1 day ago' },
];

export default function SocialRecoveryEnvironment() {
  const { addClue } = useInvestigationStore();
  const [screen, setScreen] = useState<'google' | 'service' | 'chat'>('google');
  const [reviewsInspected, setReviewsInspected] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<Array<{ text: string; me: boolean }>>([
    { text: 'Hello! I can help recover your Instagram account. Please share your account username and current password to begin.', me: false },
  ]);
  const [inputText, setInputText] = useState('');
  const [typing, setTyping] = useState(false);
  const [autoResponseIndex, setAutoResponseIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const autoResponses = [
    'Don\'t worry, it\'s completely safe. We use it only to verify ownership. Your privacy is guaranteed.',
    'Also please pay ₹1,500 advance to our UPI: recoverpro@paytm to start the process. 100% guaranteed results!',
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
    setMessages(prev => [...prev, { text: inputText, me: true }]);
    setInputText('');

    // If there are more auto-responses, show typing indicator and send next response
    if (autoResponseIndex < autoResponses.length) {
      setTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { text: autoResponses[autoResponseIndex], me: false }]);
        setAutoResponseIndex(prev => prev + 1);
        setTyping(false);
      }, 1500 + Math.random() * 1000);
    }
  };

  const handleClue = (id: string, label: string, detail: string) => {
    addClue(CASE_ID, { id, label, detail, timestamp: Date.now() });
  };

  return (
    <div className="h-full flex flex-col bg-[#0d1520] rounded-xl overflow-hidden border border-slate-700/50">
      <div className="flex border-b border-slate-800">
        {([
          { id: 'google', label: '🔍 Search Results' },
          { id: 'service', label: '🌐 Recovery Service' },
          { id: 'chat', label: '💬 Support Chat' },
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
              <div className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
                <span className="text-gray-700 text-sm">how to recover hacked instagram account service</span>
              </div>
            </div>
            <div className="space-y-5">
              <div
                onClick={() => {
                  setScreen('service');
                  handleClue('rf15-1', 'No official platform offers third-party recovery', 'Instagram account recovery is only through instagram.com/hacked — no legitimate third-party service exists');
                }}
                className="cursor-pointer bg-amber-50 border border-amber-200 rounded-xl p-3 hover:border-amber-400 transition-colors"
              >
                <span className="text-xs text-gray-500 border border-gray-300 rounded px-1 py-0.5 mr-1">Ad</span>
                <div className="mt-1 flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-gray-200 rounded-sm" />
                  <span className="text-xs font-mono text-amber-600">insta-account-recovery-pro.com</span>
                  <AlertCircle size={11} className="text-amber-500" />
                </div>
                <p className="text-lg text-blue-700 hover:underline">Instagram Account Recovery — 1 Hour Guaranteed</p>
                <p className="text-sm text-gray-600">Professional account recovery experts. 100% success rate. WhatsApp support available 24/7.</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-4 h-4 bg-pink-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">I</span>
                  </div>
                  <span className="text-xs font-mono text-gray-500">instagram.com › hacked</span>
                </div>
                <p className="text-lg text-blue-700">My Instagram account was hacked — Instagram Help</p>
                <p className="text-sm text-gray-600">If you think your Instagram account has been hacked, we can help you secure it. Go to instagram.com/hacked to start the process.</p>
              </div>
            </div>
          </div>
        )}

        {screen === 'service' && (
          <div className="bg-white min-h-full">
            <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b border-gray-200">
              <button
                onClick={() => handleClue('rf15-1', 'No official platform offers third-party recovery', 'This is a third-party service — Instagram only supports recovery through instagram.com/hacked')}
                className="flex-1 flex items-center gap-1.5 bg-white border border-amber-300 rounded px-2 py-1 text-xs font-mono text-amber-600 hover:border-amber-500 transition-colors"
              >
                <Lock size={11} />
                https://insta-account-recovery-pro.com
              </button>
            </div>
            <div className="p-5">
              <div className="text-center mb-5">
                <div className="text-4xl mb-2">🔓</div>
                <h2 className="text-gray-900 font-bold text-2xl">InstaPro Recovery</h2>
                <p className="text-pink-500 font-medium">Account Recovery Experts</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-gray-500 text-sm ml-1">(4.9 — 847 reviews)</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: '1 Hour', sub: 'Average recovery' },
                  { label: '100%', sub: 'Success rate' },
                  { label: '₹1,500', sub: 'One-time fee' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-pink-50 rounded-xl p-3 text-center">
                    <p className="text-pink-600 font-bold text-lg">{stat.label}</p>
                    <p className="text-gray-500 text-xs">{stat.sub}</p>
                  </div>
                ))}
              </div>

              <div
                onClick={() => {
                  setScreen('chat');
                  handleClue('rf15-2', 'Service asks for your current password', 'Asking for your current password gives them complete account access — recovery services never need this');
                }}
                className="bg-pink-500 text-white rounded-xl py-3 text-center font-bold cursor-pointer hover:bg-pink-600 transition-colors mb-4"
              >
                Start Recovery — Contact on WhatsApp
              </div>

              <div
                onClick={() => handleClue('rf15-3', 'Upfront payment for guaranteed recovery', '₹1,500 upfront with "100% guaranteed" — no legitimate service guarantees recovery or charges upfront')}
                className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 cursor-pointer hover:border-amber-400 transition-colors"
              >
                <AlertCircle size={14} className="text-amber-500 inline mr-1.5" />
                <span className="text-amber-700 text-sm">₹1,500 advance payment required — Click to record</span>
              </div>

              {/* Reviews */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">Customer Reviews</h3>
                  <button
                    onClick={() => {
                      setReviewsInspected(true);
                      handleClue('rf15-5', 'Reviews are all 5-star with one-line text', 'All 4 reviews were posted within 2 days, contain only 1 sentence, and have identical rating — clearly fabricated');
                    }}
                    className="text-blue-500 text-xs hover:underline"
                  >
                    Inspect reviews
                  </button>
                </div>
                <div className="space-y-2">
                  {fakeReviews.map((review, i) => (
                    <div key={i} className={`bg-gray-50 rounded-lg p-3 ${reviewsInspected ? 'border border-amber-300' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                          {review.name[0]}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{review.name}</span>
                        <div className="flex">
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <Star key={j} size={11} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <span className="ml-auto text-xs text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{review.text}</p>
                      {reviewsInspected && <p className="text-xs text-amber-500 mt-1">⚠ Posted {review.date} — generic text</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === 'chat' && (
          <div className="bg-white min-h-full flex flex-col h-full">
            <div className="bg-[#25d366] px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">I</div>
              <div>
                <p className="text-white font-semibold text-sm">InstaPro Recovery</p>
                <p className="text-green-100 text-xs">WhatsApp Business</p>
              </div>
            </div>
            <div className="flex-1 p-4 bg-gray-50 space-y-3 overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.me ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs rounded-2xl px-3 py-2 text-sm ${msg.me ? 'bg-[#25d366] text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl px-3 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div
                onClick={() => handleClue('rf15-2', 'Service asks for your current password', 'Your password gives complete account access — legitimate recovery services use platform-specific flows, never your password')}
                className="bg-red-50 border border-red-200 rounded-lg p-2 cursor-pointer hover:border-red-400 transition-colors"
              >
                <AlertCircle size={12} className="text-red-500 inline mr-1.5" />
                <span className="text-red-600 text-xs">Password requested — Click to record this critical red flag</span>
              </div>
              <div
                onClick={() => handleClue('rf15-4', 'Contact is via WhatsApp only', 'No official support channel exists — only a WhatsApp number for a service claiming professional expertise')}
                className="bg-amber-50 border border-amber-200 rounded-lg p-2 cursor-pointer hover:border-amber-400 transition-colors"
              >
                <span className="text-amber-600 text-xs">WhatsApp-only support — Click to note: No verified business channel</span>
              </div>
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t border-gray-200 p-3 bg-white flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#25d366]"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || typing}
                className="bg-[#25d366] hover:bg-[#1fb854] disabled:bg-gray-300 text-white rounded-lg p-2 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
