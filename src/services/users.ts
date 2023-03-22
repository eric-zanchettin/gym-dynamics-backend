import { IUsersRepository } from "../repositories/interface/users-repository-interface";
import { compare, hash } from "bcrypt";
import { UserAlreadyExistsError, UserNotFoundError, UserPasswordNotMatchError } from "../errors";

interface LoginParams {
    email: string;
    password: string;
};

interface RegisterParams {
    name: string;
    email: string;
    password: string;
    admin: boolean;
};

interface UpdatePasswordParams {
    id: number;
    actualPassword: string;
    newPassword: string;
};

export class UsersService {
    constructor(private usersRepository: IUsersRepository) { };

    async login({ email, password }: LoginParams) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) throw new UserNotFoundError();

        const passwordMatch = await compare(password, user.password_hash);
        if (!passwordMatch) throw new UserPasswordNotMatchError();

        return user;
    };

    async register({ name, email, password, admin }: RegisterParams) {
        const userWithSameEmail = await this.usersRepository.findByEmail(email);
        if (userWithSameEmail) throw new UserAlreadyExistsError();

        const password_hash = await hash(password, 6);

        const data = {
            name,
            email,
            password_hash,
            admin
        };

        await this.usersRepository.insert(data);
    };

    async updatePassword({ id, actualPassword, newPassword }: UpdatePasswordParams) {
        const user = await this.usersRepository.findById(id);
        if (!user) throw new UserNotFoundError();

        const passwordMatch = await compare(actualPassword, user.password_hash);
        if (!passwordMatch) throw new UserPasswordNotMatchError();

        user.password_hash = await hash(newPassword, 6);

        await this.usersRepository.update(id, user);
    };
};