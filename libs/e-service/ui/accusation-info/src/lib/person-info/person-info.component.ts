import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { KspAccusationRequest } from '@ksp/shared/interface';
import {
  AddressService,
  EthicsService,
  GeneralInfoService,
} from '@ksp/shared/service';


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
  
  constructor(
    private service: EthicsService,
  ) {
    console.log(this.selectedPerson);
  }


  ngOnInit(): void {

    if(this.changeUpdate == true){
        this.service
        .searchSelfLicense({ identity_no: this.identityNo  }) //, ilicenseno: form.licenseno
        .subscribe((res) => {
          for(let person of res){
            if( person.identitynumber == this.identityNo ){
              console.log(this.identityNo);
              console.log(person.identitynumber);
              this.mapData.identityNo = person.identitynumber !== undefined ? person.identitynumber : "--"
              this.mapData.namefirstTH = person.nameth !== undefined ? person.nameth : "--"
              this.mapData.namelastTH = person.lastnameth !== undefined ? person.lastnameth : "--"
              this.mapData.namefirstEN = person.nameen !== undefined ? person.nameen : "--"
              this.mapData.namelastEN = person.lastnameen !== undefined ? person.lastnameen : "--"
              this.mapData.email = person.email !== undefined ? person.email : "--"
              this.mapData.phoneNumber = person.phonenumber !== undefined ? person.phonenumber : "--"
              this.mapData.birthDate = person.birthdate !== undefined ? person.birthdate : "--"
              this.mapData.genderId = person.genderid !== undefined ? person.genderid : "--"
              this.mapData.profileImage = person.profileimage !== null ? person.profileimage : "assets/images/profile.png"
              this.changeUpdate == false
            break;
            }
          }
        });
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit()
  }
}
