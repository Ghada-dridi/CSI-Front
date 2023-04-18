import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { contact } from 'app/shared/models/contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent implements OnInit {

  id: number
  contact: contact

  constructor(private route: ActivatedRoute,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['iiid'];
    this.getContact();

    console.log(this.id)
  }

  getContact() {
    this.contactService.getItem(this.id).subscribe((data: any) => {
      this.contact = data;

    });
  }
}
