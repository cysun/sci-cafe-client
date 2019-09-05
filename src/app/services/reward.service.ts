import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Reward,Event} from '../models';
import { User } from '../models';

@Injectable() //@Injectable({ providedIn: 'root' })
export class RewardService {
    apiUrl = "http://localhost:8080/springrest/api"
    constructor(private http: HttpClient) { }

    getAllRewards() {
        return this.http.get<Reward[]>(this.apiUrl+'/rewards');
    }

    getOwnRewards() {
        return this.http.get<Reward[]>(this.apiUrl+'/ownrewards');
    }

    getQualifiedEvents(id:number) {
        return this.http.get<Event[]>(`${this.apiUrl}/reward/${id}/events`);
    }

    getWinner(id:number) {
        return this.http.get<User[]>(`${this.apiUrl}/reward/${id}/users`);
    }

    getAllApprovedRewards() {
        return this.http.get<Reward[]>(this.apiUrl+'/approvedRewards');
    }

    addRewardTag(id: number,tid:number) {
        return this.http.put(`${this.apiUrl}/addRewardTag/${id}/${tid}`,[]);
    }

    addEventToRewardById(id: number,eid:number) {
        return this.http.put(`${this.apiUrl}/addRewardEvent/${id}/${eid}`,[]);
    }

    addReward(reward:Reward) {
        return this.http.post(this.apiUrl+'/rewards',reward);
    }

    getRewardById (id:Number) {
        return this.http.get<Reward>(this.apiUrl+"/reward/"+id);
    }

    editReward(reward: Reward,id: Number) {
        return this.http.put(`${this.apiUrl}/reward/${id}`,reward);
    }

    rejectRewardById (id:Number) {
        return this.http.put<Event>(this.apiUrl+"/reward/reject/"+id,null);
    }

    approveRewardById (id:Number) {
        return this.http.put<Event>(this.apiUrl+"/reward/approve/"+id,null);
    }

    delete(id: Number) {
        return this.http.delete(`${this.apiUrl}/reward/${id}`);
    }

}