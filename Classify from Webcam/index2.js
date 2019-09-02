let net;

// Add the webcam element
const webcamElement = document.getElementById('webcam');

//Infinite loop to predict via webcam
async function app() {
  console.log('Loading mobilenet..');

// Load the model.
net = await mobilenet.load();
  console.log('Sucessfully loaded model');

async function setupWebcam()
 {
  return new Promise((resolve, reject) =>
  {
    const navigatorAny = navigator;
      navigator.getUserMedia = navigator.getUserMedia ||
          navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
          navigatorAny.msGetUserMedia;
    if (navigator.getUserMedia)
      {
        navigator.getUserMedia({video: true},
          stream =>
          {
            webcamElement.srcObject = stream;
            webcamElement.addEventListener('loadeddata',  () => resolve(), false);
          },
          error => reject());
      }
    else
     {
      reject();
     }
    });
  }

await setupWebcam();
  while (true) {
    const result = await net.classify(webcamElement);

document.getElementById('console').innerText = `
  prediction: ${result[0].className}\n
  probability: ${result[0].probability}
    `;

// Breathing room for the next animation frame.
    await tf.nextFrame();
  }
}

app();
