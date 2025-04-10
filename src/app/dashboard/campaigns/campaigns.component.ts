import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { CampaignsService, Campaign } from '../../services/campaigns.service';
import { NotificationService } from '../../services/notification.service';
import { Observable } from 'rxjs';
import { CreateCampaignDialogComponent } from '../create-campaign-dialog/create-campaign-dialog.component';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent implements OnInit {
  campaigns$: Observable<Campaign[]>;
  displayedColumns: string[] = [
    'title',
    'description',
    'point',
    'date',
    'actions',
  ];
  isLoading = true;

  constructor(
    private campaignsService: CampaignsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.campaigns$ = this.campaignsService.campaigns$;
  }

  ngOnInit(): void {
    setTimeout(() => (this.isLoading = false), 500); // Simulate initial loading
  }

  editCampaign(campaign: Campaign): void {
    const dialogRef = this.dialog.open(CreateCampaignDialogComponent, {
      width: '500px',
      data: { campaign: campaign },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        try {
          // Update the campaign with the new data
          this.campaignsService.updateCampaign(campaign.id!, result);
        } catch (error) {
          this.notificationService.error(
            'Failed to update campaign. Please try again.'
          );
          console.error('Error updating campaign:', error);
        }
      }
    });
  }

  deleteCampaign(id: string): void {
    if (confirm('Are you sure you want to delete this campaign?')) {
      try {
        this.campaignsService.deleteCampaign(id);
      } catch (error) {
        this.notificationService.error(
          'Failed to delete campaign. Please try again.'
        );
        console.error('Error deleting campaign:', error);
      }
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}
