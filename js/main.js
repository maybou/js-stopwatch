(function(){
  'use strict';
  var timer = document.getElementById('time-text');
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var reset = document.getElementById('reset');
  var start_time;

  start.addEventListener('click',function(){
    var date_obj = new Date();
    start_time = date_obj.getTime();
    show();
  });

  function show(){
    var date_obj = new Date();
    var current_time = date_obj.getTime();
    var elapsed_time = current_time - start_time;
    timer.textContent = convertTimerText(elapsed_time);
    setTimeout(function(){
        show();
    },10);
  }
  // timer.textContent = convertTimerText(654321);
  function convertTimerText(elapsed_time){
    var min = Math.floor(elapsed_time / 60000);
    var sec = Math.floor(elapsed_time % 60000 / 1000);
    var msec = elapsed_time % 1000;
    min = ('0' + min).slice(-2);
    sec = ('0' + sec).slice(-2);
    msec = ('00' + msec).slice(-3);
    return min + ":" + sec + ":" + msec;
  }

})();
