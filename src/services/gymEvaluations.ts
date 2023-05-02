import { GymEvaluationsRepository } from "../repositories/prisma/gym-evaluations-repository";

interface RegisterEvaluationParams {
    userId: number,
    gymId: string;
    stars: number;
    comment: string;
};

export class GymEvaluationsService {
    constructor(private gymEvaluationsRepository: GymEvaluationsRepository) { };

    async registerEvaluation({ userId, gymId, stars, comment }: RegisterEvaluationParams) {
        return await this.gymEvaluationsRepository.insert({
            data: {
                userId,
                gymId,
                stars,
                comment
            }
        });
    };
};