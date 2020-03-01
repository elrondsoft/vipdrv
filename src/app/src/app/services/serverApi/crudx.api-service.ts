import { Injectable } from '@angular/core';
import { ILogger } from './../../utils/index';
import { IHttpXService } from './../index';
import { IEntity, ILightEntity } from './../../entities/index';
import { ICRUDXApiService } from './i-crudx.api-service';
import { CRUDApiService } from './crud.api-service';
@Injectable()
export abstract class CRUDXApiService<TEntity extends IEntity<TKey>, TKey, TLightEntity extends ILightEntity<TKey>>
    extends CRUDApiService<TEntity, TKey, TLightEntity>
    implements ICRUDXApiService<TEntity, TKey, TLightEntity> {
    /// ctor
    constructor(
        httpService: IHttpXService,
        logger: ILogger,
        controllerName: string) {
        super(httpService, logger, controllerName);
    }
    patchActivity(id: TKey, value: boolean): Promise<void> {
        const self = this;
        const methodName: string = 'change-activity';
        return self.httpService
            .patch(self.createUrlWithMethodNameAndParams(methodName, String(id)), { 'value': value })
            .then(function (response: any): void { });
    }
    patchOrder(id: TKey, value: number): Promise<void> {
        const self = this;
        const methodName: string = 'change-order';
        return self.httpService
            .patch(self.createUrlWithMethodNameAndParams(methodName, String(id)), { 'value': value })
            .then(function (response: any): void { });
    }
    swapOrders(id1: TKey, id2: TKey): Promise<void> {
        const self = this;
        const methodName: string = 'swap-orders';
        return self.httpService
            .patch(self.createUrlWithMethodName(methodName), { 'key1': id1, 'key2': id2 })
            .then(function (response: any): void { });
    }
}
