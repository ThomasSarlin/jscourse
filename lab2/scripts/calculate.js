
window.onload=()=>{
    addSumColumn();
    addSumRow();
    addSumButton();
    setNumberRestriction();
}
/**
 * Funktion som rundar av ifall man skriver in decimaler i input fältet.
 * Så man inte kan räkna på en halv produkt.
 */
function setNumberRestriction(){
    var numbers = document.getElementsByTagName('input');
    [...numbers].forEach((e)=>{
        e.addEventListener('change',()=>{
            e.value=Math.floor(e.value);
        })
    })
}
/**
 * Lägger till en summa column för alla rader.
 */
function addSumColumn(){
    var trArr=document.getElementsByTagName('tr');
    var thSum=document.createElement('th');
    thSum.innerHTML="Summa";
    trArr[0].appendChild(thSum);
    [...trArr].forEach((e,i)=>{
        if(i>0){
            thSum=document.createElement('td');
            e.appendChild(thSum);
        }
    });
}
/**
 * Lägger till en rad för summeringen med id sumrow
 */
function addSumRow(){
    var tbody = document.getElementsByTagName('tbody')[0];
    thSum=document.createElement('tr');
    thSum.setAttribute("id","sumrow");
    for(var i=0;i<6;i++)thSum.append(document.createElement('td'));
    tbody.append(thSum);
}
/**
 * Lägger till en summeringsknapp med klass btn & btn-primary
 * och sätter click funktionen till calculate.
 */
function addSumButton(){
    var pricetable = document.getElementById('pricetable');
    var button = document.createElement('button');
    button.setAttribute("class","btn btn-primary");
    button.innerHTML="Beräkna pris";
    pricetable.appendChild(button);
    button.addEventListener('click',calculate);
}
/**
 * Räknar ut summa rad för rad samt totalen.
 */
function calculate(){
    var pNum,cost,products=0,sum=0;
    var tdArr = document.getElementsByTagName('tr');
    [...tdArr].forEach((e,i)=>{
        var c=e.children;
        if(i>0&&i<tdArr.length-1){ 
            pNum=parseInt(c[4].firstChild.value);
            cost=parseInt(c[3].innerHTML);
            c[5].innerHTML=pNum*cost;
            products+=pNum;
            sum+=(parseInt(c[5].innerHTML));
        }
        if(i==tdArr.length-1){
            c[4].innerHTML=products;
            c[5].innerHTML=sum;
        }
    });
}