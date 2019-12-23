import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { AlertService, ProgramService, ImageService } from '../../services';
import { first } from 'rxjs/operators';
import { Program } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-event',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  data: Program[] = [];
  editProgram: Program;

  selectedFiles: FileList;
  currentFileUpload: File;

  addProgramForm: FormGroup;
  submitted = false;
  returnUrl: string;
  name = new FormControl('', Validators.required);
  fullName = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  image = new FormControl('', []);


  constructor(
    public http: Http,
    private programService: ProgramService,
    private alertService: AlertService,
    private imageService: ImageService,
  ) {

  }

  ngOnInit() {
    this.loadAllProgram();
    this.addProgramForm = new FormGroup({
      name: this.name,
      fullName: this.fullName,
      description: this.description,
      image: this.image
    });
  }

  private loadAllProgram() {
    this.programService.getAllPrograms().subscribe(program => {
      this.data = program;
    });
  }

  openAddModal(event) {
    this.clearForm();
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
    this.clearForm();
  }

  get f() { return this.addProgramForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addProgramForm.invalid) {
      return;
    }
    console.log(this.addProgramForm.value);

    this.programService.addProgram(this.addProgramForm.value, this.currentFileUpload)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Add an program successful', true);
          location.reload();
        },
        error => {
          this.submitted = false;
          this.alertService.error(error);
        });
  }


  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);
  }

  onDelete(id: number) {
    this.programService.delete(id).pipe(first()).subscribe(data => {
      location.reload();
    });
  }

  onClick(id: number) {

  }

  blured = false
  focused = false

  created(event) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event)
  }

  changedEditor(event) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event)
  }

  focus($event) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event)
    this.focused = true
    this.blured = false
  }

  blur($event) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event)
    this.focused = false
    this.blured = true
  }

  openEditModal(event, id: number) {
    this.submitted = false;
    this.programService.getProgramById(id).subscribe(program => {
      this.editProgram = program;
      this.name.setValue(program.name);
      this.description.setValue(program.description);
      this.fullName.setValue(program.fullName);
    });

    document.querySelector('#' + event).classList.add('md-show');
  }

  clearForm() {
    this.submitted = false;
    this.name.setValue("");
    this.description.setValue("");
    this.fullName.setValue("");
  }

  onEdit(id: number) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addProgramForm.invalid) {
      return;
    }

    this.programService.editProgram(this.addProgramForm.value, this.currentFileUpload, id)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Edit a program successful', true);
          this.clearForm();
          location.reload();
        },
        error => {
          this.submitted = false;
          this.alertService.error(error);
        });
  }

  EditorCreated(quill) {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler.bind(this));
    this.editor = quill;
  }

  public editor;
  imageHandler() {
    const Imageinput = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    Imageinput.classList.add('ql-image');
    Imageinput.addEventListener('change', () => {
      const file = Imageinput.files[0];
      if (Imageinput.files != null && Imageinput.files[0] != null) {
        this.imageService.uploadImage(file).subscribe(res => {
          const range = this.editor.getSelection(true);
          const index = range.index + range.length;
          this.editor.insertEmbed(index, 'image', res['url']);
          console.log(this.editor.getContents());
          this.description.setValue(this.editor.container.firstChild.innerHTML);
        });
      }
      'editor-change'
    });
    Imageinput.click();
  }
}

