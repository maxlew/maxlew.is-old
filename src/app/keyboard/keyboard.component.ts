import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { keyBindings } from './keybindings.const';

declare const Tone: any;
declare const io: any;

const socket = io('https://maxlew.is/');

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  synth;
  reverb;
  filter;

  yourPlayedNotes = [];
  othersPlayedNotes = [];
  octave = 1;

  constructor() {
    this.reverb = new Tone.JCReverb({
      'roomSize' : 0.8
    }).toMaster();
    this.filter = new Tone.Filter(4000);
    this.synth = new Tone.PolySynth(8, Tone.Synth,
      {
        'harmonicity': 2,
        'oscillator': {
          'type': 'amsine2',
          'modulationType': 'sine',
          'harmonicity': 1.00
        },
        'envelope': {
          'attack': 0.008,
          'decay': 4,
          'sustain': 0.04,
          'release': 1.2
        },
        'modulation': {
          'volume': 13,
          'type': 'amsine2',
          'modulationType': 'sine',
          'harmonicity': 12
        },
        'modulationEnvelope': {
          'attack': 0.006,
          'decay': 0.2,
          'sustain': 0.2,
          'release': 0.4
        }
      }
    ).connect(this.reverb);

  }

  playNote(note: string) {
    this.synth.triggerAttackRelease(note, '4n');
    socket.emit('notePlayed', { note }, function () {
      console.log('emitted note');
    });
    if (this.yourPlayedNotes.length >= 6) {
      this.yourPlayedNotes.splice(0, 1);
    }
    this.yourPlayedNotes.push(note);
  }

  attackNote(note: string) {
    this.synth.triggerAttack(note);
    this.yourPlayedNotes.push(note);
  }
  releaseNote(note: string) {
    this.synth.triggerRelease(note);
    const index = this.yourPlayedNotes.indexOf(note);
    this.yourPlayedNotes.splice(index, 1);
  }

  otherPlaysNote(note: string) {
    this.synth.triggerAttackRelease(note, '4n');
    if (this.othersPlayedNotes.length >= 6) {
      this.othersPlayedNotes.splice(0, 1);
    }
    this.othersPlayedNotes.push(note);
    console.log(this.othersPlayedNotes);
  }

  noteClass(note: string) {
    if (this.yourPlayedNotes.indexOf(note) !== -1) {
      return 'triggered-by-you-' + (this.yourPlayedNotes.indexOf(note) + 1);
    }
    if (this.othersPlayedNotes.indexOf(note) !== -1) {
      return 'triggered-by-other-' + (this.othersPlayedNotes.indexOf(note) + 1);
    }
    return '';
  }

  @HostListener('window:keydown', ['$event'])
  keyboardInputDown(event: KeyboardEvent) {
    if (event.repeat) {
      return;
    }

    const note = keyBindings[this.octave][event.keyCode];
    if (note) {
      this.attackNote(note);
    }
    if (event.keyCode === 90 && this.octave > 0) {
      this.octave--;
    }
    if (event.keyCode === 88 && this.octave < 3) {
      this.octave++;
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyboardInputUp(event: KeyboardEvent) {
    const note = keyBindings[this.octave][event.keyCode];
    if (note) {
      this.releaseNote(note);
    }
  }

  ngOnInit() {}

}

const keyBoard = new KeyboardComponent();
socket.on('notePlayed', function (data) {
  keyBoard.otherPlaysNote(data);
});
