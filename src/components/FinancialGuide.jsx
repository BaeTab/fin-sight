import React from 'react';
import { BookOpen, TrendingUp, AlertCircle, PieChart } from 'lucide-react';

const GuideSection = ({ icon: Icon, title, children }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
        <div className="text-gray-600 space-y-3 text-sm leading-relaxed">
            {children}
        </div>
    </div>
);

export const FinancialGuide = () => {
    return (
        <div className="space-y-8 mt-12 py-8 border-t border-gray-200">
            <div className="text-center max-w-2xl mx-auto mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">금융 가이드</h2>
                <p className="text-gray-500">똑똑한 금융 생활을 위한 필수 상식, 핀사이트가 정리해 드립니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GuideSection icon={TrendingUp} title="단리와 복리, 어떻게 다를까요?">
                    <p>
                        <strong>단리(Simple Interest)</strong>는 원금에 대해서만 이자가 붙는 방식입니다.
                        매달 받는 이자가 일정하므로 계산이 단순하지만, 시간이 지날수록 자산 증식 속도가 아쉬울 수 있습니다.
                    </p>
                    <p>
                        <strong>복리(Compound Interest)</strong>는 '이자에도 이자가 붙는' 방식입니다.
                        원금과 이자를 합친 금액에 다시 이자가 붙기 때문에, 기간이 길어질수록 자산이 기하급수적으로 늘어나는 '복리의 마법' 효과를 볼 수 있습니다.
                        장기 저축일수록 복리 상품이 유리합니다.
                    </p>
                </GuideSection>

                <GuideSection icon={PieChart} title="비과세와 세금우대 활용하기">
                    <p>
                        일반적인 예적금은 이자 소득의 <strong>15.4%</strong>(소득세 14% + 지방소득세 1.4%)를 세금으로 떼어갑니다.
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li>
                            <strong>세금우대(9.5%)</strong>: 신협, 새마을금고 등 상호금융권의 조합원 예탁금은 3천만 원 한도로 농특세 1.4%만 부과되거나(2025년까지), 저율 과세 혜택을 받을 수 있습니다.
                        </li>
                        <li>
                            <strong>비과세(0%)</strong>: 만 65세 이상 등을 대상으로 하는 비과세 종합저축이나, 청년희망적금, ISA(개인종합자산관리계좌) 등을 활용하면 세금을 내지 않아도 됩니다.
                        </li>
                    </ul>
                </GuideSection>

                <GuideSection icon={BookOpen} title="대출 상환 방식 비교">
                    <p>
                        <strong>원리금균등상환</strong>: 대출 전 기간 동안 매달 내는 금액(원금+이자)이 동일합니다. 계획적인 자금 운영에 유리하여 가장 보편적입니다.
                    </p>
                    <p>
                        <strong>원금균등상환</strong>: 매달 원금을 똑같이 나누어 내고, 이자는 남은 잔액에 대해서만 냅니다. 초반에는 상환액이 많지만, 갈수록 줄어들며 총 이자를 가장 적게 냅니다.
                    </p>
                    <p>
                        <strong>만기일시상환</strong>: 기간 내내 이자만 내다가, 만기에 원금을 한꺼번에 갚습니다. 당장의 부담은 적지만 만기 시 큰 부담이 될 수 있습니다.
                    </p>
                </GuideSection>

                <GuideSection icon={AlertCircle} title="중도상환수수료 주의사항">
                    <p>
                        대출 만기 전에 돈을 갚으면 은행 입장에서는 예정된 이자 수익이 사라지므로 <strong>중도상환수수료</strong>를 부과할 수 있습니다.
                    </p>
                    <p>
                        보통 대출 실행 후 3년이 지나면 면제되는 경우가 많으며, 요즘은 수수료가 없는 모바일 대출 상품도 늘어나고 있습니다.
                        여유 자금이 생겼을 때 바로 상환하는 것이 이득인지, 수수료를 따져보고 결정해야 합리적입니다.
                    </p>
                </GuideSection>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💡 핀사이트 활용 꿀팁</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                    핀사이트의 시뮬레이션 리포트는 단순한 계산 이상의 가치를 제공합니다.
                    예적금 가입 전에는 <strong>'세후 수령액'</strong>을 반드시 확인하여 실질 수익률을 비교해보세요.
                    대출을 받을 때는 <strong>'총 상환 예상액'</strong>을 확인하여, 금리 차이에 따른 총 비용 변화를 미리 파악하는 것이 중요합니다.
                </p>
                <p className="text-sm text-gray-500">
                    * 본 시뮬레이션 결과는 참고용이며, 실제 금융 상품 가입 시에는 해당 금융사의 약관과 설명을 반드시 확인하시기 바랍니다.
                </p>
            </div>
        </div>
    );
};
