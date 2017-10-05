import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { keyBindings } from './keybindings.const';

declare const Tone: any;
declare const io: any;

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  synth;
  yourPlayedNotes = [];
  othersPlayedNotes = [];
  octave = 1;
  socket = io('http://35.197.167.175/');

  constructor() {
    this.synth = new Tone.PolySynth(6, Tone.Synth, {
      oscillator : {
        partials : [0, 2, 3, 4],
      }
    }).toMaster();


  }

  playNote(note: string) {
    this.synth.triggerAttackRelease(note, '4n');
    this.socket.emit('notePlayed', { note }, function () {
      console.log('emitted note');
    });
    if (this.yourPlayedNotes.length >= 6) {
      this.yourPlayedNotes.splice(0, 1);
    }
    this.yourPlayedNotes.push(note);
  }

  otherPlaysNote(note: string) {
    this.playNote(note);
    this.synth.triggerAttackRelease(note, '4n');
    if (this.othersPlayedNotes.length >= 6) {
      this.othersPlayedNotes.splice(0, 1);
    }
    this.othersPlayedNotes.push(note);
  }

  noteClass(note: string) {
    if (this.yourPlayedNotes.indexOf(note) !== -1) {
      return 'triggered-by-you-' + this.yourPlayedNotes.indexOf(note);
    }
    if (this.othersPlayedNotes.indexOf(note) !== -1) {
      return 'triggered-by-other-' + this.othersPlayedNotes.indexOf(note);
    }
    return '';
  }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    const note = keyBindings[this.octave][event.keyCode];
    if (note) {
      this.playNote(note);
    }
    if (event.keyCode === 90 && this.octave > 0) {
      this.octave--;
    }
    if (event.keyCode === 88 && this.octave < 2) {
      this.octave++;
    }
  }

  ngOnInit() {
    this.socket.on('notePlayed', function (data) {
      console.log(data);
      this.otherPlaysNote(data.note);
    });
  }

}
