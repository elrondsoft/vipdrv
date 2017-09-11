import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Variable, IAuthorizationManager, AuthorizationManager } from './../../../utils/index';
import { SiteEntity } from './../../../entities/index';
import { ISiteApiService, SiteApiService, GetAllResponse } from './../../../services/serverApi/index';
@Component({
    selector: 'sites-table',
    styleUrls: ['./sitesTable.scss'],
    templateUrl: './sitesTable.html'
})
export class SitesTableComponent implements OnInit {
    @Input() pageNumber: number;
    @Input() pageSize: number;
    @Input() sorting: string;
    @Input() filter: any;
    @ViewChild('siteDetailsModal')
    protected modal: ModalComponent;
    /// fields
    private _defaultPageNumber: number = 0;
    private _defaultPageSize: number = 25;
    private _defaultSorting: string = 'name asc';
    private _defaultFilter: any = null;
    private _isInitialized: boolean = false;
    protected totalCount: number;
    protected items: Array<SiteEntity>;
    protected selectedEntity: SiteEntity;
    /// injected dependencies
    protected authorizationManager: IAuthorizationManager;
    protected siteApiService: ISiteApiService;
    protected router: Router;
    /// ctor
    constructor(authorizationManager: AuthorizationManager, siteApiService: SiteApiService, router: Router) {
        this.authorizationManager = authorizationManager;
        this.siteApiService = siteApiService;
        this.router = router;
    }
    /// methods
    ngOnInit(): void {
        let self = this;
        self._isInitialized = false;
        self.getAllEntities()
            .then(() => self._isInitialized = true);
    }
    protected redirectToEntityDetails(entity: SiteEntity): Promise<boolean> {
        let actionPromise: Promise<boolean>;
        if (Variable.isNotNullOrUndefined(entity)) {
            actionPromise = this.router.navigate([`./pages/sites/${String(entity.id)}`]);
        } else {
            actionPromise = Promise.resolve(false);
        }
        return actionPromise;
    }
    protected getAllEntities(): Promise<void> {
        let self = this;
        let operationPromise = self.siteApiService
            .getAll(self.getPageNumber(), self.getPageSize(), self.buildSorting(), self.buildFilter())
            .then(function (response: GetAllResponse<SiteEntity>): Promise<void> {
                self.totalCount = response.totalCount;
                self.items = response.items;
                return Promise.resolve();
            });
        return operationPromise;
    }
    protected deleteEntity(id: number): Promise<void> {
        let self = this;
        let operationPromise = self.siteApiService
            .delete(id)
            .then(function (): Promise<void> {
                let elementIndex = self.items.findIndex((item: SiteEntity) => item.id === id);
                self.items.splice(elementIndex, 1);
                return Promise.resolve();
            });
        return operationPromise;
    }
    protected modalOpenCreate(): Promise<void> {
        let self = this;
        self.selectedEntity = new SiteEntity();
        self.selectedEntity.userId = this.authorizationManager.lastUser.id;
        self.modal.open();
        return Promise.resolve();
    }
    protected modalOpenEdit(id: number): Promise<void> {
        let self = this;
        self.selectedEntity = self.items.find((item: SiteEntity) => item.id === id);
        self.modal.open();
        let operationPromise = self.siteApiService
            .get(id)
            .then(function (response: SiteEntity): Promise<void> {
                self.selectedEntity = response;
                return Promise.resolve();
            });
        return operationPromise;
    }
    protected modalApply() {
        let self = this;
        let operationPromise: Promise<SiteEntity> = self.selectedEntity.id ?
            self.siteApiService.update(self.selectedEntity) :
            self.siteApiService.create(self.selectedEntity);
        return operationPromise
            .then(function (entity: SiteEntity): Promise<void> {
                let elementIndex = self.items.findIndex((item: SiteEntity) => item.id === entity.id);
                if (elementIndex !== -1) {
                    self.items.splice(elementIndex, 1, entity);
                } else {
                    self.items.push(entity);
                }
                self.selectedEntity = null;
                return self.modal.close();
            });
    }
    protected modalDismiss(): Promise<void> {
        this.selectedEntity = null;
        return this.modal.dismiss();
    }
    /// predicates
    protected isInitialized(): boolean {
        return this._isInitialized;
    }
    protected isSelectedEntityDefined(): boolean {
        return Variable.isNotNullOrUndefined(this.selectedEntity);
    }
    /// helpers
    private getPageNumber(): number {
        return Variable.isNotNullOrUndefined(this.pageNumber) ? this.pageNumber : this._defaultPageNumber;
    }
    private getPageSize(): number {
        return Variable.isNotNullOrUndefined(this.pageSize) ? this.pageSize : this._defaultPageSize;
    }
    private buildSorting(): string {
        return Variable.isNotNullOrUndefined(this.sorting) ? this.sorting : this._defaultSorting;
    }
    private buildFilter(): any {
        return Variable.isNotNullOrUndefined(this.filter) ? this.filter : this._defaultFilter;
    }
}
