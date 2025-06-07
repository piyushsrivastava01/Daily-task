var allElems = document.querySelectorAll('.elem');
var Fullelem = document.querySelectorAll('.fullElem')
var backbtn = document.querySelectorAll('.fullElem .back')
 
allElems.forEach(function(elem){
   elem.addEventListener('click', function(){
      Fullelem[elem.id].style.display = 'block'
   })  
})


backbtn.forEach(function(back){
    back.addEventListener('click', function(){
        Fullelem[back.id].style.display = 'none'
    })
})