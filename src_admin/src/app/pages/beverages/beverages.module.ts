import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { UiSwitchModule } from 'angular2-ui-switch'

import { UtilsModule } from './../../utils/index';
import { BeveragesTableComponent } from './table/beveragesTable.component';
import { BeverageDetailsInfoComponent } from './details/info/beverageDetailsInfo.component';
import { BeveragesComponent } from './beverages.component';
import { routing } from './beverages.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AppTranslationModule,
        NgaModule,
        routing,
        UtilsModule,
        Ng2Bs3ModalModule,
        UiSwitchModule
    ],
    exports: [
        BeveragesComponent,
        BeveragesTableComponent,
        BeverageDetailsInfoComponent
    ],
    declarations: [
        BeveragesComponent,
        BeveragesTableComponent,
        BeverageDetailsInfoComponent
    ],
    providers: []
})
export class BeveragesModule {}
