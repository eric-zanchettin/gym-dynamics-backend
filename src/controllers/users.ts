import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { UsersService } from "../services/users";
import { UserAlreadyExistsError, UserNotFoundError, UserPasswordNotMatchError } from "../errors";
import { UserRepository } from "../repositories/prisma/users-repository";

export async function login(request: FastifyRequest, reply: FastifyReply) {
    const loginSchema = z.object({
        email: z.string(),
        password: z.string(),
    });

    const { email, password } = loginSchema.parse(request.body);

    try {
        const userRepository = new UserRepository();
        const userService = new UsersService(userRepository);

        const user = await userService.login({ email, password });
        const userToToken = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
        };

        return reply.status(200).jwtSign(userToToken);
    } catch (err) {
        if (err instanceof UserNotFoundError) return reply.status(404).send({ message: err.message });
        if (err instanceof UserPasswordNotMatchError) return reply.status(409).send({ message: err.message });

        return reply.status(500).send();
    };
};

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {
    const registerSchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        admin: z.boolean(),
    });

    const { name, email, password, admin } = registerSchema.parse(request.body);

    try {
        const userRepository = new UserRepository();
        const userService = new UsersService(userRepository);

        await userService.register({ name, email, password, admin });
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) return reply.status(409).send({ message: err.message });

        return reply.status(500).send();
    };

    return reply.status(201).send('User created');
};

export async function updatePassword(request: FastifyRequest, reply: FastifyReply) {
    const updatePasswordSchema = z.object({
        id: z.number(),
        actualPassword: z.string(),
        newPassword: z.string(),
    });

    const { id, actualPassword, newPassword } = updatePasswordSchema.parse(request.body);

    try {
        const userRepository = new UserRepository();
        const userService = new UsersService(userRepository);

        await userService.updatePassword({ id, actualPassword, newPassword });
    } catch (err) {
        if (err instanceof UserNotFoundError) reply.status(404).send({ message: err.message });
        if (err instanceof UserPasswordNotMatchError) reply.status(409).send({ message: err.message });

        return reply.status(500).send();
    };

    return reply.status(202).send("Password updated successfully");
};