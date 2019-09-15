import {Reward} from './reward'
import {Event} from './event'
import {Deserializable} from "./deserializable";

export class Progress implements Deserializable{

    reward: Reward;
    attendedEvents: Set<Event>;
    percentage:number;
    bar:number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}