import { Injectable } from '@angular/core';
import { ConsoleLogger } from './../../../../../utils/index';
import { LeadEntity } from './../../../../../entities/index';
import { AuthorizationService } from './../../../../index';
import { ILeadEntityPolicyService } from './i-leadEntity.policy-service';
import { Variable } from '../../../../../utils/variable';
import { AbstractEntityPolicyService } from '../../../abstractEntity.policy-service';

@Injectable()
export class LeadEntityPolicyService
    extends AbstractEntityPolicyService<LeadEntity>
    implements ILeadEntityPolicyService {

    /// injected dependencies
    /// ctor
    constructor(logger: ConsoleLogger, authService: AuthorizationService) {
        super(logger, authService);
        this.logger.logDebug('LeadEntityPolicyService: Service has been constructed.');
    }
    /// methods
    canExportDataToExcel(): boolean {
        return true;
    }
    canCreate(): boolean {
        return false;
    }
    canUpdate(): boolean {
        return false;
    }
    canDelete(): boolean {
        return false;
    }
    canGet(): boolean {
        return true;
    }

    protected innerCanGetEntity(entity: LeadEntity): boolean {
        return true;
    }

    protected innerCanCreateEntity(entity: LeadEntity): boolean {
        return false;
    }

    protected innerCanUpdateEntity(entity: LeadEntity): boolean {
        return false;
    }

    protected innerCanDeleteEntity(entity: LeadEntity): boolean {
        return false;
    }
}