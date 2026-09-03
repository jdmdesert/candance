const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.nav');
const modal = document.querySelector('.modal-backdrop');
const formView = document.querySelector('.form-view');
const successView = document.querySelector('.success-view');
const videoPlayer = document.querySelector('.video-frame iframe');
const videoLocalMessage = document.querySelector('.video-local-message');

if (window.location.protocol === 'file:') {
  videoLocalMessage.hidden = false;
} else {
  let playerLoaded = false;
  let shouldPlay = false;

  function sendVideoCommand(command) {
    if (!playerLoaded || !videoPlayer.contentWindow) return;
    videoPlayer.contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func: command,
      args: []
    }), 'https://www.youtube.com');
  }

  videoPlayer.addEventListener('load', () => {
    playerLoaded = true;
    if (shouldPlay) sendVideoCommand('playVideo');
  });

  const videoObserver = new IntersectionObserver(entries => {
    const visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.55;
    shouldPlay = visible;

    if (visible && !videoPlayer.src) {
      const separator = videoPlayer.dataset.src.includes('?') ? '&' : '?';
      videoPlayer.src = `${videoPlayer.dataset.src}${separator}autoplay=1&origin=${encodeURIComponent(window.location.origin)}`;
    } else if (visible) {
      sendVideoCommand('playVideo');
    } else {
      sendVideoCommand('pauseVideo');
    }
  }, { threshold: [0, 0.55, 1] });

  videoObserver.observe(document.querySelector('.video-frame'));
}

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.textContent = open ? '×' : '☰';
});

navigation.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
});

function openTrial(className = 'Not sure yet') {
  modal.querySelector('select[name="style"]').value = className;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  setTimeout(() => modal.querySelector('input').focus(), 0);
}

function closeTrial() {
  modal.hidden = true;
  document.body.style.overflow = '';
  formView.hidden = false;
  successView.hidden = true;
}

document.querySelectorAll('.trial-button').forEach(button => button.addEventListener('click', () => openTrial()));
document.querySelectorAll('.try-class').forEach(button => button.addEventListener('click', () => openTrial(button.dataset.class)));
document.querySelector('.modal-close').addEventListener('click', closeTrial);
document.querySelector('.done-button').addEventListener('click', closeTrial);
modal.addEventListener('click', event => { if (event.target === modal) closeTrial(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.hidden) closeTrial(); });
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  formView.hidden = true;
  successView.hidden = false;
});
