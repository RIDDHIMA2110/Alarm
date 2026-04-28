let start=document.getElementById("sw-start");
let stop=document.getElementById("sw-stop");
let hours=document.getElementById("inp-hours");
let mins=document.getElementById("inp-mins");
let secs=document.getElementById("inp-secs");
let timerid;

const startFunction=(h,m,s)=>{
    start.disabled=true;
    stop.disabled=false;
    time=h+m+s;
    if(time==0){
        start.disabled=false;
        stop.disabled=true;
    }
    else if(time>0){
        timerid=setInterval(() => {
            s--;
            if(h==0 && m==0 && s==0){
                clearInterval(timerid);
                console.log("ringing");
                start.disabled=false;
                stop.disabled=true;
                start.innerHTML="Start";
                stop.innerHTML="Pause";
            }
            if(h>=0){
                if(s<0){
                    s=59;
                    m--;
                    if(m<0){
                        m=59;
                        h--;
                    }
                }
            }
            secs.value=String(s).padStart(2,"0");
            mins.value=String(m).padStart(2,"0");
            hours.value=String(h).padStart(2,"0");
        }, 1000);
    }
}

window.addEventListener("load",()=>{
    secs.value="00";
    mins.value="00";
    hours.value="00";
})
start.addEventListener("click",()=>{
    start.innerHTML="Start";
    stop.innerHTML="Pause";
    hours.disabled = true;
    mins.disabled = true;
    secs.disabled = true;
    let h=parseInt(hours.value);
    let m=parseInt(mins.value);
    let s=parseInt(secs.value);
    startFunction(h,m,s);
});
stop.addEventListener("click",()=>{
    if(stop.innerHTML=="Pause"){
        clearInterval(timerid);
        start.disabled=false;
        start.innerHTML="Resume";
        stop.innerHTML="Reset";
    }
    else if(stop.innerHTML=="Reset"){
        clearInterval(timerid);
        secs.value="00";
        mins.value="00";
        hours.value="00";
        stop.disabled=true;
        start.disabled=false;
        start.innerHTML="Start";
        stop.innerHTML="Pause";
    }
});