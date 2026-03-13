// getting ringtone
const ringtone = document.querySelector("#ringtone");

// for vibration 
let vibrationInterval = null;

//storing the input given by User

let alarmSetFor = null;

const setAlarm = document.querySelector("#setAlarm");
const alarmAt = document.querySelector("#status");
const alarmTime = document.querySelector("#alarmTime");

alarmAt.innerText = "No alarm set yet💤";

setAlarm.addEventListener("click", ()=>{
    alarmSetFor = alarmTime.value;
    alarmAt.innerText = "Alarm set for " + alarmSetFor ;
});



// for snoozing 

const snoozeBtn = document.querySelector("#snoozeBtn");

snoozeBtn.addEventListener("click", ()=>{
    alarmSound.pause();
    alarmSound.currentTime = 0;
    isRinging = false;

    document.body.classList.remove("flash");
    stopAlarm.style.display = "none";
    snoozeBtn.style.display = "none";
    bell.classList.remove("ringing");

    if(navigator.vibrate){
        navigator.vibrate(0);
        clearInterval(vibrationInterval);
        vibrationInterval = null;
    }

    let now = new Date();
    now.setMinutes(now.getMinutes()+1);
    let h = now.getHours().toString().padStart(2,'0');
    let m = now.getMinutes().toString().padStart(2,'0');
    alarmSetFor = `${h}:${m}`;
    alarmAt.innerText = "Snoozed to " + alarmSetFor;
    
});

const currentTime = document.querySelector("#currentTime");
const alarmSound = document.querySelector("#alarmSound");
let isRinging = false;

//Updating current time && checking for ringing 
setInterval(()=>{
    const curr = new Date();
    let currHour = curr.getHours().toString().padStart(2,'0');
    let currMinute = curr.getMinutes().toString().padStart(2,'0');
    let seconds = curr.getSeconds().toString().padStart(2,'0');
    let currTime = `${currHour}:${currMinute}`;

    currentTime.innerText = `${currHour} : ${currMinute} : ${seconds}`;

    if(currTime === alarmSetFor && isRinging === false){
        alarmSound.src = ringtone.value;
        alarmSound.loop = true;
        alarmSound.play();

        if(navigator.vibrate){
            navigator.vibrate([1000,500]);
            vibrationInterval = setInterval(()=>{
                navigator.vibrate([1000,500]);
            }, 1500);
        }

        isRinging = true;
        stopAlarm.style.display = "block";
        snoozeBtn.style.display = "block";
        document.body.classList.add("flash");
        bell.classList.add("ringing");
    }
},1000);

setInterval(()=>{
    if(isRinging){
        document.body.classList.toggle("flash");
    }
},500);

// stop Alarm

const stopAlarm = document.querySelector("#stopAlarm");
stopAlarm.addEventListener("click", ()=>{
    alarmSound.pause();
    alarmSound.currentTime = 0; //resetting the alarm to 00:00
    alarmSetFor = null;
    isRinging = false;
    stopAlarm.style.display = "none";
    snoozeBtn.style.display = "none";
    document.body.classList.remove("flash");
    bell.classList.remove("ringing");
    alarmAt.innerText = "No alarm set yet💤";
    if(navigator.vibrate){
        navigator.vibrate(0);
        clearInterval(vibrationInterval);
        vibrationInterval = null;
    }
})

//for previewBtn 
const previewBtn = document.querySelector("#previewBtn");

previewBtn.addEventListener("click", ()=>{
    if(isRinging) return;
    alarmSound.src = ringtone.value;
    alarmSound.currentTime = 0;
    alarmSound.play()
    setTimeout(()=>{ //setTimeout means run this code only once after 5 seconds
        alarmSound.pause();
        alarmSound.currentTime = 0;
    },10000)
})



