class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.playBtn = document.querySelector(".play");
    this.muteBtns = document.querySelectorAll(".mute");
    this.currentKick = "./sounds/kick-classic.waw";
    this.currentSnare = "./sounds/snare-acoustic01.waw";
    this.currentHihat = "./sounds/hohat-acoustic01.waw";
    this.selects = document.querySelectorAll("select");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.tempoText = document.querySelector(".tempo-nr");
    this.isPlaying = null;
    this.index = 0;
    this.bpm = 150;
  }
  activPad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    if (this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  muteTrack(e) {
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (e.target.getAttribute("data-track")) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (e.target.getAttribute("data-track")) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  changeSound(e) {
    const selectedName = e.target.name;
    const selectedValue = e.target.value;
    // console.log(e);
    console.log(selectedValue);
    switch (selectedName) {
      case "kick-select":
        this.kickAudio.src = selectedValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectedValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectedValue;
        break;
    }
  }
  changeTempo(e) {
    const tempText = document.querySelector(".tempo-nr");
    this.bpm = e.target.value;
    this.tempoText.innerText = e.target.value;
  }
  updateTempo(e) {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}
const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activPad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});
drumKit.playBtn.addEventListener("click", function () {
  drumKit.start();
  drumKit.updateBtn();
});
drumKit.muteBtns.forEach((track) => {
  track.addEventListener("click", function (e) {
    drumKit.muteTrack(e);
  });
});
drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});
drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});
