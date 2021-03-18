import { v4 as uuidV4 } from 'uuid';

class Specification {
    id?: string;
    name: string;
    description: String;
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export default Specification;
