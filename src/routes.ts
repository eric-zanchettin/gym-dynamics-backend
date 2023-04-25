import { FastifyInstance } from "fastify";
import { login, registerUser, updatePassword } from "./controllers/users";
import { deleteGym, getGyms, registerGym, updateGym } from "./controllers/gyms";

export async function appRoutes(app: FastifyInstance) {
    // USERS RELATED
    app.post('/login', login);
    app.post('/users', registerUser);
    app.put(
        '/users',
        {
            onRequest: [app.authenticate]
        },
        updatePassword,
    );

    // GYMS RELATED
    app.get(
        '/gyms',
        {
            onRequest: [app.authenticate],
        },
        getGyms,
    )
    app.get(
        '/gyms/:gymId',
        {
            onRequest: [app.authenticate],
        },
        getGyms,
    )
    app.post(
        '/gyms',
        {
            onRequest: [app.authenticate],
        },
        registerGym,
    );
    app.put(
        '/gyms',
        {
            onRequest: [app.authenticate],
        },
        updateGym,
    );
    app.delete(
        '/gyms',
        {
            onRequest: [app.authenticate],
        },
        deleteGym,
    );
};