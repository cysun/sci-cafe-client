import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Reward,Event,Tag} from '../models';
import { User } from '../models';
import { environment } from '../../environments/environment';

@Injectable()
export class RewardService {
    apiUrl = environment.apiUrl;
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

    getAllPendingRewards() {
        return this.http.get<Reward[]>(this.apiUrl+'/pendingRewards');
    }

    getAllRejectedRewards() {
        return this.http.get<Reward[]>(this.apiUrl+'/rejectedRewards');
    }

    getOwnApprovedRewards() {
        return this.http.get<Reward[]>(this.apiUrl+'/ownApprovedRewards');
    }

    getOwnPendingRewards() {
        return this.http.get<Reward[]>(this.apiUrl+'/ownPendingRewards');
    }

    getOwnRejectedRewards() {
        return this.http.get<Reward[]>(this.apiUrl+'/ownRejectedRewards');
    }

    addRewardTag(id: number,tags:Set<Tag>) {
        return this.http.put(`${this.apiUrl}/addRewardTag/${id}`,Array.from(tags.values()));
    }

    addEventToRewardById(id: number,eid:number) {
        return this.http.put(`${this.apiUrl}/addRewardEvent/${id}/${eid}`,[]);
    }

    deleteEventFromRewardById(id: number,eid:number) {
        return this.http.put(`${this.apiUrl}/deleteRewardEvent/${id}/${eid}`,[]);
    }

    addReward(reward:Reward) {
        return this.http.post(this.apiUrl+'/rewards',reward);
    }

    getRewardById (id:Number) {
        return this.http.get<Reward>(this.apiUrl+"/reward/"+id);
    }

    editReward(reward: Reward,id: Number) {
        const formdata: FormData = new FormData();

        formdata.append('name', reward.name);
        formdata.append('description',reward.description);
        formdata.append('startDate',reward.startDate.toString());
        formdata.append('endDate',reward.endDate.toString());
        formdata.append('criteria',reward.criteria.toString());
        formdata.append('status',reward.status.toString());
        return this.http.put(`${this.apiUrl}/reward/${id}`,formdata);
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

    deleteTag(id: number,tid:number) {
        return this.http.put(`${this.apiUrl}/deleteRewardTag/${id}/${tid}`,[]);
    }
}