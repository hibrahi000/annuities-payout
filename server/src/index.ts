import "dotenv/config";
import express from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
const port = Number(process.env.PORT || 4000);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS annuity_policies (
      id SERIAL PRIMARY KEY,
      policy_number VARCHAR(32) UNIQUE NOT NULL,
      holder_name VARCHAR(120) NOT NULL,
      monthly_payout NUMERIC(12, 2) NOT NULL,
      status VARCHAR(24) NOT NULL DEFAULT 'ACTIVE',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    INSERT INTO annuity_policies (policy_number, holder_name, monthly_payout, status)
    VALUES
      ('ANN-1001', 'Alex Rivera', 2450.00, 'ACTIVE'),
      ('ANN-1002', 'Jordan Chen', 3180.50, 'ACTIVE')
    ON CONFLICT (policy_number) DO NOTHING;
  `);
}

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", message: (err as Error).message });
  }
});

app.get("/api/policies", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, policy_number, holder_name, monthly_payout, status FROM annuity_policies ORDER BY id ASC"
    );
    res.json({ policies: result.rows });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
