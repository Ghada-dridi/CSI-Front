import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudPartnerService } from '../../partner/crudPartner.service';
import { Partner } from 'app/shared/models/Partner';
import { contact } from 'app/shared/models/contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent implements OnInit {

  id: number
  contact: contact
  partner: Partner

  constructor(private route: ActivatedRoute,
    private contactService: ContactService,
    private crudPartnerService: CrudPartnerService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['iiid'];
    this.getContact();
    this.getPartner();

    console.log(this.id)
  }

  getContact() {
    this.contactService.getItem(this.id).subscribe((data: any) => {
      this.contact = data;

    });
  }

  getPartner() {
    this.crudPartnerService.getItem(this.id).subscribe((data: any) => {
      this.partner = data;

    });
  }
}
