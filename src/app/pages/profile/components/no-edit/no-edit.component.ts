import { Component, Input } from '@angular/core';
import { IUser } from '../../../../interfaces/iuser';
import { ActivatedRoute } from '@angular/router';
import { LogService } from '../../../log-system/service/log.service';

@Component({
  selector: 'app-no-edit',
  templateUrl: './no-edit.component.html',
  styleUrl: './no-edit.component.scss'
})
export class NoEditComponent {
  @Input() user!:IUser|undefined;

  constructor(
    private route:ActivatedRoute,
    private ls:LogService
  ){}
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      let idString:string|null = params.get('id');
      if (!idString) return;
      let id:number=parseInt(idString);
      this.ls.getById(id).subscribe(data=>{
        if (!data.response) return
        this.user=data.response
      })
    })
  }
}
