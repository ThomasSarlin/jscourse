$(document).ready(generateMenu);
var showmenu=false;
var recepie="Recept"
function generateMenu() {
    $("#secondarycontent").prependTo("#primarycontainer");
    $("#receptmeny>h4").html(recepie+'&#x25BC');
    $("#receptmeny>.contentarea").hide();
    
    $("#receptmeny>h4").click(()=>{
        toggle();
    });
    $('#receptmeny>.contentarea').append('<ul></ul>');
    
    $("#receptmeny>.contentarea>ul").css({
        "columns": "3",
        "webkit-columns": "3",
        "-moz-columns": "3",
        "width":"1000px"
    })
    var posts = document.getElementsByClassName('post');
    $(posts).hide();
    $(posts).eq(0).show();
    [...posts].forEach((e,i)=>{
        $('#receptmeny>.contentarea').children().eq(0).append('<li></li>');
        $('#receptmeny>.contentarea')
        .children().eq(0).children().eq(i)
        .html(e.children[0].innerHTML);
    });
    var liArr= document.getElementsByTagName('li');
    [...liArr].forEach((e,i)=>{
        $(e).click(()=>{
            $(posts).hide();
            $(posts).eq(i).show();
            toggle();
            $("#receptmeny>.contentarea").hide();
        });
    });
}
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