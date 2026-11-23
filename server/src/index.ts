import "dotenv/config";
import express from "express";
import cors from "cors";
import { initDb } from "./db/pool"
import { policyRouter } from "./routes/policies";

export const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

// Routes to mount before app.listen
app.use(policyRouter);



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
