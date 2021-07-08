import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFlash } from '../flash.model';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css']
})
export class FlashComponent implements OnInit {

  @Input()
  flash: IFlash = {
    id: 1,
    question: 'React to Angular',
    answer: 'No Reaction :)',
    show: false
  };

  @Output()
  onToggleCard = new EventEmitter();

  @Output()
  onRememberedChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleCard(): void {
    this.onToggleCard.emit(this.flash.id);
  }

  markCorrect(): void {
    this.onRememberedChange.emit({
      id: this.flash.id,
      flag: 'correct'
    });
  }

  markIncorrect(): void {
    this.onRememberedChange.emit({
      id: this.flash.id,
      flag: 'incorrect'
    });
  }

}
