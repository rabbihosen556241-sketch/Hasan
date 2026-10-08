import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { safeCopyText } from '../utils/clipboard';
import { SuccessStory } from '../types';
import { api } from '../services/api';
import { Heart, ThumbsUp, Hospital, Calendar, Quote, Share2, Sparkles } from 'lucide-react';

interface SuccessStoriesSectionProps {
  stories: SuccessStory[];
  onOpenCreateRequest?: () => void;
}

export const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({
  stories: initialStories,
  onOpenCreateRequest,
}) => {
  const { language } = useLanguage();
  const { showToast } = useToast();
  const [stories, setStories] = useState<SuccessStory[]>(initialStories);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handleLike = async (storyId: string) => {
    if (likedMap[storyId]) return;
    try {
      const newLikes = await api.likeStory(storyId);
      setStories((prev) =>
        prev.map((s) => (s.id === storyId ? { ...s, likes: newLikes } : s))
      );
      setLikedMap((prev) => ({ ...prev, [storyId]: true }));
      showToast(
        language === 'bn' ? 'কৃতজ্ঞতা প্রকাশ করা হয়েছে! ❤️' : 'Gratitude recorded! ❤️',
        'success'
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = async (story: SuccessStory) => {
    const text = `রক্তদান বাঁচায় জীবন: "${story.titleBn}" - রক্তবন্ধু প্ল্যাটফর্মে পড়ুন।`;
    if (navigator.share) {
      try {
        await navigator.share({ title: story.titleBn, text, url: window.location.href });
        return;
      } catch {
        // Fallback to copy
      }
    }

    const success = await safeCopyText(text);
    if (success) {
      showToast(
        language === 'bn' ? 'গল্পের লিংক কপি করা হয়েছে!' : 'Story link copied to clipboard!',
        'success'
      );
    } else {
      showToast(
        language === 'bn' ? 'কপি করতে সমস্যা হয়েছে।' : 'Could not copy.',
        'error'
      );
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'মানবতার মেলবন্ধন' : 'Humanitarian Bonds'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'bn' ? 'জীবন বাঁচানোর গল্প ও কৃতজ্ঞতা' : 'Life-Saving Stories & Gratitude'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {language === 'bn'
              ? 'নিঃস্বার্থ রক্তদাতাদের উপহারে নতুন জীবন ফিরে পাওয়া মানুষের অনুপ্রেরণাদায়ী মুহূর্ত'
              : 'Inspiring real moments of human lives rekindled by selfless volunteer blood donors'}
          </p>
        </div>

        {/* Stories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-red-300 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-red-50 text-red-700 font-bold rounded-lg text-xs flex items-center space-x-1">
                    <Heart className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                    <span>{story.bloodGroup} রক্তদান</span>
                  </span>
                  <div className="flex items-center space-x-1 text-slate-400 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{story.date}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {language === 'bn' ? story.titleBn : story.titleEn}
                </h3>

                <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1 border border-slate-100">
                  <p>
                    <strong className="text-slate-800">{language === 'bn' ? 'রোগী:' : 'Patient:'}</strong> {story.patientName}
                  </p>
                  <p>
                    <strong className="text-slate-800">{language === 'bn' ? 'রক্তদাতা:' : 'Donor:'}</strong> {story.donorName}
                  </p>
                  <p className="flex items-center space-x-1 text-[11px] text-slate-500">
                    <Hospital className="w-3 h-3 text-red-500" />
                    <span>{story.hospital}</span>
                  </p>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-rose-50/40 p-4 rounded-xl border border-rose-100">
                  &quot;{language === 'bn' ? story.storyBn : story.storyEn}&quot;
                </p>
              </div>

              {/* Bottom Likes & Share */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleLike(story.id)}
                  disabled={likedMap[story.id]}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    likedMap[story.id]
                      ? 'bg-red-50 text-red-600'
                      : 'bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedMap[story.id] ? 'fill-red-600 text-red-600' : ''}`} />
                  <span>{story.likes} {language === 'bn' ? 'কৃতজ্ঞতা' : 'Thanks'}</span>
                </button>

                <button
                  onClick={() => handleShare(story)}
                  className="flex items-center space-x-1 text-slate-500 hover:text-red-600 text-xs font-semibold transition cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{language === 'bn' ? 'শেয়ার' : 'Share'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
