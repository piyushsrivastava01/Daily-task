
//Open Feature

function openfeature() {

    var allElems = document.querySelectorAll('.elem');
    var Fullelem = document.querySelectorAll('.fullElem')
    var backbtn = document.querySelectorAll('.fullElem .back')

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            Fullelem[elem.id].style.display = 'block'
        })
    })


    backbtn.forEach(function (back) {
        back.addEventListener('click', function () {
            Fullelem[back.id].style.display = 'none'
        })
    })
}
openfeature();


//TodoList 

function todoList() {

    let form = document.querySelector('.addTask form');
    let taskInput = document.querySelector(" .addTask form input");
    let taskDetailsInput = document.querySelector(" .addTask form textarea");
    let taskCheckbox = document.querySelector(" .addTask form #check");


    var currentTask = []
    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'));
    } else {
        localStorage.setItem('currentTask', currentTask);
    }

    function rendertask() {

        let allTask = document.querySelector('.allTask');
        let sum = ''
        currentTask.forEach(function (elem, idx) {
            sum += `<div class="task">
            <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
            <button id=${idx}>Mark as Completed</button>
            </div> `
        })
        allTask.innerHTML = sum;
        localStorage.setItem('currentTask', JSON.stringify(currentTask));

        var markCompletedBtn = document.querySelectorAll('.task button');

        markCompletedBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1);
                rendertask();
            })
        })
    }
    rendertask()


    form.addEventListener('submit', function (e) {
        e.preventDefault()
        currentTask.push(
            {
                task: taskInput.value,
                details: taskDetailsInput.value,
                imp: taskCheckbox.checked
            }
        )
        rendertask()

        taskCheckbox.checked = false
        taskInput.value = ''
        taskDetailsInput.value = ''

    })
}
todoList();



// daily-planner-fullpage - JavaScript Logic

function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner')

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {};


    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`);



    var wholeDaySum = ''
    hours.forEach(function (elem, idx) {

        var savedData = dayPlanData[idx] || '';

        wholeDaySum += ` <div class="day-planner-time">
                 <p>${elem}</p>
                 <input id=${idx} type="text" placeholder="..."  value=${savedData}>
                 </div>`
    })

    dayPlanner.innerHTML = wholeDaySum


    var dayPlannerInput = document.querySelectorAll('.day-planner input');
    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlanData[elem.id] = elem.value;

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))

        })


    })
}

dailyPlanner();


// Motivation Quote

function motivationalQuote() {
    var motivationQuoteContent = document.querySelector('.motivation-2 h1')


    var motivationAuthor = document.querySelector('.motivation-3 h2')


    async function fetchQuote() {
        let response = await fetch('https://quotes-api-self.vercel.app/quote')
        let data = await response.json()
        motivationQuoteContent.innerHTML = data.quote;
        motivationAuthor.innerHTML = data.author
    }

    fetchQuote()
}

motivationalQuote()




// .pomodoro-fullpage

function pomodoroTimer() {


    let timer = document.querySelector('.pomo-timer h1')
    var startBtn = document.querySelector('.pomo-timer .start-timer')
    var pauseBtn = document.querySelector('.pomo-timer .pause-timer')
    var resetBtn = document.querySelector('.pomo-timer .reset-timer')
    var session = document.querySelector('.pomodoro-fullpage .session')
    var isWorkSession = true

    let totalSeconds = 25 * 60
    let timerInterval = null

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkSession) {

            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Take a Break'
                    session.style.backgroundColor = 'var(--blue)'
                    totalSeconds = 5 * 60
                }
            }, 1000)
        } else {


            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = true
                    clearInterval(timerInterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
                    session.style.backgroundColor = 'var(--green)'
                    totalSeconds = 25 * 60
                }
            }, 1000)
        }

    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }
    function resetTimer() {
        totalSeconds = 25 * 60
        clearInterval(timerInterval)
        updateTimer()

    }
    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)



}

pomodoroTimer()
