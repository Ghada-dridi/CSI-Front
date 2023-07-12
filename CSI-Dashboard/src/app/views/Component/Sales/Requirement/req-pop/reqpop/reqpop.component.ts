import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Validators,  FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Availability,WorkField,RequirementStatus,RequirementType, PaymentType, BudgetingType} from 'app/shared/models/req';
import { Currency, Partner } from 'app/shared/models/Partner';
import { CrudPartnerService } from '../../../partner/crudPartner.service';
import { DatePipe } from '@angular/common';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_DATE_FORMATS } from '../../../partner/partner-stepper/partner-stepper.component';

@Component({
  selector: 'app-reqpop',
  templateUrl: './reqpop.component.html',
  styleUrls: ['./reqpop.component.scss'],
  providers: [
    // Provide custom date format
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class ReqpopComponent implements OnInit {

  isNew: boolean

  public itemForm: FormGroup
  sortedCurrencies = Object.values(Currency).sort()
  Availability = Object.values(Availability)
  WorkField :string []= Object.values(WorkField)
  RequirementStatus: string [] = Object.values(RequirementStatus)
  RequirementType = Object.values(RequirementType)
  PaymentType = Object.values(PaymentType)
  budgetingTypes = Object.values(BudgetingType)
  listpartner : Partner [] =[]
  private partnerId : number

  //////////////////////////////////////updates repeat form
  formProfile = new FormGroup({
    candidateNumber: new FormControl(''),
    function: new FormControl(''),
    experienceYears: new FormControl(''),
    comment: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl('')
  });

  public myProfileForm: FormGroup;
  profiles: FormArray;

  repeatForm: FormGroup;
  repeatFormUpdated: FormGroup;
  public showProfilesForm: boolean = false;
  //////////////////////////////////////end updates repeat form

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReqpopComponent>,
    private fb: FormBuilder, 
    private CrudService:CrudPartnerService,
    private _formBuilder: FormBuilder
    //private datePipe: DatePipe
  ) { }



  buildItemForm(item) {
    const profiles = item.profiles && item.profiles.length > 0 ? item.profiles : [];
  
    this.itemForm = this.fb.group({
      title: [item.title || '', Validators.required],
      budgetingType: [item.budgetingType || '', Validators.required],
      averageDayCost: [item.averageDayCost || '', Validators.required],
      currency: [item.currency || '', Validators.required],
      comment: [item.comment || '', Validators.required],
      candidateNumber: [item.candidateNumber || '', Validators.required],
      requirementType: [item.requirementType || '', Validators.required],
      paymentType: [item.paymentType || '', Validators.required],
      responseDate: [item.responseDate || '', Validators.required],
      startDate: [item.startDate || '', Validators.required],
      expectedEndDate: [item.expectedEndDate || '', Validators.required],
      closureDate: [item.closureDate || '', Validators.required],
      availability: [item.availability || '', Validators.required],
      partnerNum: [this.data.partnerId, Validators.required],
      profiles: this.fb.array(profiles.map(profile => this.buildProfileFormGroup(profile)))
    });
  }
  
  buildProfileFormGroup(profile): FormGroup {
    return this.fb.group({
      candidateNumber: [profile.candidateNumber || ''],
      function: [profile.function || '', Validators.required],
      startDate: [profile.startDate || '', Validators.required],
      endDate: [profile.endDate || ''],
      experienceYears: [profile.experienceYears || ''],
      comment: [profile.comment || '']
    });
  }
  


getpartnern(){
this.CrudService.getItems().subscribe((data :any )=>{
  this.listpartner = data
  this.partnerId = this.data.partnerId;
})
}

  ngOnInit() {
    this.buildItemForm(this.data.payload)
    this.getpartnern()
    console.log(this.data.isNew)
    console.log(this.data.payload)
    this.isNew = this.data.isNew 
    //////////////////////////////////////updates repeat form
    this.myProfileForm = this._formBuilder.group({
      profiles: this._formBuilder.array([])  // Initialize profiles as an empty FormArray
    });
    this.buildItemForm(this.data.payload);
    this.repeatForm = this._formBuilder.group({
      repeatArray: this._formBuilder.array([this.createRepeatForm()])
    });
    //////////////////////////////////////end updates repeat form
  }

  //////////////////////////////////////updates repeat form
  get myArrayControls() {
    return (this.myProfileForm.get('profiles') as FormArray).controls;
  }
  createRepeatForm(): FormGroup {
    return this._formBuilder.group({});
  }
  get repeatFormGroup() {
    return this.repeatForm.get('repeatArray') as FormArray;
  }
  handleAddRepeatForm() {
    this.repeatFormGroup.push(this.createRepeatForm());
  }
  handleRemoveRepeatForm(index: number) {
    this.repeatFormGroup.removeAt(index);
    if (index > 0) {
      const repeatArray = this.repeatForm.get('repeatArray') as FormArray;
      repeatArray.removeAt(index);
    }
  }
  addProfileFormGroup(): void {
    const profilesFormArray = this.itemForm.get('profiles') as FormArray;
    profilesFormArray.push(this.fb.group({
      candidateNumber: [''],
      function: ['', Validators.required],
      experienceYears: [''],
      comment: [''],
      startDate: [''],
      endDate: ['']
    }));
  }
  
  removeProfileFormGroup(index: number): void {
    const profilesFormArray = this.itemForm.get('profiles') as FormArray;
    profilesFormArray.removeAt(index);
  }
  toggleProfilesForm(): void {
    const profilesFormArray = this.itemForm.get('profiles') as FormArray;
    if (profilesFormArray.length === 0) {
      profilesFormArray.push(this.fb.group({
        candidateNumber: [''],
        function: ['', Validators.required],
        experienceYears: [''],
        comment: [''],
        startDate: [''],
        endDate: ['']
      }));
    }
    this.showProfilesForm = true; // Always set showProfilesForm to true
  }
  
  //////////////////////////////////////end updates repeat form



  submit() {
    console.log((this.itemForm.value))
    this.dialogRef.close(this.itemForm.value)
  }

  isStartDayVisible(){
    const availability = this.itemForm.get('availability').value
    return this.itemForm.get('availability').value && availability == Availability.FROM
  }

  isResourcesRequirement(){
    const requirementType = this.itemForm.get('requirementType').value
    return this.itemForm.get('requirementType').value && requirementType == RequirementType.RESOURCE
  }

  /*get responseDate() {
    const value = this.itemForm.get('responseDate').value;
    return this.datePipe.transform(value, 'yy/MM/dd');
  }
  
  get startDate() {
    const value = this.itemForm.get('startDate').value;
    return this.datePipe.transform(value, 'yy/MM/dd');
  }
  
  get expectedEndDate() {
    const value = this.itemForm.get('expectedEndDate').value;
    return this.datePipe.transform(value, 'yy/MM/dd');
  }*/

  /*workFieldMap = {
    [WorkField.IT]:'IT',
    [WorkField.INDUSTRY]:'Industrie',
   [WorkField.SALES]:'Ventes',
   [WorkField.AGRICULTURE] :'Agriculture',
   [WorkField.BANKING] :'Banking',
   [WorkField.E_COM] :'E-Commerce',
   [WorkField.ASSURANCE] :'Assurance',
   [WorkField.FINANCE] :'Finance'
  }*/

  paymentTypeMap = {
    [PaymentType.FOR_SETTLEMENT]:'En régie',
    [PaymentType.IN_PACKAGE]:'En forfait'
  }

  reqTypeMap = {
    [RequirementType.RESOURCE]:'Ressource',
    [RequirementType.PROJECT]:'Projet'
  }

  budgetingTypeMap = {
    [BudgetingType.PROPOSED_BUDGET]:'Budget proposé (client)',
    [BudgetingType.ESTIMATED_BUDGET]:'Budget estimé'
  }

  reqStatusMap = {
    [RequirementStatus.IN_PROGRESS] :'En progrès',
    [RequirementStatus.POSITIONED]:'Positionné',
    [RequirementStatus.WON]:'Gagné',
    [RequirementStatus.LOST] :'Perdu',
    [RequirementStatus.ABANDONED] :'Abandonné',
  }

  inverseReqStatusMap = {
    ['En progrès'] :RequirementStatus.IN_PROGRESS,
    ['Positionné']:RequirementStatus.POSITIONED,
    ['Gagné']:RequirementStatus.WON,
    ['Perdu'] :RequirementStatus.LOST,
    ['Abandonné'] :RequirementStatus.ABANDONED,
  };

  availabilityMap = {
    [Availability.ASAP]: "ASAP",
    [Availability.FROM]: "A partir de",
    [Availability.IMMEDIATELY]: "Immédiatement"
  }

  currencyMap: {[key: string]: string} = {
    'AFN': 'AFN - Afghani afghan',
    'AMD': 'AMD - Dram arménien',
    'AUD': 'AUD - Dollar australien',
    'BSD': 'BSD - Dollar bahaméen',
    'BBD': 'BBD - Dollar barbadien',
    'BZD': 'BZD - Dollar bélizien',
    'BMD': 'BMD - Dollar bermudien',
    'BND': 'BND - Dollar brunéien',
    'BIF': 'BIF - Franc burundais',
    'KHR': 'KHR - Riel cambodgien',
    'CAD': 'CAD - Dollar canadien',
    'CVE': 'CVE - Escudo cap-verdien',
    'KYD': 'KYD - Dollar des îles Caïmans',
    'XAF': 'XAF - Franc CFA (BEAC)',
    'XPF': 'XPF - Franc CFP',
    'CLP': 'CLP - Peso chilien',
    'CNY': 'CNY - Yuan renminbi chinois',
    'COP': 'COP - Peso colombien',
    'KMF': 'KMF - Franc comorien',
    'CRC': 'CRC - Colón costaricain',
    'HRK': 'HRK - Kuna croate',
    'CZK': 'CZK - Couronne tchèque',
    'DKK': 'DKK - Couronne danoise',
    'DJF': 'DJF - Franc djiboutien',
    'DOP': 'DOP - Peso dominicain',
    'EGP': 'EGP - Livre égyptienne',
    'ETB': 'ETB - Birr éthiopien',
    'EUR': 'EUR - Euro',
    'FKP': 'FKP - Livre des îles Falkland',
    'FJD': 'FJD - Dollar fidjien',
    'GMD': 'GMD - Dalasi gambien',
    'GEL': 'GEL - Lari géorgien',
    'GHS': 'GHS - Cedi ghanéen',
    'GIP': 'GIP - Livre de Gibraltar',
    'GTQ': 'GTQ - Quetzal guatémaltèque',
    'GNF': 'GNF - Franc guinéen',
    'GYD': 'GYD - Dollar guyanien',
    'HTG': 'HTG - Gourde haïtienne',
    'HNL': 'HNL - Lempira hondurien',
    'HKD': 'HKD - Dollar de Hong Kong',
    'HUF': 'HUF - Forint hongrois',
    'ISK': 'ISK - Couronne islandaise',
    'INR': 'INR - Roupie indienne',
    'IDR': 'IDR - Roupie indonésienne',
    'IRR': 'IRR - Rial iranien',
    'IQD': 'IQD - Dinar iraquien',
    'ILS': 'ILS - Shekel israélien',
    'JPY': 'JPY - Yen japonais',
    'JOD': 'JOD - Dinar jordanien',
    'KZT': 'KZT - Tenge kazakh',
    'KES': 'KES - Shilling kényan',
    'KWD': 'KWD - Dinar koweïtien',
    'LAK': 'LAK - Kip laotien',
    'LBP': 'LBP - Livre libanaise',
    'LRD': 'LRD - Dollar libérien',
    'MGA': 'MGA - Ariary malgache',
    'MWK': 'MWK - Kwacha malawite',
    'MYR': 'MYR - Ringgit malaisien',
    'MUR': 'MUR - Roupie mauricienne',
    'MXN': 'MXN - Peso mexicain',
    'MDL': 'MDL - Leu moldave',
    'MNT': 'MNT - Tugrik mongol',
    'MAD': 'MAD - Dirham marocain',
    'MZN': 'MZN - Metical mozambicain',
    'MMK': 'MMK - Kyat birman',
    'NAD': 'NAD - Dollar namibien',
    'NPR': 'NPR - Roupie népalaise',
    'ANG': 'ANG - Florin antillais',
    'NZD': 'NZD - Dollar néo-zélandais',
    'NIO': 'NIO - Córdoba oro nicaraguayen',
    'NGN': 'NGN - Naira nigérian',
    'NOK': 'NOK - Couronne norvégienne',
    'OMR': 'OMR - Rial omanais',
    'PKR': 'PKR - Roupie pakistanaise',
    'PAB': 'PAB - Balboa panaméen',
    'PGK': 'PGK - Kina papou-néo-guinéen',
    'PYG': 'PYG - Guarani paraguayen',
    'PEN': 'PEN - Sol péruvien',
    'PHP': 'PHP - Peso philippin',
    'PLN': 'PLN - Zloty polonais',
    'QAR': 'QAR - Riyal qatari',
    'RON': 'RON - Leu roumain',
    'RUB': 'RUB - Rouble russe',
    'RWF': 'RWF - Franc rwandais',
    'SHP': 'SHP - Livre de Sainte-Hélène',
    'SVC': 'SVC - Colón salvadorien',
    'SAR': 'SAR - Riyal saoudien',
    'RSD': 'RSD - Dinar serbe',
    'SCR': 'SCR - Roupie seychelloise',
    'SLL': 'SLL - Leone sierra-léonais',
    'SGD': 'SGD - Dollar de Singapour',
    'SOS': 'SOS - Shilling somalien',
    'ZAR': 'ZAR - Rand sud-africain',
    'KRW': 'KRW - Won sud-coréen',
    'SSP': 'SSP - Livre sud-soudanaise',
    'LKR': 'LKR - Roupie srilankaise',
    'SDG': 'SDG - Livre soudanaise',
    'SRD': 'SRD - Dollar surinamais',
    'SZL': 'SZL - Lilangeni swazi',
    'SEK': 'SEK - Couronne suédoise',
    'CHF': 'CHF - Franc suisse',
    'SYP': 'SYP - Livre syrienne',
    'TWD': 'TWD - Dollar taïwanais',
    'TZS': 'TZS - Shilling tanzanien',
    'THB': 'THB - Baht thaïlandais',
    'TOP': 'TOP - Paʻanga tongan',
    'TTD': 'TTD - Dollar de Trinité-et-Tobago',
    'TND': 'TND - Dinar tunisien',
    'TRY': 'TRY - Livre turque',
    'TMT': 'TMT - Manat turkmène',
    'AED': 'AED - Dirham des Émirats arabes unis',
    'UGX': 'UGX - Shilling ougandais',
    'UAH': 'UAH - Hryvnia ukrainienne',
    'UYU': 'UYU - Peso uruguayen',
    'UZS': 'UZS - Sum ouzbek',
    'VUV': 'VUV - Vatu vanuatuan',
    'VEF': 'VEF - Bolivar vénézuélien',
    'VND': 'VND - Dong vietnamien',
    'XOF': 'XOF - Franc CFA (BCEAO)',
    'YER': 'YER - Rial yéménite',
    'ZMW': 'ZMW - Kwacha zambien',
    'ZWL': 'ZWL - Dollar zimbabwéen',
  }
}
