import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// ініціалізація плеєра
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onPlay = function (data) {
  // data is an object containing properties specific to that event
};

player.on('play', onPlay);

// відстеження події, додавання часу відтворення у локальне сховище і оновлення не частіше, ніж раз на секунду
player.on(
  'timeupdate',
  throttle(evt => {
    localStorage.setItem('videoplayer-current-time', evt.seconds);
  }, 1000)
);

// відновлення відтворення зі збереженої позиції
player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);
