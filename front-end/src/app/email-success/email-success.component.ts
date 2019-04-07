import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-email-success',
  templateUrl: './email-success.component.html',
  styleUrls: ['./email-success.component.css']
})
export class EmailSuccessComponent implements OnInit {

  constructor(
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Email Verification - Puzzle Hub');
  }

}
