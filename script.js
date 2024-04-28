document.addEventListener("DOMContentLoaded", function () {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(function (stream) {
                var video = document.getElementById('cameraPreview');
                video.srcObject = stream;
                video.play();

                Quagga.init({
                    inputStream: {
                        name: "Live",
                        type: "LiveStream",
                        target: video
                    },
                    decoder: {
                        readers: ["ean_reader"] // or other barcode types you want to detect
                    }
                }, function (err) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log("QuaggaJS initialization succeeded");

                    Quagga.start();
                });

                Quagga.onDetected(function (result) {
                    var code = result.codeResult.code;
                    var $result = document.getElementById('result');
                    $result.innerHTML = 'Barcode detected: ' + code;
                });
            })
            .catch(function (err) {
                console.error("Error accessing the camera:", err);
            });
    } else {
        console.error("getUserMedia not supported");
    }
});
