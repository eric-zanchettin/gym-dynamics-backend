import { Prisma, Gym } from "@prisma/client";
import { IGymsRepository } from "../interface/gyms-repository-interface";
import { prisma } from "../../lib/prisma";

export class GymsRepository implements IGymsRepository {
    async getGyms(gymId?: string | undefined): Promise<Gym[] | Gym | null> {
        if (gymId) {
            return await prisma.gym.findFirst({
                where: {
                    id: gymId,
                },
                include: {
                    User: {
                        select: {
                            email: true,
                        },
                    },
                },
            });
        } else {
            return await prisma.gym.findMany();
        };
    };

    async insert(data: Prisma.GymCreateArgs): Promise<Gym> {
        return await prisma.gym.create(data);
    };
};