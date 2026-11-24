export type PayoutFrequency = 'MONTHLY' | 'QUARTERLY' | 'ANNUAL'
export type PolicyStatus = 'ACTIVE' | 'SUSPENDED' | 'MATURED'

export interface AnnuityPolicy {
    id: number
    policy_number: string
    holder_name: string
    monthly_payout: string
    frequency: PayoutFrequency
    status: PolicyStatus
    created_at: Date
}

export interface PayoutRequest {
    policyId: number
    amountCents: number
    idempotencyKey: string
}

export interface AnnuityPayoutScheduleInput {
    principal: number
    annualInterestRate: number
    termInYears: number
    frequency: PayoutFrequency
}

