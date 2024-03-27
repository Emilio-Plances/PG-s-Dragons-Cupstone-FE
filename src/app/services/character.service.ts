import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharacterResponse } from '../interfaces/iresponses';
import { environment } from '../../environments/environment.development';
import { ICharacterList } from '../interfaces/iresponselist';
import { ICharacterRequest, IPutCharacterRequest } from '../interfaces/irequest';


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
  getPublic():Observable<ICharacterList>{
    return this.http.get<ICharacterList>(`${this.noLogcharacterURL}/public`);
  }
  searchByName(name:string):Observable<ICharacterList>{
    return this.http.get<ICharacterList>(`${this.noLogcharacterURL}/name?name=${name}`);
  }
  getById(id:number):Observable<ICharacterResponse>{
    return this.http.get<ICharacterResponse>(`${this.noLogcharacterURL}/${id}`);
  }
  getByUserId(userId:number):Observable<ICharacterList>{
    return this.http.get<ICharacterList>(`${this.logCharacterURL}/${userId}/getChar`)
  }
  edit(char:IPutCharacterRequest):Observable<ICharacterResponse>{
    return this.http.put<ICharacterResponse>(`${this.logCharacterURL}/${char.id}`,char)
  }
  create(newChar:ICharacterRequest):Observable<ICharacterResponse>{
    return this.http.post<ICharacterResponse>(this.logCharacterURL,newChar);
  }
  delete(id:number):Observable<ICharacterResponse>{
    return this.http.delete<ICharacterResponse>(`${this.logCharacterURL}/${id}`);
  }
}
