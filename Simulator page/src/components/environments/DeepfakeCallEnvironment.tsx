import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneOff, Volume2, AlertCircle, MessageSquare, Clock, User, Pause, Play } from 'lucide-react';
import { useInvestigationStore } from '../../store/investigationStore';

const CASE_ID = 10;

export default function DeepfakeCallEnvironment() {
  const { addClue } = useInvestigationStore();
  const [screen, setScreen] = useState<'incoming' | 'transcript' | 'calllog'>('incoming');
  const [numberInspected, setNumberInspected] = useState(false);
  const [audioInspected, setAudioInspected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<number | null>(null);

  const handleClue = (id: string, label: string, detail: string) => {
    addClue(CASE_ID, { id, label, detail, timestamp: Date.now() });
  };

  const playVoice = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const text = "Beta, I am in an accident near Koramangala. I need fifty thousand rupees urgently. Don't call me back, my phone is damaged. Please transfer immediately to helper trust at ybl. Please hurry, you have ten minutes.";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    // Try to find a Hindi/Indian English voice for realism
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
    if (indianVoice) utterance.voice = indianVoice;

    utteranceRef.current = utterance;
    setIsPlaying(true);
    setAudioInspected(true);
    setHasPlayedOnce(true);
    setPlayProgress(0);

    const totalDuration = 12000; // approximate
    const start = Date.now();
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      setPlayProgress(Math.min(100, (elapsed / totalDuration) * 100));
    }, 100);

    utterance.onend = () => {
      setIsPlaying(false);
      setPlayProgress(100);
      if (intervalRef.current) clearInterval(intervalRef.current);
      handleClue('rf10-3', 'Audio has subtle artifacts', 'Listen for robotic undertone and unnatural emotional cadence — AI voice synthesis often lacks genuine distress patterns');
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Load voices
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    return () => { window.speechSynthesis.cancel(); if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <div className="h-full flex flex-col bg-[#0a0a0f] rounded-xl overflow-hidden border border-slate-700/50">
      <div className="flex border-b border-slate-800">
        {([
          { id: 'incoming', label: '📞 Active Call' },
          { id: 'transcript', label: '📝 Transcript' },
          { id: 'calllog', label: '📋 Call Log' },
        ] as const).map((t) => (
          <button key={t.id} onClick={() => setScreen(t.id)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${screen === t.id ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {screen === 'incoming' && (
          <div className="min-h-full bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 rounded-full bg-slate-600 flex items-center justify-center mx-auto mb-4 ring-4 ring-white/20">
                <User size={48} className="text-slate-300" />
              </div>
              <p className="text-white font-bold text-2xl mb-1">Incoming Call</p>
              <button onClick={() => { setNumberInspected(true); handleClue('rf10-1', 'Call from unknown number', 'Your son\'s real number is +91 98765 43210 (saved as "Arjun"). This call is from +91 8392047156 — unknown number'); }}
                className={`text-lg font-mono transition-all px-3 py-1 rounded ${numberInspected ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30' : 'text-gray-300 hover:text-white'}`}>
                +91 8392047156 {numberInspected && <AlertCircle size={14} className="inline ml-2" />}
              </button>
              {!numberInspected && <p className="text-gray-400 text-sm mt-1">Not in contacts</p>}
              {numberInspected && <p className="text-amber-300 text-sm mt-1">Not Arjun's saved number</p>}
            </div>

            {/* Voice Player */}
            <div className="mb-8 w-full max-w-sm">
              <button onClick={playVoice}
                className={`w-full rounded-xl p-4 border transition-all ${audioInspected ? 'bg-amber-900/20 border-amber-500/40' : 'bg-slate-800/60 border-slate-600 hover:border-indigo-500/40'}`}>
                <div className="flex items-center gap-3 mb-3">
                  {isPlaying ? <Pause size={16} className="text-amber-400" /> : <Play size={16} className="text-indigo-400" />}
                  <span className="text-xs text-gray-400 font-mono">Voice Message — Listen carefully</span>
                  {audioInspected && <span className="text-xs text-amber-400 ml-auto">Artifacts detected</span>}
                </div>
                {/* Waveform */}
                <div className="flex items-center gap-0.5 h-8 mb-2">
                  {Array.from({ length: 40 }).map((_, i) => {
                    const h = Math.sin(i * 0.5) * 15 + Math.random() * 10 + 5;
                    return <div key={i} className={`w-1 rounded-full transition-colors ${i < playProgress * 0.4 ? 'bg-amber-400' : audioInspected ? 'bg-indigo-500/50' : 'bg-indigo-500/30'}`} style={{ height: `${h}px` }} />;
                  })}
                </div>
                {/* Progress bar */}
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-amber-400 rounded-full" animate={{ width: `${playProgress}%` }} transition={{ duration: 0.1 }} />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {isPlaying ? 'Playing — listen for unnatural pauses and tone' : hasPlayedOnce ? 'Tap to replay' : 'Tap to play the voice message'}
                </p>
              </button>
            </div>

            <div className="bg-slate-800/40 rounded-xl p-4 mb-6 max-w-sm w-full border border-red-500/20">
              <p className="text-white/90 text-sm italic text-center leading-relaxed">
                "Beta, I'm in an accident. I need ₹50,000 urgently. Don't call me back, my phone is damaged. Please transfer immediately..."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <button onClick={() => { setScreen('transcript'); handleClue('rf10-2', 'Refuses video call', 'Caller says camera is broken — refuses all video verification which would immediately expose the deepfake'); }}
                className="bg-green-600 hover:bg-green-700 text-white rounded-2xl py-4 flex flex-col items-center gap-1 transition-colors">
                <Phone size={24} /><span className="text-xs">Accept</span>
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white rounded-2xl py-4 flex flex-col items-center gap-1 transition-colors">
                <PhoneOff size={24} /><span className="text-xs">Decline</span>
              </button>
            </div>
          </div>
        )}

        {screen === 'transcript' && (
          <div className="p-5">
            <div className="bg-slate-800 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={16} className="text-indigo-400" />
                <span className="text-white font-semibold text-sm">Call Transcript</span>
                <span className="ml-auto text-xs text-slate-400 font-mono">4:17 duration</span>
              </div>
              <div className="space-y-3">
                {[
                  { speaker: 'Unknown', text: 'Beta please listen. I was in a cab accident near Koramangala. I need money urgently.' },
                  { speaker: 'You', text: 'Arjun? Is that you? Let me video call you to see you—' },
                  { speaker: 'Unknown', text: 'My camera is broken in the accident. Please just transfer. The driver is threatening me.' },
                  { speaker: 'You', text: 'Why does your voice sound slightly different? Are you okay?' },
                  { speaker: 'Unknown', text: 'I\'m stressed and scared. Please just send ₹50,000 to this UPI: helper_trust@ybl. Please hurry, you have 10 minutes.' },
                ].map((line, i) => (
                  <div key={i}>
                    <p className={`text-xs font-semibold mb-0.5 ${line.speaker === 'You' ? 'text-indigo-300' : 'text-gray-400'}`}>{line.speaker}:</p>
                    <p className="text-sm text-gray-200 leading-relaxed">{line.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div onClick={() => handleClue('rf10-2', 'Refuses video call', 'Caller refuses video call claiming broken camera — video would expose AI voice clone immediately')}
                className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-3 cursor-pointer hover:border-amber-500/40 transition-colors">
                <AlertCircle size={14} className="text-amber-400 inline mr-1.5" /><span className="text-amber-300 text-xs">Refused video call — Click to record</span>
              </div>
              <div onClick={() => handleClue('rf10-4', 'Requests immediate transfer, no time to think', '"10-minute deadline" is designed to prevent you from calling the real person on their actual number')}
                className="bg-red-900/20 border border-red-500/20 rounded-lg p-3 cursor-pointer hover:border-red-500/40 transition-colors">
                <AlertCircle size={14} className="text-red-400 inline mr-1.5" /><span className="text-red-300 text-xs">10-minute deadline pressure — Click to record</span>
              </div>
              <div onClick={() => handleClue('rf10-5', 'Background sounds are inconsistent', '"Accident scene" but background is completely silent — real accidents have sirens, voices, traffic sounds')}
                className="bg-slate-700/40 border border-slate-600 rounded-lg p-3 cursor-pointer hover:border-amber-500/30 transition-colors">
                <span className="text-slate-300 text-xs">No background sounds for a claimed accident scene — Click to record</span>
              </div>
            </div>
          </div>
        )}

        {screen === 'calllog' && (
          <div className="p-5">
            <h3 className="text-white font-semibold mb-4 text-sm">Arjun (Son) — Recent Calls</h3>
            <div className="space-y-2">
              {[
                { number: '+91 98765 43210', type: 'Outgoing', time: 'Yesterday, 6:30 PM', duration: '12 min', saved: true },
                { number: '+91 98765 43210', type: 'Incoming', time: '2 days ago, 2:15 PM', duration: '5 min', saved: true },
                { number: '+91 98765 43210', type: 'Outgoing', time: '5 days ago, 11:00 AM', duration: '8 min', saved: true },
              ].map((call, i) => (
                <div key={i} className="bg-slate-800 rounded-lg px-4 py-3 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${call.type === 'Incoming' ? 'bg-green-500/20' : 'bg-indigo-500/20'}`}>
                    <Phone size={16} className={call.type === 'Incoming' ? 'text-green-400' : 'text-indigo-400'} />
                  </div>
                  <div className="flex-1"><p className="text-white text-sm font-mono">{call.number}</p><p className="text-gray-400 text-xs">{call.type} • {call.time}</p></div>
                  <span className="text-gray-400 text-xs">{call.duration}</span>
                </div>
              ))}
              <div className="mt-3 bg-amber-900/20 border border-amber-500/20 rounded-lg p-3">
                <p className="text-amber-300 text-xs">Arjun's real number is +91 98765 43210. The incoming "emergency" call came from +91 8392047156 — a different, unknown number.</p>
              </div>
              <div onClick={() => handleClue('rf10-1', 'Call from unknown number', 'All previous calls to Arjun used +91 98765 43210. The "emergency" call is from an unknown different number')}
                className="bg-slate-700/40 border border-slate-600 rounded-lg p-3 cursor-pointer hover:border-amber-500/30 transition-colors">
                <p className="text-slate-300 text-xs">Tap to record: The call origin does not match your son's saved number</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
