import { User } from './user'
import { Tag } from './tag'
import { Deserializable } from "./deserializable";

export class Event implements Deserializable {
    id: number;
    name: string;
    description: string;
    location: string;
    eventDate: Date;
    startTime: Date;
    endTime: Date;
    status: number;
    tags: Set<Tag>;
    tagIds: Set<number>;
    organizer: User;
    attendees: Set<User>;
    imageUrl: string;
    deserialize(input: any): this {
        Object.assign(this, input);
        this.tags = this.tags.add(new Tag().deserialize(input.tags));
        this.organizer = new User().deserialize(input.organizer);
        return this;
    }
}