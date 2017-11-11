(function(){
  'use strict';
  var timer = document.getElementById('time-text');
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var reset = document.getElementById('reset');

  function show(){
    var date_obj = new Date();

    var milliseconds = date_obj.getTime();
    timer.textContent = milliseconds;
    // console.log(milliseconds);
    setTimeout(function(){
        show();
    },10);
  }
  show();
})();
