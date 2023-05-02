import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { contact } from 'app/shared/models/contact';
import { req } from 'app/shared/models/req';
import { ReqService } from '../req.service';

@Component({
  selector: 'app-req-detail',
  templateUrl: './req-detail.component.html'
})
export class ReqDetailComponent implements OnInit {
  id: number
  req: req

  constructor(private route: ActivatedRoute,
    private reqService: ReqService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getReq()

    console.log(this.id)
  }

  getReq(){
    this.reqService.getItem(this.id).subscribe((data: any) => {
      this.req = data;
    })
  }

  
}
