
/**
 * Calculate Savings/Deposit
 * 
 * @param {Object} params
 * @param {number} params.amount - Monthly deposit or Total deposit amount
 * @param {number} params.months - Duration in months
 * @param {number} params.rate - Annual interest rate (%)
 * @param {string} params.type - 'savings' (accumulate) or 'deposit' (lump sum)
 * @param {string} params.method - 'simple' or 'compound'
 * @param {string} params.tax - 'normal' (15.4%), 'preferential' (9.5%), 'none' (0%)
 */
export const calculateSavings = ({ amount, months, rate, type, method, tax }) => {
    const r = rate / 100 / 12; // Monthly rate
    let totalPrincipal = 0;
    let preTaxInterest = 0;

    // Tax rate
    let taxRate = 0.154;
    if (tax === 'preferential') taxRate = 0.095; // Approximate for mutual finance
    if (tax === 'none') taxRate = 0;

    const chartData = [];

    if (type === 'deposit') {
        // Lump sum deposit (Yechigeum)
        totalPrincipal = amount;

        if (method === 'simple') {
            preTaxInterest = amount * (rate / 100) * (months / 12);
        } else {
            // Compound
            preTaxInterest = amount * Math.pow(1 + r, months) - amount;
        }

        // Chart data generation (linear for simple, curve for compound)
        for (let i = 1; i <= months; i++) {
            let currentInterest = 0;
            if (method === 'simple') {
                currentInterest = amount * (rate / 100) * (i / 12);
            } else {
                currentInterest = amount * Math.pow(1 + r, i) - amount;
            }
            chartData.push({
                month: i,
                principal: totalPrincipal,
                interest: Math.round(currentInterest),
                total: Math.round(totalPrincipal + currentInterest)
            });
        }

    } else {
        // Monthly Savings (Jeokgeum)
        totalPrincipal = amount * months;

        if (method === 'simple') {
            // Simple Interest for Savings: Sum of interests for each deposit
            // First month money earns for N months, last for 1 month (or similar depending on payment timing)
            // Formula: Amount * n * (n+1) / 2 * (r/12)? No.
            // Interest = contribution * months * (rate/12) + contribution * (months-1) * ...
            // = contribution * (rate/12) * (months * (months+1) / 2)
            preTaxInterest = amount * (rate / 100 / 12) * (months * (months + 1) / 2);
        } else {
            // Compound for Savings: FV = P * ((1+r)^n - 1) / r
            // Assuming payment at beginning of month? Or end?
            // Usually banks calc from deposit day. Let's assume beginning of period for max interest or just standard FV formula.
            // Standard: P * ((1+r)^n - 1) / r * (1+r) (if beginning)
            // Let's use End of period payments diagram for standard simplicity or Beginning?
            // Korean banks usually count days. But precise formula:
            // FV = A * (((1+r)^n - 1) / r) * (1+r) (If deposited at start of each month)
            preTaxInterest = amount * ((Math.pow(1 + r, months) - 1) / r) * (1 + r) - totalPrincipal;
        }

        // Chart Data
        let currentPrincipal = 0;
        let currentCompoundTotal = 0; // For compound calc accumulation

        for (let i = 1; i <= months; i++) {
            currentPrincipal += amount;
            let currentInterest = 0;

            if (method === 'simple') {
                // Simple interest accrued so far
                // Logic: For the money deposited at month k (1..i), it has run for (i - k + 1) months?
                // Easier: Just calc standard formula for i months duration
                currentInterest = amount * (rate / 100 / 12) * (i * (i + 1) / 2);
            } else {
                // Compound
                currentCompoundTotal = amount * ((Math.pow(1 + r, i) - 1) / r) * (1 + r);
                currentInterest = currentCompoundTotal - currentPrincipal;
            }

            chartData.push({
                month: i,
                principal: currentPrincipal,
                interest: Math.round(currentInterest),
                total: Math.round(currentPrincipal + currentInterest)
            });
        }
    }

    const taxAmount = preTaxInterest * taxRate;
    const postTaxInterest = preTaxInterest - taxAmount;
    const totalAmount = totalPrincipal + postTaxInterest;

    return {
        totalPrincipal: Math.round(totalPrincipal),
        preTaxInterest: Math.round(preTaxInterest),
        taxAmount: Math.round(taxAmount),
        postTaxInterest: Math.round(postTaxInterest),
        totalAmount: Math.round(totalAmount),
        chartData
    };
};

/**
 * Calculate Loan Repayment
 * 
 * @param {Object} params
 * @param {number} params.amount - Loan Amount
 * @param {number} params.months - Loan duration in months
 * @param {number} params.rate - Annual Interest Rate (%)
 * @param {number} params.grace - Grace period in months (only interest)
 * @param {string} params.method - 'equal_pi' (Principal & Interest), 'equal_p' (Principal), 'bullet' (Maturity)
 */
export const calculateLoan = ({ amount, months, rate, grace = 0, method }) => {
    const r = rate / 100 / 12;
    let schedule = [];
    let totalInterest = 0;

    let remainingPrincipal = amount;
    // Real repayment months
    const repayMonths = months - grace;

    // Pre-calc usage
    // For Equal P&I
    const payment = (amount * r * Math.pow(1 + r, repayMonths)) / (Math.pow(1 + r, repayMonths) - 1);

    for (let i = 1; i <= months; i++) {
        let monthlyInterest = remainingPrincipal * r;
        let monthlyPrincipal = 0;
        let monthlyPayment = 0;

        if (i <= grace) {
            // Grace period: Interest only
            monthlyPayment = monthlyInterest;
            monthlyPrincipal = 0;
        } else {
            // Repayment period
            if (method === 'equal_pi') {
                // CPM
                monthlyPayment = payment;
                monthlyPrincipal = monthlyPayment - monthlyInterest;
            } else if (method === 'equal_p') {
                // CAM
                monthlyPrincipal = amount / repayMonths;
                monthlyPayment = monthlyPrincipal + monthlyInterest;
            } else {
                // Bullet
                if (i === months) {
                    monthlyPrincipal = amount;
                    monthlyPayment = monthlyPrincipal + monthlyInterest;
                } else {
                    monthlyPayment = monthlyInterest;
                    monthlyPrincipal = 0;
                }
            }
        }

        // Adjust for last month rounding differences
        if (remainingPrincipal - monthlyPrincipal < 10 && i > grace) {
            // Simple check to close out? No, proper way is strict math, but float errors exist.
            // If it's bullet or last month of others.
        }

        // Safety for negative or over-payment
        if (monthlyPrincipal > remainingPrincipal) monthlyPrincipal = remainingPrincipal;

        remainingPrincipal -= monthlyPrincipal;
        totalInterest += monthlyInterest;

        schedule.push({
            round: i,
            payment: Math.round(monthlyPayment),
            principal: Math.round(monthlyPrincipal),
            interest: Math.round(monthlyInterest),
            balance: Math.round(remainingPrincipal)
        });
    }

    return {
        totalInterest: Math.round(totalInterest),
        totalRepayment: Math.round(amount + totalInterest),
        schedule
    };
};
