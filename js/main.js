(function () {
    'use strict';
    const timer = document.getElementById('time-text');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');
    const time_list = document.getElementById('time-list');
    let startTime;
    let timerId;
    let elapsedTime;
    let addedTime = 0;
    let isRunning = false;
    let splitNum = 1;
    let lapNum = 1;
    let lapTime;
    let lapAddedTime;

    let min;
    let sec;
    let msec;

    time_list.style.display="none";

    start.addEventListener('click', function () {
        if (isRunning === true) {
            createLapTimeText();
            return;
        }else{
            lapTime = Date.now();
        }
        // start.classList.add('disabled');
        reset.innerHTML = "split";
        start.innerHTML = "lap";
        isRunning = true;
        startTime = Date.now();

        show();
    });

    stop.addEventListener('click', function () {
        if (isRunning === false) {
            return;
        }
        if ( lapNum !== 1) {
            lapAddedTime = Date.now() - lapTime;
        }
        // start.classList.remove('disabled');
        reset.innerHTML = "reset";
        start.innerHTML = "start";
        isRunning = false;
        clearTimeout(timerId);
        addedTime += Date.now() - startTime;
    })

    reset.addEventListener('click', function () {
        if (isRunning === true) {
            createSplitTimeText();
            return;
        }
        $('ul').empty();
        time_list.style.display="none";
        splitNum = 1;
        elapsedTime = 0;
        addedTime = 0;
        timer.textContent = convertTimerText(elapsedTime);
    })

    function show() {
        let current_time = Date.now();
        elapsedTime = current_time - startTime + addedTime;
        timer.textContent = convertTimerText(elapsedTime);
        timerId = setTimeout(function () {
            show();
        }, 10);
    }

    function createSplitTimeText() {
        if(splitNum == 1){
            time_list.style.display="block";
        }
        let splitTimeText = convertTimerText(elapsedTime);
        $('ul').prepend('<li class="collection-item row"><span class="col s2 center-align">' + splitNum + '</span><span class="col s10 center-align">' + splitTimeText + '</span></li>');
        splitNum++;
    }

    function createLapTimeText() {
        if(lapNum == 1){
            time_list.style.display="block";
        }
        lapTime -= Date.now();
        let lapTimeText = convertTimerText(Math.abs(lapTime));
        $('ul').prepend('<li class="collection-item row"><span class="col s2 center-align">' + lapNum + '</span><span class="col s10 center-align">' + lapTimeText + '</span></li>');
        lapTime = Date.now();
        lapNum++;
    }


    function convertTimerText(elapsedTime) {
        min = Math.floor(elapsedTime / 60000);
        sec = Math.floor(elapsedTime % 60000 / 1000);
        msec = elapsedTime % 1000;
        min = ('0' + min).slice(-2);
        sec = ('0' + sec).slice(-2);
        msec = ('00' + msec).slice(-3);
        return `${min}:${sec}:${msec}`;
    }
})();
