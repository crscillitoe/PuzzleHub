import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { UserService } from '../user/user.service';
import { MetaService } from '../meta/meta.service';
import { TunnelService } from '../tunnel/tunnel.service';
import { LoaderService } from '../loading-service/loader.service';
import { ProfileData } from '../../classes/profile-data';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<ProfileData> {

  constructor(
    private tunnel: TunnelService,
    private user: UserService,
    private meta: MetaService,
    private loader: LoaderService
  ) { }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<ProfileData> {
    this.loader.startLoadingAnimation();
    let username = route.queryParams['user'];
    const m = {
      'Username': username
    };

    return this.tunnel.getProfileData(m)
    .pipe(mergeMap((data: ProfileData, _): Observable<ProfileData> => {
        let profileData = Object.assign(new ProfileData(this.user), data as ProfileData);
        this.loader.stopLoadingAnimation();
        return this.meta.profileTags(profileData);
      }));
  }
}
