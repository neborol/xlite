import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
   MatButtonModule,
   MatToolbarModule,
   MatIconModule,
   MatSidenavModule,
   MatDrawer
} from '@angular/material';

@NgModule({
   imports: [
      CommonModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule
   ],
   exports: [
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule
   ],
   providers: [
      // MatDatepickerModule,
      MatDrawer
   ]
})

export class AngularMaterialModule { }
