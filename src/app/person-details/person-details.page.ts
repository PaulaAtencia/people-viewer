import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from '../core/services/impl/people.service';
import { Person } from '../core/models/person.model';
import { PersonStorageService } from '../core/services/impl/person-storage.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
})
export class PersonDetailsPage implements OnInit {
  // Nuestra persona que vamos a visualizar
  person?: Person;

  constructor(
    private peopleService: PeopleService,
    private personStorageService: PersonStorageService // Datos de la persona 
  ) {}

  ngOnInit() 
  {
    // Obtener la persona almacenada
    this.person = this.personStorageService.getPerson();

    // Verificar si no hay persona almacenada
    if (!this.person) {
      console.error('No hay persona seleccionada.');
    }
  }
}
