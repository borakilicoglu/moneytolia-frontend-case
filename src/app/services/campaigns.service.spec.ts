import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CampaignsService, Campaign } from './campaigns.service';

describe('CampaignsService', () => {
  let service: CampaignsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CampaignsService],
    });
    service = TestBed.inject(CampaignsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a campaign with default values', (done) => {
    const campaignData = {
      title: 'Test Campaign',
      description: 'This is a test campaign',
      point: 0, // Default value for point
    };

    service.createCampaign(campaignData).subscribe((campaign) => {
      expect(campaign.title).toBe(campaignData.title);
      expect(campaign.description).toBe(campaignData.description);
      expect(campaign.point).toBe(0); // Default value
      expect(campaign.date).toBeInstanceOf(Date); // Should be a Date object
      expect(campaign.id).toBeDefined(); // Should have an ID
      done();
    });
  });

  it('should get all campaigns', (done) => {
    // First create a campaign
    service
      .createCampaign({
        title: 'Test Campaign',
        description: 'This is a test campaign',
        point: 0, // Default value for point
      })
      .subscribe(() => {
        // Then get all campaigns
        service.getCampaigns().subscribe((campaigns) => {
          expect(campaigns.length).toBeGreaterThan(0);
          done();
        });
      });
  });
});
