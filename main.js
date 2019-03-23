(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#img {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n\n#loading {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100vw;\n  height: 100vh;\n  background:rgba(44,44,44,0.5);\n  z-index: 99;\n}\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"loading-overlay\" #spinnerElement style=\"display:none;\" id=\"loading\">\n  <img id=\"img\" src=\"/assets/images/animations/loading.svg\">\n</div>\n\n<ng-container *ngIf=\"isLoggedIn()\">\n  <app-level-progress\n    [level]=\"getLevel()\"\n    [currVal]=\"xpToNextLevel()\"\n    [maxVal]=\"nextLevelThreshold()\"\n  ></app-level-progress>\n</ng-container>\n\n<div id=\"header\">\n  <app-header></app-header>\n</div>\n<div id=\"body\">\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/loading-service/loader.service */ "./src/app/services/loading-service/loader.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppComponent = /** @class */ (function () {
    function AppComponent(loader, router, ngZone, renderer, user, domSanitizer, matIconRegistry) {
        var _this = this;
        this.loader = loader;
        this.router = router;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.user = user;
        this.domSanitizer = domSanitizer;
        this.matIconRegistry = matIconRegistry;
        loader.loading
            .subscribe(function (data) {
            if (data) {
                // loading
                _this.ngZone.runOutsideAngular(function () {
                    _this.renderer.setElementStyle(_this.spinnerElement.nativeElement, 'display', 'inline');
                });
            }
            else {
                // stop loading
                _this.ngZone.runOutsideAngular(function () {
                    _this.renderer.setElementStyle(_this.spinnerElement.nativeElement, 'display', 'none');
                });
            }
        });
        /*router.events.subscribe( (event) => {
            this.navigationInterceptor(event)
          });*/
        matIconRegistry.addSvgIcon('sudokuIcon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/game-splashes/sudoku.svg'));
        matIconRegistry.addSvgIcon('takuzuIcon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/game-splashes/takuzu.svg'));
        matIconRegistry.addSvgIcon('nonogramsIcon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/game-splashes/nonograms.svg'));
        matIconRegistry.addSvgIcon('thermometersIcon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/game-splashes/thermometers.svg'));
        matIconRegistry.addSvgIcon('hashiIcon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/game-splashes/hashi.svg'));
        matIconRegistry.addSvgIcon('tilegameIcon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/game-splashes/tilegame.svg'));
        matIconRegistry.addSvgIcon('minesweeperIcon', domSanitizer.bypassSecurityTrustResourceUrl('assets/images/game-splashes/minesweeper.svg'));
    }
    AppComponent.prototype.isLoggedIn = function () {
        return this.user.isLoggedIn();
    };
    AppComponent.prototype.navigationInterceptor = function (event) {
        if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__["NavigationStart"]) {
            this.loader.startLoadingAnimation();
        }
        /*if (event instanceof NavigationEnd) {
        this.loader.stopLoadingAnimation();
      }

      if (event instanceof NavigationCancel) {
        this.loader.stopLoadingAnimation();
      }
      if (event instanceof NavigationError) {
        this.loader.stopLoadingAnimation();
      }*/
    };
    AppComponent.prototype.getLevel = function () {
        return _services_user_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"].calculateLevel();
    };
    AppComponent.prototype.xpToNextLevel = function () {
        return _services_user_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"].xpToNextLevel();
    };
    AppComponent.prototype.nextLevelThreshold = function () {
        return _services_user_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"].nextLevelThreshold();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('spinnerElement'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AppComponent.prototype, "spinnerElement", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_5__["LoaderService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconRegistry"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _main_menu_main_menu_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./main-menu/main-menu.component */ "./src/app/main-menu/main-menu.component.ts");
/* harmony import */ var _services_header_interceptor_header_interceptor_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/header-interceptor/header-interceptor.service */ "./src/app/services/header-interceptor/header-interceptor.service.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _leaderboards_leaderboards_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./leaderboards/leaderboards.component */ "./src/app/leaderboards/leaderboards.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _games_hashi_hashi_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./games/hashi/hashi.component */ "./src/app/games/hashi/hashi.component.ts");
/* harmony import */ var _games_sudoku_sudoku_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./games/sudoku/sudoku.component */ "./src/app/games/sudoku/sudoku.component.ts");
/* harmony import */ var _games_takuzu_takuzu_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./games/takuzu/takuzu.component */ "./src/app/games/takuzu/takuzu.component.ts");
/* harmony import */ var _custom_games_custom_games_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./custom-games/custom-games.component */ "./src/app/custom-games/custom-games.component.ts");
/* harmony import */ var _games_minesweeper_minesweeper_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./games/minesweeper/minesweeper.component */ "./src/app/games/minesweeper/minesweeper.component.ts");
/* harmony import */ var _games_tile_game_tile_game_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./games/tile-game/tile-game.component */ "./src/app/games/tile-game/tile-game.component.ts");
/* harmony import */ var _games_template_template_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./games/template/template.component */ "./src/app/games/template/template.component.ts");
/* harmony import */ var _verify_email_verify_email_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./verify-email/verify-email.component */ "./src/app/verify-email/verify-email.component.ts");
/* harmony import */ var _email_success_email_success_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./email-success/email-success.component */ "./src/app/email-success/email-success.component.ts");
/* harmony import */ var _todo_todo_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./todo/todo.component */ "./src/app/todo/todo.component.ts");
/* harmony import */ var _options_options_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./options/options.component */ "./src/app/options/options.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/profile/profile.component.ts");
/* harmony import */ var _games_kakuro_kakuro_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./games/kakuro/kakuro.component */ "./src/app/games/kakuro/kakuro.component.ts");
/* harmony import */ var _games_thermometers_thermometers_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./games/thermometers/thermometers.component */ "./src/app/games/thermometers/thermometers.component.ts");
/* harmony import */ var _visuals_level_progress_level_progress_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./visuals/level-progress/level-progress.component */ "./src/app/visuals/level-progress/level-progress.component.ts");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "./node_modules/@angular/cdk/esm5/drag-drop.es5.js");
/* harmony import */ var _games_nonograms_nonograms_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./games/nonograms/nonograms.component */ "./src/app/games/nonograms/nonograms.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};































var appRoutes = [
    { path: '', component: _main_menu_main_menu_component__WEBPACK_IMPORTED_MODULE_8__["MainMenuComponent"] },
    { path: 'games', component: _custom_games_custom_games_component__WEBPACK_IMPORTED_MODULE_17__["CustomGamesComponent"] },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_11__["LoginComponent"] },
    { path: 'leaderboards', component: _leaderboards_leaderboards_component__WEBPACK_IMPORTED_MODULE_12__["LeaderboardsComponent"] },
    { path: 'EmailVerify', component: _verify_email_verify_email_component__WEBPACK_IMPORTED_MODULE_21__["VerifyEmailComponent"] },
    { path: 'EmailSuccess', component: _email_success_email_success_component__WEBPACK_IMPORTED_MODULE_22__["EmailSuccessComponent"] },
    { path: 'patchNotes', component: _todo_todo_component__WEBPACK_IMPORTED_MODULE_23__["TodoComponent"] },
    { path: 'profile', component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_25__["ProfileComponent"] },
    {
        path: 'Hashi',
        component: _games_hashi_hashi_component__WEBPACK_IMPORTED_MODULE_14__["HashiComponent"]
    },
    {
        path: 'Sudoku',
        component: _games_sudoku_sudoku_component__WEBPACK_IMPORTED_MODULE_15__["SudokuComponent"]
    },
    {
        path: 'Takuzu',
        component: _games_takuzu_takuzu_component__WEBPACK_IMPORTED_MODULE_16__["TakuzuComponent"]
    },
    {
        path: 'Minesweeper',
        component: _games_minesweeper_minesweeper_component__WEBPACK_IMPORTED_MODULE_18__["MinesweeperComponent"]
    },
    {
        path: 'Tile Game',
        component: _games_tile_game_tile_game_component__WEBPACK_IMPORTED_MODULE_19__["TileGameComponent"]
    },
    {
        path: 'Kakuro',
        component: _games_kakuro_kakuro_component__WEBPACK_IMPORTED_MODULE_26__["KakuroComponent"]
    },
    {
        path: 'Thermometers',
        component: _games_thermometers_thermometers_component__WEBPACK_IMPORTED_MODULE_27__["ThermometersComponent"]
    },
    {
        path: 'Nonograms',
        component: _games_nonograms_nonograms_component__WEBPACK_IMPORTED_MODULE_30__["NonogramsComponent"]
    },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
                _main_menu_main_menu_component__WEBPACK_IMPORTED_MODULE_8__["MainMenuComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_10__["HeaderComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_11__["LoginComponent"],
                _leaderboards_leaderboards_component__WEBPACK_IMPORTED_MODULE_12__["LeaderboardsComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_13__["FooterComponent"],
                _games_hashi_hashi_component__WEBPACK_IMPORTED_MODULE_14__["HashiComponent"],
                _games_sudoku_sudoku_component__WEBPACK_IMPORTED_MODULE_15__["SudokuComponent"],
                _games_takuzu_takuzu_component__WEBPACK_IMPORTED_MODULE_16__["TakuzuComponent"],
                _custom_games_custom_games_component__WEBPACK_IMPORTED_MODULE_17__["CustomGamesComponent"],
                _games_minesweeper_minesweeper_component__WEBPACK_IMPORTED_MODULE_18__["MinesweeperComponent"],
                _games_tile_game_tile_game_component__WEBPACK_IMPORTED_MODULE_19__["TileGameComponent"],
                _games_template_template_component__WEBPACK_IMPORTED_MODULE_20__["TemplateComponent"],
                _verify_email_verify_email_component__WEBPACK_IMPORTED_MODULE_21__["VerifyEmailComponent"],
                _email_success_email_success_component__WEBPACK_IMPORTED_MODULE_22__["EmailSuccessComponent"],
                _todo_todo_component__WEBPACK_IMPORTED_MODULE_23__["TodoComponent"],
                _options_options_component__WEBPACK_IMPORTED_MODULE_24__["OptionsComponent"],
                _profile_profile_component__WEBPACK_IMPORTED_MODULE_25__["ProfileComponent"],
                _games_kakuro_kakuro_component__WEBPACK_IMPORTED_MODULE_26__["KakuroComponent"],
                _games_thermometers_thermometers_component__WEBPACK_IMPORTED_MODULE_27__["ThermometersComponent"],
                _visuals_level_progress_level_progress_component__WEBPACK_IMPORTED_MODULE_28__["LevelProgressComponent"],
                _games_nonograms_nonograms_component__WEBPACK_IMPORTED_MODULE_30__["NonogramsComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_29__["DragDropModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forRoot(appRoutes, { enableTracing: false }),
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"]
            ],
            providers: [
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"],
                    useClass: _services_header_interceptor_header_interceptor_service__WEBPACK_IMPORTED_MODULE_9__["HeaderInterceptorService"],
                    multi: true
                }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/classes/game-board.ts":
/*!***************************************!*\
  !*** ./src/app/classes/game-board.ts ***!
  \***************************************/
/*! exports provided: GameBoard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameBoard", function() { return GameBoard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_generators_game_starter_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/generators/game-starter.service */ "./src/app/services/generators/game-starter.service.ts");
/* harmony import */ var _services_games_game_list_all_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/games/game-list-all.service */ "./src/app/services/games/game-list-all.service.ts");
/* harmony import */ var rxjs_Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/Subscription */ "./node_modules/rxjs-compat/_esm5/Subscription.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GameBoard = /** @class */ (function () {
    function GameBoard(route, colorService, router, tunnel, userService, timer, loader, optionsService) {
        this.route = route;
        this.colorService = colorService;
        this.router = router;
        this.tunnel = tunnel;
        this.userService = userService;
        this.timer = timer;
        this.loader = loader;
        this.optionsService = optionsService;
        this._takingNotesMode = false;
        this.takingNotes = false;
        this.canvasOffsetX = 225;
        this.canvasOffsetY = 56;
        this.gridOffsetX = 100;
        this.gridOffsetY = 100;
        this.mb1Pressed = false;
        this.mb2Pressed = false;
        this.solved = false;
        this.subscription = new rxjs_Subscription__WEBPACK_IMPORTED_MODULE_3__["Subscription"]();
        this.colors = colorService.getColorScheme();
    }
    Object.defineProperty(GameBoard.prototype, "gameID", {
        get: function () {
            return this._gameID;
        },
        set: function (gameID) {
            this._gameID = gameID;
            this.game = _services_games_game_list_all_service__WEBPACK_IMPORTED_MODULE_2__["GameListAllService"].getGameById(gameID);
            this.optionsService.setGameID(gameID);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameBoard.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (seed) {
            this._seed = seed;
            this.optionsService.setSeed(seed);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameBoard.prototype, "difficulty", {
        get: function () {
            return this._difficulty;
        },
        set: function (difficulty) {
            this._difficulty = difficulty;
            this.optionsService.setDifficulty(difficulty);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameBoard.prototype, "hotkeys", {
        get: function () {
            return this._hotkeys;
        },
        set: function (hotkeys) {
            this._hotkeys = hotkeys;
            this.optionsService.setHotkeys(hotkeys);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameBoard.prototype, "takingNotesMode", {
        get: function () {
            return this._takingNotesMode;
        },
        set: function (takingNotesMode) {
            this._takingNotesMode = takingNotesMode;
            this.optionsService.setTakingNotesMode(takingNotesMode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameBoard.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (options) {
            this._options = options;
            this.optionsService.setOptions(options);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameBoard.prototype, "personalBestMonthly", {
        get: function () {
            return this._personalBestMonthly;
        },
        set: function (personalBestMonthly) {
            this._personalBestMonthly = personalBestMonthly;
            this.optionsService.setPersonalBestMonthly(personalBestMonthly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameBoard.prototype, "personalBestWeekly", {
        get: function () {
            return this._personalBestWeekly;
        },
        set: function (personalBestWeekly) {
            this._personalBestWeekly = personalBestWeekly;
            this.optionsService.setPersonalBestWeekly(personalBestWeekly);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameBoard.prototype, "personalBestDaily", {
        get: function () {
            return this._personalBestDaily;
        },
        set: function (personalBestDaily) {
            this._personalBestDaily = personalBestDaily;
            this.optionsService.setPersonalBestDaily(personalBestDaily);
        },
        enumerable: true,
        configurable: true
    });
    GameBoard.prototype.ngOnInit = function () {
        this.difficulty = Number(this.route.snapshot.paramMap.get('diff'));
        this.setupBoard();
        var that = this;
        _services_generators_game_starter_service__WEBPACK_IMPORTED_MODULE_1__["GameStarterService"].startGame(that);
        this.initializeOptions();
    };
    GameBoard.prototype.setupBoard = function () {
        this.canvas = document.getElementById('myCanvas');
        this.context = this.canvas.getContext('2d');
    };
    GameBoard.prototype.newGame = function (difficulty) {
        if (difficulty === void 0) { difficulty = this.difficulty; }
        this.difficulty = difficulty;
        this.setupBoard();
        var that = this;
        _services_generators_game_starter_service__WEBPACK_IMPORTED_MODULE_1__["GameStarterService"].loadBestTimes(that);
        _services_generators_game_starter_service__WEBPACK_IMPORTED_MODULE_1__["GameStarterService"].newGame(that);
    };
    GameBoard.prototype.add = function (that) {
        var display = document.getElementById('timer');
        var now = +new Date();
        var diff = ((now - that.startDate));
        var hours = Math.trunc(diff / (60 * 60 * 1000));
        var minutes = Math.trunc(diff / (60 * 1000)) % 60;
        var seconds = Math.trunc(diff / (1000)) % 60;
        var millis = diff % 1000;
        try {
            if (!that.solved) {
                display.textContent =
                    hours + ':' +
                        (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' +
                        (seconds ? (seconds > 9 ? seconds : '0' + seconds) : '00') + '.' +
                        (millis ? (millis > 99 ? millis : millis > 9 ? '0' + millis : '00' + millis) : '000');
                that.displayTimer();
            }
        }
        catch (_a) {
            // Do nothing - page probably re-routed
        }
    };
    GameBoard.prototype.displayTimer = function () {
        if (!this.solved) {
            var _this_1 = this;
            this.t = setTimeout(function () { _this_1.add(_this_1); }, 50);
        }
    };
    GameBoard.prototype.done = function () {
        var that = this;
        _services_generators_game_starter_service__WEBPACK_IMPORTED_MODULE_1__["GameStarterService"].done(that);
    };
    GameBoard.prototype.draw = function () {
        this.context.beginPath();
        this.drawBackground();
    };
    GameBoard.prototype.drawBackground = function () {
        this.context.fillStyle = this.colors.BACKGROUND; // Background color
        this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
    };
    GameBoard.prototype.keyPressed = function (keyEvent) {
        if (keyEvent.keyCode === 32) {
            this.newGame();
            return;
        }
    };
    GameBoard.prototype.keyReleased = function (keyEvent) {
        console.log({ 'keyReleased': keyEvent.keyCode });
    };
    GameBoard.prototype.initializeOptions = function () {
        var _this_1 = this;
        var subscription;
        subscription = this.optionsService.takingNotes.subscribe(function (takingNotes) { return _this_1.takingNotes = takingNotes; });
        this.subscription.add(subscription);
    };
    GameBoard.prototype.handleOption = function (callback) {
        eval(callback);
    };
    GameBoard.prototype.notesHandler = function ($event) { };
    GameBoard.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], GameBoard.prototype, "keyPressed", null);
    return GameBoard;
}());



/***/ }),

/***/ "./src/app/classes/game-list.ts":
/*!**************************************!*\
  !*** ./src/app/classes/game-list.ts ***!
  \**************************************/
/*! exports provided: GameList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameList", function() { return GameList; });
/*
 * "gotcha may aswell keep it around
 * who knows maybe we add some less puzzly games
 * that fall under a new category
 * although we are called puzzle hub.."
 * - Christian
 */
var GameList = /** @class */ (function () {
    function GameList() {
    }
    return GameList;
}());



/***/ }),

/***/ "./src/app/classes/game.ts":
/*!*********************************!*\
  !*** ./src/app/classes/game.ts ***!
  \*********************************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
var Game = /** @class */ (function () {
    function Game(id, name, cleanName, image, desc, rules, controls, diffs) {
        this._imagePath = 'assets/images/game-splashes/';
        this._id = id;
        this._name = name;
        this._cleanName = cleanName;
        this._imageBase = image;
        this._desc = desc;
        this._rules = rules;
        this._controls = controls;
        this._diffs = diffs || Game._default_diffs;
    }
    Object.defineProperty(Game.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "cleanName", {
        get: function () {
            return this._cleanName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "image", {
        get: function () {
            return this._imagePath.concat(this._imageBase);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "imagePath", {
        set: function (imagePath) {
            this._imagePath = imagePath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "desc", {
        get: function () {
            return this._desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "rules", {
        get: function () {
            return this._rules;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "controls", {
        get: function () {
            return this._controls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "diffs", {
        get: function () {
            return this._diffs;
        },
        enumerable: true,
        configurable: true
    });
    Game._default_diffs = [
        {
            diff: 1,
            name: 'easy',
            color: 'green',
            requiresLogin: false,
            minLevel: 0
        },
        {
            diff: 2,
            name: 'medium',
            color: 'cyan',
            requiresLogin: false,
            minLevel: 0
        },
        {
            diff: 3,
            name: 'hard',
            color: 'blue',
            requiresLogin: true,
            minLevel: 5
        },
        {
            diff: 4,
            name: 'extreme',
            color: 'red',
            requiresLogin: true,
            minLevel: 10
        }
    ];
    return Game;
}());



/***/ }),

/***/ "./src/app/custom-games/custom-games.component.css":
/*!*********************************************************!*\
  !*** ./src/app/custom-games/custom-games.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/custom-games/custom-games.component.html":
/*!**********************************************************!*\
  !*** ./src/app/custom-games/custom-games.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  custom-games works!\n</p>\n"

/***/ }),

/***/ "./src/app/custom-games/custom-games.component.ts":
/*!********************************************************!*\
  !*** ./src/app/custom-games/custom-games.component.ts ***!
  \********************************************************/
/*! exports provided: CustomGamesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomGamesComponent", function() { return CustomGamesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CustomGamesComponent = /** @class */ (function () {
    function CustomGamesComponent() {
    }
    CustomGamesComponent.prototype.ngOnInit = function () {
    };
    CustomGamesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-custom-games',
            template: __webpack_require__(/*! ./custom-games.component.html */ "./src/app/custom-games/custom-games.component.html"),
            styles: [__webpack_require__(/*! ./custom-games.component.css */ "./src/app/custom-games/custom-games.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CustomGamesComponent);
    return CustomGamesComponent;
}());



/***/ }),

/***/ "./src/app/email-success/email-success.component.css":
/*!***********************************************************!*\
  !*** ./src/app/email-success/email-success.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "p {\n  background: #2C2C2C;\n  color: white;\n  font-family: 'Raleway', sans-serif;\n  font-size: 24px;\n  position: absolute;\n  width:100%;\n  height:50px;\n  top:30%;\n  left:0px;\n  text-align: center;\n}\n"

/***/ }),

/***/ "./src/app/email-success/email-success.component.html":
/*!************************************************************!*\
  !*** ./src/app/email-success/email-success.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  Please verify your email by clicking the verification link we have sent to you.\n</p>\n"

/***/ }),

/***/ "./src/app/email-success/email-success.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/email-success/email-success.component.ts ***!
  \**********************************************************/
/*! exports provided: EmailSuccessComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailSuccessComponent", function() { return EmailSuccessComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmailSuccessComponent = /** @class */ (function () {
    function EmailSuccessComponent() {
    }
    EmailSuccessComponent.prototype.ngOnInit = function () {
    };
    EmailSuccessComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-email-success',
            template: __webpack_require__(/*! ./email-success.component.html */ "./src/app/email-success/email-success.component.html"),
            styles: [__webpack_require__(/*! ./email-success.component.css */ "./src/app/email-success/email-success.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], EmailSuccessComponent);
    return EmailSuccessComponent;
}());



/***/ }),

/***/ "./src/app/enums/game-id.enum.ts":
/*!***************************************!*\
  !*** ./src/app/enums/game-id.enum.ts ***!
  \***************************************/
/*! exports provided: GameID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameID", function() { return GameID; });
var GameID;
(function (GameID) {
    GameID[GameID["SUDOKU"] = 1] = "SUDOKU";
    GameID[GameID["HASHI"] = 2] = "HASHI";
    GameID[GameID["MINESWEEPER"] = 3] = "MINESWEEPER";
    GameID[GameID["TAKUZU"] = 4] = "TAKUZU";
    GameID[GameID["TILE_GAME"] = 5] = "TILE_GAME";
    GameID[GameID["KAKURO"] = 6] = "KAKURO";
    GameID[GameID["THERMOMETERS"] = 7] = "THERMOMETERS";
    GameID[GameID["NONOGRAMS"] = 8] = "NONOGRAMS";
})(GameID || (GameID = {}));


/***/ }),

/***/ "./src/app/footer/footer.component.css":
/*!*********************************************!*\
  !*** ./src/app/footer/footer.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-dark bg-dark mt-5 fixed-bottom\">\n    <div class=\"navbar-expand m-auto navbar-text\">\n      <i style=\"margin-right:5px\" class=\"fa fa-copyright\"></i>2018-2019 Puzzle Co.\n      <a style=\"margin-left:40px;color:rgba(255,255,255,0.5)\"> \n        Version b-1.5\n      </a>\n    </div>\n</nav>\n"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/games/game-board/game-board.component.css":
/*!***********************************************************!*\
  !*** ./src/app/games/game-board/game-board.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "* {\n    line-height: 1;\n}\n\nhtml, body {\n    min-height: 100vh;\n    margin: 0;\n}\n\n.game-screen {\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n    height: 100%;\n    max-height: calc(100vh - 3.5rem);\n    padding: 0;\n    margin: 0;\n    overflow: hidden;\n    background-color: #2c2c2c;\n}\n\n.options-panel {\n    display: flex;\n    flex-direction: column;\n    width: 225px;\n    height: calc(100vh - 3.5rem);\n    padding: 1.25em;\n    overflow: hidden;\n}\n\n.options-panel app-options {\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n}\n\n.game-board {\n    display: flex;\n    flex-basis: 0;\n    height: 100%;\n}\n\n#myCanvas {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n"

/***/ }),

/***/ "./src/app/games/game-board/game-board.component.html":
/*!************************************************************!*\
  !*** ./src/app/games/game-board/game-board.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"game-screen\">\n  <div class=\"options-panel\">\n    <app-options\n        [gameID]=\"gameID\"\n        [seed]=\"seed\"\n        [difficulty]=\"difficulty\"\n        [hotkeys]=\"hotkeys\"\n        [options]=\"options\"\n        [takingNotesMode]=\"takingNotesMode\"\n        [personalBestMonthly]=\"personalBestMonthly\"\n        [personalBestWeekly]=\"personalBestWeekly\"\n        [personalBestDaily]=\"personalBestDaily\"\n        (optionSelected)=\"handleOption($event)\"\n        (notesEvent)=\"notesHandler($event)\"\n        >\n    </app-options>\n  </div>\n  <div class=\"game-board\">\n    <span style=\"font-family: 'Poppins', sans-serif;\">&nbsp;</span>\n    <canvas id=\"myCanvas\" (window:resize)=\"fixSizes()\" (contextmenu)=\"false\"></canvas>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/games/hashi/hashi.component.ts":
/*!************************************************!*\
  !*** ./src/app/games/hashi/hashi.component.ts ***!
  \************************************************/
/*! exports provided: HashiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HashiComponent", function() { return HashiComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_boards_hashi_board_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/boards/hashi/board.service */ "./src/app/services/boards/hashi/board.service.ts");
/* harmony import */ var _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/loading-service/loader.service */ "./src/app/services/loading-service/loader.service.ts");
/* harmony import */ var _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/timer/timer.service */ "./src/app/services/timer/timer.service.ts");
/* harmony import */ var _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../enums/game-id.enum */ "./src/app/enums/game-id.enum.ts");
/* harmony import */ var _services_colors_color_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/colors/color.service */ "./src/app/services/colors/color.service.ts");
/* harmony import */ var _classes_game_board__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../classes/game-board */ "./src/app/classes/game-board.ts");
/* harmony import */ var _services_games_options_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/games/options.service */ "./src/app/services/games/options.service.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var HashiComponent = /** @class */ (function (_super) {
    __extends(HashiComponent, _super);
    function HashiComponent(route, colorService, router, tunnel, userService, timer, loader, optionsService) {
        var _this = _super.call(this, route, colorService, router, tunnel, userService, timer, loader, optionsService) || this;
        _this.shift = false;
        _this.gameID = _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_7__["GameID"].HASHI;
        return _this;
    }
    HashiComponent.prototype.ngOnInit = function () {
        this.solved = false;
        this.setupColors();
        _super.prototype.ngOnInit.call(this);
    };
    HashiComponent.prototype.setupColors = function () {
        this.circleColor = [
            '#4db93b',
            '#aad46d',
            '#80daaf',
            '#4bb5ac',
            '#ffba53',
            '#d88799',
            '#f24b3e',
            '#dc1d2b',
            '#ec2474'
        ];
        this.circleTextColor = '#303030';
        this.circleSelectedColor = [
            '#4db93b',
            '#d1f898',
            '#a5fad1',
            '#84e8de',
            '#ffd79d',
            '#f8abbd',
            '#ff9289',
            '#f86872',
            '#ff77ad',
        ];
        this.backgroundColor = '#2c2c2c';
        this.gridColor = '#a89984';
        this.bridgeColor = '#fff2ad';
        this.wrongCircleColor = '#FFFFFF';
    };
    HashiComponent.prototype.setupBoard = function () {
        _super.prototype.setupBoard.call(this);
        var width;
        var height;
        var numNodes;
        var extreme;
        switch (this.difficulty) {
            // Easy or default
            case 1:
            default: {
                width = 10;
                height = 10;
                numNodes = 15000;
                extreme = false;
                break;
            }
            // Medium
            case 2: {
                width = 15;
                height = 15;
                numNodes = 15000;
                extreme = false;
                break;
            }
            // Hard
            case 3: {
                width = 25;
                height = 25;
                numNodes = 500000;
                extreme = false;
                break;
            }
            // Extreme
            case 4: {
                width = 29;
                height = 29;
                numNodes = 500000;
                extreme = true;
                break;
            }
            // Custom board size
            case 5: {
                width = Number(this.route.snapshot.paramMap.get('width'));
                height = Number(this.route.snapshot.paramMap.get('height'));
                numNodes = 500000;
                extreme = false;
                break;
            }
        }
        this.board = new _services_boards_hashi_board_service__WEBPACK_IMPORTED_MODULE_2__["Board"](width, height, numNodes, extreme, 0);
    };
    HashiComponent.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.drawGrid();
        this.drawBridges();
        this.drawCircles();
        this.drawCircleRed(this.coloredNode);
        this.drawCircleRed(this.hoveredNode);
        if (this.board.isSolved()) {
            this.done();
        }
    };
    HashiComponent.prototype.drawGrid = function () {
        var circleX;
        var circleX2;
        var circleY;
        var circleY2;
        var x;
        var y;
        for (x = 1; x <= this.board.width; x++) {
            circleX = this.xAdd + (x * (this.factor));
            circleY = this.yAdd + (1 * (this.factor));
            circleY2 = this.yAdd + (this.board.height * (this.factor));
            this.context.lineWidth = 1;
            this.context.strokeStyle = this.gridColor;
            this.context.moveTo(circleX, circleY);
            this.context.lineTo(circleX, circleY2);
            this.context.stroke();
        }
        for (y = 1; y <= this.board.height; y++) {
            circleX = this.xAdd + (1 * (this.factor));
            circleY = this.yAdd + (y * (this.factor));
            circleX2 = this.xAdd + (this.board.width * (this.factor));
            this.context.lineWidth = 1;
            this.context.strokeStyle = this.gridColor;
            this.context.moveTo(circleX, circleY);
            this.context.lineTo(circleX2, circleY);
            this.context.stroke();
        }
    };
    HashiComponent.prototype.drawBridges = function () {
        for (var _i = 0, _a = this.board.getNodes(); _i < _a.length; _i++) {
            var node = _a[_i];
            for (var _b = 0, _c = node.getBridges(); _b < _c.length; _b++) {
                var bridge = _c[_b];
                if (bridge.getNum() > 0) {
                    if (bridge.getNum() === 1) {
                        var n1x = this.xAdd + (bridge.getN1().getX() * (this.factor));
                        var n1y = this.yAdd + (bridge.getN1().getY() * (this.factor));
                        var n2x = this.xAdd + (bridge.getN2().getX() * (this.factor));
                        var n2y = this.yAdd + (bridge.getN2().getY() * (this.factor));
                        this.context.strokeStyle = this.bridgeColor;
                        this.context.lineWidth = this.factor / 10;
                        this.context.strokeRect(n1x, n1y, n2x - n1x, n2y - n1y);
                    }
                    else {
                        var n1x = this.xAdd + (bridge.getN1().getX() * (this.factor));
                        var n1y = this.yAdd + (bridge.getN1().getY() * (this.factor));
                        var n2x = this.xAdd + (bridge.getN2().getX() * (this.factor));
                        var n2y = this.yAdd + (bridge.getN2().getY() * (this.factor));
                        if (n1x === n2x) {
                            var b1x = n1x - this.factor / 5;
                            var b2x = n2x - this.factor / 5;
                            var b3x = n1x + this.factor / 5;
                            var b4x = n2x + this.factor / 5;
                            this.context.strokeStyle = this.bridgeColor;
                            this.context.lineWidth = this.factor / 10;
                            this.context.strokeRect(b1x, n1y, b2x - b1x, (n2y - n1y));
                            this.context.strokeRect(b3x, n1y, b4x - b3x, (n2y - n1y));
                        }
                        else {
                            var b1y = n1y - this.factor / 5;
                            var b2y = n2y - this.factor / 5;
                            var b3y = n1y + this.factor / 5;
                            var b4y = n2y + this.factor / 5;
                            this.context.strokeStyle = this.bridgeColor;
                            this.context.lineWidth = this.factor / 10;
                            this.context.strokeRect(n1x, b1y, (n2x - n1x), (b2y - b1y));
                            this.context.strokeRect(n1x, b3y, (n2x - n1x), (b4y - b3y));
                        }
                    }
                }
            }
        }
    };
    HashiComponent.prototype.drawCircles = function () {
        for (var _i = 0, _a = this.board.getNodes(); _i < _a.length; _i++) {
            var node = _a[_i];
            var colorStr = void 0;
            if (node.getVal() - this.getNumBridges(node) >= 0) {
                colorStr = this.circleColor[node.getVal() - this.getNumBridges(node)];
            }
            else {
                colorStr = this.wrongCircleColor;
            }
            this.drawCircle(node, colorStr);
        }
    };
    HashiComponent.prototype.getCircleHere = function (x, y) {
        for (var _i = 0, _a = this.board.getNodes(); _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.getX() == x && node.getY() == y) {
                return node;
            }
        }
        return null;
    };
    HashiComponent.prototype.isCircleHere = function (x, y) {
        for (var _i = 0, _a = this.board.getNodes(); _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.getX() == x && node.getY() == y) {
                return true;
            }
        }
        return false;
    };
    HashiComponent.prototype.drawCircleRed = function (node) {
        if (node != undefined) {
            if (node.getVal() - this.getNumBridges(node) >= 0) {
                this.drawCircle(node, this.circleSelectedColor[node.getVal() - this.getNumBridges(node)]);
            }
            else {
                this.drawCircle(node, this.circleSelectedColor[0]);
            }
        }
    };
    HashiComponent.prototype.getNumBridges = function (node) {
        var toReturn = 0;
        for (var _i = 0, _a = node.getBridges(); _i < _a.length; _i++) {
            var b = _a[_i];
            toReturn += b.getNum();
        }
        return toReturn;
    };
    HashiComponent.prototype.drawCircle = function (node, colorStr) {
        try {
            var circleX = (node.getX() * (this.factor)) - this.factor / 2;
            var circleY = (node.getY() * (this.factor)) - this.factor / 2;
            var circleString = "" + node.getVal();
            this.context.fillStyle = colorStr;
            this.context.strokeStlye = "#FFFFFF";
            this.ellipse(this.context, this.xAdd + circleX, this.yAdd + circleY, this.squareSize, this.squareSize);
            this.context.textAlign = 'center';
            this.context.fillStyle = this.circleTextColor;
            this.context.fillText(circleString, this.xAdd + circleX + this.factor / 2, this.yAdd + circleY + this.factor / 1.2);
        }
        catch (_a) {
            return;
        }
    };
    HashiComponent.prototype.ellipse = function (context, cx, cy, rx, ry) {
        context.save(); // save state
        context.beginPath();
        context.translate(cx, cy);
        context.scale(rx / 2, ry / 2);
        context.arc(1, 1, 1, 0, 2 * Math.PI, false);
        context.fill();
        context.restore(); // restore to original state
    };
    HashiComponent.prototype.fixSizes = function () {
        this.context.beginPath();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = window.innerWidth - 225;
        this.canvas.height = window.innerHeight - 112;
        this.context.translate(0.5, 0.5);
        var larger = Math.max(this.board.width, this.board.height) + 1;
        var size = Math.min(this.canvas.offsetWidth, this.canvas.offsetHeight);
        this.factor = Math.floor(size / larger);
        this.squareSize = this.factor;
        this.context.font = 'bold ' + Math.round(this.factor) + 'px Poppins';
        var w = this.canvas.offsetWidth;
        var h = this.canvas.offsetHeight;
        if (w > h) {
            this.xAdd = Math.round((w - h) / 2);
            this.yAdd = 0;
        }
        else {
            this.xAdd = 0;
            this.yAdd = Math.round((h - w) / 2);
        }
        this.draw();
    };
    /* EVENT LISTENERS */
    HashiComponent.prototype.mousePressed = function (mouseEvent) {
        if (!this.solved) {
            var x = mouseEvent.clientX + window.scrollX;
            var y = mouseEvent.clientY + window.scrollY;
            this.pressedX = x;
            this.pressedY = y;
            var pointX = Math.round(((x - 225 - this.xAdd)) / this.factor);
            var pointY = Math.round(((y - 56 - this.yAdd)) / this.factor);
            if (this.isCircleHere(pointX, pointY)) {
                this.coloredNode = this.getCircleHere(pointX, pointY);
                this.draw();
            }
            else {
                this.coloredNode = undefined;
            }
        }
    };
    HashiComponent.prototype.numBridgeDown = function (num) {
        var counter;
        try {
            if (this.isCircleHere(this.coloredNode.getX(), this.coloredNode.getY() + 1)) {
                return;
            }
        }
        catch (_a) {
            return;
        }
        if (this.isCrossing(this.coloredNode.getX(), this.coloredNode.getY() + 1, 'd')) {
            return;
        }
        for (counter = this.coloredNode.getY() + 1; counter < this.board.height + 1; counter++) {
            if (this.isCircleHere(this.coloredNode.getX(), counter)) {
                var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
                var bridgeExists = false;
                for (var _i = 0, _b = toBridgeTo.getBridges(); _i < _b.length; _i++) {
                    var bridge_1 = _b[_i];
                    if ((bridge_1.getN1().getX() === this.coloredNode.getX() &&
                        bridge_1.getN1().getY() === this.coloredNode.getY()) ||
                        (bridge_1.getN2().getX() === this.coloredNode.getX() &&
                            bridge_1.getN2().getY() === this.coloredNode.getY())) {
                        bridge_1.setNum(num);
                        bridgeExists = true;
                    }
                }
                if (!bridgeExists) {
                    var bridge = new _services_boards_hashi_board_service__WEBPACK_IMPORTED_MODULE_2__["Bridge"](this.coloredNode, toBridgeTo, num);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }
                return;
            }
        }
    };
    HashiComponent.prototype.specialBridgeDown = function () {
        var counter;
        if (this.isCircleHere(this.coloredNode.getX(), this.coloredNode.getY() + 1)) {
            return;
        }
        if (this.isCrossing(this.coloredNode.getX(), this.coloredNode.getY() + 1, 'd')) {
            return;
        }
        for (counter = this.coloredNode.getY() + 1; counter < this.board.height + 1; counter++) {
            if (this.isCircleHere(this.coloredNode.getX(), counter)) {
                var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
                var bridgeExists = false;
                for (var _i = 0, _a = toBridgeTo.getBridges(); _i < _a.length; _i++) {
                    var bridge_2 = _a[_i];
                    if ((bridge_2.getN1().getX() === this.coloredNode.getX() &&
                        bridge_2.getN1().getY() === this.coloredNode.getY()) ||
                        (bridge_2.getN2().getX() === this.coloredNode.getX() &&
                            bridge_2.getN2().getY() === this.coloredNode.getY())) {
                        if (bridge_2.getNum() === 2) {
                            bridge_2.setNum(0);
                        }
                        else {
                            bridge_2.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }
                if (!bridgeExists) {
                    var bridge = new _services_boards_hashi_board_service__WEBPACK_IMPORTED_MODULE_2__["Bridge"](this.coloredNode, toBridgeTo, 2);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }
                return;
            }
        }
    };
    HashiComponent.prototype.bridgeDown = function () {
        var counter;
        if (this.isCircleHere(this.coloredNode.getX(), this.coloredNode.getY() + 1)) {
            return;
        }
        if (this.isCrossing(this.coloredNode.getX(), this.coloredNode.getY() + 1, 'd')) {
            return;
        }
        for (counter = this.coloredNode.getY() + 1; counter < this.board.height + 1; counter++) {
            if (this.isCircleHere(this.coloredNode.getX(), counter)) {
                var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
                var bridgeExists = false;
                for (var _i = 0, _a = toBridgeTo.getBridges(); _i < _a.length; _i++) {
                    var bridge_3 = _a[_i];
                    if ((bridge_3.getN1().getX() === this.coloredNode.getX() &&
                        bridge_3.getN1().getY() === this.coloredNode.getY()) ||
                        (bridge_3.getN2().getX() === this.coloredNode.getX() &&
                            bridge_3.getN2().getY() === this.coloredNode.getY())) {
                        if (bridge_3.getNum() === 2) {
                            bridge_3.setNum(0);
                        }
                        else {
                            bridge_3.setNum(bridge_3.getNum() + 1);
                        }
                        bridgeExists = true;
                    }
                }
                if (!bridgeExists) {
                    var bridge = new _services_boards_hashi_board_service__WEBPACK_IMPORTED_MODULE_2__["Bridge"](this.coloredNode, toBridgeTo, 1);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }
                return;
            }
        }
    };
    HashiComponent.prototype.bridgeUp = function () {
        var counter;
        if (this.isCircleHere(this.coloredNode.getX(), this.coloredNode.getY() - 1)) {
            return;
        }
        if (this.isCrossing(this.coloredNode.getX(), this.coloredNode.getY() - 1, 'u')) {
            return;
        }
        for (counter = this.coloredNode.getY() - 1; counter > 0; counter--) {
            if (this.isCircleHere(this.coloredNode.getX(), counter)) {
                var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
                var bridgeExists = false;
                for (var _i = 0, _a = toBridgeTo.getBridges(); _i < _a.length; _i++) {
                    var bridge_4 = _a[_i];
                    if ((bridge_4.getN1().getX() === this.coloredNode.getX() &&
                        bridge_4.getN1().getY() === this.coloredNode.getY()) ||
                        (bridge_4.getN2().getX() === this.coloredNode.getX() &&
                            bridge_4.getN2().getY() === this.coloredNode.getY())) {
                        if (bridge_4.getNum() === 2) {
                            bridge_4.setNum(0);
                        }
                        else {
                            bridge_4.setNum(bridge_4.getNum() + 1);
                        }
                        bridgeExists = true;
                    }
                }
                if (!bridgeExists) {
                    var bridge = new _services_boards_hashi_board_service__WEBPACK_IMPORTED_MODULE_2__["Bridge"](this.coloredNode, toBridgeTo, 1);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }
                return;
            }
        }
    };
    HashiComponent.prototype.specialBridgeUp = function () {
        var counter;
        if (this.isCircleHere(this.coloredNode.getX(), this.coloredNode.getY() - 1)) {
            return;
        }
        if (this.isCrossing(this.coloredNode.getX(), this.coloredNode.getY() - 1, 'u')) {
            return;
        }
        for (counter = this.coloredNode.getY() - 1; counter > 0; counter--) {
            if (this.isCircleHere(this.coloredNode.getX(), counter)) {
                var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
                var bridgeExists = false;
                for (var _i = 0, _a = toBridgeTo.getBridges(); _i < _a.length; _i++) {
                    var bridge_5 = _a[_i];
                    if ((bridge_5.getN1().getX() === this.coloredNode.getX() &&
                        bridge_5.getN1().getY() === this.coloredNode.getY()) ||
                        (bridge_5.getN2().getX() === this.coloredNode.getX() &&
                            bridge_5.getN2().getY() === this.coloredNode.getY())) {
                        if (bridge_5.getNum() === 2) {
                            bridge_5.setNum(0);
                        }
                        else {
                            bridge_5.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }
                if (!bridgeExists) {
                    var bridge = new _services_boards_hashi_board_service__WEBPACK_IMPORTED_MODULE_2__["Bridge"](this.coloredNode, toBridgeTo, 2);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }
                return;
            }
        }
    };
    HashiComponent.prototype.numBridgeUp = function (num) {
        var counter;
        try {
            if (this.isCircleHere(this.coloredNode.getX(), this.coloredNode.getY() - 1)) {
                return;
            }
        }
        catch (_a) {
            return;
        }
        if (this.isCrossing(this.coloredNode.getX(), this.coloredNode.getY() - 1, 'u')) {
            return;
        }
        for (counter = this.coloredNode.getY() - 1; counter > 0; counter--) {
            if (this.isCircleHere(this.coloredNode.getX(), counter)) {
                var toBridgeTo = this.getCircleHere(this.coloredNode.getX(), counter);
                var bridgeExists = false;
                for (var _i = 0, _b = toBridgeTo.getBridges(); _i < _b.length; _i++) {
                    var bridge_6 = _b[_i];
                    if ((bridge_6.getN1().getX() === this.coloredNode.getX() &&
                        bridge_6.getN1().getY() === this.coloredNode.getY()) ||
                        (bridge_6.getN2().getX() === this.coloredNode.getX() &&
                            bridge_6.getN2().getY() === this.coloredNode.getY())) {
                        bridge_6.setNum(num);
                        bridgeExists = true;
                    }
                }
                if (!bridgeExists) {
                    var bridge = new _services_boards_hashi_board_service__WEBPACK_IMPORTED_MODULE_2__["Bridge"](this.coloredNode, toBridgeTo, num);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }
                return;
            }
        }
    };
    HashiComponent.prototype.bridgeRight = function () {
        var counter;
        if (this.isCircleHere(this.coloredNode.getX() + 1, this.coloredNode.getY())) {
            return;
        }
        if (this.isCrossing(this.coloredNode.getX() + 1, this.coloredNode.getY(), 'r')) {
            return;
        }
        for (counter = this.coloredNode.getX() + 1; counter < this.board.width + 1; counter++) {
            if (this.isCircleHere(counter, this.coloredNode.getY())) {
                var toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
                var bridgeExists = false;
                for (var _i = 0, _a = toBridgeTo.getBridges(); _i < _a.length; _i++) {
                    var bridge_7 = _a[_i];
                    if ((bridge_7.getN1().getX() === this.coloredNode.getX() &&
                        bridge_7.getN1().getY() === this.coloredNode.getY()) ||
                        (bridge_7.getN2().getX() === this.coloredNode.getX() &&
                            bridge_7.getN2().getY() === this.coloredNode.getY())) {
                        if (bridge_7.getNum() === 2) {
                            bridge_7.setNum(0);
                        }
                        else {
                            bridge_7.setNum(bridge_7.getNum() + 1);
                        }
                        bridgeExists = true;
                    }
                }
                if (!bridgeExists) {
                    var bridge = new _services_boards_hashi_board_service__WEBPACK_IMPORTED_MODULE_2__["Bridge"](this.coloredNode, toBridgeTo, 1);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }
                return;
            }
        }
    };
    HashiComponent.prototype.numBridgeRight = function (num) {
        var counter;
        try {
            if (this.isCircleHere(this.coloredNode.getX() + 1, this.coloredNode.getY())) {
                return;
            }
        }
        catch (_a) {
            return;
        }
        if (this.isCrossing(this.coloredNode.getX() + 1, this.coloredNode.getY(), 'r')) {
            return;
        }
        for (counter = this.coloredNode.getX() + 1; counter < this.board.width + 1; counter++) {
            if (this.isCircleHere(counter, this.coloredNode.getY())) {
                var toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
                var bridgeExists = false;
                for (var _i = 0, _b = toBridgeTo.getBridges(); _i < _b.length; _i++) {
                    var bridge = _b[_i];
                    if ((bridge.getN1().getX() === this.coloredNode.getX() &&
                        bridge.getN1().getY() === this.coloredNode.getY()) ||
                        (bridge.getN2().getX() === this.coloredNode.getX() &&
                            bridge.getN2().getY() === this.coloredNode.getY())) {
                        bridge.setNum(num);
                        bridgeExists = true;
                    }
                }
                if (!bridgeExists) {
                    var bridge = new _services_boards_hashi_board_service__WEBPACK_IMPORTED_MODULE_2__["Bridge"](this.coloredNode, toBridgeTo, num);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }
                return;
            }
        }
    };
    HashiComponent.prototype.specialBridgeRight = function () {
        var counter;
        if (this.isCircleHere(this.coloredNode.getX() + 1, this.coloredNode.getY())) {
            return;
        }
        if (this.isCrossing(this.coloredNode.getX() + 1, this.coloredNode.getY(), 'r')) {
            return;
        }
        for (counter = this.coloredNode.getX() + 1; counter < this.board.width + 1; counter++) {
            if (this.isCircleHere(counter, this.coloredNode.getY())) {
                var toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
                var bridgeExists = false;
                for (var _i = 0, _a = toBridgeTo.getBridges(); _i < _a.length; _i++) {
                    var bridge_8 = _a[_i];
                    if ((bridge_8.getN1().getX() === this.coloredNode.getX() &&
                        bridge_8.getN1().getY() === this.coloredNode.getY()) ||
                        (bridge_8.getN2().getX() === this.coloredNode.getX() &&
                            bridge_8.getN2().getY() === this.coloredNode.getY())) {
                        if (bridge_8.getNum() === 2) {
                            bridge_8.setNum(0);
                        }
                        else {
                            bridge_8.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }
                if (!bridgeExists) {
                    var bridge = new _services_boards_hashi_board_service__WEBPACK_IMPORTED_MODULE_2__["Bridge"](this.coloredNode, toBridgeTo, 2);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }
                return;
            }
        }
    };
    HashiComponent.prototype.bridgeLeft = function () {
        var counter;
        if (this.isCircleHere(this.coloredNode.getX() - 1, this.coloredNode.getY())) {
            return;
        }
        if (this.isCrossing(this.coloredNode.getX() - 1, this.coloredNode.getY(), 'l')) {
            return;
        }
        for (counter = this.coloredNode.getX() - 1; counter > 0; counter--) {
            if (this.isCircleHere(counter, this.coloredNode.getY())) {
                var toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
                var bridgeExists = false;
                for (var _i = 0, _a = toBridgeTo.getBridges(); _i < _a.length; _i++) {
                    var bridge_9 = _a[_i];
                    if ((bridge_9.getN1().getX() === this.coloredNode.getX() &&
                        bridge_9.getN1().getY() === this.coloredNode.getY()) ||
                        (bridge_9.getN2().getX() === this.coloredNode.getX() &&
                            bridge_9.getN2().getY() === this.coloredNode.getY())) {
                        if (bridge_9.getNum() === 2) {
                            bridge_9.setNum(0);
                        }
                        else {
                            bridge_9.setNum(bridge_9.getNum() + 1);
                        }
                        bridgeExists = true;
                    }
                }
                if (!bridgeExists) {
                    var bridge = new _services_boards_hashi_board_service__WEBPACK_IMPORTED_MODULE_2__["Bridge"](this.coloredNode, toBridgeTo, 1);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }
                return;
            }
        }
    };
    HashiComponent.prototype.numBridgeLeft = function (num) {
        var counter;
        try {
            if (this.isCircleHere(this.coloredNode.getX() - 1, this.coloredNode.getY())) {
                return;
            }
        }
        catch (_a) {
            return;
        }
        if (this.isCrossing(this.coloredNode.getX() - 1, this.coloredNode.getY(), 'l')) {
            return;
        }
        for (counter = this.coloredNode.getX() - 1; counter > 0; counter--) {
            if (this.isCircleHere(counter, this.coloredNode.getY())) {
                var toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
                var bridgeExists = false;
                for (var _i = 0, _b = toBridgeTo.getBridges(); _i < _b.length; _i++) {
                    var bridge_10 = _b[_i];
                    if ((bridge_10.getN1().getX() === this.coloredNode.getX() &&
                        bridge_10.getN1().getY() === this.coloredNode.getY()) ||
                        (bridge_10.getN2().getX() === this.coloredNode.getX() &&
                            bridge_10.getN2().getY() === this.coloredNode.getY())) {
                        bridge_10.setNum(num);
                        bridgeExists = true;
                    }
                }
                if (!bridgeExists) {
                    var bridge = new _services_boards_hashi_board_service__WEBPACK_IMPORTED_MODULE_2__["Bridge"](this.coloredNode, toBridgeTo, num);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }
                return;
            }
        }
    };
    HashiComponent.prototype.specialBridgeLeft = function () {
        var counter;
        if (this.isCircleHere(this.coloredNode.getX() - 1, this.coloredNode.getY())) {
            return;
        }
        if (this.isCrossing(this.coloredNode.getX() - 1, this.coloredNode.getY(), 'l')) {
            return;
        }
        for (counter = this.coloredNode.getX() - 1; counter > 0; counter--) {
            if (this.isCircleHere(counter, this.coloredNode.getY())) {
                var toBridgeTo = this.getCircleHere(counter, this.coloredNode.getY());
                var bridgeExists = false;
                for (var _i = 0, _a = toBridgeTo.getBridges(); _i < _a.length; _i++) {
                    var bridge_11 = _a[_i];
                    if ((bridge_11.getN1().getX() === this.coloredNode.getX() &&
                        bridge_11.getN1().getY() === this.coloredNode.getY()) ||
                        (bridge_11.getN2().getX() === this.coloredNode.getX() &&
                            bridge_11.getN2().getY() === this.coloredNode.getY())) {
                        if (bridge_11.getNum() === 2) {
                            bridge_11.setNum(0);
                        }
                        else {
                            bridge_11.setNum(2);
                        }
                        bridgeExists = true;
                    }
                }
                if (!bridgeExists) {
                    var bridge = new _services_boards_hashi_board_service__WEBPACK_IMPORTED_MODULE_2__["Bridge"](this.coloredNode, toBridgeTo, 2);
                    this.coloredNode.addBridge(bridge);
                    toBridgeTo.addBridge(bridge);
                }
                return;
            }
        }
    };
    HashiComponent.prototype.isCrossing = function (startX, startY, direction) {
        if (direction == 'u') {
            while (true) {
                if (this.isBridgeHere(startX, startY, 'h'))
                    return true;
                if (this.isCircleHere(startX, startY))
                    return false;
                if (startY <= 0)
                    return true;
                startY--;
            }
        }
        else if (direction == 'd') {
            while (true) {
                if (this.isBridgeHere(startX, startY, 'h'))
                    return true;
                if (this.isCircleHere(startX, startY))
                    return false;
                if (startY >= this.board.height)
                    return true;
                startY++;
            }
        }
        else if (direction == 'r') {
            while (true) {
                if (this.isBridgeHere(startX, startY, 'v'))
                    return true;
                if (this.isCircleHere(startX, startY))
                    return false;
                if (startX >= this.board.width)
                    return true;
                startX++;
            }
        }
        else if (direction == 'l') {
            while (true) {
                if (this.isBridgeHere(startX, startY, 'v'))
                    return true;
                if (this.isCircleHere(startX, startY))
                    return false;
                if (startX <= 0)
                    return true;
                startX--;
            }
        }
    };
    HashiComponent.prototype.isBridgeHere = function (x, y, direction) {
        var bridges = this.getBridgeArray();
        if (direction == 'v') {
            bridges = bridges.filter(function (b) { return b.n1.x == b.n2.x && b.n1.x == x && ((b.n1.y > y && b.n2.y < y) || (b.n1.y < y && b.n2.y > y)); });
        }
        else if (direction == 'h') {
            bridges = bridges.filter(function (b) { return b.n1.y == b.n2.y && b.n1.y == y && ((b.n1.x > x && b.n2.x < x) || (b.n1.x < x && b.n2.x > x)); });
        }
        return bridges.length > 0;
    };
    HashiComponent.prototype.getBridgeArray = function () {
        var toReturn = [];
        for (var _i = 0, _a = this.board.getNodes(); _i < _a.length; _i++) {
            var node = _a[_i];
            for (var _b = 0, _c = node.getBridges(); _b < _c.length; _b++) {
                var bridge = _c[_b];
                if (bridge.getNum() > 0)
                    toReturn.push(bridge);
            }
        }
        return toReturn;
    };
    HashiComponent.prototype.mouseReleased = function (mouseEvent) {
        var x = mouseEvent.clientX;
        var y = mouseEvent.clientY;
        var button = mouseEvent.button;
        if (!this.shift) {
            if (this.coloredNode !== undefined) {
                if (Math.abs(this.pressedX - x) > Math.abs(this.pressedY - y)) {
                    if (this.pressedX > x) {
                        this.bridgeLeft();
                        if (button == 2) {
                            this.bridgeLeft();
                        }
                        this.draw();
                    }
                    else {
                        this.bridgeRight();
                        if (button == 2) {
                            this.bridgeRight();
                        }
                        this.draw();
                    }
                }
                else {
                    if (this.pressedY > y) {
                        this.bridgeUp();
                        if (button == 2) {
                            this.bridgeUp();
                        }
                        this.draw();
                    }
                    else {
                        this.bridgeDown();
                        if (button == 2) {
                            this.bridgeDown();
                        }
                        this.draw();
                    }
                }
                this.coloredNode = undefined;
                this.draw();
            }
        }
        else {
            if (button == 2) {
                this.numBridgeUp(2);
                this.numBridgeDown(2);
                this.numBridgeRight(2);
                this.numBridgeLeft(2);
            }
            else {
                this.numBridgeUp(1);
                this.numBridgeDown(1);
                this.numBridgeRight(1);
                this.numBridgeLeft(1);
            }
            this.coloredNode = undefined;
            this.draw();
        }
    };
    HashiComponent.prototype.mouseMove = function (mouseEvent) {
        this.mouseX = Math.round((mouseEvent.clientX - 225 - this.xAdd) / this.factor);
        this.mouseY = Math.round((mouseEvent.clientY - 56 - this.yAdd) / this.factor);
        if (this.isCircleHere(this.mouseX, this.mouseY)) {
            this.hoveredNode = this.getCircleHere(this.mouseX, this.mouseY);
            this.drawCircleRed(this.coloredNode);
        }
        else {
            this.hoveredNode = null;
        }
        this.draw();
    };
    HashiComponent.prototype.keyPressed = function (keyEvent) {
        if (keyEvent.keyCode == 32) {
            this.newGame();
            return;
        }
        if (!this.solved) {
            if (keyEvent.code == "ShiftLeft") {
                this.shift = true;
            }
            if (keyEvent.key == "w") {
                var pointX = this.mouseX;
                var pointY = this.mouseY;
                if (this.isCircleHere(pointX, pointY)) {
                    this.coloredNode = this.getCircleHere(pointX, pointY);
                    this.bridgeUp();
                    this.draw();
                    this.coloredNode = undefined;
                }
            }
            else if (keyEvent.key == "W") {
                var pointX = this.mouseX;
                var pointY = this.mouseY;
                if (this.isCircleHere(pointX, pointY)) {
                    this.coloredNode = this.getCircleHere(pointX, pointY);
                    this.specialBridgeUp();
                    this.draw();
                    this.coloredNode = undefined;
                }
            }
            else if (keyEvent.key == "s") {
                var pointX = this.mouseX;
                var pointY = this.mouseY;
                if (this.isCircleHere(pointX, pointY)) {
                    this.coloredNode = this.getCircleHere(pointX, pointY);
                    this.bridgeDown();
                    this.draw();
                    this.coloredNode = undefined;
                }
            }
            else if (keyEvent.key == "S") {
                var pointX = this.mouseX;
                var pointY = this.mouseY;
                if (this.isCircleHere(pointX, pointY)) {
                    this.coloredNode = this.getCircleHere(pointX, pointY);
                    this.specialBridgeDown();
                    this.draw();
                    this.coloredNode = undefined;
                }
            }
            else if (keyEvent.key == "a") {
                var pointX = this.mouseX;
                var pointY = this.mouseY;
                if (this.isCircleHere(pointX, pointY)) {
                    this.coloredNode = this.getCircleHere(pointX, pointY);
                    this.bridgeLeft();
                    this.draw();
                    this.coloredNode = undefined;
                }
            }
            else if (keyEvent.key == "A") {
                var pointX = this.mouseX;
                var pointY = this.mouseY;
                if (this.isCircleHere(pointX, pointY)) {
                    this.coloredNode = this.getCircleHere(pointX, pointY);
                    this.specialBridgeLeft();
                    this.draw();
                    this.coloredNode = undefined;
                }
            }
            else if (keyEvent.key == "d") {
                var pointX = this.mouseX;
                var pointY = this.mouseY;
                if (this.isCircleHere(pointX, pointY)) {
                    this.coloredNode = this.getCircleHere(pointX, pointY);
                    this.bridgeRight();
                    this.draw();
                    this.coloredNode = undefined;
                }
            }
            else if (keyEvent.key == "D") {
                var pointX = this.mouseX;
                var pointY = this.mouseY;
                if (this.isCircleHere(pointX, pointY)) {
                    this.coloredNode = this.getCircleHere(pointX, pointY);
                    this.specialBridgeRight();
                    this.draw();
                    this.coloredNode = undefined;
                }
            }
        }
    };
    HashiComponent.prototype.keyReleased = function (keyEvent) {
        if (keyEvent.code == "ShiftLeft") {
            this.shift = false;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], HashiComponent.prototype, "mousePressed", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], HashiComponent.prototype, "mouseReleased", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], HashiComponent.prototype, "mouseMove", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], HashiComponent.prototype, "keyPressed", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], HashiComponent.prototype, "keyReleased", null);
    HashiComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-hashi',
            template: __webpack_require__(/*! ../game-board/game-board.component.html */ "./src/app/games/game-board/game-board.component.html"),
            styles: [__webpack_require__(/*! ../game-board/game-board.component.css */ "./src/app/games/game-board/game-board.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_colors_color_service__WEBPACK_IMPORTED_MODULE_8__["ColorService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_5__["TunnelService"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"],
            _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_4__["TimerService"],
            _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_3__["LoaderService"],
            _services_games_options_service__WEBPACK_IMPORTED_MODULE_10__["OptionsService"]])
    ], HashiComponent);
    return HashiComponent;
}(_classes_game_board__WEBPACK_IMPORTED_MODULE_9__["GameBoard"]));



/***/ }),

/***/ "./src/app/games/kakuro/kakuro.component.css":
/*!***************************************************!*\
  !*** ./src/app/games/kakuro/kakuro.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/games/kakuro/kakuro.component.html":
/*!****************************************************!*\
  !*** ./src/app/games/kakuro/kakuro.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  kakuro works!\n</p>\n"

/***/ }),

/***/ "./src/app/games/kakuro/kakuro.component.ts":
/*!**************************************************!*\
  !*** ./src/app/games/kakuro/kakuro.component.ts ***!
  \**************************************************/
/*! exports provided: KakuroComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KakuroComponent", function() { return KakuroComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/loading-service/loader.service */ "./src/app/services/loading-service/loader.service.ts");
/* harmony import */ var _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/timer/timer.service */ "./src/app/services/timer/timer.service.ts");
/* harmony import */ var _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../enums/game-id.enum */ "./src/app/enums/game-id.enum.ts");
/* harmony import */ var _services_colors_color_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/colors/color.service */ "./src/app/services/colors/color.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var KakuroComponent = /** @class */ (function () {
    function KakuroComponent(route, tunnel, colorService, router, userService, timer, loader) {
        this.route = route;
        this.tunnel = tunnel;
        this.colorService = colorService;
        this.router = router;
        this.userService = userService;
        this.timer = timer;
        this.loader = loader;
        // TODO - enter game ID here
        this.gameID = _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__["GameID"].TILE_GAME;
        // TODO - enter control scheme here
        this.controls = "Description of game controls goes here";
        // TODO - enter game rules here
        this.rules = "Rules of the game goes here";
        this.canvasOffsetX = 225;
        this.canvasOffsetY = 56;
        // Most games utilize a grid
        this.gridOffsetX = 100;
        this.gridOffsetY = 100;
        this.solved = false;
        this.colors = colorService.getColorScheme();
    }
    KakuroComponent.prototype.ngOnInit = function () {
        var _this_1 = this;
        // Read difficulty from URL param
        this.difficulty = Number(this.route.snapshot.paramMap.get('diff'));
        this.canvas = document.getElementById('myCanvas');
        this.context = this.canvas.getContext('2d');
        // Easy
        if (this.difficulty == 1) {
            console.log('Easy difficulty');
        }
        // Medium
        else if (this.difficulty == 2) {
            console.log('Medium difficulty');
        }
        // Hard
        else if (this.difficulty == 3) {
            console.log('Hard difficulty');
        }
        // Extreme
        else if (this.difficulty == 4) {
            console.log('Extreme difficulty');
        }
        // Start timer if we are logged in
        if (this.userService.isLoggedIn()) {
            // Get personal high scores
            var m = {
                GameID: this.gameID,
                Difficulty: this.difficulty
            };
            this.tunnel.getPersonalBest(m)
                .subscribe(function (data) {
                _this_1.personalBestDaily = data['daily'];
                _this_1.personalBestWeekly = data['weekly'];
                _this_1.personalBestMonthly = data['monthly'];
            });
            this.timer.startTimer(this.gameID, this.difficulty)
                .subscribe(function (data) {
                _this_1.seed = data['seed'];
                // TODO - generate board with seed
                _this_1.startDate = new Date();
                _this_1.displayTimer();
                _this_1.fixSizes();
                _this_1.draw();
            });
        }
        else {
            this.seed = Math.floor(Math.random() * (2000000000));
            // TODO - generate board with seed
            this.startDate = new Date();
            this.displayTimer();
            this.fixSizes();
            this.draw();
        }
    };
    KakuroComponent.prototype.draw = function () {
        this.context.beginPath();
        this.drawBackground();
    };
    KakuroComponent.prototype.drawBackground = function () {
        this.context.fillStyle = this.colors.BACKGROUND; // Background color
        this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
    };
    KakuroComponent.prototype.done = function () {
        this.solved = true;
        if (this.userService.isLoggedIn()) {
            this.timer.stopTimer(this.seed, this.gameID, this.difficulty, 'TODO - Board Solution String')
                .subscribe(function (data) { });
        }
        else {
            // Do nothing - we're not logged in
        }
    };
    KakuroComponent.prototype.add = function (that) {
        var display = document.getElementById("timer");
        var now = +new Date();
        var diff = ((now - that.startDate));
        var hours = Math.trunc(diff / (60 * 60 * 1000));
        var minutes = Math.trunc(diff / (60 * 1000)) % 60;
        var seconds = Math.trunc(diff / (1000)) % 60;
        var millis = diff % 1000;
        try {
            display.textContent =
                hours + ":" +
                    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
                    (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + "." +
                    (millis ? (millis > 99 ? millis : millis > 9 ? "0" + millis : "00" + millis) : "000");
            that.displayTimer();
        }
        catch (_a) {
            // Do nothing - page probably re-routed
        }
    };
    KakuroComponent.prototype.displayTimer = function () {
        if (!this.solved) {
            var _this = this;
            this.t = setTimeout(function () { _this.add(_this); }, 50);
        }
    };
    KakuroComponent.prototype.fixSizes = function () {
        this.context.beginPath();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = window.innerWidth - this.canvasOffsetX;
        this.canvas.height = window.innerHeight - (this.canvasOffsetY * 2);
        this.context.translate(0.5, 0.5);
        this.gridOffsetX = this.canvas.width / 20;
        this.gridOffsetY = this.canvas.height / 20;
        var boardLength = Math.max(this.board.width, this.board.height);
        var size = Math.min(this.canvas.offsetWidth - (this.gridOffsetX * 2), this.canvas.offsetHeight - (this.gridOffsetY * 2));
        var w = this.canvas.offsetWidth;
        var h = this.canvas.offsetHeight;
        if (w > h) {
            this.gridOffsetX = Math.round((w - h) / 2) + this.gridOffsetX;
        }
        else {
            this.gridOffsetY = Math.round((h - w) / 2) + this.gridOffsetY;
        }
        this.gridBoxSize = Math.round((size / boardLength));
        this.draw();
    };
    KakuroComponent.prototype.newGame = function () {
        var _this_1 = this;
        this.loader.startLoadingAnimation();
        if (this.userService.isLoggedIn()) {
            this.timer.startTimer(_enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__["GameID"].TILE_GAME, this.difficulty)
                .subscribe(function (data) {
                _this_1.seed = data['seed'];
                // TODO - generate board with seed
                if (_this_1.solved) {
                    _this_1.solved = false;
                    _this_1.startDate = new Date();
                    _this_1.displayTimer();
                }
                else {
                    _this_1.startDate = new Date();
                }
                _this_1.fixSizes();
                _this_1.loader.stopLoadingAnimation();
                _this_1.draw();
            });
        }
        else {
            // Generate board with random seed
            this.seed = Math.floor(Math.random() * (2000000000));
            // TODO - generate board with seed
            if (this.solved) {
                this.solved = false;
                this.startDate = new Date();
                this.displayTimer();
            }
            else {
                this.startDate = new Date();
            }
            this.fixSizes();
            this.loader.stopLoadingAnimation();
            this.draw();
        }
    };
    /* EVENT LISTENERS */
    // UNCOMMENT HostListener to track given event
    //@HostListener('document:mousedown', ['$event'])
    KakuroComponent.prototype.mousePressed = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        console.log({ 'mousePressedX': x, 'mousePressedY': y });
    };
    // UNCOMMENT HostListener to track given event
    //@HostListener('document:mouseup', ['$event'])
    KakuroComponent.prototype.mouseReleased = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        console.log({ 'mouseReleasedX': x, 'mouseReleasedY': y });
    };
    // UNCOMMENT HostListener to track given event
    //@HostListener('document:mousemove', ['$event'])
    KakuroComponent.prototype.mouseMove = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        console.log({ 'mouseMoveX': x, 'mouseMoveY': y });
    };
    // UNCOMMENT HostListener to track given event
    //@HostListener('document:keydown', ['$event'])
    KakuroComponent.prototype.keyPressed = function (keyEvent) {
        console.log({ 'keyPressed': keyEvent.keyCode });
    };
    // UNCOMMENT HostListener to track given event
    //@HostListener('document:keyup', ['$event'])
    KakuroComponent.prototype.keyReleased = function (keyEvent) {
        console.log({ 'keyReleased': keyEvent.keyCode });
    };
    KakuroComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-kakuro',
            template: __webpack_require__(/*! ./kakuro.component.html */ "./src/app/games/kakuro/kakuro.component.html"),
            styles: [__webpack_require__(/*! ./kakuro.component.css */ "./src/app/games/kakuro/kakuro.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_3__["TunnelService"],
            _services_colors_color_service__WEBPACK_IMPORTED_MODULE_7__["ColorService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__["TimerService"],
            _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__["LoaderService"]])
    ], KakuroComponent);
    return KakuroComponent;
}());



/***/ }),

/***/ "./src/app/games/minesweeper/minesweeper.component.ts":
/*!************************************************************!*\
  !*** ./src/app/games/minesweeper/minesweeper.component.ts ***!
  \************************************************************/
/*! exports provided: MinesweeperComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinesweeperComponent", function() { return MinesweeperComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/loading-service/loader.service */ "./src/app/services/loading-service/loader.service.ts");
/* harmony import */ var _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/timer/timer.service */ "./src/app/services/timer/timer.service.ts");
/* harmony import */ var _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../enums/game-id.enum */ "./src/app/enums/game-id.enum.ts");
/* harmony import */ var _services_boards_minesweeper_board_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/boards/minesweeper/board.service */ "./src/app/services/boards/minesweeper/board.service.ts");
/* harmony import */ var _services_colors_color_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/colors/color.service */ "./src/app/services/colors/color.service.ts");
/* harmony import */ var _classes_game_board__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../classes/game-board */ "./src/app/classes/game-board.ts");
/* harmony import */ var _services_games_options_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/games/options.service */ "./src/app/services/games/options.service.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MinesweeperComponent = /** @class */ (function (_super) {
    __extends(MinesweeperComponent, _super);
    function MinesweeperComponent(route, colorService, router, tunnel, userService, timer, loader, optionsService) {
        var _this = _super.call(this, route, colorService, router, tunnel, userService, timer, loader, optionsService) || this;
        _this.firstPress = true;
        _this.isPressed = false;
        _this.lose = false;
        _this.imgBomb = new Image();
        _this.imgFlag = new Image();
        _this.imgTile = new Image();
        _this.gameID = _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__["GameID"].MINESWEEPER;
        _this.gridBoxSize = 20; // needs to be dynamically adjusted by fixed sizes
        _this.gridOffsetY = 56;
        _this.imgBomb.src = '/assets/images/minesweeper/bomb.svg';
        _this.imgFlag.src = '/assets/images/minesweeper/flag.svg';
        _this.imgTile.src = '/assets/images/minesweeper/minesweeper_tile.svg';
        return _this;
    }
    MinesweeperComponent.prototype.setupBoard = function () {
        _super.prototype.setupBoard.call(this);
        var width;
        var height;
        var bombCount;
        switch (this.difficulty) {
            // Easy or default
            case 1:
            default: {
                width = 6;
                height = 6;
                bombCount = 8; // ratio of 8
                break;
            }
            // Medium
            case 2: {
                width = 8;
                height = 8;
                bombCount = 10; // ratio of 8
                break;
            }
            // Hard
            case 3: {
                width = 16;
                height = 13;
                bombCount = 40;
                break;
            }
            // Extreme
            case 4: {
                width = 30;
                height = 16;
                bombCount = 99;
                break;
            }
        }
        this.board = new _services_boards_minesweeper_board_service__WEBPACK_IMPORTED_MODULE_7__["Board"](width, height, bombCount, 0);
    };
    MinesweeperComponent.prototype.newGame = function (difficulty) {
        var _this = this;
        if (difficulty === void 0) { difficulty = this.difficulty; }
        this.difficulty = difficulty;
        this.setupBoard();
        this.loader.startLoadingAnimation();
        this.lose = false;
        if (this.userService.isLoggedIn()) {
            this.timer.startTimer(_enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__["GameID"].MINESWEEPER, this.difficulty)
                .subscribe(function (data) {
                // Generate board with given seed
                _this.seed = data['seed'];
                _this.board.seed = _this.seed;
                _this.board.generateBoard();
                _this.firstPress = true;
                if (_this.solved) {
                    _this.solved = false;
                    _this.startDate = new Date();
                    _this.displayTimer();
                }
                else {
                    _this.startDate = new Date();
                }
                _this.loader.stopLoadingAnimation();
                _this.fixSizes();
                _this.draw();
            });
        }
        else {
            // Generate board with random seed
            this.seed = Math.floor(Math.random() * (2000000000));
            this.board.seed = this.seed;
            this.board.generateBoard();
            this.firstPress = true;
            if (this.solved) {
                this.solved = false;
                this.startDate = new Date();
                this.displayTimer();
            }
            else {
                this.startDate = new Date();
            }
            this.loader.stopLoadingAnimation();
            this.fixSizes();
            this.draw();
        }
    };
    MinesweeperComponent.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.drawGrid();
        this.drawTiles();
        if (!this.lose) {
            this.highlightTile();
        }
        else {
            this.drawBombs();
        }
    };
    MinesweeperComponent.prototype.drawGrid = function () {
        this.context.strokeStyle = '#606060';
        this.context.lineWidth = 1;
        for (var i = 0; i <= this.board.width; i++) {
            this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
            this.context.lineTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY +
                (this.board.height * this.gridBoxSize));
            this.context.stroke();
        }
        for (var j = 0; j <= this.board.height; j++) {
            this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (j * this.gridBoxSize));
            this.context.lineTo(this.gridOffsetX + (this.board.width * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize));
            this.context.stroke();
        }
    };
    MinesweeperComponent.prototype.drawBombs = function () {
        for (var j = 0; j < this.board.height; j++) {
            for (var i = 0; i < this.board.width; i++) {
                if (this.board.mineField[j][i] === -1) {
                    this.drawBomb(i, j);
                }
            }
        }
    };
    MinesweeperComponent.prototype.drawBomb = function (x, y) {
        var startX = (this.gridOffsetX) + (x * this.gridBoxSize);
        var startY = (this.gridOffsetY) + (y * this.gridBoxSize);
        var width = this.gridBoxSize;
        var height = this.gridBoxSize;
        this.context.fillStyle = '#FF0000';
        this.context.fillRect(startX, startY, width, height);
        this.context.drawImage(this.imgBomb, startX, startY, width, height);
    };
    MinesweeperComponent.prototype.drawVisibleTile = function (x, y) {
        var boardValue = this.board.mineField[y][x];
        var tileString;
        if (boardValue === 0) {
            tileString = '';
        }
        else if (boardValue === -1) {
            tileString = 'B';
        }
        else {
            tileString = '' + boardValue;
        }
        this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.6) + 'px Poppins';
        this.context.textAlign = 'center';
        this.context.fillStyle = this.colors.COLOR_1;
        if (tileString === '1') {
            this.context.fillStyle = this.colors.COLOR_2;
        }
        if (tileString === '2') {
            this.context.fillStyle = this.colors.COLOR_1;
        }
        if (tileString === '3') {
            this.context.fillStyle = this.colors.COLOR_3;
        }
        if (tileString === '4') {
            this.context.fillStyle = this.colors.COLOR_4;
        }
        if (tileString === '5') {
            this.context.fillStyle = this.colors.COLOR_5;
        }
        if (tileString === '6') {
            this.context.fillStyle = this.colors.COLOR_6;
        }
        if (tileString === '7') {
            this.context.fillStyle = this.colors.COLOR_7;
        }
        if (tileString === '8') {
            this.context.fillStyle = this.colors.COLOR_8;
        }
        this.context.fillText(tileString, (this.gridOffsetX) + (x * this.gridBoxSize) + (this.gridBoxSize / 2), (this.gridOffsetY) + ((y + 1) * this.gridBoxSize) - (this.gridBoxSize / 4));
    };
    MinesweeperComponent.prototype.drawPressedTile = function (x, y) {
        var startX = (this.gridOffsetX) + (x * this.gridBoxSize);
        var startY = (this.gridOffsetY) + (y * this.gridBoxSize);
        var width = this.gridBoxSize;
        var height = this.gridBoxSize;
        this.context.fillStyle = '#A0A0A0';
        this.context.fillRect(startX, startY, width, height);
    };
    MinesweeperComponent.prototype.drawHiddenTile = function (x, y, color) {
        var startX = (this.gridOffsetX) + (x * this.gridBoxSize);
        var startY = (this.gridOffsetY) + (y * this.gridBoxSize);
        var width = this.gridBoxSize;
        var height = this.gridBoxSize;
        this.context.drawImage(this.imgTile, startX, startY, width, height);
    };
    MinesweeperComponent.prototype.drawFlaggedTile = function (x, y) {
        this.drawHiddenTile(x, y, this.colors.COLOR_2);
        var startX = (this.gridOffsetX) + (x * this.gridBoxSize) + (this.gridBoxSize / 4);
        var startY = (this.gridOffsetY) + (y * this.gridBoxSize) + (this.gridBoxSize / 4);
        var width = this.gridBoxSize - (this.gridBoxSize / 2);
        var height = this.gridBoxSize - (this.gridBoxSize / 2);
        this.context.drawImage(this.imgFlag, startX, startY, width, height);
    };
    MinesweeperComponent.prototype.drawTiles = function () {
        for (var j = 0; j < this.board.height; j++) {
            for (var i = 0; i < this.board.width; i++) {
                if (this.board.visible[j][i] === 2) {
                    this.drawFlaggedTile(i, j);
                }
                else if (this.board.visible[j][i] !== 0) {
                    this.drawVisibleTile(i, j);
                }
                else {
                    this.drawHiddenTile(i, j, this.colors.COLOR_5_ALT);
                }
            }
        }
    };
    MinesweeperComponent.prototype.highlightTile = function () {
        if (this.selectedX < 0 ||
            this.selectedX >= this.board.width ||
            this.selectedY < 0 ||
            this.selectedY >= this.board.height) {
            return;
        }
        if (!this.isPressed && (!this.mb1Pressed || !this.mb2Pressed)) {
            return;
        }
        if (this.mb1Pressed && this.mb2Pressed) {
            var x = this.selectedX;
            var y = this.selectedY;
            if (this.board.visible[y][x] === 0) {
                this.drawPressedTile(x, y);
            }
            if (x + 1 < this.board.width) {
                if (this.board.visible[y][x + 1] === 0) {
                    this.drawPressedTile(x + 1, y);
                }
                if (y + 1 < this.board.height) {
                    if (this.board.visible[y + 1][x + 1] === 0) {
                        this.drawPressedTile(x + 1, y + 1);
                    }
                }
                if (y - 1 >= 0) {
                    if (this.board.visible[y - 1][x + 1] === 0) {
                        this.drawPressedTile(x + 1, y - 1);
                    }
                }
            }
            if (x - 1 >= 0) {
                if (this.board.visible[y][x - 1] === 0) {
                    this.drawPressedTile(x - 1, y);
                }
                if (y + 1 < this.board.height) {
                    if (this.board.visible[y + 1][x - 1] === 0) {
                        this.drawPressedTile(x - 1, y + 1);
                    }
                }
                if (y - 1 >= 0) {
                    if (this.board.visible[y - 1][x - 1] === 0) {
                        this.drawPressedTile(x - 1, y - 1);
                    }
                }
            }
            if (y + 1 < this.board.height) {
                if (this.board.visible[y + 1][x] === 0) {
                    this.drawPressedTile(x, y + 1);
                }
            }
            if (y - 1 >= 0) {
                if (this.board.visible[y - 1][x] === 0) {
                    this.drawPressedTile(x, y - 1);
                }
            }
        }
        else {
            if (this.board.visible[this.selectedY][this.selectedX] === 0) {
                this.drawPressedTile(this.selectedX, this.selectedY);
            }
        }
    };
    MinesweeperComponent.prototype.fixSizes = function () {
        this.context.beginPath();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = window.innerWidth - this.canvasOffsetX;
        this.canvas.height = window.innerHeight - (this.canvasOffsetY * 2);
        this.context.translate(0.5, 0.5);
        this.gridOffsetX = this.canvas.width / 20;
        this.gridOffsetY = this.canvas.height / 20;
        var boardLength = 16;
        if (this.difficulty !== 4) {
            boardLength = Math.max(this.board.width, this.board.height);
        }
        var size = Math.min(this.canvas.offsetWidth - (this.gridOffsetX), this.canvas.offsetHeight - (this.gridOffsetY));
        var w = this.canvas.offsetWidth;
        var h = this.canvas.offsetHeight;
        if (this.difficulty !== 4) {
            if (w > h) {
                this.gridOffsetX = Math.round((w - h) / 2) + this.gridOffsetX;
            }
            else {
                this.gridOffsetY = Math.round((h - w) / 2) + this.gridOffsetY;
            }
        }
        this.gridBoxSize = Math.round((size / boardLength));
        this.draw();
    };
    /* EVENT LISTENERS */
    MinesweeperComponent.prototype.mousePressed = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        if (!this.solved) {
            x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
            y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);
            if (mouseEvent.button === 2 && !this.mb1Pressed) {
                this.mb2Pressed = true;
                this.board.flagTile(x, y);
                this.draw();
            }
            else if (mouseEvent.button === 0 && !this.mb2Pressed) {
                this.isPressed = true;
                this.mb1Pressed = true;
                this.selectedX = x;
                this.selectedY = y;
                this.draw();
            }
            else {
                this.mb1Pressed = true;
                this.mb2Pressed = true;
                this.selectedX = x;
                this.selectedY = y;
                this.draw();
            }
        }
    };
    MinesweeperComponent.prototype.mouseReleased = function (mouseEvent) {
        if (!this.solved) {
            if (mouseEvent.button === 2) {
                this.mb2Pressed = false;
                this.draw();
            }
            if (mouseEvent.button === 0) {
                this.isPressed = false;
                this.mb1Pressed = false;
                this.draw();
            }
            var x = mouseEvent.clientX - this.canvasOffsetX;
            var y = mouseEvent.clientY - this.canvasOffsetY;
            x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
            y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);
            if (x < 0 || x >= this.board.width || y < 0 || y >= this.board.height) {
                return;
            }
            if (mouseEvent.button === 2 && !this.mb1Pressed) {
                this.mb2Pressed = false;
            }
            else if (mouseEvent.button === 0 && this.firstPress && !this.mb2Pressed) {
                if (this.board.visible[y][x] !== 2) {
                    this.board.firstClick(x, y);
                    this.firstPress = false;
                }
                this.draw();
            }
            else if (mouseEvent.button === 0 && !this.mb2Pressed) {
                var goodPress = this.board.click(x, y);
                if (!goodPress) {
                    this.lose = true;
                    this.solved = true;
                }
                this.draw();
            }
            else {
                var goodPress = this.board.doubleClick(x, y);
                if (!goodPress) {
                    this.lose = true;
                    this.solved = true;
                }
                this.draw();
            }
            if (this.board.isSolved()) {
                this.draw();
                this.done();
            }
        }
    };
    MinesweeperComponent.prototype.mouseMove = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        if (!this.solved) {
            x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
            y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);
            if (this.isPressed || (this.mb1Pressed && this.mb2Pressed)) {
                this.selectedX = x;
                this.selectedY = y;
                this.draw();
            }
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MinesweeperComponent.prototype, "mousePressed", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MinesweeperComponent.prototype, "mouseReleased", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MinesweeperComponent.prototype, "mouseMove", null);
    MinesweeperComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-minesweeper',
            template: __webpack_require__(/*! ../game-board/game-board.component.html */ "./src/app/games/game-board/game-board.component.html"),
            styles: [__webpack_require__(/*! ../game-board/game-board.component.css */ "./src/app/games/game-board/game-board.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _services_colors_color_service__WEBPACK_IMPORTED_MODULE_8__["ColorService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_3__["TunnelService"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__["TimerService"],
            _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__["LoaderService"],
            _services_games_options_service__WEBPACK_IMPORTED_MODULE_10__["OptionsService"]])
    ], MinesweeperComponent);
    return MinesweeperComponent;
}(_classes_game_board__WEBPACK_IMPORTED_MODULE_9__["GameBoard"]));



/***/ }),

/***/ "./src/app/games/nonograms/nonograms.component.ts":
/*!********************************************************!*\
  !*** ./src/app/games/nonograms/nonograms.component.ts ***!
  \********************************************************/
/*! exports provided: NonogramsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NonogramsComponent", function() { return NonogramsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/loading-service/loader.service */ "./src/app/services/loading-service/loader.service.ts");
/* harmony import */ var _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/timer/timer.service */ "./src/app/services/timer/timer.service.ts");
/* harmony import */ var _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../enums/game-id.enum */ "./src/app/enums/game-id.enum.ts");
/* harmony import */ var _services_boards_nonograms_board_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/boards/nonograms/board.service */ "./src/app/services/boards/nonograms/board.service.ts");
/* harmony import */ var _services_colors_color_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/colors/color.service */ "./src/app/services/colors/color.service.ts");
/* harmony import */ var _classes_game_board__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../classes/game-board */ "./src/app/classes/game-board.ts");
/* harmony import */ var _services_games_options_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/games/options.service */ "./src/app/services/games/options.service.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var NonogramsComponent = /** @class */ (function (_super) {
    __extends(NonogramsComponent, _super);
    function NonogramsComponent(route, colorService, router, tunnel, userService, timer, loader, optionsService) {
        var _this = _super.call(this, route, colorService, router, tunnel, userService, timer, loader, optionsService) || this;
        _this.gameID = _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__["GameID"].NONOGRAMS;
        _this.selectedX = -1;
        _this.selectedY = -1;
        return _this;
    }
    NonogramsComponent.prototype.setupBoard = function () {
        _super.prototype.setupBoard.call(this);
        var width;
        var height;
        switch (this.difficulty) {
            // Easy or default
            case 1:
            default: {
                width = 5;
                height = 5;
                break;
            }
            // Medium
            case 2: {
                width = 10;
                height = 10;
                break;
            }
            // Hard
            case 3: {
                width = 15;
                height = 15;
                break;
            }
            // Extreme
            case 4: {
                width = 20;
                height = 20;
                break;
            }
        }
        this.board = new _services_boards_nonograms_board_service__WEBPACK_IMPORTED_MODULE_7__["Board"](width, height, 0);
    };
    NonogramsComponent.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (!this.solved) {
            this.drawSelectedBox();
        }
        this.drawLegends();
        this.drawBoard();
        this.drawGrid();
    };
    NonogramsComponent.prototype.drawBoard = function () {
        var tileSize = 1;
        for (var i = 0; i < this.board.width; i++) {
            for (var j = 0; j < this.board.height; j++) {
                if (this.board.boardVals[i][j] === 1) {
                    if (this.solved) {
                        this.context.fillStyle = this.colors.COLOR_1;
                    }
                    else {
                        this.context.fillStyle = this.colors.COLOR_3;
                    }
                    var x = this.gridOffsetX + (this.gridBoxSize * (i + (this.board.maxWidth - this.board.width)));
                    var y = this.gridOffsetY + (this.gridBoxSize * (j + (this.board.maxHeight - this.board.height)));
                    this.context.fillRect(x + tileSize, y + tileSize, this.gridBoxSize - (2 * tileSize), this.gridBoxSize - (2 * tileSize));
                }
                else if (this.board.markedVals[i][j] === 1) {
                    this.context.fillStyle = this.colors.COLOR_8;
                    var x = this.gridOffsetX + (this.gridBoxSize * (i + (this.board.maxWidth - this.board.width)));
                    var y = this.gridOffsetY + (this.gridBoxSize * (j + (this.board.maxHeight - this.board.height)));
                    this.context.fillRect(x + tileSize, y + tileSize, this.gridBoxSize - (2 * tileSize), this.gridBoxSize - (2 * tileSize));
                }
            }
        }
    };
    NonogramsComponent.prototype.drawSelectedBox = function () {
        var tileSize = 1;
        if (this.selectedX <= this.board.maxWidth - 1 && this.selectedX >= this.board.maxWidth - this.board.width &&
            this.selectedY <= this.board.maxHeight - 1 && this.selectedY >= this.board.maxHeight - this.board.height) {
            this.context.fillStyle = '#3D3D3D';
            this.context.fillRect(this.gridOffsetX + (this.selectedX * this.gridBoxSize) + tileSize, this.gridOffsetY + (this.selectedY * this.gridBoxSize) + tileSize, this.gridBoxSize - (2 * tileSize), this.gridBoxSize - (2 * tileSize));
        }
    };
    NonogramsComponent.prototype.drawBackground = function () {
        this.context.fillStyle = this.colors.BACKGROUND; // Background color
        this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
    };
    NonogramsComponent.prototype.drawGrid = function () {
        this.context.strokeStyle = '#d8c9ae';
        this.context.fillStyle = '#d8c9ae';
        this.context.lineWidth = 1;
        var bigSize = 3;
        for (var i = this.board.maxWidth - this.board.width; i < this.board.maxWidth + 1; i++) {
            if (((i - this.board.getLegendLength()) % 5) === 0) {
                this.context.fillRect((this.gridOffsetX + (i * this.gridBoxSize)) - bigSize, this.gridOffsetY, 2 * bigSize, ((this.board.maxHeight) * this.gridBoxSize)) + bigSize;
            }
            else {
                this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
                this.context.lineTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY + ((this.board.maxHeight) * this.gridBoxSize));
                this.context.stroke();
            }
        }
        for (var j = this.board.maxHeight - this.board.height; j < this.board.maxHeight + 1; j++) {
            if ((j - this.board.getLegendLength()) % 5 === 0) {
                this.context.fillRect(this.gridOffsetX, (this.gridOffsetY + (j * this.gridBoxSize)) - bigSize, ((this.board.maxWidth) * this.gridBoxSize) + bigSize, 2 * bigSize);
            }
            else {
                this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (j * this.gridBoxSize));
                this.context.lineTo(this.gridOffsetX + ((this.board.maxWidth) * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize));
                this.context.stroke();
            }
        }
        this.context.lineWidth = 1;
        this.context.moveTo(this.gridOffsetX, this.gridOffsetY);
        this.context.lineTo(this.gridOffsetX + ((this.board.maxWidth) * this.gridBoxSize), this.gridOffsetY);
        this.context.stroke();
        this.context.moveTo(this.gridOffsetX, this.gridOffsetY);
        this.context.lineTo(this.gridOffsetX, this.gridOffsetY + ((this.board.maxHeight) * this.gridBoxSize));
        this.context.stroke();
    };
    NonogramsComponent.prototype.drawLegends = function () {
        this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.4) + 'px Poppins';
        this.context.textAlign = 'center';
        for (var i = 0; i < this.board.rowLabels.length; i++) {
            for (var labI = 0; labI < this.board.rowLabels[i].length; labI++) {
                var valid = this.board.isRowLabelValid(i, labI);
                if (valid === 0) {
                    this.context.fillStyle = '#e8d9be';
                }
                else if (valid === -1) {
                    this.context.fillStyle = this.colors.COLOR_8;
                }
                else if (valid === 1) {
                    this.context.fillStyle = this.colors.COLOR_1;
                }
                var toDraw = '' + this.board.rowLabels[i][labI];
                var index = labI + ((this.board.maxWidth - this.board.width) - this.board.rowLabels[i].length);
                this.context.fillText(toDraw, this.gridOffsetX +
                    ((i + (this.board.maxWidth - this.board.width)) *
                        this.gridBoxSize) +
                    (this.gridBoxSize / 2), this.gridOffsetY + (index * this.gridBoxSize) + (this.gridBoxSize / 1.3));
            }
        }
        for (var j = 0; j < this.board.colLabels.length; j++) {
            for (var labJ = 0; labJ < this.board.colLabels[j].length; labJ++) {
                var valid = this.board.isColLabelValid(j, labJ);
                if (valid === 0) {
                    this.context.fillStyle = '#e8d9be';
                }
                else if (valid === -1) {
                    this.context.fillStyle = this.colors.COLOR_8;
                }
                else if (valid === 1) {
                    this.context.fillStyle = this.colors.COLOR_1;
                }
                var toDraw = '' + this.board.colLabels[j][labJ];
                var index = labJ + ((this.board.maxHeight - this.board.height) - this.board.colLabels[j].length);
                this.context.fillText(toDraw, this.gridOffsetX + (index * this.gridBoxSize) + (this.gridBoxSize / 2), this.gridOffsetY + ((j + (this.board.maxHeight - this.board.height)) * this.gridBoxSize) + (this.gridBoxSize / 1.3));
            }
        }
    };
    NonogramsComponent.prototype.fixSizes = function () {
        this.context.beginPath();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = window.innerWidth - this.canvasOffsetX;
        this.canvas.height = window.innerHeight - (this.canvasOffsetY * 2);
        this.context.translate(0.5, 0.5);
        this.gridOffsetX = this.canvas.width / 20;
        this.gridOffsetY = this.canvas.height / 20;
        var boardLength = Math.max(this.board.maxWidth, this.board.maxHeight);
        var size = Math.min(this.canvas.offsetWidth - (this.gridOffsetX * 2), this.canvas.offsetHeight - (this.gridOffsetY * 2));
        var w = this.canvas.offsetWidth;
        var h = this.canvas.offsetHeight;
        if (w > h) {
            this.gridOffsetX = Math.round((w - h) / 2) + this.gridOffsetX;
        }
        else {
            this.gridOffsetY = Math.round((h - w) / 2) + this.gridOffsetY;
        }
        this.gridBoxSize = Math.round((size / boardLength));
        this.draw();
    };
    /* EVENT LISTENERS */
    // UNCOMMENT HostListener to track given event
    NonogramsComponent.prototype.mousePressed = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        if (!this.solved) {
            x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
            y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);
            var diff = this.board.maxWidth - this.board.width;
            if (mouseEvent.button === 0) {
                this.board.click(x - diff, y - diff);
            }
            else if (mouseEvent.button === 2) {
                this.board.mark(x - diff, y - diff);
            }
            if (this.board.isSolved()) {
                this.done();
            }
            this.draw();
        }
    };
    // UNCOMMENT HostListener to track given event
    // @HostListener('document:mouseup', ['$event'])
    NonogramsComponent.prototype.mouseReleased = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        console.log({ 'mouseReleasedX': x, 'mouseReleasedY': y });
    };
    // UNCOMMENT HostListener to track given event
    NonogramsComponent.prototype.mouseMove = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        if (!this.solved) {
            x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
            y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);
            this.selectedX = x;
            this.selectedY = y;
            this.draw();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NonogramsComponent.prototype, "mousePressed", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NonogramsComponent.prototype, "mouseMove", null);
    NonogramsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-nonograms',
            template: __webpack_require__(/*! ../game-board/game-board.component.html */ "./src/app/games/game-board/game-board.component.html"),
            styles: [__webpack_require__(/*! ../game-board/game-board.component.css */ "./src/app/games/game-board/game-board.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _services_colors_color_service__WEBPACK_IMPORTED_MODULE_8__["ColorService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_3__["TunnelService"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__["TimerService"],
            _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__["LoaderService"],
            _services_games_options_service__WEBPACK_IMPORTED_MODULE_10__["OptionsService"]])
    ], NonogramsComponent);
    return NonogramsComponent;
}(_classes_game_board__WEBPACK_IMPORTED_MODULE_9__["GameBoard"]));



/***/ }),

/***/ "./src/app/games/sudoku/sudoku.component.ts":
/*!**************************************************!*\
  !*** ./src/app/games/sudoku/sudoku.component.ts ***!
  \**************************************************/
/*! exports provided: SudokuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SudokuComponent", function() { return SudokuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
/* harmony import */ var _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/loading-service/loader.service */ "./src/app/services/loading-service/loader.service.ts");
/* harmony import */ var _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/timer/timer.service */ "./src/app/services/timer/timer.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../enums/game-id.enum */ "./src/app/enums/game-id.enum.ts");
/* harmony import */ var _services_boards_sudoku_board_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/boards/sudoku/board.service */ "./src/app/services/boards/sudoku/board.service.ts");
/* harmony import */ var _services_colors_color_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/colors/color.service */ "./src/app/services/colors/color.service.ts");
/* harmony import */ var _classes_game_board__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../classes/game-board */ "./src/app/classes/game-board.ts");
/* harmony import */ var _services_games_options_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/games/options.service */ "./src/app/services/games/options.service.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var SudokuComponent = /** @class */ (function (_super) {
    __extends(SudokuComponent, _super);
    function SudokuComponent(route, colorService, router, tunnel, userService, timer, loader, optionsService) {
        var _this = _super.call(this, route, colorService, router, tunnel, userService, timer, loader, optionsService) || this;
        _this.notes = {};
        _this.gameID = _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__["GameID"].SUDOKU;
        _this.takingNotesMode = true;
        return _this;
    }
    SudokuComponent.prototype.setupBoard = function () {
        _super.prototype.setupBoard.call(this);
        switch (this.difficulty) {
            // Easy
            case 1: {
                this.numCarved = 38;
                break;
            }
            // Medium
            case 2: {
                this.numCarved = 44;
                break;
            }
            // Hard
            case 3: {
                this.numCarved = 50;
                break;
            }
            // Extreme
            case 4: {
                this.numCarved = 55;
                break;
            }
            // Easy as default
            default: {
                this.numCarved = 38;
                break;
            }
        }
        this.board = new _services_boards_sudoku_board_service__WEBPACK_IMPORTED_MODULE_7__["Board"](this.numCarved);
    };
    SudokuComponent.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.drawSelectedBox();
        this.drawBadBoxes();
        this.drawGrid();
        this.drawBoard();
        this.drawNotes();
    };
    SudokuComponent.prototype.drawBackground = function () {
        this.context.fillStyle = this.colors.BACKGROUND; // Background color
        this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
    };
    SudokuComponent.prototype.drawSelectedBox = function () {
        if (this.selectedX <= 8 && this.selectedX >= 0 &&
            this.selectedY <= 8 && this.selectedY >= 0) {
            this.context.fillStyle = '#3D3D3D';
            this.context.fillRect(this.gridOffsetX + (this.selectedX * this.gridBoxSize), this.gridOffsetY + (this.selectedY * this.gridBoxSize), this.gridBoxSize, this.gridBoxSize);
        }
    };
    SudokuComponent.prototype.drawBadBoxes = function () {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                var tileValue = this.board.sudokuPuzzle[i][j];
                if (this.board.isInvalidTile(i, j, tileValue)) {
                    this.context.fillStyle = this.colors.COLOR_7;
                    this.context.fillRect(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize), this.gridBoxSize, this.gridBoxSize);
                }
            }
        }
    };
    SudokuComponent.prototype.drawNotes = function () {
        for (var _i = 0, _a = Object.keys(this.notes); _i < _a.length; _i++) {
            var key = _a[_i];
            var x = Math.trunc(Number(key) / 10);
            var y = Number(key) - (x * 10);
            if (this.board.sudokuPuzzle[x][y] === 0 && this.board.originalPuzzle[x][y] === 0) {
                this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 5) + 'px Poppins';
                this.context.textAlign = 'center';
                this.context.fillStyle = this.colors.COLOR_3_ALT;
                for (var _b = 0, _c = this.notes[key]; _b < _c.length; _b++) {
                    var num = _c[_b];
                    if (num !== 0) {
                        var row = Math.trunc(num / 3.1);
                        var col = (num + 2) % 3;
                        /*
                          if (this.board.isInvalidTile(x, y, num) {
                            this.context.fillStyle = this.colors.COLOR_7_ALT;
                          } else {
                            this.context.fillStyle = this.colors.COLOR_3_ALT;
                          }
                         */
                        this.context.fillText('' + num, (this.gridOffsetX) + (x * this.gridBoxSize) + (col * (this.gridBoxSize / 3)) + (this.gridBoxSize / 6), (this.gridOffsetY) + (y * this.gridBoxSize) + (row * (this.gridBoxSize / 3)) + (this.gridBoxSize / 4));
                    }
                }
            }
        }
    };
    SudokuComponent.prototype.drawBoard = function () {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                var boardValue = this.board.sudokuPuzzle[i][j];
                var startValue = this.board.originalPuzzle[i][j];
                this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.4) + 'px Poppins';
                this.context.textAlign = 'center';
                if (startValue !== 0) {
                    this.context.fillStyle = '#e8d9be';
                    this.context.fillText('' + startValue, (this.gridOffsetX) + (i * this.gridBoxSize) + (this.gridBoxSize / 2), (this.gridOffsetY) + ((j + 1) * this.gridBoxSize) - (this.gridBoxSize / 4));
                }
                else if (boardValue !== 0) {
                    this.context.fillStyle = this.colors.COLOR_3_ALT;
                    this.context.fillText('' + boardValue, (this.gridOffsetX) + (i * this.gridBoxSize) + (this.gridBoxSize / 2), (this.gridOffsetY) + ((j + 1) * this.gridBoxSize) - (this.gridBoxSize / 4));
                }
            }
        }
    };
    SudokuComponent.prototype.drawGrid = function () {
        for (var i = 0; i <= 9; i++) {
            this.context.lineWidth = 1;
            this.context.strokeStyle = '#e8d9be';
            this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
            this.context.lineTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY + (9 * this.gridBoxSize));
            this.context.stroke();
        }
        for (var j = 0; j <= 9; j++) {
            this.context.lineWidth = 1;
            this.context.strokeStyle = '#e8d9be';
            this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (j * this.gridBoxSize));
            this.context.lineTo(this.gridOffsetX + (9 * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize));
            this.context.stroke();
        }
        for (var i = 1; i <= 2; i++) {
            this.context.fillStyle = '#e8d9be';
            this.context.fillRect(this.gridOffsetX + ((i * 3) * this.gridBoxSize) - 5, this.gridOffsetY, 10, (9 * this.gridBoxSize));
        }
        for (var j = 1; j <= 2; j++) {
            this.context.fillStyle = '#e8d9be';
            this.context.fillRect(this.gridOffsetX, this.gridOffsetY + ((j * 3) * this.gridBoxSize) - 5, (9 * this.gridBoxSize), 10);
        }
    };
    SudokuComponent.prototype.fixSizes = function () {
        this.context.beginPath();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = window.innerWidth - this.canvasOffsetX;
        this.canvas.height = window.innerHeight - (this.canvasOffsetY * 2);
        this.context.translate(0.5, 0.5);
        this.gridOffsetX = this.canvas.width / 20;
        this.gridOffsetY = this.canvas.height / 20;
        var boardLength = 9;
        var size = Math.min(this.canvas.offsetWidth - (this.gridOffsetX * 2), this.canvas.offsetHeight - (this.gridOffsetY * 2));
        var w = this.canvas.offsetWidth;
        var h = this.canvas.offsetHeight;
        if (w > h) {
            this.gridOffsetX = Math.round((w - h) / 2) + this.gridOffsetX;
        }
        else {
            this.gridOffsetY = Math.round((h - w) / 2) + this.gridOffsetY;
        }
        this.gridBoxSize = Math.round((size / boardLength));
        this.draw();
    };
    /* EVENT LISTENERS */
    SudokuComponent.prototype.mousePressed = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        console.log({ 'mousePressedX': x, 'mousePressedY': y });
    };
    SudokuComponent.prototype.mouseReleased = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        console.log({ 'mouseReleasedX': x, 'mouseReleasedY': y });
    };
    SudokuComponent.prototype.mouseMove = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        if (!this.solved) {
            x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
            y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);
            this.selectedX = x;
            this.selectedY = y;
            this.draw();
        }
    };
    SudokuComponent.prototype.keyPressed = function (keyEvent) {
        var numPressed = keyEvent.keyCode;
        if (numPressed === 32) {
            this.newGame();
            return;
        }
        if (!this.solved) {
            var pressed = -1;
            if (numPressed >= 48 && numPressed <= 57) {
                pressed = numPressed - 48;
            }
            else if (numPressed >= 96 && numPressed <= 105) {
                pressed = numPressed - 96;
            }
            if (pressed >= 0) {
                if (this.selectedX <= 8 && this.selectedX >= 0 &&
                    this.selectedY <= 8 && this.selectedY >= 0) {
                    if (!this.takingNotes) {
                        if (this.board.originalPuzzle[this.selectedX][this.selectedY] === 0) {
                            if (this.board.sudokuPuzzle[this.selectedX][this.selectedY] === pressed) {
                                this.board.sudokuPuzzle[this.selectedX][this.selectedY] = 0;
                            }
                            else {
                                this.board.sudokuPuzzle[this.selectedX][this.selectedY] = pressed;
                            }
                            if (this.board.isSolved()) {
                                this.done();
                            }
                        }
                    }
                    else {
                        if (this.notes['' + this.selectedX + '' + this.selectedY + ''] === undefined) {
                            this.notes['' + this.selectedX + '' + this.selectedY + ''] = [pressed];
                        }
                        else {
                            if (this.notes['' + this.selectedX + '' + this.selectedY + ''].includes(pressed)) {
                                var index = this.notes['' + this.selectedX + '' + this.selectedY + ''].indexOf(pressed);
                                if (index > -1) {
                                    this.notes['' + this.selectedX + '' + this.selectedY + ''].splice(index, 1);
                                }
                            }
                            else {
                                this.notes['' + this.selectedX + '' + this.selectedY + ''].push(pressed);
                            }
                        }
                    }
                }
                this.draw();
            }
        }
    };
    SudokuComponent.prototype.notesHandler = function ($event) {
        this.takingNotes = $event;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SudokuComponent.prototype, "mouseMove", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SudokuComponent.prototype, "keyPressed", null);
    SudokuComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sudoku',
            template: __webpack_require__(/*! ../game-board/game-board.component.html */ "./src/app/games/game-board/game-board.component.html"),
            styles: [__webpack_require__(/*! ../game-board/game-board.component.css */ "./src/app/games/game-board/game-board.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _services_colors_color_service__WEBPACK_IMPORTED_MODULE_8__["ColorService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_1__["TunnelService"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_3__["TimerService"],
            _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_2__["LoaderService"],
            _services_games_options_service__WEBPACK_IMPORTED_MODULE_10__["OptionsService"]])
    ], SudokuComponent);
    return SudokuComponent;
}(_classes_game_board__WEBPACK_IMPORTED_MODULE_9__["GameBoard"]));



/***/ }),

/***/ "./src/app/games/takuzu/takuzu.component.ts":
/*!**************************************************!*\
  !*** ./src/app/games/takuzu/takuzu.component.ts ***!
  \**************************************************/
/*! exports provided: TakuzuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TakuzuComponent", function() { return TakuzuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/loading-service/loader.service */ "./src/app/services/loading-service/loader.service.ts");
/* harmony import */ var _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/timer/timer.service */ "./src/app/services/timer/timer.service.ts");
/* harmony import */ var _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../enums/game-id.enum */ "./src/app/enums/game-id.enum.ts");
/* harmony import */ var _services_boards_takuzu_board_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/boards/takuzu/board.service */ "./src/app/services/boards/takuzu/board.service.ts");
/* harmony import */ var _services_colors_color_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/colors/color.service */ "./src/app/services/colors/color.service.ts");
/* harmony import */ var _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/persistence/settings.service */ "./src/app/services/persistence/settings.service.ts");
/* harmony import */ var _services_generators_game_starter_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/generators/game-starter.service */ "./src/app/services/generators/game-starter.service.ts");
/* harmony import */ var _classes_game_board__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../classes/game-board */ "./src/app/classes/game-board.ts");
/* harmony import */ var _services_games_options_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../services/games/options.service */ "./src/app/services/games/options.service.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var TakuzuComponent = /** @class */ (function (_super) {
    __extends(TakuzuComponent, _super);
    function TakuzuComponent(route, colorService, router, tunnel, userService, timer, loader, optionsService) {
        var _this = _super.call(this, route, colorService, router, tunnel, userService, timer, loader, optionsService) || this;
        _this.gameID = _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__["GameID"].TAKUZU;
        _this.options = [
            {
                'type': 'checkbox',
                'bindTo': 'toggleGrid',
                'name': 'Display Grid',
                'callback': 'this.toggleGrid()',
                'storedName': 'takuzuGrid'
            },
            {
                'type': 'checkbox',
                'bindTo': 'invertControls',
                'name': 'Invert Controls',
                'callback': 'this.invertControls()',
                'storedName': 'takuzuInvert'
            }
        ];
        _this.oColor = _this.colors.FOREGROUND;
        _this.cColor = '#66CCFF';
        _this.selectedX = -1;
        _this.selectedY = -1;
        return _this;
    }
    TakuzuComponent.prototype.ngOnInit = function () {
        this.displayGrid = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].getDataBool('takuzuGrid');
        this.invertedControls = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].getDataBool('takuzuInvert');
        _super.prototype.ngOnInit.call(this);
    };
    TakuzuComponent.prototype.setupBoard = function () {
        _super.prototype.setupBoard.call(this);
        var size;
        var removePerc;
        switch (this.difficulty) {
            // Easy or default
            case 1:
            default: {
                size = 6;
                removePerc = 0.6;
                break;
            }
            // Medium
            case 2: {
                size = 8;
                removePerc = 0.6;
                break;
            }
            // Hard
            case 3: {
                size = 10;
                removePerc = 0.7;
                break;
            }
            // Extreme
            case 4: {
                size = 12;
                removePerc = 0.7;
                break;
            }
        }
        this.board = new _services_boards_takuzu_board_service__WEBPACK_IMPORTED_MODULE_7__["Board"](size, 0, removePerc);
    };
    TakuzuComponent.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.drawSelectedBox();
        if (this.displayGrid) {
            this.drawGrid();
        }
        else {
            this.drawBorder();
        }
        this.drawValues();
    };
    TakuzuComponent.prototype.drawSelectedBox = function () {
        if (this.selectedX < this.board.size && this.selectedX >= 0 &&
            this.selectedY < this.board.size && this.selectedY >= 0) {
            this.context.fillStyle = '#3D3D3D';
            this.context.fillRect(this.gridOffsetX + (this.selectedX * this.gridBoxSize), this.gridOffsetY + (this.selectedY * this.gridBoxSize), this.gridBoxSize, this.gridBoxSize);
        }
    };
    TakuzuComponent.prototype.drawBackground = function () {
        this.context.fillStyle = this.colors.BACKGROUND; // Background color
        this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
    };
    TakuzuComponent.prototype.drawGrid = function () {
        for (var i = 0; i <= this.board.size; i++) {
            this.context.lineWidth = 1;
            this.context.strokeStyle = this.colors.COLOR_1;
            this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
            this.context.lineTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY + (this.board.size * this.gridBoxSize));
            this.context.stroke();
        }
        for (var j = 0; j <= this.board.size; j++) {
            this.context.lineWidth = 1;
            this.context.strokeStyle = this.colors.FOREGROUND;
            this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (j * this.gridBoxSize));
            this.context.lineTo(this.gridOffsetX + (this.board.size * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize));
            this.context.stroke();
        }
    };
    TakuzuComponent.prototype.toggleGrid = function () {
        this.displayGrid = !this.displayGrid;
        _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].storeData('takuzuGrid', this.displayGrid);
        this.draw();
    };
    TakuzuComponent.prototype.invertControls = function () {
        this.invertedControls = !this.invertedControls;
        _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].storeData('takuzuInvert', this.invertedControls);
    };
    TakuzuComponent.prototype.drawBorder = function () {
        this.context.lineWidth = 1;
        this.context.strokeStyle = this.colors.COLOR_1;
        this.context.moveTo(this.gridOffsetX + (0 * this.gridBoxSize), this.gridOffsetY);
        this.context.lineTo(this.gridOffsetX + (0 * this.gridBoxSize), this.gridOffsetY + (this.board.size * this.gridBoxSize));
        this.context.stroke();
        this.context.lineWidth = 1;
        this.context.strokeStyle = this.colors.COLOR_1;
        this.context.moveTo(this.gridOffsetX + (this.board.size * this.gridBoxSize), this.gridOffsetY);
        this.context.lineTo(this.gridOffsetX + (this.board.size * this.gridBoxSize), this.gridOffsetY + (this.board.size * this.gridBoxSize));
        this.context.stroke();
        this.context.lineWidth = 1;
        this.context.strokeStyle = this.colors.FOREGROUND;
        this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (0 * this.gridBoxSize));
        this.context.lineTo(this.gridOffsetX + (this.board.size * this.gridBoxSize), this.gridOffsetY + (0 * this.gridBoxSize));
        this.context.stroke();
        this.context.lineWidth = 1;
        this.context.strokeStyle = this.colors.FOREGROUND;
        this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (this.board.size * this.gridBoxSize));
        this.context.lineTo(this.gridOffsetX + (this.board.size * this.gridBoxSize), this.gridOffsetY + (this.board.size * this.gridBoxSize));
        this.context.stroke();
    };
    TakuzuComponent.prototype.roundRect = function (ctx, x, y, width, height, radius, fill, stroke) {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }
    };
    TakuzuComponent.prototype.drawValues = function () {
        for (var j = 0; j < this.board.size; j++) {
            for (var i = 0; i < this.board.size; i++) {
                var boardValue = this.board.takuzuPuzzle[j][i];
                var original = this.board.isOriginal(i, j);
                var invalidTile = this.board.isInvalidTile(i, j);
                var entryString = '' + boardValue;
                this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.4) + 'px Poppins';
                this.context.textAlign = 'center';
                var spacing = this.gridBoxSize / 40;
                if (boardValue === 1) {
                    if (original) {
                        this.context.fillStyle = this.oColor;
                        if (invalidTile) {
                            this.context.fillStyle = this.colors.COLOR_7;
                        }
                    }
                    else {
                        this.context.fillStyle = this.cColor;
                        if (invalidTile) {
                            this.context.fillStyle = this.colors.COLOR_7_ALT;
                        }
                    }
                    this.roundRect(this.context, (this.gridOffsetX + (i * this.gridBoxSize)) + spacing, (this.gridOffsetY + (j * this.gridBoxSize)) + spacing, this.gridBoxSize - (spacing * 2), this.gridBoxSize - (spacing * 2), (this.gridBoxSize / 20), true, false);
                    this.context.fillStyle = this.colors.BACKGROUND;
                    this.context.fillText(entryString, (this.gridOffsetX) + (i * this.gridBoxSize) + (this.gridBoxSize / 2), (this.gridOffsetY) + ((j + 1) * this.gridBoxSize) - (this.gridBoxSize / 4));
                }
                else if (boardValue === 0) {
                    if (original) {
                        this.context.fillStyle = this.oColor;
                        if (invalidTile) {
                            this.context.fillStyle = this.colors.COLOR_7;
                        }
                    }
                    else {
                        this.context.fillStyle = this.cColor;
                        if (invalidTile) {
                            this.context.fillStyle = this.colors.COLOR_7_ALT;
                        }
                    }
                    this.roundRect(this.context, (this.gridOffsetX + (i * this.gridBoxSize)) + spacing, (this.gridOffsetY + (j * this.gridBoxSize)) + spacing, this.gridBoxSize - (spacing * 2), this.gridBoxSize - (spacing * 2), (this.gridBoxSize / 20), true, false);
                    this.context.fillStyle = this.colors.BACKGROUND;
                    this.roundRect(this.context, (this.gridOffsetX + (i * this.gridBoxSize)) + (spacing * 3), (this.gridOffsetY + (j * this.gridBoxSize)) + (spacing * 3), this.gridBoxSize - (spacing * 6), this.gridBoxSize - (spacing * 6), (this.gridBoxSize / 20), true, false);
                    if (original) {
                        this.context.fillStyle = this.oColor;
                        if (invalidTile) {
                            this.context.fillStyle = this.colors.COLOR_7;
                        }
                    }
                    else {
                        this.context.fillStyle = this.cColor;
                        if (invalidTile) {
                            this.context.fillStyle = this.colors.COLOR_7_ALT;
                        }
                    }
                    this.context.fillText(entryString, (this.gridOffsetX) + (i * this.gridBoxSize) + (this.gridBoxSize / 2), (this.gridOffsetY) + ((j + 1) * this.gridBoxSize) - (this.gridBoxSize / 4));
                }
            }
        }
    };
    TakuzuComponent.prototype.done = function () {
        var that = this;
        _services_generators_game_starter_service__WEBPACK_IMPORTED_MODULE_10__["GameStarterService"].done(that);
    };
    TakuzuComponent.prototype.fixSizes = function () {
        this.context.beginPath();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = window.innerWidth - this.canvasOffsetX;
        this.canvas.height = window.innerHeight - (this.canvasOffsetY * 2);
        this.context.translate(0.5, 0.5);
        this.gridOffsetX = this.canvas.width / 20;
        this.gridOffsetY = this.canvas.height / 20;
        var boardSize = Math.min(this.canvas.offsetWidth - (this.gridOffsetX * 2), this.canvas.offsetHeight - (this.gridOffsetY * 2));
        var w = this.canvas.offsetWidth;
        var h = this.canvas.offsetHeight;
        if (w > h) {
            this.gridOffsetX = Math.round((w - h) / 2) + this.gridOffsetX;
        }
        else {
            this.gridOffsetY = Math.round((h - w) / 2) + this.gridOffsetY;
        }
        this.gridBoxSize = Math.round((boardSize / this.board.size));
        this.draw();
    };
    /* EVENT LISTENERS */
    TakuzuComponent.prototype.mousePressed = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        if (!this.solved) {
            x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
            y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);
            if (this.invertedControls) {
                if (mouseEvent.button === 2) {
                    this.board.rotateValue(x, y, false);
                }
                else {
                    this.board.rotateValue(x, y, true);
                }
            }
            else {
                if (mouseEvent.button === 2) {
                    this.board.rotateValue(x, y, true);
                }
                else {
                    this.board.rotateValue(x, y, false);
                }
            }
            this.draw();
            if (this.board.isSolved()) {
                this.done();
            }
        }
    };
    TakuzuComponent.prototype.mouseReleased = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        console.log({ 'mouseReleasedX': x, 'mouseReleasedY': y });
    };
    TakuzuComponent.prototype.mouseMove = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        if (!this.solved) {
            this.selectedX = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
            this.selectedY = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);
            this.draw();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TakuzuComponent.prototype, "mousePressed", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TakuzuComponent.prototype, "mouseMove", null);
    TakuzuComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-takuzu',
            template: __webpack_require__(/*! ../game-board/game-board.component.html */ "./src/app/games/game-board/game-board.component.html"),
            styles: [__webpack_require__(/*! ../game-board/game-board.component.css */ "./src/app/games/game-board/game-board.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _services_colors_color_service__WEBPACK_IMPORTED_MODULE_8__["ColorService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_3__["TunnelService"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__["TimerService"],
            _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__["LoaderService"],
            _services_games_options_service__WEBPACK_IMPORTED_MODULE_12__["OptionsService"]])
    ], TakuzuComponent);
    return TakuzuComponent;
}(_classes_game_board__WEBPACK_IMPORTED_MODULE_11__["GameBoard"]));



/***/ }),

/***/ "./src/app/games/template/template.component.css":
/*!*******************************************************!*\
  !*** ./src/app/games/template/template.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#myCanvas {\n    position: absolute;\n    left: 225px;\n    top:3.5rem;\n    height: calc(100vh - 7rem);\n    width: calc(100vw - 225px);\n    background-color: black;\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n\n* {\n  line-height: 1;\n}\n"

/***/ }),

/***/ "./src/app/games/template/template.component.html":
/*!********************************************************!*\
  !*** ./src/app/games/template/template.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"leftControlPanel\">\n  <app-options (optionSelected)=\"handleOption($event)\">\n  </app-options>\n</div>\n\n<canvas id=\"myCanvas\" (window:resize)=\"fixSizes()\" (contextmenu)=\"false\"></canvas>\n"

/***/ }),

/***/ "./src/app/games/template/template.component.ts":
/*!******************************************************!*\
  !*** ./src/app/games/template/template.component.ts ***!
  \******************************************************/
/*! exports provided: TemplateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateComponent", function() { return TemplateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/loading-service/loader.service */ "./src/app/services/loading-service/loader.service.ts");
/* harmony import */ var _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/timer/timer.service */ "./src/app/services/timer/timer.service.ts");
/* harmony import */ var _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../enums/game-id.enum */ "./src/app/enums/game-id.enum.ts");
/* harmony import */ var _services_colors_color_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/colors/color.service */ "./src/app/services/colors/color.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TemplateComponent = /** @class */ (function () {
    function TemplateComponent(route, tunnel, colorService, router, userService, timer, loader) {
        this.route = route;
        this.tunnel = tunnel;
        this.colorService = colorService;
        this.router = router;
        this.userService = userService;
        this.timer = timer;
        this.loader = loader;
        // TODO - enter game ID here
        this.gameID = _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__["GameID"].TILE_GAME;
        // TODO - enter control scheme here
        this.controls = "Description of game controls goes here";
        // TODO - enter game rules here
        this.rules = "Rules of the game goes here";
        this.canvasOffsetX = 225;
        this.canvasOffsetY = 56;
        // Most games utilize a grid
        this.gridOffsetX = 100;
        this.gridOffsetY = 100;
        this.solved = false;
        this.colors = colorService.getColorScheme();
    }
    TemplateComponent.prototype.ngOnInit = function () {
        var _this_1 = this;
        // Read difficulty from URL param
        this.difficulty = Number(this.route.snapshot.paramMap.get('diff'));
        this.canvas = document.getElementById('myCanvas');
        this.context = this.canvas.getContext('2d');
        // Easy
        if (this.difficulty == 1) {
            console.log('Easy difficulty');
        }
        // Medium
        else if (this.difficulty == 2) {
            console.log('Medium difficulty');
        }
        // Hard
        else if (this.difficulty == 3) {
            console.log('Hard difficulty');
        }
        // Extreme
        else if (this.difficulty == 4) {
            console.log('Extreme difficulty');
        }
        // Start timer if we are logged in
        if (this.userService.isLoggedIn()) {
            // Get personal high scores
            var m = {
                GameID: this.gameID,
                Difficulty: this.difficulty
            };
            this.tunnel.getPersonalBest(m)
                .subscribe(function (data) {
                _this_1.personalBestDaily = data['daily'];
                _this_1.personalBestWeekly = data['weekly'];
                _this_1.personalBestMonthly = data['monthly'];
            });
            this.timer.startTimer(this.gameID, this.difficulty)
                .subscribe(function (data) {
                _this_1.seed = data['seed'];
                // TODO - generate board with seed
                _this_1.startDate = new Date();
                _this_1.displayTimer();
                _this_1.fixSizes();
                _this_1.draw();
            });
        }
        else {
            this.seed = Math.floor(Math.random() * (2000000000));
            // TODO - generate board with seed
            this.startDate = new Date();
            this.displayTimer();
            this.fixSizes();
            this.draw();
        }
    };
    TemplateComponent.prototype.draw = function () {
        this.context.beginPath();
        this.drawBackground();
    };
    TemplateComponent.prototype.drawBackground = function () {
        this.context.fillStyle = this.colors.BACKGROUND; // Background color
        this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
    };
    TemplateComponent.prototype.done = function () {
        this.solved = true;
        if (this.userService.isLoggedIn()) {
            this.timer.stopTimer(this.seed, this.gameID, this.difficulty, 'TODO - Board Solution String')
                .subscribe(function (data) { });
        }
        else {
            // Do nothing - we're not logged in
        }
    };
    TemplateComponent.prototype.add = function (that) {
        var display = document.getElementById("timer");
        var now = +new Date();
        var diff = ((now - that.startDate));
        var hours = Math.trunc(diff / (60 * 60 * 1000));
        var minutes = Math.trunc(diff / (60 * 1000)) % 60;
        var seconds = Math.trunc(diff / (1000)) % 60;
        var millis = diff % 1000;
        try {
            display.textContent =
                hours + ":" +
                    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
                    (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + "." +
                    (millis ? (millis > 99 ? millis : millis > 9 ? "0" + millis : "00" + millis) : "000");
            that.displayTimer();
        }
        catch (_a) {
            // Do nothing - page probably re-routed
        }
    };
    TemplateComponent.prototype.displayTimer = function () {
        if (!this.solved) {
            var _this = this;
            this.t = setTimeout(function () { _this.add(_this); }, 50);
        }
    };
    TemplateComponent.prototype.fixSizes = function () {
        this.context.beginPath();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = window.innerWidth - this.canvasOffsetX;
        this.canvas.height = window.innerHeight - (this.canvasOffsetY * 2);
        this.context.translate(0.5, 0.5);
        this.gridOffsetX = this.canvas.width / 20;
        this.gridOffsetY = this.canvas.height / 20;
        var boardLength = Math.max(this.board.width, this.board.height);
        var size = Math.min(this.canvas.offsetWidth - (this.gridOffsetX * 2), this.canvas.offsetHeight - (this.gridOffsetY * 2));
        var w = this.canvas.offsetWidth;
        var h = this.canvas.offsetHeight;
        if (w > h) {
            this.gridOffsetX = Math.round((w - h) / 2) + this.gridOffsetX;
        }
        else {
            this.gridOffsetY = Math.round((h - w) / 2) + this.gridOffsetY;
        }
        this.gridBoxSize = Math.round((size / boardLength));
        this.draw();
    };
    TemplateComponent.prototype.newGame = function () {
        var _this_1 = this;
        this.loader.startLoadingAnimation();
        if (this.userService.isLoggedIn()) {
            this.timer.startTimer(_enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__["GameID"].TILE_GAME, this.difficulty)
                .subscribe(function (data) {
                _this_1.seed = data['seed'];
                // TODO - generate board with seed
                if (_this_1.solved) {
                    _this_1.solved = false;
                    _this_1.startDate = new Date();
                    _this_1.displayTimer();
                }
                else {
                    _this_1.startDate = new Date();
                }
                _this_1.fixSizes();
                _this_1.loader.stopLoadingAnimation();
                _this_1.draw();
            });
        }
        else {
            // Generate board with random seed
            this.seed = Math.floor(Math.random() * (2000000000));
            // TODO - generate board with seed
            if (this.solved) {
                this.solved = false;
                this.startDate = new Date();
                this.displayTimer();
            }
            else {
                this.startDate = new Date();
            }
            this.fixSizes();
            this.loader.stopLoadingAnimation();
            this.draw();
        }
    };
    /* EVENT LISTENERS */
    // UNCOMMENT HostListener to track given event
    //@HostListener('document:mousedown', ['$event'])
    TemplateComponent.prototype.mousePressed = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        console.log({ 'mousePressedX': x, 'mousePressedY': y });
    };
    // UNCOMMENT HostListener to track given event
    //@HostListener('document:mouseup', ['$event'])
    TemplateComponent.prototype.mouseReleased = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        console.log({ 'mouseReleasedX': x, 'mouseReleasedY': y });
    };
    // UNCOMMENT HostListener to track given event
    //@HostListener('document:mousemove', ['$event'])
    TemplateComponent.prototype.mouseMove = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        console.log({ 'mouseMoveX': x, 'mouseMoveY': y });
    };
    // UNCOMMENT HostListener to track given event
    //@HostListener('document:keydown', ['$event'])
    TemplateComponent.prototype.keyPressed = function (keyEvent) {
        console.log({ 'keyPressed': keyEvent.keyCode });
    };
    // UNCOMMENT HostListener to track given event
    //@HostListener('document:keyup', ['$event'])
    TemplateComponent.prototype.keyReleased = function (keyEvent) {
        console.log({ 'keyReleased': keyEvent.keyCode });
    };
    TemplateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-template',
            template: __webpack_require__(/*! ./template.component.html */ "./src/app/games/template/template.component.html"),
            styles: [__webpack_require__(/*! ./template.component.css */ "./src/app/games/template/template.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_3__["TunnelService"],
            _services_colors_color_service__WEBPACK_IMPORTED_MODULE_7__["ColorService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__["TimerService"],
            _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__["LoaderService"]])
    ], TemplateComponent);
    return TemplateComponent;
}());



/***/ }),

/***/ "./src/app/games/thermometers/thermometers.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/games/thermometers/thermometers.component.ts ***!
  \**************************************************************/
/*! exports provided: ThermometersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThermometersComponent", function() { return ThermometersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/loading-service/loader.service */ "./src/app/services/loading-service/loader.service.ts");
/* harmony import */ var _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/timer/timer.service */ "./src/app/services/timer/timer.service.ts");
/* harmony import */ var _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../enums/game-id.enum */ "./src/app/enums/game-id.enum.ts");
/* harmony import */ var _services_colors_color_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/colors/color.service */ "./src/app/services/colors/color.service.ts");
/* harmony import */ var _services_boards_thermometers_board_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/boards/thermometers/board.service */ "./src/app/services/boards/thermometers/board.service.ts");
/* harmony import */ var _classes_game_board__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../classes/game-board */ "./src/app/classes/game-board.ts");
/* harmony import */ var _services_games_options_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/games/options.service */ "./src/app/services/games/options.service.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var ThermometersComponent = /** @class */ (function (_super) {
    __extends(ThermometersComponent, _super);
    function ThermometersComponent(route, colorService, router, tunnel, userService, timer, loader, optionsService) {
        var _this = _super.call(this, route, colorService, router, tunnel, userService, timer, loader, optionsService) || this;
        _this.gameID = _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__["GameID"].THERMOMETERS;
        _this.selectedX = -1;
        _this.selectedY = -1;
        return _this;
    }
    ThermometersComponent.prototype.setupBoard = function () {
        _super.prototype.setupBoard.call(this);
        var width = 0;
        var height = 0;
        switch (this.difficulty) {
            // Easy or default
            case 1:
            default: {
                width = 5;
                height = 5;
                break;
            }
            // Medium
            case 2: {
                width = 7;
                height = 7;
                break;
            }
            // Hard
            case 3: {
                width = 9;
                height = 9;
                break;
            }
            // Extreme
            case 4: {
                width = 13;
                height = 13;
                break;
            }
        }
        this.board = new _services_boards_thermometers_board_service__WEBPACK_IMPORTED_MODULE_8__["Board"](width, height, 0);
    };
    ThermometersComponent.prototype.draw = function () {
        _super.prototype.draw.call(this);
        this.drawGrid();
        if (!this.solved) {
            this.drawSelectedBox();
        }
        this.drawThermometers();
        this.drawLegends();
    };
    ThermometersComponent.prototype.drawSelectedBox = function () {
        if (this.selectedX <= this.board.width - 2 && this.selectedX >= 0 &&
            this.selectedY <= this.board.height - 2 && this.selectedY >= 0) {
            this.context.fillStyle = '#3D3D3D';
            this.context.fillRect(this.gridOffsetX + (this.selectedX * this.gridBoxSize) + 2, this.gridOffsetY + (this.selectedY * this.gridBoxSize) + 2, this.gridBoxSize - 4, this.gridBoxSize - 4);
        }
    };
    ThermometersComponent.prototype.drawGrid = function () {
        this.context.strokeStyle = this.colors.FOREGROUND;
        this.context.lineWidth = 1;
        for (var i = 0; i <= this.board.width - 1; i++) {
            this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
            this.context.lineTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY + ((this.board.height - 1) * this.gridBoxSize));
            this.context.stroke();
        }
        for (var j = 0; j <= this.board.height - 1; j++) {
            this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (j * this.gridBoxSize));
            this.context.lineTo(this.gridOffsetX + ((this.board.width - 1) * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize));
            this.context.stroke();
        }
    };
    ThermometersComponent.prototype.drawLegends = function () {
        this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.4) + 'px Poppins';
        this.context.textAlign = 'center';
        for (var i = 0; i < this.board.width - 1; i++) {
            var valid = this.board.bottomLegendValid(i);
            if (valid === 1) {
                this.context.fillStyle = this.colors.COLOR_1;
            }
            else if (valid === 0) {
                this.context.fillStyle = '#e8d9be';
            }
            else {
                this.context.fillStyle = this.colors.COLOR_8;
            }
            this.context.fillText('' + this.board.bottomLegends[i], this.gridOffsetX + (i * this.gridBoxSize) + (this.gridBoxSize / 2), this.gridOffsetY + ((this.board.height - 1) * this.gridBoxSize) + (this.gridBoxSize / 1.3));
        }
        for (var j = 0; j < this.board.height - 1; j++) {
            var validSide = this.board.sideLegendValid(j);
            if (validSide === 1) {
                this.context.fillStyle = this.colors.COLOR_1;
            }
            else if (validSide === 0) {
                this.context.fillStyle = '#e8d9be';
            }
            else {
                this.context.fillStyle = this.colors.COLOR_8;
            }
            this.context.fillText('' + this.board.sideLegends[j], this.gridOffsetX + ((this.board.width - 1) * this.gridBoxSize) + (this.gridBoxSize / 2), this.gridOffsetY + (j * this.gridBoxSize) + (this.gridBoxSize / 1.3));
        }
    };
    ThermometersComponent.prototype.drawBackground = function () {
        this.context.fillStyle = this.colors.BACKGROUND; // Background color
        this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
    };
    ThermometersComponent.prototype.drawThermometers = function () {
        for (var _i = 0, _a = this.board.thermometers; _i < _a.length; _i++) {
            var thermometer = _a[_i];
            this.drawThermometerHead(thermometer.x, thermometer.y, thermometer.direction, thermometer.filledAmount);
            this.drawThermometerBody(thermometer.x, thermometer.y, thermometer.direction, thermometer.length, thermometer.filledAmount);
            this.drawThermometerTail(thermometer.x, thermometer.y, thermometer.direction, thermometer.length, thermometer.filledAmount);
        }
    };
    ThermometersComponent.prototype.drawThermometerHead = function (x, y, dir, fillAmount) {
        this.context.strokeStyle = this.colors.color_1;
        if (fillAmount === 0) {
            this.context.fillStyle = this.colors.BACKGROUND;
        }
        else {
            if (!this.solved) {
                this.context.fillStyle = this.colors.COLOR_3;
            }
            else {
                this.context.fillStyle = this.colors.COLOR_1;
            }
        }
        this.context.lineWidth = 3;
        this.context.beginPath();
        var drawX = this.gridOffsetX + (x * this.gridBoxSize) - this.gridBoxSize / 2;
        var drawY = this.gridOffsetY + (y * this.gridBoxSize) - this.gridBoxSize / 2;
        var radius = this.gridBoxSize / 2.5;
        var thermometerOpenAmount = 0.15 * Math.PI;
        var startPoint;
        if (dir === 0) {
            // DOWN
            startPoint = 0.5 * Math.PI;
        }
        else if (dir === 1) {
            // UP
            startPoint = 1.5 * Math.PI;
        }
        else if (dir === 2) {
            // LEFT
            startPoint = 1 * Math.PI;
        }
        else if (dir === 3) {
            // RIGHT
            startPoint = 0 * Math.PI;
        }
        this.context.arc(drawX, drawY, radius, startPoint + thermometerOpenAmount, startPoint - thermometerOpenAmount);
        this.context.fill();
        this.context.stroke();
    };
    ThermometersComponent.prototype.drawThermometerTail = function (x, y, dir, length, fillAmount) {
        this.context.strokeStyle = this.colors.color_1;
        if (fillAmount < length) {
            this.context.fillStyle = this.colors.BACKGROUND;
        }
        else {
            if (!this.solved) {
                this.context.fillStyle = this.colors.COLOR_3;
            }
            else {
                this.context.fillStyle = this.colors.COLOR_1;
            }
        }
        this.context.lineWidth = 3;
        this.context.beginPath();
        var newX = x;
        var newY = y;
        if (dir === 0) {
            newY = y + length - 1;
        }
        else if (dir === 1) {
            newY = y - length + 1;
        }
        else if (dir === 2) {
            newX = x - length + 1;
        }
        else if (dir === 3) {
            newX = x + length - 1;
        }
        var drawX = this.gridOffsetX + (newX * this.gridBoxSize) - this.gridBoxSize / 2;
        var drawY = this.gridOffsetY + (newY * this.gridBoxSize) - this.gridBoxSize / 2;
        var radius = this.gridBoxSize / 5.8;
        var thermometerOpenAmount = 0.5 * Math.PI;
        var startPoint;
        if (dir === 0) {
            startPoint = 1.5 * Math.PI;
        }
        else if (dir === 1) {
            startPoint = 0.5 * Math.PI;
        }
        else if (dir === 2) {
            startPoint = 0 * Math.PI;
        }
        else if (dir === 3) {
            startPoint = 1 * Math.PI;
        }
        this.context.arc(drawX, drawY, radius, startPoint + thermometerOpenAmount, startPoint - thermometerOpenAmount);
        this.context.fill();
        this.context.stroke();
    };
    ThermometersComponent.prototype.drawThermometerBody = function (x, y, dir, length, fillAmount) {
        var i;
        var width;
        var height;
        var drawX;
        var drawY;
        if (dir === 0) {
            width = this.gridBoxSize / 2.9;
            height = (this.gridBoxSize * (length - 2)) + ((this.gridBoxSize / 2) - width) + (width * 1.5);
            drawX = (this.gridOffsetX + (x * this.gridBoxSize) - this.gridBoxSize / 2) - width / 2;
            drawY = (this.gridOffsetY + (y * this.gridBoxSize) - this.gridBoxSize / 2) + width;
        }
        else if (dir === 1) {
            width = this.gridBoxSize / 2.9;
            height = (this.gridBoxSize * (length - 2)) + ((this.gridBoxSize / 2) - width) + (width * 1.5);
            drawX = (this.gridOffsetX + (x * this.gridBoxSize) - this.gridBoxSize / 2) - width / 2;
            drawY = (this.gridOffsetY + ((y - length + 1) * this.gridBoxSize)) - (width * 1.5);
        }
        else if (dir === 2) {
            height = this.gridBoxSize / 2.9;
            width = (this.gridBoxSize * (length - 2)) + ((this.gridBoxSize / 2) - height) + (height * 1.5);
            drawX = (this.gridOffsetX + ((x - length + 1) * this.gridBoxSize)) - (height * 1.5);
            drawY = (this.gridOffsetY + (y * this.gridBoxSize) - this.gridBoxSize / 2) - height / 2;
        }
        else if (dir === 3) {
            // RIGHT
            height = this.gridBoxSize / 2.9;
            width = (this.gridBoxSize * (length - 2)) + ((this.gridBoxSize / 2) - height) + (height * 1.5);
            drawX = (this.gridOffsetX + (x * this.gridBoxSize) - this.gridBoxSize / 2) + height;
            drawY = (this.gridOffsetY + (y * this.gridBoxSize) - this.gridBoxSize / 2) - height / 2;
        }
        if (dir === 0 || dir === 1) {
            this.context.moveTo(drawX, drawY);
            this.context.lineTo(drawX, drawY + height);
            this.context.stroke();
            this.context.moveTo(drawX + width, drawY);
            this.context.lineTo(drawX + width, drawY + height);
            this.context.stroke();
        }
        else {
            this.context.moveTo(drawX, drawY);
            this.context.lineTo(drawX + width, drawY);
            this.context.stroke();
            this.context.moveTo(drawX, drawY + height);
            this.context.lineTo(drawX + width, drawY + height);
            this.context.stroke();
        }
        this.context.strokeStyle = this.colors.color_1;
        this.context.fillStyle = this.colors.BACKGROUND;
        this.context.lineWidth = 3;
        this.context.fillRect(drawX, drawY, width, height);
        this.context.stroke();
        if (!this.solved) {
            this.context.fillStyle = this.colors.COLOR_3;
        }
        else {
            this.context.fillStyle = this.colors.COLOR_1;
        }
        if (fillAmount > 1) {
            if (dir === 0) {
                if (fillAmount < length) {
                    this.context.fillRect(drawX + 1, drawY - 1, width - 2, 2 + this.gridBoxSize * (fillAmount - 1));
                }
                else {
                    this.context.fillRect(drawX + 1, drawY - 1, width - 2, 2 + height * (fillAmount / length));
                }
            }
            else if (dir === 3) {
                if (fillAmount < length) {
                    this.context.fillRect(drawX - 1, drawY + 1, 2 + this.gridBoxSize * (fillAmount - 1), height - 2);
                }
                else {
                    this.context.fillRect(drawX - 1, drawY + 1, 2 + width * (fillAmount / length), height - 2);
                }
            }
            else if (dir === 1) {
                var rectHeight = height * (fillAmount / length);
                if (fillAmount < length) {
                    this.context.fillRect(drawX + 1, (drawY + ((length - 1) * this.gridBoxSize) - width) -
                        (this.gridBoxSize * (fillAmount - 1)) + 1, width - 2, 2 + this.gridBoxSize * (fillAmount - 1));
                }
                else {
                    this.context.fillRect(drawX + 1, (drawY + ((length - 1) * this.gridBoxSize) - width) - rectHeight + 1, width - 2, 2 + rectHeight);
                }
            }
            else if (dir === 2) {
                var rectWidth = width * (fillAmount / length);
                if (fillAmount < length) {
                    this.context.fillRect((drawX + ((length - 1) * this.gridBoxSize) - height) -
                        (this.gridBoxSize * (fillAmount - 1)) + 1, drawY + 1, 2 + this.gridBoxSize * (fillAmount - 1), height - 2);
                }
                else {
                    this.context.fillRect((drawX + ((length - 1) * this.gridBoxSize) - height) - rectWidth + 1, drawY + 1, 2 + rectWidth, height - 2);
                }
            }
        }
    };
    ThermometersComponent.prototype.fixSizes = function () {
        this.context.beginPath();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = window.innerWidth - this.canvasOffsetX;
        this.canvas.height = window.innerHeight - (this.canvasOffsetY * 2);
        this.context.translate(0.5, 0.5);
        this.gridOffsetX = this.canvas.width / 20;
        this.gridOffsetY = this.canvas.height / 20;
        var boardLength = Math.max(this.board.width, this.board.height);
        var size = Math.min(this.canvas.offsetWidth - (this.gridOffsetX * 2), this.canvas.offsetHeight - (this.gridOffsetY * 2));
        var w = this.canvas.offsetWidth;
        var h = this.canvas.offsetHeight;
        if (w > h) {
            this.gridOffsetX = Math.round((w - h) / 2) + this.gridOffsetX;
        }
        else {
            this.gridOffsetY = Math.round((h - w) / 2) + this.gridOffsetY;
        }
        this.gridBoxSize = Math.round((size / boardLength));
        this.draw();
    };
    /* EVENT LISTENERS */
    // UNCOMMENT HostListener to track given event
    ThermometersComponent.prototype.mousePressed = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        if (!this.solved) {
            x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
            y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);
            this.board.click(x + 1, y + 1);
            if (this.board.isSolved()) {
                this.done();
            }
            this.draw();
        }
    };
    // UNCOMMENT HostListener to track given event
    // @HostListener('document:mouseup', ['$event'])
    ThermometersComponent.prototype.mouseReleased = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        console.log({ 'mouseReleasedX': x, 'mouseReleasedY': y });
    };
    // UNCOMMENT HostListener to track given event
    ThermometersComponent.prototype.mouseMove = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        if (!this.solved) {
            x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
            y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);
            this.selectedX = x;
            this.selectedY = y;
            this.draw();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ThermometersComponent.prototype, "mousePressed", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ThermometersComponent.prototype, "mouseMove", null);
    ThermometersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-thermometers',
            template: __webpack_require__(/*! ../game-board/game-board.component.html */ "./src/app/games/game-board/game-board.component.html"),
            styles: [__webpack_require__(/*! ../game-board/game-board.component.css */ "./src/app/games/game-board/game-board.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _services_colors_color_service__WEBPACK_IMPORTED_MODULE_7__["ColorService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_3__["TunnelService"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__["TimerService"],
            _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__["LoaderService"],
            _services_games_options_service__WEBPACK_IMPORTED_MODULE_10__["OptionsService"]])
    ], ThermometersComponent);
    return ThermometersComponent;
}(_classes_game_board__WEBPACK_IMPORTED_MODULE_9__["GameBoard"]));



/***/ }),

/***/ "./src/app/games/tile-game/tile-game.component.ts":
/*!********************************************************!*\
  !*** ./src/app/games/tile-game/tile-game.component.ts ***!
  \********************************************************/
/*! exports provided: TileGameComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TileGameComponent", function() { return TileGameComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/loading-service/loader.service */ "./src/app/services/loading-service/loader.service.ts");
/* harmony import */ var _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/timer/timer.service */ "./src/app/services/timer/timer.service.ts");
/* harmony import */ var _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../enums/game-id.enum */ "./src/app/enums/game-id.enum.ts");
/* harmony import */ var _services_boards_tile_game_board_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/boards/tile-game/board.service */ "./src/app/services/boards/tile-game/board.service.ts");
/* harmony import */ var _services_colors_color_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/colors/color.service */ "./src/app/services/colors/color.service.ts");
/* harmony import */ var _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/persistence/settings.service */ "./src/app/services/persistence/settings.service.ts");
/* harmony import */ var _classes_game_board__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../classes/game-board */ "./src/app/classes/game-board.ts");
/* harmony import */ var _services_games_options_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../services/games/options.service */ "./src/app/services/games/options.service.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var TileGameComponent = /** @class */ (function (_super) {
    __extends(TileGameComponent, _super);
    function TileGameComponent(route, colorService, router, tunnel, userService, timer, loader, optionsService) {
        var _this = _super.call(this, route, colorService, router, tunnel, userService, timer, loader, optionsService) || this;
        _this.initialDelay = 200;
        _this.continuedDelay = 16;
        _this.shiftKey = 16;
        _this.upKey = 83;
        _this.downKey = 87;
        _this.leftKey = 68;
        _this.rightKey = 65;
        _this.animationDelta = 10;
        _this.animationSpeed = 10;
        _this.gameID = _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_6__["GameID"].TILE_GAME;
        _this.options = [
            {
                'type': 'checkbox',
                'bindTo': 'showAnimations',
                'name': 'Show Animations',
                'callback': 'this.toggleAnimations()',
                'storedName': 'tileAnimations'
            },
            {
                'type': 'checkbox',
                'bindTo': 'mouseHover',
                'name': 'Mouse Hover',
                'callback': 'this.toggleMouseHover()',
                'storedName': 'HoverTileGame'
            },
            {
                'type': 'checkbox',
                'bindTo': 'staticTileSize',
                'name': 'Fixed Tile Size',
                'callback': 'this.toggleStaticSizes()',
                'storedName': 'StaticTileSize',
            },
            {
                'type': 'dropdown',
                'bindTo': 'colorScheme',
                'name': 'Color Scheme',
                'callback': 'this.updateColorScheme()',
                'storedName': 'TileGameColorScheme',
                'options': [
                    'Fringe',
                    'Rows',
                    'Rows & Cols',
                    'Quadrants'
                ]
            }
        ];
        _this.hotkeys = [
            {
                'name': 'UP',
                'bindTo': 'TileGameDOWN',
                'callback': 'this.configureHotkeys()'
            },
            {
                'name': 'DOWN',
                'bindTo': 'TileGameUP',
                'callback': 'this.configureHotkeys()'
            },
            {
                'name': 'LEFT',
                'bindTo': 'TileGameRIGHT',
                'callback': 'this.configureHotkeys()'
            },
            {
                'name': 'RIGHT',
                'bindTo': 'TileGameLEFT',
                'callback': 'this.configureHotkeys()'
            }
        ];
        return _this;
    }
    TileGameComponent.prototype.ngOnInit = function () {
        this.shift = false;
        this.xAxis = false;
        this.yAxis = false;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.showAnimations = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].getDataBool('tileAnimations');
        this.mouseHover = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].getDataBool('HoverTileGame');
        this.staticTileSize = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].getDataBool('StaticTileSize');
        this.colorScheme = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].getDataStr('TileGameColorScheme');
        this.configureHotkeys();
        _super.prototype.ngOnInit.call(this);
    };
    TileGameComponent.prototype.setupBoard = function () {
        _super.prototype.setupBoard.call(this);
        var width;
        var height;
        switch (this.difficulty) {
            // Easy or default
            case 1:
            default: {
                width = 4;
                height = 4;
                break;
            }
            // Medium
            case 2: {
                width = 5;
                height = 5;
                break;
            }
            // Hard
            case 3: {
                width = 7;
                height = 7;
                break;
            }
            // Extreme
            case 4: {
                width = 10;
                height = 10;
                break;
            }
            // Custom board size
            case 5: {
                width = Number(this.route.snapshot.paramMap.get('width'));
                height = Number(this.route.snapshot.paramMap.get('height'));
                console.log(width);
                console.log(height);
                break;
            }
        }
        // Uncomment these to add event listeners
        // this.canvas.addEventListener('mouseup',   (e) => this.mouseReleased(e), false);
        // this.canvas.addEventListener('mousemove', (e) => this.mouseMove(e),     false);
        // window.addEventListener('keyup',   (e) => this.keyReleased(e), false);
        this.board = new _services_boards_tile_game_board_service__WEBPACK_IMPORTED_MODULE_7__["Board"](width, height, 0);
    };
    TileGameComponent.prototype.toggleMouseHover = function () {
        this.mouseHover = !this.mouseHover;
        _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].storeData('HoverTileGame', this.mouseHover);
    };
    TileGameComponent.prototype.toggleAnimations = function () {
        this.showAnimations = !this.showAnimations;
        this.animatingX = -1;
        this.animatingY = -1;
        _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].storeData('tileAnimations', this.showAnimations);
        this.draw();
    };
    TileGameComponent.prototype.configureHotkeys = function () {
        this.upKey = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].getDataNum('TileGameUP');
        this.downKey = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].getDataNum('TileGameDOWN');
        this.leftKey = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].getDataNum('TileGameLEFT');
        this.rightKey = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].getDataNum('TileGameRIGHT');
    };
    TileGameComponent.prototype.draw = function () {
        _super.prototype.draw.call(this);
        // this.drawGrid();
        this.drawTiles();
    };
    TileGameComponent.prototype.drawBackground = function () {
        this.context.fillStyle = this.colors.BACKGROUND; // Background color
        this.context.fillRect(0, 0, this.canvas.offsetWidth * 2, this.canvas.offsetHeight * 2);
    };
    TileGameComponent.prototype.drawGrid = function () {
        for (var i = 0; i <= this.board.width; i++) {
            this.context.lineWidth = 1;
            this.showAnimations = !this.showAnimations;
            _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].storeData('tileAnimations', this.showAnimations);
            this.draw();
            this.context.strokeStyle = this.colors.COLOR_1;
            this.context.moveTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY);
            this.context.lineTo(this.gridOffsetX + (i * this.gridBoxSize), this.gridOffsetY + (this.board.height * this.gridBoxSize));
            this.context.stroke();
        }
        for (var j = 0; j <= this.board.height; j++) {
            this.context.lineWidth = 1;
            this.context.strokeStyle = this.colors.FOREGROUND;
            this.context.moveTo(this.gridOffsetX, this.gridOffsetY + (j * this.gridBoxSize));
            this.context.lineTo(this.gridOffsetX + (this.board.width * this.gridBoxSize), this.gridOffsetY + (j * this.gridBoxSize));
            this.context.stroke();
        }
    };
    TileGameComponent.prototype.roundRect = function (ctx, x, y, width, height, radius, fill, stroke) {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }
    };
    TileGameComponent.prototype.drawTiles = function () {
        for (var j = 0; j < this.board.height; j++) {
            for (var i = 0; i < this.board.width; i++) {
                var boardValue = this.board.tilePuzzle[j][i];
                var tileString = '' + boardValue;
                if (tileString === '0') {
                    tileString = '';
                }
                if (this.board.width * this.board.height <= 100) {
                    this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 1.4) + 'px Poppins';
                }
                else {
                    this.context.font = 'Bold ' + Math.floor(this.gridBoxSize / 2) + 'px Poppins';
                }
                this.context.textAlign = 'center';
                var drawColors = [
                    this.colors.COLOR_6_ALT,
                    this.colors.COLOR_4,
                    this.colors.COLOR_4_ALT,
                    this.colors.COLOR_1_ALT,
                    this.colors.COLOR_1,
                    this.colors.COLOR_3_ALT,
                    this.colors.COLOR_2_ALT,
                    this.colors.COLOR_3,
                    this.colors.COLOR_5,
                    this.colors.COLOR_5_ALT // PINK
                ];
                var innerColor = '#FFFFFF';
                if (this.colorScheme === 'Fringe') {
                    for (var u = this.board.width; u > 0; u--) {
                        if (boardValue <= (this.board.width * (u)) ||
                            (boardValue % this.board.width) === (u % 10)) {
                            this.context.fillStyle = drawColors[(u - 1) % 10];
                        }
                    }
                }
                else if (this.colorScheme === 'Rows') {
                    for (var h = this.board.width; h >= 0; h--) {
                        if (Math.floor((boardValue - 1) / this.board.width) % 10 === h % 10) {
                            this.context.fillStyle = drawColors[h % 10];
                            break;
                        }
                    }
                }
                else if (this.colorScheme === 'Rows & Cols') {
                    for (var h = this.board.width; h >= 0; h--) {
                        if ((Math.floor((boardValue - 1) / this.board.width) % 10 === h % 10) &&
                            Math.floor((boardValue - 1) / this.board.width) < this.board.width - 2) {
                            this.context.fillStyle = drawColors[h % 10];
                            break;
                        }
                        else if (((boardValue - 1) % this.board.width) === h &&
                            Math.floor((boardValue - 1) / this.board.width) >= this.board.width - 2) {
                            this.context.fillStyle = drawColors[h % 10];
                            break;
                        }
                    }
                }
                else if (this.colorScheme === 'Quadrants') {
                    var xi = ((boardValue - 1) % this.board.height);
                    var yi = Math.floor((boardValue - 1) / this.board.width);
                    var innerBoardValue = -1;
                    if (xi < this.board.height / 2 && yi < this.board.width / 2) {
                        this.context.fillStyle = drawColors[0];
                        innerBoardValue = boardValue - (yi * (this.board.height / 2));
                    }
                    else if (xi >= this.board.height / 2 && yi < this.board.width / 2) {
                        this.context.fillStyle = drawColors[2];
                        innerBoardValue = boardValue - (yi * (this.board.height / 2)) - this.board.width / 2;
                    }
                    else if (xi < this.board.height / 2 && yi >= this.board.width / 2) {
                        this.context.fillStyle = drawColors[3];
                        innerBoardValue = boardValue - ((yi + this.board.height / 2) * (this.board.height / 2));
                    }
                    else if (xi >= this.board.height / 2 && yi >= this.board.width / 2) {
                        this.context.fillStyle = drawColors[9];
                        innerBoardValue = boardValue - ((yi + this.board.height / 2) * (this.board.height / 2)) - this.board.width / 2;
                    }
                    for (var u = (this.board.width / 2); u > 0; u--) {
                        if (innerBoardValue <= ((this.board.width / 2) * (u)) ||
                            (innerBoardValue % Math.floor(this.board.width / 2)) === (u % 10)) {
                            innerColor = drawColors[(u - 1) % 10];
                        }
                    }
                }
                var spacing = this.gridBoxSize / 40;
                if ((i !== this.animatingX || j !== this.animatingY) || !this.showAnimations) {
                    if (boardValue !== 0) {
                        this.roundRect(this.context, (this.gridOffsetX + (i * this.gridBoxSize)) + spacing, (this.gridOffsetY + (j * this.gridBoxSize)) + spacing, this.gridBoxSize - (spacing * 2), this.gridBoxSize - (spacing * 2), (this.gridBoxSize / 20), true, false);
                        if (this.colorScheme === 'Quadrants' && (this.board.width * this.board.height) >= 100) {
                            this.context.fillStyle = innerColor;
                            this.roundRect(this.context, ((this.gridOffsetX + (i * this.gridBoxSize)) + spacing) + (0.1 * this.gridBoxSize), ((this.gridOffsetY + (j * this.gridBoxSize)) + spacing) + (0.8 * this.gridBoxSize), (this.gridBoxSize - (spacing * 2)) - (0.2 * this.gridBoxSize), (this.gridBoxSize - (spacing * 2)) - (0.85 * this.gridBoxSize), (this.gridBoxSize / 20), true, true);
                        }
                    }
                    this.context.fillStyle = this.colors.BACKGROUND;
                    this.context.fillText(tileString, (this.gridOffsetX) + (i * this.gridBoxSize) + (this.gridBoxSize / 2), (this.gridOffsetY) + ((j + 1) * this.gridBoxSize) - (this.gridBoxSize / 4));
                }
            }
        }
    };
    TileGameComponent.prototype.updateColorScheme = function () {
        this.colorScheme = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].getDataStr('TileGameColorScheme');
        this.draw();
    };
    TileGameComponent.prototype.fixSizes = function () {
        this.context.beginPath();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = window.innerWidth - this.canvasOffsetX;
        this.canvas.height = window.innerHeight - (this.canvasOffsetY * 2);
        this.context.translate(0.5, 0.5);
        this.gridOffsetX = this.canvas.width / 20;
        this.gridOffsetY = this.canvas.height / 20;
        var boardLength = Math.max(this.board.width, this.board.height);
        var size = Math.min(this.canvas.offsetWidth - (this.gridOffsetX * 2), this.canvas.offsetHeight - (this.gridOffsetY * 2));
        var w = this.canvas.offsetWidth;
        var h = this.canvas.offsetHeight;
        if (w > h) {
            this.gridOffsetX = Math.round((w - h) / 2) + this.gridOffsetX;
        }
        else {
            this.gridOffsetY = Math.round((h - w) / 2) + this.gridOffsetY;
        }
        if (!this.staticTileSize) {
            this.gridBoxSize = Math.round((size / boardLength));
        }
        else {
            this.gridBoxSize = 75;
        }
        this.animationDelta = this.gridBoxSize / 5;
        this.draw();
    };
    TileGameComponent.prototype.toggleStaticSizes = function () {
        this.staticTileSize = !this.staticTileSize;
        _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_9__["SettingsService"].storeData('StaticTileSize', this.staticTileSize);
        this.fixSizes();
    };
    TileGameComponent.prototype.animateTileUp = function (animx, animy, y, x, destY, destX) {
        if (this.animatingX !== animx || this.animatingY !== animy) {
            return;
        }
        else if (y > destY) {
            this.animatingX = -1;
            this.animatingY = -1;
            this.draw();
            return;
        }
        else {
            var dist_1 = this.animationDelta;
            var boardValue = this.board.tilePuzzle[animy][animx];
            this.drawBlankTile(animx, animy - 1);
            this.drawTile(x, y, boardValue);
            var that_1 = this;
            setTimeout(function () {
                that_1.animateTileUp(animx, animy, y + dist_1, x, destY, destX);
            }, that_1.animationSpeed);
        }
    };
    TileGameComponent.prototype.animateTileDown = function (animx, animy, y, x, destY, destX) {
        if (this.animatingX !== animx || this.animatingY !== animy) {
            return;
        }
        else if (y < destY) {
            this.animatingX = -1;
            this.animatingY = -1;
            this.draw();
            return;
        }
        else {
            var dist_2 = this.animationDelta;
            var boardValue = this.board.tilePuzzle[animy][animx];
            this.drawBlankTile(animx, animy + 1);
            this.drawTile(x, y, boardValue);
            var that_2 = this;
            setTimeout(function () {
                that_2.animateTileDown(animx, animy, y - dist_2, x, destY, destX);
            }, that_2.animationSpeed);
        }
    };
    TileGameComponent.prototype.animateTileLeft = function (animx, animy, y, x, destY, destX) {
        if (this.animatingX !== animx || this.animatingY !== animy) {
            return;
        }
        else if (x > destX) {
            this.animatingX = -1;
            this.animatingY = -1;
            this.draw();
            return;
        }
        else {
            var dist_3 = this.animationDelta;
            var boardValue = this.board.tilePuzzle[animy][animx];
            this.drawBlankTile(animx - 1, animy);
            this.drawTile(x, y, boardValue);
            var that_3 = this;
            setTimeout(function () {
                that_3.animateTileLeft(animx, animy, y, x + dist_3, destY, destX);
            }, that_3.animationSpeed);
        }
    };
    TileGameComponent.prototype.animateTileRight = function (animx, animy, y, x, destY, destX) {
        if (this.animatingX !== animx || this.animatingY !== animy) {
            return;
        }
        else if (x < destX) {
            this.animatingX = -1;
            this.animatingY = -1;
            this.draw();
            return;
        }
        else {
            var dist_4 = this.animationDelta;
            var boardValue = this.board.tilePuzzle[animy][animx];
            this.drawBlankTile(animx + 1, animy);
            this.drawTile(x, y, boardValue);
            var that_4 = this;
            setTimeout(function () {
                that_4.animateTileRight(animx, animy, y, x - dist_4, destY, destX);
            }, that_4.animationSpeed);
        }
    };
    TileGameComponent.prototype.drawBlankTile = function (x, y) {
        var spacing = 0;
        this.context.fillStyle = this.colors.BACKGROUND;
        this.context.fillRect((this.gridOffsetX + (x * this.gridBoxSize)) + spacing, (this.gridOffsetY + (y * this.gridBoxSize)) + spacing, this.gridBoxSize - (spacing * 2), this.gridBoxSize - (spacing * 2));
    };
    TileGameComponent.prototype.drawTile = function (x, y, boardValue) {
        var drawColors = [
            this.colors.COLOR_6_ALT,
            this.colors.COLOR_4,
            this.colors.COLOR_4_ALT,
            this.colors.COLOR_1_ALT,
            this.colors.COLOR_1,
            this.colors.COLOR_3_ALT,
            this.colors.COLOR_2_ALT,
            this.colors.COLOR_3,
            this.colors.COLOR_5,
            this.colors.COLOR_5_ALT // PINK
        ];
        var innerColor = '#FFFFFF';
        if (this.colorScheme === 'Fringe') {
            for (var u = this.board.width; u > 0; u--) {
                if (boardValue <= (this.board.width * (u)) ||
                    (boardValue % this.board.width) === (u % 10)) {
                    this.context.fillStyle = drawColors[(u - 1) % 10];
                }
            }
        }
        else if (this.colorScheme === 'Rows') {
            for (var h = this.board.width; h >= 0; h--) {
                if (Math.floor((boardValue - 1) / this.board.width) % 10 === h % 10) {
                    this.context.fillStyle = drawColors[h % 10];
                    break;
                }
            }
        }
        else if (this.colorScheme === 'Rows & Cols') {
            for (var h = this.board.width; h >= 0; h--) {
                if ((Math.floor((boardValue - 1) / this.board.width) % 10 === h % 10) &&
                    Math.floor((boardValue - 1) / this.board.width) < this.board.width - 2) {
                    this.context.fillStyle = drawColors[h % 10];
                    break;
                }
                else if (((boardValue - 1) % this.board.width) === h &&
                    Math.floor((boardValue - 1) / this.board.width) >= this.board.width - 2) {
                    this.context.fillStyle = drawColors[h % 10];
                    break;
                }
            }
        }
        else if (this.colorScheme === 'Quadrants') {
            var xi = ((boardValue - 1) % this.board.height);
            var yi = Math.floor((boardValue - 1) / this.board.width);
            var innerBoardValue = -1;
            if (xi < this.board.height / 2 && yi < this.board.width / 2) {
                this.context.fillStyle = drawColors[0];
                innerBoardValue = boardValue - (yi * (this.board.height / 2));
            }
            else if (xi >= this.board.height / 2 && yi < this.board.width / 2) {
                this.context.fillStyle = drawColors[2];
                innerBoardValue = boardValue - (yi * (this.board.height / 2)) - this.board.width / 2;
            }
            else if (xi < this.board.height / 2 && yi >= this.board.width / 2) {
                this.context.fillStyle = drawColors[3];
                innerBoardValue = boardValue - ((yi + this.board.height / 2) * (this.board.height / 2));
            }
            else if (xi >= this.board.height / 2 && yi >= this.board.width / 2) {
                this.context.fillStyle = drawColors[9];
                innerBoardValue = boardValue - ((yi + this.board.height / 2) * (this.board.height / 2)) - this.board.width / 2;
            }
            for (var u = (this.board.width / 2); u > 0; u--) {
                if (innerBoardValue <= ((this.board.width / 2) * (u)) ||
                    (innerBoardValue % Math.floor(this.board.width / 2)) === (u % 10)) {
                    innerColor = drawColors[(u - 1) % 10];
                }
            }
        }
        var tileString = '' + boardValue;
        var spacing = this.gridBoxSize / 40;
        this.roundRect(this.context, x, y, this.gridBoxSize - (spacing * 2), this.gridBoxSize - (spacing * 2), (this.gridBoxSize / 20), true, false);
        if (this.colorScheme === 'Quadrants' && (this.board.width * this.board.height) >= 100) {
            this.context.fillStyle = innerColor;
            this.roundRect(this.context, x + (0.1 * this.gridBoxSize), y + (0.8 * this.gridBoxSize), (this.gridBoxSize - (spacing * 2)) - (0.2 * this.gridBoxSize), (this.gridBoxSize - (spacing * 2)) - (0.85 * this.gridBoxSize), (this.gridBoxSize / 20), true, true);
        }
        this.context.fillStyle = this.colors.BACKGROUND;
        var textX = (x + (this.gridBoxSize / 2) - spacing);
        var j = (y - spacing - this.gridOffsetY) / this.gridBoxSize;
        var textY = (this.gridOffsetY + ((j + 1) * this.gridBoxSize) - (this.gridBoxSize / 4));
        this.context.fillText(tileString, textX, textY);
    };
    TileGameComponent.prototype.moveUp = function (repeat, click) {
        var directions = this.board.getValidDirections();
        if (directions.includes(0) && (this.up || click)) {
            this.board.tilePuzzle[this.board.emptyY][this.board.emptyX] = this.board.tilePuzzle[this.board.emptyY - 1][this.board.emptyX];
            this.board.tilePuzzle[this.board.emptyY - 1][this.board.emptyX] = 0;
            this.board.emptyY--;
            this.animatingX = this.board.emptyX;
            this.animatingY = this.board.emptyY + 1;
            this.draw();
            if (this.showAnimations) {
                var spacing = this.gridBoxSize / 40;
                var y1 = this.board.emptyY + 1;
                var x1 = this.board.emptyX;
                var y2 = this.board.emptyY;
                var x2 = this.board.emptyX;
                this.animateTileUp(this.animatingX, this.animatingY, (this.gridOffsetY + (y2 * this.gridBoxSize)) + spacing, (this.gridOffsetX + (x2 * this.gridBoxSize)) + spacing, (this.gridOffsetY + (y1 * this.gridBoxSize)) + spacing, (this.gridOffsetX + (x1 * this.gridBoxSize)) + spacing);
            }
            if (this.board.isSolved()) {
                this.done();
            }
            if (this.up && repeat && !this.solved) {
                var that_5 = this;
                this.upTimeout =
                    setTimeout(function () {
                        that_5.moveUp(true, false);
                    }, this.continuedDelay);
            }
        }
    };
    TileGameComponent.prototype.moveUpFirst = function () {
        this.moveUp(false, false);
        var that = this;
        if (this.shift && !this.yAxis) {
            this.xAxis = true;
            this.upTimeout =
                setTimeout(function () {
                    that.moveUp(true, false);
                }, this.continuedDelay);
        }
        else {
            this.upTimeout =
                setTimeout(function () {
                    that.moveUp(true, false);
                }, this.initialDelay);
        }
    };
    TileGameComponent.prototype.moveDownFirst = function () {
        this.moveDown(false, false);
        var that = this;
        if (this.shift && !this.yAxis) {
            this.xAxis = true;
            this.downTimeout =
                setTimeout(function () {
                    that.moveDown(true, false);
                }, this.continuedDelay);
        }
        else {
            this.downTimeout =
                setTimeout(function () {
                    that.moveDown(true, false);
                }, this.initialDelay);
        }
    };
    TileGameComponent.prototype.moveRightFirst = function () {
        this.moveRight(false, false);
        var that = this;
        if (this.shift && !this.xAxis) {
            this.yAxis = true;
            this.rightTimeout =
                setTimeout(function () {
                    that.moveRight(true, false);
                }, this.continuedDelay);
        }
        else {
            this.rightTimeout =
                setTimeout(function () {
                    that.moveRight(true, false);
                }, this.initialDelay);
        }
    };
    TileGameComponent.prototype.moveLeftFirst = function () {
        this.moveLeft(false, false);
        var that = this;
        if (this.shift && !this.xAxis) {
            this.yAxis = true;
            this.leftTimeout =
                setTimeout(function () {
                    that.moveLeft(true, false);
                }, this.continuedDelay);
        }
        else {
            this.leftTimeout =
                setTimeout(function () {
                    that.moveLeft(true, false);
                }, this.initialDelay);
        }
    };
    TileGameComponent.prototype.moveDown = function (repeat, click) {
        var directions = this.board.getValidDirections();
        if (directions.includes(1) && (this.down || click)) {
            this.board.tilePuzzle[this.board.emptyY][this.board.emptyX] = this.board.tilePuzzle[this.board.emptyY + 1][this.board.emptyX];
            this.board.tilePuzzle[this.board.emptyY + 1][this.board.emptyX] = 0;
            this.board.emptyY++;
            this.animatingX = this.board.emptyX;
            this.animatingY = this.board.emptyY - 1;
            this.draw();
            if (this.showAnimations) {
                var spacing = this.gridBoxSize / 40;
                var y1 = this.board.emptyY - 1;
                var x1 = this.board.emptyX;
                var y2 = this.board.emptyY;
                var x2 = this.board.emptyX;
                this.animateTileDown(this.animatingX, this.animatingY, (this.gridOffsetY + (y2 * this.gridBoxSize)) + spacing, (this.gridOffsetX + (x2 * this.gridBoxSize)) + spacing, (this.gridOffsetY + (y1 * this.gridBoxSize)) + spacing, (this.gridOffsetX + (x1 * this.gridBoxSize)) + spacing);
            }
            if (this.board.isSolved()) {
                this.done();
            }
            if (this.down && repeat && !this.solved) {
                var that_6 = this;
                this.downTimeout =
                    setTimeout(function () {
                        that_6.moveDown(true, false);
                    }, this.continuedDelay);
            }
        }
    };
    TileGameComponent.prototype.moveLeft = function (repeat, click) {
        var directions = this.board.getValidDirections();
        if (directions.includes(2) && (this.left || click)) {
            this.board.tilePuzzle[this.board.emptyY][this.board.emptyX] = this.board.tilePuzzle[this.board.emptyY][this.board.emptyX - 1];
            this.board.tilePuzzle[this.board.emptyY][this.board.emptyX - 1] = 0;
            this.board.emptyX--;
            this.animatingX = this.board.emptyX + 1;
            this.animatingY = this.board.emptyY;
            this.draw();
            if (this.showAnimations) {
                var spacing = this.gridBoxSize / 40;
                var y1 = this.board.emptyY;
                var x1 = this.board.emptyX + 1;
                var y2 = this.board.emptyY;
                var x2 = this.board.emptyX;
                this.animateTileLeft(this.animatingX, this.animatingY, (this.gridOffsetY + (y2 * this.gridBoxSize)) + spacing, (this.gridOffsetX + (x2 * this.gridBoxSize)) + spacing, (this.gridOffsetY + (y1 * this.gridBoxSize)) + spacing, (this.gridOffsetX + (x1 * this.gridBoxSize)) + spacing);
            }
            if (this.board.isSolved()) {
                this.done();
            }
            if (this.left && repeat && !this.solved) {
                var that_7 = this;
                this.leftTimeout =
                    setTimeout(function () {
                        that_7.moveLeft(true, false);
                    }, this.continuedDelay);
            }
        }
    };
    TileGameComponent.prototype.moveRight = function (repeat, click) {
        var directions = this.board.getValidDirections();
        if (directions.includes(3) && (this.right || click)) {
            this.board.tilePuzzle[this.board.emptyY][this.board.emptyX] = this.board.tilePuzzle[this.board.emptyY][this.board.emptyX + 1];
            this.board.tilePuzzle[this.board.emptyY][this.board.emptyX + 1] = 0;
            this.board.emptyX++;
            this.animatingX = this.board.emptyX - 1;
            this.animatingY = this.board.emptyY;
            this.draw();
            if (this.showAnimations) {
                var spacing = this.gridBoxSize / 40;
                var y1 = this.board.emptyY;
                var x1 = this.board.emptyX - 1;
                var y2 = this.board.emptyY;
                var x2 = this.board.emptyX;
                this.animateTileRight(this.animatingX, this.animatingY, (this.gridOffsetY + (y2 * this.gridBoxSize)) + spacing, (this.gridOffsetX + (x2 * this.gridBoxSize)) + spacing, (this.gridOffsetY + (y1 * this.gridBoxSize)) + spacing, (this.gridOffsetX + (x1 * this.gridBoxSize)) + spacing);
            }
            if (this.board.isSolved()) {
                this.done();
            }
            if (this.right && repeat && !this.solved) {
                var that_8 = this;
                this.rightTimeout =
                    setTimeout(function () {
                        that_8.moveRight(true, false);
                    }, this.continuedDelay);
            }
        }
    };
    TileGameComponent.prototype.moveTile = function (x, y) {
        var emptyX = this.board.emptyX;
        var emptyY = this.board.emptyY;
        if (x - 1 >= emptyX && y === emptyY) {
            for (var i = emptyX; i < x; i++) {
                this.moveRight(false, true);
            }
        }
        else if (x + 1 <= emptyX && y === emptyY) {
            for (var j = x; j < emptyX; j++) {
                this.moveLeft(false, true);
            }
        }
        else if (x === emptyX && y + 1 <= emptyY) {
            for (var k = y; k < emptyY; k++) {
                this.moveUp(false, true);
            }
        }
        else if (x === emptyX && y - 1 >= emptyY) {
            for (var l = emptyY; l < y; l++) {
                this.moveDown(false, true);
            }
        }
    };
    /* EVENT LISTENERS */
    TileGameComponent.prototype.mousePressed = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        if (!this.solved) {
            x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
            y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);
            if (x > -1 &&
                x < this.board.width &&
                y > -1 &&
                y < this.board.height) {
                this.moveTile(x, y);
                if (this.board.isSolved()) {
                    this.done();
                }
            }
        }
    };
    TileGameComponent.prototype.mouseReleased = function (mouseEvent) {
        var x = mouseEvent.clientX - this.canvasOffsetX;
        var y = mouseEvent.clientY - this.canvasOffsetY;
        console.log({ 'mouseReleasedX': x, 'mouseReleasedY': y });
    };
    TileGameComponent.prototype.mouseMove = function (mouseEvent) {
        if (this.mouseHover) {
            var x = mouseEvent.clientX - this.canvasOffsetX;
            var y = mouseEvent.clientY - this.canvasOffsetY;
            if (!this.solved) {
                x = Math.floor((x - this.gridOffsetX) / this.gridBoxSize);
                y = Math.floor((y - this.gridOffsetY) / this.gridBoxSize);
                if (x > -1 &&
                    x < this.board.width &&
                    y > -1 &&
                    y < this.board.height) {
                    this.moveTile(x, y);
                    if (this.board.isSolved()) {
                        this.done();
                    }
                }
            }
        }
    };
    TileGameComponent.prototype.keyPressed = function (keyEvent) {
        var code = keyEvent.keyCode;
        if (code === 32) {
            this.newGame();
            return;
        }
        if (!this.solved) {
            switch (code) {
                // UP
                case (40):
                case (this.upKey):
                    this.up = true;
                    this.down = false;
                    this.left = false;
                    this.right = false;
                    clearTimeout(this.upTimeout);
                    this.moveUpFirst();
                    break;
                // DOWN
                case (38):
                case (this.downKey):
                    this.down = true;
                    this.up = false;
                    this.left = false;
                    this.right = false;
                    clearTimeout(this.downTimeout);
                    this.moveDownFirst();
                    break;
                // LEFT
                case (39):
                case (this.leftKey):
                    this.left = true;
                    this.up = false;
                    this.down = false;
                    this.right = false;
                    clearTimeout(this.leftTimeout);
                    this.moveLeftFirst();
                    break;
                // RIGHT
                case (37):
                case (this.rightKey):
                    this.right = true;
                    this.up = false;
                    this.down = false;
                    this.left = false;
                    clearTimeout(this.rightTimeout);
                    this.moveRightFirst();
                    break;
                case (this.shiftKey):
                    this.shift = true;
                    break;
            }
        }
    };
    TileGameComponent.prototype.keyReleased = function (keyEvent) {
        var code = keyEvent.keyCode;
        switch (code) {
            // UP
            case (40):
            case (this.upKey):
                this.up = false;
                break;
            // DOWN
            case (38):
            case (this.downKey):
                this.down = false;
                break;
            // LEFT
            case (39):
            case (this.leftKey):
                this.left = false;
                break;
            // RIGHT
            case (37):
            case (this.rightKey):
                this.right = false;
                break;
            case (this.shiftKey):
                this.shift = false;
                this.xAxis = false;
                this.yAxis = false;
                break;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TileGameComponent.prototype, "mousePressed", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TileGameComponent.prototype, "mouseMove", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TileGameComponent.prototype, "keyPressed", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TileGameComponent.prototype, "keyReleased", null);
    TileGameComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tile-game',
            template: __webpack_require__(/*! ../game-board/game-board.component.html */ "./src/app/games/game-board/game-board.component.html"),
            styles: [__webpack_require__(/*! ../game-board/game-board.component.css */ "./src/app/games/game-board/game-board.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _services_colors_color_service__WEBPACK_IMPORTED_MODULE_8__["ColorService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_3__["TunnelService"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_2__["TimerService"],
            _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__["LoaderService"],
            _services_games_options_service__WEBPACK_IMPORTED_MODULE_11__["OptionsService"]])
    ], TileGameComponent);
    return TileGameComponent;
}(_classes_game_board__WEBPACK_IMPORTED_MODULE_10__["GameBoard"]));



/***/ }),

/***/ "./src/app/header/header.component.css":
/*!*********************************************!*\
  !*** ./src/app/header/header.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".navbar-brand {\n  padding-top: 0rem !important;\n}\n\n.clickable {\n  -webkit-app-region: no-drag;\n}\n\n.imagecontainer {\n  position: absolute;\n  top:0px;\n  left:calc(50% - 90px);\n  height:3.5rem;\n  width: 179px;\n  z-index:0;\n}\n\n.image {\n  margin-top:5px;\n  height: 50px;\n}\n\n.imageholder {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  width:179px;\n  height: 50px;\n}\n\n.draggable {\n  cursor: -webkit-grabbing;\n  cursor: grabbing;\n  -webkit-app-region: drag;\n}\n\n* {\n  z-index:99;\n}\n\n.leftMore {\n  padding-right: 20px !important;\n}\n\n.traffic-lights {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  -webkit-app-region: no-drag;\n}\n\n.focus .traffic-lights > .traffic-light-close, .traffic-lights:hover > .traffic-light-close, .traffic-lights:active > .traffic-light-close {\n  background-color: #ff6159;\n}\n\n.focus .traffic-lights > .traffic-light-close:active:hover, .traffic-lights:hover > .traffic-light-close:active:hover, .traffic-lights:active > .traffic-light-close:active:hover {\n  background-color: #bf4942;\n}\n\n.focus .traffic-lights > .traffic-light-minimize, .traffic-lights:hover > .traffic-light-minimize, .traffic-lights:active > .traffic-light-minimize {\n  background-color: #ffbd2e;\n}\n\n.focus .traffic-lights > .traffic-light-minimize:active:hover, .traffic-lights:hover > .traffic-light-minimize:active:hover, .traffic-lights:active > .traffic-light-minimize:active:hover {\n  background-color: #bf8e22;\n}\n\n.focus .traffic-lights > .traffic-light-maximize, .traffic-lights:hover > .traffic-light-maximize, .traffic-lights:active > .traffic-light-maximize {\n  background-color: #28c941;\n}\n\n.focus .traffic-lights > .traffic-light-maximize:active:hover, .traffic-lights:hover > .traffic-light-maximize:active:hover, .traffic-lights:active > .traffic-light-maximize:active:hover {\n  background-color: #1d9730;\n}\n\n.traffic-lights > .traffic-light:before, .traffic-lights > .traffic-light:after {\n  visibility: visible;\n}\n\n.traffic-lights:hover > .traffic-light:before, .traffic-lights:hover > .traffic-light:after, .traffic-lights:active > .traffic-light:before, .traffic-lights:active > .traffic-light:after {\n  visibility: visible;\n}\n\n.traffic-light-minimize {\n  background-color: #ffbd2e;\n}\n\n.traffic-light-maximize {\n  background-color: #28c941;\n}\n\n.traffic-light-close {\n  background-color: #ff6159;\n}\n\n.traffic-light {\n  border-radius: 100%;\n  padding: 0;\n  height: 20px;\n  width: 20px;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  box-sizing: border-box;\n  position: relative;\n  outline: none;\n}\n\n.traffic-light:before, .traffic-light:after {\n  content: '';\n  position: absolute;\n  border-radius: 1px;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  margin: auto;\n}\n\n.traffic-light-close:before, .traffic-light-close:after {\n  background-color: #4d0000;\n  width: 8px;\n  height: 1px;\n}\n\n.traffic-light-close:before {\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n}\n\n.traffic-light-close:after {\n  -webkit-transform: rotate(-45deg);\n          transform: rotate(-45deg);\n}\n\n.traffic-light-close:active:hover:before, .traffic-light-close:active:hover:after {\n  background-color: #190000;\n}\n\n.traffic-light-minimize:before {\n  background-color: #995700;\n  width: 8px;\n  height: 1px;\n}\n\n.traffic-light-minimize:active:hover:before {\n  background-color: #592800;\n}\n\n.traffic-light-maximize:before {\n  background-color: #006500;\n  width: 6px;\n  height: 6px;\n}\n\n.traffic-light-maximize:after {\n  background-color: #28c941;\n  width: 10px;\n  height: 2px;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n}\n\n.traffic-light-maximize:active:hover:before {\n  background-color: #003200;\n}\n\n.traffic-light-maximize:active:hover:after {\n  background-color: #1d9730;\n}\n\n"

/***/ }),

/***/ "./src/app/header/header.component.html":
/*!**********************************************!*\
  !*** ./src/app/header/header.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav \n  [ngClass]=\"isElectron() ? 'draggable' : 'not-draggable'\"\n  class=\"navbar navbar-dark bg-dark\">\n  <a routerLink=\"/\" routerLinkActive=\"active\" class=\"clickable navbar-brand\"><img class=\"clickable\" src=\"/assets/images/logos/headerLogo.svg\" height=\"24\" width=\"180\"></a>\n  <div class=\"navbar-expand mr-auto\">\n    <div class=\"navbar-nav\">\n      <a routerLink=\"/leaderboards\" routerLinkActive=\"active\" class=\"nav-item nav-link clickable\">Leaderboards</a>\n      <ng-container *ngIf=\"username != ''\">\n        <a [routerLink]=\"['/profile']\" [queryParams]=\"{user:username}\" routerLinkActive=\"active\" class=\"nav-item nav-link clickable\">Profile</a>\n      </ng-container>\n    </div>\n  </div>\n  <div class=\"navbar-expand mr-auto\">\n    <a class=\"imagecontainer\">\n      <a class=\"clickable imageholder\" href=\"https://discord.gg/VHBsvMw\" target=\"_blank\">\n        <img class=\"clickable image\" src=\"/assets/images/logos/discord.png\">\n      </a>\n    </a>\n  </div>\n  <div class=\"navbar-expand ml-auto navbar-nav\">\n    <div class=\"navbar-nav\">\n      <ng-container *ngIf=\"username==''\">\n        <a \n          [ngClass]=\"isElectron() ? 'leftMore' : 'not-electron'\"\n          routerLink=\"/login\" routerLinkActive=\"active\" class=\"nav-item nav-link clickable\">\n          <i style=\"margin-right:5px\" class=\"fa fa-lock clickable\"></i> Sign In\n        </a>\n      </ng-container>\n      <ng-container *ngIf=\"username!=''\">\n        <div style=\"color:rgba(255, 255, 255, 0.5)\">\n          <i style=\"margin-right:5px\" class=\"fa fa-lock\"></i> Signed in as {{username}}\n          <a \n            [ngClass]=\"isElectron() ? 'leftMore' : 'not-electron'\"\n            class=\"clickable\" style=\"margin-left:50px;\" (click)=\"signOut()\">\n            Sign Out <i style=\"margin-left:5px\" class=\"fa fa-sign-in clickable\"></i>\n          </a>\n        </div>\n      </ng-container>\n      <ng-container *ngIf=\"isElectron()\">\n        <div class=\"traffic-lights\">\n          <button (click)=\"close()\" class=\"clickable traffic-light traffic-light-close\" id=\"close\"></button>\n        </div>\n      </ng-container>\n    </div>\n  </div>\n</nav>\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/loading-service/loader.service */ "./src/app/services/loading-service/loader.service.ts");
/* harmony import */ var _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../enums/game-id.enum */ "./src/app/enums/game-id.enum.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(tunnelService, loader, user) {
        var _this = this;
        this.tunnelService = tunnelService;
        this.loader = loader;
        this.user = user;
        this.username = "";
        user.username
            .subscribe(function (data) {
            _this.username = data;
        });
        tunnelService.getUsername()
            .subscribe(function (data) {
            user.setUserName(data['username']);
        });
        tunnelService.getLevel()
            .subscribe(function (data) {
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"].setXp(data['xp']);
        });
    }
    HeaderComponent.prototype.getEnum = function (name) {
        return _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_4__["GameID"][name];
    };
    HeaderComponent.prototype.signOut = function () {
        this.user.setUserName("");
        document.cookie = "PuzzleHubToken=; Max-Age=0";
    };
    HeaderComponent.prototype.getLevel = function () {
        return _services_user_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"].calculateLevel();
    };
    HeaderComponent.prototype.xpToNextLevel = function () {
        return _services_user_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"].xpToNextLevel();
    };
    HeaderComponent.prototype.nextLevelThreshold = function () {
        return _services_user_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"].nextLevelThreshold();
    };
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.isElectron = function () {
        // Renderer process
        if (typeof window !== 'undefined' && typeof window['process'] === 'object' && window['process'].type === 'renderer') {
            return true;
        }
        // Main process
        if (typeof window['process'] !== 'undefined' && typeof window['process'].versions === 'object' && !!window['process'].versions.electron) {
            return true;
        }
        // Detect the user agent when the `nodeIntegration` option is set to true
        if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
            return true;
        }
        return false;
    };
    HeaderComponent.prototype.close = function () {
        window.close();
    };
    HeaderComponent.prototype.maximize = function () {
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [_services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_1__["TunnelService"],
            _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_3__["LoaderService"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/leaderboards/leaderboards.component.html":
/*!**********************************************************!*\
  !*** ./src/app/leaderboards/leaderboards.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

<<<<<<< HEAD
module.exports = "<div class=\"container-stretch\">\n  <div id=\"navController\" class=\"col-1 container-flex-row game-selector\">\n    <ng-container *ngFor=\"let game of games\">\n      <div class=\"col-12\">\n        <a (click)=\"setGame(game.id)\" \n           [ngClass]=\"gameID == game.id ? 'navActive' : 'navInactive'\" \n           class=\"navItem nav-item nav-link\"><img class=\"clickable\" src=\"{{game.image}}\"></a>\n      </div>\n    </ng-container>\n  </div>\n  <div class=\"col-11 container-stretch\">\n    <div class=\"col-12 container-flex-row leaderboard-header\">\n      <div class=\"col-4\">\n        <mat-button-toggle-group>\n          <mat-button-toggle\n           [checked]=\"leaderboard == 0\"\n           (click)=\"changeLeaderboard(0)\">\n            Daily\n          </mat-button-toggle>\n          <mat-button-toggle\n           [checked]=\"leaderboard == 1\"\n           (click)=\"changeLeaderboard(1)\">\n            Weekly\n          </mat-button-toggle>\n          <mat-button-toggle\n           [checked]=\"leaderboard == 2\"\n           (click)=\"changeLeaderboard(2)\">\n            Monthly\n          </mat-button-toggle>\n        </mat-button-toggle-group>\n      </div>\n\n      <div class=\"game-title col-4\">\n        <h2 class=\"gameName\">{{getGameName(gameID)}}</h2>\n      </div>\n\n      <div class=\"countdown col-4\">\n        <h2 class=\"timerTitle monospace\">RESET IN:&nbsp;</h2>\n        <h2 id=\"leaderboardstimer\" class=\"timer monospace\">000:00:00</h2>\n      </div>\n    </div><!-- leaderboard-header -->\n\n    <div id=\"page\" class=\"col-12 leaderboard-tables\">\n      <div class=\"container-flex-row\">\n        <ng-container *ngFor=\"let diff of getGameDiffs(gameID);let i=index\">\n          <div\n           class=\"card  leaderboard-card\"\n           [ngClass]=\"i==0 ? 'easy' : i==1 ? 'medium' : i==2 ? 'hard' : 'extreme'\">\n            <h3>{{diff.name | titlecase}}</h3>\n            <div class=\"leaderboard-table\">\n              <table>\n                <thead>\n                  <tr>\n                    <th>#</th>\n                    <th>Name</th>\n                    <th></th>\n                    <th>Time</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <ng-container *ngFor=\"let entry of leaderboards[i + 1];let k=index\">\n                    <tr [ngClass]=\"username == entry.username ? 'you' : ''\">\n                      <td class=\"pos firstcol\">\n                        {{k + 1}}\n                      </td>\n                      <td class=\"name secondcol\" (click)=\"viewProfile(entry.username)\">\n                        {{entry.username}}\n                      </td>\n\n                      <td class=\"medals thirdcol\">\n                        <div \n                          class=\"medalRow\"\n                          attr.data-tooltip=\"{{leaderboardName}} Gold Medal\"\n                          data-tooltip-position=\"top\">\n                          <ng-container *ngIf=\"hasMedals(entry)\">\n                            <img\n                          class=\"goldMedals medal\"\n                          src=\"/assets/images/medals/{{leaderboardName}}_Gold.svg\">\n                            <a class=\"monospace medalText\">\n                              {{entry.goldMedals}}\n                            </a>\n                          </ng-container>\n                        </div>\n\n                        <div \n                               class=\"medalRow\"\n                               attr.data-tooltip=\"{{leaderboardName}} Silver Medal\"\n                               data-tooltip-position=\"left\">\n                          <ng-container *ngIf=\"hasMedals(entry)\">\n                            <img\n                               class=\"goldMedals medal\"\n                               src=\"/assets/images/medals/{{leaderboardName}}_Silver.svg\">\n                            <a class=\"monospace medalText\">\n                              {{entry.silverMedals}}\n                            </a>\n                          </ng-container>\n                        </div>\n\n                        <div class=\"medalRow\"\n                             attr.data-tooltip=\"{{leaderboardName}} Bronze Medal\"\n                             data-tooltip-position=\"left\">\n                          <ng-container *ngIf=\"hasMedals(entry)\">\n                            <img\n                             class=\"goldMedals medal\"\n                             src=\"/assets/images/medals/{{leaderboardName}}_Bronze.svg\">\n                            <a class=\"monospace medalText\">\n                              {{entry.bronzeMedals}}\n                            </a>\n                          </ng-container>\n                        </div>\n                      </td>\n\n                      <td class=\"timeText monospace fourthcol\">\n                        {{entry.time}}\n                      </td>\n                    </tr>\n                  </ng-container>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </ng-container>\n      </div>\n    </div><!-- container-flex-row -->\n  </div>\n</div><!-- container-stretch -->\n"
=======
module.exports = "<div class=\"container-static-stretch container-scroll-y\">\n  <div class=\"container-static\">\n    <div class=\"container-flex-row leaderboard-header\">\n      <div class=\"game-title col-12\">\n        <h2 class=\"gameName\">{{getGameName(gameID)}}</h2>\n      </div>\n    </div><!-- leaderboard-header -->\n    <div class=\"container-flex-row\">\n      <div class=\"countdown col-12\">\n        <span class=\"timerTitle monospace\">RESET IN:&nbsp;</span>\n        <span id=\"leaderboardstimer\" class=\"timer monospace\">000:00:00</span>\n      </div>\n    </div>\n    <div class=\"container-flex-row\">\n      <div class=\"col-6\">\n        <mat-button-toggle-group>\n          <mat-button-toggle\n           [checked]=\"leaderboard == 0\"\n           (click)=\"changeLeaderboard(0)\">\n            Daily\n          </mat-button-toggle>\n          <mat-button-toggle\n           [checked]=\"leaderboard == 1\"\n           (click)=\"changeLeaderboard(1)\">\n            Weekly\n          </mat-button-toggle>\n          <mat-button-toggle\n           [checked]=\"leaderboard == 2\"\n           (click)=\"changeLeaderboard(2)\">\n            Monthly\n          </mat-button-toggle>\n        </mat-button-toggle-group>\n      </div>\n      <div class=\"col-6\" style=\"text-align: right\">\n        <mat-button-toggle-group>\n          <ng-container *ngFor=\"let game of games\">\n            <mat-button-toggle \n                         (click)=\"setGame(game.id)\" \n                         [checked]=\"gameID == game.id\"> \n              <mat-icon svgIcon=\"{{game.cleanName}}Icon\"></mat-icon>\n            </mat-button-toggle>\n          </ng-container>\n        </mat-button-toggle-group>\n      </div>\n    </div>\n    <div class=\"col-12 leaderboard-tables\">\n      <mat-tab-group\n         [selectedIndex]=\"leaderboardDifficulty\"\n         (selectedIndexChange)=\"setLeaderboardDifficulty($event)\">\n        <ng-container *ngFor=\"let diff of getGameDiffs(gameID);let i=index\">\n          <mat-tab label=\"{{diff.name | titlecase}}\">\n            <table mat-table [dataSource]=\"leaderboards[i + 1]\" matSort>\n              <ng-container matColumnDef=\"rowIndex\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header>#</th>\n                <td mat-cell *matCellDef=\"let k = index;\">{{k + 1}}</td>\n              </ng-container>\n              <ng-container matColumnDef=\"username\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>\n                <td\n                            mat-cell\n                            *matCellDef=\"let element\"\n                            (click)=\"viewProfile(element.username)\">\n                  {{element.username}}\n                </td>\n              </ng-container>\n\n              <ng-container matColumnDef=\"goldMedals\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header>Gold Medals</th>\n                <td mat-cell *matCellDef=\"let element\">\n                  <img\n                            class=\"goldMedals medal\"\n                            src=\"/assets/images/medals/{{leaderboardName}}_Gold.svg\">\n                  {{element.goldMedals}}\n                </td>\n              </ng-container>\n\n              <ng-container matColumnDef=\"silverMedals\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header>Silver Medals</th>\n                <td mat-cell *matCellDef=\"let element\">\n                  <img\n                            class=\"goldMedals medal\"\n                            src=\"/assets/images/medals/{{leaderboardName}}_Silver.svg\">\n                  {{element.silverMedals}}\n                </td>\n              </ng-container>\n\n              <ng-container matColumnDef=\"bronzeMedals\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header>Bronze Medals</th>\n                <td mat-cell *matCellDef=\"let element\">\n                  <img\n                            class=\"goldMedals medal\"\n                            src=\"/assets/images/medals/{{leaderboardName}}_Bronze.svg\">\n                  {{element.bronzeMedals}}\n                </td>\n              </ng-container>\n\n              <ng-container matColumnDef=\"time\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header>Time</th>\n                <td mat-cell *matCellDef=\"let element\">\n                  {{element.time}}\n                </td>\n              </ng-container>\n\n              <tr\n                            mat-header-row\n                            *matHeaderRowDef=\"leaderboardColumns; sticky: true\">\n              </tr>\n              <tr\n                            mat-row \n                            *matRowDef=\"let row; columns: leaderboardColumns; let k = index;\"\n                            [ngClass]=\"username == row.username ? 'you' : ''\">\n              </tr>\n            </table>\n            <mat-paginator\n              [pageSizeOptions]=\"pageSizeOptions\"\n              [pageSize]=\"pageSize\"\n              showFirstLastButtons>\n            </mat-paginator>\n          </mat-tab>\n        </ng-container>\n      </mat-tab-group>\n    </div>\n  </div><!-- container-stretch -->\n</div>\n"
>>>>>>> 89334736496b525b4ce4904b28ff7ae9cc2f50aa

/***/ }),

/***/ "./src/app/leaderboards/leaderboards.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/leaderboards/leaderboards.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

<<<<<<< HEAD
module.exports = ".card {\n  margin: 1.4rem;\n  padding: 2rem;\n  border-radius: 1.5rem;\n  background-color: #343a40; }\n  .card .mat-card-header {\n    margin: 0;\n    margin-left: -16px; }\n  .card .mat-card-title {\n    font-family: \"Poppins\", sans-serif;\n    font-size: 1.5rem; }\n  .card .mat-card-content {\n    font-size: 1rem; }\n  [data-tooltip] {\n  margin: 1.25rem;\n  position: relative; }\n  [data-tooltip]::before, [data-tooltip]::after {\n    position: absolute;\n    top: -0.5rem;\n    left: 50%;\n    opacity: 0; }\n  [data-tooltip]::before {\n    z-index: 100;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%);\n    border-width: 0.3rem 0.5rem 0 0.5rem;\n    border-style: solid;\n    border-color: rgba(0, 0, 0, 0.5) transparent transparent transparent;\n    content: \"\"; }\n  [data-tooltip]::after {\n    min-width: 5rem;\n    padding: 0.2rem 0.4rem;\n    -webkit-transform: translateX(-50%) translateY(-100%);\n            transform: translateX(-50%) translateY(-100%);\n    border-radius: 0.3rem;\n    color: white;\n    font-size: 0.9rem;\n    text-align: center;\n    background-color: rgba(0, 0, 0, 0.5);\n    pointer-events: none;\n    content: attr(data-tooltip); }\n  [data-tooltip]:hover::before, [data-tooltip]:hover::after, [data-tooltip]:focus::before, [data-tooltip]:focus::after {\n    opacity: 1;\n    transition: opacity 0.3s ease-in 0.0s; }\n  [data-tooltip-position='top']::before {\n  left: 50%; }\n  [data-tooltip-position='top']::after {\n  left: 50%; }\n  [data-tooltip-position='left']::before {\n  margin-left: -0.75rem;\n  top: 50%;\n  left: 0%;\n  -webkit-transform: translateY(-50%) rotate(-90deg);\n          transform: translateY(-50%) rotate(-90deg); }\n  [data-tooltip-position='left']::after {\n  margin-left: 0.5rem;\n  top: 50%;\n  left: 0%;\n  -webkit-transform: translateX(-100%) translateY(-50%);\n          transform: translateX(-100%) translateY(-50%); }\n  [data-tooltip-position='bottom']::before {\n  margin-top: 0.5rem;\n  top: 100%;\n  -webkit-transform: translateX(-50%) translateY(-100%) rotate(-180deg);\n          transform: translateX(-50%) translateY(-100%) rotate(-180deg); }\n  [data-tooltip-position='bottom']::after {\n  margin-top: 0.5rem;\n  top: 100%;\n  -webkit-transform: translateX(-50%) translateY(0%);\n          transform: translateX(-50%) translateY(0%); }\n  [data-tooltip-position='right']::before {\n  margin-left: 0.1rem;\n  top: 50%;\n  left: 100%;\n  -webkit-transform: translateY(-50%) rotate(90deg);\n          transform: translateY(-50%) rotate(90deg); }\n  [data-tooltip-position='right']::after {\n  margin-left: 0.5rem;\n  top: 50%;\n  left: 100%;\n  -webkit-transform: translateX(0%) translateY(-50%);\n          transform: translateX(0%) translateY(-50%); }\n  .leaderboard-header {\n  height: 4rem;\n  align-items: center;\n  justify-content: space-between;\n  text-align: center; }\n  .leaderboard-header h2 {\n    display: inline-block; }\n  .game-title {\n  font-family: \"Poppins\", sans-serif; }\n  .game-selector {\n  max-height: 100%;\n  padding: 0;\n  align-items: center;\n  align-content: center; }\n  .game-selector img {\n    max-width: 6rem; }\n  .leaderboard-tables {\n  height: 100%;\n  max-height: calc(100% - 4rem);\n  overflow-y: auto; }\n  .leaderboard-tables .container-flex-row {\n    justify-content: space-between; }\n  .leaderboard-tables tr {\n    padding: 5rem 0;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.15); }\n  .leaderboard-tables .medalRow {\n    height: 1.5rem; }\n  .leaderboard-tables [data-tooltip] {\n    margin: 0.1rem; }\n  .leaderboard-card {\n  width: 26rem;\n  max-width: 26rem;\n  height: 48rem;\n  max-height: 48rem;\n  padding: 0.5rem 0.25rem 1.5rem;\n  text-align: center; }\n  .leaderboard-card h3 {\n    font-weight: bold; }\n  .leaderboard-table {\n  height: 43rem;\n  max-height: 48rem;\n  overflow-y: auto;\n  background: #343a40; }\n  .leaderboard-table table {\n    width: 100%;\n    padding: 0.25rem; }\n  .easy {\n  background-color: #1e7e34; }\n  .medium {\n  background-color: #007bff; }\n  .hard {\n  background-color: #f28c32; }\n  .extreme {\n  background-color: #dc3545; }\n  .you {\n  background-color: rgba(255, 255, 255, 0.2); }\n  .medals {\n  font-size: 0.75rem;\n  text-align: left; }\n  .medal {\n  width: 0.95rem;\n  height: 0.95rem;\n  margin: 0.3rem 0; }\n"
=======
module.exports = ".card {\n  margin: 1.4rem;\n  padding: 2rem;\n  border-radius: 1.5rem;\n  background-color: #343a40; }\n  .card .mat-card-header {\n    margin: 0;\n    margin-left: -16px; }\n  .card .mat-card-title {\n    font-family: \"Poppins\", sans-serif;\n    font-size: 1.5rem; }\n  .card .mat-card-content {\n    font-size: 1rem; }\n  [data-tooltip] {\n  margin: 1.25rem;\n  position: relative; }\n  [data-tooltip]::before, [data-tooltip]::after {\n    position: absolute;\n    top: -0.5rem;\n    left: 50%;\n    opacity: 0; }\n  [data-tooltip]::before {\n    z-index: 100;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%);\n    border-width: 0.3rem 0.5rem 0 0.5rem;\n    border-style: solid;\n    border-color: rgba(0, 0, 0, 0.5) transparent transparent transparent;\n    content: \"\"; }\n  [data-tooltip]::after {\n    min-width: 5rem;\n    padding: 0.2rem 0.4rem;\n    -webkit-transform: translateX(-50%) translateY(-100%);\n            transform: translateX(-50%) translateY(-100%);\n    border-radius: 0.3rem;\n    color: white;\n    font-size: 0.9rem;\n    text-align: center;\n    background-color: rgba(0, 0, 0, 0.5);\n    pointer-events: none;\n    content: attr(data-tooltip); }\n  [data-tooltip]:hover::before, [data-tooltip]:hover::after, [data-tooltip]:focus::before, [data-tooltip]:focus::after {\n    opacity: 1;\n    transition: opacity 0.3s ease-in 0.0s; }\n  [data-tooltip-position='top']::before {\n  left: 50%; }\n  [data-tooltip-position='top']::after {\n  left: 50%; }\n  [data-tooltip-position='left']::before {\n  margin-left: -0.75rem;\n  top: 50%;\n  left: 0%;\n  -webkit-transform: translateY(-50%) rotate(-90deg);\n          transform: translateY(-50%) rotate(-90deg); }\n  [data-tooltip-position='left']::after {\n  margin-left: 0.5rem;\n  top: 50%;\n  left: 0%;\n  -webkit-transform: translateX(-100%) translateY(-50%);\n          transform: translateX(-100%) translateY(-50%); }\n  [data-tooltip-position='bottom']::before {\n  margin-top: 0.5rem;\n  top: 100%;\n  -webkit-transform: translateX(-50%) translateY(-100%) rotate(-180deg);\n          transform: translateX(-50%) translateY(-100%) rotate(-180deg); }\n  [data-tooltip-position='bottom']::after {\n  margin-top: 0.5rem;\n  top: 100%;\n  -webkit-transform: translateX(-50%) translateY(0%);\n          transform: translateX(-50%) translateY(0%); }\n  [data-tooltip-position='right']::before {\n  margin-left: 0.1rem;\n  top: 50%;\n  left: 100%;\n  -webkit-transform: translateY(-50%) rotate(90deg);\n          transform: translateY(-50%) rotate(90deg); }\n  [data-tooltip-position='right']::after {\n  margin-left: 0.5rem;\n  top: 50%;\n  left: 100%;\n  -webkit-transform: translateX(0%) translateY(-50%);\n          transform: translateX(0%) translateY(-50%); }\n  .leaderboard-header {\n  height: 4rem;\n  align-items: center;\n  justify-content: space-between;\n  text-align: center; }\n  .leaderboard-header h2 {\n    display: inline-block; }\n  .game-title {\n  font-family: \"Poppins\", sans-serif; }\n  .game-selector {\n  max-height: 100%;\n  padding: 0;\n  align-items: center;\n  align-content: center; }\n  .game-selector img {\n    max-width: 6rem; }\n  .leaderboard-tables table {\n  width: 100%; }\n  .leaderboard-card {\n  width: 26rem;\n  max-width: 26rem;\n  height: 48rem;\n  max-height: 48rem;\n  padding: 0.5rem 0.25rem 1.5rem;\n  text-align: center; }\n  .leaderboard-card h3 {\n    font-weight: bold; }\n  .leaderboard-table {\n  height: 43rem;\n  max-height: 48rem;\n  overflow-y: auto;\n  background: #343a40; }\n  .leaderboard-table table {\n    width: 100%;\n    padding: 0.25rem; }\n  .easy {\n  background-color: #1e7e34; }\n  .medium {\n  background-color: #007bff; }\n  .hard {\n  background-color: #f28c32; }\n  .extreme {\n  background-color: #dc3545; }\n  .you {\n  background-color: rgba(255, 255, 255, 0.2); }\n  .medals {\n  font-size: 0.75rem;\n  text-align: left; }\n  .medal {\n  width: 0.95rem;\n  height: 0.95rem;\n  margin: 0.3rem 0; }\n"
>>>>>>> 89334736496b525b4ce4904b28ff7ae9cc2f50aa

/***/ }),

/***/ "./src/app/leaderboards/leaderboards.component.ts":
/*!********************************************************!*\
  !*** ./src/app/leaderboards/leaderboards.component.ts ***!
  \********************************************************/
/*! exports provided: LeaderboardsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeaderboardsComponent", function() { return LeaderboardsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
/* harmony import */ var _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enums/game-id.enum */ "./src/app/enums/game-id.enum.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/loading-service/loader.service */ "./src/app/services/loading-service/loader.service.ts");
/* harmony import */ var _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/persistence/settings.service */ "./src/app/services/persistence/settings.service.ts");
/* harmony import */ var _services_games_game_list_all_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/games/game-list-all.service */ "./src/app/services/games/game-list-all.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LeaderboardsComponent = /** @class */ (function () {
    function LeaderboardsComponent(route, loader, router, tunnel, user) {
        this.route = route;
        this.loader = loader;
        this.router = router;
        this.tunnel = tunnel;
        this.user = user;
        this.games = _services_games_game_list_all_service__WEBPACK_IMPORTED_MODULE_7__["GameListAllService"].games;
        this.leaderboard = 0;
        this.leaderboardName = "Daily";
        this.leaderboardDifficulty = 0;
        this.leaderboardColumns = [
            'rowIndex',
            'username',
            'goldMedals',
            'silverMedals',
            'bronzeMedals',
            'time'
        ];
        this.pageSize = 25;
        this.pageSizeOptions = [5, 10, 25, 100];
        this.username = "";
    }
    LeaderboardsComponent.prototype.getGameName = function (id) {
        for (var _i = 0, _a = this.games; _i < _a.length; _i++) {
            var game = _a[_i];
            if (game.id == id) {
                return game.name;
            }
        }
        return '';
    };
    LeaderboardsComponent.prototype.getGameDiffs = function (id) {
        for (var _i = 0, _a = this.games; _i < _a.length; _i++) {
            var game = _a[_i];
            if (game.id == id) {
                return game.diffs;
            }
        }
        return '';
    };
    LeaderboardsComponent.prototype.ngOnInit = function () {
        var _this_1 = this;
        this.username = this.user.user;
        this.user.username
            .subscribe(function (data) {
            _this_1.username = data;
        });
        this.gameID = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_6__["SettingsService"].getDataNum('selectedGameID');
        this.leaderboard = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_6__["SettingsService"].getDataNum('selectedLeaderboard');
        this.leaderboardDifficulty = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_6__["SettingsService"].getDataNum('selectedLeaderboardDifficulty');
        this.countDownTimer();
        if (this.leaderboard == 0) {
            this.leaderboardName = 'Daily';
        }
        else if (this.leaderboard == 1) {
            this.leaderboardName = 'Weekly';
        }
        else if (this.leaderboard == 2) {
            this.leaderboardName = 'Monthly';
        }
        this.loadScores();
    };
    LeaderboardsComponent.prototype.decrementTimer = function (that) {
        var display = document.getElementById("leaderboardstimer");
        var now = +new Date();
        var diff = ((that.resetDate - now));
        var hours = Math.trunc(diff / (60 * 60 * 1000));
        var minutes = Math.trunc(diff / (60 * 1000)) % 60;
        var seconds = Math.trunc(diff / (1000)) % 60;
        try {
            display.textContent =
                hours + ":" +
                    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
                    (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00");
            that.countDownTimer();
        }
        catch (_a) {
            // Do nothing - page probably re-routed
        }
    };
    LeaderboardsComponent.prototype.countDownTimer = function () {
        this.resetDate = new Date();
        if (this.leaderboard == 0) {
            this.resetDate.setDate(this.resetDate.getDate() + 1);
            this.resetDate.setUTCHours(5, 0, 0, 0);
            var date = +new Date();
            var diff = (this.resetDate - date);
            if (diff > 86400000) {
                this.resetDate.setDate(this.resetDate.getDate() - 1);
                this.resetDate.setUTCHours(5, 0, 0, 0);
            }
        }
        else if (this.leaderboard == 1) {
            var friday = this.resetDate.getDate() + (13 - this.resetDate.getDay()) % 7;
            if (this.resetDate.getDay() == 6) {
                friday = friday + 7;
            }
            this.resetDate.setHours(0, 0, 0, 0);
            this.resetDate.setUTCHours(5, 0, 0, 0);
            this.resetDate.setDate(friday);
        }
        else if (this.leaderboard == 2) {
            var newMonth = this.resetDate.getMonth() + 1;
            this.resetDate.setDate(1);
            this.resetDate.setMonth(newMonth);
            this.resetDate.setUTCHours(5, 0, 0, 0);
            this.resetDate.setDate(1);
        }
        var _this = this;
        setTimeout(function () {
            _this.decrementTimer(_this);
        }, 50);
    };
    LeaderboardsComponent.prototype.changeLeaderboard = function (num) {
        this.leaderboard = num;
        _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_6__["SettingsService"].storeData('selectedLeaderboard', num);
        if (num == 0) {
            this.leaderboardName = 'Daily';
        }
        else if (num == 1) {
            this.leaderboardName = 'Weekly';
        }
        else if (num == 2) {
            this.leaderboardName = 'Monthly';
        }
        this.loadScores();
    };
    LeaderboardsComponent.prototype.setLeaderboardDifficulty = function (n) {
        this.leaderboardDifficulty = n;
        _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_6__["SettingsService"].storeData('selectedLeaderboardDifficulty', n);
    };
    LeaderboardsComponent.prototype.loadScores = function () {
        var _this_1 = this;
        this.loader.startLoadingAnimation();
        this.leaderboards = [];
        var _loop_1 = function () {
            var m = {
                "GameID": this_1.gameID,
                "Difficulty": i,
                "Leaderboard": this_1.leaderboard
            };
            this_1.tunnel.getLeaderboards(m)
                .subscribe(function (data) {
                console.log(data);
                var that = _this_1;
                setTimeout(function () {
                    that.loader.stopLoadingAnimation();
                    that.leaderboards[m['Difficulty']] = new _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatTableDataSource"](data);
                    that.leaderboards[m['Difficulty']].paginator = that.paginator;
                    that.leaderboards[m['Difficulty']].sort = that.sort;
                }, 500);
            });
        };
        var this_1 = this;
        for (var i = 1; i <= 4; i++) {
            _loop_1();
        }
    };
    LeaderboardsComponent.prototype.hasMedals = function (user) {
        return user.bronzeMedals > 0 || user.silverMedals > 0 || user.goldMedals > 0;
    };
    LeaderboardsComponent.prototype.setGame = function (id) {
        this.gameID = id;
        _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_6__["SettingsService"].storeData('selectedGameID', id);
        this.loadScores();
    };
    LeaderboardsComponent.prototype.viewProfile = function (name) {
        var m = {
            user: name
        };
        this.router.navigate(['profile'], { queryParams: m });
    };
    LeaderboardsComponent.prototype.getEnum = function (name) {
        return _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_3__["GameID"][name];
    };
    LeaderboardsComponent.prototype.logLeaderboards = function () {
        console.log(this.leaderboards);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_8__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatPaginator"])
    ], LeaderboardsComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSort"])
    ], LeaderboardsComponent.prototype, "sort", void 0);
    LeaderboardsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-leaderboards',
            template: __webpack_require__(/*! ./leaderboards.component.html */ "./src/app/leaderboards/leaderboards.component.html"),
            styles: [__webpack_require__(/*! ./leaderboards.component.scss */ "./src/app/leaderboards/leaderboards.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_5__["LoaderService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_2__["TunnelService"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]])
    ], LeaderboardsComponent);
    return LeaderboardsComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card login-card\">\n  <mat-tab-group>\n    <mat-tab label=\"Sign In\">\n          <form name=\"loginform\" id=\"loginform\" action=\"#\" method=\"get\">\n            <mat-form-field>\n              <input matInput \n              type=\"text\" \n              name=\"log\" \n              id=\"username\" \n              value=\"\" \n              size=\"20\" \n              placeholder=\"Username\" \n              [(ngModel)]=\"username\">\n            </mat-form-field>\n            <mat-form-field>\n              <input matInput\n              type=\"password\"\n              name=\"pwd\"\n              id=\"password\"\n              value=\"\"\n              size=\"20\"\n              placeholder=\"Password\"\n              [(ngModel)]=\"password\">\n            </mat-form-field>\n            <section>\n              <mat-checkbox labelPosition=\"before\">Remember Me</mat-checkbox>\n            </section>\n            <button mat-raised-button name=\"wp-submit\" id=\"wp-submit\" (click)=\"login()\">\n              Sign In\n            </button>\n          </form>\n    </mat-tab>\n    <mat-tab label=\"Register\">\n          <form name=\"registrationform\" id=\"registrationform\" action=\"#\" method=\"get\">\n            <mat-form-field>\n              <input matInput\n              type=\"text\"\n              name=\"user\"\n              id=\"user_login\"\n              [(ngModel)]=\"registerUsername\"\n              (ngModelChange)=\"canRegister()\"\n              value=\"\"\n              size=\"20\"\n              placeholder=\"Username\">\n            </mat-form-field>\n            <mat-form-field>\n              <input matInput\n              type=\"text\"\n              name=\"email\"\n              id=\"user_email\"\n              [(ngModel)]=\"email1\"\n              (ngModelChange)=\"canRegister()\"\n              value=\"\"\n              size=\"20\"\n              placeholder=\"Email\">\n            </mat-form-field>\n            <mat-form-field>\n              <input matInput\n              type=\"text\"\n              name=\"email\"\n              id=\"user_email_2\"\n              [(ngModel)]=\"email2\"\n              (ngModelChange)=\"canRegister()\"\n              value=\"\" size=\"20\"\n              placeholder=\"Confirm Email\">\n            </mat-form-field>\n            <mat-form-field>\n              <input matInput\n              type=\"password\"\n              name=\"pass\"\n              id=\"user_pass\"\n              [(ngModel)]=\"registerPass1\"\n              (ngModelChange)=\"canRegister()\"\n              value=\"\"\n              size=\"20\"\n              placeholder=\"Password\">\n            </mat-form-field>\n            <mat-form-field>\n              <input matInput\n              type=\"password\"\n              name=\"pass\"\n              id=\"user_pass_2\"\n              [(ngModel)]=\"registerPass2\"\n              (ngModelChange)=\"canRegister()\"\n              value=\"\"\n              size=\"20\"\n              placeholder=\"Confirm Password\">\n            </mat-form-field>\n            <ng-container *ngIf=\"errorMessage != ''\">\n              <p style=\"color:red\">* {{errorMessage}}</p>\n            </ng-container>\n            <button mat-raised-button \n              name=\"register-submit\" \n              [disabled]=\"errorMessage != ''\" \n              (click)=\"register()\"\n              id=\"register-submit\">\n              Register\n            </button>\n          </form>\n    </mat-tab>\n  </mat-tab-group>\n</div>\n\n<!--<ng-container *ngIf=\"selectedTab=='forgot'\">\n  <div id=\"profile-forgot\" class=\"booked-tab-content fade tab-pane\" role=\"tabpanel\" aria-labelledby=\"profile-forgot-tab\">\n  <div class=\"booked-form-wrap bookedClearFix\">\n  <form method=\"get\" action=\"#\" class=\"wp-user-form\">\n  <div class=\"form-group\">\n  <input type=\"text\" name=\"user_login_forgot\" class=\"form-control\" value=\"\" size=\"20\" id=\"user_login_forgot\" tabindex=\"1001\" placeholder=\"What is your email address?\">\n  </div>\n  <input type=\"submit\" name=\"user-submit\" value=\"Reset my password\" class=\"user-submit btn btn-lg btn-primary\" tabindex=\"1002\">\n  </form>\n  </div>\n  </div>\n  </ng-container>-->\n"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\n  margin: 1.4rem;\n  padding: 2rem;\n  border-radius: 1.5rem;\n  background-color: #343a40; }\n  .card .mat-card-header {\n    margin: 0;\n    margin-left: -16px; }\n  .card .mat-card-title {\n    font-family: \"Poppins\", sans-serif;\n    font-size: 1.5rem; }\n  .card .mat-card-content {\n    font-size: 1rem; }\n  .login-card {\n  color: rgba(255, 255, 255, 0.7);\n  width: 40rem;\n  margin-left: auto;\n  margin-right: auto; }\n  .login-card .mat-form-field {\n    width: 100%; }\n  .login-card section {\n    color: rgba(255, 255, 255, 0.7); }\n  .login-card button {\n    margin-top: 0.5rem;\n    background-color: #007bff;\n    font-size: 0.9rem;\n    font-family: \"Open Sans\", sans-serif;\n    color: white; }\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/loading-service/loader.service */ "./src/app/services/loading-service/loader.service.ts");
/* harmony import */ var _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(loader, tunnel, router, user) {
        this.loader = loader;
        this.tunnel = tunnel;
        this.router = router;
        this.user = user;
        this.registerUsername = "";
        this.registerPass1 = "";
        this.registerPass2 = "";
        this.email1 = "";
        this.email2 = "";
        this.errorMessage = "Please enter a username";
        this.selectedTab = "login";
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.canRegister = function () {
        if (this.registerUsername == "") {
            this.errorMessage = "Please enter a username";
            return false;
        }
        if (this.registerUsername.length > 16) {
            this.errorMessage = "Username length must be no greater than 16 characters";
            return false;
        }
        var emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailTest.test(this.email1)) {
            this.errorMessage = "Please enter a valid email";
            return false;
        }
        if (this.email1 != this.email2) {
            this.errorMessage = "Emails must match";
            return false;
        }
        if (this.registerPass1.length < 8) {
            this.errorMessage = "Password length must be at least 8 characters";
            return false;
        }
        if (this.registerPass1.length > 64) {
            this.errorMessage = "Password length must be no longer than 64 characters";
            return false;
        }
        var repeatTest = /^(.)\1\1\1\1\1/;
        if (repeatTest.test(this.registerPass1)) {
            this.errorMessage = "Password cannot contain repeating characters";
            return false;
        }
        if (this.registerPass1 != this.registerPass2) {
            this.errorMessage = "Passwords must match";
            return false;
        }
        this.errorMessage = "";
        return true;
    };
    LoginComponent.prototype.register = function () {
        var _this = this;
        this.loader.startLoadingAnimation();
        var m = {
            Username: this.registerUsername,
            Password: this.registerPass1,
            Email: this.email1
        };
        this.tunnel.registerUser(m)
            .subscribe(function (data) {
            if (data['success']) {
                _this.loader.stopLoadingAnimation();
                _this.router.navigate(['EmailSuccess']);
            }
            else {
                _this.loader.stopLoadingAnimation();
                _this.errorMessage = data['message'];
            }
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loader.startLoadingAnimation();
        var m = {
            Username: this.username,
            Password: this.password
        };
        this.tunnel.login(m)
            .subscribe(function (data) {
            if (data['Accept']) {
                document.cookie = 'PuzzleHubToken=' + data['Token'] + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
                _this.tunnel.getUsername()
                    .subscribe(function (name) {
                    _this.user.setUserName(name['username']);
                    _this.loader.stopLoadingAnimation();
                    _this.router.navigate(['/']);
                });
            }
            else {
                _this.loader.stopLoadingAnimation();
            }
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_1__["LoaderService"],
            _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_2__["TunnelService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/main-menu/main-menu.component.html":
/*!****************************************************!*\
  !*** ./src/app/main-menu/main-menu.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n  <div class=\"flex-container\">\n    <ng-container *ngFor=\"let game of games\">\n        <mat-card class=\"puzzle-card\">\n          <img mat-card-image src={{game.image}} alt=\"{{game.name}} logo\" />\n          <mat-card-actions>\n            <ng-container *ngFor=\"let diff of game.diffs\">\n              <button mat-raised-button\n                 (click)=\"playGame(game.name, diff.diff)\" \n                 [disabled]=\"(isLoggedIn() && getLevel() < diff.minLevel) ||\n                 (!isLoggedIn() && diff.requiresLogin)\"\n                 [attr.data-tooltip]=\"(isLoggedIn() && getLevel() < diff.minLevel) ? 'Reach level ' +  \n                 diff.minLevel + ' to play ' + diff.name + ' difficulty' : ((! isLoggedIn() &&\n                 diff.requiresLogin) ? 'Log in to play harder difficulties' : \n                 null)\"\n                 [ngClass]=\"{'btn-diff-easy': diff.color=='green', \n                 'btn-diff-medium': diff.color=='cyan', \n                 'btn-diff-hard': diff.color=='blue', \n                 'btn-diff-extreme': diff.color=='red'}\">\n                {{diff.name}}\n              </button>\n            </ng-container>\n          </mat-card-actions>\n          <mat-card-header>\n            <mat-card-title>{{game.name}}</mat-card-title>\n          </mat-card-header>\n          <mat-card-content>\n            <p>{{game.desc}}</p>\n          </mat-card-content>\n        </mat-card>\n    </ng-container>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/main-menu/main-menu.component.scss":
/*!****************************************************!*\
  !*** ./src/app/main-menu/main-menu.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "button {\n  color: white;\n  text-align: center;\n  vertical-align: middle;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n  button:hover {\n    text-decoration: none; }\n  button:not(disabled) {\n    cursor: pointer; }\n  .btn-diff-easy {\n  color: white;\n  background-color: #1e7e34;\n  border-color: #1e7e34; }\n  .btn-diff-easy:hover {\n    color: white;\n    background-color: #175f27;\n    border-color: #145523; }\n  .btn-diff-easy:disabled, .btn-diff-easy.mat-raised-button:disabled {\n    color: #b3b2b2;\n    background-color: #010201;\n    border-color: black; }\n  .btn-diff-easy:not(:disabled):active {\n    color: white;\n    background-color: #145523;\n    border-color: #124b1f; }\n  .btn-diff-medium {\n  color: white;\n  background-color: #007bff;\n  border-color: #007bff; }\n  .btn-diff-medium:hover {\n    color: white;\n    background-color: #0069d9;\n    border-color: #0062cc; }\n  .btn-diff-medium:disabled, .btn-diff-medium.mat-raised-button:disabled {\n    color: #b3b2b2;\n    background-color: #003166;\n    border-color: #001226; }\n  .btn-diff-medium:not(:disabled):active {\n    color: white;\n    background-color: #0062cc;\n    border-color: #005cbf; }\n  .btn-diff-hard {\n  color: white;\n  background-color: #f28c32;\n  border-color: #f28c32; }\n  .btn-diff-hard:hover {\n    color: white;\n    background-color: #ef780f;\n    border-color: #e3720e; }\n  .btn-diff-hard:disabled, .btn-diff-hard.mat-raised-button:disabled {\n    color: #b3b2b2;\n    background-color: #834208;\n    border-color: #472404; }\n  .btn-diff-hard:not(:disabled):active {\n    color: white;\n    background-color: #e3720e;\n    border-color: #d76c0e; }\n  .btn-diff-extreme {\n  color: white;\n  background-color: #dc3545;\n  border-color: #dc3545; }\n  .btn-diff-extreme:hover {\n    color: white;\n    background-color: #c82333;\n    border-color: #bd2130; }\n  .btn-diff-extreme:disabled, .btn-diff-extreme.mat-raised-button:disabled {\n    color: #b3b2b2;\n    background-color: #66121a;\n    border-color: #30080c; }\n  .btn-diff-extreme:not(:disabled):active {\n    color: white;\n    background-color: #bd2130;\n    border-color: #b21f2d; }\n  [data-tooltip] {\n  margin: 1.25rem;\n  position: relative; }\n  [data-tooltip]::before, [data-tooltip]::after {\n    position: absolute;\n    top: -0.5rem;\n    left: 50%;\n    opacity: 0; }\n  [data-tooltip]::before {\n    z-index: 100;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%);\n    border-width: 0.3rem 0.5rem 0 0.5rem;\n    border-style: solid;\n    border-color: rgba(0, 0, 0, 0.5) transparent transparent transparent;\n    content: \"\"; }\n  [data-tooltip]::after {\n    min-width: 5rem;\n    padding: 0.2rem 0.4rem;\n    -webkit-transform: translateX(-50%) translateY(-100%);\n            transform: translateX(-50%) translateY(-100%);\n    border-radius: 0.3rem;\n    color: white;\n    font-size: 0.9rem;\n    text-align: center;\n    background-color: rgba(0, 0, 0, 0.5);\n    pointer-events: none;\n    content: attr(data-tooltip); }\n  [data-tooltip]:hover::before, [data-tooltip]:hover::after, [data-tooltip]:focus::before, [data-tooltip]:focus::after {\n    opacity: 1;\n    transition: opacity 0.3s ease-in 0.0s; }\n  [data-tooltip-position='top']::before {\n  left: 50%; }\n  [data-tooltip-position='top']::after {\n  left: 50%; }\n  [data-tooltip-position='left']::before {\n  margin-left: -0.75rem;\n  top: 50%;\n  left: 0%;\n  -webkit-transform: translateY(-50%) rotate(-90deg);\n          transform: translateY(-50%) rotate(-90deg); }\n  [data-tooltip-position='left']::after {\n  margin-left: 0.5rem;\n  top: 50%;\n  left: 0%;\n  -webkit-transform: translateX(-100%) translateY(-50%);\n          transform: translateX(-100%) translateY(-50%); }\n  [data-tooltip-position='bottom']::before {\n  margin-top: 0.5rem;\n  top: 100%;\n  -webkit-transform: translateX(-50%) translateY(-100%) rotate(-180deg);\n          transform: translateX(-50%) translateY(-100%) rotate(-180deg); }\n  [data-tooltip-position='bottom']::after {\n  margin-top: 0.5rem;\n  top: 100%;\n  -webkit-transform: translateX(-50%) translateY(0%);\n          transform: translateX(-50%) translateY(0%); }\n  [data-tooltip-position='right']::before {\n  margin-left: 0.1rem;\n  top: 50%;\n  left: 100%;\n  -webkit-transform: translateY(-50%) rotate(90deg);\n          transform: translateY(-50%) rotate(90deg); }\n  [data-tooltip-position='right']::after {\n  margin-left: 0.5rem;\n  top: 50%;\n  left: 100%;\n  -webkit-transform: translateX(0%) translateY(-50%);\n          transform: translateX(0%) translateY(-50%); }\n  .body {\n  height: calc(100vh - 3.5rem);\n  overflow-y: auto;\n  background-color: #2c2c2c; }\n  .flex-container {\n  display: flex;\n  flex-flow: row wrap;\n  align-items: stretch;\n  align-content: flex-start;\n  justify-content: space-around; }\n  .puzzle-card {\n  width: 28.75rem;\n  min-height: 36.875rem;\n  margin: 1.4rem;\n  padding: 2rem;\n  border-radius: 1.5rem;\n  background-color: #343a40; }\n  .puzzle-card img:first-of-type {\n    width: 100%;\n    height: 18.125rem;\n    max-height: 18.125rem;\n    margin: 0;\n    padding: 3.125rem 0; }\n  .puzzle-card .mat-card-header {\n    margin: 0;\n    margin-left: -16px; }\n  .puzzle-card .mat-card-title {\n    font-family: \"Poppins\", sans-serif;\n    font-size: 1.5rem; }\n  .puzzle-card .mat-card-content {\n    font-size: 1rem; }\n  .puzzle-card .mat-card-actions {\n    display: flex;\n    flex-row: row no-wrap;\n    justify-content: space-between; }\n  .puzzle-card .mat-card-actions button {\n      max-width: 22%;\n      flex: 1 0 auto;\n      flex-basis: 0;\n      margin: 0;\n      font-size: 0.9rem; }\n  .puzzle-card .mat-card-actions button:first-of-type {\n        margin-left: 0.5rem; }\n  .puzzle-card .mat-card-actions button:last-of-type {\n        margin-right: 0.5rem; }\n"

/***/ }),

/***/ "./src/app/main-menu/main-menu.component.ts":
/*!**************************************************!*\
  !*** ./src/app/main-menu/main-menu.component.ts ***!
  \**************************************************/
/*! exports provided: MainMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainMenuComponent", function() { return MainMenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_timer_timer_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/timer/timer.service */ "./src/app/services/timer/timer.service.ts");
/* harmony import */ var _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
/* harmony import */ var _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/loading-service/loader.service */ "./src/app/services/loading-service/loader.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_games_game_list_all_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/games/game-list-all.service */ "./src/app/services/games/game-list-all.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MainMenuComponent = /** @class */ (function () {
    function MainMenuComponent(timerService, tunnelService, router, user, loader) {
        this.timerService = timerService;
        this.tunnelService = tunnelService;
        this.router = router;
        this.user = user;
        this.loader = loader;
        this.games = _services_games_game_list_all_service__WEBPACK_IMPORTED_MODULE_6__["GameListAllService"].games;
    }
    MainMenuComponent.prototype.isLoggedIn = function () {
        return this.user.isLoggedIn();
    };
    MainMenuComponent.prototype.getLevel = function () {
        return _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"].calculateLevel();
    };
    MainMenuComponent.prototype.playGame = function (route, diff) {
        var m = {
            diff: diff
        };
        this.router.navigate([route, m]);
    };
    MainMenuComponent.prototype.ngOnInit = function () {
    };
    MainMenuComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-main-menu',
            template: __webpack_require__(/*! ./main-menu.component.html */ "./src/app/main-menu/main-menu.component.html"),
            styles: [__webpack_require__(/*! ./main-menu.component.scss */ "./src/app/main-menu/main-menu.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_timer_timer_service__WEBPACK_IMPORTED_MODULE_1__["TimerService"],
            _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_2__["TunnelService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_loading_service_loader_service__WEBPACK_IMPORTED_MODULE_3__["LoaderService"]])
    ], MainMenuComponent);
    return MainMenuComponent;
}());



/***/ }),

/***/ "./src/app/options/options.component.css":
/*!***********************************************!*\
  !*** ./src/app/options/options.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".buttonSubtext {\n    font-size: 11px;\n}\n\n#focusMe:focus {\n    display: none;\n}\n\n.hidden {\n    display: none;\n}\n\n.new-game {\n    color: white !important;\n    background: #4c4c4d;\n    padding-top: 10px;\n    padding-bottom: 10px;\n    border-radius: 10px;\n    cursor: pointer;\n    text-align: center;\n    margin-top: 10px;\n}\n\n.btn-group {\n    width: 100%;\n}\n\n.panel-body {\n    flex: 1;\n    overflow-x: hidden;\n    overflow-y: auto;\n}\n\n.panel-footer {\n    padding-top: 2em;\n}\n\n.game-button {\n    width: 100%;\n    margin-top: 0.5em;\n    padding: 0.25em;\n    color: white;\n    font-size: 1.25rem;\n    line-height: 1;\n}\n\n.difficulty-select {\n    padding: 0.25em 0;\n    font-weight: bold;\n}\n\n.notes {\n    font-family: 'Poppins', sans-serif;\n    display: block;\n    width: 180px;\n}\n"

/***/ }),

/***/ "./src/app/options/options.component.html":
/*!************************************************!*\
  !*** ./src/app/options/options.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"panel-body\">\n  <ng-container *ngIf=\"takingNotesMode\">\n    <div class=notes>\n      <a\n     (click)=\"onNotesChange()\"\n     [ngClass]=\"takingNotes ? 'btn-warning' : 'btn-danger'\"\n     class=\"center btn\"\n     > Taking Notes: {{takingNotes}}</a>\n    </div>\n  </ng-container>\n  <div class=\"descriptionBlock\" *ngIf=\"isLoggedIn()\">\n    <a class=\"descriptionHeader clickable\"\n       (click)=\"highscoresMinimized = !highscoresMinimized; minimize('highscoresMinimized', highscoresMinimized)\">\n      <ng-container *ngIf=\"highscoresMinimized\">\n        [+]\n      </ng-container>\n      <ng-container *ngIf=\"!highscoresMinimized\">\n        [-]\n      </ng-container>\n      <b class=\"clickable\">\n        HIGH SCORES\n      </b>\n    </a>\n\n    <ng-container *ngIf=\"!highscoresMinimized\">\n      <a class=\"descriptionText topPad\">Monthly</a>\n      <a class=\"monospace timeSave\">{{personalBestMonthly}}</a>\n\n      <a class=\"descriptionText topPad\">Weekly</a>\n      <a class=\"monospace timeSave\">{{personalBestWeekly}}</a>\n\n      <a class=\"descriptionText topPad\">Daily</a>\n      <a class=\"monospace timeSave\">{{personalBestDaily}}</a>\n    </ng-container>\n  </div>\n\n  <div class=\"descriptionBlock\">\n    <a class=\"descriptionHeader clickable\"\n       (click)=\"timerMinimized = !timerMinimized; minimize('timerMinimized', timerMinimized)\">\n      <ng-container *ngIf=\"timerMinimized\">\n        [+]\n      </ng-container>\n      <ng-container *ngIf=\"!timerMinimized\">\n        [-]\n      </ng-container>\n      <b class=\"clickable\">\n        TIMER\n      </b>\n    </a>\n\n    <a id=\"timer\" \n       [ngClass]=\"timerMinimized ? 'hidden' : 'none'\"\n       class=\"monospace time\">0:00:00.000</a>\n  </div>\n\n  <div class=\"descriptionBlock\" *ngIf=\"controls != undefined\">\n    <a class=\"descriptionHeader clickable\"\n       (click)=\"controlsMinimized = !controlsMinimized; minimize('controlsMinimized', controlsMinimized)\">\n      <ng-container *ngIf=\"controlsMinimized\">\n        [+]\n      </ng-container>\n      <ng-container *ngIf=\"!controlsMinimized\">\n        [-]\n      </ng-container>\n      <b class=\"clickable\">\n        CONTROLS\n      </b>\n    </a>\n\n    <ng-container *ngIf=\"!controlsMinimized\">\n      <a class=\"descriptionText\">\n        {{controls}}\n      </a>\n    </ng-container>\n  </div>\n\n  <div class=\"descriptionBlock\" *ngIf=\"rules != undefined\">\n    <a class=\"descriptionHeader clickable\"\n       (click)=\"rulesMinimized = !rulesMinimized; minimize('rulesMinimized', rulesMinimized)\">\n      <ng-container *ngIf=\"rulesMinimized\">\n        [+]\n      </ng-container>\n      <ng-container *ngIf=\"!rulesMinimized\">\n        [-]\n      </ng-container>\n      <b class=\"clickable\">\n        RULES\n      </b>\n    </a>\n    <ng-container *ngIf=\"!rulesMinimized\">\n      <a class=\"descriptionText\">\n        {{rules}}\n      </a>\n    </ng-container>\n  </div>\n\n  <div class=\"descriptionBlock\" *ngIf=\"options != undefined\">\n    <a class=\"descriptionHeader clickable\"\n       (click)=\"optionsMinimized = !optionsMinimized; minimize('optionsMinimized', optionsMinimized)\">\n      <ng-container *ngIf=\"optionsMinimized\">\n        [+]\n      </ng-container>\n      <ng-container *ngIf=\"!optionsMinimized\">\n        [-]\n      </ng-container>\n      <b class=\"clickable\">\n        OPTIONS\n      </b>\n    </a>\n\n    <ng-container *ngIf=\"!optionsMinimized\">\n      <ng-container *ngFor=\"let option of options; let i=index\">\n        <ng-container *ngIf=\"option.type == 'checkbox'\">\n          <div class=\"custom-control custom-checkbox\">\n            <input type=\"checkbox\" id=\"{{option.bindTo}}\" class=\"custom-control-input clickable\" \n                                                          [(ngModel)]=\"optionVals[i]\" \n                                                          (click)=\"callback(option.callback)\">\n            <label class=\"clickable descriptionText custom-control-label\" for=\"{{option.bindTo}}\">{{option.name}}</label>\n          </div>\n        </ng-container>\n\n        <ng-container *ngIf=\"option.type == 'dropdown'\">\n          <div class=\"custom-control custom-dropdown\">\n            <label style=\"margin-bottom:0\" class=\"descriptionText\" for=\"{{option.bindTo}}\">\n              {{option.name}}\n            </label>\n            <select id=\"{{option.bindTo}}\"\n                    [(ngModel)]=\"optionVals[i]\" \n                    (ngModelChange)=\"updateAndCallback(option.callback, option.storedName, $event)\">\n              <ng-container *ngFor=\"let o of option.options\">\n                <option>{{o}}</option>\n              </ng-container>\n            </select>\n          </div>\n        </ng-container>\n      </ng-container>\n    </ng-container>\n  </div>\n\n  <div class=\"descriptionBlock\" *ngIf=\"hotkeys != undefined\">\n    <a class=\"descriptionHeader clickable\"\n       (click)=\"hotkeysMinimized = !hotkeysMinimized; minimize('hotkeysMinimized', hotkeysMinimized)\">\n      <ng-container *ngIf=\"hotkeysMinimized\">\n        [+]\n      </ng-container>\n      <ng-container *ngIf=\"!hotkeysMinimized\">\n        [-]\n      </ng-container>\n      <b class=\"clickable\">\n        HOTKEYS\n      </b>\n    </a>\n    <ng-container *ngIf=\"!hotkeysMinimized\">\n      <ng-container *ngFor=\"let hotkey of hotkeys; let i=index\">\n        <div class=\"descriptionText\">\n          {{hotkey.name}} - \n          <button (click)=\"editHotkey(i)\">\n            <ng-container *ngIf=\"editIndex != i\">\n              {{convertCodeToStr(hotkeyVals[i])}} ({{hotkeyVals[i]}})\n            </ng-container>\n            <ng-container *ngIf=\"editIndex == i\">\n              Press...\n            </ng-container>\n          </button>\n        </div>\n      </ng-container>\n    </ng-container>\n  </div>\n</div>\n<div class=\"panel-footer\">\n  <mat-select class=\"difficulty-select clickable\" [(ngModel)]=\"selectedDifficulty\"\n    (ngModelChange)=\"difficultyChangeHandler($event)\">\n    <mat-option *ngFor=\"let diff of diffs\" [value]=\"diff.diff\">\n      {{diff.name | titlecase}}\n    </mat-option>\n  </mat-select>\n  <button\n        mat-raised-button\n        *ngIf=\"gameID != undefined\"\n        id=\"copyGameLink\"\n        class=\"game-button\"\n        (click)=\"copyGameLink()\">\n    <b class=\"clickable\">SHARE GAME</b>\n  </button>\n  <button\n        mat-raised-button\n        class=\"game-button\"\n        style=\"background-color: #f24b3e\"\n        (click)=\"callback('this.newGame()')\">\n    <b class=\"clickable\">NEW GAME</b>\n    <br>\n    <span class=\"buttonSubtext clickable\">spacebar</span>\n  </button>\n</div>\n<button id=\"focusMe\" style=\"background-color:#2c2c2c;border:none\"></button>\n"

/***/ }),

/***/ "./src/app/options/options.component.ts":
/*!**********************************************!*\
  !*** ./src/app/options/options.component.ts ***!
  \**********************************************/
/*! exports provided: OptionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsComponent", function() { return OptionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/persistence/settings.service */ "./src/app/services/persistence/settings.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_games_game_list_all_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/games/game-list-all.service */ "./src/app/services/games/game-list-all.service.ts");
/* harmony import */ var _services_games_options_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/games/options.service */ "./src/app/services/games/options.service.ts");
/* harmony import */ var rxjs_Subscription__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/Subscription */ "./node_modules/rxjs-compat/_esm5/Subscription.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var OptionsComponent = /** @class */ (function () {
    function OptionsComponent(user, router, optionsService, snackBar) {
        this.user = user;
        this.router = router;
        this.optionsService = optionsService;
        this.snackBar = snackBar;
        this.takingNotes = false;
        this.optionSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.notesEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.optionVals = [];
        this.hotkeyVals = [];
        this.subscription = new rxjs_Subscription__WEBPACK_IMPORTED_MODULE_6__["Subscription"]();
    }
    OptionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.options !== undefined) {
            for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                var option = _a[_i];
                if (option['type'] === 'checkbox') {
                    this.optionVals.push(_services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_1__["SettingsService"].getDataBool(option['storedName']));
                }
                else if (option['type'] === 'dropdown') {
                    this.optionVals.push(_services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_1__["SettingsService"].getDataStr(option['storedName']));
                }
            }
        }
        if (this.hotkeys !== undefined) {
            for (var _b = 0, _c = this.hotkeys; _b < _c.length; _b++) {
                var hotkey = _c[_b];
                this.hotkeyVals.push(_services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_1__["SettingsService"].getDataNum(hotkey['bindTo']));
            }
        }
        this.editingHotkey = false;
        this.editIndex = -1;
        this.highscoresMinimized = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_1__["SettingsService"].getDataBool('highscoresMinimized');
        this.rulesMinimized = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_1__["SettingsService"].getDataBool('rulesMinimized');
        this.optionsMinimized = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_1__["SettingsService"].getDataBool('optionsMinimized');
        this.controlsMinimized = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_1__["SettingsService"].getDataBool('controlsMinimized');
        this.timerMinimized = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_1__["SettingsService"].getDataBool('timerMinimized');
        this.hotkeysMinimized = _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_1__["SettingsService"].getDataBool('hotkeysMinimized');
        this.game = _services_games_game_list_all_service__WEBPACK_IMPORTED_MODULE_4__["GameListAllService"].getGameById(this.gameID);
        this.rules = this.game.rules;
        this.controls = this.game.controls;
        this.diffs = this.game.diffs.filter(function (d) { return (d.minLevel === 0 ||
            (_this.user.isLoggedIn && _this.getLevel() >= d.minLevel)) &&
            (!d.requiresLogin || _this.isLoggedIn()); });
        this.selectedDifficulty = this.difficulty;
    };
    OptionsComponent.prototype.minimize = function (name, val) {
        _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_1__["SettingsService"].storeData(name, val);
    };
    OptionsComponent.prototype.updateAndCallback = function (func, name, newVal) {
        _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_1__["SettingsService"].storeData(name, newVal);
        this.callback(func);
    };
    OptionsComponent.prototype.setCopyButtonText = function (text) {
        var button = document.getElementById('shareButtonText');
        button.textContent = text;
    };
    OptionsComponent.prototype.copyGameLink = function () {
        this.snackBar.open('Copied!', '', {
            duration: 1500,
        });
        this.copyMessage(this.generatePuzzleLink());
    };
    OptionsComponent.prototype.generatePuzzleLink = function () {
        var link = 'https://puzzle-hub.com/' +
            this.game.name + ';diff=' +
            this.difficulty + ';seed=' +
            this.seed;
        return link.replace(/ /g, '%20');
    };
    OptionsComponent.prototype.copyMessage = function (val) {
        var selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    };
    OptionsComponent.prototype.callback = function (func) {
        document.getElementById('focusMe').focus();
        this.optionSelected.emit(func);
    };
    OptionsComponent.prototype.editHotkey = function (index) {
        this.editIndex = index;
        this.editingHotkey = true;
    };
    OptionsComponent.prototype.convertCodeToStr = function (code) {
        return String.fromCharCode(code);
    };
    OptionsComponent.prototype.keyPressed = function (keyEvent) {
        if (this.editingHotkey) {
            _services_persistence_settings_service__WEBPACK_IMPORTED_MODULE_1__["SettingsService"].storeData((this.hotkeys[this.editIndex])['bindTo'], keyEvent.keyCode);
            this.hotkeyVals[this.editIndex] = keyEvent.keyCode;
            this.callback((this.hotkeys[this.editIndex])['callback']);
            this.editingHotkey = false;
            this.editIndex = -1;
        }
    };
    OptionsComponent.prototype.isLoggedIn = function () {
        return this.user.isLoggedIn();
    };
    OptionsComponent.prototype.getLevel = function () {
        return _services_user_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"].calculateLevel();
    };
    OptionsComponent.prototype.playGame = function (route, diff) {
        var m = {
            diff: diff
        };
        this.optionSelected.emit('this.newGame(' + diff + ')');
    };
    OptionsComponent.prototype.onNotesChange = function () {
        this.takingNotes = !this.takingNotes;
        this.notesEvent.emit(this.takingNotes);
    };
    OptionsComponent.prototype.difficultyChangeHandler = function (newDiff) {
        var m = {
            diff: newDiff
        };
        var route = this.game.name;
        this.router.navigate([route, m]);
        this.optionSelected.emit('this.newGame(' + newDiff + ')');
    };
    OptionsComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], OptionsComponent.prototype, "gameID", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], OptionsComponent.prototype, "seed", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], OptionsComponent.prototype, "difficulty", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], OptionsComponent.prototype, "hotkeys", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], OptionsComponent.prototype, "options", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], OptionsComponent.prototype, "takingNotesMode", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], OptionsComponent.prototype, "personalBestMonthly", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], OptionsComponent.prototype, "personalBestWeekly", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], OptionsComponent.prototype, "personalBestDaily", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], OptionsComponent.prototype, "optionSelected", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], OptionsComponent.prototype, "notesEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], OptionsComponent.prototype, "keyPressed", null);
    OptionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-options',
            template: __webpack_require__(/*! ./options.component.html */ "./src/app/options/options.component.html"),
            styles: [__webpack_require__(/*! ./options.component.css */ "./src/app/options/options.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_games_options_service__WEBPACK_IMPORTED_MODULE_5__["OptionsService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSnackBar"]])
    ], OptionsComponent);
    return OptionsComponent;
}());



/***/ }),

/***/ "./src/app/profile/profile.component.css":
/*!***********************************************!*\
  !*** ./src/app/profile/profile.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#medals {\n  background: #2C2C2C;\n  color: white;\n  position: absolute;\n  width:calc(100% - 400px);\n  height: calc(100% - 3.5rem - 80px);\n  top:calc(3.5rem + 80px);\n  left: 0px;\n  text-align: center;\n  font-size: 62px;\n  display: flex;\n}\n\n#username {\n  background: #202020;\n  color: white;\n  position: absolute;\n  width:calc(100% - 400px);\n  height: 80px;\n  top:3.5rem;\n  left: 0px;\n  text-align: center;\n  font-size: 50px;\n}\n\n#matchHistory {\n  background: #2C2C2C;\n  color: white;\n  position: absolute;\n  width:400px;\n  height:calc(100% - 3.5rem);\n  top:3.5rem;\n  right: 0px;\n  text-align: left;\n}\n\np {\n  background: #2C2C2C;\n  color: white;\n  font-size: 24px;\n  position: absolute;\n  width:50%;\n  height:300px;\n  top:5rem;\n  left:10%;\n  text-align: left;\n}\n\n.image {\n  float: right;\n  width: 100px;\n  height: 100px;\n  margin-right: 20px;\n  margin-top: 18px;\n}\n\n.data {\n  position: relative;\n  display: inline-block;\n  height: 50%;\n  margin-top: 20px;\n  margin-left: 20px;\n}\n\n.smalldata {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  margin-top: 3px;\n  font-size: 20px;\n  text-align: center;\n}\n\n.scrollable {\n  background: #2C2C2C;\n  color: white;\n  position: absolute;\n  width:400px;\n  height:calc(100% - 40px);\n  top:40px;\n  right: 0px;\n  text-align: left;\n  overflow-y: scroll;\n}\n\n.load {\n  background: #007baa;\n}\n\n.load:hover {\n  background: #006aaa;\n}\n\n.even {\n  background: #333333;\n}\n\n.odd {\n  background: #202020;\n}\n\n.entry {\n  position: relative;\n  width: 100%;\n  display: inline-block;\n  height: 140px;\n}\n\n.smallentry {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  height: 40px;\n  margin-bottom: -5px;\n}\n\n.row {\n  margin-left: 1px;\n}\n\n.title {\n  font-size: 24px;\n  margin-bottom: 0px;\n  line-height: 1;\n}\n\n.gamename {\n  font-size: 24px;\n}\n\n.easy, .medium, .hard, .extreme {\n  margin-right: 5px;\n}\n\n.easy {\n  color: #28a745 !important;\n}\n\n.medium {\n  color: #17a2b8 !important;\n}\n\n.hard {\n  color: #007bff !important;\n}\n\n.extreme {\n  color: #dc3545 !important;\n}\n\n.col {\n  display: inline-block;\n}\n\n.medalContainer {\n  height: 100%;\n  width:50%;\n  position: relative;\n  left: 25%;\n}\n\n.medalImage {\n  width: 15vh;\n  height: 15vh;\n  float:left;\n}\n\n.medalNumber {\n  float: right;\n  font-size: 28px;\n}\n\n.medals {\n  flex-direction: column;\n  display: flex;\n  position: relative;\n  top: 50px;\n  left: 0px;\n  width: 100%;\n  height: calc(100% - 100px);\n}\n\n.col1 {\n  background: #2c2c2c;\n}\n\n.col2 {\n  background: #4b4b4b;\n}\n\n.col3 {\n  background: #303030;\n}\n\n.colTitle {\n  font-size: 30px;\n}\n"

/***/ }),

/***/ "./src/app/profile/profile.component.html":
/*!************************************************!*\
  !*** ./src/app/profile/profile.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"profileData != undefined\">\n  <div id=\"username\">\n    {{username}} - Level {{getLevel(profileData.XP)}}\n  </div>\n\n  <div id=\"medals\">\n    <ng-container *ngFor=\"let medalType of medalTypes; let i = index\">\n      <div class=\"col\"\n          [ngClass]=\"'col' + (i + 1)\">\n        <div class=\"colTitle\">\n          {{medalType}} Medals\n        </div>\n        <div class=\"medals\">\n          <ng-container *ngFor=\"let medalName of medalNames; let j = index\">\n            <div class=\"medalContainer\">\n              <img class=\"medalImage\" \n                   src=\"{{medalPath}}{{medalType}}_{{medalName}}.svg\">\n              <div class=\"medalNumber monospace\">\n                x{{profileData[medalType + medalName + 'Medals']}}\n              </div>\n            </div>\n          </ng-container>\n        </div>\n      </div>\n    </ng-container>\n  </div>\n\n  <div id=\"matchHistory\">\n    <a class=\"smallentry odd\">\n      <a class=\"smalldata\">\n        Match History\n      </a>\n    </a>\n    <a class=\"scrollable\">\n      <ng-container *ngFor=\"let game of profileData.MatchHistory;let i=index\">\n        <a class=\"entry\" [ngClass]=\"i % 2 == 0 ? 'even' : 'odd'\">\n          <a class=\"image\">\n            <img src=\"{{getGameImage(game.GameID)}}\">\n          </a>\n          <a class=\"data\">\n            <a class=\"title row\">\n                <a [ngClass]=\"game.Difficulty == 1 ? 'easy' \n                            : game.Difficulty == 2 ? 'medium' \n                            : game.Difficulty == 3 ? 'hard' \n                            : 'extreme'\">\n                  {{getDifficulty(game.Difficulty)}}  \n                </a>\n            </a>\n\n            <a class=\"row gamename\">\n              {{getGameName(game.GameID)}}\n            </a>\n\n            <a class=\"monospace row\">\n              {{game.TimeElapsed}}\n            </a>\n            <a class=\"row\">\n              {{convertDate(game.TimeCompleted) | date: 'MM/dd/yyyy hh:mm a'}}\n            </a>\n          </a>\n        </a>\n      </ng-container>\n      <a (click)=\"loadMore()\"\n        class=\"smallentry load clickable\">\n        <a class=\"smalldata clickable\">\n          Load More\n        </a>\n      </a>\n    </a>\n  </div>\n<ng-container>\n"

/***/ }),

/***/ "./src/app/profile/profile.component.ts":
/*!**********************************************!*\
  !*** ./src/app/profile/profile.component.ts ***!
  \**********************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
/* harmony import */ var _services_games_game_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/games/game-data.service */ "./src/app/services/games/game-data.service.ts");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/user/user.service */ "./src/app/services/user/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(route, tunnel) {
        this.route = route;
        this.tunnel = tunnel;
        this.games = _services_games_game_data_service__WEBPACK_IMPORTED_MODULE_3__["GameDataService"].games;
        this.medalTypes = [
            'Daily',
            'Weekly',
            'Monthly'
        ];
        this.medalNames = [
            'Gold',
            'Silver',
            'Bronze'
        ];
        this.medalPath = '/assets/images/medals/';
    }
    ProfileComponent.prototype.getLevel = function (xp) {
        return _services_user_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"].calculateLevelFromXp(xp);
    };
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.username = params['user'];
            var m = {
                'Username': _this.username
            };
            _this.tunnel.getProfileData(m)
                .subscribe(function (data) {
                _this.profileData = data;
            });
        });
    };
    ProfileComponent.prototype.convertDate = function (dateStr) {
        return new Date(dateStr + 'Z');
    };
    ProfileComponent.prototype.getGameName = function (id) {
        for (var i = 0; i < this.games.length; i++) {
            if ((this.games[i])['GameID'] == id) {
                return (this.games[i])['Name'];
            }
        }
    };
    ProfileComponent.prototype.loadMore = function () {
        var _this = this;
        var m = {
            "Username": this.username,
            "Offset": this.profileData.MatchHistory.length
        };
        this.tunnel.getMoreMatchHistory(m)
            .subscribe(function (data) {
            _this.profileData.MatchHistory = _this.profileData.MatchHistory.concat(data);
        });
    };
    ProfileComponent.prototype.getGameImage = function (id) {
        for (var i = 0; i < this.games.length; i++) {
            if ((this.games[i])['GameID'] == id) {
                return (this.games[i])['Image'];
            }
        }
    };
    ProfileComponent.prototype.getDifficulty = function (num) {
        switch (num) {
            case 1:
                return 'Easy';
            case 2:
                return 'Medium';
            case 3:
                return 'Hard';
            case 4:
                return 'Extreme';
        }
    };
    ProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(/*! ./profile.component.html */ "./src/app/profile/profile.component.html"),
            styles: [__webpack_require__(/*! ./profile.component.css */ "./src/app/profile/profile.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_2__["TunnelService"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/services/boards/hashi/board.service.ts":
/*!********************************************************!*\
  !*** ./src/app/services/boards/hashi/board.service.ts ***!
  \********************************************************/
/*! exports provided: BoardService, Board, Bridge, MyNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoardService", function() { return BoardService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Board", function() { return Board; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bridge", function() { return Bridge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyNode", function() { return MyNode; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BoardService = /** @class */ (function () {
    function BoardService() {
    }
    BoardService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], BoardService);
    return BoardService;
}());

var Board = /** @class */ (function () {
    function Board(width, height, numNodes, extreme, seed) {
        this.width = width;
        this.height = height;
        this.numNodes = numNodes;
        this.extreme = extreme;
        this.seed = seed;
        this.nodes = new Array();
    }
    Board.prototype.isSolved = function () {
        for (var _i = 0, _a = this.getNodes(); _i < _a.length; _i++) {
            var n = _a[_i];
            var total = 0;
            for (var _b = 0, _c = n.bridges; _b < _c.length; _b++) {
                var b = _c[_b];
                total += b.num;
            }
            if (total != n.val) {
                return false;
            }
        }
        return true;
    };
    Board.prototype.toString = function () {
        var m = [];
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var n = _a[_i];
            var nodeModel = {
                x: n.x,
                y: n.y,
                val: n.val
            };
            var bridges = [];
            for (var _b = 0, _c = n.bridges; _b < _c.length; _b++) {
                var b = _c[_b];
                var bridgeModel = {
                    n1x: b.n1.x,
                    n2x: b.n2.x,
                    n1y: b.n1.y,
                    n2y: b.n2.y,
                    num: b.num
                };
                bridges.push(bridgeModel);
            }
            nodeModel['bridges'] = bridges;
            m.push(nodeModel);
        }
        return JSON.stringify(m);
    };
    Board.prototype.generateBoard = function () {
        var min = 0;
        var max = 0;
        if (this.width == 10 && this.height == 10) {
            min = 18;
            max = 22;
        }
        else if (this.width == 15 && this.height == 15) {
            min = 28;
            max = 35;
        }
        else if (this.width == 25 && this.height == 25) {
            min = 80;
            max = 100;
        }
        this.tryGenerateBoard();
        if (min > 0) {
            while (this.nodes.length < min || this.nodes.length > max) {
                this.nodes = [];
                this.tryGenerateBoard();
            }
        }
    };
    Board.prototype.tryGenerateBoard = function () {
        var chance = 8;
        var nodesToAdd = this.numNodes;
        var difficulty = '';
        var difficultyDistance;
        var firstX = 1;
        var firstY = 1;
        if (!this.extreme) {
            firstX = this.randomInt(1, this.width);
            firstY = this.randomInt(1, this.height);
        }
        if (this.numNodes == Math.floor(Math.sqrt(this.width * this.height)) * 2) {
            difficulty = 'easy';
            difficultyDistance = 0;
        }
        var tempNodes = new Array();
        var occupiedSquares = new Array();
        var tempNode = new MyNode(firstX, firstY);
        tempNode.setVal(0);
        tempNodes.push(tempNode);
        var LagCount = 0;
        var toCountTo = 50000;
        nodesToAdd--;
        if (this.extreme) {
            toCountTo = 200000;
            nodesToAdd = 50000000;
        }
        while (nodesToAdd > 0) {
            LagCount++;
            if (LagCount > toCountTo) {
                nodesToAdd = 0;
            }
            var randomNode = tempNodes[this.randomInt(0, tempNodes.length - 1)];
            // Determine direction
            var diceRoll = this.randomInt(1, 4);
            //UP
            if (diceRoll === 1) {
                if (!randomNode.getUp()) {
                    if (randomNode.getY() - 1 > 2) {
                        var randomDistanceAway = 0;
                        if (this.extreme) {
                            if (randomNode.getY() - 1 > 3) {
                                randomDistanceAway = this.randomInt(2, 3);
                            }
                            else {
                                randomDistanceAway = this.randomInt(2, randomNode.getY() - 1);
                            }
                        }
                        else if (difficulty == 'easy') {
                            if (randomNode.getY() - 1 < difficultyDistance) {
                            }
                            else {
                                randomDistanceAway = this.randomInt(difficultyDistance, randomNode.getY() - 1);
                            }
                        }
                        else {
                            randomDistanceAway = this.randomInt(2, randomNode.getY() - 1);
                        }
                        var count;
                        var add = true;
                        for (count = randomNode.getY() - 1; count >= randomNode.getY() - randomDistanceAway; count--) {
                            for (var _i = 0, tempNodes_1 = tempNodes; _i < tempNodes_1.length; _i++) {
                                var n = tempNodes_1[_i];
                                if (n.getX() == randomNode.getX() && n.getY() == count) {
                                    if (count <= randomNode.getY() - 2 && add) {
                                        if (!n.getDown()) {
                                            var numBridges = 1;
                                            if (difficulty != 'easy') {
                                                if (this.randomInt(1, 2) == 2) {
                                                    numBridges = 2;
                                                }
                                            }
                                            else {
                                                if (this.randomInt(1, chance) == chance) {
                                                    numBridges = 1;
                                                }
                                                else {
                                                    numBridges = 2;
                                                }
                                            }
                                            randomNode.setVal(randomNode.getVal() + numBridges);
                                            n.setVal(n.getVal() + numBridges);
                                            randomNode.setUp(true);
                                            n.setDown(true);
                                            var tempCount;
                                            for (tempCount = randomNode.getY(); tempCount >= n.getY(); tempCount--) {
                                                occupiedSquares.push(new MyNode(randomNode.getX(), tempCount));
                                            }
                                            add = false;
                                        }
                                    }
                                    add = false;
                                }
                            }
                            for (var _a = 0, occupiedSquares_1 = occupiedSquares; _a < occupiedSquares_1.length; _a++) {
                                var n = occupiedSquares_1[_a];
                                if (n.getX() == randomNode.getX() && n.getY() == count) {
                                    add = false;
                                }
                            }
                        }
                        if (add) {
                            var numBridges = 1;
                            if (difficulty != 'easy') {
                                if (this.randomInt(1, 2) == 2) {
                                    numBridges = 2;
                                }
                            }
                            else {
                                if (this.randomInt(1, chance) == chance) {
                                    numBridges = 1;
                                }
                                else {
                                    numBridges = 2;
                                }
                            }
                            var tempNode_1 = new MyNode(randomNode.getX(), randomNode.getY() - randomDistanceAway);
                            for (var _b = 0, tempNodes_2 = tempNodes; _b < tempNodes_2.length; _b++) {
                                var n = tempNodes_2[_b];
                                var neighbor1 = new MyNode(tempNode_1.getX(), tempNode_1.getY());
                                var neighbor2 = new MyNode(tempNode_1.getX(), tempNode_1.getY() + 1);
                                var neighbor3 = new MyNode(tempNode_1.getX(), tempNode_1.getY() - 1);
                                var neighbor4 = new MyNode(tempNode_1.getX() + 1, tempNode_1.getY());
                                var neighbor5 = new MyNode(tempNode_1.getX() - 1, tempNode_1.getY());
                                var neighbors = new Array();
                                neighbors.push(neighbor1);
                                neighbors.push(neighbor2);
                                neighbors.push(neighbor3);
                                neighbors.push(neighbor4);
                                neighbors.push(neighbor5);
                                for (var _c = 0, neighbors_1 = neighbors; _c < neighbors_1.length; _c++) {
                                    var n2 = neighbors_1[_c];
                                    if (n.getX() == n2.getX() && n.getY() == n2.getY()) {
                                        add = false;
                                    }
                                }
                            }
                            if (add) {
                                randomNode.setVal(randomNode.getVal() + numBridges);
                                tempNode_1.setVal(numBridges);
                                randomNode.setUp(true);
                                tempNode_1.setDown(true);
                                tempNodes.push(tempNode_1);
                                for (count = randomNode.getY(); count >= tempNode_1.getY(); count--) {
                                    occupiedSquares.push(new MyNode(randomNode.getX(), count));
                                }
                                nodesToAdd--;
                            }
                        }
                    }
                }
            }
            //DOWN 
            else if (diceRoll === 2) {
                if (!randomNode.getDown()) {
                    if (randomNode.getY() + 1 < this.height - 2) {
                        var randomDistanceAway = 0;
                        if (this.extreme) {
                            if (this.height - randomNode.getY() > 3) {
                                randomDistanceAway = this.randomInt(2, 3);
                            }
                            else {
                                randomDistanceAway = this.randomInt(2, this.height - randomNode.getY());
                            }
                        }
                        else if (difficulty == 'easy') {
                            if (this.height - randomNode.getY() < difficultyDistance) {
                            }
                            else {
                                randomDistanceAway = this.randomInt(difficultyDistance, this.height - randomNode.getY());
                            }
                        }
                        else {
                            randomDistanceAway = this.randomInt(2, this.height - randomNode.getY());
                        }
                        var count;
                        var add = true;
                        for (count = randomNode.getY() + 1; count <= randomNode.getY() + randomDistanceAway; count++) {
                            for (var _d = 0, tempNodes_3 = tempNodes; _d < tempNodes_3.length; _d++) {
                                var n = tempNodes_3[_d];
                                if (n.getX() == randomNode.getX() && n.getY() == count) {
                                    if (count >= randomNode.getY() + 2 && add) {
                                        if (!n.getUp()) {
                                            var numBridges = 1;
                                            if (difficulty != 'easy') {
                                                if (this.randomInt(1, 2) == 2) {
                                                    numBridges = 2;
                                                }
                                            }
                                            else {
                                                if (this.randomInt(1, chance) == chance) {
                                                    numBridges = 1;
                                                }
                                                else {
                                                    numBridges = 2;
                                                }
                                            }
                                            randomNode.setVal(randomNode.getVal() + numBridges);
                                            n.setVal(n.getVal() + numBridges);
                                            randomNode.setDown(true);
                                            n.setUp(true);
                                            var tempCount;
                                            for (tempCount = randomNode.getY(); tempCount <= n.getY(); tempCount++) {
                                                occupiedSquares.push(new MyNode(randomNode.getX(), tempCount));
                                            }
                                            add = false;
                                        }
                                    }
                                    add = false;
                                }
                            }
                            for (var _e = 0, occupiedSquares_2 = occupiedSquares; _e < occupiedSquares_2.length; _e++) {
                                var n = occupiedSquares_2[_e];
                                if (n.getX() == randomNode.getX() && n.getY() == count) {
                                    add = false;
                                }
                            }
                        }
                        if (add) {
                            var numBridges = 1;
                            if (difficulty != 'easy') {
                                if (this.randomInt(1, 2) == 2) {
                                    numBridges = 2;
                                }
                            }
                            else {
                                if (this.randomInt(1, chance) == chance) {
                                    numBridges = 1;
                                }
                                else {
                                    numBridges = 2;
                                }
                            }
                            var tempNode_2 = new MyNode(randomNode.getX(), randomNode.getY() + randomDistanceAway);
                            for (var _f = 0, tempNodes_4 = tempNodes; _f < tempNodes_4.length; _f++) {
                                var n = tempNodes_4[_f];
                                var neighbor1 = new MyNode(tempNode_2.getX(), tempNode_2.getY());
                                var neighbor2 = new MyNode(tempNode_2.getX(), tempNode_2.getY() + 1);
                                var neighbor3 = new MyNode(tempNode_2.getX(), tempNode_2.getY() - 1);
                                var neighbor4 = new MyNode(tempNode_2.getX() + 1, tempNode_2.getY());
                                var neighbor5 = new MyNode(tempNode_2.getX() - 1, tempNode_2.getY());
                                var neighbors = new Array();
                                neighbors.push(neighbor1);
                                neighbors.push(neighbor2);
                                neighbors.push(neighbor3);
                                neighbors.push(neighbor4);
                                neighbors.push(neighbor5);
                                for (var _g = 0, neighbors_2 = neighbors; _g < neighbors_2.length; _g++) {
                                    var n2 = neighbors_2[_g];
                                    if (n.getX() == n2.getX() && n.getY() == n2.getY()) {
                                        add = false;
                                    }
                                }
                            }
                            if (add) {
                                randomNode.setVal(randomNode.getVal() + numBridges);
                                tempNode_2.setVal(numBridges);
                                randomNode.setDown(true);
                                tempNode_2.setUp(true);
                                tempNodes.push(tempNode_2);
                                for (count = randomNode.getY(); count <= tempNode_2.getY(); count++) {
                                    occupiedSquares.push(new MyNode(randomNode.getX(), count));
                                }
                                nodesToAdd--;
                            }
                        }
                    }
                }
            }
            //LEFT
            else if (diceRoll === 3) {
                if (!randomNode.getLeft()) {
                    if (randomNode.getX() - 1 > 2) {
                        var randomDistanceAway = 0;
                        if (this.extreme) {
                            if (randomNode.getX() - 1 > 3) {
                                randomDistanceAway = this.randomInt(2, 3);
                            }
                            else {
                                randomDistanceAway = this.randomInt(2, randomNode.getX() - 1);
                            }
                        }
                        else if (difficulty == 'easy') {
                            if (randomNode.getX() - 1 < difficultyDistance) {
                            }
                            else {
                                randomDistanceAway = this.randomInt(difficultyDistance, randomNode.getX() - 1);
                            }
                        }
                        else {
                            randomDistanceAway = this.randomInt(2, randomNode.getX() - 1);
                        }
                        var count;
                        var add = true;
                        for (count = randomNode.getX() - 1; count >= randomNode.getX() - randomDistanceAway; count--) {
                            for (var _h = 0, tempNodes_5 = tempNodes; _h < tempNodes_5.length; _h++) {
                                var n = tempNodes_5[_h];
                                if (n.getX() == count && n.getY() == randomNode.getY()) {
                                    if (count <= randomNode.getX() - 2 && add) {
                                        if (!n.getRight()) {
                                            var numBridges = 1;
                                            if (difficulty != 'easy') {
                                                if (this.randomInt(1, 2) == 2) {
                                                    numBridges = 2;
                                                }
                                            }
                                            else {
                                                if (this.randomInt(1, chance) == chance) {
                                                    numBridges = 1;
                                                }
                                                else {
                                                    numBridges = 2;
                                                }
                                            }
                                            randomNode.setVal(randomNode.getVal() + numBridges);
                                            n.setVal(n.getVal() + numBridges);
                                            randomNode.setLeft(true);
                                            n.setRight(true);
                                            var tempCount;
                                            for (tempCount = randomNode.getX(); tempCount >= n.getX(); tempCount--) {
                                                occupiedSquares.push(new MyNode(tempCount, randomNode.getY()));
                                            }
                                            add = false;
                                        }
                                    }
                                    add = false;
                                }
                            }
                            for (var _j = 0, occupiedSquares_3 = occupiedSquares; _j < occupiedSquares_3.length; _j++) {
                                var n = occupiedSquares_3[_j];
                                if (n.getX() == count && n.getY() == randomNode.getY()) {
                                    add = false;
                                }
                            }
                        }
                        if (add) {
                            var numBridges = 1;
                            if (difficulty != 'easy') {
                                if (this.randomInt(1, 2) == 2) {
                                    numBridges = 2;
                                }
                            }
                            else {
                                if (this.randomInt(1, chance) == chance) {
                                    numBridges = 1;
                                }
                                else {
                                    numBridges = 2;
                                }
                            }
                            var tempNode_3 = new MyNode(randomNode.getX() - randomDistanceAway, randomNode.getY());
                            for (var _k = 0, tempNodes_6 = tempNodes; _k < tempNodes_6.length; _k++) {
                                var n = tempNodes_6[_k];
                                var neighbor1 = new MyNode(tempNode_3.getX(), tempNode_3.getY());
                                var neighbor2 = new MyNode(tempNode_3.getX(), tempNode_3.getY() + 1);
                                var neighbor3 = new MyNode(tempNode_3.getX(), tempNode_3.getY() - 1);
                                var neighbor4 = new MyNode(tempNode_3.getX() + 1, tempNode_3.getY());
                                var neighbor5 = new MyNode(tempNode_3.getX() - 1, tempNode_3.getY());
                                var neighbors = new Array();
                                neighbors.push(neighbor1);
                                neighbors.push(neighbor2);
                                neighbors.push(neighbor3);
                                neighbors.push(neighbor4);
                                neighbors.push(neighbor5);
                                for (var _l = 0, neighbors_3 = neighbors; _l < neighbors_3.length; _l++) {
                                    var n2 = neighbors_3[_l];
                                    if (n.getX() == n2.getX() && n.getY() == n2.getY()) {
                                        add = false;
                                    }
                                }
                            }
                            if (add) {
                                randomNode.setVal(randomNode.getVal() + numBridges);
                                tempNode_3.setVal(numBridges);
                                randomNode.setLeft(true);
                                tempNode_3.setRight(true);
                                tempNodes.push(tempNode_3);
                                for (count = randomNode.getX(); count >= tempNode_3.getX(); count--) {
                                    occupiedSquares.push(new MyNode(count, randomNode.getY()));
                                }
                                nodesToAdd--;
                            }
                        }
                    }
                }
            }
            //RIGHT 
            else if (diceRoll === 4) {
                if (!randomNode.getRight()) {
                    if (randomNode.getX() + 1 < this.width - 2) {
                        var randomDistanceAway = 0;
                        if (this.extreme) {
                            if (this.width - randomNode.getX() > 3) {
                                randomDistanceAway = this.randomInt(2, 3);
                            }
                            else {
                                randomDistanceAway = this.randomInt(2, this.width - randomNode.getX());
                            }
                        }
                        else if (difficulty == 'easy') {
                            if (this.width - randomNode.getX() < difficultyDistance) {
                            }
                            else {
                                randomDistanceAway = this.randomInt(difficultyDistance, this.width - randomNode.getX());
                            }
                        }
                        else {
                            randomDistanceAway = this.randomInt(2, this.width - randomNode.getX());
                        }
                        var count;
                        var add = true;
                        for (count = randomNode.getX() + 1; count <= randomNode.getX() + randomDistanceAway; count++) {
                            for (var _m = 0, tempNodes_7 = tempNodes; _m < tempNodes_7.length; _m++) {
                                var n = tempNodes_7[_m];
                                if (n.getX() == count && n.getY() == randomNode.getY()) {
                                    if (count >= randomNode.getX() + 2 && add) {
                                        if (!n.getLeft()) {
                                            var numBridges = 1;
                                            if (difficulty != 'easy') {
                                                if (this.randomInt(1, 2) == 2) {
                                                    numBridges = 2;
                                                }
                                            }
                                            else {
                                                if (this.randomInt(1, chance) == chance) {
                                                    numBridges = 1;
                                                }
                                                else {
                                                    numBridges = 2;
                                                }
                                            }
                                            randomNode.setVal(randomNode.getVal() + numBridges);
                                            n.setVal(n.getVal() + numBridges);
                                            randomNode.setRight(true);
                                            n.setLeft(true);
                                            var tempCount;
                                            for (tempCount = randomNode.getX(); tempCount <= n.getX(); tempCount++) {
                                                occupiedSquares.push(new MyNode(tempCount, randomNode.getY()));
                                            }
                                            add = false;
                                        }
                                    }
                                    add = false;
                                }
                            }
                            for (var _o = 0, occupiedSquares_4 = occupiedSquares; _o < occupiedSquares_4.length; _o++) {
                                var n = occupiedSquares_4[_o];
                                if (n.getX() == count && n.getY() == randomNode.getY()) {
                                    add = false;
                                }
                            }
                        }
                        if (add) {
                            var numBridges = 1;
                            if (difficulty != 'easy') {
                                if (this.randomInt(1, 2) == 2) {
                                    numBridges = 2;
                                }
                            }
                            else {
                                if (this.randomInt(1, chance) == chance) {
                                    numBridges = 1;
                                }
                                else {
                                    numBridges = 2;
                                }
                            }
                            var tempNode_4 = new MyNode(randomNode.getX() + randomDistanceAway, randomNode.getY());
                            for (var _p = 0, tempNodes_8 = tempNodes; _p < tempNodes_8.length; _p++) {
                                var n = tempNodes_8[_p];
                                var neighbor1 = new MyNode(tempNode_4.getX(), tempNode_4.getY());
                                var neighbor2 = new MyNode(tempNode_4.getX(), tempNode_4.getY() + 1);
                                var neighbor3 = new MyNode(tempNode_4.getX(), tempNode_4.getY() - 1);
                                var neighbor4 = new MyNode(tempNode_4.getX() + 1, tempNode_4.getY());
                                var neighbor5 = new MyNode(tempNode_4.getX() - 1, tempNode_4.getY());
                                var neighbors = new Array();
                                neighbors.push(neighbor1);
                                neighbors.push(neighbor2);
                                neighbors.push(neighbor3);
                                neighbors.push(neighbor4);
                                neighbors.push(neighbor5);
                                for (var _q = 0, neighbors_4 = neighbors; _q < neighbors_4.length; _q++) {
                                    var n2 = neighbors_4[_q];
                                    if (n.getX() == n2.getX() && n.getY() == n2.getY()) {
                                        add = false;
                                    }
                                }
                            }
                            if (add) {
                                randomNode.setVal(randomNode.getVal() + numBridges);
                                tempNode_4.setVal(numBridges);
                                randomNode.setRight(true);
                                tempNode_4.setLeft(true);
                                tempNodes.push(tempNode_4);
                                for (count = randomNode.getX(); count <= tempNode_4.getX(); count++) {
                                    occupiedSquares.push(new MyNode(count, randomNode.getY()));
                                }
                                nodesToAdd--;
                            }
                        }
                    }
                }
            }
        }
        for (var _r = 0, tempNodes_9 = tempNodes; _r < tempNodes_9.length; _r++) {
            var n = tempNodes_9[_r];
            this.addNode(n);
        }
    };
    Board.prototype.randomIntReal = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    Board.prototype.randomInt = function (min, max) {
        return Math.floor(this.random() * (max - min + 1) + min);
    };
    Board.prototype.random = function () {
        var x = Math.sin(++this.seed) * 10000;
        return x - Math.floor(x);
    };
    Board.prototype.testAddingNodes = function () {
        var node1 = new MyNode(this.width, this.height);
        node1.setVal(5);
        var node2 = new MyNode(this.width, 1);
        node2.setVal(4);
        var node3 = new MyNode(1, this.height);
        node3.setVal(2);
        var node4 = new MyNode(1, 1);
        node4.setVal(1);
        this.addNode(node1);
        this.addNode(node2);
        this.addNode(node3);
        this.addNode(node4);
    };
    Board.prototype.addNode = function (node) {
        this.nodes.push(node);
    };
    Board.prototype.getWidth = function () { return this.width; };
    Board.prototype.getHeight = function () { return this.height; };
    Board.prototype.getNodes = function () { return this.nodes; };
    return Board;
}());

var Bridge = /** @class */ (function () {
    function Bridge(n1, n2, num) {
        this.n1 = n1;
        this.n2 = n2;
        this.num = num;
        this.width1 = 0;
        this.width2 = 0;
    }
    Bridge.prototype.setNum = function (num) {
        this.num = num;
    };
    Bridge.prototype.getN1 = function () { return this.n1; };
    Bridge.prototype.getN2 = function () { return this.n2; };
    Bridge.prototype.getNum = function () { return this.num; };
    return Bridge;
}());

var MyNode = /** @class */ (function () {
    function MyNode(x, y) {
        this.x = x;
        this.y = y;
        this.bridges = new Array();
        this.up = false;
        this.right = false;
        this.left = false;
        this.down = false;
    }
    MyNode.prototype.setVal = function (val) {
        this.val = val;
    };
    MyNode.prototype.setUp = function (b) {
        this.up = b;
    };
    MyNode.prototype.setDown = function (b) {
        this.down = b;
    };
    MyNode.prototype.setRight = function (b) {
        this.right = b;
    };
    MyNode.prototype.setLeft = function (b) {
        this.left = b;
    };
    MyNode.prototype.addBridge = function (bridge) {
        this.bridges.push(bridge);
    };
    MyNode.prototype.getX = function () { return this.x; };
    MyNode.prototype.getY = function () { return this.y; };
    MyNode.prototype.getVal = function () { return this.val; };
    MyNode.prototype.getBridges = function () { return this.bridges; };
    MyNode.prototype.getUp = function () { return this.up; };
    MyNode.prototype.getDown = function () { return this.down; };
    MyNode.prototype.getLeft = function () { return this.left; };
    MyNode.prototype.getRight = function () { return this.right; };
    return MyNode;
}());



/***/ }),

/***/ "./src/app/services/boards/minesweeper/board.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/services/boards/minesweeper/board.service.ts ***!
  \**************************************************************/
/*! exports provided: Board */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Board", function() { return Board; });
var Board = /** @class */ (function () {
    function Board(width, height, bombCount, seed) {
        this.lastMineX = 0;
        this.lastMineY = 0;
        this.width = width;
        this.height = height;
        //the silent "first bomb" gets removed so you cant insta-lose
        this.bombCount = bombCount + 1;
        this.seed = seed;
    }
    Board.prototype.generateBoard = function () {
        var rows = [];
        for (var j = 0; j < this.height; j++) {
            var column = [];
            for (var i = 0; i < this.width; i++) {
                column.push(0);
            }
            rows.push(column);
        }
        this.mineField = rows;
        var vRows = [];
        for (var j = 0; j < this.height; j++) {
            var vColumn = [];
            for (var i = 0; i < this.width; i++) {
                vColumn.push(0);
            }
            vRows.push(vColumn);
        }
        this.visible = vRows;
    };
    Board.prototype.fillBoard = function (firstX, firstY) {
        var mineXPos;
        var mineYPos;
        for (var _ = 0; _ < this.bombCount; _++) {
            do {
                mineXPos = Math.floor(this.random() * this.width);
                mineYPos = Math.floor(this.random() * this.height);
            } while (!this.checkValidMine(mineXPos, mineYPos, firstX, firstY));
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    if (i == 0 && j == 0) {
                        this.mineField[mineYPos][mineXPos] = -1;
                    }
                    else {
                        this.updateNeighborTile(mineXPos + i, mineYPos + j);
                    }
                }
            }
        }
    };
    Board.prototype.checkValidMine = function (x, y, firstX, firstY) {
        if (this.mineField[y][x] < 0) {
            return false;
        }
        if ((Math.abs(x - firstX) <= 1) && (Math.abs(y - firstY)) <= 1) {
            return false;
        }
        var nbrMineCount = 0;
        //at least two free spaces must surround a mine
        for (var i = x - 1; i <= x + 1; i++) {
            for (var j = y - 1; j <= y + 1; j++) {
                if (i >= 0 && i < this.width && j >= 0 && j < this.height) {
                    if (this.mineField[j][i] < 0) {
                        nbrMineCount += 1;
                    }
                }
            }
        }
        if (nbrMineCount > 4) {
            return false;
        }
        return true;
    };
    Board.prototype.doubleClick = function (x, y) {
        var val = this.mineField[y][x];
        if (val == this.countFlagNeighbors(x, y) && val != 0) {
            for (var _i = 0, _a = this.getNeighbors(x, y); _i < _a.length; _i++) {
                var neighbor = _a[_i];
                var goodPress = this.click(neighbor.x, neighbor.y);
                if (!goodPress) {
                    return false;
                }
            }
        }
        return true;
    };
    Board.prototype.countFlagNeighbors = function (x, y) {
        var toReturn = 0;
        for (var _i = 0, _a = this.getNeighbors(x, y); _i < _a.length; _i++) {
            var neighbor = _a[_i];
            if (this.visible[neighbor.y][neighbor.x] == 2) {
                toReturn++;
            }
        }
        return toReturn;
    };
    Board.prototype.getNeighbors = function (x, y) {
        var toReturn = [];
        if (x + 1 < this.width) {
            var m1 = {
                'x': x + 1,
                'y': y
            };
            toReturn.push(m1);
            if (y + 1 < this.height) {
                var m2 = {
                    'x': x + 1,
                    'y': y + 1
                };
                toReturn.push(m2);
            }
            if (y - 1 >= 0) {
                var m3 = {
                    'x': x + 1,
                    'y': y - 1
                };
                toReturn.push(m3);
            }
        }
        if (x - 1 >= 0) {
            var m4 = {
                'x': x - 1,
                'y': y
            };
            toReturn.push(m4);
            if (y + 1 < this.height) {
                var m5 = {
                    'x': x - 1,
                    'y': y + 1
                };
                toReturn.push(m5);
            }
            if (y - 1 >= 0) {
                var m6 = {
                    'x': x - 1,
                    'y': y - 1
                };
                toReturn.push(m6);
            }
        }
        if (y + 1 < this.height) {
            var m7 = {
                'x': x,
                'y': y + 1
            };
            toReturn.push(m7);
        }
        if (y - 1 >= 0) {
            var m8 = {
                'x': x,
                'y': y - 1
            };
            toReturn.push(m8);
        }
        return toReturn;
    };
    Board.prototype.updateNeighborTile = function (x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            if (this.mineField[y][x] >= 0) {
                this.mineField[y][x] += 1;
            }
        }
    };
    //turns a mine into an empty tile
    /*replaceMine(x, y){
    this.mineField[y][x] = 0;
    for(var i = x-1; i <= x+1; i++){
      for(var j = y-1; j <= y+1; j++){
        if(i >= 0 && i < this.width && j >= 0 && j < this.height && !(i == x && j == y)){
          if(this.mineField[j][i] >= 0){
            this.mineField[j][i] -= 1;
          }
          if(this.mineField[j][i] < 0){
            this.mineField[y][x] += 1;
          }
        }
      }
    }
  }*/
    Board.prototype.floodFill = function (x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return;
        }
        if (this.mineField[y][x] < 0 || this.visible[y][x] > 0) {
            return;
        }
        this.visible[y][x] = 1;
        if (this.mineField[y][x] != 0) {
            return;
        }
        for (var i = x - 1; i <= x + 1; i++) {
            for (var j = y - 1; j <= y + 1; j++) {
                this.floodFill(i, j);
            }
        }
    };
    Board.prototype.firstClick = function (x, y) {
        if (this.visible[y][x] == 2) {
            return;
        }
        this.fillBoard(x, y);
        this.floodFill(x, y);
    };
    Board.prototype.click = function (x, y) {
        if (this.visible[y][x] == 2) {
            return true;
        }
        if (this.mineField[y][x] < 0) {
            return false;
        }
        else {
            this.floodFill(x, y);
            return true;
        }
    };
    Board.prototype.flagTile = function (x, y) {
        if (this.visible[y][x] == 2) {
            this.visible[y][x] = 0;
        }
        else if (this.visible[y][x] == 0) {
            this.visible[y][x] = 2;
        }
    };
    Board.prototype.isSolved = function () {
        var numBombs = 0;
        for (var j = 0; j < this.height; j++) {
            for (var i = 0; i < this.width; i++) {
                if (this.mineField[j][i] >= 0 && this.visible[j][i] == 0) {
                    return false;
                }
                else if (this.visible[j][i] == 2) {
                    numBombs++;
                }
            }
        }
        if (numBombs > this.bombCount) {
            return false;
        }
        for (var j = 0; j < this.height; j++) {
            for (var i = 0; i < this.width; i++) {
                if (this.mineField[j][i] == -1) {
                    this.visible[j][i] = 2;
                }
            }
        }
        return true;
    };
    Board.prototype.random = function () {
        var x = Math.sin(++this.seed) * 10000;
        return x - Math.floor(x);
    };
    return Board;
}());



/***/ }),

/***/ "./src/app/services/boards/nonograms/board.service.ts":
/*!************************************************************!*\
  !*** ./src/app/services/boards/nonograms/board.service.ts ***!
  \************************************************************/
/*! exports provided: Board, Label */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Board", function() { return Board; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Label", function() { return Label; });
var Board = /** @class */ (function () {
    function Board(width, height, seed) {
        this.rowLabels = [];
        this.colLabels = [];
        this.boardVals = [];
        this.markedVals = [];
        this.maxWidth = 0;
        this.maxHeight = 0;
        this.width = width;
        this.height = height;
        this.seed = seed;
    }
    Board.prototype.getLegendLength = function () {
        return this.maxWidth - this.width;
    };
    Board.prototype.markTile = function (x, y) {
        if (this.boardVals[x][y] == 0) {
            this.boardVals[x][y] = 1;
        }
        else {
            this.boardVals[x][y] = 0;
            this.markedVals[x][y] = 0;
        }
    };
    Board.prototype.markRed = function (x, y) {
        if (this.markedVals[x][y] == 0) {
            this.markedVals[x][y] = 1;
        }
        else {
            this.boardVals[x][y] = 0;
            this.markedVals[x][y] = 0;
        }
    };
    Board.prototype.mark = function (x, y) {
        if (x < this.width && x >= 0 && y < this.height && y >= 0) {
            this.markRed(x, y);
        }
    };
    Board.prototype.click = function (x, y) {
        if (x < this.width && x >= 0 && y < this.height && y >= 0) {
            this.markTile(x, y);
        }
    };
    Board.prototype.isSolved = function () {
        for (var i = 0; i < this.colLabels.length; i++) {
            if (this.isColLabelValid(i, 0) != 1) {
                return false;
            }
        }
        for (var j = 0; j < this.rowLabels.length; j++) {
            if (this.isRowLabelValid(j, 0) != 1) {
                return false;
            }
        }
        return true;
    };
    Board.prototype.isColLabelValid = function (col, index) {
        var count = 0;
        var colLabel = [];
        for (var i = 0; i < this.width; i++) {
            if (this.boardVals[i][col] == 0 && count > 0) {
                colLabel.push(count);
                count = 0;
            }
            else {
                count += this.boardVals[i][col];
            }
        }
        if (count > 0) {
            colLabel.push(count);
            count = 0;
        }
        if (colLabel.length != this.colLabels[col].length) {
            return 0;
        }
        for (var i = 0; i < colLabel.length; i++) {
            if (colLabel[i] != this.colLabels[col][i]) {
                return 0;
            }
        }
        return 1;
    };
    Board.prototype.isRowLabelValid = function (row, index) {
        var count = 0;
        var rowLabel = [];
        for (var j = 0; j < this.height; j++) {
            if (this.boardVals[row][j] == 0 && count > 0) {
                rowLabel.push(count);
                count = 0;
            }
            else {
                count += this.boardVals[row][j];
            }
        }
        if (count > 0) {
            rowLabel.push(count);
            count = 0;
        }
        if (rowLabel.length != this.rowLabels[row].length) {
            return 0;
        }
        for (var i = 0; i < rowLabel.length; i++) {
            if (rowLabel[i] != this.rowLabels[row][i]) {
                return 0;
            }
        }
        return 1;
    };
    Board.prototype.add = function (a, b) {
        return a + b;
    };
    Board.prototype.generateBoard = function () {
        this.boardVals = [];
        this.markedVals = [];
        for (var i = 0; i < this.width; i++) {
            var toAdd = [];
            var toAdd2 = [];
            for (var j = 0; j < this.height; j++) {
                toAdd.push(0);
                toAdd2.push(0);
            }
            this.markedVals.push(toAdd2);
            this.boardVals.push(toAdd);
        }
        this.maxHeight = 0;
        this.maxWidth = 0;
        var board = [];
        for (var i = 0; i < this.width; i++) {
            var row = [];
            for (var j = 0; j < this.height; j++) {
                row.push(Math.floor(this.random() * 2));
            }
            board.push(row);
        }
        var rowLabels = [];
        for (var i = 0; i < this.width; i++) {
            var count = 0;
            var rowLabel = [];
            for (var j = 0; j < this.height; j++) {
                if (board[i][j] == 0 && count > 0) {
                    rowLabel.push(count);
                    count = 0;
                }
                else {
                    count += board[i][j];
                }
            }
            if (count > 0) {
                rowLabel.push(count);
                count = 0;
            }
            if (this.height + rowLabel.length > this.maxHeight) {
                this.maxHeight = this.height + rowLabel.length;
            }
            rowLabels.push(rowLabel);
        }
        var colLabels = [];
        for (var j = 0; j < this.height; j++) {
            var count = 0;
            var colLabel = [];
            for (var i = 0; i < this.width; i++) {
                if (board[i][j] == 0 && count > 0) {
                    colLabel.push(count);
                    count = 0;
                }
                else {
                    count += board[i][j];
                }
            }
            if (count > 0) {
                colLabel.push(count);
                count = 0;
            }
            if (this.width + colLabel.length > this.maxWidth) {
                this.maxWidth = this.width + colLabel.length;
            }
            colLabels.push(colLabel);
        }
        if (this.maxWidth > this.maxHeight) {
            this.maxHeight = this.maxWidth;
        }
        else {
            this.maxWidth = this.maxHeight;
        }
        this.rowLabels = rowLabels;
        this.colLabels = colLabels;
        var regenerate = false;
        for (var i = 0; i < this.colLabels.length; i++) {
            if (this.colLabels[i].length == 0) {
                regenerate = true;
            }
        }
        for (var i = 0; i < this.rowLabels.length; i++) {
            if (this.rowLabels[i].length == 0) {
                regenerate = true;
            }
        }
        if (regenerate) {
            this.generateBoard();
        }
    };
    Board.prototype.random = function () {
        var x = Math.sin(++this.seed) * 10000;
        return x - Math.floor(x);
    };
    return Board;
}());

var Label = /** @class */ (function () {
    function Label(num) {
        this.num = num;
    }
    return Label;
}());



/***/ }),

/***/ "./src/app/services/boards/sudoku/board.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/services/boards/sudoku/board.service.ts ***!
  \*********************************************************/
/*! exports provided: Board */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Board", function() { return Board; });
/* harmony import */ var _jlguenego_sudoku_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jlguenego/sudoku-generator */ "./node_modules/@jlguenego/sudoku-generator/index.js");
/* harmony import */ var _jlguenego_sudoku_generator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jlguenego_sudoku_generator__WEBPACK_IMPORTED_MODULE_0__);

var Board = /** @class */ (function () {
    function Board(numCarved) {
        this.numCarved = numCarved;
    }
    Board.prototype.generateBoard = function () {
        var grid = _jlguenego_sudoku_generator__WEBPACK_IMPORTED_MODULE_0__["SudokuSolver"].generate();
        var grid2 = _jlguenego_sudoku_generator__WEBPACK_IMPORTED_MODULE_0__["SudokuSolver"].carve(grid, this.numCarved);
        this.originalPuzzle = grid2;
        this.sudokuPuzzle = JSON.parse(JSON.stringify(this.originalPuzzle));
    };
    Board.prototype.isSolved = function () { return this.valid(this.sudokuPuzzle); };
    Board.prototype.random = function () {
        var x = Math.sin(++this.seed) * 10000;
        return x - Math.floor(x);
    };
    Board.prototype.isInvalidTile = function (x, y, tileValue) {
        if (tileValue == 0)
            return false;
        for (var i = 0; i < 9; i++) {
            if (i != x) {
                if (this.sudokuPuzzle[i][y] == tileValue)
                    return true;
            }
            if (i != y) {
                if (this.sudokuPuzzle[x][i] == tileValue)
                    return true;
            }
        }
        if (x % 3 == 0 && y % 3 == 0) {
            if (this.sudokuPuzzle[x + 1][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 2][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x][y + 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y + 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 2][y + 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x][y + 2] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y + 2] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 2][y + 2] == tileValue)
                return true;
        }
        else if (x % 3 == 1 && y % 3 == 0) {
            if (this.sudokuPuzzle[x - 1][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x][y + 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 1][y + 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y + 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x][y + 2] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 1][y + 2] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y + 2] == tileValue)
                return true;
        }
        else if (x % 3 == 2 && y % 3 == 0) {
            if (this.sudokuPuzzle[x - 1][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 2][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x][y + 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 1][y + 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 2][y + 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x][y + 2] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 1][y + 2] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 2][y + 2] == tileValue)
                return true;
        }
        else if (x % 3 == 0 && y % 3 == 1) {
            if (this.sudokuPuzzle[x][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x][y + 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y + 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 2][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 2][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 2][y + 1] == tileValue)
                return true;
        }
        else if (x % 3 == 0 && y % 3 == 2) {
            if (this.sudokuPuzzle[x][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x][y - 2] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y - 2] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 2][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 2][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 2][y - 2] == tileValue)
                return true;
        }
        else if (x % 3 == 1 && y % 3 == 1) {
            if (this.sudokuPuzzle[x - 1][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 1][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 1][y + 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x][y + 2] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y + 1] == tileValue)
                return true;
        }
        else if (x % 3 == 2 && y % 3 == 1) {
            if (this.sudokuPuzzle[x][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 1][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 2][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x][y + 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 1][y + 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 2][y + 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 1][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 2][y] == tileValue)
                return true;
        }
        else if (x % 3 == 1 && y % 3 == 2) {
            if (this.sudokuPuzzle[x + 1][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 1][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 1][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x][y - 2] == tileValue)
                return true;
            if (this.sudokuPuzzle[x + 1][y - 2] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 1][y - 2] == tileValue)
                return true;
        }
        else if (x % 3 == 2 && y % 3 == 2) {
            if (this.sudokuPuzzle[x][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x][y - 2] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 1][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 1][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 1][y - 2] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 2][y] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 2][y - 1] == tileValue)
                return true;
            if (this.sudokuPuzzle[x - 2][y - 2] == tileValue)
                return true;
        }
        return false;
    };
    Board.prototype.valid = function (arraySolution) {
        for (var y = 0; y < 9; ++y) {
            for (var x = 0; x < 9; ++x) {
                var value = arraySolution[y][x];
                if (value == 0)
                    return false;
                if (value) {
                    // Check the line
                    for (var x2 = 0; x2 < 9; ++x2) {
                        if (x2 != x && arraySolution[y][x2] == value) {
                            return false;
                        }
                    }
                    // Check the column
                    for (var y2 = 0; y2 < 9; ++y2) {
                        if (y2 != y && arraySolution[y2][x] == value) {
                            return false;
                        }
                    }
                    // Check the square
                    var startY = Math.floor(y / 3) * 3;
                    for (var y2 = startY; y2 < startY + 3; ++y2) {
                        var startX = Math.floor(x / 3) * 3;
                        for (x2 = startX; x2 < startX + 3; ++x2) {
                            if ((x2 != x || y2 != y) && arraySolution[y2][x2] == value) {
                                return false;
                            }
                        }
                    }
                }
            }
        }
        return true;
    };
    return Board;
}());



/***/ }),

/***/ "./src/app/services/boards/takuzu/board.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/services/boards/takuzu/board.service.ts ***!
  \*********************************************************/
/*! exports provided: Board */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Board", function() { return Board; });
var Board = /** @class */ (function () {
    function Board(size, seed, removePerc) {
        this.size = size;
        this.seed = seed;
        this.removePerc = removePerc;
        if (this.size % 2 != 0) {
            this.size++;
        }
    }
    /* ------------------------------------------------------ */
    /*                  BOARD GENERATION                      */
    /* ------------------------------------------------------ */
    Board.prototype.generateBoard = function () {
        var board = [];
        for (var i = 0; i < this.size; i++) {
            board.push([]);
            for (var j = 0; j < this.size; j++) {
                board[i].push(-1);
            }
        }
        while (!Board.isSolvedArg(board)) {
            var columnData = {};
            for (var i = 0; i < this.size; i++) {
                var m = {
                    'numTotOnes': 0,
                    'numTotZeroes': 0,
                    'recentOnes': 0,
                    'recentZeroes': 0
                };
                columnData[i] = m;
            }
            for (var i = 0; i < this.size; i++) {
                var numTotOnes = 0;
                var numTotZeroes = 0;
                var recentOnes = 0;
                var recentZeroes = 0;
                var added = false;
                for (var j = 0; j < this.size; j++) {
                    var choice = Math.round(this.random());
                    added = false;
                    var column = columnData[j];
                    if (numTotOnes < this.size / 2 && choice == 1 && recentOnes < 2 &&
                        column['numTotOnes'] < this.size / 2 && column['recentOnes'] < 2) {
                        column['recentZeroes'] = 0;
                        column['recentOnes']++;
                        column['numTotOnes']++;
                        recentZeroes = 0;
                        recentOnes++;
                        numTotOnes++;
                        board[i][j] = choice;
                        added = true;
                    }
                    else if (numTotZeroes < this.size / 2 && choice == 1 && recentZeroes < 2 &&
                        column['numTotZeroes'] < this.size / 2 && column['recentZeroes'] < 2) {
                        column['recentOnes'] = 0;
                        column['recentZeroes']++;
                        column['numTotZeroes']++;
                        recentOnes = 0;
                        recentZeroes++;
                        numTotZeroes++;
                        board[i][j] = 0;
                        added = true;
                    }
                    if (numTotZeroes < this.size / 2 && choice == 0 && recentZeroes < 2 &&
                        column['numTotZeroes'] < this.size / 2 && column['recentZeroes'] < 2) {
                        column['recentOnes'] = 0;
                        column['recentZeroes']++;
                        column['numTotZeroes']++;
                        recentOnes = 0;
                        recentZeroes++;
                        numTotZeroes++;
                        board[i][j] = choice;
                        added = true;
                    }
                    else if (numTotOnes < this.size / 2 && choice == 0 && recentOnes < 2 &&
                        column['numTotOnes'] < this.size / 2 && column['recentOnes'] < 2) {
                        column['recentZeroes'] = 0;
                        column['recentOnes']++;
                        column['numTotOnes']++;
                        recentZeroes = 0;
                        recentOnes++;
                        numTotOnes++;
                        board[i][j] = 1;
                        added = true;
                    }
                    if (added = false) {
                        break;
                    }
                }
                if (added = false) {
                    break;
                }
            }
        }
        this.originalPuzzle = board;
        this.carve();
    };
    /* ------------------------------------------------------ */
    Board.prototype.carve = function () {
        var carvedBoard = JSON.parse(JSON.stringify(this.originalPuzzle));
        var indexes = [];
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                indexes.push([i, j]);
            }
        }
        for (var i = 0; i < (this.removePerc * (this.size * this.size)); i++) {
            if (indexes.length == 0) {
                break;
            }
            var idx = Math.trunc(this.random() * indexes.length);
            var row = (indexes[idx])[0];
            var col = (indexes[idx])[1];
            indexes.splice(idx, 1);
            if (carvedBoard[row][col] == -1) {
                i--;
                continue;
            }
            var oldVal = carvedBoard[row][col];
            carvedBoard[row][col] = -1;
            if (!Board.canSolve(carvedBoard)) {
                carvedBoard[row][col] = oldVal;
                i--;
            }
        }
        this.originalPuzzle = JSON.parse(JSON.stringify(carvedBoard));
        this.takuzuPuzzle = JSON.parse(JSON.stringify(carvedBoard));
    };
    /* ------------------------------------------------------ */
    /*                  MISC. FRONT-END API                   */
    /* ------------------------------------------------------ */
    Board.prototype.isSolved = function () {
        return Board.isSolvedArg(this.takuzuPuzzle);
    };
    /* ------------------------------------------------------ */
    Board.prototype.hasError = function () {
        return Board.hasErrorArg(this.takuzuPuzzle);
    };
    /* ------------------------------------------------------ */
    Board.prototype.isOriginal = function (x, y) {
        if (x >= this.size || y >= this.size) {
            return false;
        }
        else if (this.originalPuzzle[y][x] != -1) {
            return true;
        }
        else {
            return false;
        }
    };
    /* ------------------------------------------------------ */
    Board.prototype.rotateValue = function (x, y, forward) {
        if (x >= this.size || y >= this.size || this.isOriginal(x, y)) {
            return;
        }
        if (forward) {
            this.takuzuPuzzle[y][x] += 1;
            if (this.takuzuPuzzle[y][x] == 2) {
                this.takuzuPuzzle[y][x] = -1;
            }
        }
        else {
            this.takuzuPuzzle[y][x] -= 1;
            if (this.takuzuPuzzle[y][x] == -2) {
                this.takuzuPuzzle[y][x] = 1;
            }
        }
    };
    /* ------------------------------------------------------ */
    /*                  MAIN SOLVER FUNCTIONS                 */
    /* ------------------------------------------------------ */
    Board.hasErrorArg = function (board) {
        var rows = [];
        var cols = [];
        // create a list of strings of the values of each row and column
        for (var i = 0; i < board.length; i++) {
            var row = "";
            var col = "";
            for (var j = 0; j < board[0].length; j++) {
                if (board[i][j] == -1) {
                    row += "-";
                }
                else {
                    row += board[i][j];
                }
                if (board[j][i] == -1) {
                    col += "-";
                }
                else {
                    col += board[j][i];
                }
            }
            rows.push(row);
            cols.push(col);
        }
        var invalidOnes = "111";
        var invalidZeroes = "000";
        // check rows for runs of three 0's or 1's, too many 0's or 1's, or blanks
        for (var i = 0; i < rows.length; i++) {
            var curr = rows[i];
            var numOnes = curr.split("1").length - 1;
            var numZeroes = curr.split("0").length - 1;
            if (numOnes > (board.length) / 2 ||
                numZeroes > (board[0].length) / 2 ||
                curr.includes(invalidOnes) ||
                curr.includes(invalidZeroes)) {
                return true;
            }
        }
        // check cols for runs of three 0's or 1's, too many 0's or 1's, or blanks
        for (var i = 0; i < cols.length; i++) {
            var curr = cols[i];
            var numOnes = curr.split("1").length - 1;
            var numZeroes = curr.split("0").length - 1;
            if (numOnes > (board.length) / 2 ||
                numZeroes > (board[0].length) / 2 ||
                curr.includes(invalidOnes) ||
                curr.includes(invalidZeroes)) {
                return true;
            }
        }
        // check if any two rows or columns are the same
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].includes("-")) {
                continue;
            }
            for (var j = i + 1; j < rows.length; j++) {
                if (i == j || rows[j].includes("-")) {
                    continue;
                }
                if (rows[i] == rows[j]) {
                    return true;
                }
            }
        }
        for (var i = 0; i < cols.length; i++) {
            if (cols[i].includes("-")) {
                continue;
            }
            for (var j = i + 1; j < cols.length; j++) {
                if (i == j || cols[j].includes("-")) {
                    continue;
                }
                if (cols[i] == cols[j]) {
                    return true;
                }
            }
        }
        return false;
    };
    Board.prototype.isInvalidTile = function (x, y) {
        var boardVal = this.takuzuPuzzle[y][x];
        if (boardVal == -1) {
            return false;
        }
        var numFound = 0;
        var inARow = 0;
        // Check row
        for (var i = 0; i < this.size; i++) {
            if (this.takuzuPuzzle[y][i] == boardVal) {
                numFound++;
                inARow++;
            }
            else {
                inARow = 0;
            }
            if (inARow == 3 && x >= i - 2 && x <= i) {
                return true;
            }
        }
        if (numFound > this.size / 2) {
            return true;
        }
        numFound = 0;
        inARow = 0;
        // Check column
        for (var i = 0; i < this.size; i++) {
            if (this.takuzuPuzzle[i][x] == boardVal) {
                numFound++;
                inARow++;
            }
            else {
                inARow = 0;
            }
            if (inARow == 3 && y >= i - 2 && y <= i) {
                return true;
            }
        }
        if (numFound > this.size / 2) {
            return true;
        }
        var rows = [];
        var cols = [];
        for (var i = 0; i < this.size; i++) {
            var row = "";
            var col = "";
            for (var j = 0; j < this.size; j++) {
                row += this.takuzuPuzzle[i][j];
                col += this.takuzuPuzzle[j][i];
            }
            rows.push(row);
            cols.push(col);
        }
        if (!(rows[y].split("-1").length > 1)) {
            for (var i = 0; i < this.size; i++) {
                if (i != y) {
                    if (rows[i] == rows[y]) {
                        return true;
                    }
                }
            }
        }
        if (!(cols[x].split("-1").length > 1)) {
            for (var i = 0; i < this.size; i++) {
                if (i != x) {
                    if (cols[i] == cols[x]) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /* ------------------------------------------------------ */
    Board.isSolvedArg = function (board) {
        var rows = [];
        var cols = [];
        // create a list of strings of the values of each row and column
        for (var i = 0; i < board.length; i++) {
            var row = "";
            var col = "";
            for (var j = 0; j < board[0].length; j++) {
                row += board[i][j];
                col += board[j][i];
            }
            rows.push(row);
            cols.push(col);
        }
        var invalidOnes = "111";
        var invalidZeroes = "000";
        // check rows for runs of three 0's or 1's, too many 0's or 1's, or blanks
        for (var i = 0; i < rows.length; i++) {
            var curr = rows[i];
            var numOnes = curr.split("1").length - 1;
            var numZeroes = curr.split("0").length - 1;
            if (numOnes > (board.length) / 2 ||
                numZeroes > (board[0].length) / 2 ||
                curr.includes(invalidOnes) ||
                curr.includes(invalidZeroes) ||
                curr.includes('-')) {
                return false;
            }
        }
        // check cols for runs of three 0's or 1's, too many 0's or 1's, or blanks
        for (var i = 0; i < cols.length; i++) {
            var curr = cols[i];
            var numOnes = curr.split("1").length - 1;
            var numZeroes = curr.split("0").length - 1;
            if (numOnes > (board.length) / 2 ||
                numZeroes > (board[0].length) / 2 ||
                curr.includes(invalidOnes) ||
                curr.includes(invalidZeroes) ||
                curr.includes('-')) {
                return false;
            }
        }
        // check if any two rows or columns are the same
        for (var i = 0; i < rows.length; i++) {
            for (var j = i + 1; j < rows.length; j++) {
                if (i == j) {
                    continue;
                }
                if (rows[i] == rows[j]) {
                    return false;
                }
                else if (cols[i] == cols[j]) {
                    return false;
                }
            }
        }
        return true;
    };
    /* ------------------------------------------------------ */
    Board.canSolve = function (board) {
        var thisBoard = JSON.parse(JSON.stringify(board));
        while (true) {
            var didSomething = false;
            didSomething = Board.useTechniques(thisBoard);
            if (!didSomething) {
                break;
            }
        }
        return (Board.isSolvedArg(thisBoard));
    };
    /* ------------------------------------------------------ */
    Board.canSolveOptimized = function (board, i, j, val) {
        if (board[i][j] == val) {
            return true;
        }
        var thisBoard = JSON.parse(JSON.stringify(board));
        while (true) {
            var didSomething = true;
            didSomething = Board.useTechniques(thisBoard);
            if (!didSomething || thisBoard[i][j] == val) {
                break;
            }
        }
        return (thisBoard[i][j] == val || Board.isSolvedArg(thisBoard));
    };
    /* ------------------------------------------------------ */
    /*                    SOLVER MODULES                      */
    /* ------------------------------------------------------ */
    Board.useTechniques = function (board) {
        var didSomething = false;
        didSomething = (didSomething || Board.wrapTwos(board));
        if (!didSomething) {
            didSomething = (didSomething || Board.breakThrees(board));
        }
        if (!didSomething) {
            didSomething = (didSomething || Board.completeParity(board));
        }
        if (!didSomething) {
            didSomething = (didSomething || Board.eliminateImpossibilities(board));
        }
        return didSomething;
    };
    /* ------------------------------------------------------ */
    Board.wrapTwos = function (board) {
        var didSomething = false;
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if (board[i][j] != -1) {
                    continue;
                }
                if (Board.canAccess(board, i - 2, j)) {
                    if (Board.sameVal(board, i - 1, j, i - 2, j)) {
                        board[i][j] = Board.negate(board, i - 1, j);
                        didSomething = true;
                    }
                }
                if (Board.canAccess(board, i + 2, j)) {
                    if (Board.sameVal(board, i + 1, j, i + 2, j)) {
                        board[i][j] = Board.negate(board, i + 1, j);
                        didSomething = true;
                    }
                }
                if (Board.canAccess(board, i, j - 2)) {
                    if (Board.sameVal(board, i, j - 1, i, j - 2)) {
                        board[i][j] = Board.negate(board, i, j - 1);
                        didSomething = true;
                    }
                }
                if (Board.canAccess(board, i, j + 2)) {
                    if (Board.sameVal(board, i, j + 1, i, j + 2)) {
                        board[i][j] = Board.negate(board, i, j + 1);
                        didSomething = true;
                    }
                }
            }
        }
        return didSomething;
    };
    /* ------------------------------------------------------ */
    Board.breakThrees = function (board) {
        var didSomething = false;
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if (board[i][j] != -1) {
                    continue;
                }
                if (Board.canAccess(board, i - 1, j) &&
                    Board.canAccess(board, i + 1, j)) {
                    if (Board.sameVal(board, i - 1, j, i + 1, j)) {
                        board[i][j] = Board.negate(board, i - 1, j);
                        didSomething = true;
                    }
                }
                if (Board.canAccess(board, i, j - 1) &&
                    Board.canAccess(board, i, j + 1)) {
                    if (Board.sameVal(board, i, j - 1, i, j + 1)) {
                        board[i][j] = Board.negate(board, i, j - 1);
                        didSomething = true;
                    }
                }
            }
        }
        return didSomething;
    };
    /* ------------------------------------------------------ */
    Board.completeParity = function (board) {
        var didSomething = false;
        for (var i = 0; i < board.length; i++) {
            var row = "";
            var col = "";
            var numZeroes = 0;
            var numOnes = 0;
            var idx = -1;
            // convert rows and columns into strings
            // DOES NOT WORK IF BOARD IS NOT SQUARE
            for (var j = 0; j < board[0].length; j++) {
                if (board[i][j] == -1) {
                    row += "-";
                }
                else {
                    row += board[i][j];
                }
                if (board[j][i] == -1) {
                    col += "-";
                }
                else {
                    col += board[j][i];
                }
            }
            if ((row.split("-").length - 1) != 0) {
                numZeroes = (row.split("0").length - 1);
                numOnes = (row.split("1").length - 1);
                if (numZeroes == board.length / 2) {
                    idx = -1;
                    while ((idx = row.indexOf("-", idx + 1)) != -1) {
                        board[i][idx] = 1;
                    }
                    didSomething = true;
                }
                else if (numOnes == board.length / 2) {
                    idx = -1;
                    while ((idx = row.indexOf("-", idx + 1)) != -1) {
                        board[i][idx] = 0;
                    }
                    didSomething = true;
                }
            }
            if ((col.split("-").length - 1) != 0) {
                numZeroes = (col.split("0").length - 1);
                numOnes = (col.split("1").length - 1);
                if (numZeroes == board[i].length / 2) {
                    idx = -1;
                    while ((idx = col.indexOf("-", idx + 1)) != -1) {
                        board[idx][i] = 1;
                    }
                    didSomething = true;
                }
                else if (numOnes == board[i].length / 2) {
                    idx = -1;
                    while ((idx = col.indexOf("-", idx + 1)) != -1) {
                        board[idx][i] = 0;
                    }
                    didSomething = true;
                }
            }
        }
        return didSomething;
    };
    /* ------------------------------------------------------ */
    Board.eliminateImpossibilities = function (board) {
        var didSomething = false;
        var testBoard = JSON.parse(JSON.stringify(board));
        for (var i = 0; i < board.length; i++) {
            var row = "";
            var idx = -1;
            var matches = [];
            for (var j = 0; j < board[0].length; j++) {
                if (board[i][j] == -1) {
                    row += "-";
                }
                else {
                    row += board[i][j];
                }
            }
            if (row.includes("-")) {
                var numEmpty = (row.split("-").length - 1);
                var possibilities = Board.getPermutations(numEmpty);
                var validPossibilities = [];
                var testString = "";
                // try all possibilities and record ones that make a valid board
                for (var k = 0; k < possibilities.length; k++) {
                    testString = Board.fillBlanks(row, possibilities[k]);
                    if (Board.lineStringHasError(testString)) {
                        continue;
                    }
                    Board.writeStringToLocation(testBoard, i, 0, testString, true);
                    if (!Board.hasErrorArg(testBoard)) {
                        validPossibilities.push(testString);
                    }
                    Board.writeStringToLocation(testBoard, i, 0, row, true);
                }
                if (validPossibilities.length != 0) {
                    // find any values that are shared between all valid possibilities
                    var boardAdditions = validPossibilities[0];
                    for (var m = 1; m < validPossibilities.length; m++) {
                        for (var n = 0; n < validPossibilities[m].length; n++) {
                            if (boardAdditions.charAt(n) != "-" && validPossibilities[m].charAt(n) != boardAdditions.charAt(n)) {
                                boardAdditions = Board.setCharAt(boardAdditions, n, "-");
                            }
                        }
                    }
                    if (boardAdditions != row) {
                        didSomething = true;
                        Board.writeStringToLocation(board, i, 0, boardAdditions, true);
                    }
                }
            }
        }
        // repeat for cols
        testBoard = JSON.parse(JSON.stringify(board));
        for (var i = 0; i < board.length; i++) {
            var col = "";
            var idx = -1;
            var matches = [];
            for (var j = 0; j < board[0].length; j++) {
                if (board[j][i] == -1) {
                    col += "-";
                }
                else {
                    col += board[j][i];
                }
            }
            if (col.includes("-")) {
                var numEmpty = (col.split("-").length - 1);
                var possibilities = Board.getPermutations(numEmpty);
                var validPossibilities = [];
                var testString = "";
                // try all possibilities and record ones that make a valid board
                for (var k = 0; k < possibilities.length; k++) {
                    testString = Board.fillBlanks(col, possibilities[k]);
                    if (Board.lineStringHasError(testString)) {
                        continue;
                    }
                    Board.writeStringToLocation(testBoard, 0, i, testString, false);
                    if (!Board.hasErrorArg(testBoard)) {
                        validPossibilities.push(testString);
                    }
                    Board.writeStringToLocation(testBoard, 0, i, col, false);
                }
                if (validPossibilities.length != 0) {
                    // find any values that are shared between all valid possibilities
                    var boardAdditions = validPossibilities[0];
                    for (var m = 1; m < validPossibilities.length; m++) {
                        for (var n = 0; n < validPossibilities[m].length; n++) {
                            if (boardAdditions.charAt(n) != "-" && validPossibilities[m].charAt(n) != boardAdditions.charAt(n)) {
                                boardAdditions = Board.setCharAt(boardAdditions, n, "-");
                            }
                        }
                    }
                    if (boardAdditions != col) {
                        didSomething = true;
                        Board.writeStringToLocation(board, 0, i, boardAdditions, false);
                    }
                }
            }
        }
        return didSomething;
    };
    /* ------------------------------------------------------ */
    /*                     MISC. HELPERS                      */
    /* ------------------------------------------------------ */
    Board.prototype.random = function () {
        var x = Math.sin(++this.seed) * 10000;
        return x - Math.floor(x);
    };
    /* ------------------------------------------------------ */
    Board.canAccess = function (board, i, j) {
        return ((i >= 0 && i < board.length) &&
            (j >= 0 && j < board[i].length));
    };
    /* ------------------------------------------------------ */
    Board.sameVal = function (board, i1, j1, i2, j2) {
        return (board[i1][j1] == board[i2][j2] && board[i1][j1] != -1);
    };
    /* ------------------------------------------------------ */
    Board.negate = function (board, i, j) {
        if (board[i][j] == 0) {
            return 1;
        }
        else if (board[i][j] == 1) {
            return 0;
        }
        else {
            return -1;
        }
    };
    /* ------------------------------------------------------ */
    Board.setCharAt = function (str, index, chr) {
        if (index > str.length - 1) {
            return str;
        }
        ;
        return str.substr(0, index) + chr + str.substr(index + 1);
    };
    /* ------------------------------------------------------ */
    Board.lineStringHasError = function (str) {
        var numZeroes = (str.split("0").length - 1);
        var numOnes = (str.split("1").length - 1);
        return (str.includes("000") ||
            str.includes("111") ||
            numZeroes > str.length / 2 ||
            numOnes > str.length / 2);
    };
    /* ------------------------------------------------------ */
    Board.getPermutations = function (n) {
        if (n < 2) {
            return [];
        }
        var i = 0;
        var b = i.toString(2);
        var result = [];
        while (b.length <= n) {
            // prepend zeroes
            if (b.length < n) {
                b = (new Array((n - b.length) + 1).join("0")) + b;
            }
            result.push(b);
            b = (++i).toString(2);
        }
        return result;
    };
    /* ------------------------------------------------------ */
    Board.writeStringToLocation = function (board, i, j, str, toRow) {
        for (var ii = 0; ii < str.length; ii++) {
            var writeChar = str.charAt(ii);
            if (writeChar == "-") {
                writeChar = "-1";
            }
            writeChar = parseInt(writeChar);
            if (!toRow && Board.canAccess(board, i + ii, j)) {
                board[i + ii][j] = writeChar;
            }
            else if (toRow && Board.canAccess(board, i, j + ii)) {
                board[i][j + ii] = writeChar;
            }
        }
    };
    /* ------------------------------------------------------ */
    Board.fillBlanks = function (mainStr, fillStr) {
        var result = "";
        var fillIdx = 0;
        for (var i = 0; i < mainStr.length; i++) {
            if (mainStr.charAt(i) == "-") {
                result += fillStr.charAt(fillIdx);
                fillIdx++;
            }
            else {
                result += mainStr.charAt(i);
            }
        }
        return result;
    };
    return Board;
}());



/***/ }),

/***/ "./src/app/services/boards/thermometers/board.service.ts":
/*!***************************************************************!*\
  !*** ./src/app/services/boards/thermometers/board.service.ts ***!
  \***************************************************************/
/*! exports provided: Board, Thermometer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Board", function() { return Board; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Thermometer", function() { return Thermometer; });
var Board = /** @class */ (function () {
    function Board(width, height, seed) {
        this.width = width + 1;
        this.height = height + 1;
        this.seed = seed;
    }
    Board.prototype.generateBoard = function () {
        this.thermometers = [];
        this.bottomLegends = [];
        this.sideLegends = [];
        var realWidth = this.width - 1;
        var realHeight = this.height - 1;
        // 0 - Down
        // 1 - Up
        // 2 - Left
        // 3 - Right
        //
        var numSkips = 0;
        //while(!this.isFull()) {
        while (numSkips < 200 && !this.isFull()) {
            var tile = this.getRandomEmptyTile();
            var dir = Math.floor(this.random() * 4);
            var added = false;
            if (dir == 0) {
                if (tile.y <= realHeight - 1) {
                    var length = Math.floor(this.random() * ((realHeight - 1) - tile.y)) + 2;
                    var filledAmount = Math.floor(this.random() * (length + 1));
                    var add = true;
                    for (var h = 0; h < length; h++) {
                        if (this.getThermometerAt(tile.x, tile.y + h) != null) {
                            add = false;
                            break;
                        }
                    }
                    if (add) {
                        added = true;
                        this.thermometers.push(new Thermometer(tile.x, tile.y, length, dir, filledAmount));
                    }
                }
            }
            else if (dir == 1) {
                if (tile.y >= 2) {
                    var length = Math.floor(this.random() * (tile.y - 2)) + 2;
                    var filledAmount = Math.floor(this.random() * (length + 1));
                    var add = true;
                    for (var h = 0; h < length; h++) {
                        if (this.getThermometerAt(tile.x, tile.y - h) != null) {
                            add = false;
                            break;
                        }
                    }
                    if (add) {
                        added = true;
                        this.thermometers.push(new Thermometer(tile.x, tile.y, length, dir, filledAmount));
                    }
                }
            }
            else if (dir == 2) {
                if (tile.x >= 2) {
                    var length = Math.floor(this.random() * (tile.x - 2)) + 2;
                    var filledAmount = Math.floor(this.random() * (length + 1));
                    var add = true;
                    for (var h = 0; h < length; h++) {
                        if (this.getThermometerAt(tile.x - h, tile.y) != null) {
                            add = false;
                            break;
                        }
                    }
                    if (add) {
                        added = true;
                        this.thermometers.push(new Thermometer(tile.x, tile.y, length, dir, filledAmount));
                    }
                }
            }
            else if (dir == 3) {
                if (tile.x <= realWidth - 1) {
                    var length = Math.floor(this.random() * ((realWidth - 1) - tile.x)) + 2;
                    var filledAmount = Math.floor(this.random() * (length + 1));
                    var add = true;
                    for (var h = 0; h < length; h++) {
                        if (this.getThermometerAt(tile.x + h, tile.y) != null) {
                            add = false;
                            break;
                        }
                    }
                    if (add) {
                        added = true;
                        this.thermometers.push(new Thermometer(tile.x, tile.y, length, dir, filledAmount));
                    }
                }
            }
            if (!added) {
                numSkips++;
            }
        }
        //}
        // Set legends
        for (var i = 0; i < this.width - 1; i++) {
            var count = 0;
            for (var j = 0; j < this.height - 1; j++) {
                if (this.isFilled(i + 1, j + 1)) {
                    count++;
                }
            }
            this.bottomLegends.push(count);
        }
        for (var j = 0; j < this.height - 1; j++) {
            var count = 0;
            for (var i = 0; i < this.width - 1; i++) {
                if (this.isFilled(i + 1, j + 1)) {
                    count++;
                }
            }
            this.sideLegends.push(count);
        }
        if (this.bottomLegends.reduce(this.add) < (this.width * 1.5) ||
            this.sideLegends.reduce(this.add) < (this.height * 1.5)) {
            this.generateBoard();
        }
        // Empty thermometers
        for (var k = 0; k < this.thermometers.length; k++) {
            this.thermometers[k].filledAmount = 0;
        }
    };
    Board.prototype.getRandomEmptyTile = function () {
        var x = Math.floor(this.random() * (this.width - 1)) + 1;
        var y = Math.floor(this.random() * (this.height - 1)) + 1;
        while (this.getThermometerAt(x, y) != null) {
            x = Math.floor(this.random() * (this.width - 1)) + 1;
            y = Math.floor(this.random() * (this.height - 1)) + 1;
        }
        return {
            x: x,
            y: y
        };
    };
    Board.prototype.add = function (a, b) {
        return a + b;
    };
    Board.prototype.isFull = function () {
        for (var i = 0; i < this.width - 1; i++) {
            for (var j = 0; j < this.height - 1; j++) {
                if (this.getThermometerAt(i + 1, j + 1) == null) {
                    return false;
                }
            }
        }
        return true;
    };
    Board.prototype.isSolved = function () {
        for (var i = 0; i < this.width - 1; i++) {
            var count = 0;
            for (var j = 0; j < this.height - 1; j++) {
                if (this.isFilled(i + 1, j + 1)) {
                    count++;
                }
            }
            if (count != this.bottomLegends[i]) {
                return false;
            }
        }
        for (var j = 0; j < this.height - 1; j++) {
            var count = 0;
            for (var i = 0; i < this.width - 1; i++) {
                if (this.isFilled(i + 1, j + 1)) {
                    count++;
                }
            }
            if (count != this.sideLegends[j]) {
                return false;
            }
        }
        return true;
    };
    Board.prototype.isFilled = function (x, y) {
        var thermometer = this.getThermometerAt(x, y);
        if (thermometer != null) {
            return thermometer.isFilledTo(x, y);
        }
        return false;
    };
    Board.prototype.getThermometerAt = function (x, y) {
        for (var i = 0; i < this.thermometers.length; i++) {
            if (this.thermometers[i].livesIn(x, y)) {
                return this.thermometers[i];
            }
        }
        return null;
    };
    Board.prototype.click = function (x, y) {
        var thermometer = this.getThermometerAt(x, y);
        if (thermometer != null) {
            thermometer.fillTo(x, y);
        }
    };
    Board.prototype.random = function () {
        var x = Math.sin(++this.seed) * 10000;
        return x - Math.floor(x);
    };
    Board.prototype.bottomLegendValid = function (i) {
        var count = 0;
        for (var j = 0; j < this.height - 1; j++) {
            if (this.isFilled(i + 1, j + 1)) {
                count++;
            }
        }
        if (count < this.bottomLegends[i]) {
            return 0;
        }
        else if (count > this.bottomLegends[i]) {
            return -1;
        }
        return 1;
    };
    Board.prototype.sideLegendValid = function (j) {
        var count = 0;
        for (var i = 0; i < this.width - 1; i++) {
            if (this.isFilled(i + 1, j + 1)) {
                count++;
            }
        }
        if (count < this.sideLegends[j]) {
            return 0;
        }
        else if (count > this.sideLegends[j]) {
            return -1;
        }
        return 1;
    };
    return Board;
}());

var Thermometer = /** @class */ (function () {
    function Thermometer(x, y, length, direction, filledAmount) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.direction = direction;
        this.filledAmount = filledAmount;
    }
    Thermometer.prototype.livesIn = function (paramX, paramY) {
        if (this.direction == 0) {
            //DOWN
            return (paramX == this.x) &&
                (paramY >= this.y) &&
                (paramY < this.y + this.length);
        }
        else if (this.direction == 1) {
            //UP
            return (paramX == this.x) &&
                (paramY <= this.y) &&
                (paramY > this.y - this.length);
        }
        else if (this.direction == 2) {
            //LEFT
            return (paramY == this.y) &&
                (paramX <= this.x) &&
                (paramX > this.x - this.length);
        }
        else if (this.direction == 3) {
            //RIGHT
            return (paramY == this.y) &&
                (paramX >= this.x) &&
                (paramX < this.x + this.length);
        }
    };
    Thermometer.prototype.fillTo = function (paramX, paramY) {
        var diff = Math.abs(this.x - paramX) + Math.abs(this.y - paramY);
        if (this.filledAmount >= diff + 1) {
            this.filledAmount = diff;
        }
        else {
            this.filledAmount = diff + 1;
        }
    };
    Thermometer.prototype.isFilledTo = function (paramX, paramY) {
        var diff = Math.abs(this.x - paramX) + Math.abs(this.y - paramY);
        return this.filledAmount >= diff + 1;
    };
    return Thermometer;
}());



/***/ }),

/***/ "./src/app/services/boards/tile-game/board.service.ts":
/*!************************************************************!*\
  !*** ./src/app/services/boards/tile-game/board.service.ts ***!
  \************************************************************/
/*! exports provided: Board */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Board", function() { return Board; });
var Board = /** @class */ (function () {
    function Board(width, height, seed) {
        this.NUM_SWITCHES = 1000;
        this.emptyX = 0;
        this.emptyY = 0;
        this.width = width;
        this.height = height;
        this.seed = seed;
    }
    Board.prototype.generateBoard = function () {
        this.emptyX = this.width - 1;
        this.emptyY = this.height - 1;
        var rows = [];
        // First generate the board in its solved state
        for (var i = 0; i < this.height; i++) {
            var column = [];
            for (var j = 0; j < this.width; j++) {
                column.push(1 + j + ((i * this.width)));
            }
            rows.push(column);
        }
        this.tilePuzzle = rows;
        this.tilePuzzle[this.height - 1][this.width - 1] = 0;
        // Algorithm credit - ben1996123
        var swapCounter = 0;
        for (var j = 0; j < this.height; j++) {
            for (var i = 0; i < this.width; i++) {
                if (i == this.width - 1 && j == this.height - 1) {
                    continue;
                }
                var swap = this.getRandomTile(i, j); // Returns tile greater than or equal to this index
                // Excludes the tile that contains 0
                var initial = this.tilePuzzle[j][i];
                var newVal = this.tilePuzzle[swap['y']][swap['x']];
                if (newVal != initial) {
                    this.tilePuzzle[j][i] = newVal;
                    this.tilePuzzle[swap.y][swap.x] = initial;
                    swapCounter++;
                }
            }
        }
        // Avoid parity, if we've swapped an odd number of times, swap once more
        if (swapCounter % 2 == 1) {
            var initial = this.tilePuzzle[this.height - 1][this.width - 2];
            var newVal = this.tilePuzzle[this.height - 1][this.width - 3];
            this.tilePuzzle[this.height - 1][this.width - 2] = newVal;
            this.tilePuzzle[this.height - 1][this.width - 3] = initial;
        }
        var up = Math.floor(this.random() * (this.height));
        var left = Math.floor(this.random() * (this.width));
        for (var x = 0; x < up; x++) {
            this.moveUp();
        }
        for (var x = 0; x < left; x++) {
            this.moveLeft();
        }
    };
    Board.prototype.convertXYToVal = function (x, y) {
        return (y * this.width) + (x + 1);
    };
    Board.prototype.getRandomTile = function (x, y) {
        var val = this.convertXYToVal(x, y);
        var randVal = Math.floor(this.random() * ((this.width * this.height) - val)) + val;
        var randY = Math.floor((randVal - 1) / this.width);
        var randX = (randVal - 1) % this.width;
        var m = {
            x: randX,
            y: randY
        };
        return m;
    };
    Board.prototype.numTilesInCorrectPosition = function () {
        var toReturn = 0;
        for (var j = 0; j < this.height; j++) {
            for (var i = 0; i < this.width; i++) {
                var val = this.tilePuzzle[j][i];
                if (val == (i + 1) + (j * this.width) && val != 0) {
                    toReturn++;
                }
            }
        }
        return toReturn;
    };
    Board.prototype.switchTiles = function () {
        var validDirections = this.getValidDirections();
        var dir = validDirections[Math.floor(this.random() * validDirections.length)];
        switch (dir) {
            // UP
            case (0):
                this.moveUp();
                break;
            // DOWN
            case (1):
                this.moveDown();
                break;
            // LEFT
            case (2):
                this.moveLeft();
                break;
            // RIGHT
            case (3):
                this.moveRight();
                break;
        }
    };
    Board.prototype.getValidDirections = function () {
        //                       U  D  L  R
        //var validDirections = [0, 1, 2, 3];
        var validDirections = [];
        if (this.emptyY != 0) {
            validDirections.push(0);
        }
        if (this.emptyY != this.height - 1) {
            validDirections.push(1);
        }
        if (this.emptyX != 0) {
            validDirections.push(2);
        }
        if (this.emptyX != this.width - 1) {
            validDirections.push(3);
        }
        return validDirections;
    };
    Board.prototype.moveUp = function () {
        this.tilePuzzle[this.emptyY][this.emptyX] = this.tilePuzzle[this.emptyY - 1][this.emptyX];
        this.tilePuzzle[this.emptyY - 1][this.emptyX] = 0;
        this.emptyY--;
    };
    Board.prototype.moveDown = function () {
        this.tilePuzzle[this.emptyY][this.emptyX] = this.tilePuzzle[this.emptyY + 1][this.emptyX];
        this.tilePuzzle[this.emptyY + 1][this.emptyX] = 0;
        this.emptyY++;
    };
    Board.prototype.moveLeft = function () {
        this.tilePuzzle[this.emptyY][this.emptyX] = this.tilePuzzle[this.emptyY][this.emptyX - 1];
        this.tilePuzzle[this.emptyY][this.emptyX - 1] = 0;
        this.emptyX--;
    };
    Board.prototype.moveRight = function () {
        this.tilePuzzle[this.emptyY][this.emptyX] = this.tilePuzzle[this.emptyY][this.emptyX + 1];
        this.tilePuzzle[this.emptyY][this.emptyX + 1] = 0;
        this.emptyX++;
    };
    Board.prototype.moveTile = function (x, y) {
        if (x - 1 == this.emptyX && y == this.emptyY) {
            this.moveRight();
        }
        else if (x + 1 == this.emptyX && y == this.emptyY) {
            this.moveLeft();
        }
        else if (x == this.emptyX && y + 1 == this.emptyY) {
            this.moveUp();
        }
        else if (x == this.emptyX && y - 1 == this.emptyY) {
            this.moveDown();
        }
    };
    Board.prototype.isSolved = function () {
        for (var j = 0; j < this.height; j++) {
            for (var i = 0; i < this.width; i++) {
                var val = this.tilePuzzle[j][i];
                if (val != (i + 1) + (j * this.width) && val != 0) {
                    return false;
                }
            }
        }
        return true;
    };
    Board.prototype.random = function () {
        var x = Math.sin(++this.seed) * 10000;
        return x - Math.floor(x);
    };
    return Board;
}());



/***/ }),

/***/ "./src/app/services/colors/color.service.ts":
/*!**************************************************!*\
  !*** ./src/app/services/colors/color.service.ts ***!
  \**************************************************/
/*! exports provided: ColorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorService", function() { return ColorService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ColorService = /** @class */ (function () {
    function ColorService() {
    }
    ColorService.prototype.getColorScheme = function () {
        // TODO - check user preferred theme
        if (true) {
            var m = {
                BACKGROUND: '#2C2C2C',
                GRID: '#A89984',
                FOREGROUND: '#FFF2AD',
                COLOR_0: '#4DB93B',
                COLOR_1: '#AAD46D',
                COLOR_1_ALT: '#D1F898',
                COLOR_2: '#80DAAF',
                COLOR_2_ALT: '#A5FAD1',
                COLOR_3: '#4BB5AC',
                COLOR_3_ALT: '#84E8DE',
                COLOR_4: '#FFBA53',
                COLOR_4_ALT: '#FFD79D',
                COLOR_5: '#D88799',
                COLOR_5_ALT: '#F8ABBD',
                COLOR_6: '#F24B3E',
                COLOR_6_ALT: '#FF9289',
                COLOR_7: '#DC1D2B',
                COLOR_7_ALT: '#F86872',
                COLOR_8: '#EC2474',
                COLOR_8_ALT: '#FF77AD'
            };
            return m;
        }
        // Colorblind
        else { var m; }
    };
    ColorService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], ColorService);
    return ColorService;
}());



/***/ }),

/***/ "./src/app/services/games/game-data.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/services/games/game-data.service.ts ***!
  \*****************************************************/
/*! exports provided: GameDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameDataService", function() { return GameDataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../enums/game-id.enum */ "./src/app/enums/game-id.enum.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GameDataService = /** @class */ (function () {
    function GameDataService() {
    }
    GameDataService.games = [
        { 'GameID': _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_1__["GameID"].MINESWEEPER,
            'Name': 'Minesweeper',
            'Image': 'assets/images/game-splashes/minesweeper.svg',
            'Description': 'Minesweeper is a single-player puzzle video game. The objective of the game is to clear a rectangular board containing hidden mines.' },
        { 'GameID': _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_1__["GameID"].HASHI,
            'Name': 'Hashi',
            'Image': 'assets/images/game-splashes/hashi.svg',
            'Description': 'Hashi (Hashiwokakero) also known as Bridges is a logic puzzle with simple rules and challenging solutions.' },
        { 'GameID': _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_1__["GameID"].TAKUZU,
            'Name': 'Takuzu',
            'Image': 'assets/images/game-splashes/takuzu.svg',
            'Description': 'Takuzu is a logic-based number placement puzzle. The objective is to fill a (usually 10×10) grid with 1s and 0s.' },
        { 'GameID': _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_1__["GameID"].TILE_GAME,
            'Name': 'Tile Game',
            'Image': 'assets/images/game-splashes/tilegame.svg',
            'Description': 'Tile game is a common puzzle where the user slides tiles into the correct order.' },
        { 'GameID': _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_1__["GameID"].SUDOKU,
            'Name': 'Sudoku',
            'Image': 'assets/images/game-splashes/sudoku.svg',
            'Description': 'A classic puzzle game where you must fill out the board with numbers 1-9.' },
        {
            'GameID': _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_1__["GameID"].THERMOMETERS,
            'Name': 'Thermometers',
            'Image': 'assets/images/game-splashes/thermometers.svg',
            'Description': 'A New York Times classic where you must fill up thermometers to a certain amount.'
        },
        {
            'GameID': _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_1__["GameID"].NONOGRAMS,
            'Name': 'Nonograms',
            'Image': 'assets/images/game-splashes/nonograms.svg',
            'Description': 'Nonograms are picture logic puzzles in which cells in a grid must be colored according to numbers at the side of the grid to reveal a hidden picture.'
        }
    ];
    GameDataService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], GameDataService);
    return GameDataService;
}());



/***/ }),

/***/ "./src/app/services/games/game-list-all.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/services/games/game-list-all.service.ts ***!
  \*********************************************************/
/*! exports provided: GameListAllService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameListAllService", function() { return GameListAllService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _classes_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/game */ "./src/app/classes/game.ts");
/* harmony import */ var _classes_game_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../classes/game-list */ "./src/app/classes/game-list.ts");
/* harmony import */ var _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../enums/game-id.enum */ "./src/app/enums/game-id.enum.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GameListAllService = /** @class */ (function (_super) {
    __extends(GameListAllService, _super);
    function GameListAllService() {
        return _super.call(this) || this;
    }
    GameListAllService_1 = GameListAllService;
    GameListAllService.getGameById = function (id) {
        for (var _i = 0, _a = GameListAllService_1.games; _i < _a.length; _i++) {
            var g = _a[_i];
            if (g.id === id) {
                return g;
            }
        }
        return null;
    };
    var GameListAllService_1;
    GameListAllService.games = [
        new _classes_game__WEBPACK_IMPORTED_MODULE_1__["Game"](_enums_game_id_enum__WEBPACK_IMPORTED_MODULE_3__["GameID"].SUDOKU, 'Sudoku', 'sudoku', 'sudoku.svg', 'A classic puzzle game where you must fill out the board with numbers 1-9.', 'Each of the nine blocks must contain the numbers 1-9 in its squares. ' +
            'Each number can only appear once in a row, column, or box.', 'Hover over a box and input 1-9 on the keyboard, input a 0 to clear a box'),
        new _classes_game__WEBPACK_IMPORTED_MODULE_1__["Game"](_enums_game_id_enum__WEBPACK_IMPORTED_MODULE_3__["GameID"].TAKUZU, 'Takuzu', 'takuzu', 'takuzu.svg', 'Takuzu is a logic-based number placement puzzle. The objective is to fill a ' +
            '(usually 10×10) grid with 1s and 0s.', 'The objective is to fill a grid with 1s and 0s, where there is an equal number of ' +
            '1s and 0s in each row and column and no more than two of either number adjacent to ' +
            'each other. Additionally, there can be no identical rows or columns.', 'Left/Right click'),
        new _classes_game__WEBPACK_IMPORTED_MODULE_1__["Game"](_enums_game_id_enum__WEBPACK_IMPORTED_MODULE_3__["GameID"].NONOGRAMS, 'Nonograms', 'nonograms', 'nonograms.svg', 'Nonograms are picture logic puzzles in which cells in a grid must be colored according ' +
            'to numbers at the side of the grid to reveal a hidden picture.', 'Google it you goof.', 'Left click on a tile to mark it.'),
        new _classes_game__WEBPACK_IMPORTED_MODULE_1__["Game"](_enums_game_id_enum__WEBPACK_IMPORTED_MODULE_3__["GameID"].THERMOMETERS, 'Thermometers', 'thermometers', 'thermometers.svg', 'A New York Times classic where you must fill up thermometers to a certain amount.', 'The numbers in the rows/columns indicate the amount of fluid that must be present in ' +
            'that given row/column.', 'Click anywhere on the thermometer to insert fluid.'),
        new _classes_game__WEBPACK_IMPORTED_MODULE_1__["Game"](_enums_game_id_enum__WEBPACK_IMPORTED_MODULE_3__["GameID"].HASHI, 'Hashi', 'hashi', 'hashi.svg', 'Hashi (Hashiwokakero) also known as Bridges is a logic puzzle with simple rules and ' +
            'challenging solutions.', 'The goal is to connect all of the islands into a single connected group by ' +
            'drawing a series of bridges between the islands. The number of bridges coming off of ' +
            'an island must match the number written on that island.', 'Click and drag from an island to build a bridge.'),
        new _classes_game__WEBPACK_IMPORTED_MODULE_1__["Game"](_enums_game_id_enum__WEBPACK_IMPORTED_MODULE_3__["GameID"].TILE_GAME, 'Tile Game', 'tilegame', 'tilegame.svg', 'Tile game is a common puzzle where the user slides tiles into the correct order.', 'Order the numbers in sequential order from left to right, top to bottom', 'Arrow Keys or WASD'),
        new _classes_game__WEBPACK_IMPORTED_MODULE_1__["Game"](_enums_game_id_enum__WEBPACK_IMPORTED_MODULE_3__["GameID"].MINESWEEPER, 'Minesweeper', 'minesweeper', 'minesweeper.svg', 'Minesweeper is a single-player puzzle video game. The objective of the game is to ' +
            'clear a rectangular board containing hidden mines.', 'The objective of the game is to clear a rectangular board containing hidden mines ' +
            'without detonating any of them.', '')
    ];
    GameListAllService = GameListAllService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], GameListAllService);
    return GameListAllService;
}(_classes_game_list__WEBPACK_IMPORTED_MODULE_2__["GameList"]));



/***/ }),

/***/ "./src/app/services/games/options.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/games/options.service.ts ***!
  \***************************************************/
/*! exports provided: OptionsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsService", function() { return OptionsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/BehaviorSubject */ "./node_modules/rxjs-compat/_esm5/BehaviorSubject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OptionsService = /** @class */ (function () {
    function OptionsService() {
        this._gameID = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](0);
        this.gameID = this._gameID.asObservable();
        this._seed = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](0);
        this.seed = this._seed.asObservable();
        this._difficulty = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](0);
        this.difficulty = this._difficulty.asObservable();
        this._hotkeys = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
        this.hotkeys = this._hotkeys.asObservable();
        this._options = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
        this.options = this._options.asObservable();
        this._takingNotesMode = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
        this.takingNotesMode = this._takingNotesMode.asObservable();
        this._takingNotes = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
        this.takingNotes = this._takingNotes.asObservable();
        this._personalBestMonthly = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]('');
        this.personalBestMonthly = this._personalBestMonthly.asObservable();
        this._personalBestWeekly = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]('');
        this.personalBestWeekly = this._personalBestWeekly.asObservable();
        this._personalBestDaily = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]('');
        this.personalBestDaily = this._personalBestDaily.asObservable();
        this._optionEvent = new rxjs_BehaviorSubject__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]('');
        this.optionEvent = this._optionEvent.asObservable();
    }
    OptionsService.prototype.setGameID = function (gameID) {
        this._gameID.next(gameID);
    };
    OptionsService.prototype.setSeed = function (seed) {
        this._seed.next(seed);
    };
    OptionsService.prototype.setDifficulty = function (difficulty) {
        this._difficulty.next(difficulty);
    };
    OptionsService.prototype.setHotkeys = function (hotkeys) {
        this._hotkeys.next(hotkeys);
    };
    OptionsService.prototype.setOptions = function (options) {
        this._options.next(options);
    };
    OptionsService.prototype.setTakingNotesMode = function (takingNotesMode) {
        this._takingNotesMode.next(takingNotesMode);
    };
    OptionsService.prototype.setTakingNotes = function (takingNotes) {
        this._takingNotes.next(takingNotes);
    };
    OptionsService.prototype.setPersonalBestMonthly = function (personalBestMonthly) {
        this._personalBestMonthly.next(personalBestMonthly);
    };
    OptionsService.prototype.setPersonalBestWeekly = function (personalBestWeekly) {
        this._personalBestWeekly.next(personalBestWeekly);
    };
    OptionsService.prototype.setPersonalBestDaily = function (personalBestDaily) {
        this._personalBestDaily.next(personalBestDaily);
    };
    OptionsService.prototype.setOptionEvent = function (optionEvent) {
        this._optionEvent.next(optionEvent);
    };
    OptionsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], OptionsService);
    return OptionsService;
}());



/***/ }),

/***/ "./src/app/services/generators/game-starter.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/services/generators/game-starter.service.ts ***!
  \*************************************************************/
/*! exports provided: GameStarterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameStarterService", function() { return GameStarterService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../enums/game-id.enum */ "./src/app/enums/game-id.enum.ts");
/* harmony import */ var _user_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user/user.service */ "./src/app/services/user/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GameStarterService = /** @class */ (function () {
    function GameStarterService() {
    }
    GameStarterService.startGame = function (that) {
        var _this = this;
        that.loader.startLoadingAnimation();
        that.solved = true;
        this.customSeed = Number(that.route.snapshot.paramMap.get('seed'));
        if (that.userService.isLoggedIn()) {
            this.loadBestTimes(that);
            if (this.customSeed == 0) {
                that.timer.startTimer(that.gameID, that.difficulty)
                    .subscribe(function (data) {
                    _this.loadGame(that, data['seed']);
                });
            }
            else {
                this.loadGame(that, this.customSeed);
            }
        }
        else {
            if (this.customSeed == 0) {
                this.loadGame(that, Math.floor(Math.random() * (2000000000)));
            }
            else {
                this.loadGame(that, this.customSeed);
            }
        }
    };
    GameStarterService.done = function (that) {
        if (that.userService.isLoggedIn() && !that.solved && this.customSeed == 0) {
            that.timer.stopTimer(that.seed, that.gameID, that.difficulty, 'TODO - Board Solution String')
                .subscribe(function (data) {
                _user_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"].addXp(data['XPGain']);
                if (data['Daily']) {
                    that.personalBestDaily = data['TimeElapsed'];
                }
                if (data['Weekly']) {
                    that.personalBestWeekly = data['TimeElapsed'];
                }
                if (data['Monthly']) {
                    that.personalBestMonthly = data['TimeElapsed'];
                }
                var display = document.getElementById("timer");
                display.textContent = data['TimeElapsed'];
            });
        }
        else {
            // Do nothing - we're not logged in
        }
        that.solved = true;
    };
    GameStarterService.loadGame = function (that, seed) {
        that.seed = seed;
        that.board.seed = that.seed;
        that.board.generateBoard();
        if (that.gameID == _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_1__["GameID"].MINESWEEPER) {
            that.lose = false;
            that.firstPress = true;
        }
        else if (that.gameID == _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_1__["GameID"].SUDOKU) {
            that.notes = {};
        }
        if (that.solved) {
            that.solved = false;
            that.startDate = new Date();
            that.displayTimer();
        }
        else {
            that.startDate = new Date();
        }
        that.fixSizes();
        that.loader.stopLoadingAnimation();
        if (that.gameID == _enums_game_id_enum__WEBPACK_IMPORTED_MODULE_1__["GameID"].MINESWEEPER) {
            that.imgFlag.onload = function () {
                that.draw();
            };
        }
        else {
            that.draw();
        }
    };
    GameStarterService.loadBestTimes = function (that) {
        var m = {
            GameID: that.gameID,
            Difficulty: that.difficulty
        };
        that.tunnel.getPersonalBest(m)
            .subscribe(function (data) {
            that.personalBestDaily = data['daily'];
            that.personalBestWeekly = data['weekly'];
            that.personalBestMonthly = data['monthly'];
        });
    };
    GameStarterService.newGame = function (that) {
        var _this = this;
        that.loader.startLoadingAnimation();
        this.customSeed = 0;
        if (that.userService.isLoggedIn()) {
            that.timer.startTimer(that.gameID, that.difficulty)
                .subscribe(function (data) {
                _this.loadGame(that, data['seed']);
            });
        }
        else {
            this.loadGame(that, Math.floor(Math.random() * (2000000000)));
        }
    };
    GameStarterService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], GameStarterService);
    return GameStarterService;
}());



/***/ }),

/***/ "./src/app/services/header-interceptor/header-interceptor.service.ts":
/*!***************************************************************************!*\
  !*** ./src/app/services/header-interceptor/header-interceptor.service.ts ***!
  \***************************************************************************/
/*! exports provided: HeaderInterceptorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderInterceptorService", function() { return HeaderInterceptorService; });
var HeaderInterceptorService = /** @class */ (function () {
    function HeaderInterceptorService() {
    }
    HeaderInterceptorService.prototype.intercept = function (req, next) {
        // Clone the request to add the new header
        var clonedRequest = req.clone({ headers: req.headers.set('PuzzleHubToken', this.getCookie('PuzzleHubToken')) });
        // Pass the cloned request instead of the original request to the next handle
        return next.handle(clonedRequest);
    };
    HeaderInterceptorService.prototype.getCookie = function (cookieName) {
        var name = cookieName + '=';
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length + 1, cookie.length);
            }
        }
        return "";
    };
    return HeaderInterceptorService;
}());



/***/ }),

/***/ "./src/app/services/loading-service/loader.service.ts":
/*!************************************************************!*\
  !*** ./src/app/services/loading-service/loader.service.ts ***!
  \************************************************************/
/*! exports provided: LoaderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderService", function() { return LoaderService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoaderService = /** @class */ (function () {
    function LoaderService() {
        this.loading = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    LoaderService.prototype.startLoadingAnimation = function () {
        this.loading.next(true);
    };
    LoaderService.prototype.stopLoadingAnimation = function () {
        this.loading.next(false);
    };
    LoaderService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], LoaderService);
    return LoaderService;
}());



/***/ }),

/***/ "./src/app/services/persistence/settings.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/services/persistence/settings.service.ts ***!
  \**********************************************************/
/*! exports provided: SettingsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsService", function() { return SettingsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SettingsService = /** @class */ (function () {
    function SettingsService() {
    }
    SettingsService.getDataStr = function (name) {
        var toReturn = localStorage.getItem(name);
        if (toReturn == null) {
            return this.defaults[name];
        }
        else {
            return toReturn;
        }
    };
    SettingsService.getDataNum = function (name) {
        var toReturn = localStorage.getItem(name);
        if (toReturn == null) {
            return this.defaults[name];
        }
        else {
            return Number(toReturn);
        }
    };
    SettingsService.getDataBool = function (name) {
        var toReturn = localStorage.getItem(name);
        if (toReturn == null) {
            return this.defaults[name];
        }
        else {
            return toReturn == 'true';
        }
    };
    SettingsService.storeData = function (name, value) {
        localStorage.setItem(name, '' + value);
    };
    SettingsService.defaults = {
        "takuzuGrid": true,
        "takuzuInvert": false,
        "tileAnimations": true,
        "selectedGameID": 5,
        "selectedLeaderboard": 0,
        "selectedLeaderboardDifficulty": 0,
        "rulesMinimized": true,
        "optionsMinimized": true,
        "controlsMinimized": true,
        "highscoresMinimized": false,
        "timerMinimized": false,
        "hotkeysMinimized": true,
        "HoverTileGame": false,
        "TileGameUP": 83,
        "TileGameDOWN": 87,
        "TileGameLEFT": 68,
        "TileGameRIGHT": 65,
        "StaticTileSize": false,
        "TileGameColorScheme": 'Fringe'
    };
    SettingsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], SettingsService);
    return SettingsService;
}());



/***/ }),

/***/ "./src/app/services/timer/timer.service.ts":
/*!*************************************************!*\
  !*** ./src/app/services/timer/timer.service.ts ***!
  \*************************************************/
/*! exports provided: TimerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimerService", function() { return TimerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TimerService = /** @class */ (function () {
    function TimerService(tunnel) {
        this.tunnel = tunnel;
    }
    TimerService.prototype.startTimer = function (GameID, Difficulty) {
        var m = {
            'GameID': GameID,
            'Difficulty': Difficulty
        };
        return this.tunnel.startTimer(m);
    };
    TimerService.prototype.stopTimer = function (Seed, GameID, Difficulty, Solution) {
        var m = {
            'Seed': Seed,
            'GameID': GameID,
            'Difficulty': Difficulty,
            'BoardSolution': Solution
        };
        return this.tunnel.stopTimer(m);
    };
    TimerService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_1__["TunnelService"]])
    ], TimerService);
    return TimerService;
}());



/***/ }),

/***/ "./src/app/services/tunnel/tunnel.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/tunnel/tunnel.service.ts ***!
  \***************************************************/
/*! exports provided: TunnelService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TunnelService", function() { return TunnelService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TunnelService = /** @class */ (function () {
    function TunnelService(http) {
        this.http = http;
        this.ipAddress = 'https://puzzle-hub.com/api';
    }
    TunnelService.prototype.getLevel = function () {
        return this.http.get(this.ipAddress + '/getLevel');
    };
    TunnelService.prototype.getMoreMatchHistory = function (model) {
        return this.http.post(this.ipAddress + '/getMoreMatchHistory', model);
    };
    TunnelService.prototype.getProfileData = function (model) {
        return this.http.post(this.ipAddress + '/getProfileData', model);
    };
    TunnelService.prototype.getUsername = function () {
        return this.http.get(this.ipAddress + '/getUsername');
    };
    TunnelService.prototype.addNumbers = function (model) {
        return this.http.post(this.ipAddress + '/addNumbers', model);
    };
    TunnelService.prototype.startTimer = function (model) {
        return this.http.post(this.ipAddress + '/startTimer', model);
    };
    TunnelService.prototype.stopTimer = function (model) {
        return this.http.post(this.ipAddress + '/stopTimer', model);
    };
    TunnelService.prototype.registerUser = function (model) {
        return this.http.post(this.ipAddress + '/registerUser', model);
    };
    TunnelService.prototype.verifyEmail = function (path) {
        return this.http.get(this.ipAddress + '/validateUser/' + path);
    };
    TunnelService.prototype.login = function (model) {
        return this.http.post(this.ipAddress + '/login', model);
    };
    TunnelService.prototype.sampleGetRequest = function () {
        return this.http.get(this.ipAddress + '/endpoint');
    };
    TunnelService.prototype.getLeaderboards = function (m) {
        return this.http.post(this.ipAddress + '/getLeaderboards', m);
    };
    TunnelService.prototype.getPersonalBest = function (m) {
        return this.http.post(this.ipAddress + '/getPersonalBest', m);
    };
    TunnelService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TunnelService);
    return TunnelService;
}());



/***/ }),

/***/ "./src/app/services/user/user.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/user/user.service.ts ***!
  \***********************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserService = /** @class */ (function () {
    function UserService() {
        this.username = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.loggedIn = false;
    }
    UserService.prototype.setUserName = function (name) {
        if (name != "") {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
        }
        this.user = name;
        this.username.next(name);
    };
    UserService.setXp = function (xp) {
        this.xp = xp;
    };
    UserService.addXp = function (xp) {
        this.xp += xp;
    };
    UserService.prototype.isLoggedIn = function () {
        return this.getCookie('PuzzleHubToken') != "";
    };
    UserService.calculateLevel = function () {
        return Math.floor(this.xp / this.xpPerLevel) + 1;
    };
    UserService.calculateLevelFromXp = function (xp) {
        return Math.floor(xp / this.xpPerLevel) + 1;
    };
    UserService.nextLevelThreshold = function () {
        return this.xpPerLevel;
    };
    UserService.xpToNextLevel = function () {
        return this.xp % this.xpPerLevel;
    };
    UserService.prototype.getCookie = function (cookieName) {
        var name = cookieName + '=';
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length + 1, cookie.length);
            }
        }
        return "";
    };
    UserService.xp = 0;
    UserService.xpPerLevel = 2000;
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/todo/todo.component.css":
/*!*****************************************!*\
  !*** ./src/app/todo/todo.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h1 {\n  background: #2C2C2C;\n  color: white;\n  position: absolute;\n  width:100%;\n  height:50px;\n  top:3.5rem;\n  left:0px;\n  text-align: center;\n}\np {\n  background: #2C2C2C;\n  color: white;\n  font-size: 24px;\n  position: absolute;\n  width:80%;\n  height:50px;\n  top:30%;\n  left:20%;\n  text-align: left;\n}\n"

/***/ }),

/***/ "./src/app/todo/todo.component.html":
/*!******************************************!*\
  !*** ./src/app/todo/todo.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>Change Log</h1>\n<p>\n1. Daily/Weekly/Monthly leaderboards are here.\n<br>\n  - The daily boards are reset every day at midnight EST,\n<br>\n  - The weekly boards are reset at midnight EST every Friday,\n<br>\n  - The monthly boards are reset the moment a new month begins (on the first of each month, EST)\n<br>\n<br>\n\n2. Takuzu boards now default to grid enabled for new users\n\n<br>\n<br>\n<br>\nPlease send all feature requests to christian.scillitoe@gmail.com\n</p>\n"

/***/ }),

/***/ "./src/app/todo/todo.component.ts":
/*!****************************************!*\
  !*** ./src/app/todo/todo.component.ts ***!
  \****************************************/
/*! exports provided: TodoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TodoComponent", function() { return TodoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TodoComponent = /** @class */ (function () {
    function TodoComponent() {
    }
    TodoComponent.prototype.ngOnInit = function () {
    };
    TodoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-todo',
            template: __webpack_require__(/*! ./todo.component.html */ "./src/app/todo/todo.component.html"),
            styles: [__webpack_require__(/*! ./todo.component.css */ "./src/app/todo/todo.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TodoComponent);
    return TodoComponent;
}());



/***/ }),

/***/ "./src/app/verify-email/verify-email.component.css":
/*!*********************************************************!*\
  !*** ./src/app/verify-email/verify-email.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "p {\n  background: #2C2C2C;\n  color: white;\n  font-family: 'Raleway', sans-serif;\n  font-size: 24px;\n  position: absolute;\n  width:100%;\n  height:50px;\n  top:30%;\n  left:0px;\n  text-align: center;\n}\n"

/***/ }),

/***/ "./src/app/verify-email/verify-email.component.html":
/*!**********************************************************!*\
  !*** ./src/app/verify-email/verify-email.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  {{serverMessage}}\n</p>\n"

/***/ }),

/***/ "./src/app/verify-email/verify-email.component.ts":
/*!********************************************************!*\
  !*** ./src/app/verify-email/verify-email.component.ts ***!
  \********************************************************/
/*! exports provided: VerifyEmailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifyEmailComponent", function() { return VerifyEmailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/tunnel/tunnel.service */ "./src/app/services/tunnel/tunnel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VerifyEmailComponent = /** @class */ (function () {
    function VerifyEmailComponent(route, tunnel) {
        this.route = route;
        this.tunnel = tunnel;
        this.serverMessage = "";
    }
    VerifyEmailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var code = this.route.snapshot.paramMap.get('code');
        if (code != null) {
            this.tunnel.verifyEmail(code)
                .subscribe(function (data) {
                if (data['validated']) {
                    _this.serverMessage =
                        "Thank you, your email address has been verified! You can now log in.";
                }
                else {
                    _this.serverMessage =
                        "Invalid verification link.";
                }
            });
        }
    };
    VerifyEmailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-verify-email',
            template: __webpack_require__(/*! ./verify-email.component.html */ "./src/app/verify-email/verify-email.component.html"),
            styles: [__webpack_require__(/*! ./verify-email.component.css */ "./src/app/verify-email/verify-email.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_tunnel_tunnel_service__WEBPACK_IMPORTED_MODULE_2__["TunnelService"]])
    ], VerifyEmailComponent);
    return VerifyEmailComponent;
}());



/***/ }),

/***/ "./src/app/visuals/level-progress/level-progress.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/visuals/level-progress/level-progress.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"isVisible()\">\n<div class=\"levelBox\" cdkDrag>\n  <div class=\"xpGain\">\n    <ng-container *ngIf=\"displayXpGain\">\n      {{xpGain}}\n    </ng-container>\n  </div>\n  <div class=\"description\">\n    <br>\n    Level {{level}}<br>\n    {{currVal}}/{{maxVal}}\n  </div>\n  <div class=\"radial-progress\" data-progress=\"0\" id=\"levelProgressBar\">\n  \t<div class=\"circle\">\n  \t\t<div class=\"mask full\">\n  \t\t\t<div class=\"fill\"></div>\n  \t\t</div>\n  \t\t<div class=\"mask half\">\n  \t\t\t<div class=\"fill\"></div>\n  \t\t\t<div class=\"fill fix\"></div>\n  \t\t</div>\n  \t\t<div class=\"shadow\"></div>\n  \t</div>\n  \t<div class=\"inset\">\n  \t\t<div class=\"percentage\">\n  \t\t\t<div class=\"numbers\"><span>-</span>\n          <span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span><span>{{level}}</span>\n  \t\t</div>\n  \t</div>\n  </div>\n</div>\n</div>\n</ng-container>\n"

/***/ }),

/***/ "./src/app/visuals/level-progress/level-progress.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/visuals/level-progress/level-progress.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "* {\n  overflow: hidden; }\n\n.levelBox {\n  position: absolute;\n  bottom: 30px;\n  right: 30px;\n  width: 120px;\n  height: 180px;\n  z-index: 10000; }\n\n.xpGain {\n  color: #AAD46D;\n  position: absolute;\n  top: 20px;\n  right: 0px;\n  width: 120px;\n  text-align: center;\n  z-index: 9998;\n  font-size: 17px; }\n\n.radial-progress:hover {\n  opacity: 0;\n  transition: opacity .5s ease-out;\n  -moz-transition: opacity .5s ease-out;\n  -webkit-transition: opacity .5s ease-out;\n  -o-transition: opacity .5s ease-out; }\n\n.description {\n  position: absolute;\n  bottom: 0px;\n  right: 0px;\n  z-index: 9998;\n  width: 120px;\n  height: 120px;\n  text-align: center;\n  background-color: #4D4D4D;\n  border-radius: 50%;\n  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);\n  font-size: 20px;\n  color: #FFFFFF; }\n\n.radial-progress {\n  transition: opacity .5s ease-out;\n  -moz-transition: opacity .5s ease-out;\n  -webkit-transition: opacity .5s ease-out;\n  -o-transition: opacity .5s ease-out;\n  opacity: 1;\n  margin: 0px;\n  width: 120px;\n  height: 120px;\n  position: absolute;\n  bottom: 0px;\n  right: 0px;\n  z-index: 9999;\n  background-color: #3C3C3C;\n  border-radius: 50%; }\n\n.radial-progress .circle .mask, .radial-progress .circle .fill, .radial-progress .circle .shadow {\n    width: 120px;\n    height: 120px;\n    position: absolute;\n    border-radius: 50%;\n    overflow: hidden; }\n\n.radial-progress .circle .shadow {\n    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2) inset; }\n\n.radial-progress .circle .mask, .radial-progress .circle .fill {\n    -webkit-backface-visibility: hidden;\n    transition: -webkit-transform 1s;\n    transition: transform 1s;\n    transition: transform 1s, -webkit-transform 1s;\n    border-radius: 50%; }\n\n.radial-progress .circle .mask {\n    clip: rect(0px, 120px, 120px, 60px); }\n\n.radial-progress .circle .mask .fill {\n      clip: rect(0px, 60px, 120px, 0px);\n      background-color: #A89984; }\n\n.radial-progress .inset {\n    width: 90px;\n    height: 90px;\n    position: absolute;\n    margin-left: 15px;\n    margin-top: 15px;\n    background-color: #4D4D4D;\n    border-radius: 50%;\n    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2); }\n\n.radial-progress .inset .percentage {\n      height: 35px;\n      width: 57px;\n      overflow: hidden;\n      position: absolute;\n      top: 27.5px;\n      left: 16.5px;\n      line-height: 1; }\n\n.radial-progress .inset .percentage .numbers {\n        margin-top: -35px;\n        transition: width 1s; }\n\n.radial-progress .inset .percentage .numbers span {\n          width: 57px;\n          display: inline-block;\n          vertical-align: top;\n          text-align: center;\n          font-weight: 800;\n          font-size: 35px;\n          color: #FFFFFF; }\n\n.radial-progress[data-progress=\"0\"] .circle .mask.full, .radial-progress[data-progress=\"0\"] .circle .fill {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n\n.radial-progress[data-progress=\"0\"] .circle .fill.fix {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n\n.radial-progress[data-progress=\"0\"] .inset .percentage .numbers {\n    width: 57px; }\n\n.radial-progress[data-progress=\"1\"] .circle .mask.full, .radial-progress[data-progress=\"1\"] .circle .fill {\n    -webkit-transform: rotate(1.8deg);\n    transform: rotate(1.8deg); }\n\n.radial-progress[data-progress=\"1\"] .circle .fill.fix {\n    -webkit-transform: rotate(3.6deg);\n    transform: rotate(3.6deg); }\n\n.radial-progress[data-progress=\"1\"] .inset .percentage .numbers {\n    width: 114px; }\n\n.radial-progress[data-progress=\"2\"] .circle .mask.full, .radial-progress[data-progress=\"2\"] .circle .fill {\n    -webkit-transform: rotate(3.6deg);\n    transform: rotate(3.6deg); }\n\n.radial-progress[data-progress=\"2\"] .circle .fill.fix {\n    -webkit-transform: rotate(7.2deg);\n    transform: rotate(7.2deg); }\n\n.radial-progress[data-progress=\"2\"] .inset .percentage .numbers {\n    width: 171px; }\n\n.radial-progress[data-progress=\"3\"] .circle .mask.full, .radial-progress[data-progress=\"3\"] .circle .fill {\n    -webkit-transform: rotate(5.4deg);\n    transform: rotate(5.4deg); }\n\n.radial-progress[data-progress=\"3\"] .circle .fill.fix {\n    -webkit-transform: rotate(10.8deg);\n    transform: rotate(10.8deg); }\n\n.radial-progress[data-progress=\"3\"] .inset .percentage .numbers {\n    width: 228px; }\n\n.radial-progress[data-progress=\"4\"] .circle .mask.full, .radial-progress[data-progress=\"4\"] .circle .fill {\n    -webkit-transform: rotate(7.2deg);\n    transform: rotate(7.2deg); }\n\n.radial-progress[data-progress=\"4\"] .circle .fill.fix {\n    -webkit-transform: rotate(14.4deg);\n    transform: rotate(14.4deg); }\n\n.radial-progress[data-progress=\"4\"] .inset .percentage .numbers {\n    width: 285px; }\n\n.radial-progress[data-progress=\"5\"] .circle .mask.full, .radial-progress[data-progress=\"5\"] .circle .fill {\n    -webkit-transform: rotate(9deg);\n    transform: rotate(9deg); }\n\n.radial-progress[data-progress=\"5\"] .circle .fill.fix {\n    -webkit-transform: rotate(18deg);\n    transform: rotate(18deg); }\n\n.radial-progress[data-progress=\"5\"] .inset .percentage .numbers {\n    width: 342px; }\n\n.radial-progress[data-progress=\"6\"] .circle .mask.full, .radial-progress[data-progress=\"6\"] .circle .fill {\n    -webkit-transform: rotate(10.8deg);\n    transform: rotate(10.8deg); }\n\n.radial-progress[data-progress=\"6\"] .circle .fill.fix {\n    -webkit-transform: rotate(21.6deg);\n    transform: rotate(21.6deg); }\n\n.radial-progress[data-progress=\"6\"] .inset .percentage .numbers {\n    width: 399px; }\n\n.radial-progress[data-progress=\"7\"] .circle .mask.full, .radial-progress[data-progress=\"7\"] .circle .fill {\n    -webkit-transform: rotate(12.6deg);\n    transform: rotate(12.6deg); }\n\n.radial-progress[data-progress=\"7\"] .circle .fill.fix {\n    -webkit-transform: rotate(25.2deg);\n    transform: rotate(25.2deg); }\n\n.radial-progress[data-progress=\"7\"] .inset .percentage .numbers {\n    width: 456px; }\n\n.radial-progress[data-progress=\"8\"] .circle .mask.full, .radial-progress[data-progress=\"8\"] .circle .fill {\n    -webkit-transform: rotate(14.4deg);\n    transform: rotate(14.4deg); }\n\n.radial-progress[data-progress=\"8\"] .circle .fill.fix {\n    -webkit-transform: rotate(28.8deg);\n    transform: rotate(28.8deg); }\n\n.radial-progress[data-progress=\"8\"] .inset .percentage .numbers {\n    width: 513px; }\n\n.radial-progress[data-progress=\"9\"] .circle .mask.full, .radial-progress[data-progress=\"9\"] .circle .fill {\n    -webkit-transform: rotate(16.2deg);\n    transform: rotate(16.2deg); }\n\n.radial-progress[data-progress=\"9\"] .circle .fill.fix {\n    -webkit-transform: rotate(32.4deg);\n    transform: rotate(32.4deg); }\n\n.radial-progress[data-progress=\"9\"] .inset .percentage .numbers {\n    width: 570px; }\n\n.radial-progress[data-progress=\"10\"] .circle .mask.full, .radial-progress[data-progress=\"10\"] .circle .fill {\n    -webkit-transform: rotate(18deg);\n    transform: rotate(18deg); }\n\n.radial-progress[data-progress=\"10\"] .circle .fill.fix {\n    -webkit-transform: rotate(36deg);\n    transform: rotate(36deg); }\n\n.radial-progress[data-progress=\"10\"] .inset .percentage .numbers {\n    width: 627px; }\n\n.radial-progress[data-progress=\"11\"] .circle .mask.full, .radial-progress[data-progress=\"11\"] .circle .fill {\n    -webkit-transform: rotate(19.8deg);\n    transform: rotate(19.8deg); }\n\n.radial-progress[data-progress=\"11\"] .circle .fill.fix {\n    -webkit-transform: rotate(39.6deg);\n    transform: rotate(39.6deg); }\n\n.radial-progress[data-progress=\"11\"] .inset .percentage .numbers {\n    width: 684px; }\n\n.radial-progress[data-progress=\"12\"] .circle .mask.full, .radial-progress[data-progress=\"12\"] .circle .fill {\n    -webkit-transform: rotate(21.6deg);\n    transform: rotate(21.6deg); }\n\n.radial-progress[data-progress=\"12\"] .circle .fill.fix {\n    -webkit-transform: rotate(43.2deg);\n    transform: rotate(43.2deg); }\n\n.radial-progress[data-progress=\"12\"] .inset .percentage .numbers {\n    width: 741px; }\n\n.radial-progress[data-progress=\"13\"] .circle .mask.full, .radial-progress[data-progress=\"13\"] .circle .fill {\n    -webkit-transform: rotate(23.4deg);\n    transform: rotate(23.4deg); }\n\n.radial-progress[data-progress=\"13\"] .circle .fill.fix {\n    -webkit-transform: rotate(46.8deg);\n    transform: rotate(46.8deg); }\n\n.radial-progress[data-progress=\"13\"] .inset .percentage .numbers {\n    width: 798px; }\n\n.radial-progress[data-progress=\"14\"] .circle .mask.full, .radial-progress[data-progress=\"14\"] .circle .fill {\n    -webkit-transform: rotate(25.2deg);\n    transform: rotate(25.2deg); }\n\n.radial-progress[data-progress=\"14\"] .circle .fill.fix {\n    -webkit-transform: rotate(50.4deg);\n    transform: rotate(50.4deg); }\n\n.radial-progress[data-progress=\"14\"] .inset .percentage .numbers {\n    width: 855px; }\n\n.radial-progress[data-progress=\"15\"] .circle .mask.full, .radial-progress[data-progress=\"15\"] .circle .fill {\n    -webkit-transform: rotate(27deg);\n    transform: rotate(27deg); }\n\n.radial-progress[data-progress=\"15\"] .circle .fill.fix {\n    -webkit-transform: rotate(54deg);\n    transform: rotate(54deg); }\n\n.radial-progress[data-progress=\"15\"] .inset .percentage .numbers {\n    width: 912px; }\n\n.radial-progress[data-progress=\"16\"] .circle .mask.full, .radial-progress[data-progress=\"16\"] .circle .fill {\n    -webkit-transform: rotate(28.8deg);\n    transform: rotate(28.8deg); }\n\n.radial-progress[data-progress=\"16\"] .circle .fill.fix {\n    -webkit-transform: rotate(57.6deg);\n    transform: rotate(57.6deg); }\n\n.radial-progress[data-progress=\"16\"] .inset .percentage .numbers {\n    width: 969px; }\n\n.radial-progress[data-progress=\"17\"] .circle .mask.full, .radial-progress[data-progress=\"17\"] .circle .fill {\n    -webkit-transform: rotate(30.6deg);\n    transform: rotate(30.6deg); }\n\n.radial-progress[data-progress=\"17\"] .circle .fill.fix {\n    -webkit-transform: rotate(61.2deg);\n    transform: rotate(61.2deg); }\n\n.radial-progress[data-progress=\"17\"] .inset .percentage .numbers {\n    width: 1026px; }\n\n.radial-progress[data-progress=\"18\"] .circle .mask.full, .radial-progress[data-progress=\"18\"] .circle .fill {\n    -webkit-transform: rotate(32.4deg);\n    transform: rotate(32.4deg); }\n\n.radial-progress[data-progress=\"18\"] .circle .fill.fix {\n    -webkit-transform: rotate(64.8deg);\n    transform: rotate(64.8deg); }\n\n.radial-progress[data-progress=\"18\"] .inset .percentage .numbers {\n    width: 1083px; }\n\n.radial-progress[data-progress=\"19\"] .circle .mask.full, .radial-progress[data-progress=\"19\"] .circle .fill {\n    -webkit-transform: rotate(34.2deg);\n    transform: rotate(34.2deg); }\n\n.radial-progress[data-progress=\"19\"] .circle .fill.fix {\n    -webkit-transform: rotate(68.4deg);\n    transform: rotate(68.4deg); }\n\n.radial-progress[data-progress=\"19\"] .inset .percentage .numbers {\n    width: 1140px; }\n\n.radial-progress[data-progress=\"20\"] .circle .mask.full, .radial-progress[data-progress=\"20\"] .circle .fill {\n    -webkit-transform: rotate(36deg);\n    transform: rotate(36deg); }\n\n.radial-progress[data-progress=\"20\"] .circle .fill.fix {\n    -webkit-transform: rotate(72deg);\n    transform: rotate(72deg); }\n\n.radial-progress[data-progress=\"20\"] .inset .percentage .numbers {\n    width: 1197px; }\n\n.radial-progress[data-progress=\"21\"] .circle .mask.full, .radial-progress[data-progress=\"21\"] .circle .fill {\n    -webkit-transform: rotate(37.8deg);\n    transform: rotate(37.8deg); }\n\n.radial-progress[data-progress=\"21\"] .circle .fill.fix {\n    -webkit-transform: rotate(75.6deg);\n    transform: rotate(75.6deg); }\n\n.radial-progress[data-progress=\"21\"] .inset .percentage .numbers {\n    width: 1254px; }\n\n.radial-progress[data-progress=\"22\"] .circle .mask.full, .radial-progress[data-progress=\"22\"] .circle .fill {\n    -webkit-transform: rotate(39.6deg);\n    transform: rotate(39.6deg); }\n\n.radial-progress[data-progress=\"22\"] .circle .fill.fix {\n    -webkit-transform: rotate(79.2deg);\n    transform: rotate(79.2deg); }\n\n.radial-progress[data-progress=\"22\"] .inset .percentage .numbers {\n    width: 1311px; }\n\n.radial-progress[data-progress=\"23\"] .circle .mask.full, .radial-progress[data-progress=\"23\"] .circle .fill {\n    -webkit-transform: rotate(41.4deg);\n    transform: rotate(41.4deg); }\n\n.radial-progress[data-progress=\"23\"] .circle .fill.fix {\n    -webkit-transform: rotate(82.8deg);\n    transform: rotate(82.8deg); }\n\n.radial-progress[data-progress=\"23\"] .inset .percentage .numbers {\n    width: 1368px; }\n\n.radial-progress[data-progress=\"24\"] .circle .mask.full, .radial-progress[data-progress=\"24\"] .circle .fill {\n    -webkit-transform: rotate(43.2deg);\n    transform: rotate(43.2deg); }\n\n.radial-progress[data-progress=\"24\"] .circle .fill.fix {\n    -webkit-transform: rotate(86.4deg);\n    transform: rotate(86.4deg); }\n\n.radial-progress[data-progress=\"24\"] .inset .percentage .numbers {\n    width: 1425px; }\n\n.radial-progress[data-progress=\"25\"] .circle .mask.full, .radial-progress[data-progress=\"25\"] .circle .fill {\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg); }\n\n.radial-progress[data-progress=\"25\"] .circle .fill.fix {\n    -webkit-transform: rotate(90deg);\n    transform: rotate(90deg); }\n\n.radial-progress[data-progress=\"25\"] .inset .percentage .numbers {\n    width: 1482px; }\n\n.radial-progress[data-progress=\"26\"] .circle .mask.full, .radial-progress[data-progress=\"26\"] .circle .fill {\n    -webkit-transform: rotate(46.8deg);\n    transform: rotate(46.8deg); }\n\n.radial-progress[data-progress=\"26\"] .circle .fill.fix {\n    -webkit-transform: rotate(93.6deg);\n    transform: rotate(93.6deg); }\n\n.radial-progress[data-progress=\"26\"] .inset .percentage .numbers {\n    width: 1539px; }\n\n.radial-progress[data-progress=\"27\"] .circle .mask.full, .radial-progress[data-progress=\"27\"] .circle .fill {\n    -webkit-transform: rotate(48.6deg);\n    transform: rotate(48.6deg); }\n\n.radial-progress[data-progress=\"27\"] .circle .fill.fix {\n    -webkit-transform: rotate(97.2deg);\n    transform: rotate(97.2deg); }\n\n.radial-progress[data-progress=\"27\"] .inset .percentage .numbers {\n    width: 1596px; }\n\n.radial-progress[data-progress=\"28\"] .circle .mask.full, .radial-progress[data-progress=\"28\"] .circle .fill {\n    -webkit-transform: rotate(50.4deg);\n    transform: rotate(50.4deg); }\n\n.radial-progress[data-progress=\"28\"] .circle .fill.fix {\n    -webkit-transform: rotate(100.8deg);\n    transform: rotate(100.8deg); }\n\n.radial-progress[data-progress=\"28\"] .inset .percentage .numbers {\n    width: 1653px; }\n\n.radial-progress[data-progress=\"29\"] .circle .mask.full, .radial-progress[data-progress=\"29\"] .circle .fill {\n    -webkit-transform: rotate(52.2deg);\n    transform: rotate(52.2deg); }\n\n.radial-progress[data-progress=\"29\"] .circle .fill.fix {\n    -webkit-transform: rotate(104.4deg);\n    transform: rotate(104.4deg); }\n\n.radial-progress[data-progress=\"29\"] .inset .percentage .numbers {\n    width: 1710px; }\n\n.radial-progress[data-progress=\"30\"] .circle .mask.full, .radial-progress[data-progress=\"30\"] .circle .fill {\n    -webkit-transform: rotate(54deg);\n    transform: rotate(54deg); }\n\n.radial-progress[data-progress=\"30\"] .circle .fill.fix {\n    -webkit-transform: rotate(108deg);\n    transform: rotate(108deg); }\n\n.radial-progress[data-progress=\"30\"] .inset .percentage .numbers {\n    width: 1767px; }\n\n.radial-progress[data-progress=\"31\"] .circle .mask.full, .radial-progress[data-progress=\"31\"] .circle .fill {\n    -webkit-transform: rotate(55.8deg);\n    transform: rotate(55.8deg); }\n\n.radial-progress[data-progress=\"31\"] .circle .fill.fix {\n    -webkit-transform: rotate(111.6deg);\n    transform: rotate(111.6deg); }\n\n.radial-progress[data-progress=\"31\"] .inset .percentage .numbers {\n    width: 1824px; }\n\n.radial-progress[data-progress=\"32\"] .circle .mask.full, .radial-progress[data-progress=\"32\"] .circle .fill {\n    -webkit-transform: rotate(57.6deg);\n    transform: rotate(57.6deg); }\n\n.radial-progress[data-progress=\"32\"] .circle .fill.fix {\n    -webkit-transform: rotate(115.2deg);\n    transform: rotate(115.2deg); }\n\n.radial-progress[data-progress=\"32\"] .inset .percentage .numbers {\n    width: 1881px; }\n\n.radial-progress[data-progress=\"33\"] .circle .mask.full, .radial-progress[data-progress=\"33\"] .circle .fill {\n    -webkit-transform: rotate(59.4deg);\n    transform: rotate(59.4deg); }\n\n.radial-progress[data-progress=\"33\"] .circle .fill.fix {\n    -webkit-transform: rotate(118.8deg);\n    transform: rotate(118.8deg); }\n\n.radial-progress[data-progress=\"33\"] .inset .percentage .numbers {\n    width: 1938px; }\n\n.radial-progress[data-progress=\"34\"] .circle .mask.full, .radial-progress[data-progress=\"34\"] .circle .fill {\n    -webkit-transform: rotate(61.2deg);\n    transform: rotate(61.2deg); }\n\n.radial-progress[data-progress=\"34\"] .circle .fill.fix {\n    -webkit-transform: rotate(122.4deg);\n    transform: rotate(122.4deg); }\n\n.radial-progress[data-progress=\"34\"] .inset .percentage .numbers {\n    width: 1995px; }\n\n.radial-progress[data-progress=\"35\"] .circle .mask.full, .radial-progress[data-progress=\"35\"] .circle .fill {\n    -webkit-transform: rotate(63deg);\n    transform: rotate(63deg); }\n\n.radial-progress[data-progress=\"35\"] .circle .fill.fix {\n    -webkit-transform: rotate(126deg);\n    transform: rotate(126deg); }\n\n.radial-progress[data-progress=\"35\"] .inset .percentage .numbers {\n    width: 2052px; }\n\n.radial-progress[data-progress=\"36\"] .circle .mask.full, .radial-progress[data-progress=\"36\"] .circle .fill {\n    -webkit-transform: rotate(64.8deg);\n    transform: rotate(64.8deg); }\n\n.radial-progress[data-progress=\"36\"] .circle .fill.fix {\n    -webkit-transform: rotate(129.6deg);\n    transform: rotate(129.6deg); }\n\n.radial-progress[data-progress=\"36\"] .inset .percentage .numbers {\n    width: 2109px; }\n\n.radial-progress[data-progress=\"37\"] .circle .mask.full, .radial-progress[data-progress=\"37\"] .circle .fill {\n    -webkit-transform: rotate(66.6deg);\n    transform: rotate(66.6deg); }\n\n.radial-progress[data-progress=\"37\"] .circle .fill.fix {\n    -webkit-transform: rotate(133.2deg);\n    transform: rotate(133.2deg); }\n\n.radial-progress[data-progress=\"37\"] .inset .percentage .numbers {\n    width: 2166px; }\n\n.radial-progress[data-progress=\"38\"] .circle .mask.full, .radial-progress[data-progress=\"38\"] .circle .fill {\n    -webkit-transform: rotate(68.4deg);\n    transform: rotate(68.4deg); }\n\n.radial-progress[data-progress=\"38\"] .circle .fill.fix {\n    -webkit-transform: rotate(136.8deg);\n    transform: rotate(136.8deg); }\n\n.radial-progress[data-progress=\"38\"] .inset .percentage .numbers {\n    width: 2223px; }\n\n.radial-progress[data-progress=\"39\"] .circle .mask.full, .radial-progress[data-progress=\"39\"] .circle .fill {\n    -webkit-transform: rotate(70.2deg);\n    transform: rotate(70.2deg); }\n\n.radial-progress[data-progress=\"39\"] .circle .fill.fix {\n    -webkit-transform: rotate(140.4deg);\n    transform: rotate(140.4deg); }\n\n.radial-progress[data-progress=\"39\"] .inset .percentage .numbers {\n    width: 2280px; }\n\n.radial-progress[data-progress=\"40\"] .circle .mask.full, .radial-progress[data-progress=\"40\"] .circle .fill {\n    -webkit-transform: rotate(72deg);\n    transform: rotate(72deg); }\n\n.radial-progress[data-progress=\"40\"] .circle .fill.fix {\n    -webkit-transform: rotate(144deg);\n    transform: rotate(144deg); }\n\n.radial-progress[data-progress=\"40\"] .inset .percentage .numbers {\n    width: 2337px; }\n\n.radial-progress[data-progress=\"41\"] .circle .mask.full, .radial-progress[data-progress=\"41\"] .circle .fill {\n    -webkit-transform: rotate(73.8deg);\n    transform: rotate(73.8deg); }\n\n.radial-progress[data-progress=\"41\"] .circle .fill.fix {\n    -webkit-transform: rotate(147.6deg);\n    transform: rotate(147.6deg); }\n\n.radial-progress[data-progress=\"41\"] .inset .percentage .numbers {\n    width: 2394px; }\n\n.radial-progress[data-progress=\"42\"] .circle .mask.full, .radial-progress[data-progress=\"42\"] .circle .fill {\n    -webkit-transform: rotate(75.6deg);\n    transform: rotate(75.6deg); }\n\n.radial-progress[data-progress=\"42\"] .circle .fill.fix {\n    -webkit-transform: rotate(151.2deg);\n    transform: rotate(151.2deg); }\n\n.radial-progress[data-progress=\"42\"] .inset .percentage .numbers {\n    width: 2451px; }\n\n.radial-progress[data-progress=\"43\"] .circle .mask.full, .radial-progress[data-progress=\"43\"] .circle .fill {\n    -webkit-transform: rotate(77.4deg);\n    transform: rotate(77.4deg); }\n\n.radial-progress[data-progress=\"43\"] .circle .fill.fix {\n    -webkit-transform: rotate(154.8deg);\n    transform: rotate(154.8deg); }\n\n.radial-progress[data-progress=\"43\"] .inset .percentage .numbers {\n    width: 2508px; }\n\n.radial-progress[data-progress=\"44\"] .circle .mask.full, .radial-progress[data-progress=\"44\"] .circle .fill {\n    -webkit-transform: rotate(79.2deg);\n    transform: rotate(79.2deg); }\n\n.radial-progress[data-progress=\"44\"] .circle .fill.fix {\n    -webkit-transform: rotate(158.4deg);\n    transform: rotate(158.4deg); }\n\n.radial-progress[data-progress=\"44\"] .inset .percentage .numbers {\n    width: 2565px; }\n\n.radial-progress[data-progress=\"45\"] .circle .mask.full, .radial-progress[data-progress=\"45\"] .circle .fill {\n    -webkit-transform: rotate(81deg);\n    transform: rotate(81deg); }\n\n.radial-progress[data-progress=\"45\"] .circle .fill.fix {\n    -webkit-transform: rotate(162deg);\n    transform: rotate(162deg); }\n\n.radial-progress[data-progress=\"45\"] .inset .percentage .numbers {\n    width: 2622px; }\n\n.radial-progress[data-progress=\"46\"] .circle .mask.full, .radial-progress[data-progress=\"46\"] .circle .fill {\n    -webkit-transform: rotate(82.8deg);\n    transform: rotate(82.8deg); }\n\n.radial-progress[data-progress=\"46\"] .circle .fill.fix {\n    -webkit-transform: rotate(165.6deg);\n    transform: rotate(165.6deg); }\n\n.radial-progress[data-progress=\"46\"] .inset .percentage .numbers {\n    width: 2679px; }\n\n.radial-progress[data-progress=\"47\"] .circle .mask.full, .radial-progress[data-progress=\"47\"] .circle .fill {\n    -webkit-transform: rotate(84.6deg);\n    transform: rotate(84.6deg); }\n\n.radial-progress[data-progress=\"47\"] .circle .fill.fix {\n    -webkit-transform: rotate(169.2deg);\n    transform: rotate(169.2deg); }\n\n.radial-progress[data-progress=\"47\"] .inset .percentage .numbers {\n    width: 2736px; }\n\n.radial-progress[data-progress=\"48\"] .circle .mask.full, .radial-progress[data-progress=\"48\"] .circle .fill {\n    -webkit-transform: rotate(86.4deg);\n    transform: rotate(86.4deg); }\n\n.radial-progress[data-progress=\"48\"] .circle .fill.fix {\n    -webkit-transform: rotate(172.8deg);\n    transform: rotate(172.8deg); }\n\n.radial-progress[data-progress=\"48\"] .inset .percentage .numbers {\n    width: 2793px; }\n\n.radial-progress[data-progress=\"49\"] .circle .mask.full, .radial-progress[data-progress=\"49\"] .circle .fill {\n    -webkit-transform: rotate(88.2deg);\n    transform: rotate(88.2deg); }\n\n.radial-progress[data-progress=\"49\"] .circle .fill.fix {\n    -webkit-transform: rotate(176.4deg);\n    transform: rotate(176.4deg); }\n\n.radial-progress[data-progress=\"49\"] .inset .percentage .numbers {\n    width: 2850px; }\n\n.radial-progress[data-progress=\"50\"] .circle .mask.full, .radial-progress[data-progress=\"50\"] .circle .fill {\n    -webkit-transform: rotate(90deg);\n    transform: rotate(90deg); }\n\n.radial-progress[data-progress=\"50\"] .circle .fill.fix {\n    -webkit-transform: rotate(180deg);\n    transform: rotate(180deg); }\n\n.radial-progress[data-progress=\"50\"] .inset .percentage .numbers {\n    width: 2907px; }\n\n.radial-progress[data-progress=\"51\"] .circle .mask.full, .radial-progress[data-progress=\"51\"] .circle .fill {\n    -webkit-transform: rotate(91.8deg);\n    transform: rotate(91.8deg); }\n\n.radial-progress[data-progress=\"51\"] .circle .fill.fix {\n    -webkit-transform: rotate(183.6deg);\n    transform: rotate(183.6deg); }\n\n.radial-progress[data-progress=\"51\"] .inset .percentage .numbers {\n    width: 2964px; }\n\n.radial-progress[data-progress=\"52\"] .circle .mask.full, .radial-progress[data-progress=\"52\"] .circle .fill {\n    -webkit-transform: rotate(93.6deg);\n    transform: rotate(93.6deg); }\n\n.radial-progress[data-progress=\"52\"] .circle .fill.fix {\n    -webkit-transform: rotate(187.2deg);\n    transform: rotate(187.2deg); }\n\n.radial-progress[data-progress=\"52\"] .inset .percentage .numbers {\n    width: 3021px; }\n\n.radial-progress[data-progress=\"53\"] .circle .mask.full, .radial-progress[data-progress=\"53\"] .circle .fill {\n    -webkit-transform: rotate(95.4deg);\n    transform: rotate(95.4deg); }\n\n.radial-progress[data-progress=\"53\"] .circle .fill.fix {\n    -webkit-transform: rotate(190.8deg);\n    transform: rotate(190.8deg); }\n\n.radial-progress[data-progress=\"53\"] .inset .percentage .numbers {\n    width: 3078px; }\n\n.radial-progress[data-progress=\"54\"] .circle .mask.full, .radial-progress[data-progress=\"54\"] .circle .fill {\n    -webkit-transform: rotate(97.2deg);\n    transform: rotate(97.2deg); }\n\n.radial-progress[data-progress=\"54\"] .circle .fill.fix {\n    -webkit-transform: rotate(194.4deg);\n    transform: rotate(194.4deg); }\n\n.radial-progress[data-progress=\"54\"] .inset .percentage .numbers {\n    width: 3135px; }\n\n.radial-progress[data-progress=\"55\"] .circle .mask.full, .radial-progress[data-progress=\"55\"] .circle .fill {\n    -webkit-transform: rotate(99deg);\n    transform: rotate(99deg); }\n\n.radial-progress[data-progress=\"55\"] .circle .fill.fix {\n    -webkit-transform: rotate(198deg);\n    transform: rotate(198deg); }\n\n.radial-progress[data-progress=\"55\"] .inset .percentage .numbers {\n    width: 3192px; }\n\n.radial-progress[data-progress=\"56\"] .circle .mask.full, .radial-progress[data-progress=\"56\"] .circle .fill {\n    -webkit-transform: rotate(100.8deg);\n    transform: rotate(100.8deg); }\n\n.radial-progress[data-progress=\"56\"] .circle .fill.fix {\n    -webkit-transform: rotate(201.6deg);\n    transform: rotate(201.6deg); }\n\n.radial-progress[data-progress=\"56\"] .inset .percentage .numbers {\n    width: 3249px; }\n\n.radial-progress[data-progress=\"57\"] .circle .mask.full, .radial-progress[data-progress=\"57\"] .circle .fill {\n    -webkit-transform: rotate(102.6deg);\n    transform: rotate(102.6deg); }\n\n.radial-progress[data-progress=\"57\"] .circle .fill.fix {\n    -webkit-transform: rotate(205.2deg);\n    transform: rotate(205.2deg); }\n\n.radial-progress[data-progress=\"57\"] .inset .percentage .numbers {\n    width: 3306px; }\n\n.radial-progress[data-progress=\"58\"] .circle .mask.full, .radial-progress[data-progress=\"58\"] .circle .fill {\n    -webkit-transform: rotate(104.4deg);\n    transform: rotate(104.4deg); }\n\n.radial-progress[data-progress=\"58\"] .circle .fill.fix {\n    -webkit-transform: rotate(208.8deg);\n    transform: rotate(208.8deg); }\n\n.radial-progress[data-progress=\"58\"] .inset .percentage .numbers {\n    width: 3363px; }\n\n.radial-progress[data-progress=\"59\"] .circle .mask.full, .radial-progress[data-progress=\"59\"] .circle .fill {\n    -webkit-transform: rotate(106.2deg);\n    transform: rotate(106.2deg); }\n\n.radial-progress[data-progress=\"59\"] .circle .fill.fix {\n    -webkit-transform: rotate(212.4deg);\n    transform: rotate(212.4deg); }\n\n.radial-progress[data-progress=\"59\"] .inset .percentage .numbers {\n    width: 3420px; }\n\n.radial-progress[data-progress=\"60\"] .circle .mask.full, .radial-progress[data-progress=\"60\"] .circle .fill {\n    -webkit-transform: rotate(108deg);\n    transform: rotate(108deg); }\n\n.radial-progress[data-progress=\"60\"] .circle .fill.fix {\n    -webkit-transform: rotate(216deg);\n    transform: rotate(216deg); }\n\n.radial-progress[data-progress=\"60\"] .inset .percentage .numbers {\n    width: 3477px; }\n\n.radial-progress[data-progress=\"61\"] .circle .mask.full, .radial-progress[data-progress=\"61\"] .circle .fill {\n    -webkit-transform: rotate(109.8deg);\n    transform: rotate(109.8deg); }\n\n.radial-progress[data-progress=\"61\"] .circle .fill.fix {\n    -webkit-transform: rotate(219.6deg);\n    transform: rotate(219.6deg); }\n\n.radial-progress[data-progress=\"61\"] .inset .percentage .numbers {\n    width: 3534px; }\n\n.radial-progress[data-progress=\"62\"] .circle .mask.full, .radial-progress[data-progress=\"62\"] .circle .fill {\n    -webkit-transform: rotate(111.6deg);\n    transform: rotate(111.6deg); }\n\n.radial-progress[data-progress=\"62\"] .circle .fill.fix {\n    -webkit-transform: rotate(223.2deg);\n    transform: rotate(223.2deg); }\n\n.radial-progress[data-progress=\"62\"] .inset .percentage .numbers {\n    width: 3591px; }\n\n.radial-progress[data-progress=\"63\"] .circle .mask.full, .radial-progress[data-progress=\"63\"] .circle .fill {\n    -webkit-transform: rotate(113.4deg);\n    transform: rotate(113.4deg); }\n\n.radial-progress[data-progress=\"63\"] .circle .fill.fix {\n    -webkit-transform: rotate(226.8deg);\n    transform: rotate(226.8deg); }\n\n.radial-progress[data-progress=\"63\"] .inset .percentage .numbers {\n    width: 3648px; }\n\n.radial-progress[data-progress=\"64\"] .circle .mask.full, .radial-progress[data-progress=\"64\"] .circle .fill {\n    -webkit-transform: rotate(115.2deg);\n    transform: rotate(115.2deg); }\n\n.radial-progress[data-progress=\"64\"] .circle .fill.fix {\n    -webkit-transform: rotate(230.4deg);\n    transform: rotate(230.4deg); }\n\n.radial-progress[data-progress=\"64\"] .inset .percentage .numbers {\n    width: 3705px; }\n\n.radial-progress[data-progress=\"65\"] .circle .mask.full, .radial-progress[data-progress=\"65\"] .circle .fill {\n    -webkit-transform: rotate(117deg);\n    transform: rotate(117deg); }\n\n.radial-progress[data-progress=\"65\"] .circle .fill.fix {\n    -webkit-transform: rotate(234deg);\n    transform: rotate(234deg); }\n\n.radial-progress[data-progress=\"65\"] .inset .percentage .numbers {\n    width: 3762px; }\n\n.radial-progress[data-progress=\"66\"] .circle .mask.full, .radial-progress[data-progress=\"66\"] .circle .fill {\n    -webkit-transform: rotate(118.8deg);\n    transform: rotate(118.8deg); }\n\n.radial-progress[data-progress=\"66\"] .circle .fill.fix {\n    -webkit-transform: rotate(237.6deg);\n    transform: rotate(237.6deg); }\n\n.radial-progress[data-progress=\"66\"] .inset .percentage .numbers {\n    width: 3819px; }\n\n.radial-progress[data-progress=\"67\"] .circle .mask.full, .radial-progress[data-progress=\"67\"] .circle .fill {\n    -webkit-transform: rotate(120.6deg);\n    transform: rotate(120.6deg); }\n\n.radial-progress[data-progress=\"67\"] .circle .fill.fix {\n    -webkit-transform: rotate(241.2deg);\n    transform: rotate(241.2deg); }\n\n.radial-progress[data-progress=\"67\"] .inset .percentage .numbers {\n    width: 3876px; }\n\n.radial-progress[data-progress=\"68\"] .circle .mask.full, .radial-progress[data-progress=\"68\"] .circle .fill {\n    -webkit-transform: rotate(122.4deg);\n    transform: rotate(122.4deg); }\n\n.radial-progress[data-progress=\"68\"] .circle .fill.fix {\n    -webkit-transform: rotate(244.8deg);\n    transform: rotate(244.8deg); }\n\n.radial-progress[data-progress=\"68\"] .inset .percentage .numbers {\n    width: 3933px; }\n\n.radial-progress[data-progress=\"69\"] .circle .mask.full, .radial-progress[data-progress=\"69\"] .circle .fill {\n    -webkit-transform: rotate(124.2deg);\n    transform: rotate(124.2deg); }\n\n.radial-progress[data-progress=\"69\"] .circle .fill.fix {\n    -webkit-transform: rotate(248.4deg);\n    transform: rotate(248.4deg); }\n\n.radial-progress[data-progress=\"69\"] .inset .percentage .numbers {\n    width: 3990px; }\n\n.radial-progress[data-progress=\"70\"] .circle .mask.full, .radial-progress[data-progress=\"70\"] .circle .fill {\n    -webkit-transform: rotate(126deg);\n    transform: rotate(126deg); }\n\n.radial-progress[data-progress=\"70\"] .circle .fill.fix {\n    -webkit-transform: rotate(252deg);\n    transform: rotate(252deg); }\n\n.radial-progress[data-progress=\"70\"] .inset .percentage .numbers {\n    width: 4047px; }\n\n.radial-progress[data-progress=\"71\"] .circle .mask.full, .radial-progress[data-progress=\"71\"] .circle .fill {\n    -webkit-transform: rotate(127.8deg);\n    transform: rotate(127.8deg); }\n\n.radial-progress[data-progress=\"71\"] .circle .fill.fix {\n    -webkit-transform: rotate(255.6deg);\n    transform: rotate(255.6deg); }\n\n.radial-progress[data-progress=\"71\"] .inset .percentage .numbers {\n    width: 4104px; }\n\n.radial-progress[data-progress=\"72\"] .circle .mask.full, .radial-progress[data-progress=\"72\"] .circle .fill {\n    -webkit-transform: rotate(129.6deg);\n    transform: rotate(129.6deg); }\n\n.radial-progress[data-progress=\"72\"] .circle .fill.fix {\n    -webkit-transform: rotate(259.2deg);\n    transform: rotate(259.2deg); }\n\n.radial-progress[data-progress=\"72\"] .inset .percentage .numbers {\n    width: 4161px; }\n\n.radial-progress[data-progress=\"73\"] .circle .mask.full, .radial-progress[data-progress=\"73\"] .circle .fill {\n    -webkit-transform: rotate(131.4deg);\n    transform: rotate(131.4deg); }\n\n.radial-progress[data-progress=\"73\"] .circle .fill.fix {\n    -webkit-transform: rotate(262.8deg);\n    transform: rotate(262.8deg); }\n\n.radial-progress[data-progress=\"73\"] .inset .percentage .numbers {\n    width: 4218px; }\n\n.radial-progress[data-progress=\"74\"] .circle .mask.full, .radial-progress[data-progress=\"74\"] .circle .fill {\n    -webkit-transform: rotate(133.2deg);\n    transform: rotate(133.2deg); }\n\n.radial-progress[data-progress=\"74\"] .circle .fill.fix {\n    -webkit-transform: rotate(266.4deg);\n    transform: rotate(266.4deg); }\n\n.radial-progress[data-progress=\"74\"] .inset .percentage .numbers {\n    width: 4275px; }\n\n.radial-progress[data-progress=\"75\"] .circle .mask.full, .radial-progress[data-progress=\"75\"] .circle .fill {\n    -webkit-transform: rotate(135deg);\n    transform: rotate(135deg); }\n\n.radial-progress[data-progress=\"75\"] .circle .fill.fix {\n    -webkit-transform: rotate(270deg);\n    transform: rotate(270deg); }\n\n.radial-progress[data-progress=\"75\"] .inset .percentage .numbers {\n    width: 4332px; }\n\n.radial-progress[data-progress=\"76\"] .circle .mask.full, .radial-progress[data-progress=\"76\"] .circle .fill {\n    -webkit-transform: rotate(136.8deg);\n    transform: rotate(136.8deg); }\n\n.radial-progress[data-progress=\"76\"] .circle .fill.fix {\n    -webkit-transform: rotate(273.6deg);\n    transform: rotate(273.6deg); }\n\n.radial-progress[data-progress=\"76\"] .inset .percentage .numbers {\n    width: 4389px; }\n\n.radial-progress[data-progress=\"77\"] .circle .mask.full, .radial-progress[data-progress=\"77\"] .circle .fill {\n    -webkit-transform: rotate(138.6deg);\n    transform: rotate(138.6deg); }\n\n.radial-progress[data-progress=\"77\"] .circle .fill.fix {\n    -webkit-transform: rotate(277.2deg);\n    transform: rotate(277.2deg); }\n\n.radial-progress[data-progress=\"77\"] .inset .percentage .numbers {\n    width: 4446px; }\n\n.radial-progress[data-progress=\"78\"] .circle .mask.full, .radial-progress[data-progress=\"78\"] .circle .fill {\n    -webkit-transform: rotate(140.4deg);\n    transform: rotate(140.4deg); }\n\n.radial-progress[data-progress=\"78\"] .circle .fill.fix {\n    -webkit-transform: rotate(280.8deg);\n    transform: rotate(280.8deg); }\n\n.radial-progress[data-progress=\"78\"] .inset .percentage .numbers {\n    width: 4503px; }\n\n.radial-progress[data-progress=\"79\"] .circle .mask.full, .radial-progress[data-progress=\"79\"] .circle .fill {\n    -webkit-transform: rotate(142.2deg);\n    transform: rotate(142.2deg); }\n\n.radial-progress[data-progress=\"79\"] .circle .fill.fix {\n    -webkit-transform: rotate(284.4deg);\n    transform: rotate(284.4deg); }\n\n.radial-progress[data-progress=\"79\"] .inset .percentage .numbers {\n    width: 4560px; }\n\n.radial-progress[data-progress=\"80\"] .circle .mask.full, .radial-progress[data-progress=\"80\"] .circle .fill {\n    -webkit-transform: rotate(144deg);\n    transform: rotate(144deg); }\n\n.radial-progress[data-progress=\"80\"] .circle .fill.fix {\n    -webkit-transform: rotate(288deg);\n    transform: rotate(288deg); }\n\n.radial-progress[data-progress=\"80\"] .inset .percentage .numbers {\n    width: 4617px; }\n\n.radial-progress[data-progress=\"81\"] .circle .mask.full, .radial-progress[data-progress=\"81\"] .circle .fill {\n    -webkit-transform: rotate(145.8deg);\n    transform: rotate(145.8deg); }\n\n.radial-progress[data-progress=\"81\"] .circle .fill.fix {\n    -webkit-transform: rotate(291.6deg);\n    transform: rotate(291.6deg); }\n\n.radial-progress[data-progress=\"81\"] .inset .percentage .numbers {\n    width: 4674px; }\n\n.radial-progress[data-progress=\"82\"] .circle .mask.full, .radial-progress[data-progress=\"82\"] .circle .fill {\n    -webkit-transform: rotate(147.6deg);\n    transform: rotate(147.6deg); }\n\n.radial-progress[data-progress=\"82\"] .circle .fill.fix {\n    -webkit-transform: rotate(295.2deg);\n    transform: rotate(295.2deg); }\n\n.radial-progress[data-progress=\"82\"] .inset .percentage .numbers {\n    width: 4731px; }\n\n.radial-progress[data-progress=\"83\"] .circle .mask.full, .radial-progress[data-progress=\"83\"] .circle .fill {\n    -webkit-transform: rotate(149.4deg);\n    transform: rotate(149.4deg); }\n\n.radial-progress[data-progress=\"83\"] .circle .fill.fix {\n    -webkit-transform: rotate(298.8deg);\n    transform: rotate(298.8deg); }\n\n.radial-progress[data-progress=\"83\"] .inset .percentage .numbers {\n    width: 4788px; }\n\n.radial-progress[data-progress=\"84\"] .circle .mask.full, .radial-progress[data-progress=\"84\"] .circle .fill {\n    -webkit-transform: rotate(151.2deg);\n    transform: rotate(151.2deg); }\n\n.radial-progress[data-progress=\"84\"] .circle .fill.fix {\n    -webkit-transform: rotate(302.4deg);\n    transform: rotate(302.4deg); }\n\n.radial-progress[data-progress=\"84\"] .inset .percentage .numbers {\n    width: 4845px; }\n\n.radial-progress[data-progress=\"85\"] .circle .mask.full, .radial-progress[data-progress=\"85\"] .circle .fill {\n    -webkit-transform: rotate(153deg);\n    transform: rotate(153deg); }\n\n.radial-progress[data-progress=\"85\"] .circle .fill.fix {\n    -webkit-transform: rotate(306deg);\n    transform: rotate(306deg); }\n\n.radial-progress[data-progress=\"85\"] .inset .percentage .numbers {\n    width: 4902px; }\n\n.radial-progress[data-progress=\"86\"] .circle .mask.full, .radial-progress[data-progress=\"86\"] .circle .fill {\n    -webkit-transform: rotate(154.8deg);\n    transform: rotate(154.8deg); }\n\n.radial-progress[data-progress=\"86\"] .circle .fill.fix {\n    -webkit-transform: rotate(309.6deg);\n    transform: rotate(309.6deg); }\n\n.radial-progress[data-progress=\"86\"] .inset .percentage .numbers {\n    width: 4959px; }\n\n.radial-progress[data-progress=\"87\"] .circle .mask.full, .radial-progress[data-progress=\"87\"] .circle .fill {\n    -webkit-transform: rotate(156.6deg);\n    transform: rotate(156.6deg); }\n\n.radial-progress[data-progress=\"87\"] .circle .fill.fix {\n    -webkit-transform: rotate(313.2deg);\n    transform: rotate(313.2deg); }\n\n.radial-progress[data-progress=\"87\"] .inset .percentage .numbers {\n    width: 5016px; }\n\n.radial-progress[data-progress=\"88\"] .circle .mask.full, .radial-progress[data-progress=\"88\"] .circle .fill {\n    -webkit-transform: rotate(158.4deg);\n    transform: rotate(158.4deg); }\n\n.radial-progress[data-progress=\"88\"] .circle .fill.fix {\n    -webkit-transform: rotate(316.8deg);\n    transform: rotate(316.8deg); }\n\n.radial-progress[data-progress=\"88\"] .inset .percentage .numbers {\n    width: 5073px; }\n\n.radial-progress[data-progress=\"89\"] .circle .mask.full, .radial-progress[data-progress=\"89\"] .circle .fill {\n    -webkit-transform: rotate(160.2deg);\n    transform: rotate(160.2deg); }\n\n.radial-progress[data-progress=\"89\"] .circle .fill.fix {\n    -webkit-transform: rotate(320.4deg);\n    transform: rotate(320.4deg); }\n\n.radial-progress[data-progress=\"89\"] .inset .percentage .numbers {\n    width: 5130px; }\n\n.radial-progress[data-progress=\"90\"] .circle .mask.full, .radial-progress[data-progress=\"90\"] .circle .fill {\n    -webkit-transform: rotate(162deg);\n    transform: rotate(162deg); }\n\n.radial-progress[data-progress=\"90\"] .circle .fill.fix {\n    -webkit-transform: rotate(324deg);\n    transform: rotate(324deg); }\n\n.radial-progress[data-progress=\"90\"] .inset .percentage .numbers {\n    width: 5187px; }\n\n.radial-progress[data-progress=\"91\"] .circle .mask.full, .radial-progress[data-progress=\"91\"] .circle .fill {\n    -webkit-transform: rotate(163.8deg);\n    transform: rotate(163.8deg); }\n\n.radial-progress[data-progress=\"91\"] .circle .fill.fix {\n    -webkit-transform: rotate(327.6deg);\n    transform: rotate(327.6deg); }\n\n.radial-progress[data-progress=\"91\"] .inset .percentage .numbers {\n    width: 5244px; }\n\n.radial-progress[data-progress=\"92\"] .circle .mask.full, .radial-progress[data-progress=\"92\"] .circle .fill {\n    -webkit-transform: rotate(165.6deg);\n    transform: rotate(165.6deg); }\n\n.radial-progress[data-progress=\"92\"] .circle .fill.fix {\n    -webkit-transform: rotate(331.2deg);\n    transform: rotate(331.2deg); }\n\n.radial-progress[data-progress=\"92\"] .inset .percentage .numbers {\n    width: 5301px; }\n\n.radial-progress[data-progress=\"93\"] .circle .mask.full, .radial-progress[data-progress=\"93\"] .circle .fill {\n    -webkit-transform: rotate(167.4deg);\n    transform: rotate(167.4deg); }\n\n.radial-progress[data-progress=\"93\"] .circle .fill.fix {\n    -webkit-transform: rotate(334.8deg);\n    transform: rotate(334.8deg); }\n\n.radial-progress[data-progress=\"93\"] .inset .percentage .numbers {\n    width: 5358px; }\n\n.radial-progress[data-progress=\"94\"] .circle .mask.full, .radial-progress[data-progress=\"94\"] .circle .fill {\n    -webkit-transform: rotate(169.2deg);\n    transform: rotate(169.2deg); }\n\n.radial-progress[data-progress=\"94\"] .circle .fill.fix {\n    -webkit-transform: rotate(338.4deg);\n    transform: rotate(338.4deg); }\n\n.radial-progress[data-progress=\"94\"] .inset .percentage .numbers {\n    width: 5415px; }\n\n.radial-progress[data-progress=\"95\"] .circle .mask.full, .radial-progress[data-progress=\"95\"] .circle .fill {\n    -webkit-transform: rotate(171deg);\n    transform: rotate(171deg); }\n\n.radial-progress[data-progress=\"95\"] .circle .fill.fix {\n    -webkit-transform: rotate(342deg);\n    transform: rotate(342deg); }\n\n.radial-progress[data-progress=\"95\"] .inset .percentage .numbers {\n    width: 5472px; }\n\n.radial-progress[data-progress=\"96\"] .circle .mask.full, .radial-progress[data-progress=\"96\"] .circle .fill {\n    -webkit-transform: rotate(172.8deg);\n    transform: rotate(172.8deg); }\n\n.radial-progress[data-progress=\"96\"] .circle .fill.fix {\n    -webkit-transform: rotate(345.6deg);\n    transform: rotate(345.6deg); }\n\n.radial-progress[data-progress=\"96\"] .inset .percentage .numbers {\n    width: 5529px; }\n\n.radial-progress[data-progress=\"97\"] .circle .mask.full, .radial-progress[data-progress=\"97\"] .circle .fill {\n    -webkit-transform: rotate(174.6deg);\n    transform: rotate(174.6deg); }\n\n.radial-progress[data-progress=\"97\"] .circle .fill.fix {\n    -webkit-transform: rotate(349.2deg);\n    transform: rotate(349.2deg); }\n\n.radial-progress[data-progress=\"97\"] .inset .percentage .numbers {\n    width: 5586px; }\n\n.radial-progress[data-progress=\"98\"] .circle .mask.full, .radial-progress[data-progress=\"98\"] .circle .fill {\n    -webkit-transform: rotate(176.4deg);\n    transform: rotate(176.4deg); }\n\n.radial-progress[data-progress=\"98\"] .circle .fill.fix {\n    -webkit-transform: rotate(352.8deg);\n    transform: rotate(352.8deg); }\n\n.radial-progress[data-progress=\"98\"] .inset .percentage .numbers {\n    width: 5643px; }\n\n.radial-progress[data-progress=\"99\"] .circle .mask.full, .radial-progress[data-progress=\"99\"] .circle .fill {\n    -webkit-transform: rotate(178.2deg);\n    transform: rotate(178.2deg); }\n\n.radial-progress[data-progress=\"99\"] .circle .fill.fix {\n    -webkit-transform: rotate(356.4deg);\n    transform: rotate(356.4deg); }\n\n.radial-progress[data-progress=\"99\"] .inset .percentage .numbers {\n    width: 5700px; }\n\n.radial-progress[data-progress=\"100\"] .circle .mask.full, .radial-progress[data-progress=\"100\"] .circle .fill {\n    -webkit-transform: rotate(180deg);\n    transform: rotate(180deg); }\n\n.radial-progress[data-progress=\"100\"] .circle .fill.fix {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); }\n\n.radial-progress[data-progress=\"100\"] .inset .percentage .numbers {\n    width: 5757px; }\n"

/***/ }),

/***/ "./src/app/visuals/level-progress/level-progress.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/visuals/level-progress/level-progress.component.ts ***!
  \********************************************************************/
/*! exports provided: LevelProgressComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LevelProgressComponent", function() { return LevelProgressComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/user/user.service */ "./src/app/services/user/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LevelProgressComponent = /** @class */ (function () {
    function LevelProgressComponent() {
        this.first = true;
        this.displayXpGain = false;
        this.xpGain = '';
    }
    LevelProgressComponent.prototype.ngOnInit = function () {
    };
    LevelProgressComponent.prototype.isVisible = function () {
        var canvas = document.getElementById('myCanvas');
        if (canvas != null) {
            var bar = document.getElementById('levelProgressBar');
            try {
                bar.setAttribute('data-progress', '' + this.getProgress());
            }
            catch (_a) { }
        }
        return canvas != null;
    };
    LevelProgressComponent.prototype.ngOnChanges = function (changes) {
        var xpGain = changes.currVal.currentValue - changes.currVal.previousValue;
        var levelup = false;
        if (xpGain < 0) {
            levelup = true;
            xpGain = xpGain + _services_user_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"].xpPerLevel;
        }
        if ('' + xpGain != 'NaN' && !this.first) {
            if (!levelup) {
                this.xpGain = '+ ' + xpGain;
            }
            else {
                this.xpGain = 'Level up!';
            }
            this.displayXpGain = true;
            var that = this;
            setTimeout(function () { that.displayXpGain = false; }, 1500);
        }
        else if ('' + xpGain != 'NaN') {
            this.first = false;
        }
        var bar = document.getElementById('levelProgressBar');
        try {
            bar.setAttribute('data-progress', '' + this.getProgress());
        }
        catch (_a) {
        }
    };
    LevelProgressComponent.prototype.getProgress = function () {
        return Math.floor((this.currVal / this.maxVal) * 100);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], LevelProgressComponent.prototype, "level", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], LevelProgressComponent.prototype, "currVal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], LevelProgressComponent.prototype, "maxVal", void 0);
    LevelProgressComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-level-progress',
            template: __webpack_require__(/*! ./level-progress.component.html */ "./src/app/visuals/level-progress/level-progress.component.html"),
            styles: [__webpack_require__(/*! ./level-progress.component.scss */ "./src/app/visuals/level-progress/level-progress.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LevelProgressComponent);
    return LevelProgressComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/christian/git/PuzzleHub/front-end/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map