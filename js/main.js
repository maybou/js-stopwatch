(function () {
    'use strict';
    const timer = document.getElementById('time-text');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');
    const time_list = document.getElementById('time-list');
    let start_time;
    let timer_id;
    let elapsed_time;
    let added_time = 0;
    let is_running = false;
    let split_num = 1;

    let min;
    let sec;
    let msec;

    time_list.style.display="none";

    start.addEventListener('click', function () {
        if (is_running === true) {
            return;
        }
        start.classList.add('disabled');
        reset.innerHTML = "split";

        is_running = true;
        start_time = Date.now();

        show();
    });

    stop.addEventListener('click', function () {
        if (is_running === false) {
            return;
        }
        start.classList.remove('disabled');
        reset.innerHTML = "reset";
        is_running = false;
        clearTimeout(timer_id);
        added_time += Date.now() - start_time;
    })

    reset.addEventListener('click', function () {
        if (is_running === true) {
            createSplitTimeText();
            return;
        }
        $('ul').empty();
        time_list.style.display="none";
        split_num = 1;
        elapsed_time = 0;
        added_time = 0;
        timer.textContent = convertTimerText(elapsed_time);
    })

    function show() {
        let current_time = Date.now();
        elapsed_time = current_time - start_time + added_time;
        timer.textContent = convertTimerText(elapsed_time);
        timer_id = setTimeout(function () {
            show();
        }, 10);
    }

    function createSplitTimeText() {
        if(split_num == 1){
            time_list.style.display="block";
        }
        let split_time = convertTimerText(elapsed_time);
        $('ul').prepend('<li class="collection-item">' + split_num + '' + split_time + '</li>');
        split_num++;
    }


    function convertTimerText() {
        min = Math.floor(elapsed_time / 60000);
        sec = Math.floor(elapsed_time % 60000 / 1000);
        msec = elapsed_time % 1000;
        min = ('0' + min).slice(-2);
        sec = ('0' + sec).slice(-2);
        msec = ('00' + msec).slice(-3);
        return `${min}:${sec}:${msec}`;
    }



})();
