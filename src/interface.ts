export class Interface {
  // public static audioLoader = new AudioLoader();
  public static _infoModal = document.querySelector('dialog#info-dialog') as HTMLDialogElement;
  public static _playButton = document.getElementById('play') as HTMLElement;
  public static _infoButton = document.getElementById('info') as HTMLElement;
  public static _money = document.getElementById('money') as HTMLElement;
  public static _score = document.getElementById('score') as HTMLElement;
  public static _startInterface = document.getElementById('start-interface') as HTMLElement;

  public static init() {
    this._infoButton.addEventListener('click', () => {
      this._infoModal.showModal();
    });
    this._playButton.addEventListener('click', () => {
      this._startInterface.classList.add('hidden');
    });
  }

  public static play() {
    window.document.getElementById('scene-container').classList.add('hide');
  }

  public static info() {
    const modalDisplay = window.document.getElementById('info-modal').style.display;
    window.document.getElementById('info-modal').style.display = modalDisplay === 'block' ? 'none' : 'block';
  }

  public static setMoney(money: number) {
    this._money.textContent = money.toString().padStart(2, '0');
  }

  public static setScore(goldValue: string) {
    this._score.textContent = goldValue;
  }

  public static loaded(goldValue: string) {
    this._score.textContent = goldValue;
    this._startInterface.classList.add('game-mode');
  }

}
