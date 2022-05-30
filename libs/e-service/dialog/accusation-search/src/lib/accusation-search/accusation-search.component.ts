import { Component, OnInit } from '@angular/core';

export interface PersonLicense {
  id: string;
  personId: string;
  name: string;
  organization: string;
  school: string;
  province: string;
}

export const data = [
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
export class AccusationSearchComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'view',
    'personId',
    'name',
    'organization',
    'school',
    'province',
  ];
  dataSource = data;

  constructor() {}

  ngOnInit(): void {}
}
