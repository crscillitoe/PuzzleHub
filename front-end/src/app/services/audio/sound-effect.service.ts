import { Injectable } from "@angular/core";
import { Howl } from "howler";

@Injectable({
  providedIn: "root"
})
export class SoundEffectService {
  private tickSound: Howl;

  constructor() {
    this.tickSound = new Howl({
      src: ["../../../assets/audio/Tick.mp3"]
    });
  }

  /**
   * Plays a simple tick noise - to be used when the user
   * hovers over a clickable item
   */
  playHoverTick(): void {
    this.tickSound.play();
  }
}
