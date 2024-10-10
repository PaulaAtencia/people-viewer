// src/app/repositories/repository.factory.ts
import { FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepositoryHttpService } from './impl/base-repository-http.service';
import { IBaseRepository } from './intefaces/base-repository.interface';
import { Person } from '../models/person.model';
import { PEOPLE_API_URL, PEOPLE_REPOSITORY_TOKEN } from './repository.tokens';
// Importa otros modelos según sea necesario

export function createHttpRepository<T>(http: HttpClient, apiUrl: string): IBaseRepository<T> {
  return new BaseRepositoryHttpService<T>(http, apiUrl);
}

// Ejemplo de configuración para People
export const PeopleRepositoryFactory: FactoryProvider = {
  provide: PEOPLE_REPOSITORY_TOKEN,
  useFactory: (http: HttpClient, apiURL:string) => {
    // Aquí puedes decidir qué implementación usar
    // Por ejemplo, usar Firebase:
    return createHttpRepository<Person>(http, apiURL);
  },
  deps: [HttpClient, PEOPLE_API_URL]
};

// Repite esto para otros modelos como Usuario, etc.
