import Specification from '../infra/typeorm/entities/Specification';

interface ICreateCarDTO {
    name: string;
    descritpion: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
    specifications?: Specification[];
    id?: string;
}

export default ICreateCarDTO;
