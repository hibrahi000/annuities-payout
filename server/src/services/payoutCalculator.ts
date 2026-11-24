import { AnnuityPayoutScheduleInput } from "../types/annuity";



export const genAnnuityPayoutSchedule = (input: AnnuityPayoutScheduleInput) => {
    const { principal, annualInterestRate, termInYears, frequency } = input;


    // payment = P * [r(1+r)^n] / [(1+r)^n - 1]
    const payment = principal * (annualInterestRate * Math.pow(1 + annualInterestRate, termInYears)) / (Math.pow(1 + annualInterestRate, termInYears) - 1);


    const schedule: { paymentNumber: number, amount: number }[] = [];
    const totalPayments = termInYears * (frequency === 'MONTHLY' ? 12 : frequency === 'QUARTERLY' ? 4 : 1);

    for (let i = 1; i <= totalPayments; i++) {
        schedule.push({ paymentNumber: i, amount: Math.floor(payment / 100) });
    }

    return schedule;


}


