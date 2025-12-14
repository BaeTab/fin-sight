import React from 'react';

export const ResultCard = ({ mode, result }) => {
    if (!result) return null;

    const formatMoney = (val) => Number(val || 0).toLocaleString() + '원';

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                시뮬레이션 리포트
                <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">예상치</span>
            </h3>

            {mode === 'savings' ? (
                <>
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-xl">
                            <p className="text-sm text-blue-600 font-medium mb-1">만기 예상 수령액 (세후)</p>
                            <p className="text-3xl font-bold text-blue-700">{formatMoney(result.totalAmount)}</p>
                        </div>

                        <div className="space-y-3 pt-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">원금 합계</span>
                                <span className="font-semibold text-gray-900">{formatMoney(result.totalPrincipal)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">세전 이자</span>
                                <span className="font-semibold text-gray-900">+{formatMoney(result.preTaxInterest)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">이자 과세 ({result.taxAmount > 0 ? '-' : ''})</span>
                                <span className="font-semibold text-red-500">-{formatMoney(result.taxAmount)}</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-xl">
                            <p className="text-sm text-blue-600 font-medium mb-1">총 상환 예상액</p>
                            <p className="text-3xl font-bold text-blue-700">{formatMoney(result.totalRepayment)}</p>
                        </div>

                        <div className="space-y-3 pt-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">대출 원금</span>
                                <span className="font-semibold text-gray-900">{formatMoney((result.totalRepayment || 0) - (result.totalInterest || 0))}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">총 대출 이자</span>
                                <span className="font-semibold text-red-500">+{formatMoney(result.totalInterest)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm pt-3 border-t border-gray-100">
                                <span className="text-gray-500 font-medium">1회차 월 상환액</span>
                                <span className="font-bold text-gray-900">{formatMoney(result.schedule?.[0]?.payment)}</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
