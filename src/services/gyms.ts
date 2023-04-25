import { IGymsRepository } from "../repositories/interface/gyms-repository-interface";

interface RegisterParams {
    name: string;
    imgSrc: string;
    description: string;
    address: string;
    planValue: number;
    userId: number;
};

interface UpdateParams {
    id: string;
    name: string;
    img_src: string;
    description: string;
    address: string;
    cheaper_plan: number;
};

export class GymsService {
    constructor(private gymsRepository: IGymsRepository) { };

    async getGyms(gymId?: string | undefined) {
        return await this.gymsRepository.getGyms(gymId);
    };

    async register({ name, imgSrc, description, address, planValue, userId }: RegisterParams) {
        return await this.gymsRepository.insert({
            data: {
                name,
                img_src: imgSrc,
                description,
                address,
                cheaper_plan: planValue,
                created_by: userId,
            },
        });
    };

    async update({ id, name, img_src, description, address, cheaper_plan }: UpdateParams) {
        return await this.gymsRepository.update({
            id,
            name,
            img_src,
            description,
            address,
            cheaper_plan,
        });
    };

    async delete(gymId: string) {
        return await this.gymsRepository.delete(gymId);
    };
};