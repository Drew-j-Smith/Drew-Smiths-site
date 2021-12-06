

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

