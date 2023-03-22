import { FastifyInstance } from "fastify";
import { login, registerUser, updatePassword } from "./controllers/users";

export async function appRoutes(app: FastifyInstance) {
    app.post('/login', login);
    app.post('/users', registerUser);
    app.put(
        '/users',
        {
            onRequest: [app.authenticate]
        },
        updatePassword
    );
};