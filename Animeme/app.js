(function () {
    document.title = "Animeme"

    var app = document.querySelector("#app")

    var body = `
    <h1>Animeme UwU</h1>
    <p>Tell me you humor status... everything about it!</p>
    <p>Lets start!<p>
    `
    
    app.insertAdjacentHTML("afterbegin", `
    ${body}
    `)

    function audioLogic() {
        const downloadLink = document.getElementById('download');
        const stopButton = document.getElementById('stop');
        const player = document.getElementById('player')
      
      
        const handleSuccess = function(stream) {
          const options = {mimeType: 'audio/webm'};
          const recordedChunks = [];
          const mediaRecorder = new MediaRecorder(stream, options);
      
          mediaRecorder.addEventListener('dataavailable', function(e) {
            if (e.data.size > 0) recordedChunks.push(e.data);
          });
      
          mediaRecorder.addEventListener('stop', function() {
            downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
            player.src = downloadLink.href
            downloadLink.download = 'acetest.wav';
          });
      
          stopButton.addEventListener('click', function() {
            mediaRecorder.stop();
          });
      
          mediaRecorder.start();
        };
      
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(handleSuccess);
    }

    audioLogic()
})()