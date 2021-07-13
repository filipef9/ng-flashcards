import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { IFlash } from './flash.model';
import { FlashService } from './flash.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('flasForm', { static: true })
  flashForm: NgForm;

  editing = false;
  editingId: number;

  flash = {
    question: '',
    answer: '',
    show: false
  } as IFlash;

  flashs: IFlash[];
  flashs$: Observable<IFlash[]>;

  constructor(private flashService: FlashService) { }

  ngOnInit(): void {
    this.flashs$ = this.flashService.flashs$;
  }

  trackByFlashId(index, flash: IFlash): number {
    return flash.id;
  }

  handleSubmit(): void {
    this.flashService.addFlash(this.flash);
    this.handleClear();
  }

  handleClear(): void {
    this.flash = {
      question: '',
      answer: '',
      show: false
    };
    this.flashForm.reset();
  }

  handleCancel(): void {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }

  handleToggleCard(id: number): void {
    this.flashService.toggleFlash(id);
  }

  handleRememberedChange({ id, flag }): void {
    this.flashService.rememberedChange(id, flag);
  }

  handleEdit(id: number): void {
    this.flash = this.flashService.findFlashById(id);
    this.editing = true;
    this.editingId = id;
  }

  handleUpdate(): void {
    this.flashService.updateFlash(this.editingId, this.flash);
    this.handleCancel();
  }

  handleDelete(id: number): void {
    this.flashService.deleteFlash(id);
  }

}
