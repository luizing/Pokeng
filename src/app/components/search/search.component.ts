import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, CardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  private http = inject(HttpClient);

  showCard = false;
  pokemonName = "";
  pokemons:any = [];
  sprite="";

  searchForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.http
      .get("https://pokeapi.co/api/v2/pokemon")
      .subscribe((response:any) => {
       response.results.forEach((element:any) =>{
        this.http
        .get(element.url)
        .subscribe((pokemon:any) => {
          this.pokemons.push(pokemon)
        });
       });
        
       });
      };

  onSubmit() {
    this.showCard = true;
    const name = this.searchForm.value.name;
    console.log(name);
    this.http
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .subscribe((result:any) => {
        console.log(result);
        this.pokemonName = result.name;
        this.sprite = result.sprites.front_default;
      });
  }

}
