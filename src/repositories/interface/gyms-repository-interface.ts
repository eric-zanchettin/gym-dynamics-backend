import { Prisma, Gym } from "@prisma/client";

export interface IGymsRepository {
    getGyms(gymId?: string | undefined): Promise<Gym[] | Gym | null>;
    insert(data: Prisma.GymCreateArgs): Promise<Gym>;
};