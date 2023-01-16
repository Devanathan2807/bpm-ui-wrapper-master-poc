import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProcessDefinationModel } from '../models/ProcessDefinationModel';
import { ProcessDefinationServiceService } from '../process-defination-service.service';
import { TaskService } from '../Task-service.service';
import { TaskListModel } from '../models/TaskListModel';
import { CamundaVariables } from '../models/CamundaVariables';
import { Call, ReadVarExpr } from '@angular/compiler';
import { Data, Router } from '@angular/router';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient,HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { isEmpty } from 'rxjs';
import { __values } from 'tslib';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
  
}
)

export class HomePageComponent implements OnInit {


  dataSource: any
  source: any
  approvalStatus:string="";
  private ApprovalMsg: string[] = [];
  lastIndexApprovalMsg:string="";
  find: boolean=false;
  a: boolean=true;
  b: boolean=false;
  c: boolean=false;
  msg: String="";
  postStatus: String="";
  postRequestMsg: String="";
  displayedColumns = ['definitionId', 'definitionKey', 'name', 'version', 'versionTag','startProcess'];
  displayNoSignUp: any

  

  constructor(private processDefinationService: ProcessDefinationServiceService,public dialog: MatDialog, private router: Router,private TaskService:TaskService,private http: HttpClient) {
    
  }


  TaskList(){
    this.displayedColumns = ['checkSelect','taskTitle', 'taskCreatedTime', 'ownerName','camundaVariables','getTask'];
    this.a=false;
    this.b=true;
  }
 ProcessList(){
  this.displayedColumns=['definitionId', 'definitionKey', 'name', 'version', 'versionTag','startProcess'];
  this.a=true;
  this.b=false;
 }
  
  ngOnInit() {
  
      this.TaskService.getTaskList().subscribe(res => {
        this.source = new MatTableDataSource(res);
        console.log(this.source);
      });
    this.processDefinationService.getProcessDefinations().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      console.log(this.dataSource);
      
    });
  
   
  }
 
  applyFilter(event: Event) {
    if(this.a==true){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    else{
      const filterValue = (event.target as HTMLInputElement).value;
      this.source.filter = filterValue.trim().toLowerCase();
    }
     
  }

  getProcessdefinition(definitionId: string) {
    this.processDefinationService.getProcessDefinations().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });
   
  }

  getTaskList(taskCreatedTime: string){
    this.displayedColumns=['checkSelect','taskTitle', 'taskCreatedTime', 'ownerName','priority','getTask'];
    this.TaskService.getTaskList().subscribe(res =>{
      this.source=new MatTableDataSource(res);
    })
  }


  getDecisionDefinition(definitionId: string) {
    this.processDefinationService.getDecisionDefinition().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    });
    this.b=false;
  }

  Approve(){
    this.approvalStatus="approved";
  }
  Reject(){
    this.approvalStatus="rejected";
  }

  completeTask(){
    this.postRequestMsg="";
    this.postRequestMsg= this.postRequestMsg+"[";
    this.ApprovalMsg.forEach(element => {
      this.postRequestMsg=this.postRequestMsg+element.toString();
     console.log(element.indexOf(this.lastIndexApprovalMsg));
     if(element.toString()!=this.lastIndexApprovalMsg)
      this.postRequestMsg=this.postRequestMsg+',';
        }); 
    this.postRequestMsg=this.postRequestMsg+"]";
    
    console.log(this.postRequestMsg+" "+this.approvalStatus);
    //call the service
    if(this.postRequestMsg!=null){
    this.TaskService.completeTask(this.postRequestMsg,this.approvalStatus).subscribe(res=>{
      alert(res.postStatus);
      this.postStatus=res.postStatus;
    });
    console.log(this.postStatus);
    this.ApprovalMsg.forEach(v=>{
      this.ApprovalMsg.splice(1);
    });
    console.log(this.ApprovalMsg);
  }
  
  window.location.reload();
  }

 

  getRecord(definitionId: string) {
    alert(definitionId);
  }

  //call model dialogur box
  getRecord1(e:CamundaVariables[]){
    // e.forEach(v=>{
    //   console.log("Camunda Variable Name : "+v.camundaVariableName+"\n"+"Camunda Variable Value : "+v.camundaVariableValue+"\n");
    // }
    // )

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '700px',
      data: {camVariable : e}
      });
    
  }


  GetSelected(e:any,TaskDef:string,TaskCreatedTime:String,msg:any){
    msg=""
   this.find=false;
   const status=  e.target.checked;
   this.lastIndexApprovalMsg="";
   msg="{\"taskDef\""+":"+"\""+TaskCreatedTime+"\""+","+"\"taskCreatedTime\""+":"+"\""+TaskDef+"\"}";
   const index: number = this.ApprovalMsg.indexOf(msg);
   if (index !== -1)
   this.find=true;
   if(this.ApprovalMsg==null)
   this.find=false;

   this.lastIndexApprovalMsg=msg;
   if(status)
   {
   if(this.find==false)
   this.ApprovalMsg.push(msg);
   this.find=false;
   }
   else{
    if (index !== -1) {
        this.ApprovalMsg.splice(index, 1);
    }      
   }
   console.log(this.ApprovalMsg);
  }

 

}




export interface DialogData {
  camVariable:CamundaVariables[];
  source:any;
}


@Component({
  selector: 'app-home-page.dialogue',
  templateUrl: './home-page.dialogue.component.html'
  
}
)
export class DialogOverviewExampleDialog implements OnInit {

  displayedColumns = ['camundaVariableName', 'camundaVariableValue'];
  displayNoSignUp: any
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
 ngOnInit() {
    this.data.source=new MatTableDataSource(this.data.camVariable);
    console.log(this.data.source);
 }
}