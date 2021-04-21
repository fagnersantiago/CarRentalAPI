import 'reflect-metadata';
import { container } from 'tsyringe';
import ICategoryRepository from '../../modules/cars/repositories/ICategoryRepository';
import CategoriesRepository from '../../modules/cars/repositories/implementations/CategoriesRepository';
import ISpecificationRepository from '../../modules/cars/repositories/ISpecificationRepository';
import SpecificationRepository from '../../modules/cars/repositories/implementations/SpecificationRepository';
import ICreateUserRepository from '../../modules/accounts/entities/repositories/IUserRepository';
import UserRepository from '../../modules/accounts/entities/implamentation/UserRepository';

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
