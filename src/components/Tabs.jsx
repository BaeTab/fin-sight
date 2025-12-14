import React from 'react';
import { Calculator, Wallet } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Tabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'savings', label: '예적금 계산기', icon: Wallet },
        { id: 'loan', label: '대출 계산기', icon: Calculator },
    ];

    return (
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl mb-6">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={twMerge(
                            'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200',
                            activeTab === tab.id
                                ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                        )}
                    >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};
