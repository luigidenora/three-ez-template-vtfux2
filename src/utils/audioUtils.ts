import { AudioLoader, AudioListener, Audio } from 'three';

export class AudioUtils {
  public static audioLoader = new AudioLoader();
  public static audioListener = new AudioListener();
  public static spitSoundBuffer: AudioBuffer;
  public static hitSoundBuffer: AudioBuffer;

  public static init() {
    this.audioLoader.load('https://cdn.pixabay.com/download/audio/2022/04/29/audio_f28098ce3c.mp3?filename=swing-whoosh-110410.mp3', (buffer) => {
      this.spitSoundBuffer = buffer;
    });

    this.audioLoader.load('https://cdn.pixabay.com/download/audio/2023/02/22/audio_d7a43e9b3b.mp3?filename=punch-140236.mp3', (buffer) => {
      this.hitSoundBuffer = buffer;
    });
  }
}
