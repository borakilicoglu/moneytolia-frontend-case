import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateCampaignDialogComponent } from '../create-campaign-dialog/create-campaign-dialog.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menuItems = [{ name: 'Campaigns', icon: 'campaign', route: '/campaigns' }];

  constructor(private dialog: MatDialog) {}

  openCreateCampaignDialog(): void {
    const dialogRef = this.dialog.open(CreateCampaignDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Campaign created:', result);
        // You might want to refresh the campaigns list or navigate to campaigns page
      }
    });
  }
}
