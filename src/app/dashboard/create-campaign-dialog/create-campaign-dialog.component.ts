import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CampaignsService, Campaign } from '../../services/campaigns.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-campaign-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-campaign-dialog.component.html',
  styleUrls: ['./create-campaign-dialog.component.scss'],
})
export class CreateCampaignDialogComponent implements OnInit {
  campaignForm: FormGroup;
  isSubmitting = false;
  today = new Date();
  isEditMode = false;
  dialogTitle = 'Create Campaign';

  constructor(
    private dialogRef: MatDialogRef<CreateCampaignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { campaign?: Campaign },
    private fb: FormBuilder,
    private campaignsService: CampaignsService,
    private notificationService: NotificationService
  ) {
    this.campaignForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      point: [0, [Validators.required, Validators.min(0)]],
      date: [this.today, Validators.required],
    });
  }

  ngOnInit(): void {
    // Check if we're in edit mode
    if (this.data && this.data.campaign) {
      this.isEditMode = true;
      this.dialogTitle = 'Edit Campaign';

      // Populate the form with the campaign data
      this.campaignForm.patchValue({
        title: this.data.campaign.title,
        description: this.data.campaign.description,
        point: this.data.campaign.point,
        date: new Date(this.data.campaign.date),
      });
    }
  }

  onSubmit(): void {
    if (this.campaignForm.valid) {
      this.isSubmitting = true;

      try {
        if (this.isEditMode && this.data.campaign?.id) {
          // Update existing campaign
          this.dialogRef.close(this.campaignForm.value);
        } else {
          // Create new campaign
          this.campaignsService.createCampaign(this.campaignForm.value);
          this.dialogRef.close(this.campaignForm.value);
        }
      } catch (error) {
        console.error('Error with campaign:', error);
        this.notificationService.error('An error occurred. Please try again.');
        this.isSubmitting = false;
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
