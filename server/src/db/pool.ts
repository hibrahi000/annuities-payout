import { Pool } from "pg";
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS annuity_policies (
      id SERIAL PRIMARY KEY,
      policy_number VARCHAR(32) UNIQUE NOT NULL,
      holder_name VARCHAR(120) NOT NULL,
      monthly_payout NUMERIC(12, 2) NOT NULL,
      status VARCHAR(24) NOT NULL DEFAULT 'ACTIVE',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS payouts (
      id SERIAL PRIMARY KEY,
      policy_id INTEGER NOT NULL REFERENCES annuity_policies(id),
      amount Numeric(12, 2) NOT NULL,
      status VARCHAR(24) NOT NULL DEFAULT 'ACTIVE',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

     CREATE TABLE IF NOT EXISTS idempotency_keys (
      idempotency_key VARCHAR(128) PRIMARY KEY,
      status Varchar(24) NOT NULL,
      response_payload JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  


    INSERT INTO annuity_policies (policy_number, holder_name, monthly_payout, status)
    VALUES
      ('ANN-1001', 'Alex Rivera', 2450.00, 'ACTIVE'),
      ('ANN-1002', 'Jordan Chen', 3180.50, 'ACTIVE')
    ON CONFLICT (policy_number) DO NOTHING;
  `);
}


