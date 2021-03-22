import fs from 'fs';
import csvParse from 'csv-parse';
import ICategoryRepository from '../../repositories/ICategoryRepository';
import { response } from 'express';

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoryRepository: ICategoryRepository) {}

    loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            // read file line by line
            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile
                .on('data', async line => {
                    const [name, description] = line;

                    categories.push({
                        name,
                        description,
                    });
                })
                .on('end', () => {
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on('error', error => {
                    reject(error);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategory(file);

        categories.map(async category => {
            const { name, description } = category;

            const categoryExists = this.categoryRepository.findByName(name);

            if (!categoryExists) {
                this.categoryRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}

export default ImportCategoryUseCase;
