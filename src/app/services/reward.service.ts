import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Reward } from '../models';
import { User } from '../models';

@Injectable() //@Injectable({ providedIn: 'root' })
export class RewardService {
    apiUrl = "http://localhost:8080/springrest/api"
    constructor(private http: HttpClient) { }

    getAllRewards() {
        return this.http.get<Reward[]>(this.apiUrl+'/rewards');
    }

    getAllApprovedRewards() {
        return this.http.get<Reward[]>(this.apiUrl+'/approvedRewards');
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

    // getAttendees(id:Number) {
    //     return this.http.get<User[]>(this.apiUrl+'/event/' + id + '/attendees');
    // }

    // getEventById (id:Number) {
    //     return this.http.get<Event>(this.apiUrl+"/event/"+id);
    // }

    // rejectEventById (id:Number) {
    //     return this.http.put<Event>(this.apiUrl+"/event/reject/"+id,null);
    // }

    // approveEventById (id:Number) {
    //     return this.http.put<Event>(this.apiUrl+"/event/approve/"+id,null);
    // }

    delete(id: Number) {
        return this.http.delete(`${this.apiUrl}/reward/${id}`);
    }

}