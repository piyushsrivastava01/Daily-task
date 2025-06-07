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

function todolist() {

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

        var allTask = document.querySelector('.allTask');
        var sum = ''
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
                location.reload()
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

todolist();

