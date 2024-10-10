// src/app/core/person.model.ts
import { Model } from "./base.model";

export interface Person extends Model
{
    // He extendido los datos que tiene Person según lo que la API proporciona
    name:{
        first:string,
        last:string,
        title:string
    }

    dob:{
        age:number,
        date:string
    }

    email:string,
    
    phone:string,

    gender:string,

    nat: string,

    location:{
        city:string,
        state:string,
        country:string,
    }

    picture?:{
        large?:string,
        medium?:string,
        thumbnail?:string
    }
}