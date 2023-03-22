import { FastifyPlugin, FastifyReply } from 'fastify'

export interface Authenticate {
    (request: FastifyRequest, reply: FastifyReply): FastifyReply | void;
};

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: Authenticate;
    };
};