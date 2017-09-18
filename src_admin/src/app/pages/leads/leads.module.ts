import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { LeadsTableComponent } from './table/leadsTable.component';
import { LeadDetailsInfoComponent } from './details/info/leadDetailsInfo.component';
import { LeadsComponent } from './leads.component';
import { routing } from './leads.routing';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AppTranslationModule,
        NgaModule,
        routing,
        Ng2Bs3ModalModule
    ],
    exports: [
        LeadsComponent,
        LeadsTableComponent,
        LeadDetailsInfoComponent
    ],
    declarations: [
        LeadsComponent,
        LeadsTableComponent,
        LeadDetailsInfoComponent
    ],
    providers: []
})
export class LeadsModule {}
