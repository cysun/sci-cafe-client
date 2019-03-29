import {Program} from './program'
import {Role} from './role'
import {Event} from './event'
import {Deserializable} from "./deserializable";

export class User implements Deserializable{
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    roles: Set<Role>;
    position: string;
    unit: string;
    program:Program;
    title:string;
    email:string;
    events: Set<Event>;

    deserialize(input: any): this {
        Object.assign(this, input);
        // this.programs = new Program().deserialize(input.programs);
        // this.role = new Role().deserialize(input.role)
        return this;
    }
}