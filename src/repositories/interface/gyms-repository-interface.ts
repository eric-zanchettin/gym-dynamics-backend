import { Prisma, Gym } from "@prisma/client";

interface UpdateParams {
    id: string;
    name: string;
    img_src: string;
    description: string;
    address: string;
    cheaper_plan: number;
};

export interface IGymsRepository {
    getGyms(gymId?: string | undefined): Promise<Gym[] | Gym | null>;
    insert(data: Prisma.GymCreateArgs): Promise<Gym>;
    update(data: UpdateParams): Promise<Gym>;
    delete(gymId: string): Promise<Gym | null>;
};