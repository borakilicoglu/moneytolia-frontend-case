import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { isPlatformBrowser } from '@angular/common';

export interface Campaign {
  id?: string;
  title: string;
  description: string;
  point: number;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class CampaignsService {
  private localStorageKey = 'moneytolia_campaigns';
  private campaignsSubject = new BehaviorSubject<Campaign[]>([]);
  public campaigns$ = this.campaignsSubject.asObservable();
  private platformId = inject(PLATFORM_ID);

  constructor(private notificationService: NotificationService) {
    this.loadCampaignsFromLocalStorage();
  }

  private loadCampaignsFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedCampaigns = localStorage.getItem(this.localStorageKey);
      if (storedCampaigns) {
        try {
          const parsedCampaigns = JSON.parse(storedCampaigns);
          const campaigns = parsedCampaigns.map((campaign: any) => ({
            ...campaign,
            date: new Date(campaign.date),
          }));
          this.campaignsSubject.next(campaigns);
        } catch (error) {
          console.error('Error parsing campaigns from localStorage:', error);
          this.campaignsSubject.next([]);
          this.saveCampaignsToLocalStorage();
        }
      } else {
        // Initialize with empty array if none exists
        this.campaignsSubject.next([]);
        this.saveCampaignsToLocalStorage();
      }
    } else {
      // When on server, initialize with empty array
      this.campaignsSubject.next([]);
    }
  }

  private saveCampaignsToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(this.campaignsSubject.value)
      );
    }
  }

  getCampaigns(): Observable<Campaign[]> {
    return this.campaigns$;
  }

  getCampaign(id: string): Observable<Campaign | undefined> {
    return this.campaigns$.pipe(
      map((campaigns) => campaigns.find((c) => c.id === id))
    );
  }

  createCampaign(campaign: Omit<Campaign, 'id' | 'date'>): void {
    const newCampaign: Campaign = {
      ...campaign,

      id: Date.now().toString(),
      point: campaign.point || 0,
      date: new Date(),
    };

    const updatedCampaigns = [...this.campaignsSubject.value, newCampaign];
    this.campaignsSubject.next(updatedCampaigns);
    this.saveCampaignsToLocalStorage();

    // Show success notification
    this.notificationService.success(
      `Campaign "${newCampaign.title}" created successfully!`
    );
  }

  updateCampaign(id: string, campaign: Partial<Campaign>): void {
    const campaigns = this.campaignsSubject.value;
    const index = campaigns.findIndex((c) => c.id === id);

    if (index !== -1) {
      const updatedCampaigns = [...campaigns];
      const oldTitle = updatedCampaigns[index].title;
      updatedCampaigns[index] = { ...updatedCampaigns[index], ...campaign };
      this.campaignsSubject.next(updatedCampaigns);
      this.saveCampaignsToLocalStorage();

      // Show success notification
      this.notificationService.success(
        `Campaign "${oldTitle}" updated successfully!`
      );
    } else {
      // Show error notification
      this.notificationService.error('Campaign not found. Update failed.');
    }
  }

  deleteCampaign(id: string): void {
    const campaigns = this.campaignsSubject.value;
    const campaignToDelete = campaigns.find((c) => c.id === id);

    if (campaignToDelete) {
      const updatedCampaigns = campaigns.filter((c) => c.id !== id);
      this.campaignsSubject.next(updatedCampaigns);
      this.saveCampaignsToLocalStorage();

      // Show success notification
      this.notificationService.success(
        `Campaign "${campaignToDelete.title}" deleted successfully!`
      );
    } else {
      // Show error notification
      this.notificationService.error('Campaign not found. Deletion failed.');
    }
  }
}
