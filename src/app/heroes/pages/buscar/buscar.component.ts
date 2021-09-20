import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  constructor(private heroesService:HeroesService) { }

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined ;

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getsugerencias(this.termino.trim())
    .subscribe(heroes => this.heroes = heroes);
  }

  opcionSeleccionada(event:MatAutocompleteSelectedEvent){

    // TODO:  validar el string vacio


    if (!event.option.value){
      console.log("No hay valor");
      this.heroeSeleccionado=undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroePorID(heroe.id!)
    .subscribe(heroe => this.heroeSeleccionado = heroe);

  }
}
