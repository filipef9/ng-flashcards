import { Component } from '@angular/core';
import { IFlash } from './flash.model';

const getRandomNumber = () => {
  return Math.floor(Math.random() * 10_000);
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  editing = false;
  editingId: number;

  flashs: IFlash[] = [
    {
      question: 'Question 1',
      answer: 'Answer 1',
      show: false,
      id: getRandomNumber()
    },
    {
      question: 'Question 2',
      answer: 'Answer 2',
      show: false,
      id: getRandomNumber()
    },
    {
      question: 'Question 3',
      answer: 'Answer 3',
      show: false,
      id: getRandomNumber()
    }
  ];

  trackByFlashId(index, flash: IFlash): number {
    return flash.id;
  }

  handleToggleCard(id: number): void {
    const flash = this.getFlashById(id);
    flash.show = !flash.show;
  }

  handleRememberedChange({ id, flag }): void {
    const flash = this.getFlashById(id);
    flash.remembered = flag;
  }

  handleEdit(id: number): void {
    this.editing = true;
    this.editingId = id;
    // TODO: We will add editing logic after adding the form.
  }

  private getFlashById(id: number): IFlash {
    return this.flashs.find((flash: IFlash) => flash.id === id);
  }

}
