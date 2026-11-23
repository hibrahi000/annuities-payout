import { Router } from "express";
import { pool } from "../db/pool"


export const policyRouter = Router();

policyRouter
    .get("/health", async (_req, res) => {
        try {
            await pool.query("SELECT 1");
            res.json({ status: "ok", db: "connected" });
        } catch (err) {
            res.status(500).json({ status: "error", message: (err as Error).message });
        }
    })
    .get("/api/policies", async (_req, res) => {
        try {
            const result = await pool.query(
                "SELECT id, policy_number, holder_name, monthly_payout, status FROM annuity_policies ORDER BY id ASC"
            );
            res.json({ policies: result.rows });
        } catch (err) {
            res.status(500).json({ error: (err as Error).message });
        }
    });