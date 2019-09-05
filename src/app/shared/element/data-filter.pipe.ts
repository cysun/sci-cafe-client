import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilter"
})

export class DataFilterPipe implements PipeTransform {
    transform(items: any[], field : any, value : string): any[] {
        if (value == null||value =="") {
            value = "xxxxxxxxxxxxxxxxxxxxxxxxxxx";
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
                    for(let f of field){
                        if(it[f].toLowerCase().indexOf(value.toLowerCase()) > -1){
                            return true;
                        }
                    }
                });
            }finally{
                return rtItems;
            }
        }


    }
}

