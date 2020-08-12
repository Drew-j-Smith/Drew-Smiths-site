

//sets youtube videos to 16:9
function resizeYoutubeVideos(){
    let iframes = document.querySelectorAll(".youtube-video");
    iframes.forEach(element => {
        element.style.height = element.offsetWidth * 9. / 16. + "px";
    });
}

//sets youtube videos to 16:9 on load
resizeYoutubeVideos();

//sets youtube videos to 16:9 when resizing
window.onresize = resizeYoutubeVideos;

