import { Router } from "express";
import { policyRouter } from "./policies";
import { payoutRouter } from "./payouts";
import { healthRouter } from "./health"
export const apiRouter = Router();

apiRouter.use("/policies", policyRouter);
apiRouter.use("/payouts", payoutRouter);
apiRouter.use('/health', healthRouter);

