import { LogService } from '../log-system/service/log.service';
import { IUser } from './../../interfaces/iuser';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  search!:string|null;
  users!:IUser[];
  usersPages!:number
  open:boolean=false

  constructor(
    private route:ActivatedRoute,
    private ls:LogService
  ){}
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      let searchValue = params.get('searchValue');
      if (searchValue) this.search=searchValue;
      if(!this.search) return
      this.ls.searching(this.search,0).subscribe(data=>{
        this.users=data.response.content
        this.usersPages=data.response.totalPages
      });
    });

  }

}
