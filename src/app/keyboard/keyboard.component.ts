import { Component, OnInit } from '@angular/core';
import * as Tone from 'Tone';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  synth;

  constructor() {
    this.synth = new Tone.Synth().toMaster();
  }

  playNote(note: string) {
    this.synth.triggerAttackRelease(note, '4n');
  }

  ngOnInit() {
  }

}
