import {Deserializable} from "./deserializable";

export class News implements Deserializable{
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    isTop:string;
    postedDate:Date;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}