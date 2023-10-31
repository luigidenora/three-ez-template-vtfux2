import { AudioLoader, AudioListener, Audio } from 'three';

export class AudioUtils {
  public static audioLoader = new AudioLoader();
  public static audioListener = new AudioListener();
  public static spitSoundBuffer: AudioBuffer;
  public static hitSoundBuffer: AudioBuffer;
  public static punchSoundBuffer: AudioBuffer;
  public static spawnSoundBuffer: AudioBuffer;
  
  public static mainThemeAudio: Audio;

  public static init() {
    this.audioLoader.load('https://cdn.pixabay.com/download/audio/2023/10/09/audio_65aa57130f.mp3?filename=spooky-halloween-170695.mp3', (buffer) => {
      this.mainThemeAudio = new Audio(this.audioListener).setBuffer(buffer);
      this.mainThemeAudio.setVolume(0.02);
      this.mainThemeAudio.setLoop(true);
      this.mainThemeAudio.play();
    });

    this.audioLoader.load('https://cdn.pixabay.com/download/audio/2022/04/29/audio_f28098ce3c.mp3?filename=swing-whoosh-110410.mp3', (buffer) => {
      this.spitSoundBuffer = buffer;
    });

    this.audioLoader.load('https://cdn.pixabay.com/download/audio/2023/09/15/audio_22422ad01f.mp3?filename=punch-1-166694.mp3', (buffer) => {
      this.hitSoundBuffer = buffer;
    });

    this.audioLoader.load('https://cdn.pixabay.com/download/audio/2022/10/16/audio_13dc3ab58b.mp3?filename=punch-2-123106.mp3', (buffer) => {
      this.punchSoundBuffer = buffer;
    });

    this.audioLoader.load('https://cdn.pixabay.com/download/audio/2022/03/15/audio_ef47301072.mp3?filename=thump-1-79982.mp3', (buffer) => {
      this.spawnSoundBuffer = buffer;
    });
  }
}
