import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProcessDefinationModel } from '../models/ProcessDefinationModel';
import { ProcessDefinationServiceService } from '../process-defination-service.service';


@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent {
  dataSource: any
  displayedColumns = ['definitionId', 'definitionKey', 'name', 'version', 'versionTag', 'startProcess'];
  displayNoSignUp: any

  constructor(private processDefinationService: ProcessDefinationServiceService) {
  }

  ngOnInit() {
    this.processDefinationService.getProcessDefinations().subscribe(res => {
      console.log('Sample response from backend system' + res);
      this.dataSource = new MatTableDataSource(res);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRecord(definitionId: string) {
    alert(definitionId);
  }
  
}
