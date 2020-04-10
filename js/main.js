'use strict';
{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0;
  

  function countUp() {
    const d =new Date(Date.now() -startTime + elapsedTime);   
    // const m = d.getMinutes();   
    const m = String(d.getMinutes()).padStart(2,'0');   
    // const s = d.getSeconds();
    const s = String(d.getSeconds()).padStart(2,'0');
    // const ms = d.getMilliseconds();
    const ms = String(d.getMilliseconds()).padStart(3,'0');
    //文字列.padStart(2.'0');      文字列を2桁で表示して、それに満たなかったら0代入   
    timer.textContent = `${m}:${s}:${ms}`;

    let showTime = ()=> {
      countUp();
    }

    timeoutId = setTimeout(showTime,10);        //10ミリ秒毎に関数を実行する

    // setTimeout(() => {
    //   countUp();
    // },10);                           //上の作業と同じ
  }

  function setButtonStateInitial() {
    start.classList.remove('inactive');　　　　　//startというidからinactiveというクラスを外す
    //start.disabled = false;
    stop.classList.add('inactive');      //stopというidにinactiveというクラスつける
    //stop.disabled = true;
    reset.classList.add('inactive');
  }
  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }
  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

  setButtonStateInitial();

  start.addEventListener('click',() => {
    if(start.classList.contains('inactive') === true) {
      return;   //undifinedを返す
    }
    setButtonStateRunning();
    startTime = Date.now();　
    //Date.now()   TC (協定世界時) での 1970 年 1 月 1 日 0 時 0 分 0 秒 から現在までの経過時間をミリ秒単位  常に空
    countUp();      
  });



  stop.addEventListener('click',() => {
    if(stop.classList.contains('inactive') === true) {
      return;   //undifinedを返す     //押された時にinactiveな状態なら以下の処理をスキップする
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);     //stop押すと泊まる
    elapsedTime += Date.now() - startTime;
  });

  reset.addEventListener('click',() => {
    if(reset.classList.contains('inactive') === true) {
      return;   //undifinedを返す
    }
    setButtonStateInitial();
    timer.textContent ='00:00.000';
    elapsedTime = 0;
  });
}