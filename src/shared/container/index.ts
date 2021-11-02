import 'reflect-metadata';
import { container } from 'tsyringe';
import ICategoryRepository from '../../modules/cars/repositories/ICategoryRepository';
import CategoriesRepository from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';
import ISpecificationRepository from '../../modules/cars/repositories/ISpecificationRepository';
import SpecificationRepository from '../../modules/cars/infra/typeorm/repositories/SpecificationRepository';
import ICreateUserRepository from '../../modules/accounts/repositories/IUserRepository';
import UserRepository from '../../modules/accounts/infra/typeorm/repositories/UserRepository';
import ICarRepository from '../../modules/cars/repositories/ICarRepository';
import CarsRepository from '../../modules/cars/infra/typeorm/repositories/CarRepository';

container.registerSingleton<ICategoryRepository>(
    'CategoriesRepository',

    CategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
    'SpecificationRepository',

    SpecificationRepository,
);

container.registerSingleton<ICreateUserRepository>(
    'UserRepository',
    UserRepository,
);

container.registerSingleton<ICarRepository>('CarsRepository', CarsRepository);
