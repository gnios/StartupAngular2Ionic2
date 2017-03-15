import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterConfig, ToasterService } from 'angular2-toaster/angular2-toaster';

import { ActivatedRoute } from '@angular/router';
import { Professor } from '../../../models/professorModel';
import { ProfessorService } from '../../../services/professor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-professor',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormProfessorComponent implements OnInit {

  id: number;
  private sub: any;
  private toasterService: ToasterService;
  public data: Professor = new Professor();
  public form: FormGroup;

  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    tapToDismiss: true,
    timeout: 5000
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public service: ProfessorService,
    toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.form = this.createForm();
      this.id = params['id'];

      if (this.id != null) {
        this.service.getProfessorById(this.id).subscribe(data => {
          this.data = data;
          (<FormGroup>this.form).setValue(data, { onlySelf: true });
        });
      }
    });
  }

  onSubmit({ value, valid }: { value: Professor, valid: boolean }) {
    console.log(value, valid);
    this.service.createProfessor(value).subscribe(data => {
      this.toasterService.pop('success', 'Registro Salvo', data.sucessMessage);
    });
  }

  onCancel() {
    this.router.navigate(['/professor']);
  }

  private createForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      ies: new FormControl('', [Validators.required])
    });
  }
}
