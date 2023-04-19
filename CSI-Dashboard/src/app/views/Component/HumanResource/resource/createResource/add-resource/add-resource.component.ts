import { FeeType, Currency } from './../../../../../../shared/models/contract';
import { ContractService } from './../contract.service';
import { AddResourceService } from './../add-resource.service';
import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Civility, Country, EmployeeStatus, MaritalSituation, Provenance, Resource, Title, WorkLocation } from 'app/shared/models/Resource';
import { FileUploader } from 'ng2-file-upload';
import { contract } from 'app/shared/models/contract';
import { MatTabGroup } from '@angular/material/tabs';




@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})


export class AddResourceComponent implements OnInit {
  panelOpenState = false;
  showLocationName = false;



  




  
  repeatForm : FormGroup;


  public uploader: FileUploader = new FileUploader({ url: 'https://evening-anchorage-315.herokuapp.com/api/' });
  public hasBaseDropZoneOver: boolean = false;
  console = console;

  basicForm: UntypedFormGroup;
  myForm:FormGroup;
  myFormContract:FormGroup;
  myFormExceptionalFee:FormGroup;

  listResource : Resource [] =[];

  civilities = Object.keys(Civility).filter((element) => {
    return isNaN(Number(element));
  });
  
  Title = Object.values(Title).filter((element) => {
    return isNaN(Number(element));
  });
  EmployeeStatus = Object.values(EmployeeStatus).filter((element) => {
    return isNaN(Number(element));
  });
  Country = Object.values(Country).filter((element) => {
    return isNaN(Number(element));
  });
  MaritalSituation = Object.values(MaritalSituation).filter((element) => {
    return isNaN(Number(element));
  });
  Provenance = Object.values(Provenance).filter((element) => {
    return isNaN(Number(element));
  });
  WorkLocation = Object.values( WorkLocation).filter((element) => {
    return isNaN(Number(element));
  });
  FeeTypes = Object.values( FeeType).filter((element) => {
    return isNaN(Number(element));
  });
  Currency = Object.values( Currency).filter((element) => {
    return isNaN(Number(element));
  });

  
  documents: string[] = ['CIN', 'CV', 'Lettre de motivation', 'Photo'];

  submitted = false;
  selectedEmployee = {lastName:"" , firstName:"",id:null};
  //selectedContract = {id:null};

  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
   
    private addResourceService :AddResourceService ,
    private contractService : ContractService,
    ) 
    { 
      
    }

    firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    getResource(){
      this.addResourceService.getItems().subscribe((data :any )=>{
        this.listResource = data
      });
      
      }
  ngOnInit() : void{
    
    this.repeatForm = this.fb.group({
      repeatArray: this.fb.array([this.createRepeatForm()])
    });
    /*
    this.repeatForm.addControl('contractId', this.myFormExceptionalFee.controls.contractId);
    this.repeatForm.addControl('feeType', this.myFormExceptionalFee.controls.feeType);
    this.repeatForm.addControl('shortDescription', this.myFormExceptionalFee.controls.shortDescription);
    this.repeatForm.addControl('amount', this.myFormExceptionalFee.controls.amount);
    this.repeatForm.addControl('currency', this.myFormExceptionalFee.controls.currency);
    this.repeatForm.addControl('name', this.myFormExceptionalFee.controls.name);*/
    
    
    
    console.log("before  init");

    this.myForm = new FormGroup({
      lastName : new FormControl('', Validators.required),
      firstName : new FormControl('', Validators.required), 
      birthDate : new FormControl ('', Validators.required),
      emailOne : new FormControl('', Validators.required),
      emailTwo : new FormControl('', Validators.required),
      address : new FormControl('', Validators.required),
      phoneNumberOne: new FormControl('', Validators.required),
      phoneNumberTwo:new FormControl('', Validators.required),
      postCode :new FormControl('', Validators.required),
      city : new FormControl('', Validators.required),
      workLocation : new FormControl('', Validators.required),
     //  experience : new FormControl('', Validators.required),
     // experienceDetails : new FormControl('', Validators.required),
     // employeeFirstName : new FormControl('', Validators.required),
     // employeeLastName : new FormControl('', Validators.required),
     // employeeSerialNumber : new FormControl('', Validators.required),
      civility : new FormControl('', Validators.required),
      title : new FormControl('', Validators.required),
     // employeeStatus : new FormControl('', Validators.required),
    
      country : new FormControl('', Validators.required),
      maritalSituation : new FormControl('', Validators.required),
     locationName : new FormControl('', Validators.required),
      socialSecurityNumber : new FormControl('', Validators.required),
     // provenance : new FormControl('', Validators.required), 
  })

  /****** FormBuilder contract *********************/
  this.myFormContract = new FormGroup({
    resourceId:new FormControl({value:'' , disabled:true}),
    contractTitle : new FormControl('', Validators.required), 
    startDate : new FormControl('', Validators.required), 
    endDate : new FormControl ('', Validators.required),
      editorContent : new FormControl('<p>test</p>', Validators.required),
      campanyArticle: new FormControl(`<p>Le présent contrat est conclu entre les parties signataires ci-après :<br>La Société CSI DIGITAL, SARL, au Capital de 10 000 dinars tunisiens dont le Siège Social est sis au Parc d&apos;Activité Economique de Bizerte, inscrite au Registre National des Entreprise sous le numéro 1764694X représentée par son Gérant M&apos;hamed Khamassi.<br>En sa qualité d&apos;employeur d&apos;une part <br>1. ET,<br> Mr ……….. de nationalité Tunisienne, né(e) le …………………... à ………………., demeurant   au ……………………………, titulaire de CIN n° ……………….,  émise à …………………….<br> le ……………………………… <br>En cas de son changement M. ……………….. s&apos;engage à informer son employeur par lettre recommandée avec accusé de réception, faute de quoi l&apos;adresse ci-dessus reste valable.<br>En sa qualité d&apos;employé d&apos;autre part,</p>` ,Validators.required ),
      article1: new FormControl('<p>L&apos;Employeur recrute M. …………………………… en qualité de …………………………… <br>Description du poste <br>Missions   <br>Qualités attendues pour le poste :</p>', Validators.required),
      article2 : new FormControl('<p>Le présent contrat est conclu pour une durée indéterminée à partir du ………………. <br>L&apos;employé est soumis à une période d&apos;essai de 3 mois renouvelable une fois. <br>Dans le cas où le présent contrat de travail serait dénoncé au cours de cette période d&apos;essai, l&apos;employé ne pourra prétendre à aucune indemnité.</p>', Validators.required),
      article3 : new FormControl('<p>L&apos;employé s&apos;engage à exercer ses fonctions au siège de la société ou dans tout autre lieu du territoire Tunisien. <br>L&apos;employé reconnaît avoir pris connaissance que le changement du lieu de travail ne lui ouvre droit à aucune indemnité ou prime au titre de ce changement.</p>', Validators.required),
      article4 : new FormControl('<p>L&apos;horaire du travail est celui de la catégorie professionnelle à laquelle l&apos;Employé appartient, selon horaire convenu par la société, sur note de service. <br>L&apos;horaire du travail de l&apos;Employé, sera susceptible de modification en fonction des impératifs de gestion et d&apos;administration des services de la Société. <br>En ce sens, l&apos;Employé, déclare d&apos;avance l&apos;accepter. <br>En fonction des contextes projets, des interventions ponctuelles pourront être demandées le samedi et le dimanche ou bien pendant les jours fériés. <br>Ces interventions resteront à caractère exceptionnel.</p>', Validators.required),
      article5 : new FormControl('<p><p>La rémunération mensuelle net de L&apos;employé est fixée à ………………. dinars sur toute la période d&apos;essai.<br>A la confirmation de fin de la première période d&apos;essai le salaire mensuel net passe à …………………………………… dinars sur 13 mois.</p>', Validators.required),
      article6 : new FormControl('<p>L&apos;Employé bénéficiera des congés payés conformément aux dispositions légales, réglementaires et conventionnelles en vigueur, notamment La Convention Collective Nationale de l&apos;Electricité et de l&apos;Electronique en vigueur, l&apos;employé bénéficiera de 22 jours ouvrés de congés payés par année travaillée. <br>Soit deux (2) jours ouvrables par mois de travail.<br>La période de ces congés sera déterminée d&apos;un commun accord avec la Direction en tenant compte des nécessités de ses fonctions.<br>De manière plus générale, aucune absence n&apos;est tolérée sans l&apos;autorisation préalable de l&apos;employeur.</p>', Validators.required),
      article7 : new FormControl('<p>Dès que possible et au plus tard dans les vingt-quatre heures, vous devez avertir la Société du motif et de la durée probable de toute absence. <br>Cet avis est confirmé dans un délai maximal de quarante-huit heures à compter du premier jour de l&apos;indisponibilité au moyen d&apos;un certificat médical.<br>Ne se manifestant pas, et passé 15 jours ouvrables dDès que possible et au plus tard dans les vingt-quatre heures, vous devez avertir la Société du motif et de la durée probable de toute absence. Cet avis est confirmé dans un délai maximal de quarante-huit heures à compter du premier jour de l&apos;indisponibilité au moyen d&apos;un certificat médical.<br>Ne se manifestant pas, et passé 15 jours ouvrables d&apos;absence, l&apos;employé est considéré est comme démissionnaire de sa propre volonté.<br> l&apos;employé est considéré est comme démissionnaire de sa propre volonté.</p>', Validators.required),
      article8 : new FormControl('<p><p>Dans le cadre des directives de travail données par la Société, l&apos;employé est contracté à exercer au sein de la société les fonctions définies dans l&apos;article 1. L&apos;employé s&apos;engage à accepter toutes les missions qui lui seront proposées dans le cadre de l&apos;exécution de ce contrat. L&apos;employé reconnaît que ces missions pourront le conduire à effectuer des déplacements professionnels qu&apos;il s&apos;engage, expressément, à réaliser, quelle que soit la durée et l&apos;éloignement. L&apos;employé reconnaît que le refus d&apos;accepter une mission serait susceptible d&apos;entraîner la rupture immédiate du présent contrat dans le cadre d&apos;une procédure de licenciement pour faute grave (sauf force majeure).</p></p>', Validators.required),
      article9 : new FormControl('<p>L&apos;Employé sera affilié à la Caisse Nationale de la Sécurité Sociale et à toutes les autres caisses obligatoires.</p>', Validators.required),
      article10 : new FormControl('<p><p>Pendant toute la durée du contrat, l&apos;employé s&apos;engage à ne participer sous quelque forme que ce soit à aucune activité concurrente de la société et à réserver l&apos;exclusivité de son activité professionnelle à la société. L&apos;Employé s&apos;engage à observer toutes les instructions et consignes particulières de travail qui lui seront indiquées par la Direction de la Société et à respecter une stricte obligation de discrétion sur tout ce qui concerne l&apos;activité de l&apos;entreprise. L&apos;Employé dévoilera les informations aux seules personnes directement concernées et leur imposera les mêmes obligations de secret. L&apos;employé s&apos;engage à garder confidentielles les informations techniques, commerciales, et financières se rapportant à la Société et à ne pas les communiquer à des tiers, ni les utiliser dans un but autre que celui prévu dans le présent Contrat, sans l&apos;accord écrit préalable de la Société. Cette obligation de discrétion jouera tant à l&apos;égard des tiers, que des salariés de la société et s&apos;appliquera pendant la durée du présent contrat, ainsi qu&apos;après sa cessation pour quelque motif que ce soit. L&apos;employé est interdit d&apos;utiliser l&apos;outil informatique et tout autre moyen de la Société à des fins autres que pour lesquelles ils ont été affectés. L&apos;employé est interdit de détourner les clients ou les prospects de la Société, d&apos;une manière directe ou indirecte, pour une durée de 5 ans à partir de la cessation du présent contrat. Les obligations ci-dessus sont permanentes et se poursuivront même après l&apos;expiration du présent Contrat. L&apos;Employé s&apos;engage, par ailleurs expressément à respecter toutes les dispositions du règlement intérieur joint aux présentes et à le considérer comme partie intégrante de ce Contrat. Toute violation de la présente clause sera susceptible d&apos;entraîner la rupture du présent contrat pour faute grave.</p>', Validators.required),
      article11 : new FormControl('<p>Le présent contrat de travail est soumis aux dispositions prévues par le Code de travail et la Convention Collective du secteur, notamment La Convention Collective Nationale de l&apos;Electricité et de l&apos;Electronique en vigueur, il prend fin dans tous les cas prévus par la législation du travail en vigueur. Il peut prendre aussi fin, avant l&apos;arrivée de son terme, par la volonté de l’une des deux parties.<br>L&apos;employé s&apos;engage d&apos;effectuer une passation de service à son supérieur hiérarchique ou tout autre employé qui sera désigné par la Direction Générale.<br>En cas de démission, l&apos;employé, devra respecter les délais de préavis, soit le délai de deux (02) mois.<br>Toute démission ne respectant pas la procédure et le délai ci-dessus ne se concrétisant que par une simple absence non justifiée de la société, et sera considéré comme un abandon de poste et passible d&apos;une journée de mise à pied sans rémunération par jour d&apos;absence, jusqu&apos;à régularisation de la situation de l&apos;employé vis-à-vis de la société.</p>', Validators.required),
      article12 : new FormControl('<p>Compte tenu de la nature de ses fonctions et de la possibilité pour lui d&apos;accéder à des informations confidentielles, concernant la Société, l’Employé s’engage dès la fin de son Contrat de s’abstenir et ce pour quelque motif que ce soit, de : <br>Ne pas entrer au service d’une Société concurrente.<br> Ne pas s’intéresser directement ou indirectement à toutes activités pouvant concurrencer l’activité de la Société. <br>Cette interdiction de concurrence est applicable pendant une durée de deux (02) ans, à compter de l’expiration du présent Contrat.<br>Elle s&apos;appliquera à compter du jour, du départ effectif de l&apos;Employé de la Société.<br>En cas de violation de cette clause par l’Employé, la Société se réserve le droit de le poursuivre en réparation du préjudice subi et de faire ordonner sous astreinte la cessation de l’activité concurrentielle.</p>', Validators.required),
      article13 : new FormControl('<p>L&apos;employé devra apporter les meilleurs soins aux rapports, documentations diverses et correspondances, ainsi qu&apos;aux matériels, outils et équipements qui lui seront confiés à titre de dépôt.<br>Toute négligence dans ce domaine sera constitutive d&apos;une faute. Il restituera ceux-ci à toute demande de la Société.<br>La propriété intellectuelle des codes sources, des études, des brevets, des procédés, des méthodes, des procédures, des outils de production et de tout autre élément produit ou utilisé dans le cadre de l’exercice de ses fonctions restent et demeureront la propriété exclusive de l’employeur.<br> Les codes source, les études, les rapports, les fichiers et tous les autres documents ou matériels confiés à l’employé restent la propriété totale et exclusive de l&apos;employeur. L&apos;employé doit les restituer et s’interdire de les copier ou de les cloner même en cas de cessation du présent contrat, quelle qu&apos;en soit la cause.<br>L&apos;employé devra en outre remettre lors de la cessation du contrat de travail, un état des divers engagements pris avec les tiers concernant la société.</p>', Validators.required),
      article14 : new FormControl('<p>Dans le cadre de l&apos;évolution professionnelle de l&apos;employé et afin de lui permettre d&apos;assurer dans de bonnes conditions les missions qui lui seront confiées, l&apos;employé pourra être amené à suivre des formations assurées en interne ou par des organismes externes et dont le coût global sera pris en charge par la société. Les périodes de formation au sein ou en dehors de l&apos;entreprise sont considérées comme des heures de travail effectives et sont rémunérées en conséquence.<br>L&apos;Employé ayant bénéficié d&apos;une formation, d&apos;un perfectionnement ou d’un recyclage est tenu de rembourser les frais engagés par son employeur à son profit, et ce au moment où il quitte définitivement l’entreprise sans préavis ou en cas de démission avant l&apos;expiration d&apos;un délai d&apos;un (1) an à compter de la fin de la période de formation, de perfectionnement ou de recyclage.<br>Les parties peuvent convenir d&apos;un commun accord que les frais de formations peuvent être remboursés par tranches sur une période négociée au moment de la rupture du contrat.<br>Toutefois l&apos;employé sera libre de tout engagement de remboursement de frais de formations dans les cas de figures suivants :<br>S&apos;il ne se sert pas de la formation pour une durée de 12 mois.<br>S&apos;il quitte l&apos;entreprise pour des raisons économiques ou pour des raisons de cas de force majeures (maladie, contrainte familiale).<br>A cet effet, l&apos;employé est tenu de fournir les preuves nécessaires quant à la nature imprévue des raisons évoquées.</p>', Validators.required),
      article15 : new FormControl('<p>Le présent contrat exprime l&apos;intégralité des obligations des parties.<br>Aucune condition générale ou spécifique figurant dans d&apos;autres documents envoyés ou remis par les parties, ne pourra s&apos;intégrer au présent contrat, à moins de faire l&apos;objet d&apos;un avenant signé par les deux parties.<br>Pour toutes les questions non prévues au présent contrat, les parties déclarent se référer aux dispositions légales et réglementaires, à la convention collective dont relève la Société, notamment La Convention Collective Nationale de l’Electricité et de l’Electronique en vigueur, au code du travail, ainsi qu’aux usages et habitudes de la Société.<br>L&apos;employé certifie n&apos;être lié par aucune clause de non-concurrence avec un précédent employeur et être libre de tout engagement.</p>', Validators.required),

    
  })
/*
  this.myFormExceptionalFee = new FormGroup({
    contractId:new FormControl({value:'' , disabled:true}),
    feeType : new FormControl('', Validators.required),
    shortDescription: new FormControl('', Validators.required), 
    amount : new FormControl ('', Validators.required),
    currency: new FormControl('', Validators.required), 
    name : new FormControl ('', Validators.required),
   
   
  
  })*/

 
  }
  
  
  addResource(): void {
    console.log('Submitting form...');
    
    this.addResourceService.addItem(this.myForm.value).subscribe({
      next: (res) => {
        console.log('Item added successfully', res);
        this.selectedEmployee = res;
       console.log('Form value', this.myForm.value);
        this.submitted = true;
  
      
      },
      error: (e) => {
        console.error('Error adding item', e);
        console.log('Form is invalid');
        console.log(this.myForm.errors);
      }
    });
  }
  

  
 
  



  addContract(): void {
    console.log('Submitting form...');
    
    if (this.myFormContract.valid) {
      
      console.log('Form is valid, submitting...');
      this.contractService.addItem(this.myFormContract.value).subscribe({
     // this.contractService.addItem({...this.myFormContract.value , resourceId:this.selectedEmployee.id}).subscribe({
        next: (res) => {
          console.log('Item added successfully', res);
         // this.selectedContract = res;
          console.log('Selected employee ID:', this.selectedEmployee.id);
          console.log('Form value', this.myFormContract.value);
          this.submitted = true;
        },
        error: (e) => console.error('Error adding item', e)
      });
    
    }
  }
 
  
  
/*
 
  addExceptionalFee(): void {
    console.log('Submitting form...');
    console.error()
    
    if (this.repeatForm.valid) {
      console.log('Form is valid, submitting...');
      this.contractService.addExceptinalFee({...this.repeatForm.value , contractId:this.selectedContract.id}).subscribe({

        next: (res) => {
          console.log('Item added successfully', res);
          console.log('Form value', this.repeatForm.value);
          this.submitted = true;
        },
        error: (e) => console.error('Error adding item', e)
      });
    
    }
  }*/

 


nextTab(tabGroup: MatTabGroup) {
  const nextIndex = (tabGroup.selectedIndex + 1) % tabGroup._tabs.length;
  tabGroup.selectedIndex = nextIndex;
}


  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }



public confirmer(){}
  
createRepeatForm(): FormGroup {
  return this.fb.group({
  });
}
get repeatFormGroup() {
  return this.repeatForm.get('repeatArray') as FormArray;
}
handleAddRepeatForm() {
  this.repeatFormGroup.push(this.createRepeatForm());
}
handleRemoveRepeatForm(index: number) {
  this.repeatFormGroup.removeAt(index);
  if (index > 0) { // check if the index is greater than 0
    const repeatArray = this.repeatForm.get('repeatArray') as FormArray;
    repeatArray.removeAt(index);
}
}

onFraisTypeSelectionChange(event: any) {
  const selectedFraisType = event.value;
  this.showLocationName = selectedFraisType === 'OTHER_LOCATION';
}

 
 
}