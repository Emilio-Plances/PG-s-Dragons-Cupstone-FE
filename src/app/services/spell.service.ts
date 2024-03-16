import { IPageSpell } from './../interfaces/ipage-spell';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ISingleSpell } from '../interfaces/isingle-spell';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpellService {

  spellURL:string=`${environment.URL}/noAuth/spells`
  pageSize:number=10

  constructor(
    private http:HttpClient,
  ){}

  getAll(pageNumber:number):Observable<IPageSpell>{
    return this.http.get<IPageSpell>(`${this.spellURL}?page=${pageNumber}&size=${this.pageSize}`)
  }
  searchByName(name:string, pageNumber:number=0):Observable<IPageSpell>{
    return this.http.get<IPageSpell>(`${this.spellURL}/name?name=${name}&pageNumber=${pageNumber}&size=${this.pageSize}`);
  }
  getSingleById(id:number):Observable<ISingleSpell>{
    return this.http.get<ISingleSpell>(`${this.spellURL}/${id}`)
  }
}
