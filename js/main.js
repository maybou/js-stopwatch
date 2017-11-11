(function(){
  'use strict';
  var timer = document.getElementById('time-text');
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var reset = document.getElementById('reset');
  var start_time;
  var timer_id;
  var elapsed_time;
  var added_time = 0;
  let is_running = false;
  let split_num = 1;


  start.addEventListener('click',function(){
      if(is_running === true){
        return;
      }

      reset.innerHTML = "split";
      is_running = true;
    var date_obj = new Date();
    start_time = date_obj.getTime();

    show();
  });

  stop.addEventListener('click',function(){
      if(is_running === false){
        return;
      }
      start.innerHTML = "start";
      reset.innerHTML = "reset";
      is_running = false;
    clearTimeout(timer_id);
    added_time += Date.now() - start_time;
  })

  reset.addEventListener('click',function(){
      if(is_running === true){
      createSplitTimeText();
      return;
    }
    $('ul').empty();
    split_num = 1;
    elapsed_time = 0;
    added_time = 0;
    updateTimerText();
  })

  function show(){
    var date_obj = new Date();
    var current_time = date_obj.getTime();
    elapsed_time = current_time - start_time + added_time;
    updateTimerText();
    timer_id = setTimeout(function(){
        show();
    },10);
  }

  function updateTimerText(){
    var min = Math.floor(elapsed_time / 60000);
    var sec = Math.floor(elapsed_time % 60000 / 1000);
    var msec = elapsed_time % 1000;
    min = ('0' + min).slice(-2);
    sec = ('0' + sec).slice(-2);
    msec = ('00' + msec).slice(-3);
    timer.textContent =  min + ":" + sec + ":" + msec;
  }

  function createSplitTimeText(){
    var min = Math.floor(elapsed_time / 60000);
    var sec = Math.floor(elapsed_time % 60000 / 1000);
    var msec = elapsed_time % 1000;
    min = ('0' + min).slice(-2);
    sec = ('0' + sec).slice(-2);
    msec = ('00' + msec).slice(-3);

    let split_time = `${min}:${sec}:${msec}`;

    $('ul').prepend('<li class="collection-item">' + split_num + '  ' + split_time + '</li>');
    split_num++;
  }

})();
