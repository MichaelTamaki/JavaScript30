const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
	if (video.paused) {
		video.play();
	}
	else {
		video.pause();
	}
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.innerHTML = icon;
}

function updateProgress() {
	let currentTime = video.currentTime;
	let duration = video.duration;
	let percent = (currentTime / duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function skipButton() {
	let amt = parseInt(this.dataset.skip);
	video.currentTime += amt;
}

function updateRange() {
	video[this.name] = this.value;
}

function scrub(e) {
	let newTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = newTime;
}

toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
skipButtons.forEach(button => button.addEventListener("click", skipButton));
ranges.forEach(range => {
	range.addEventListener("change", updateRange)
	range.addEventListener("mousemove", updateRange);
	});
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);