import { Component,Inject,Injectable,Input,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CamundaVariables } from '../models/CamundaVariables';
import { TaskListModel } from '../models/TaskListModel';
import { TaskService } from '../Task-service.service';
import { HomePageComponent } from '../home-page/home-page.component';
import { DataService } from '../DataService';

@Component({
  selector: 'app-camunda-dialogue-model',
  templateUrl: './camunda-dialogue-model.component.html',
  styleUrls: ['./camunda-dialogue-model.component.css']
})



export class CamundaDialogueModelComponent implements OnInit {
  // @Input()
  // currentMsgFromChild2ToChild1: any[] =[];
  private ApprovalMsg: string[] = [];
  lastIndexApprovalMsg:string="";
  find: boolean=false;
 
  msg: String="";
  postStatus: String="";
  postRequestMsg: String="";
  approvalStatus:string="";
source:any
CamVariableList: CamundaVariables[]=[];
displayedColumns = ['camundaVariableName', 'camundaVariableValue'];
displayNoSignUp: any
constructor( private router: Router,private TaskService:TaskService,public dialogRef: MatDialogRef<CamundaDialogueModelComponent>,private DataService:DataService) {}

onNoClick(): void {
  this.dialogRef.close();
}

  ngOnInit() {
    this.DataService.selectedProduct$.subscribe(res=>{
      this.source = new MatTableDataSource(res);
      console.log(this.source);
    })
    this.DataService.selectedapprovlTaskDetails$.forEach(val=>{
      this.ApprovalMsg.push(val);
    })
    this.CamVariableList=this.source;
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



}
