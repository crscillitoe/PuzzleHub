import { Injectable } from "@angular/core";
import { Howl } from "howler";

@Injectable({
  providedIn: "root"
})
export class SoundEffectService {
  private tickSound: Howl;
  private cSound: Howl;
  private dSound: Howl;
  private eSound: Howl;
  private fSound: Howl;
  private gSound: Howl;
  private aSound: Howl;
  private bSound: Howl;
  private c2Sound: Howl;

  constructor() {
    this.tickSound = new Howl({
      src: ["../../../assets/audio/Tick.mp3"]
    });

    this.cSound = new Howl({
      src: ["../../../assets/audio/C.wav"]
    });
    this.dSound = new Howl({
      src: ["../../../assets/audio/D.wav"]
    });
    this.eSound = new Howl({
      src: ["../../../assets/audio/E.wav"]
    });
    this.fSound = new Howl({
      src: ["../../../assets/audio/F.wav"]
    });
    this.gSound = new Howl({
      src: ["../../../assets/audio/G.wav"]
    });
    this.aSound = new Howl({
      src: ["../../../assets/audio/A.wav"]
    });
    this.bSound = new Howl({
      src: ["../../../assets/audio/B.wav"]
    });
    this.c2Sound = new Howl({
      src: ["../../../assets/audio/C2.wav"]
    });
    this.cSound = new Howl({
      src: ["../../../assets/audio/C.wav"]
    });
  }

  /**
   * Plays a simple tick noise - to be used when the user
   * hovers over a clickable item
   */
  playHoverTick(): void {
    this.tickSound.play();
  }

  playC(): void {
    this.cSound.play();
  }
  playD(): void {
    this.dSound.play();
  }
  playE(): void {
    this.eSound.play();
  }
  playF(): void {
    this.fSound.play();
  }
  playG(): void {
    this.gSound.play();
  }
  playA(): void {
    this.aSound.play();
  }
  playB(): void {
    this.bSound.play();
  }
  playC2(): void {
    this.c2Sound.play();
  }
}
