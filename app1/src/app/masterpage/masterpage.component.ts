import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-masterpage',
  templateUrl: './masterpage.component.html',
  styleUrls: ['./masterpage.component.css']
})
export class MasterpageComponent implements OnInit {
  comment=" ";
  postComment=[];
  post(){
    this.postComment.push(this.comment);
    this.comment= "";
  }

  constructor() { }

  ngOnInit(): void {
  }
  
  
  
  

}
