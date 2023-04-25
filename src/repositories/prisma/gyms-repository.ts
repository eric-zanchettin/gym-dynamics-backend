import { Prisma, Gym } from "@prisma/client";
import { IGymsRepository } from "../interface/gyms-repository-interface";
import { prisma } from "../../lib/prisma";

interface UpdateParams {
    id: string;
    name: string;
    img_src: string;
    description: string;
    address: string;
    cheaper_plan: number;
};

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

    async update(data: UpdateParams): Promise<Gym> {
        return await prisma.gym.update({
            data: {
                name: data.name,
                img_src: data.img_src,
                description: data.description,
                cheaper_plan: data.cheaper_plan,
                address: data.address,
            },
            where: {
                id: data.id,
            },
        });
    };

    async delete(gymId: string) {
        return await prisma.gym.delete({
            where: { id: gymId },
        });
    };
};