import {
     RouterModule,
     Routes,
} from '@angular/router';

import { FormProfessorComponent } from './form/form.component';
import { IndexProfessorComponent } from './index/index.component';
import { ListProfessorComponent } from './list/list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: IndexProfessorComponent,
     children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListProfessorComponent, data: { title: 'Lista de professores' } },
      { path: 'new', component: FormProfessorComponent, data: { title: 'Novo de professor' } },
      { path: 'edit/:id', component: FormProfessorComponent, data: { title: 'Edição do cadastro do professor' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule {}
