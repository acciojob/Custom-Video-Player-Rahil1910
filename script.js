const player = document.querySelector('.player');
        const video = player.querySelector('.viewer');
        const progress = player.querySelector('.progress');
        const progressBar = player.querySelector('.progress__filled');
        const toggle = player.querySelector('.toggle');
        const skipButtons = player.querySelectorAll('[data-skip]');
        const ranges = player.querySelectorAll('.player__slider');

        // Play/Pause Toggle
        toggle.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                toggle.textContent = '❚ ❚'; // Change to pause symbol
            } else {
                video.pause();
                toggle.textContent = '►'; // Change to play symbol
            }
        });

        // Update progress bar
        video.addEventListener('timeupdate', () => {
            // Ensure the progress bar width updates
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progress}%`;
        });

        // Skip buttons
        skipButtons.forEach(button => {
            button.addEventListener('click', () => {
                const skip = parseFloat(button.dataset.skip); // Get the skip time
                video.currentTime += skip; // Skip the video by the specified time
            });
        });

        // Update volume and playback rate based on sliders
        ranges.forEach(range => {
            range.addEventListener('input', () => {
                if (range.name === 'volume') {
                    video.volume = range.value; // Set volume
                } else if (range.name === 'playbackRate') {
                    video.playbackRate = range.value; // Set playback speed
                }
            });
        });

        // Allow clicking on the progress bar to skip to specific time
        progress.addEventListener('click', (e) => {
            const progressWidth = progress.offsetWidth; // Get the full width of the progress bar
            const clickPosition = e.offsetX; // Get where the click happened
            const newTime = (clickPosition / progressWidth) * video.duration; // Calculate the new time
            video.currentTime = newTime; // Jump to the clicked time
        });