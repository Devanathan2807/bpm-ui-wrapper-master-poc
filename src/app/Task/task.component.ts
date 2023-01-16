import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProcessDefinationModel } from '../models/ProcessDefinationModel';
import { TaskService } from '../Task-service.service'; 
import { TaskListModel } from '../models/TaskListModel';

@Component({
  selector: 'app-Task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  dataSource: any
  displayedColumns = ['taskTitle', 'taskCreatedTime', 'ownerName', 'dueDate', 'priority'];
  displayNoSignUp: any

  constructor(private TaskService: TaskService) {
  }

  ngOnInit() {
    this.TaskService.getTaskList().subscribe(res => {
      console.log('Sample response from backend system' + res);
      this.dataSource = new MatTableDataSource(res);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getTaskList(taskCreatedTime: string){
      this.TaskService.getTaskList().subscribe(res =>{
        this.dataSource=new MatTableDataSource(res);
      })
    }
  
  
}
