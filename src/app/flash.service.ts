import { Injectable } from '@angular/core';
import { IFlash } from './flash.model';

@Injectable({
  providedIn: 'root'
})
export class FlashService {

  private _flashs: IFlash[];

  constructor() {
    this._flashs = [
      {
        question: 'Question 1',
        answer: 'Answer 1',
        show: false,
        id: this.getRandomNumber()
      },
      {
        question: 'Question 2',
        answer: 'Answer 2',
        show: false,
        id: this.getRandomNumber()
      },
      {
        question: 'Question 3',
        answer: 'Answer 3',
        show: false,
        id: this.getRandomNumber()
      }
    ];
  }

  get flashs(): IFlash[] {
    return this._flashs;
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 10_000);
  }

  addFlash({ question, answer }: IFlash): void {
    this._flashs.push({
      id: this.getRandomNumber(),
      show: false,
      question,
      answer
    });
  }

  deleteFlash(id: number): void {
    const flashIndexToDelete = this._flashs
      .map((flash: IFlash) => flash.id)
      .indexOf(id);
    this._flashs.splice(flashIndexToDelete, 1);
  }

  updateFlash(id: number, { question, answer }: IFlash): void {
    const flashToUpdate = this.findFlashById(id);
    if (flashToUpdate) {
      flashToUpdate.question = question;
      flashToUpdate.answer = answer;
    }
  }

  toggleFlash(id: number): void {
    const flashToToggle = this.findFlashById(id);
    if (flashToToggle) {
      flashToToggle.show = !flashToToggle.show;
    }
  }

  rememberedChange(id: number, flag: 'correct' | 'incorrect'): void {
    const flashToChange = this.findFlashById(id);
    if (flashToChange) {
      flashToChange.remembered = flag;
    }
  }

  findFlashById(id: number): IFlash {
    return this._flashs.find((flash: IFlash) => flash.id === id);
  }

}
