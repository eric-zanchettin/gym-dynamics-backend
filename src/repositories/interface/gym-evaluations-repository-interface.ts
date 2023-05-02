import { GymEvaluation, Prisma } from "@prisma/client";

export interface IGymEvaluationsRepository {
    insert(data: Prisma.GymEvaluationCreateArgs): Promise<GymEvaluation>;
};