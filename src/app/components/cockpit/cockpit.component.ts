import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  loadChildRoute(childrt, drawer) {
    this.router.navigate(['/cockpit/' + childrt]);
    drawer.close();
  }

}
