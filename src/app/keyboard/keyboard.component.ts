import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
declare const Tone: any;

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  synth;

  constructor() {
    this.synth = new Tone.PolySynth(6, Tone.Synth, {
      oscillator : {
        partials : [0, 2, 3, 4],
      }
    }).toMaster();
  }

  playNote(note: string) {
    this.synth.triggerAttackRelease(note, '4n');
  }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    // TODO: octave control
    switch (event.keyCode) {
      case 65: // a
        this.playNote('A3');
        break;
      case 83: // s
        this.playNote('B3');
        break;
      case 68: // d
        this.playNote('C4');
        break;
      case 70: // f
        this.playNote('D4');
        break;
      case 71: // g
        this.playNote('E4');
        break;
      case 72: // h
        this.playNote('F4');
        break;
      case 74: // j
        this.playNote('G4');
        break;
      case 75: // k
        this.playNote('A4');
        break;
      case 76: // l
        this.playNote('B4');
        break;
      case 81: // q
        this.playNote('G#3');
        break;
      case 87: // w
        this.playNote('A#3');
        break;
      case 69: // e
        // this.playNote(w'A#3');
        break;
      case 82: // r
        this.playNote('C#4');
        break;
      case 84: // t
        this.playNote('D#4');
        break;
      case 89: // y
        // this.playNote('A#3');
        break;
      case 85: // u
        this.playNote('F#4');
        break;
      case 73: // i
        this.playNote('G#4');
        break;
      case 79: // o
        this.playNote('A#4');
        break;
      case 8: // p
        // this.playNote('A#3');
        break;
    }
  }

  ngOnInit() {
  }

}
