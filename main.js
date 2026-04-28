let addIcon=document.getElementById("add");
let setAlarmContainer=document.getElementById("set-alarm-container");
let setBtn=document.getElementById("set-btn");
let now=new Date();
let today=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;

const toggleOff=(checkbox)=>{
    checkbox.checked=false;
}
const ringAlarm=(date,checkbox,isFromLoad)=>{
    let todayDT=new Date();
    let remainTime= date-todayDT;
    if(remainTime <= 0){
        if(!isFromLoad){
            alert("Please choose future time");
        }
        toggleOff(checkbox);
        return;
    }
    let timeOutId=setTimeout(() => {
        if(checkbox.checked){
        console.log("ringing");}
        toggleOff(checkbox);
    }, remainTime);
    return timeOutId;
}
const setAlarm=(id,date,inpHours,inpMinutes,amPmSelect,alarmName,isFromLoad=false)=>{
    let alarmContainerDiv=document.getElementById("alarm-container");
    let p=document.createElement("p");
    p.innerText=alarmName;
    let h1=document.createElement("h1");
    h1.innerText=`${inpHours}:${inpMinutes} ${amPmSelect}`;
    let alarmContentDiv=document.createElement("div");
    alarmContentDiv.classList.add("alarm-content");
    alarmContentDiv.appendChild(p);
    alarmContentDiv.appendChild(h1);
    let datep=document.createElement("p");
    datep.innerText=date.toDateString();
    let checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.name="toggle";
    checkbox.checked=true;
    let span=document.createElement("span");
    span.classList.add("slider");
    let label=document.createElement("label");
    label.classList.add("toggle");
    label.appendChild(checkbox);
    label.appendChild(span);
    let icon=document.createElement("i");
    icon.classList.add("fa-solid","fa-trash");
    icon.id="trash";
    let deleteDiv=document.createElement("div");
    deleteDiv.classList.add("delete");
    deleteDiv.appendChild(icon);
    let dateContainerDiv=document.createElement("div");
    dateContainerDiv.classList.add("date-container");
    dateContainerDiv.appendChild(datep);
    dateContainerDiv.appendChild(label);
    dateContainerDiv.appendChild(deleteDiv);
    let alarmDiv=document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.appendChild(alarmContentDiv);
    alarmDiv.appendChild(dateContainerDiv);
    alarmContainerDiv.appendChild(alarmDiv);
    let timeOutId=ringAlarm(date,checkbox,isFromLoad);
    icon.addEventListener("click",()=>{
    if(confirm("confirm, you want to delete?")){
        console.log("hello");
        alarmDiv.remove();
        clearTimeout(timeOutId);
        let alarms=JSON.parse(localStorage.getItem("alarms"))||[];
        alarms=alarms.filter(alarm=>alarm[0]!==id);
        localStorage.setItem("alarms",JSON.stringify(alarms))

    }
    checkbox.addEventListener("change", () => {
    if(!checkbox.checked){
        clearTimeout(timeOutId);
    }
});
});
}




window.addEventListener("load",()=>{
    let storedAlarms=JSON.parse(localStorage.getItem("alarms")) || [];
    storedAlarms.forEach(alarm => {
        let id=alarm[0];
        let date=new Date(alarm[1]);
        let inpHours=alarm[2];
        let inpMinutes=alarm[3];
        let amPmSelect=alarm[4];
        let alarmName= alarm[5];
        setAlarm(id,date,inpHours,inpMinutes,amPmSelect,alarmName,true);
    });
});
addIcon.addEventListener("click",()=>{
    setAlarmContainer.style.display="block"; 
    setAlarmContainer.style.zIndex="30"; 
    document.getElementById("date").value = today;  
    console.log(today);
})
setBtn.addEventListener("click",()=>{
    setAlarmContainer.style.display="none"; 
    let alarmDate = document.getElementById("date").value;
    let inpHours=document.getElementById("inp-hours").value;
    let inpMinutes=document.getElementById("inp-mins").value;
    let amPmSelect=document.getElementById("am-pm").value;
    let alarmName=document.getElementById("alarm-name").value;
    let hour24=parseInt(inpHours);
    if(amPmSelect === "pm" && hour24 !== 12){
        hour24 += 12;
    }
    if(amPmSelect === "am" && hour24 === 12){
        hour24 = 0;
    }
    if(inpHours=="" || inpMinutes==""){
        alert("Input time properly")
        return;
    }
    let date=new Date(`${alarmDate}T${String(hour24).padStart(2, '0')}:${inpMinutes.padStart(2, '0')}:00`);
    console.log(date);
    if(date=="Invalid Date"){
        return;
    }
    let id=Date.now();
    setAlarm(id,date,inpHours,inpMinutes,amPmSelect,alarmName);
    alarmData=JSON.parse(localStorage.getItem("alarms")) || [];
    alarmData.push([id,date,inpHours,inpMinutes,amPmSelect,alarmName]);
    localStorage.setItem("alarms",JSON.stringify(alarmData));
    
    console.log("remainTime");


});

