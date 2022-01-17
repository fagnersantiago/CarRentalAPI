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
import ICarImageRepository from '../../modules/cars/repositories/ICarImageRepository';
import CarImagesRepository from '../../modules/cars/infra/typeorm/repositories/CarImagesRepository';
import IRentalRepository from '../../modules/rentals/repository/IRentalRepository';
import RentalRepository from '../../modules/rentals/infra/typeorm/repository/RentalRepository';
import IUsersTokens from '../../modules/accounts/repositories/IUsersTokens';
import UserTokenRepository from '../../modules/accounts/infra/typeorm/repositories/UserTokenRepository';

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

container.registerSingleton<ICarImageRepository>(
    'CarImagesRepository',
    CarImagesRepository,
);

container.registerSingleton<IRentalRepository>(
    'RentalRepository',
    RentalRepository,
);

container.registerSingleton<IUsersTokens>(
    'UsersTokensRepository',
    UserTokenRepository,
);
