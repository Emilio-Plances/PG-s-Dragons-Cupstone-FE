import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharacterResponse } from '../interfaces/iresponses';
import { environment } from '../../environments/environment.development';
import { ICharacterList } from '../interfaces/iresponselist';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private http:HttpClient
  ){}

  noLogcharacterURL:string=`${environment.URL}/noAuth/characters`;
  logCharacterURL:string=`${environment.URL}/characters`;

  getAll():Observable<ICharacterList>{
    return this.http.get<ICharacterList>(this.noLogcharacterURL);
  }
  getSingle(id:string):Observable<ICharacterResponse>{
    return this.http.get<ICharacterResponse>(`${this.noLogcharacterURL}/${id}`);
  }
}
