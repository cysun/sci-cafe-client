import {User} from './user'
import {Tag} from './tag'
import {Deserializable} from "./deserializable";

export class Reward implements Deserializable{
    id: number;
    name: string;
    description: string;
    providerName: string;
    startTime: Date;
    endTime: Date;
    tags : Set<Tag>;
    criteria:number;
    submitter:User;
    status:number;
    deserialize(input: any): this {
        this.tags = this.tags.add(new Tag().deserialize(input.tags));
        this.submitter = new User().deserialize(input.submitter);
        Object.assign(this, input);
        return this;
    }
}