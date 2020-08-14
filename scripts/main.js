function resizeYoutubeVideos(){ //sets youtube videos to 16:9
    let iframes = document.querySelectorAll(".youtube-video");
    iframes.forEach(element => {
        element.style.height = element.offsetWidth * 9. / 16. + "px";
    });
}

resizeYoutubeVideos(); //sets youtube videos to 16:9 on load
window.onresize = resizeYoutubeVideos; //sets youtube videos to 16:9 when resizing



const select = document.querySelector(".filter"); //filter selection
let optionElements = select.querySelectorAll("option"); //filter options
var options = [];
optionElements.forEach(element => {
    options.push(element.value);
});

function filter(){
    let projects = document.querySelectorAll(".project"); //elements to filter

    for (let i = 0; i < options.length; i++) {
        if(select.selectedIndex === i){
            projects.forEach(element => {//tests if element passes filter
                if (element.classList.contains(options[i])){
                    element.style.visibility = null;
                    element.style.height = null;
                    element.style.padding = null;
                }
                else {
                    element.style.visibility = "hidden";
                    element.style.height = "0px";
                    element.style.padding = "0px";
                }
            });
        }
    }
}

filter(); //filter on startup
select.onchange = filter; //filter every time the filter changes
