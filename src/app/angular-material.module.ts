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
   MatSelectModule,
   MatMenuModule,
   MatTabsModule,
   MatDialogModule,
   MatRadioModule,
   MatCheckboxModule,
   MatExpansionModule,
   MatSlideToggleModule,
   MatDatepickerModule,
   MatTableModule,
   MatChipsModule
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
      MatSelectModule,
      MatMenuModule,
      MatTabsModule,
      MatDialogModule,
      MatRadioModule,
      MatCheckboxModule,
      MatExpansionModule,
      MatSlideToggleModule,
      MatDatepickerModule,
      MatTableModule,
      MatChipsModule
   ],
   exports: [
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatInputModule,
      MatFormFieldModule,
      MatCardModule,
      MatSelectModule,
      MatMenuModule,
      MatTabsModule,
      MatDialogModule,
      MatRadioModule,
      MatCheckboxModule,
      MatExpansionModule,
      MatSlideToggleModule,
      MatDatepickerModule,
      MatTableModule,
      MatChipsModule
   ],
   providers: [
      // MatDatepickerModule,
      MatDrawer
   ]
})

export class AngularMaterialModule { }
