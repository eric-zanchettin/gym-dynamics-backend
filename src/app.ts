import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import { fastifyJwt } from '@fastify/jwt';
import { appRoutes } from './routes';

export const app = fastify();

app.register(appRoutes);
app.register(cors);
app.register(fastifyJwt, {
    secret: 'g!m-dyn4m!cs',

});

app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
        return;
    } catch {
        return reply.status(401).send({ message: "You don't have permission" });
    };
});