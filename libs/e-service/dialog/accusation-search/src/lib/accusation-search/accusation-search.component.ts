import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PersonLicense {
  id: number;
  personId: string;
  name: string;
  organization: string;
  school: string;
  province: string;
}

export const data: PersonLicense[] = [
  {
    id: 1,
    personId: '110200051214',
    name: 'พรทิพย์ นาคปรก',
    organization: 'xxxx',
    school: 'วิทยาลัยเทคนิค ฉะเชิงเทรา',
    province: 'ฉะเชิงเทรา',
  },
  {
    id: 2,
    personId: '110200051214',
    name: 'พรทิพย์ นาคปรก',
    organization: 'xxxx',
    school: 'วิทยาลัยเทคนิค ฉะเชิงเทรา',
    province: 'ฉะเชิงเทรา',
  },
];

@Component({
  selector: 'e-service-ethic-ui-accusation-list',
  templateUrl: './accusation-search.component.html',
  styleUrls: ['./accusation-search.component.scss'],
})
export class AccusationSearchComponent {
  personSelected = false;
  displayedColumns: string[] = [
    'select',
    'view',
    'personId',
    'name',
    'organization',
    'school',
    'province',
  ];
  dataSource = new MatTableDataSource<PersonLicense>();

  search() {
    this.dataSource.data = data;
  }

  clear() {
    this.dataSource.data = [];
  }
}
