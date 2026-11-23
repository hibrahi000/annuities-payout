import { UUID } from "crypto";

export type PayoutFrequency = 'MONTHLY' | 'QUARTERLY' | 'ANNUAL'
export type PolicyStatus = 'ACTIVE' | 'SUSPENDED' | 'MATURED'

interface AnnuityPolicy {
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


