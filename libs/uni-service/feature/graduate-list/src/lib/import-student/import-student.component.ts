import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';
import { StudentImport, UserColumns } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'uni-service-import-student',
  templateUrl: './import-student.component.html',
  styleUrls: ['./import-student.component.scss'],
})
export class ImportStudentComponent implements OnInit {
  displayedColumns: string[] = UserColumns.map((col) => col.key);
  columnsSchema: any = UserColumns;
  dataSource = new MatTableDataSource<StudentImport>();
  valid: any = {};

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) {}

  save() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และส่งใบคำขอ ใช่หรือไม่? `,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }
  onConfirmed() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      height: '200px',
      width: '350px',
      data: {
        header: 'บันทึกข้อมูลสำเร็จ',
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'graduate-list']);
      }
    });
  }

  cancel() {
    this.router.navigate(['./', 'graduate-list']);
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((res: any) => {
      //this.dataSource.data = res;
      console.log('res = ', res);
      this.dataSource.data = res;
    });
  }

  editRow(row: StudentImport) {
    /* if (row.id === 0) {
      this.userService.addUser(row).subscribe((newUser: StudentImport) => {
        row.id = newUser.id;
        row.isEdit = false;
      });
    } else {
      this.userService.updateUser(row).subscribe(() => (row.isEdit = false));
    } */
  }

  addRow() {
    /* const newRow: StudentImport = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      isEdit: true,
      isSelected: false,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data]; */
  }

  removeRow(id: number) {
    /*  this.userService.deleteUser(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: StudentImport) => u.id !== id
      );
    }); */
  }

  removeSelectedRows() {
    /* const users = this.dataSource.data.filter(
      (u: StudentImport) => u.isSelected
    );
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.userService.deleteUsers(users).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u: StudentImport) => !u.isSelected
            );
          });
        }
      }); */
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }
}
