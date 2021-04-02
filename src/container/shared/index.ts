import 'reflect-metadata';
import { container } from 'tsyringe';
import ICategoryRepository from '../../modules/cars/repositories/ICategoryRepository';
import CategoriesRepository from '../../modules/cars/repositories/implementations/CategoriesRepository';
import ISpecificationRepository from '../../modules/cars/repositories/ISpecificationRepository';
import SpecificationRepository from '../../modules/cars/repositories/implementations/SpecificationRepository';

container.registerSingleton<ICategoryRepository>(
    'CategoriesRepository',

    CategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
    'SpecificationRepository',

    SpecificationRepository,
);
