import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

private apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

  constructor(private http: HttpClient) { }

  public getAll(url:string) {
    return this.http.get(url);
  }
 
  public getOne(url:string) {
    return this.http.get(`${url}`);
  }

  public getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
}