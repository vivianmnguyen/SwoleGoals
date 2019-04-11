import { UserProfileService } from './user-profile.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userData: object;
  groupMembers;
  groupInfo: object;
  groupName: String;
  userEmail: String;
  userName: String;
  image: String;
  age: number;
  weight: number;
  height: number;
  constructor(private dataService: DataService, private userProfileService: UserProfileService) {
    var userData = this.dataService.getUserData();
  }

  ngOnInit() {
    this.userData = this.dataService.getUserData();
    this.userName = this.dataService.getUserName();
    this.userEmail = this.dataService.getUserEmail();
    this.age = this.dataService.getUserAge();
    this.height = this.dataService.getUserHeight();
    this.weight = this.dataService.getUserWeight();
    this.image = this.dataService.getUserImage();
    this.groupName = this.dataService.getUserGroup();
    this.groupMembers = this.userProfileService.getGroupMembers(this.groupName);
  }

  getGroupMembers() {
    console.log("Getting Group Members");
    this.userProfileService.getGroupMembers(this.groupName).subscribe((res) => {
      console.log('response from backend is ', res);
    }, (err) => {
      console.log('error during post is', err);
    })
  }

  joinGroup() {
    console.log("Joining Group" + this.groupName);
    this.updateUserInfo();
    this.userProfileService.createGroup(this.groupName).subscribe((response) => {
      console.log('response from post data is ', response);
      this.groupInfo = response;
    }, (error) => {
      console.log('error during post is ', error)
    })
  }

  addFriendToGroup(friendEmail: string) {
    this.userData = this.dataService.getUserData();
    this.dataService.addFriendToGroup(friendEmail);

    this.userProfileService.postAPIGroupAdd("FINAL_GROUP", friendEmail).subscribe((response) => {
      console.log('response from addFriendToGroup ', response);
    }, (error) => {
      console.log('error during add friend to group ', error)
    })

    this.groupMembers = this.dataService.getGroupMembers();
    console.log("THIS GROUP MEMB: ", this.groupMembers);
    console.log("CURRENT GROUP MEMBERS: ", this.groupMembers);
  }

  removeFriendFromGroup(friendEmail: string) {
    this.userData = this.dataService.getUserData();
    this.dataService.removeFriendFromGroup(friendEmail);

    this.userProfileService.postAPIGroupRemove("FINAL_GROUP", friendEmail).subscribe((response) => {
      console.log('response from removeFriendFromGroup ', response);
    }), (error) => {
      console.log('error during remove friend from group ', error)
    }
    this.groupMembers = this.dataService.getGroupMembers();
    console.log("CURRENT GROUP MEMBERS: ", this.groupMembers);
  }

  updateUserInfo() {
    console.log("Updating User Info");
    console.log("Group: ", this.groupName);
    this.userProfileService.updateInfo(this.age, this.height, this.weight, this.groupName).subscribe((response) => {
      console.log('response from post data is ', response);
      this.groupInfo = response;
    }, (error) => {
      console.log('error during post is ', error)
    })
  }
}
