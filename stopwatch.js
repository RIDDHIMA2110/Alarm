let start=document.getElementById("sw-start");
let stop=document.getElementById("sw-stop");
let increaseSec=null;   
let hours=document.getElementById("hours");
let mins=document.getElementById("mins");
let secs=document.getElementById("secs");
let mss=document.getElementById("ms");
let h=0;
let m=0;
let s=0;
let ms=0;
const startfunction=()=>{
    clearInterval(increaseSec);
    start.disabled=true;
    stop.disabled=false;
    start.innerHTML="Start";
    stop.innerHTML="Stop";
    increaseSec=setInterval(() => {
        ms++;
        if(ms==100){
            ms=0;
            s++;
            if(s==60){
                s=0;
                m++;
                if(m==60){
                    m=0;
                    h++;
                }
            }
        }
        mss.innerHTML=String(ms).padStart(2,"0");
        secs.innerHTML=String(s).padStart(2,"0");
        mins.innerHTML=String(m).padStart(2,"0");
        hours.innerHTML=String(h).padStart(2,"0");
    }, 10);
}
start.addEventListener("click",()=>{
    if(start.innerHTML=="Start"){
        startfunction();
    }
    else if(start.innerHTML=="Reset"){
        ms=0
        h=0;    
        m=0;
        s=0;
        mss.innerHTML="00";
        hours.innerHTML="00";
        mins.innerHTML="00";
        secs.innerHTML="00";
        start.innerHTML="Start"
    }
});

stop.addEventListener("click",()=>{
    if(stop.innerHTML=="Stop"){
        clearInterval(increaseSec);
        start.disabled=false;
        start.innerHTML="Reset";
        stop.innerHTML="Resume";
    }
    else{
        startfunction();
    }
});