import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ISpellList } from '../interfaces/iresponselist';
import { ISpellResponse } from '../interfaces/iresponses';



@Injectable({
  providedIn: 'root'
})
export class SpellService {

  spellURL:string=`${environment.URL}/noAuth/spells`
  pageSize:number=10

  constructor(
    private http:HttpClient,
  ){}

  getAll():Observable<ISpellList>{
    return this.http.get<ISpellList>(this.spellURL)
  }
  searchByName(name:string):Observable<ISpellList>{
    return this.http.get<ISpellList>(`${this.spellURL}/name?name=${name}`);
  }
  getSingleById(id:number):Observable<ISpellResponse>{
    return this.http.get<ISpellResponse>(`${this.spellURL}/${id}`)
  }
}
