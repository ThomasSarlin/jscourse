/*
*   Skrivet av Thomas Sarlin 
*   Webbdesign med JavaScript och
*   Document Object Model, 7.5 hp
*   Examinationsuppgift 1
*   Dynamiskt visade och dolda sidkomponenter
*   Betygsmål: VG
*/

$(document).ready(generateMenu);
var showmenu=false;
var recepie="Recept"
function generateMenu() {
    setMenu();
    setMenuAlternatives();
}
/**
 * namn:    setMenu
 * Syfte:   Förflyttar menyn under headern,
 *          ställer in dess stil, döljer menyalternativen
 *          och sätter menyradens clickfunktion.
 */
function setMenu(){
    $("#secondarycontent").prependTo("#primarycontainer");
    $('#secondarycontent').removeClass('col-lg-4');
    $("#secondarycontent").click(toggle);
    $("#receptmeny>h4").html(recepie+'&#x25BC');
    $("#receptmeny>h4").css("user-select", "none");
    $("#receptmeny>.contentarea").hide();
}
/**
 * namn:    setMenuAlternatives
 * Syfte:   Genererar menyn utifrån de poster som finns i html-dokumentet.
 */
function setMenuAlternatives(){
    var posts = document.getElementsByClassName('post');
    appendUl();
    postSetup(posts);
    appendLi(posts);
    setLi(posts);
}
/**
 * namn:    appendUl
 * Syfte:   Lägger till ett ul-element i receptmenyn och sätter dess stil.
 */
function appendUl(){
    $('#receptmeny>.contentarea').append('<ul></ul>');
    $("#receptmeny>.contentarea>ul").css({
        "columns": "3",
        "webkit-columns": "3",
        "-moz-columns": "3",
        "width":"100%"
    })
}
/**
 * namn:    postSetup
 * Syfte:   Döljer alla poster förutom den första.
 */
function postSetup(posts){
    $(posts).hide();
    $(posts).eq(0).show();
}
/**
 * namn:        appendLi
 * Syfte:       Lägger till ett li-element samt a-element
 *              för varje post samt lägger till
 *              texten som representerar elementet.
 * parameter:   posts - array med alla post-element
 */
function appendLi(posts){
    [...posts].forEach((e,i)=>{
        $('#receptmeny>.contentarea').children().eq(0).append('<li></li>');
        $('#receptmeny>.contentarea')
            .children().eq(0).children().eq(i)
            .html('<a>'+e.children[0].innerHTML.trim()+'</a>');
    });
}
/**
 * namn:    setLi
 * Syfte:   lägger till funktionalitet på li-elementen 
 * parameter: posts - array med alla post-element
 */
function setLi(posts){
    var liArr= document.getElementsByTagName('li');
    [...liArr].forEach((li,i)=>{
        setLiStyle(li);
        setLiClick(li,posts,i);
        setLiHover(li);
    });
}
/**
 * namn:    setLiStyle
 * Syfte:   Sätter style på ett li-element
 * parameter: li-element
 */
function setLiStyle(li){
    $(li).css({"color":"#666","user-select":"none"});
}
/**
 * namn:    setLiHover
 * Syfte:   Sätter hover-funktion på ett li-element
 * parameter: li-element
 */
function setLiHover(li){
    $(li).hover(()=>{
        $(li).css("color","black");
    },()=>{
        $(li).css("color","#666");
    });
}
/**
 * namn:    setLiStyle
 * Syfte:   Sätter click-funktion på ett li-element
 * parameter:   li-element,
 *              posts - array med alla post element,
 *              li-elementets index
 */
function setLiClick(li,posts,i){
    $(li).click(()=>{
        $(posts).hide();
        $(posts).eq(i).show();
    });
}
/**
 * namn:    toggle
 * Syfte:   reglerar synligheten på menyn
 */
function toggle(){
    if(!showmenu){
        $("#receptmeny>.contentarea").show();
        $("#receptmeny>h4").html(recepie+'&#x25B2');
    }
    else{
        $("#receptmeny>.contentarea").hide();
        $("#receptmeny>h4").html(recepie+'&#x25BC');
    }
    showmenu=!showmenu;
}