import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

export function AdPickModal({ isOpen, onClose, onAdClicked }) {
    const [countdown, setCountdown] = useState(3);
    const [adClicked, setAdClicked] = useState(false);

    useEffect(() => {
        if (isOpen && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, countdown]);

    const handleAdClick = () => {
        setAdClicked(true);
        // Open AdPick link in new tab
        window.open('https://deg.kr/799c1ba', '_blank', 'noopener,noreferrer');

        // Wait a moment then allow user to proceed
        setTimeout(() => {
            onAdClicked();
            onClose();
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-slideUp">
                {/* Close button - disabled during countdown */}
                <button
                    onClick={onClose}
                    disabled={countdown > 0}
                    className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${countdown > 0
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="text-center space-y-6">
                    {/* Icon */}
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <ExternalLink className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-gray-900">
                            계산 결과 보기
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            무료로 서비스를 이용하시려면<br />
                            광고를 클릭해주세요 🙏
                        </p>
                    </div>

                    {/* Ad Click Button */}
                    {!adClicked ? (
                        <button
                            onClick={handleAdClick}
                            disabled={countdown > 0}
                            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all transform ${countdown > 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 hover:scale-105 shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {countdown > 0 ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="inline-block w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                                    {countdown}초 후 클릭 가능
                                </span>
                            ) : (
                                '광고 보고 결과 확인하기 →'
                            )}
                        </button>
                    ) : (
                        <div className="py-4 px-6 bg-green-50 border-2 border-green-200 rounded-xl">
                            <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                광고 클릭 완료! 감사합니다 ✨
                            </div>
                        </div>
                    )}

                    {/* Info */}
                    <p className="text-xs text-gray-500 leading-relaxed">
                        광고 수익으로 서비스를 운영하고 있습니다.<br />
                        여러분의 작은 클릭이 큰 도움이 됩니다 💙
                    </p>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}
