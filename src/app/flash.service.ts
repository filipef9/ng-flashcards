import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFlash } from './flash.model';

@Injectable({
  providedIn: 'root'
})
export class FlashService {

  private flashs: IFlash[];
  private _flashs$: BehaviorSubject<IFlash[]>;

  constructor() {
    this.flashs = [
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

    this._flashs$ = new BehaviorSubject<IFlash[]>(this.flashs);
  }

  get flashs$(): BehaviorSubject<IFlash[]> {
    return this._flashs$;
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 10_000);
  }

  addFlash({ question, answer }: IFlash): void {
    this.flashs = [
      ...this.flashs,
      {
        id: this.getRandomNumber(),
        show: false,
        question,
        answer
      }
    ];

    this._flashs$.next(this.flashs);
  }

  deleteFlash(id: number): void {
    const flashIndexToDelete = this.flashs
      .map((flash: IFlash) => flash.id)
      .indexOf(id);
    this.flashs.splice(flashIndexToDelete, 1);
  }

  updateFlash(id: number, { question, answer }: IFlash): void {
    const flashToUpdate = this.findFlashById(id);
    if (flashToUpdate) {
      flashToUpdate.question = question;
      flashToUpdate.answer = answer;
    }
  }

  toggleFlash(id: number): void {
    const flashToToggleIndex = this.flashs.findIndex((flash: IFlash) => flash.id === id);

    this.flashs = [
      ...this.flashs.slice(0, flashToToggleIndex),
      {
        ...this.flashs[flashToToggleIndex],
        show: !this.flashs[flashToToggleIndex].show
      },
      ...this.flashs.slice(flashToToggleIndex + 1)
    ];

    this._flashs$.next(this.flashs);
  }

  rememberedChange(id: number, flag: 'correct' | 'incorrect'): void {
    const flashToChange = this.findFlashById(id);
    if (flashToChange) {
      flashToChange.remembered = flag;
    }
  }

  findFlashById(id: number): IFlash {
    return this.flashs.find((flash: IFlash) => flash.id === id);
  }

}
