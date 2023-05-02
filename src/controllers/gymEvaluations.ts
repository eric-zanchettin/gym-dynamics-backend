import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { GymEvaluationNotCreatedError, GymNotFoundError, NonPermittedEvaluation, UserNotFoundError } from "../errors";
import { GymsRepository } from "../repositories/prisma/gyms-repository";
import { UserRepository } from "../repositories/prisma/users-repository";
import { GymEvaluationsRepository } from "../repositories/prisma/gym-evaluations-repository";
import { GymEvaluationsService } from "../services/gymEvaluations";

export async function postEvaluation(request: FastifyRequest, reply: FastifyReply) {
    const postEvaluationSchema = z.object({
        email: z.string(),
        gymId: z.string(),
        stars: z.number(),
        comment: z.string(),
    });

    const { email, gymId, stars, comment } = postEvaluationSchema.parse(request.body);

    try {
        if (stars < 0 || stars > 5) throw new NonPermittedEvaluation();
        const usersRepository = new UserRepository();
        const gymsRepository = new GymsRepository();
        const gymEvaluationsRepository = new GymEvaluationsRepository();
        const gymEvaluationsService = new GymEvaluationsService(gymEvaluationsRepository);

        const user = await usersRepository.findByEmail(email);
        if (!user) throw new UserNotFoundError()

        const gym = await gymsRepository.getGyms(gymId);
        if (!gym) throw new GymNotFoundError();

        const gymEvaluation = await gymEvaluationsService.registerEvaluation({ userId: user.id, gymId, stars, comment });
        if (!gymEvaluation) throw new GymEvaluationNotCreatedError();

        return reply.code(201).send();
    } catch (err) {
        if (err instanceof NonPermittedEvaluation) return reply.code(403).send(err.message);
        if (err instanceof GymNotFoundError) return reply.code(404).send(err.message);
        if (err instanceof UserNotFoundError) return reply.code(404).send(err.message);
        if (err instanceof GymEvaluationNotCreatedError) return reply.code(500).send(err.message);
        if (err instanceof Error && err.message.includes('Unique constraint failed')) return reply.code(403).send('This user already evaluated this Gym.')

        return reply.code(500).send('Unknown Error!');
    };
};