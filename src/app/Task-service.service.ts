import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { ProcessDefinationModel } from './models/ProcessDefinationModel';
import { TaskListModel } from './models/TaskListModel';
import { HomePageComponent } from './home-page/home-page.component';

@Injectable({
  providedIn: 'root'
})
export class TaskService{

  private serviceUrl = 'http://localhost:8080/request/list';
  myData: any;
  constructor(private http: HttpClient) { }

  getTaskList(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const requestOptions = { headers: headers };
    return this.http.get<TaskListModel[]>('http://localhost:8080/custom/usertask', requestOptions);
  }
  getApprovalTaskList(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const requestOptions = { headers: headers };
    return this.http.get<TaskListModel[]>('http://localhost:8080/custom/TaskApproval', requestOptions);
  }

  completeTask(requestbody:any,approvalStatus:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let params= new HttpParams();
    params=params.append('approvalStatus',approvalStatus)
    const requestOptions = { headers: headers ,params: params};
    return this.http.post<any>('http://localhost:8080/custom/completetask',requestbody,requestOptions);
  }


}
