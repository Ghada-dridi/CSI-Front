import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resource.service';
import { Resource } from 'app/shared/models/Resource';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-resource',
  templateUrl: './view-resource.component.html',
  styleUrls: ['./view-resource.component.scss']
})
export class ViewResourceComponent implements OnInit {
public resource : Resource;
public id : number;
photoUrl : any
  constructor(private resourceService : ResourceService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getResource()
  }
getResource(){
  this.resourceService.getItem(this.id).subscribe((data: any) => {
    this.resource = data;
    console.log(data)

  });
}
}
