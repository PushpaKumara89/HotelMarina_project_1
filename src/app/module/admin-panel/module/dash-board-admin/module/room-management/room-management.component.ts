import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router} from "@angular/router";
import {RoomMnService} from "../../../../../../core/services/room-mn.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteRoomComponent} from "./component/delete-room/delete-room.component";
import {AddRoomComponent} from "./component/add-room/add-room.component";
import {UpdateRoomComponent} from "./component/update-room/update-room.component";
import {RoomDataService} from "../../../../../../share/shares_servises/room-data.service";

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.scss']
})
export class RoomManagementComponent implements OnInit {

  constructor(private roomData:RoomDataService, private service:RoomMnService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadAllRoom();
  }
  room:any []=[];
  private loadAllRoom(){
    this.service.getAllRoom().subscribe(response=>{
      this.room=response.data;

    },error=>{
      console.log(error);
    });

  }


  openDelete(tempRoom:string, img:any) {
    const dialogRef = this.dialog.open(DeleteRoomComponent,{
      data:{roomNum:tempRoom,img:img}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadAllRoom();
      }
    });
  }

  openAddRoom() {
    const dialogRef =this.dialog.open(AddRoomComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadAllRoom();
      }
    });
  }

  openUpdate(data:any) {
    const dialogRef = this.dialog.open(UpdateRoomComponent, {
      disableClose: true,
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.loadAllRoom();
      }
    });
  }

  navRoomProfile(roomNum:string) {
    this.roomData.navRoomProfile(roomNum);
  }
  createPdF(){

  }
}
