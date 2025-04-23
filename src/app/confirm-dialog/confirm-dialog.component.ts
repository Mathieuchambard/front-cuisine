import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  booleanSubject!: BehaviorSubject<boolean>;
  message!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { booleanSubject: BehaviorSubject<boolean>, message: string }) { 
  }

  ngOnInit(): void {
  }

  buttonTrue():void{
    this.data.booleanSubject.next(true);
  }
}
