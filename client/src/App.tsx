import { useEffect, useState } from "react";

interface Policy {
  id: number;
  policy_number: string;
  holder_name: string;
  monthly_payout: string;
  status: string;
}

export default function App() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/policies")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setPolicies(data.policies ?? []))
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Annuities Payout Dashboard</h1>
      {error && <p style={{ color: "crimson" }}>API Error: {error}</p>}
      <ul>
        {policies.map((p) => (
          <li key={p.id}>
            <strong>{p.policy_number}</strong> — {p.holder_name} (${p.monthly_payout}/mo) [{p.status}]
          </li>
        ))}
      </ul>
    </main>
  );
}
