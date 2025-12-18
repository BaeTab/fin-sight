import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LegalModal } from './LegalModal'; // Ensure this file exists

export const Footer = () => {
    const [modalContent, setModalContent] = useState(null); // 'terms', 'privacy', or null

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent inline-block">
                            Fin-Sight
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            복잡한 금융 계산을 쉽고 명확하게.<br />
                            핀사이트는 당신의 현명한 금융 생활을 지원하는 스마트한 시뮬레이션 도구입니다.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">서비스</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link to="/" className="hover:text-blue-600 transition-colors">예금 이자 계산기</Link></li>
                            <li><Link to="/" className="hover:text-blue-600 transition-colors">적금 이자 계산기</Link></li>
                            <li><Link to="/" className="hover:text-blue-600 transition-colors">대출 상환 계산기</Link></li>
                            <li><Link to="/blog" className="hover:text-blue-600 transition-colors">금융 지식 블로그</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">법적 고지</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            본 사이트에서 제공하는 모든 계산 결과는 모의 계산값으로,
                            실제 금융기관의 계산 방식이나 결과와 차이가 있을 수 있습니다.
                            중요한 금융 결정 시에는 반드시 해당 금융기관에 재확인하시기 바랍니다.
                        </p>
                    </div>
                </div>
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Fin-Sight. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 space-x-4">
                        <button onClick={() => setModalContent('terms')} className="hover:text-gray-600 transition-colors">이용약관</button>
                        <button onClick={() => setModalContent('privacy')} className="hover:text-gray-600 transition-colors">개인정보처리방침</button>
                    </div>
                </div>
            </div>

            {/* Terms Modal */}
            <LegalModal
                isOpen={modalContent === 'terms'}
                onClose={() => setModalContent(null)}
                title="이용약관"
            >
                <p><strong>제1조 (목적)</strong><br />본 약관은 Fin-Sight(이하 "서비스")가 제공하는 금융 계산 서비스의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.</p>
                <p><strong>제2조 (서비스의 내용)</strong><br />"서비스"는 사용자가 입력한 정보를 바탕으로 예적금 이자 및 대출 상환액에 대한 시뮬레이션 결과를 제공합니다. 제공되는 정보는 참고용이며 법적 효력을 갖지 않습니다.</p>
                <p><strong>제3조 (면책 조항)</strong><br />"서비스"는 계산 결과의 정확성, 완전성을 보장하지 않으며, 이를 활용하여 발생한 어떠한 손해에 대해서도 책임을 지지 않습니다.</p>
            </LegalModal>

            {/* Privacy Modal */}
            <LegalModal
                isOpen={modalContent === 'privacy'}
                onClose={() => setModalContent(null)}
                title="개인정보처리방침"
            >
                <p><strong>1. 개인정보의 수집 및 이용 목적</strong><br />Fin-Sight는 별도의 회원가입 절차 없이, 브라우저 내에서 즉시 실행되는 서비스입니다. 따라서 서버에 사용자의 개인정보나 입력한 금융 데이터를 저장하지 않습니다.</p>
                <p><strong>2. 쿠키 및 광고 식별자</strong><br />본 서비스는 Google AdSense 및 Google Analytics를 사용하며, 이를 위해 쿠키(Cookie) 데이터를 수집할 수 있습니다. 이는 개인을 식별하지 않는 통계 데이터 및 맞춤형 광고 제공을 목적으로 합니다.</p>
                <p><strong>3. 제3자 제공</strong><br />수집된 쿠키 정보는 광고 게재를 위해 Google 등 제3자 광고 사업자에게 제공될 수 있습니다.</p>
                <p><strong>4. 문의처</strong><br />서비스 이용과 관련된 문의사항은 관리자 이메일로 연락 바랍니다.</p>
            </LegalModal>
        </footer>
    );
};
