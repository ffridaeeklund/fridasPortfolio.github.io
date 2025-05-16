const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const timerLabel = document.getElementById('timer-label');

let studyTime = 60 * 60; 
let breakTime = 15 * 60; 
let isStudyTime = true;
let interval = null;
let remainingTime = studyTime; 

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);

function startTimer() {
    
  if (interval) return; 
    
    interval = setInterval(() => {
        updateTimer(remainingTime);
        remainingTime--;
        
        if (remainingTime < 0) {

            clearInterval(interval);
            interval = null; 

            if (isStudyTime) {

                isStudyTime = false;
                timerLabel.textContent = 'BREAK';
                remainingTime = breakTime;
                startTimer(); // Starta paus-timern

            } else {

                isStudyTime = true;
                timerLabel.textContent = 'STUDY';
                remainingTime = studyTime;
                startTimer(); 

            }

        }

    }, 1000);

    togglePauseButton();
}

function updateTimer(time) {
   
  const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

}

function pauseTimer() {

    clearInterval(interval); 
    interval = null; 
    togglePauseButton();

}

function togglePauseButton() {

    if (interval) {

        pauseBtn.style.display = 'inline-block';
        startBtn.style.display = 'none';

    } else {

        pauseBtn.style.display = 'none';
        startBtn.style.display = 'inline-block';

    }

}
