import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { IUsersRepository } from "../interface/users-repository-interface";

export class UserRepository implements IUsersRepository {
    async findById(id: number) {
        return await prisma.user.findUnique({
            where: {
                id,
            },
        });
    };

    async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email
            },
        });
    };

    async insert(data: Prisma.UserCreateInput) {
        return await prisma.user.create({
            data,
        });
    };

    async update(id: number, data: Prisma.UserCreateInput) {
        await prisma.user.update({
            where: {
                id,
            },
            data,
        });
    };
};