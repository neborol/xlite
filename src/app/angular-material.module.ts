import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
   MatButtonModule,
   MatToolbarModule,
   MatIconModule,
   MatSidenavModule,
   MatDrawer,
   MatCardModule,
   MatInputModule,
   MatFormFieldModule,
   MatSelectModule
} from '@angular/material';

@NgModule({
   imports: [
      CommonModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatInputModule,
      MatFormFieldModule,
      MatCardModule,
      MatSelectModule
   ],
   exports: [
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatInputModule,
      MatFormFieldModule,
      MatCardModule,
      MatSelectModule
   ],
   providers: [
      // MatDatepickerModule,
      MatDrawer
   ]
})

export class AngularMaterialModule { }
