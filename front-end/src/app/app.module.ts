import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSelectModule,
  MatSnackBarModule, MatTableModule, MatTabsModule } from '@angular/material';

import { MatDialogModule } from '@angular/material/dialog';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HeaderInterceptorService } from './services/header-interceptor/header-interceptor.service';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { FooterComponent } from './footer/footer.component';
import { HashiComponent } from './games/hashi/hashi.component';
import { SudokuComponent } from './games/sudoku/sudoku.component';
import { TakuzuComponent } from './games/takuzu/takuzu.component';
import { CustomGamesComponent } from './custom-games/custom-games.component';
import { MinesweeperComponent } from './games/minesweeper/minesweeper.component';
import { TileGameComponent } from './games/tile-game/tile-game.component';
import { TemplateComponent } from './games/template/template.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { EmailSuccessComponent } from './email-success/email-success.component';
import { TodoComponent } from './todo/todo.component';
import { OptionsComponent } from './options/options.component';
import { ProfileComponent } from './profile/profile.component';
// import { KakuroComponent } from './games/kakuro/kakuro.component';
import { ThermometersComponent } from './games/thermometers/thermometers.component';
import { LevelProgressComponent } from './visuals/level-progress/level-progress.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { NonogramsComponent } from './games/nonograms/nonograms.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AngularFittextModule } from 'angular-fittext';
import { PuzzleRelayPopupComponent } from './puzzle-relay-popup/puzzle-relay-popup.component';

const appRoutes: Routes = [
  { path: '', component: MainMenuComponent},
  { path: 'games', component: CustomGamesComponent},
  { path: 'login', component: LoginComponent},
  { path: 'leaderboards', component: LeaderboardsComponent},
  { path: 'EmailVerify', component: VerifyEmailComponent},
  { path: 'ResetPassword', component: ForgotPasswordComponent},
  { path: 'EmailSuccess', component: EmailSuccessComponent},
  { path: 'patchNotes', component: TodoComponent},
  { path: 'profile', component: ProfileComponent},
  {
    path: 'Hashi',
        component: HashiComponent
  },
  {
    path: 'Sudoku',
        component: SudokuComponent
  },
  {
    path: 'Takuzu',
        component: TakuzuComponent
  },
  {
    path: 'Minesweeper',
        component: MinesweeperComponent
  },
  {
    path: 'Tile Game',
        component: TileGameComponent
  },
  //{
    //path: 'Kakuro',
    //component: KakuroComponent
    //},
  {
    path: 'Thermometers',
        component: ThermometersComponent
  },
  {
    path: 'Nonograms',
        component: NonogramsComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HeaderComponent,
    LoginComponent,
    LeaderboardsComponent,
    FooterComponent,
    HashiComponent,
    SudokuComponent,
    TakuzuComponent,
    CustomGamesComponent,
    MinesweeperComponent,
    TileGameComponent,
    TemplateComponent,
    VerifyEmailComponent,
    EmailSuccessComponent,
    TodoComponent,
    OptionsComponent,
    ProfileComponent,
    // KakuroComponent,
    ThermometersComponent,
    LevelProgressComponent,
    NonogramsComponent,
    ForgotPasswordComponent,
    PuzzleRelayPopupComponent
  ],
  imports: [
    AngularFittextModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    DragDropModule,
    HttpClientModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: false }
    ),
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    MatTabsModule
  ],
  providers: [
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true
    }
  ],
  entryComponents: [
    PuzzleRelayPopupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
