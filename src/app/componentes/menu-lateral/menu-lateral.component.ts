import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-lateral',
  imports: [CommonModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css',
})
export class MenuLateralComponent implements OnInit {
  constructor() {}

  isCollapsed = false;

  expandSidebar() {
    this.isCollapsed = false;
  }

  collapseSidebar() {
    this.isCollapsed = true;
  }

  ngOnInit(): void {}
}
