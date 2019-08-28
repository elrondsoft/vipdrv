import { Injectable } from '@angular/core';
import { Variable, ConsoleLogger, Extensions } from './../../../../../utils/index';
import { SiteEntity } from './../../../../../entities/index';
import { ObjectValidationService } from './../../../object.validation-service';
import { ISiteValidationService } from './i-site.validation-service';

@Injectable()
export class SiteValidationService
    extends ObjectValidationService<SiteEntity>
    implements ISiteValidationService {
    /// ctor
    constructor(logger: ConsoleLogger) {
        super(logger);
        this.logger.logDebug('SiteValidationService: Service has been constructed.');
    }
    /// methods
    isValid(entity: SiteEntity): boolean {
        return this.isNameValid(entity) &&
            this.isOwnerValid(entity) &&
            this.isUrlValid(entity) &&
            this.isImageUrlValid(entity) &&
            this.isWASPUrlValid(entity) &&
            this.isZipCodeValid(entity) &&
            this.isAvailableTestDriveFromHomeValid(entity) &&
            this.isMaxDeliveryDistanceValid(entity);
    }
    isNameValid(entity: SiteEntity): boolean {
        return Variable.isNotNullOrUndefined(entity) &&
            Variable.isNotNullOrUndefinedOrEmptyString(entity.name);
    }
    isOwnerValid(entity: SiteEntity): boolean {
        return Variable.isNotNullOrUndefined(entity) &&
            Variable.isNotNullOrUndefined(entity.userId);
    }
    isUrlValid(entity: SiteEntity): boolean {
        return Variable.isNotNullOrUndefined(entity) &&
            Variable.isNotNullOrUndefinedOrEmptyString(entity.url);
    }
    isWASPUrlValid(entity: SiteEntity): boolean {
        return Variable.isNotNullOrUndefined(entity); // &&
            // Variable.isNotNullOrUndefinedOrEmptyString(entity.widgetAsSeparatePageUrl);
    }
    isImageUrlValid(entity: SiteEntity): boolean {
        return Variable.isNotNullOrUndefined(entity) &&
            Variable.isNotNullOrUndefinedOrEmptyString(entity.imageUrl);
    }
    isZipCodeValid(entity: SiteEntity): boolean {
        return Variable.isNotNullOrUndefined(entity) &&
            Extensions.isValidZipCode(entity.zipCode);
    }
    isAvailableTestDriveFromHomeValid(entity: SiteEntity): boolean {
        return Variable.isNotNullOrUndefined(entity);
    }
    isMaxDeliveryDistanceValid(entity: SiteEntity): boolean {
        return Variable.isNotNullOrUndefined(entity) &&
            (!Variable.isNotNullOrUndefined(entity) ||
                entity.maxVehicleDeliveryDistance >= 0);
    }
    isImportRelativeFtpPathValid(entity: SiteEntity): boolean {
        return Variable.isNotNullOrUndefined(entity);
    }
    isShuffleExpertsValid(entity: SiteEntity): boolean {
        return Variable.isNotNullOrUndefined(entity);
    }

    getInvalidNameMessageKey(entity: SiteEntity): string {
        return 'validation.sites.invalidNameMessage';
    }
    getInvalidOwnerMessageKey(entity: SiteEntity): string {
        return 'validation.sites.invalidOwnerMessage';
    }
    getInvalidUrlMessageKey(entity: SiteEntity): string {
        return 'validation.sites.invalidUrlMessage';
    }
    getInvalidWASPUrlMessageKey(entity: SiteEntity): string {
        return 'validation.sites.invalidWASPUrlMessage';
    }
    getInvalidZipCodeMessageKey(entity: SiteEntity): string {
        return 'validation.sites.invalidZipCodeMessage';
    }
    getInvalidAvailableTestDriveFromHomeMessageKey(entity: SiteEntity): string {
        return 'validation.sites.invalidAvailableTestDriveFromHomeMessage';
    }
    getInvalidMaxDeliveryDistanceMessageKey(entity: SiteEntity): string {
        return 'validation.sites.invalidMaxDeliveryDistanceMessage';
    }
    getInvalidImportRelativeFtpPathMessageKey(entity: SiteEntity): string {
        return 'validation.sites.invalidImportRelativeFtpPathMessage';
    }
    getInvalidShuffleExpertsMessageKey(entity: SiteEntity): string {
        return 'validation.sites.invalidShuffleExpertsMessage';
    }
}