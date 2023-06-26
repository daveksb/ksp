import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { KspAccusationRequest } from '@ksp/shared/interface';
import {
  AddressService,
  EthicsService,
  GeneralInfoService,
} from '@ksp/shared/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'e-service-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss'],
})



export class PersonInfoComponent implements OnInit {
  @Input() identityNo : String | undefined
  @Input() changeUpdate : Boolean | undefined
  
  personSelected  = false;
  selectedPerson  = new KspAccusationRequest()
  dataSource: any
  mapData = {
                identityNo : "--",
                namefirstTH : "--",
                namelastTH : "--",
                namefirstEN : "--",
                namelastEN : "--",
                email : "--",
                phoneNumber : "--",
                birthDate : "--" ,
                genderId : "--" ,
                profileImage : "assets/images/profile.png"
            }
  prefixList$!: Observable<any>;
  bureaus$!: Observable<any>;
  provinces$!: Observable<any>;
  constructor(
    private service: EthicsService,
    private generalInfoService: GeneralInfoService,
    private addressService: AddressService,
  ) {
    console.log(this.selectedPerson);
  }


  ngOnInit(): void {
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.bureaus$ = this.generalInfoService.getBureau();
    this.provinces$ = this.addressService.getProvinces();
    if(this.changeUpdate == true){
        this.service
        .searchSelfLicense({ identity_no: this.identityNo  }) //, ilicenseno: form.licenseno
        .subscribe((res) => {

          const resArray  = res as []
          const person = resArray.find( (person) => { 
            const person2 = person as any
            if( person2.identitynumber == this.identityNo ){
              this.mapData.identityNo = person2.identitynumber !== undefined ? person2.identitynumber : "--"
              this.mapData.namefirstTH = person2.nameth !== undefined ? person2.nameth : "--"
              this.mapData.namelastTH = person2.lastnameth !== undefined ? person2.lastnameth : "--"
              this.mapData.namefirstEN = person2.nameen !== undefined ? person2.nameen : "--"
              this.mapData.namelastEN = person2.lastnameen !== undefined ? person2.lastnameen : "--"
              this.mapData.email = person2.email !== undefined ? person2.email : "--"
              this.mapData.phoneNumber = person2.phonenumber !== undefined ? person2.phonenumber : "--"
              this.mapData.birthDate = person2.birthdate !== undefined ? person2.birthdate : "--"
              this.mapData.genderId = person2.genderid !== undefined ? person2.genderid : "--"
              this.mapData.profileImage = person2.profileimage !== null ? person2.profileimage : "assets/images/profile.png"
              this.changeUpdate == false
            }
            return person2.identitynumber === this.identityNo } ) 
          console.log(person);

          // for(let person of res){
            // if( person.identitynumber == this.identityNo ){
            //   console.log(this.identityNo);
            //   console.log(person.identitynumber);
            //   this.mapData.identityNo = person.identitynumber !== undefined ? person.identitynumber : "--"
            //   this.mapData.namefirstTH = person.nameth !== undefined ? person.nameth : "--"
            //   this.mapData.namelastTH = person.lastnameth !== undefined ? person.lastnameth : "--"
            //   this.mapData.namefirstEN = person.nameen !== undefined ? person.nameen : "--"
            //   this.mapData.namelastEN = person.lastnameen !== undefined ? person.lastnameen : "--"
            //   this.mapData.email = person.email !== undefined ? person.email : "--"
            //   this.mapData.phoneNumber = person.phonenumber !== undefined ? person.phonenumber : "--"
            //   this.mapData.birthDate = person.birthdate !== undefined ? person.birthdate : "--"
            //   this.mapData.genderId = person.genderid !== undefined ? person.genderid : "--"
            //   this.mapData.profileImage = person.profileimage !== null ? person.profileimage : "assets/images/profile.png"
            //   this.changeUpdate == false
          //   break;
            // }
          // }
        });
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit()
  }
}
