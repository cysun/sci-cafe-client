import {Deserializable} from "./deserializable";

export class News implements Deserializable{
    id: number;
    title: string;
    content: string;
    isTop:string;
    postedDate:Date;
    author:string;
    imageUrl:string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}