import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, AlertCircle, MessageSquare, Heart, Share2, ChevronRight, ArrowLeft, Phone, Send } from 'lucide-react';
import { useInvestigationStore } from '../../store/investigationStore';

const CASE_ID = 11;

export default function MarketplaceEnvironment() {
  const { addClue } = useInvestigationStore();
  const [screen, setScreen] = useState<'listing' | 'seller' | 'chat'>('listing');
  const [priceInspected, setPriceInspected] = useState(false);
  const [imageChecked, setImageChecked] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<Array<{ text: string; me: boolean; time?: string }>>([
    { text: 'Hi, interested in iPhone?', me: false, time: '10:30 AM' },
  ]);
  const [inputText, setInputText] = useState('');
  const [typing, setTyping] = useState(false);
  const [autoResponseIndex, setAutoResponseIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const autoResponses = [
    { text: 'Final price ₹18,000. Leaving India next week so urgent sale. Pay ₹5,000 advance on UPI to confirm and I\'ll courier it.', time: '10:33 AM' },
    { text: 'No time for meetup. OLX payment not possible from my account. Trust me, very genuine. 3 other buyers are also interested.', time: '10:36 AM' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    // Add user message
    setMessages(prev => [...prev, { text: inputText, me: true, time: timeStr }]);
    setInputText('');

    // If there are more auto-responses, show typing indicator and send next response
    if (autoResponseIndex < autoResponses.length) {
      setTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { text: autoResponses[autoResponseIndex].text, me: false, time: autoResponses[autoResponseIndex].time }]);
        setAutoResponseIndex(prev => prev + 1);
        setTyping(false);
      }, 1500 + Math.random() * 1000);
    }
  };

  const handleClue = (id: string, label: string, detail: string) => {
    addClue(CASE_ID, { id, label, detail, timestamp: Date.now() });
  };

  return (
    <div className="h-full flex flex-col bg-[#f5f5f5] rounded-xl overflow-hidden border border-gray-200">
      {/* OLX-style header */}
      <div className="bg-[#002f34] px-4 py-3 flex items-center gap-3">
        <span className="text-white font-black text-xl">OLX</span>
        <div className="flex-1 bg-white rounded px-3 py-1.5 flex items-center gap-2">
          <Search size={14} className="text-gray-400" />
          <span className="text-gray-400 text-sm">Search for products</span>
        </div>
        <div className="flex gap-3 items-center">
          <MessageSquare size={18} className="text-white" />
          <div className="w-7 h-7 bg-[#23e5db] rounded-full flex items-center justify-center text-[#002f34] font-bold text-xs">R</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 flex">
        {[
          { id: 'listing', label: 'Listing' },
          { id: 'seller', label: 'Seller Profile' },
          { id: 'chat', label: 'Chat' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setScreen(t.id as any)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              screen === t.id ? 'border-[#002f34] text-[#002f34]' : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {screen === 'listing' && (
          <div className="max-w-xl mx-auto p-4">
            {/* Product Images */}
            <div className="bg-gray-200 rounded-xl overflow-hidden mb-4 relative">
              <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center">
                  <div className="text-6xl mb-2">📱</div>
                  <p className="text-gray-500 text-sm">iPhone 15 Pro Max</p>
                  <p className="text-xs text-gray-400">Natural Titanium — 256GB</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setImageChecked(true);
                  handleClue('rf11-4', 'Product photos are stock images', 'Reverse image search shows these photos are from Apple\'s official website — not actual product photos');
                }}
                className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg hover:bg-black/80 transition-colors"
              >
                🔍 Check Image Source
              </button>
              {imageChecked && (
                <div className="absolute bottom-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-lg">
                  ⚠ Stock photo from apple.com
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl p-4 mb-3 border border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-bold text-gray-900 text-xl">iPhone 15 Pro Max 256GB</h2>
                <button
                  onClick={() => {
                    setPriceInspected(true);
                    handleClue('rf11-1', 'Price is 60% below market value', 'iPhone 15 Pro Max 256GB sells for ₹79,900 on Apple India — listing at ₹18,000 is 77% off, a scam indicator');
                  }}
                  className={`text-right ml-4 px-2 py-1 rounded transition-all ${priceInspected ? 'bg-amber-50 border border-amber-300' : 'hover:bg-gray-50'}`}
                >
                  <p className={`text-2xl font-black ${priceInspected ? 'text-amber-600' : 'text-[#002f34]'}`}>₹18,000</p>
                  {priceInspected && (
                    <p className="text-xs text-amber-500">Market: ₹79,900</p>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={13} />
                <span>Bengaluru, Karnataka</span>
                <span className="ml-auto text-xs">Posted today</span>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Condition</span>
                  <span className="text-gray-700">Like New</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Reason for selling</span>
                  <span className="text-gray-700">Urgent — relocating abroad</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 mb-3 border border-gray-100">
              <p className="text-gray-700 text-sm leading-relaxed">
                Selling my iPhone 15 Pro Max. Bought 2 months ago, all accessories and original box included. Selling urgently due to relocation.
                <span className="text-red-500 font-medium"> Advance payment required via UPI to confirm purchase.</span>
              </p>
              <div
                onClick={() => handleClue('rf11-3', 'Insists on UPI advance, no platform escrow', 'Refuses to use OLX\'s platform payment — UPI advance outside the platform removes all buyer protection')}
                className="mt-2 bg-red-50 border border-red-200 rounded p-2 cursor-pointer hover:border-red-400 transition-colors"
              >
                <p className="text-red-600 text-xs">Advance UPI payment required — Click to record this red flag</p>
              </div>
            </div>

            <button
              onClick={() => setScreen('chat')}
              className="w-full bg-[#002f34] text-[#23e5db] rounded-xl py-3 font-bold text-sm"
            >
              Chat with Seller
            </button>
          </div>
        )}

        {screen === 'seller' && (
          <div className="max-w-xl mx-auto p-4">
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl">👤</div>
                <div>
                  <h2 className="font-bold text-gray-900 text-xl">Karan Mehta</h2>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(4.2)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => handleClue('rf11-2', 'Seller account created this week', 'Account created 4 days ago with 0 completed transactions and 0 reviews from real buyers')}
                  className="flex items-center justify-between border-b border-gray-100 pb-3 cursor-pointer hover:bg-amber-50 -mx-2 px-2 rounded transition-colors"
                >
                  <span className="text-gray-500 text-sm">Member since</span>
                  <span className="text-amber-600 font-medium text-sm font-mono">4 days ago ← Tap to note</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 text-sm">Verified phone</span>
                  <span className="text-green-600 text-sm">✓ Yes</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 text-sm">Total listings</span>
                  <span className="text-gray-700 text-sm">1 listing</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">Transactions</span>
                  <span className="text-gray-700 text-sm">0 completed</span>
                </div>
              </div>

              <div
                onClick={() => handleClue('rf11-5', 'Seller asks to move conversation off platform', 'Provided a WhatsApp number to "negotiate" — moving off platform removes OLX buyer protection')}
                className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 cursor-pointer hover:border-amber-400 transition-colors"
              >
                <p className="text-amber-700 text-sm font-medium">WhatsApp: +91 9827364510</p>
                <p className="text-amber-500 text-xs mt-0.5">"For faster communication" — Tap to record: Moving off platform is a red flag</p>
              </div>
            </div>
          </div>
        )}

        {screen === 'chat' && (
          <div className="max-w-xl mx-auto flex flex-col h-full">
            <div className="bg-[#002f34] px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">K</div>
              <span className="text-white font-medium text-sm">Karan Mehta</span>
            </div>
            <div className="flex-1 p-4 bg-gray-50 space-y-3 overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.me ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs rounded-xl px-3 py-2 text-sm ${msg.me ? 'bg-[#002f34] text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>
                    {msg.text}
                    <p className={`text-xs mt-1 text-right ${msg.me ? 'text-white/50' : 'text-gray-400'}`}>{msg.time}</p>
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
              <div
                onClick={() => handleClue('rf11-5', 'Seller asks to move conversation off platform', '"3 other buyers interested" and UPI advance demand outside platform removes OLX buyer protection and dispute resolution')}
                className="bg-amber-50 border border-amber-200 rounded-lg p-2 cursor-pointer hover:border-amber-400 transition-colors text-center"
              >
                <p className="text-amber-600 text-xs">Multiple pressure tactics used — Click to record observation</p>
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
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002f34]"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || typing}
                className="bg-[#002f34] hover:bg-[#001a1f] disabled:bg-gray-300 text-white rounded-lg p-2 transition-colors"
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
