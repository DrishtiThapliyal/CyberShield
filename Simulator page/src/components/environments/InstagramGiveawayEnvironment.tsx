import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, AlertCircle, CheckCircle2, ArrowLeft, Send } from 'lucide-react';
import { useInvestigationStore } from '../../store/investigationStore';

const CASE_ID = 7;

export default function InstagramGiveawayEnvironment() {
  const { addClue } = useInvestigationStore();
  const [screen, setScreen] = useState<'feed' | 'profile' | 'dm'>('feed');
  const [profileChecked, setProfileChecked] = useState(false);
  const [dmOpened, setDmOpened] = useState(false);

  const handleClue = (id: string, label: string, detail: string) => {
    addClue(CASE_ID, { id, label, detail, timestamp: Date.now() });
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200">
      {/* Instagram Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <span className="text-gray-900 font-bold text-xl" style={{ fontFamily: 'Georgia, serif' }}>Instagram</span>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => { setScreen('dm'); setDmOpened(true); handleClue('rf7-5', 'DM contains suspicious link', 'Winner DM contains link to instagramgiveaway-prize-claim.com — not instagram.com'); }}
              className="relative"
            >
              <Send size={22} className="text-gray-700" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">1</span>
            </button>
          </div>
        </div>
      </div>

      {screen === 'feed' && (
        <div className="flex-1 overflow-y-auto">
          {/* Post */}
          <div className="border-b border-gray-100">
            <div className="flex items-center gap-2 px-4 py-3">
              <div
                onClick={() => { setScreen('profile'); setProfileChecked(true); handleClue('rf7-2', 'Account created recently', 'Profile was created 45 days ago with only giveaway posts — no organic history'); }}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs cursor-pointer ring-2 ring-pink-500"
              >
                A
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span
                    onClick={() => { setScreen('profile'); handleClue('rf7-1', 'Blue tick is fake', 'Account is "amazon_in_official__" with extra underscores — not the real @amazon_in'); }}
                    className="text-sm font-semibold text-gray-900 cursor-pointer hover:underline"
                  >
                    amazon_in_official__
                  </span>
                  <div className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-amber-400 transition-all"
                    onClick={() => handleClue('rf7-1', 'Blue tick is fake', 'Username has extra underscores: amazon_in_official__ vs real @amazon_in — fake account mimicking real one')}>
                    <CheckCircle2 size={9} className="text-white" />
                  </div>
                </div>
                <p className="text-xs text-gray-400">Sponsored</p>
              </div>
              <MoreHorizontal size={18} className="text-gray-500" />
            </div>

            {/* Giveaway Post Image */}
            <div className="bg-gradient-to-br from-orange-400 to-yellow-500 px-6 py-10 text-center">
              <div className="text-5xl mb-3">🎁</div>
              <p className="text-white font-black text-2xl">MEGA GIVEAWAY</p>
              <p className="text-white/90 text-lg font-semibold mt-1">₹50,000 CASH PRIZE</p>
              <p className="text-white/80 text-sm mt-2">5 Lucky Winners Selected!</p>
            </div>

            {/* Likes/Comments */}
            <div className="px-4 py-3">
              <div className="flex items-center gap-4 mb-2">
                <Heart size={22} className="text-gray-700" />
                <MessageCircle size={22} className="text-gray-700" />
                <Share2 size={22} className="text-gray-700" />
                <Bookmark size={22} className="ml-auto text-gray-700" />
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1">12,483 likes</p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">amazon_in_official__ </span>
                🎉 CONGRATULATIONS to our 5 lucky winners! Check your DMs to claim your ₹50,000 prize. You have 24 hours to respond! ⏰
              </p>

              <div
                onClick={() => handleClue('rf7-4', 'Winner selected without entry', 'You never participated in an Amazon giveaway — cannot win something you never entered')}
                className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 cursor-pointer hover:border-amber-400 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle size={14} className="text-amber-500 mt-0.5" />
                  <p className="text-amber-700 text-xs">You received a winner notification. Click to note: Did you enter this giveaway?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === 'profile' && (
        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <button onClick={() => setScreen('feed')} className="text-gray-600"><ArrowLeft size={20} /></button>
            <span className="font-semibold">amazon_in_official__</span>
          </div>
          <div className="px-4 py-4">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-2xl">A</div>
              <div className="grid grid-cols-3 gap-2 flex-1 text-center">
                <div><p className="font-bold text-gray-900">28</p><p className="text-xs text-gray-500">posts</p></div>
                <div><p className="font-bold text-gray-900">94.2K</p><p className="text-xs text-gray-500">followers</p></div>
                <div><p className="font-bold text-gray-900">3</p><p className="text-xs text-gray-500">following</p></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex items-center gap-1 mb-1">
                <span className="font-bold text-gray-900">amazon_in_official__</span>
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"><CheckCircle2 size={10} className="text-white" /></div>
              </div>
              <p className="text-xs text-gray-500 mb-0.5">🛒 Official Amazon India Giveaways</p>
              <p className="text-xs text-red-500 font-medium">Account created: 45 days ago</p>
              <p className="text-xs text-gray-500">All posts are giveaway promotions only</p>
            </div>

            <div className="space-y-2 mb-4">
              <div onClick={() => handleClue('rf7-2', 'Account created recently', 'Account created only 45 days ago with no organic posts — real brand accounts have years of history')}
                className="bg-amber-50 border border-amber-200 rounded-lg p-3 cursor-pointer hover:border-amber-400 transition-colors">
                <p className="text-amber-700 text-xs">45-day old account with 94K followers and only giveaway posts. Click to record this observation.</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-0.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-orange-300 to-yellow-400 flex items-center justify-center">
                  <p className="text-white text-xs font-bold text-center p-1">GIVEAWAY 🎁</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {screen === 'dm' && (
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <button onClick={() => setScreen('feed')} className="text-gray-600"><ArrowLeft size={20} /></button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs">A</div>
            <span className="font-semibold text-sm">amazon_in_official__</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs">
                <p className="text-sm text-gray-800">🎉 Congratulations! You have been selected as one of our 5 Grand Prize Winners! You have won ₹50,000!</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs">
                <p className="text-sm text-gray-800">To claim your prize, please pay a small processing fee of ₹500 and provide your details.</p>
                <div
                  onClick={() => handleClue('rf7-3', 'Processing fee required', 'Legitimate prize winners are never asked to pay fees — this ₹500 "processing fee" is the actual scam')}
                  className="mt-2 bg-red-50 border border-red-200 rounded p-2 cursor-pointer hover:border-red-400 transition-colors"
                >
                  <p className="text-red-600 text-xs">Click to note: Legitimate prizes never require payment fees</p>
                </div>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs">
                <p className="text-sm text-gray-800">Claim here within 24 hours:</p>
                <div
                  onClick={() => handleClue('rf7-5', 'DM contains suspicious link', 'Link goes to instagramgiveaway-prize-claim.com — not instagram.com or amazon.in')}
                  className="mt-1 bg-amber-50 border border-amber-300 rounded px-2 py-1 cursor-pointer hover:border-amber-500 transition-colors"
                >
                  <p className="text-xs font-mono text-amber-600">instagramgiveaway-prize-claim.com</p>
                  <p className="text-xs text-amber-500">← Tap to inspect URL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
