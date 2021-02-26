
/****   Smooth Scroll for Nav-bar and all sections ***/
var navBarLinks = document.getElementsByClassName("nav-link"); //all navbar anchol tags 

function scroll(elementID)
{
    let ourelement = document.getElementById(elementID);
    let coordinates = ourelement.getBoundingClientRect();
    let destination = coordinates["y"] ;

    let currentPos = 0 ;

    var timeInteralID = setInterval( function(){
        if( currentPos >= destination){
            clearInterval(timeInteralID);
            return;
        }else{
            window.scrollBy(0,10);
            currentPos+=10;
        }
    } , 5);

}



for(let i = 0 ; i < navBarLinks.length ; i++){

    navBarLinks[i].addEventListener('click' , function(event){
    event.preventDefault(); //this will prevent the defaut click event

    let elementID = this.getAttribute("linkTo");

    scroll(elementID);
        
    });

}

/******* Skill Bar Auto-Fill ******/

var skillBars = document.querySelectorAll(".skills_progress > div");
var skillDisplay = document.getElementById("skills_display");

//this function empties the bar
function initilise (bar){
    bar.style.width = 0+"%";
}

//this function fills individual bars
function fillBars(bar){
   
    let initialVal = 0 ;
    let finalVal = bar.getAttribute("data-value");
    let interval = setInterval(function(){
        if(initialVal == finalVal){
            clearInterval(interval);
            return
        }else{
            bar.style.width = initialVal+"%";
            initialVal++;
        }
    } , 10)
}

//we keep a track of  each and use this bool to keep check
//if a bar has been animated or not
//for each i'th bar
//false -> not animated
//true  -> animated already 
//we use this bool to keep ensure taht the bar is not iterated at each slight scroll
let check = new Array( skillBars.length );
for(let i = 0 ; i < skillBars.length ; i++){
    check[i] = false;
}


function scrollCheck (){
    
    for(let i = 0 ; i < skillBars.length ; i++){

        let coordinates_bar = skillBars[i].getBoundingClientRect();
        
        if(coordinates_bar["y"] <= 0.97*window.innerHeight && check[i]==false ){
            check[i] = true;
            fillBars(skillBars[i] );
            console.log(check[i]);
        }else if(coordinates_bar["y"] > window.innerHeight ){

            initilise(skillBars[i]);
            check[i] = false;
        }
    }
}


window.addEventListener('scroll' , scrollCheck);


