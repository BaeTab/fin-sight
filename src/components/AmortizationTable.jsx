import React from 'react';

export const AmortizationTable = ({ schedule }) => {
    if (!schedule || schedule.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">상환 스케줄</h3>
            </div>
            <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium sticky top-0">
                        <tr>
                            <th className="px-6 py-3">회차</th>
                            <th className="px-6 py-3">납입금</th>
                            <th className="px-6 py-3">납입 원금</th>
                            <th className="px-6 py-3">이자</th>
                            <th className="px-6 py-3 text-right">잔금</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {schedule.map((row) => (
                            <tr key={row.round} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-3 font-medium text-gray-700">{row.round}회</td>
                                <td className="px-6 py-3">{Number(row.payment).toLocaleString()}원</td>
                                <td className="px-6 py-3 text-blue-600">{Number(row.principal).toLocaleString()}원</td>
                                <td className="px-6 py-3 text-red-500">{Number(row.interest).toLocaleString()}원</td>
                                <td className="px-6 py-3 text-right font-medium text-gray-900">{Number(row.balance).toLocaleString()}원</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
