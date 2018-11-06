
window.onload=()=>{
    document.getElementById('registration_form').addEventListener('submit',validate);
};

function validate(e){
    var result;
    if(!(result=checkFields()))
        e.preventDefault();
    return result;
}

function checkFields(){
    var result=true;
    var first_name = document.getElementById('field_firstname');
    var last_name = document.getElementById('field_lastname');
    var email = document.getElementById('field_email');
    var organisation = document.getElementById('field_organisation');
    
    checkTextField(first_name)?"":result=false;
    checkTextField(last_name)?"":result=false;
    checkTextField(organisation)?"":result=false; 
    checkEmailFormat(email)?"":result=false;
    if(!result){
        var text = document.createTextNode("Formuläret ej ifyllt korrekt");
        document.getElementById('registration_form').parentNode.insertBefore(text, document.getElementById('registration_form').nextSibling)
    }
    return result;
};
function checkTextField(element){
    if(element.textContent.length==0){
        console.log(element.parentElement);
        element.style.border="red";
        element.style.borderWidth="1px";
        element.style.borderStyle="solid";
        var text = document.createTextNode("Fältet oven får ej lämnas tomt");
        element.parentNode.insertBefore(text, element.nextSibling)
    }
}
function checkEmailFormat(email){
    var text;
    var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if(email.textContent!=""){
        if(pattern.test(email.textContent)){
            return true;
        }else{
            email.style.border="red";
            email.style.borderWidth="1px";
            email.style.borderStyle="solid";
            text = document.createTextNode("Felaktigt format");
            email.parentNode.insertBefore(text, email.nextSibling)
        }
        
    }else{
            email.style.border="red";
            email.style.borderWidth="1px";
            email.style.borderStyle="solid";
        text = document.createTextNode("Fältet oven får ej lämnas tomt");
        email.parentNode.insertBefore(text, email.nextSibling)
    }
    return false;
}
