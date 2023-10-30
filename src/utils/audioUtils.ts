import { AudioLoader, AudioListener, Audio } from 'three';

export class AudioUtils {
  public static audioLoader = new AudioLoader();
  public static audioListener = new AudioListener();
  public static spitSoundBuffer: AudioBuffer;
  public static hitSoundBuffer: AudioBuffer;
  public static punchSoundBuffer: AudioBuffer;
  public static spawnSoundBuffer: AudioBuffer;

  public static init() {
    this.audioLoader.load('https://cdn.pixabay.com/download/audio/2022/04/29/audio_f28098ce3c.mp3?filename=swing-whoosh-110410.mp3', (buffer) => {
      this.spitSoundBuffer = buffer;
    });

    this.audioLoader.load('https://cdn.pixabay.com/download/audio/2023/09/15/audio_22422ad01f.mp3?filename=punch-1-166694.mp3', (buffer) => {
      this.hitSoundBuffer = buffer;
    });

    this.audioLoader.load('https://cdn.pixabay.com/download/audio/2022/10/16/audio_13dc3ab58b.mp3?filename=punch-2-123106.mp3', (buffer) => {
      this.punchSoundBuffer = buffer;
    });

    this.audioLoader.load('https://cdn.pixabay.com/download/audio/2022/01/18/audio_d8c6f0b106.mp3?filename=teleport-14639.mp3', (buffer) => {
      this.spawnSoundBuffer = buffer;
    });
  }
}
