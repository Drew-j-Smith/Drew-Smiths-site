function resizeYoutubeVideos(){ //sets youtube videos to 16:9
    let iframes = document.querySelectorAll(".youtube-video");
    iframes.forEach(element => {
        element.style.height = element.offsetWidth * 9. / 16. + "px";
    });
}

resizeYoutubeVideos(); //sets youtube videos to 16:9 on load
window.onresize = resizeYoutubeVideos; //sets youtube videos to 16:9 when resizing



let select = document.querySelector(".filter"); //filter selection
if (select !== null){
    let projects = document.querySelectorAll(".project"); //elements to filter
    let optionElements = select.querySelectorAll("option"); //filter options
    let options = [];
    optionElements.forEach(element => {
        options.push(element.value);
    });

    function filter(){
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
}


function adjustFooter() { //sets footer to bottom
    let main = document.querySelector(".main")
    let footer = document.querySelector("footer");
    if(main.getBoundingClientRect().bottom + footer.offsetHeight + main.style.paddingBottom < window.innerHeight){
        //if the footer is not at the bottom move it
        footer.style.position = "fixed";
        footer.style.bottom = 0;
    }
    else{
        //reset footer
        footer.style.position = null;
        footer.style.bottom = null;
    }
}

window.onload = adjustFooter;
window.onchange = adjustFooter;
