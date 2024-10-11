import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Person } from "../../models/person.model";

interface PersonRaw{
    id:string,
    name:{
        title:string;
        first:string;
        last:string;
    },
    age:number,
    picture:{
        large:string
        thumbnail:string
    }
}

@Injectable({
    providedIn: 'root'
  })
  export class PeopleLocalStorageMapping implements IBaseMapping<Person> {
    getPaginated(page:number, pageSize:number, pages:number, data: PersonRaw[]): Paginated<Person> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Person>((d:PersonRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: PersonRaw): Person {
        return {
            id: data.id, 
            name: {   // Mapeo correcto para el campo `name`
                first: data.name.first,
                last: data.name.last,
                title: data.name.title
            },
            dob: {
                age: data.age,
                date: '' // Proporciona un valor si es necesario
            },
            email: '', // Mapea el campo si está disponible en `PersonRaw`
            phone: '',
            gender: '',
            nat: '',
            location: {
                city: '',
                state: '',
                country: ''
            },
            picture: {
                large: data.picture.large, 
                thumbnail: data.picture.thumbnail
            }
        };
    }
    
    getAdded(data: PersonRaw):Person {
        return this.getOne(data);
    }
    getUpdated(data: PersonRaw):Person {
        return this.getOne(data);
    }
    getDeleted(data: PersonRaw):Person {
        return this.getOne(data);
    }
  }
  