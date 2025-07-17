const soundboardDiv = document.getElementById('soundboard');

function createSoundTile(sound) {
  const tile = document.createElement('div');
  tile.className = 'sound-tile';

  const nameDiv = document.createElement('div');
  nameDiv.className = 'sound-name';
  nameDiv.textContent = sound.name;

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'sound-actions';

  // Play button
  const playBtn = document.createElement('button');
  playBtn.textContent = "▶️ Play";
  const audio = document.createElement('audio');
  audio.src = `sounds/${sound.file}`;
  audio.preload = "auto";
  playBtn.onclick = () => {
    audio.currentTime = 0;
    audio.play();
  };

  // Download button
  const downloadLink = document.createElement('a');
  downloadLink.href = `sounds/${sound.file}`;
  downloadLink.download = sound.file;
  downloadLink.textContent = "⬇️ Download";

  actionsDiv.appendChild(playBtn);
  actionsDiv.appendChild(downloadLink);

  tile.appendChild(nameDiv);
  tile.appendChild(actionsDiv);
  tile.appendChild(audio);

  return tile;
}

// Fetch sounds/list.json and render
fetch('sounds/list.json')
  .then(res => res.json())
  .then(sounds => {
    soundboardDiv.innerHTML = '';
    sounds.forEach(sound => {
      soundboardDiv.appendChild(createSoundTile(sound));
    });
  })
  .catch(err => {
    soundboardDiv.innerHTML = '<div style="color:red">Could not load sound list.</div>';
    console.error(err);
  });