import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, UniInfoService, UniRequestService } from '@ksp/shared/service';
import { getCookie, replaceEmptyWithNull, thaiDate } from '@ksp/shared/utility';
import { UniserviceImportType, KspPaginationComponent, ListData } from '@ksp/shared/interface';

import {
  HistoryRequestAdmissionDialogComponent,
  PrintRequestDialogComponent,
} from '@ksp/uni-service/dialog';
import { DegreeCertInfo } from '@ksp/uni-service/feature/edit-degree-cert';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Component({
  templateUrl: './degree-list.component.html',
  styleUrls: ['./degree-list.component.scss'],
})
export class DegreeListComponent extends KspPaginationComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  processType!: UniserviceImportType;

  displayedColumns: string[] = columns;
  // dataSource = new MatTableDataSource<StudentInfo>();
  dataSource = new MatTableDataSource<DegreeCertInfo>();
  form = this.fb.group({
    search: [{}],
  });
  uniUniversityOption: ListData[] = [];
  uniUniversityTypeOption: ListData[] = [];
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public uniRequestService: UniRequestService,
    private uniInfoService: UniInfoService,
    private loaderService: LoaderService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.processType = res['type'];
    });
    this.form.setValue({
      search: {
        institution: getCookie('uniId'),
        affiliation: getCookie('uniType'),
      },
    });
    this.getOptions();
    // this.getDegreeCertList();
  }

  async getOptions() {
    const [university, universityTypes] =
      await Promise.all([
        lastValueFrom(this.uniInfoService.getUniuniversity()),
        lastValueFrom(this.uniInfoService.getUniversityType()),
      ]);
    this.uniUniversityOption = university.datareturn.map((data: any) => {
      if (data.campusname) {
        data.name = data.name + `, ${data.campusname}`
      }
      return data;
    });
    this.uniUniversityTypeOption = universityTypes;
  }

  getUniversity() {
    this.uniInfoService.getUniuniversity().subscribe(response=>{
      if (response) {
        this.uniUniversityOption = response;
      }
    })
  }

  getRequest() {
    const form = this.form.controls.search.value as any;
    if (form.requestsubmitDate) {
      form.requestsubmitDate = new Date(form.requestsubmitDate)
      form.requestsubmitDate.setHours(form.requestsubmitDate.getHours() + 7)
    }
    return {
      uniid: form.institution,
      unitype: form.affiliation,
      degreeapprovecode: form.degreeCode,
      fulldegreenameth: form.degreeName,
      degreelevel: form.degreeLevel,
      courseacademicyear: form.openYear,
      requestno: form.requestNumber,
      requestdate: form.requestsubmitDate,
      ...this.tableRecord
    };
  }

  getDegreeCertList() {
    this.uniRequestService.searchUniDegreeCert2(replaceEmptyWithNull(this.getRequest()))
    .subscribe((res) => {
      if (!res?.datareturn) {
        this.dataSource.data = [];
        return;
      };
      this.pageEvent.length = res.countnumunidegree;
      if (res.datareturnadmission) {
        res.datareturnadmission = res.datareturnadmission.sort((data1:any,data2:any) => data1.unirequestadmissionid - data2.unirequestadmissionid);
      } else {
        res.datareturnadmission = [];
      }
      if (res.datareturngraduation) {
        res.datareturngraduation = res.datareturngraduation.sort((data1:any,data2:any) => data1.unirequestadmissionid - data2.unirequestadmissionid);
      } else {
        res.datareturngraduation = [];
      }
      this.dataSource.data = res?.datareturn.map(
        (item: any, index: number) => {
          const admissionstatus = res.datareturnadmission.filter((data: any) => {
            return data.unidegreecertid == item.id}).slice(-1).pop() || {};
          const graduatestatus = res.datareturngraduation.filter((data: any) => {
            return data.unidegreecertid == item.id}).slice(-1).pop() || {};
          return {
              id: item?.id,
              key: item?.id,
              order: this.pageEvent.pageIndex * this.pageEvent.pageSize + ++index,
              degreeCode: item?.degreeapprovecode,
              sendDate: thaiDate(new Date(item?.requestdate)),
              major: item?.coursename,
              branch: item?.coursefieldofstudy,
              degreeName: item?.fulldegreenameth,
              approveStatus: 'พิจารณา',
              approveDate: '30 ส.ค. 2564',
              editDate: item?.updatedate ? thaiDate(new Date(item?.updatedate)) : '',
              verify: 'แก้ไข',
              consider: 'แก้ไข',
              admissionstatus: this.mapStatusProcess(admissionstatus.status, admissionstatus.process),
              graduatestatus: this.mapStatusProcess(graduatestatus.status, graduatestatus.process),
          };
        }
      );
    });
  }

  mapStatusProcess(status: string, process: string) {
    if (status == '1' && process == '1') {
      return 'สร้าง';
    } else if (process == '2' && status == '1') {
      return 'ยื่นเรียบร้อย';
    } else if (process == '3' && status == '0') {
      return 'ส่งคืนและยกเลิก';
    } else if (process == '3' && status == '2') {
      return 'แก้ไข';
    } else if (process == '3' && status == '3') {
      return 'รับข้อมูล';
    } else {
      return '';
    }
  }

  nextPage(id: number) {
    this.router.navigate([
      '/',
      'student-list',
      'course-detail',
      id,
    ]);
  }

  history(row: any) {
    const payload = {
      unidegreecertid: row.id
    };
    this.uniInfoService.uniDegreeHistory(payload).subscribe((response => {
      this.opendialogHistory(response.datareturn);
    }));
  }

  opendialogHistory(data: any) {
    this.dialog.open(HistoryRequestAdmissionDialogComponent, {
      width: '600px',
      data: {
        data: data,
        system: 'uniservice'
      }
    });
  }

  print(data: any) {
    const payload = {
      unidegreecertid: data.id
    };
    this.uniInfoService.uniDegreeHistory(payload).subscribe((response => {
      this.dialog.open(PrintRequestDialogComponent, {
        width: '600px',
        data: response.datareturn
      });
    }));
  }

  clear() {
    this.form.reset();
    this.getDegreeCertList();
  }
}
const columns = [
  'order',
  'edit',
  'sendDate',
  'degreeCode',
  'major',
  'branch',
  'degreeName',
  'studentStatus',
  'graduateStatus',
  'editDate',
  'print',
  'history',
];
export interface StudentInfo {
  order: number;
  edit: string;
  sendDate: string;
  degreeCode: string;
  major: string;
  branch: string;
  degreeName: string;
  studentStatus: string;
  graduateStatus: string;
  editDate: string;
}

export const data: StudentInfo[] = [
  {
    order: 1,
    edit: '',
    sendDate: '12 ส.ค. 2564',
    degreeCode: '069784',
    major: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    branch: 'วิทยาศาสตร์',
    degreeName: 'วิทยาศาสตร์บัณฑิต',
    studentStatus: 'สร้าง',
    graduateStatus: '-',
    editDate: '12 ส.ค. 2564',
  },
  {
    order: 2,
    edit: '',
    sendDate: '12 ส.ค. 2564',
    degreeCode: '069784',
    major: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    branch: 'วิทยาศาสตร์',
    degreeName: 'วิทยาศาสตร์บัณฑิต',
    studentStatus: 'ยื่นเรียบร้อย',
    graduateStatus: '-',
    editDate: '12 ส.ค. 2564',
  },
  {
    order: 3,
    edit: '',
    sendDate: '12 ส.ค. 2564',
    degreeCode: '069784',
    major: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    branch: 'วิทยาศาสตร์',
    degreeName: 'วิทยาศาสตร์บัณฑิต',
    studentStatus: 'รับข้อมูล',
    graduateStatus: 'สร้าง',
    editDate: '12 ส.ค. 2564',
  },
  {
    order: 4,
    edit: '',
    sendDate: '12 ส.ค. 2564',
    degreeCode: '069784',
    major: 'การศึกษาบัณฑิต สาขาวิชาเคมี หลักสูตรปรับปรุง พ.ศ.2562',
    branch: 'วิทยาศาสตร์',
    degreeName: 'วิทยาศาสตร์บัณฑิต',
    studentStatus: 'รับข้อมูล',
    graduateStatus: 'ยื่นเรียบร้อย',
    editDate: '12 ส.ค. 2564',
  },
];
