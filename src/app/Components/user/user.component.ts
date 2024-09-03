import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../Model/user';
import {FormsModule, NgForm} from "@angular/forms"
import { UserService } from '../../Services/user.service';
import {ToastrService} from "ngx-toastr"
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  userList:UserModel[]=[];
  editMode:boolean=false;

user:UserModel={
  department:"",
    name:"",
    mobile:"",
    email:"",
    gender:"",
    doj:"",
    city:"",
    salary:0,
    address:"",
    status:false
}

ngOnInit(): void {
    this.getUserList();
}
cityList:string[]=["Kolkata","Mumbai","Bengalore","Hubli"]
departmentList:string[]=["IT","Hr","Accounts","Managements"]
constructor(private _userService:UserService,private _toastrService:ToastrService){}

getUserList()
{
  this._userService.getUser().subscribe((res)=>{
    this.userList=res;
    
  })
}

onSubmit(form:NgForm):void{
  debugger;
 if(this.editMode)
 {
  console.log(form)
this._userService.updateUser(this.user).subscribe((res)=>{
  this.getUserList();
  this.editMode=false;
  form.reset();
  this._toastrService.success('User Updated Successfully','Success');
})
  
 }
 else{
  console.log(form)
  this._userService.addUser(this.user).subscribe((res)=>{
    this.getUserList();
    form.reset();
    this._toastrService.success('User Add Successfully','Success');
  })
 }


}
onDelete(id:any){
  const isConfirm=confirm("do you want delete this?");
  if(isConfirm)
  {
    this._userService.deleteUser(id).subscribe((res)=>{
      this._toastrService.error("user deleted successfully","Deleted");
      this.getUserList();
     })
  }
   
}
onResetForm(form:NgForm){
form.reset();
this.editMode=false;
this.getUserList();
}


onEdit(userdata:UserModel){
this.user=userdata;
this.editMode=true;
}
}
