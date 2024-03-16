import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IListSpell } from '../interfaces/ilistresponse';
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

  getAllAsc(pageNumber:number):Observable<IListSpell>{
    return this.http.get<IListSpell>(`${this.spellURL}?page=${pageNumber}&size=${this.pageSize}`)
  }
  searchByName(name:string):Observable<IListSpell>{
    return this.http.get<IListSpell>(`${this.spellURL}/name?name=${name}`);
  }
  getSingleById(id:number):Observable<ISpellResponse>{
    return this.http.get<ISpellResponse>(`${this.spellURL}/${id}`)
  }
}
