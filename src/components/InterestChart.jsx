import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

export const InterestChart = ({ mode, data }) => {
    if (!data || data.length === 0) return null;

    // Downsample data if too large for performance (e.g. > 60 points?)
    // For smooth charts, Recharts handles reasonable amounts, but 360 months might be slow.
    // Sample every Nth point if length > 50.
    const chartData = data.length > 50
        ? data.filter((_, idx) => idx % Math.ceil(data.length / 50) === 0 || idx === data.length - 1)
        : data;

    const formatYAxis = (tick) => {
        if (tick >= 100000000) return (tick / 100000000).toFixed(1) + '억';
        if (tick >= 10000) return (tick / 10000).toFixed(0) + '만';
        return tick;
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-[400px] flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{mode === 'savings' ? '자산 증식 추이' : '월 상환금 구성'}</h3>
            <div className="w-full flex-1 min-h-0 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    {mode === 'savings' ? (
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
                            <YAxis tickFormatter={formatYAxis} tickLine={false} axisLine={false} width={40} />
                            <Tooltip formatter={(value) => Number(value).toLocaleString() + '원'} />
                            <Legend verticalAlign="top" height={36} />
                            <Area type="monotone" dataKey="principal" name="원금" stackId="1" stroke="#3b82f6" fill="url(#colorPrincipal)" />
                            <Area type="monotone" dataKey="interest" name="이자" stackId="1" stroke="#8b5cf6" fill="url(#colorInterest)" />
                        </AreaChart>
                    ) : (
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="round" tickLine={false} axisLine={false} />
                            <YAxis tickFormatter={formatYAxis} tickLine={false} axisLine={false} width={40} />
                            <Tooltip formatter={(value) => Number(value).toLocaleString() + '원'} />
                            <Legend verticalAlign="top" height={36} />
                            <Bar dataKey="principal" name="납입 원금" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                            <Bar dataKey="interest" name="이자" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};
