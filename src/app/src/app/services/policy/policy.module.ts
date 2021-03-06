import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationEntityPolicyService } from './concrete/main/invitation/invitationEntity.policy-service';
import { BeverageEntityPolicyService } from './concrete/widget/beverage/beverageEntity.policy-service';
import { ExpertEntityPolicyService } from './concrete/widget/expert/expertEntity.policy-service';
import { LeadEntityPolicyService } from './concrete/widget/lead/leadEntity.policy-service';
import { RouteEntityPolicyService } from './concrete/widget/route/routeEntity.policy-service';
import { SiteEntityPolicyService } from './concrete/widget/site/siteEntity.policy-service';
import { UserEntityPolicyService } from './concrete/main/user/userEntity.policy-service';
import { StepEntityPolicyService } from './concrete/widget/step/stepEntity.policy-service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        InvitationEntityPolicyService,
        BeverageEntityPolicyService,
        ExpertEntityPolicyService,
        LeadEntityPolicyService,
        RouteEntityPolicyService,
        SiteEntityPolicyService,
        UserEntityPolicyService,
        StepEntityPolicyService
    ]
})
export class PolicyModule {}
