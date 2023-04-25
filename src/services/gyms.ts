import { IGymsRepository } from "../repositories/interface/gyms-repository-interface";

interface RegisterParams {
    name: string;
    imgSrc: string;
    description: string;
    address: string;
    planValue: number;
    userId: number;
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
};