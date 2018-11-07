/*
*   Skrivet av Thomas Sarlin 
*   Webbdesign med JavaScript och
*   Document Object Model, 7.5 hp
*   Examinationsuppgift 1
*   Dynamisk uppdatering av sidinnehåll
*   6/11-18
*/

$("#tabell").hide();

$(document).ready(()=>{
    buttonSetup();
});

function buttonSetup(){
    $("#sok-button").click(()=>{
        $("#tabell").hide();
        checkTextField($('#livsmedelsSokOrd').val())
            ?searchLivsmedel($('#livsmedelsSokOrd').val()):"";
    });
}

function getLivsmedel(){
    if(arguments[0].livsmedel.length!=0)showLivsmedel(arguments);
}

function showLivsmedel(arguments){
    $('#tabell>tbody').empty();
    var livsArr=arguments[0].livsmedel;
    [...livsArr].forEach((e,index)=>{
        $('#tabell>tbody').append($('<tr></tr>'));
        for(var i=0;i<5;i++){
            $('#tabell>tbody').children().eq(index).append($('<td></td>'));
        }
        var grandchild =$('#tabell>tbody').children().eq(index);
        grandchild.children().eq(0).html(e.namn);
        grandchild.children().eq(1).html(e.energi);
        grandchild.children().eq(2).html(e.kolhydrater);
        grandchild.children().eq(3).html(e.protein);
        grandchild.children().eq(4).html(e.fett);
    });
    $("#tabell").show();
}

function searchLivsmedel(value){
    $.ajax({
        url:"https://webservice.informatik.umu.se/"
            +"webservice_livsmedel/getlivsmedel.php?namn="+value,
        dataType:"jsonp",
        success:getLivsmedel
    })
}

function checkTextField(value){
    var result=true;
    if(value==""){
        setBorder();
        result=false;
    }else{
        removeBorder();
    }
    return result;
}

function setBorder(){
    $('#livsmedelsSokOrd').css({
        "border":"red",
        "borderWidth":"1px",
        "borderStyle":"solid"
    });  
}
function removeBorder(){
    $('#livsmedelsSokOrd').css({
        "border":"#ccc",
        "borderWidth":"1px",
        "borderStyle":"solid"
    });
}