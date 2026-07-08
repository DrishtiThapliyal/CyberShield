import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Video, Search, MoreVertical, ArrowLeft, Info, CheckCheck, Check, AlertCircle, Camera, Send } from 'lucide-react';
import { useInvestigationStore } from '../../store/investigationStore';

const CASE_ID = 2;

interface ChatMessage {
  id: string; text: string; sender: 'them' | 'you'; time: string; read?: boolean;
}

const initialMessages: ChatMessage[] = [
  { id: 'm1', text: 'Hi! This is Priya. My phone screen cracked and I am using this number for now.', sender: 'them', time: '11:02 AM' },
];

const hackerResponses: ChatMessage[] = [
  { id: 'hr1', text: 'Yes but I need your help urgently. I am in a bit of trouble.', sender: 'them', time: '11:05 AM' },
  { id: 'hr2', text: 'I got into an accident with a cab and the driver is demanding money for repairs. I need ₹15,000 immediately. Please transfer to this UPI: rahulshekhawat99@paytm', sender: 'them', time: '11:07 AM' },
  { id: 'hr3', text: 'My camera is broken too :( Please just transfer the money fast, the driver is very angry. I will explain everything later. Please hurry!', sender: 'them', time: '11:09 AM' },
  { id: 'hr4', text: 'Please bhai, I am scared. The driver is threatening to call the police. Just send it quickly, I will return it as soon as I can.', sender: 'them', time: '11:11 AM' },
  { id: 'hr5', text: 'Why are you taking so long? Don\'t you trust me? I am your sister, please help me!', sender: 'them', time: '11:13 AM' },
];

const chats = [
  { id: 'unknown', name: 'Unknown Number', number: '+44 7492 183720', preview: 'I need ₹15,000 urgently', time: '11:09 AM', unread: 3, avatar: '👩' },
  { id: 'mom', name: 'Mom', number: '+91 98765 43210', preview: 'Dinner is ready beta', time: '9:30 AM', unread: 0, avatar: '👩‍🦳' },
  { id: 'dad', name: 'Dad', number: '+91 99887 76655', preview: 'Call me when free', time: 'Yesterday', unread: 0, avatar: '👨‍🦳' },
  { id: 'college', name: 'College Group', number: 'Group', preview: 'Assignment due tomorrow', time: 'Yesterday', unread: 5, avatar: '🎓' },
  { id: 'friend', name: 'Rahul', number: '+91 91234 56789', preview: 'Weekend plans?', time: '2 days ago', unread: 0, avatar: '👦' },
];

export default function WhatsAppEnvironment() {
  const { addClue } = useInvestigationStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [numberInspected, setNumberInspected] = useState(false);
  const [profileInspected, setProfileInspected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleClue = (id: string, label: string, detail: string) => {
    addClue(CASE_ID, { id, label, detail, timestamp: Date.now() });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, text: inputText, sender: 'you', time, read: true };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Trigger hacker response
    if (responseIndex < hackerResponses.length) {
      setIsTyping(true);
      const delay = 1500 + Math.random() * 2000;
      setTimeout(() => {
        setIsTyping(false);
        const resp = hackerResponses[responseIndex];
        const respTime = new Date();
        const rTime = respTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        setMessages(prev => [...prev, { ...resp, time: rTime }]);
        setResponseIndex(prev => prev + 1);

        // Check for video call mention
        if (inputText.toLowerCase().includes('video') || inputText.toLowerCase().includes('call')) {
          setTimeout(() => handleClue('rf2-2', 'No video call available', 'Refuses to video call claiming "camera is broken" but refuses all video verification'), 500);
        }
        if (responseIndex >= 1) {
          handleClue('rf2-4', 'Immediate money request', 'Conversation quickly escalates to urgent ₹15,000 UPI transfer — real family would call first');
        }
      }, delay);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const selectedChat = chats.find((c) => c.id === selected);

  return (
    <div className="h-full flex bg-[#111b21] rounded-xl overflow-hidden border border-slate-700/50">
      {/* Chat List */}
      <div className={`${selected ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-slate-700/50`}>
        <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">R</div><span className="text-white font-medium text-sm">WhatsApp</span></div>
          <div className="flex items-center gap-3"><Video size={18} className="text-gray-400" /><Search size={18} className="text-gray-400" /><MoreVertical size={18} className="text-gray-400" /></div>
        </div>
        <div className="px-3 py-2 bg-[#202c33]"><div className="flex items-center gap-2 bg-[#2a3942] rounded-full px-3 py-1.5"><Search size={14} className="text-gray-400" /><span className="text-gray-400 text-sm">Search or start new chat</span></div></div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div key={chat.id} onClick={() => setSelected(chat.id)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#202c33] transition-colors border-b border-slate-800/50 ${chat.id === 'unknown' ? 'bg-[#1a2631]' : ''}`}>
              <div className="w-11 h-11 rounded-full bg-slate-700 flex items-center justify-center text-xl flex-shrink-0 relative">
                <span>{chat.id === 'unknown' ? '👩' : chat.avatar}</span>
                {chat.id === 'unknown' && <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center"><AlertCircle size={10} className="text-white" /></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5"><span className="text-white text-sm font-medium">{chat.name}</span><span className={`text-xs ${chat.unread > 0 ? 'text-emerald-400' : 'text-gray-500'}`}>{chat.time}</span></div>
                <div className="flex items-center justify-between"><span className="text-gray-400 text-xs truncate flex-1">{chat.preview}</span>
                  {chat.unread > 0 && <span className="ml-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">{chat.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat View */}
      {selected && selectedChat && (
        <div className="flex-1 flex flex-col">
          <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3 border-b border-slate-700/30">
            <button onClick={() => setSelected(null)} className="md:hidden text-gray-400"><ArrowLeft size={20} /></button>
            <button onClick={() => { setShowProfile(!showProfile); if (selected === 'unknown') { setProfileInspected(true); handleClue('rf2-5', 'Stolen profile photo', 'Profile photo matches your sister but account has different name and was created recently'); } }}
              className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-lg hover:ring-2 hover:ring-amber-500/50 transition-all">{selectedChat.avatar}</button>
            <div className="flex-1">
              <button onClick={() => { if (selected === 'unknown') { setNumberInspected(true); handleClue('rf2-1', 'Unknown number', 'Number +44 7492 183720 is not in contacts. Uses UK prefix (+44) while family is local'); handleClue('rf2-3', 'International number prefix', 'Number starts with +44 (United Kingdom) — your family members all have Indian (+91) numbers'); } }}
                className="text-left hover:opacity-80 transition-opacity">
                <p className="text-white text-sm font-medium">{selectedChat.name}</p>
                <p className={`text-xs font-mono transition-colors ${numberInspected && selected === 'unknown' ? 'text-amber-400' : 'text-gray-400'}`}>
                  {selectedChat.number} {numberInspected && selected === 'unknown' && <AlertCircle size={11} className="inline ml-1.5" />}
                </p>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => { if (selected === 'unknown') handleClue('rf2-2', 'No video call available', 'Attempting video call — sender refuses claiming "camera is broken" but refuses all video verification'); }} className="text-gray-400 hover:text-white transition-colors"><Video size={18} /></button>
              <Phone size={18} className="text-gray-400" />
              <Info size={18} className="text-gray-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: '#111b21' }}>
            {selected === 'unknown' ? (
              <>
                <div className="flex justify-center">
                  <div className="bg-[#1a2631] text-amber-400 text-xs px-4 py-2 rounded-full border border-amber-500/20">Unknown Number — Not in your contacts</div>
                </div>
                {messages.map((msg) => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2 }}
                    className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs rounded-xl px-3 py-2 text-sm ${msg.sender === 'you' ? 'bg-[#005c4b] text-white rounded-tr-sm' : 'bg-[#202c33] text-gray-200 rounded-tl-sm'}`}>
                      <p>{msg.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs text-gray-400">{msg.time}</span>
                        {msg.sender === 'you' && (msg.read ? <CheckCheck size={12} className="text-blue-400" /> : <Check size={12} className="text-gray-400" />)}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#202c33] rounded-xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                      <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
                      <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
                      <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            ) : (
              <div className="flex items-center justify-center h-full"><p className="text-gray-500 text-sm">No suspicious activity in this chat</p></div>
            )}
          </div>

          {/* Input */}
          {selected === 'unknown' && (
            <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3">
              <input
                type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyDown}
                placeholder="Type a message..." className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              />
              <button onClick={sendMessage} disabled={!inputText.trim()}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${inputText.trim() ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-slate-600 text-slate-400'}`}>
                <Send size={16} />
              </button>
            </div>
          )}

          {/* Profile Panel */}
          <AnimatePresence>
            {showProfile && selected === 'unknown' && (
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.2 }}
                className="absolute right-0 top-0 h-full w-72 bg-[#111b21] border-l border-slate-700 z-20 p-5 overflow-y-auto">
                <button onClick={() => setShowProfile(false)} className="text-gray-400 mb-4"><ArrowLeft size={18} /></button>
                <div className="text-center mb-5">
                  <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center text-4xl mx-auto mb-3">👩</div>
                  <p className="text-white font-semibold">Unknown Number</p>
                  <p className="text-amber-400 font-mono text-sm">+44 7492 183720</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#202c33] rounded-lg p-3"><p className="text-xs text-gray-400 mb-1">About</p><p className="text-gray-300 text-sm">Hey there! I am using WhatsApp.</p></div>
                  <div className="bg-[#202c33] rounded-lg p-3"><p className="text-xs text-gray-400 mb-1">Profile Photo Added</p><p className="text-amber-400 text-sm">3 days ago</p></div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    <div className="flex items-start gap-2"><AlertCircle size={14} className="text-amber-400 mt-0.5" /><p className="text-amber-300 text-xs">This account was created recently and uses a UK number. Profile photo added 3 days ago.</p></div>
                  </div>
                  <div onClick={() => handleClue('rf2-5', 'Stolen profile photo', 'Profile photo was added only 3 days ago — this is not the real person')}
                    className="bg-slate-700/50 border border-slate-600 hover:border-amber-500/40 rounded-lg p-3 cursor-pointer transition-colors">
                    <div className="flex items-start gap-2"><Camera size={14} className="text-blue-400 mt-0.5" /><p className="text-slate-400 text-xs">Click to record: Profile photo was recently added to impersonate a known contact</p></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {!selected && (
        <div className="flex-1 hidden md:flex items-center justify-center bg-[#222e35]">
          <div className="text-center"><div className="w-24 h-24 rounded-full border-4 border-slate-600 flex items-center justify-center mx-auto mb-4 text-4xl">💬</div><p className="text-white text-xl font-light">WhatsApp Web</p><p className="text-gray-400 text-sm mt-2">Select a chat to start investigating</p></div>
        </div>
      )}
    </div>
  );
}
