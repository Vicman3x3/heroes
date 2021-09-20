import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;

  constructor(
    private heroeService  : HeroesService,
    private activateRoute : ActivatedRoute,
    private router        : Router,
  ) { }

  ngOnInit(): void {
    this.activateRoute.params
       .pipe(
         switchMap(({ id }) => this.heroeService.getHeroePorID(id)),
         tap(console.log)
 )
  .subscribe((heroe) => (this.heroe=heroe));
  }

  regresar(){
this.router.navigate(['heroes/listado']);
  }
}
