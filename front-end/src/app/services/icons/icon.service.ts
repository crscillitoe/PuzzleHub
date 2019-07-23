import { Injectable, PLATFORM_ID, Inject, Component, OnInit, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TunnelService } from '../tunnel/tunnel.service';
import { LoaderService } from '../loading-service/loader.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private iconData: {
    AccentColor: string,
    Color: string,
    Default: number,
    IconDescription: string,
    IconID: number,
    IconPath: string
  }[];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    loader: LoaderService,
    tunnelService: TunnelService
  ) { 
    this.iconData = [];
    loader.startLoadingAnimation();
    if (isPlatformBrowser(this.platformId)) {
      tunnelService.getPuzzlerIcons().subscribe(data => {
        this.iconData = data;
        loader.stopLoadingAnimation();
      });
    }
  }

  getIconAccentColor(iconID: number) {
    if (this.iconData.length === 0) { return '#FFFFFF';}
    return this.getIcon(iconID).AccentColor;
  }

  getIconColor(iconID: number) {
    if (this.iconData.length === 0) { return '#000000';}
    return this.getIcon(iconID).Color;
  }

  getIconImagePath(iconID: number) {
    if (this.iconData.length === 0) { return 'puzzle-hub-profile-0.png';}
    return this.getIcon(iconID).IconPath;
  }

  getIcon(iconID: number) {
    for (let i = 0 ; i < this.iconData.length ; i++) {
      if (this.iconData[i].IconID === iconID) {
        return this.iconData[i];
      }
    }
  }
}
