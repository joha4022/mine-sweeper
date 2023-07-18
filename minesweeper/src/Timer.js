export default function Timer() {
  let minutes = 0;
  let seconds = 0;

  const setTime = () => {
    seconds ++;
    if(seconds < 10) {
      document.querySelector('.timer-seconds').innerHTML = '0'+seconds;
    } 
    if (seconds === 60) {
      seconds = 0;
      document.querySelector('.timer-seconds').innerHTML = '00';
      minutes ++;
      if(minutes < 10) {
        document.querySelector('.timer-minutes').innerHTML = '0'+minutes;
      } else {
        document.querySelector('.timer-minutes').innerHTML = minutes;
      }
    }
    if (9 < seconds && seconds < 60 ){
      document.querySelector('.timer-seconds').innerHTML = seconds;
    }
  }

  setInterval(setTime, 1000);

  return (
    <div>
      <label className="timer-minutes">00</label>:<label className="timer-seconds">00</label>
    </div>
  );
}