document.getElementById('selectMedia').addEventListener('click', recordClick, false);

//https://developer.chrome.com/extensions/desktopCapture
function recordClick() {
    chrome.desktopCapture.chooseDesktopMedia(["screen", "window", "tab", "audio"], accessToRecord);
}

// Supported audio constraints: https://addpipe.com/blog/audio-constraints-getusermedia/
function accessToRecord(id, audioState) {
    // if statement checks the canRequestAudioTrack object of the audioState argument given to accessToRecord()
    if (audioState.canRequestAudioTrack) {
        console.log("Audio is being recorded");
    } else {
        console.log("Audio is not being recorded.")
    }
    navigator.mediaDevices.getUserMedia({
        audio: {
            mandatory: {
                chromeMediaSource: "desktop",
                chromeMediaSourceId: id
            }
        },
        video: {
            mandatory: {
                chromeMediaSource: "desktop",
                chromeMediaSourceId: id,
                maxFrameRate: 30
//https://stackoverflow.com/questions/44353801/how-to-add-audio-in-desktop-capture-in-chrome-extension
            }
        }
    }).then(startStream).catch(failedStream);
}



function startStream(stream) {
    var video = document.getElementById('mainScreen');
    //video.src = URL.createObjectURL(stream); //converts video binary code into URL
    //^^^ above was deprecated (or soon will be)
    // https://www.chromestatus.com/features/5618491470118912
    console.log(stream);
    try {
        video.srcObject = stream;
    } catch (error) {
        video.src = URL.createObjectURL(stream);
    }
}

function failedStream() {
    console.log("Stream failure.");
}



// FIGURE OUT HOW TO CAPTURE THE MEDIA AND SAVE TO FILE
// https://developers.google.com/web/updates/2016/01/mediarecorder
// https://developers.google.com/web/updates/2016/10/capture-stream
// https://webrtc.github.io/samples/src/content/getusermedia/record/

// https://addpipe.com/blog/mediarecorder-api/
// https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API
// https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Recording_a_media_element