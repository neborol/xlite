import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CockpitFaqService } from '../../../services/cockpit-faq.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { IResponse } from 'src/app/interfaces/response.interface';
import { IFaqGet } from 'src/app/interfaces/faqs-get.interface';
import { FaqService } from 'src/app/services/faq.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Router } from '@angular/router';



@Component({
  selector: 'app-editfaq',
  templateUrl: './editfaq.component.html',
  styleUrls: ['./editfaq.component.scss']
})
export class EditfaqComponent implements OnInit {
  faqAddForm: FormGroup;
  faqEditForm: FormGroup;
  editMode = false;
  deleteMode = false;
  deleteConfirmed = false;
  alphaNRegex = '^[0-9a-zA-Z]+$';
  listOfFaqs: IFaqGet[];
  currentItem: IFaqGet;


  constructor(
    private cockpitFaqService: CockpitFaqService,
    private alertifyService: AlertifyService,
    private faqService: FaqService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit() {
    this.faqAddForm = new FormGroup({
      'faqQuestion': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(120), Validators.pattern(this.alphaNRegex)]),
      'faqAnswer': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(120), Validators.pattern(this.alphaNRegex)])
    });

    this.faqService.getFaqs().subscribe((faqList: IFaqGet[]) => {
      console.log('TT', faqList);

      this.listOfFaqs = faqList;
    });

  }

  toggleAddEditMode() {
    this.editMode = !this.editMode;
  }

  submit() {
    console.log(this.faqAddForm.value);
    this.cockpitFaqService.addAnFaq(this.faqAddForm.value).subscribe((faqAdded: IResponse) => {
      if (faqAdded.success) {
        this.alertifyService.success('An FAQ was added successfully');
      }
    }, error => {
      this.alertifyService.error('FAQ to be added failed.');
    });
    this.faqAddForm.reset();
  }


  editFaq(templateRef: TemplateRef<any>, obj) {
    // Pass the current data to a property at the top, in order to use it in the template.
    this.currentItem = obj;

    this.editMode = true;
    this.deleteMode = false;

    // Now open the modal and pass in the template ref, which would require the following formGroup data.
    this.dialog.open(templateRef);

    // Populate the form in the above templateRef with data from the first parameter of the new FormControl()
    this.faqEditForm = new FormGroup({
      'editQuestion': new FormControl(this.currentItem.faqQuestion, [Validators.required, Validators.minLength(10), Validators.maxLength(120), Validators.pattern(this.alphaNRegex)]),
      'editAnswer': new FormControl(this.currentItem.faqAnswer, [Validators.required, Validators.minLength(10), Validators.maxLength(120), Validators.pattern(this.alphaNRegex)])
    });
  }

  submitEdited() {
    this.cockpitFaqService.editAnFaq(this.faqEditForm.value, this.currentItem.faqId).subscribe((faqEdited: IResponse) => {
      if (faqEdited.success) {
        this.alertifyService.success(faqEdited.message);
        // this.router.navigate(['cockpit/editfaq', { page: 'edit'}]);
      }
    }, error => {
      this.alertifyService.error('FAQ to be edited failed.');
    });
  }

  deleteFaq(templateRef: TemplateRef<any>, obj) {
    // Pass the current data to a property at the top, in order to use it in the template.
    this.currentItem = obj;

    this.editMode = true;
    this.deleteMode = true;

    // Now open the modal and pass in the template ref, which would require the following formGroup data.
    this.dialog.open(templateRef);

    // Populate the form in the above templateRef with data from the first parameter of the new FormControl()
    this.faqEditForm = new FormGroup({
      'editQuestion': new FormControl(this.currentItem.faqQuestion, [Validators.required, Validators.minLength(10), Validators.maxLength(120), Validators.pattern(this.alphaNRegex)]),
      'editAnswer': new FormControl(this.currentItem.faqAnswer, [Validators.required, Validators.minLength(10), Validators.maxLength(120), Validators.pattern(this.alphaNRegex)])
    });
  }

  deleteSelectedFaq() {
    this.cockpitFaqService.deleteAnFaq(this.currentItem.faqId).subscribe((faqDeleted: IResponse) => {
      if (faqDeleted.success) {
        this.alertifyService.success(faqDeleted.message);
      }
    }, error => {
      this.alertifyService.error('FAQ to be edited failed.');
    });
  }

}
