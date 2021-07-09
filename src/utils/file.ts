import fs from 'fs';

export const deleteFile = async (filename: string) => {
    try {
        //verify if extits file
        await fs.promises.stat(filename);
    } catch (error) {
        return;
    }
    //if exist file then delete file
    await fs.promises.unlink(filename);
};
