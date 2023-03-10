// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Thế hệ tan vỡ",
      singer: "Kai Đình",
      path: "music/TheHeTanVo.mp3",
      image: "image/TheHeTanVo.jpg"
    },
    {
      name: "Kẻ Theo Đuổi Ánh Sáng",
      singer: "Huy Vạc",
      path: "music/KeTheoDuoiAnhSang.mp3",
      image:" image/KeTheoDuoiAnhSang.jpg"
    },
    {
      name: "Nếu Là Anh",
      singer: "Nam Nam",
      path:"music/NeuLaAnh.mp3",
      image: "image/NeuLaAnh.jpg"
    },
    {
      name: "Nơi Này Có Anh",
      singer: "Sơn Tùng",
      path: "music/NoiNayCoAnh.mp3",
      image:
        "image/NoiNayCoAnh.jpg"
    },
    {
      name: "Người Ấy",
      singer: "Trịnh Thăng Bình",
      path: "music/NguoiAy.mp3",
      image:"image/NguoiAy.jpg"
    },
    {
      name: "Hồi kết",
      singer: "Wind",
      path:"music/HoiKet.mp3",
      image:"image/HoiKet.jpg"
    },
    {
      name: "Người yêu giản đơn",
      singer: "Chi Dân",
      path: "music/NguoiYeuGianDon.mp3",
      image:"image/NguoiYeuGianDon.jpg"
    },
    {
      name: "11:11",
      singer:"MiiNa",
      path:"music/11.mp3",
      image:"image/11.jpg"
    },
    {
      name: "20 Năm Ở Thế Giới",
      singer: "Thịnh Suy",
      path:"music/20NamOTheGioi.mp3",
      image:"image/20NamOTheGioi.jpg"
    },
    {
      name: "Âm Thầm Bên EM",
      singer: "Sơn Tùng MTP",
      path:"music/AmThamBenEm.mp3",
      image:"image/AmThamBenEm.jpg"
    },
    {
      name: "Chỉ Bằng Cái Gật Đầu",
      singer: "Yan Nguyễn",
      path:"music/ChiBangCaiGatDau.mp3",
      image:"image/ChiBangCaiGatDau.jpg"
    },
    {
      name: "Họ Yêu Ai Mất Rồi",
      singer: "Doãn Hiếu",
      path:"music/HoYeuAiMatRoi.mp3",
      image:"image/HoYeuAiMatRoi.jpg"
    },
    {
      name: "Lâu Không Cười",
      singer: "Phạm Nguyên Ngọc",
      path:"music/LauKhongCuoi.mp3",
      image:"image/LauKhongCuoi.jpg"
    },
    {
      name: "Mất Trí Nhớ",
      singer: "Chi Dân",
      path:"music/MatTriNho.mp3",
      image:"image/MatTriNho.jpg"
    },
    {
      name: "Một Mình Ta ",
      singer: "Bùi Trương Linh",
      path:"music/MotMinhTa.mp3",
      image:"image/MotMinhTa.jpg"
    },
    {
      name: "Người Tôi Yêu",
      singer: "Chi Dân",
      path:"music/NguoiToiYeu.mp3",
      image:"image/NguoiToiYeu.jpg"
    },
    {
      name: "Phía Sau Một Cô Gái",
      singer: "Soobin Hoàng Sơn",
      path:"music/PhiaSauMotCoGai.mp3",
      image:"image/PhiaSauMotCoGai.jpg"
    },
    {
      name: "Yêu Em Rất Nhiều",
      singer: "Hoàng Tôn",
      path:"music/YeuEmRatNhieu.mp3",
      image:"image/YeuEmRatNhieu.jpg"
    },
    {
      name: "Yêu Nhau Nhé! Bạn Thân",
      singer: "Phạm Đình Thái Ngân",
      path:"music/YeuNhauNheBanThan.mp3",
      image:"image/YeuNhauNheBanThan.jpg"
    },
    {
      name: "Đáp Án Cuối Cùng",
      singer: "Quân AP",
      path:"music/DapAnCuoiCung.mp3",
      image:"image/DapAnCuoiCung.jpg"
    },
    {
      name: "Tong Hua",
      singer: "Wind",
      path:"music/TongHua.mp3",
      image:"image/TongHua.jpg"
    },
    {
      name: "Nguyệt Lão Nối Tơ Hồng",
      singer: "Mao Tỉnh Đồng",
      path:"music/NguyetLaoNoiToHong.mp3",
      image:"image/NguyetLaoNoiToHong.jpg"
    },

  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();
