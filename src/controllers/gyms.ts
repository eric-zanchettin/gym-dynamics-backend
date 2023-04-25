import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { GymsRepository } from "../repositories/prisma/gyms-repository";
import { GymsService } from "../services/gyms";
import { UserRepository } from "../repositories/prisma/users-repository";
import { GymNotCreatedError, GymNotFoundError, UserNotFoundError } from "../errors";

export async function getGyms(request: FastifyRequest, reply: FastifyReply) {
    const getSchema = z.object({
        gymId: z.string().optional(),
    });

    const { gymId } = getSchema.parse(request.params);

    try {
        const gymsRepository = new GymsRepository();
        const gymsService = new GymsService(gymsRepository);

        const gyms = await gymsService.getGyms(gymId);

        if (!gyms) {
            if (gymId) return reply.status(204).send();
            throw new GymNotFoundError();
        };

        return reply.status(200).send(gyms);
    } catch (err) {
        if (err instanceof GymNotFoundError) {
            return reply.code(404).send(err.message);
        }

        return reply.code(500).send('Unknown Error!');
    };
};

export async function registerGym(request: FastifyRequest, reply: FastifyReply) {
    const registerSchema = z.object({
        name: z.string(),
        imgSrc: z.string(),
        description: z.string(),
        address: z.string(),
        planValue: z.number(),
        userEmail: z.string(),
    });

    const { name, imgSrc, description, address, planValue, userEmail } = registerSchema.parse(request.body);

    try {
        const gymsRepository = new GymsRepository();
        const gymsService = new GymsService(gymsRepository);
        const usersRepository = new UserRepository();

        const user = await usersRepository.findByEmail(userEmail);
        if (!user) throw new UserNotFoundError();

        const gym = await gymsService.register({ name, imgSrc, description, address, planValue, userId: user.id });
        if (!gym) throw new GymNotCreatedError();

        return reply.code(201).send(gym.id);
    } catch (err) {
        if (err instanceof UserNotFoundError) return reply.status(404).send(err.message)
        if (err instanceof GymNotCreatedError) return reply.status(500).send(err.message)

        return reply.code(500).send('Unknown Error!');
    };
};

export async function updateGym(request: FastifyRequest, reply: FastifyReply) {
    const updateSchema = z.object({
        id: z.string(),
        name: z.string(),
        img_src: z.string(),
        description: z.string(),
        address: z.string(),
        cheaper_plan: z.number(),
    });

    const { id, name, img_src, description, address, cheaper_plan } = updateSchema.parse(request.body);

    try {
        const gymsRepository = new GymsRepository();
        const gymsService = new GymsService(gymsRepository);

        const updatedGym = await gymsService.update({ id, name, img_src, description, address, cheaper_plan });
        if (!updatedGym) throw new GymNotFoundError();

        return reply.code(202).send('Gym updated successfully!');
    } catch (err) {
        if (err instanceof GymNotFoundError) reply.code(404).send(err.message);

        return reply.code(500).send('Unknown Error!')
    };
};

export async function deleteGym(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
        gymId: z.string(),
    });

    const { gymId } = querySchema.parse(request.query);

    try {
        const gymsRepository = new GymsRepository();
        const gymsService = new GymsService(gymsRepository);

        const deletedGym = await gymsService.delete(gymId);
        if (!deletedGym) throw new GymNotFoundError();

        return reply.code(202).send('Deleted successfully!');
    } catch (err) {
        if (err instanceof GymNotFoundError) reply.code(404).send(err.message);

        return reply.code(500).send('Unknown Error!');
    };
};