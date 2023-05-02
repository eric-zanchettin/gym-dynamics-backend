import { Prisma, GymEvaluation } from "@prisma/client";
import { IGymEvaluationsRepository } from "../interface/gym-evaluations-repository-interface";
import { prisma } from "../../lib/prisma";

export class GymEvaluationsRepository implements IGymEvaluationsRepository {
    async insert(data: Prisma.GymEvaluationCreateArgs): Promise<GymEvaluation> {
        return await prisma.gymEvaluation.create(data);  
    };
};