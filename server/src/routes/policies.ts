import { Router } from "express";
import { pool } from "../db/pool"


export const policyRouter = Router();

policyRouter
    .get("/", async (_req, res) => {
        try {
            const result = await pool.query(
                "SELECT id, policy_number, holder_name, monthly_payout, status FROM annuity_policies ORDER BY id ASC"
            );
            res.json({ policies: result.rows });
        } catch (err) {
            res.status(500).json({ error: (err as Error).message });
        }
    });