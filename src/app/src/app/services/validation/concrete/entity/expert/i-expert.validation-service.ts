import { ExpertEntity } from './../../../../../entities/index';
import { IValidationService } from './../../../i-validation-service';

export interface IExpertValidationService extends IValidationService<ExpertEntity> {
    isValidName(entity: ExpertEntity): boolean;
    isValidTitle(entity: ExpertEntity): boolean;
    isValidDescription(entity: ExpertEntity): boolean;
    isValidEmail(entity: ExpertEntity): boolean;
    isValidPhoneNumber(entity: ExpertEntity): boolean;
    isValidLinkedInUrl(entity: ExpertEntity): boolean;
    isValidDealerraterUrl(entity: ExpertEntity): boolean;
    isValidFacebookUrl(entity: ExpertEntity): boolean;
    isValidEmployeeId(entity: ExpertEntity): boolean;
    getInvalidNameMessageKey(entity: ExpertEntity): string;
    getInvalidTitleMessageKey(entity: ExpertEntity): string;
    getInvalidDescriptionMessageKey(entity: ExpertEntity): string;
    getInvalidEmailMessageKey(entity: ExpertEntity): string;
    getInvalidPhoneNumberMessageKey(entity: ExpertEntity): string;
    getInvalidLinkedInUrlMessageKey(entity: ExpertEntity): string;
    getInvalidDealerraterUrlMessageKey(entity: ExpertEntity): string;
    getInvalidFacebookUrlMessageKey(entity: ExpertEntity): string;
    getInvalidEmployeeIdMessageKey(entity: ExpertEntity): string;
}