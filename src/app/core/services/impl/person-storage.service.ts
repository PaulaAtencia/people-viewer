// src/app/core/services/person-storage.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../../models/person.model';

@Injectable({
  providedIn: 'root',
})

// Esto es un servicio que guarda los datos de la persona que verás sus detalles en la página de person-details

export class PersonStorageService 
{
  private selectedPersonSubject = new BehaviorSubject<Person | undefined>(undefined);
  selectedPerson$ = this.selectedPersonSubject.asObservable();

  // Guardar 
  selectPerson(person: Person) {
    this.selectedPersonSubject.next(person);
  }

  // Borrar
  clearPerson() {
    this.selectedPersonSubject.next(undefined);
  }

  // Obtener
  getPerson(): Person | undefined {
    return this.selectedPersonSubject.value;
  }
}
