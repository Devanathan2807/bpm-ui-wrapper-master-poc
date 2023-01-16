import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessDefinationModel } from './models/ProcessDefinationModel';
import { TaskListModel } from './models/TaskListModel';

@Injectable({
  providedIn: 'root'
})
export class ProcessDefinationServiceService {

  private serviceUrl = 'http://localhost:8080/request/list';
  myData: any;
  constructor(private http: HttpClient) { }

  getProcessDefinations() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const requestOptions = { headers: headers };
    return this.http.get<ProcessDefinationModel[]>('http://localhost:8080/custom/processdefination', requestOptions);
  }

  getDecisionDefinition() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const requestOptions = { headers: headers };
    return this.http.get<ProcessDefinationModel[]>('http://localhost:8080/custom/decisiondefinition', requestOptions);

  }

}
