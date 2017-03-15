import { Component } from '@angular/core';
import { ProfessorService } from '../../../services/professor.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListProfessorComponent {

  public data;
  public filterQuery = '';

  constructor(service: ProfessorService) {
    service.getProfessor().subscribe(data => {
      this.data = data;
    });
  }

  onDelete(id: any) {
    console.log(id);
  }
}
