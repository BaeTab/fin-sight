import React, { useState, useEffect, useRef } from 'react'; // Fin-Sight App
import { Tabs } from './components/Tabs';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultCard } from './components/ResultCard';
import { InterestChart } from './components/InterestChart';
import { AmortizationTable } from './components/AmortizationTable';
import { FinancialGuide } from './components/FinancialGuide';
import { Footer } from './components/Footer';
import { AdPickModal } from './components/AdPickModal';
import { calculateSavings, calculateLoan } from './utils/calculate';
import { Calculator, Download, Lock } from 'lucide-react';
import html2canvas from 'html2canvas';

import { analytics } from './firebase';
import { logEvent } from 'firebase/analytics';

function App() {
  const [activeTab, setActiveTab] = useState('savings');
  const [hasClickedAd, setHasClickedAd] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);

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

  // Check if user has clicked ad in this session
  useEffect(() => {
    const adClickedInSession = sessionStorage.getItem('adClicked');
    if (adClickedInSession === 'true') {
      setHasClickedAd(true);
    }
  }, []);

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

  const handleAdClick = () => {
    setHasClickedAd(true);
    sessionStorage.setItem('adClicked', 'true');

    // Analytics: Track ad click
    if (analytics) {
      logEvent(analytics, 'ad_click', {
        ad_provider: 'adpick',
        timestamp: new Date().toISOString()
      });
    }
  };

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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Calculator className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">Fin-Sight</h1>
            <span className="text-sm font-medium text-gray-400 hidden sm:inline">|</span>
            <span className="text-sm font-medium text-gray-500 hidden sm:inline">스마트 금융 계산기</span>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>리포트 저장</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            당신의 금융, <span className="text-blue-600">Fin-Sight</span>로 꿰뚫어보세요
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            복잡한 이자 계산과 대출 상환 스케줄, 더 이상 머리 아프게 고민하지 마세요.<br className="hidden sm:block" />
            Fin-Sight는 예금, 적금, 대출 등 다양한 금융 상품의 수익과 비용을 <br className="hidden sm:block" />
            한눈에 파악할 수 있도록 돕는 스마트한 시뮬레이션 도구입니다.
          </p>
        </div>

        {/* Tabs */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Input Form */}
          <section className="w-full lg:w-1/3 space-y-6">
            {/* ... (CalculatorForm container) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold mb-6">설정 입력</h2>
              <CalculatorForm
                mode={activeTab}
                values={activeTab === 'savings' ? savingsParams : loanParams}
                onChange={activeTab === 'savings' ? setSavingsParams : setLoanParams}
              />
            </div>
          </section>

          {/* Right: Results (Wrapped for Capture) */}
          <section className="w-full lg:w-2/3 space-y-6" ref={resultRef}>
            {!hasClickedAd ? (
              /* Locked State - Show before ad click */
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                  <Lock className="w-10 h-10 text-gray-500" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900">
                    계산 결과가 준비되었습니다
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                    무료로 서비스를 이용하시려면<br />
                    광고를 한 번만 클릭해주세요 🙏
                  </p>
                </div>

                <button
                  onClick={() => setShowAdModal(true)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Lock className="w-5 h-5" />
                  결과 보기 (광고 클릭 필요)
                </button>

                <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                  광고 수익으로 서비스를 무료로 제공하고 있습니다.<br />
                  여러분의 작은 클릭이 큰 도움이 됩니다 💙
                </p>
              </div>
            ) : (
              /* Unlocked State - Show after ad click */
              <>
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
              </>
            )}
          </section>
        </div>


        <FinancialGuide />
      </main>

      <Footer />

      {/* Ad Click Modal */}
      <AdPickModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        onAdClicked={handleAdClick}
      />
    </div>
  );
}

export default App;
