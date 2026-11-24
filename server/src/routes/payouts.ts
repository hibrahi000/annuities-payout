import { Router, Request, Response } from "express";
import { AnnuityPayoutScheduleInput } from "../types/annuity";
import { genAnnuityPayoutSchedule } from "../services/payoutCalculator";
export const payoutRouter = Router();


payoutRouter
    .post("/calculate", async (req: Request<{}, {}, AnnuityPayoutScheduleInput>, res: Response) => {
        try {
            const { principal, annualInterestRate, termInYears, frequency } = req.body;
            const payoutSchedule = genAnnuityPayoutSchedule({ principal, annualInterestRate, termInYears, frequency });

            res.json(payoutSchedule);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while calculating the payout schedule." });
        }
    });
