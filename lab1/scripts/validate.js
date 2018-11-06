/*
*   Skrivet av Thomas Sarlin 
*   Webbdesign med JavaScript och
*   Document Object Model, 7.5 hp
*   Examinationsuppgift 1
*   Validering av formulär
*/


var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/; 
//Skapar textnoder för att kunna skicka ut meddelanden till anv. vid behov
var emailNotification = document.createTextNode("");
var first_nameNotification = document.createTextNode("");
var last_nameNotification = document.createTextNode("");
var organisationNotification = document.createTextNode("");
var last_nameNotification = document.createTextNode("");
var mainNotification = document.createTextNode("");
var checkboxNotification = document.createTextNode("");
var first_name,last_name,email,organisation,checkbox,checkbox_message;
window.onload=()=>{
    setSubmitHandler();
    setMaxMessageLength();
}
function loadVariables(){
    first_name = document.getElementById('field_firstname');
    last_name = document.getElementById('field_lastname');
    email = document.getElementById('field_email');
    organisation = document.getElementById('field_organisation');
    checkbox = document.querySelector('input[name="pres_type"]:checked');
    checkbox_message = document.getElementById('field_pres_title');
}
function setSubmitHandler(){
    document.getElementById('registration_form')
        .addEventListener('submit',validate);
}

/** 
 *  Begränsar antalet tecken som kan skrivas in i textfältet till 200.
 * */
function setMaxMessageLength(){
    var messageField=document.getElementById('field_message');
    messageField.addEventListener('keyup',()=>{
        if (messageField.value.length > 200) {
            messageField.value = messageField.value.substring(0, 200);
        } 
    });
}
function validate(e){
    var result;
    if(!(result=checkFields()))
        e.preventDefault(); //ignorera submit om något är felaktigt ifyllt
    return result;
}

function checkFields(){
    var result=true;
    loadVariables();
    checkTextField(first_name,first_nameNotification)?"":result=false;
    checkTextField(last_name,last_nameNotification)?"":result=false;
    checkTextField(organisation,organisationNotification)?"":result=false; 
    checkEmailFormat(email,emailNotification)?"":result=false;
    checkboxValidation(checkbox,checkbox_message,checkboxNotification)?"":result=false;
    if(!result){
        setTextField(mainNotification,"Formuläret ej ifyllt korrekt");
        insertTextField(document.getElementById('registration_form')
            ,mainNotification);
    }else{
        hideTextField(mainNotification);
    }
    return result;
};

function checkTextField(element,textField){
    var result=true;
    if(emptyfield(element.value)){
        setBorder(element);
        setTextField(textField,"Fältet oven får ej lämnas tomt");
        insertTextField(element,textField);
        result=false;
    }else{
        removeBorder(element);
        hideTextField(textField);
    }
    return result;
}

function insertTextField(element,textField){
    element.parentNode.insertBefore(textField, element.nextSibling);
}

function checkboxValidation(element,comment,textField){
    var result=true;
    if(emptyfield(comment.value)
        && (element.id=='pres_type_1' || element.id=='pres_type_2')){
        result=false;
        setTextField(textField,"Fältet ovan får ej vara tomt"+
        " vid föreläsning/seminarie");
        insertTextField(comment,textField);
        setBorder(comment);
    }else{
        removeBorder(comment);
        hideTextField(textField);
    }
    return result;
}

function setBorder(element){
    element.style.border="red";
    element.style.borderWidth="1px";
    element.style.borderStyle="solid";    
}
function removeBorder(element){
    element.style.border="#ccc";
    element.style.borderWidth="1px";
    element.style.borderStyle="solid";  
}
function hideTextField(element){
    element.textContent="";
}
function setTextField(element,value){
    element.textContent=value;
}
function emptyfield(a){
    return a=="";
}
function checkEmailFormat(email,textField){
    if(!emptyfield(email.value)){
        if(pattern.test(email.value)){
            removeBorder(email);
            hideTextField(textField);
            return true;
        }else{
            setBorder(email);
            setTextField(textField,"Ogiltigt mail format");
            insertTextField(email,textField);
        }
    }else{
        setBorder(email);
        setTextField(textField,"Fältet oven får ej lämnas tomt");
        insertTextField(email,textField);
    }
    return false;
}
