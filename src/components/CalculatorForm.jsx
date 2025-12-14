import React from 'react';
import { HelpCircle } from 'lucide-react';

const InputGroup = ({ label, children, helpText }) => (
    <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
            <label className="text-sm font-semibold text-gray-700">{label}</label>
            {helpText && (
                <div className="group relative">
                    <HelpCircle className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        {helpText}
                    </div>
                </div>
            )}
        </div>
        {children}
    </div>
);

const NumberInput = ({ value, onChange, placeholder, unit, step = '1' }) => (
    <div className="relative">
        <input
            type="text"
            value={value ? Number(value).toLocaleString() : ''}
            onChange={(e) => {
                const val = e.target.value.replace(/,/g, '');
                if (!isNaN(val)) onChange(val);
            }}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium text-gray-900"
        />
        {unit && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
                {unit}
            </span>
        )}
    </div>
);

const Select = ({ value, onChange, options }) => (
    <div className="relative">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none font-medium text-gray-900 cursor-pointer"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    </div>
);

export const CalculatorForm = ({ mode, values, onChange }) => {
    const handleChange = (field, value) => {
        onChange({ ...values, [field]: value });
    };

    return (
        <div className="space-y-6">
            {mode === 'savings' ? (
                <>
                    <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 rounded-lg">
                        <button
                            onClick={() => handleChange('type', 'savings')}
                            className={`py-2 text-sm font-medium rounded-md transition-all ${values.type === 'savings' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-gray-200/50'}`}
                        >
                            적금 (매월 납입)
                        </button>
                        <button
                            onClick={() => handleChange('type', 'deposit')}
                            className={`py-2 text-sm font-medium rounded-md transition-all ${values.type === 'deposit' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:bg-gray-200/50'}`}
                        >
                            예금 (목돈 거치)
                        </button>
                    </div>

                    <InputGroup label={values.type === 'savings' ? '월 적립액' : '예치 금액'}>
                        <NumberInput
                            value={values.amount}
                            onChange={(val) => handleChange('amount', val)}
                            placeholder="0"
                            unit="원"
                        />
                    </InputGroup>

                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="기간">
                            <NumberInput
                                value={values.months}
                                onChange={(val) => handleChange('months', val)}
                                placeholder="0"
                                unit="개월"
                            />
                        </InputGroup>
                        <InputGroup label="연 이자율">
                            <NumberInput
                                value={values.rate}
                                onChange={(val) => handleChange('rate', val)}
                                placeholder="0.0"
                                unit="%"
                            />
                        </InputGroup>
                    </div>

                    <InputGroup label="이자 과세" helpText="일반(15.4%), 비과세(0%), 세금우대(9.5%)">
                        <Select
                            value={values.tax}
                            onChange={(val) => handleChange('tax', val)}
                            options={[
                                { value: 'normal', label: '일반과세 (15.4%)' },
                                { value: 'none', label: '비과세 (0%)' },
                                { value: 'preferential', label: '세금우대 (9.5%)' },
                            ]}
                        />
                    </InputGroup>

                    <InputGroup label="이자 지급 방식">
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="method"
                                    checked={values.method === 'simple'}
                                    onChange={() => handleChange('method', 'simple')}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="text-sm text-gray-700">단리</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="method"
                                    checked={values.method === 'compound'}
                                    onChange={() => handleChange('method', 'compound')}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="text-sm text-gray-700">복리</span>
                            </label>
                        </div>
                    </InputGroup>
                </>
            ) : (
                <>
                    <InputGroup label="대출 금액">
                        <NumberInput
                            value={values.amount}
                            onChange={(val) => handleChange('amount', val)}
                            placeholder="0"
                            unit="원"
                        />
                    </InputGroup>

                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="대출 기간">
                            <NumberInput
                                value={values.months}
                                onChange={(val) => handleChange('months', val)}
                                placeholder="0"
                                unit="개월"
                            />
                        </InputGroup>
                        <InputGroup label="연 이자율">
                            <NumberInput
                                value={values.rate}
                                onChange={(val) => handleChange('rate', val)}
                                placeholder="0.0"
                                unit="%"
                            />
                        </InputGroup>
                    </div>

                    <InputGroup label="상환 방식">
                        <Select
                            value={values.method}
                            onChange={(val) => handleChange('method', val)}
                            options={[
                                { value: 'equal_pi', label: '원리금균등상환' },
                                { value: 'equal_p', label: '원금균등상환' },
                                { value: 'bullet', label: '만기일시상환' },
                            ]}
                        />
                    </InputGroup>

                    <InputGroup label="거치 기간" helpText="이자만 납부하는 기간입니다.">
                        <NumberInput
                            value={values.grace}
                            onChange={(val) => handleChange('grace', val)}
                            placeholder="0"
                            unit="개월"
                        />
                    </InputGroup>
                </>
            )}
        </div>
    );
};
