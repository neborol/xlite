import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { MatDrawer } from '@angular/material';
import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {

  funcs: any = {
    isNews: '',
    isPilot: '',
    isManager: '',
    isSuper: ''
  };

  constructor(private router: Router) { }

  ngOnInit() {
    let storedFuncs = localStorage.getItem('eliteFuncs');
    if (storedFuncs) {
      storedFuncs = JSON.parse(storedFuncs);
      this.funcs = storedFuncs;
    }
  }

  loadChildRoute(childrt, drawer) {
    this.router.navigate(['/cockpit/' + childrt]);
    drawer.close();
  }

}
