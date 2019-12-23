import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";
import {Tag} from "../../models/tag"

@Pipe({
    name: "search"
})

export class SearchPipe implements PipeTransform {
    transform(items: any[], field : any, value : string): any[] {
        console.log(value);
        if (value == null||value =="") {
        }
        if (!items) return [];  
        if(typeof field == 'string'){ 
            let rtItems:any = items;
            try{
                rtItems = items.filter(it => it[field].toLowerCase().indexOf(value.toLowerCase()) > -1 );
            }finally{
                return rtItems;
            }
        }else{ 
            let rtItems:any = items;
            try{
                rtItems = items.filter(it => {
                    if (it['reward']) {
                        for (let t of Array.from(it['reward'].tags)) {
                            let tag = t as Tag;
                            console.log(tag.name);
                            if (tag.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1) {
                                return true;
                            }
                        }
                        if(it['reward'].name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1) {
                            return true;
                        }
                        if(it['reward'].description.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1) {
                            return true;
                        }
                        return false;
                    }
                    for(let f of field){
                        if(it[f].toLowerCase().indexOf(value.toLowerCase()) > -1){
                            console.log("xxxxx");
                            return true;
                        }
                    }
                    if (it['tags']) {
                        for (let tag of Array.from(it['tags'])) {
                            let t = tag as Tag;
                            if (t.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1) {
                                return true;
                            }
                        }
                    }
                });
            }finally{
                return rtItems;
            }
        }


    }
}

