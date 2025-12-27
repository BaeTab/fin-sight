import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Tabs } from '../components/Tabs';
import { CalculatorForm } from '../components/CalculatorForm';
import { ResultCard } from '../components/ResultCard';
import { InterestChart } from '../components/InterestChart';
import { AmortizationTable } from '../components/AmortizationTable';
import { FinancialGuide } from '../components/FinancialGuide';
import { calculateSavings, calculateLoan } from '../utils/calculate';
import { Download, ArrowRight } from 'lucide-react';
import html2canvas from 'html2canvas';

import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';
import { SEO } from '../components/SEO';
import { blogPosts } from '../data/blogPosts';

export function Home() {
    const [activeTab, setActiveTab] = useState('savings');
    // const [hasClickedAd, setHasClickedAd] = useState(false); // Removed
    // const [showAdModal, setShowAdModal] = useState(false); // Removed

    const [savingsParams, setSavingsParams] = useState({
        type: 'savings', // savings | deposit
        amount: 1000000,
        months: 12,
        rate: 3.5,
        tax: 'normal',
        method: 'simple'
    });

    const [loanParams, setLoanParams] = useState({
        amount: 50000000,
        months: 24,
        rate: 4.5,
        grace: 0,
        method: 'equal_pi'
    });

    const [result, setResult] = useState(null);
    const resultRef = useRef(null);

    // Analytics: Track tab changes
    useEffect(() => {
        if (analytics) {
            logEvent(analytics, 'screen_view', {
                firebase_screen: activeTab,
                screen_name: activeTab
            });
            // Custom event for tab switch
            logEvent(analytics, 'tab_change', { tab: activeTab });
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 'savings') {
            const res = calculateSavings({
                ...savingsParams,
                amount: Number(savingsParams.amount),
                months: Number(savingsParams.months),
                rate: Number(savingsParams.rate)
            });
            setResult(res);
        } else {
            const res = calculateLoan({
                ...loanParams,
                amount: Number(loanParams.amount),
                months: Number(loanParams.months),
                rate: Number(loanParams.rate),
                grace: Number(loanParams.grace)
            });
            setResult(res);
        }
    }, [savingsParams, loanParams, activeTab]);

    const handleDownload = async () => {
        if (resultRef.current) {
            try {
                const canvas = await html2canvas(resultRef.current, {
                    scale: 2, // Higher resolution
                    backgroundColor: '#f9fafb', // Match bg-gray-50
                    logging: false,
                });

                const link = document.createElement('a');
                link.download = `Fin-Sight-Report-${new Date().toISOString().slice(0, 10)}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();

                // Analytics: Track download
                if (analytics) {
                    logEvent(analytics, 'download_report', {
                        type: activeTab,
                        params: activeTab === 'savings' ? savingsParams : loanParams
                    });
                }
            } catch (err) {
                console.error('Failed to capture image:', err);
                alert('이미지 저장 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SEO
                title="스마트 금융 계산기 - 예적금/대출 이자 비교"
                description="예금, 적금, 대출 이자를 한눈에 계산하고 비교해보세요. 복리 효과, 대출 상환 스케줄표 제공. Fin-Sight로 스마트한 자산 관리를 시작하세요."
                url="/"
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Fin-Sight",
                    "applicationCategory": "FinanceApplication",
                    "operatingSystem": "Web",
                    "description": "스마트한 예적금 및 대출 이자 계산기",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "KRW"
                    }
                }}
            />
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="text-center md:text-left space-y-4">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        당신의 금융, <span className="text-blue-600">Fin-Sight</span>로 꿰뚫어보세요
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        예금, 적금, 대출 등 다양한 금융 상품의 수익과 비용을 한눈에 파악하세요.
                    </p>
                </div>

                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors shadow-sm"
                >
                    <Download className="w-4 h-4" />
                    <span>리포트 저장</span>
                </button>
            </div>

            {/* Tabs */}
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Left: Input Form */}
                <section className="w-full lg:w-1/3 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold mb-6">설정 입력</h2>
                        <CalculatorForm
                            mode={activeTab}
                            values={activeTab === 'savings' ? savingsParams : loanParams}
                            onChange={activeTab === 'savings' ? setSavingsParams : setLoanParams}
                        />
                    </div>
                </section>

                {/* Right: Results */}
                <section className="w-full lg:w-2/3 space-y-6" ref={resultRef}>
                    <ResultCard mode={activeTab} result={result} />

                    {result && result.chartData && (
                        <InterestChart mode={activeTab} data={result.chartData} />
                    )}

                    {activeTab === 'loan' && result && result.schedule && (
                        <AmortizationTable schedule={result.schedule} />
                    )}

                    {activeTab === 'savings' && result && result.chartData && (
                        <div className="bg-blue-50/50 p-4 rounded-xl text-sm text-gray-600">
                            <p>ℹ️ 본 계산 결과는 월 단위 계산을 기준으로 하며, 실제 금융기관의 일할 계산 방식과는 차이가 있을 수 있습니다.</p>
                        </div>
                    )}

                    {/* Watermark for image */}
                    <div className="hidden print-shown text-center text-gray-400 text-sm pt-4">
                        Created by Fin-Sight
                    </div>
                </section>
            </div>

            <FinancialGuide />

            {/* Latest Blog Posts Section */}
            <section className="mt-16 border-t border-gray-200 py-12">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">최신 금융 인사이트</h2>
                    <p className="text-gray-500">더 현명한 자산 관리를 위한 팁을 확인하세요.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blogPosts.slice(0, 3).map((post) => (
                        <Link to={`/blog/${post.id}`} key={post.id} className="group">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                                <div className="p-6">
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-3 inline-block">
                                        {post.category}
                                    </span>
                                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">
                        블로그 더보기 <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
