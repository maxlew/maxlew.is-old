import { Component, OnInit } from '@angular/core';
declare var Tone: any;

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
