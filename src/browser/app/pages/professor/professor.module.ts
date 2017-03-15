import { AlertModule, ModalModule } from 'ng2-bootstrap';

import { CommonModule } from '@angular/common';
import { DataFilterPipe } from './../../pipe/dataTableFilter';
import { DataTableModule } from 'angular2-datatable';
import { FormProfessorComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IndexProfessorComponent } from './index/index.component';
import { ListProfessorComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { ProfessorRoutingModule } from './professor-routing.module';
import { ProfessorService } from '../../services/professor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';

@NgModule({
    imports: [ProfessorRoutingModule,
        CommonModule,
        DataTableModule,
        FormsModule,
        HttpModule,
        ModalModule,
        AlertModule,
        ReactiveFormsModule,
        ToasterModule,
    ],
    exports: [],
    declarations: [
        IndexProfessorComponent,
        DataFilterPipe,
        FormProfessorComponent,
        ListProfessorComponent
    ],
    providers: [
        ProfessorService
    ],
})
export class ProfessorModule { }
