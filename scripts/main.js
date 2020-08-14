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
    let chips = document.querySelectorAll(".project-descriptor"); //what the filter checks against
    let projects = document.querySelectorAll(".project"); //elements to filter

    for (let i = 0; i < options.length; i++) {
        if(select.selectedIndex === i){
            if (i === 0){//default state, shows all elements
                projects.forEach(element => {
                    element.style.visibility = null;
                    element.style.height = null;
                    element.style.padding = null;
                });
            }
            else{
                projects.forEach(element => {//hides all elements
                    element.style.visibility = "hidden";
                    element.style.height = "0px";
                    element.style.padding = "0px";
                });
                chips.forEach(element => {//only shows the element if it matches filter
                    if (element.textContent === options[i]){
                        element.parentElement.parentElement.parentElement.style.visibility = null;
                        element.parentElement.parentElement.parentElement.style.height = null;
                        element.parentElement.parentElement.parentElement.style.padding = null;
                    }
                });
            }
        }
    }
}

filter(); //filter on startup
select.onchange = filter; //filter every time the filter changes
