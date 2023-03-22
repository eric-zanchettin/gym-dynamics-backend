import { Prisma, User } from "@prisma/client";

export interface IUsersRepository {
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    insert(data: Prisma.UserCreateInput): Promise<User>;
    update(id: number, data: Prisma.UserCreateInput): void;
};