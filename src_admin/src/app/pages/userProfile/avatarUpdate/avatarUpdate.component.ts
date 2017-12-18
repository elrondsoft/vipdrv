import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Variable, ConsoleLogger, ILogger } from './../../../utils/index';
import { IUserApiService, UserApiService } from './../../../services/index';
import { UserProfileConstants } from './../userProfile.constants';
@Component({
    selector: 'user-avatar-update',
    styleUrls: ['./avatarUpdate.scss'],
    templateUrl: './avatarUpdate.html',
})
export class AvatarUpdateComponent implements OnInit{
    /// inputs
    @Input() userId: number;
    @Input() avatarUrl: string;
    /// outputs
    @Output() avatarUrlPatched: EventEmitter<string> = new EventEmitter<string>();
    /// service fields
    protected patchAvatarPromise: Promise<void>;
    protected forceAcceptImage: boolean = false;
    /// fields
    protected newAvatarUrl: string;
    /// injected dependencies
    protected logger: ILogger;
    protected userApiService: IUserApiService;
    /// ctor
    constructor(logger: ConsoleLogger, userApiService: UserApiService) {
        this.logger = logger;
        this.userApiService = userApiService;
        this.logger.logDebug('AvatarUpdateComponent: Component has been constructed.');
    }
    /// methods
    ngOnInit(): void {
        this.newAvatarUrl = this.avatarUrl;
    }
    protected onResetForceAcceptImage(): void {
        this.forceAcceptImage = false;
    }
    protected patchAvatar(): void {
        const self = this;
        self.logger.logTrase('AvatarUpdateComponent: Patch user avatar called.');
        self.forceAcceptImage = true;
        setTimeout(
            function () {
                self.patchAvatarPromise = self.userApiService
                    .patchAvatar(self.userId, self.newAvatarUrl)
                    .then(function(): void {
                        self.avatarUrlPatched.emit(self.newAvatarUrl);
                    })
                    .then(
                        () => {
                            self.patchAvatarPromise = null;
                        },
                        () => {
                            self.patchAvatarPromise = null;
                        },
                    );
            },
            0);
    }
    protected resetAvatar(): void {
        this.newAvatarUrl = this.avatarUrl;
    }
    /// predicates
    protected isUserIdDefined(): boolean {
        return Variable.isNotNullOrUndefined(this.userId);
    }
    protected isPatchAvatarAllowed(): boolean {
        return Variable.isNotNullOrUndefined(this.userId);
    }
    protected isPatchAvatarDisabled(): boolean {
        return this.isPatchAvatarProcessing();
    }
    protected isPatchAvatarProcessing(): boolean {
        return Variable.isNotNullOrUndefined(this.patchAvatarPromise);
    }
    protected isResetAvatarAllowed(): boolean {
        return true;
    }
    protected isResetAvatarDisabled(): boolean {
        return this.isPatchAvatarProcessing();
    }
    // avatar select
    protected defaultImageUrl: string = UserProfileConstants.userImageDefault;
    protected imageWidth: number = UserProfileConstants.userImageWidth;
    protected imageHeight: number = UserProfileConstants.userImageHeight;
    protected isImageRounded: boolean = UserProfileConstants.isUserImageRounded;
    protected imageAlt: string = UserProfileConstants.userImageAlt;
    protected columnRules: string = 'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6';
    protected isImageComponentReadOnly(): boolean {
        return !this.isUserIdDefined() || this.isPatchAvatarProcessing();
    }
    protected onNewAvatarSelected(newImageUrl: string): void {
        this.newAvatarUrl = newImageUrl;
        this.logger.logTrase('AvatarUpdateComponent: New user image has been selected.');
    }
}