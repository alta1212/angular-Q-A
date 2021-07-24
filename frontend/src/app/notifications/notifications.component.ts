import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-notication',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class notificationsComponent implements OnInit {

  constructor(private titleService:Title) {
    this.titleService.setTitle("Notifications");
  }

  ngOnInit(): void {
  }

}
