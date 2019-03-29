import {Deserializable} from "./deserializable";

export class Program implements Deserializable{
    id: number;
    name: string;
    fullName: string;
    description: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}