import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PeopleService } from '../core/services/impl/people.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Person } from '../core/models/person.model';
import { PersonStorageService } from '../core/services/impl/person-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit
{
  // Cambiado los Any por Person
  _people:BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
  people$:Observable<Person[]> = this._people.asObservable();

  constructor(
    private animationCtrl: AnimationController,
    private peopleSv:PeopleService,
    private router: Router,
    public personStorage: PersonStorageService // Servicio que guarda la persona seleccionada
  ) {}

  ngOnInit(): void {
    this.peopleSv.getAll().subscribe({
      next:(response:any)=>{
        this._people.next(response['results'])
        console.log(response.results);
      }
    });
  }


  @ViewChildren('avatar') avatars!: QueryList<ElementRef>;
  @ViewChild('animatedAvatar') animatedAvatar!: ElementRef;
  @ViewChild('animatedAvatarContainer') animatedAvatarContainer!: ElementRef;

  // Cambiado Any por Person
  selectedPerson?: Person = undefined;
  isAnimating = false;

  getPeople() {
    // Suscribimos al Observable people$ y asignamos los datos
    this.peopleSv.getAll().subscribe({
      next: (people) => {
        this._people.next(people);
      },
      error: (err) => {
        console.error('Error al obtener las personas', err);
      }
    });
  }
  

  async openPersonDetail(person: Person, index: number) 
  {
    this.personStorage.selectPerson(person); // Almacenar la persona seleccionada
    this.selectedPerson = person;

    const avatarElements = this.avatars.toArray();
    const clickedAvatar = avatarElements[index].nativeElement;

    // Obtener las coordenadas del avatar clicado
    const avatarRect = clickedAvatar.getBoundingClientRect();

    // Mostrar el contenedor animado
    this.isAnimating = true;

    // Configurar la posición inicial de la imagen animada
    const animatedAvatarElement = this.animatedAvatar.nativeElement as HTMLElement;
    animatedAvatarElement.style.position = 'absolute';
    animatedAvatarElement.style.top = `${avatarRect.top}px`;
    animatedAvatarElement.style.left = `${avatarRect.left}px`;
    animatedAvatarElement.style.width = `${avatarRect.width}px`;
    animatedAvatarElement.style.height = `${avatarRect.height}px`;

    // Crear la animación
    const animation = this.animationCtrl.create()
      .addElement(animatedAvatarElement)
      .duration(500)
      .easing('ease-out')
      .fromTo('transform', 'translate(0, 0) scale(1)', `translate(${window.innerWidth / 2 - avatarRect.left - avatarRect.width / 2}px, ${window.innerHeight / 2 - avatarRect.top - avatarRect.height / 2}px) scale(5)`);

    // Iniciar la animación
    await animation.play()

    // Al finalizar la animación, navega a otra vista para más detalles
    this.router.navigate(['/person-details']);

    // Resetear la animación después de completarla
    this.isAnimating = false;
  }

}
