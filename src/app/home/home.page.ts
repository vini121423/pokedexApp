import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public pokemonList: any = [];
  public listagemDePokemons: any = [];
  public qtdePokemons:number;
  
  public page = 1; 
  public totalPages = 105;
  
  public next: string;
  public previous:string;
  
  private apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
  
/* CÓDIGO DA PAGINAÇÃO COM AUXÍLIO DE LEONARDO E CARLOS EDUARDO */

  constructor(private apiService: ApiService) { }

  ionViewWillEnter() {
    this.listarPokemons(1);
  }

  public listarPokemons(page: number) {
	  if(page <= 0){
		  page = 1;
	  }
	  
	  this.page = page

    this.apiService.getAll(this.apiUrl).subscribe(dados => {
      this.pokemonList = [];
      this.qtdePokemons = dados['count'];
	  
	  this.next = dados['next'];
	  this.previous = dados['previous'];
	  

      let listaPokemons = dados['results'];

      for(let pokemon of listaPokemons) {
        this.apiService.getOne(pokemon.url).subscribe(dadosPokemons => {
          this.pokemonList.push(dadosPokemons);
		  
		  this.ordernacao();
        });
                
      }

    });
  }
  
  public proximaPagina(){
	  this.apiUrl = this.next;
	  this.listarPokemons(this.page + 1);
  }
  
   public paginaAnterior(){
	  this.apiUrl = this.previous;
	  this.listarPokemons(this.page - 1);
  }
  
  private ordernacao(){
	 this.pokemonList.sort((a,b) =>{
	 if(a.id > b.id){
        return 1;
	 } 
     if(a.id < b.id){
        return -1;
	 }	
      return 0;	 
	 });
  }
  


}
