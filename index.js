var bigger_index = 1
const time = document.getElementById("timer")
const date = document.getElementById("date")
var monitorvalue = document.getElementById("monitorvalue")

var welcomescreen = document.querySelector("#welcome")
var calc = document.getElementById("calc")
var notebook = document.getElementById("notebook")
var setting = document.getElementById("setting")
var music = document.getElementById("music")

var welcomescreenclose = document.querySelector("#welcomeclose")
var welcomescreenopen = document.querySelector("#welcomeopen")
var calcopen = document.querySelector("#calculator_app")
var calclose = document.querySelector("#calclose")
var noteopen = document.querySelector("#notebook_app")
var noteclose = document.querySelector("#notebookclose")
var settingopen = document.querySelector("#setting_app")
var settingclose = document.querySelector("#settingclose")
var musicopen = document.querySelector("#music_app")
var musiclose = document.querySelector("#musiclose")

// close and open functionality 
const all_in_one = [
  [welcomescreen,welcomescreenopen,welcomescreenclose],
  [calc,calcopen,calclose],
  [notebook,noteopen,noteclose],
  [setting,settingopen,settingclose],
  [music,musicopen,musiclose]
] 

function close_window(element){
    element.style.display = "none"
}
function open_window(element){
  if (element.style.display != "none"){
    close_window(element)
  }

  else{
    element.style.zIndex = `${bigger_index}`
    bigger_index += 1
    element.style.display = "inline-block"
  } 
}

function dragElement(element) {
  var initialX = initialY = currentX = currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function handleAllWindows(lst){
  for (let arr of lst){
    arr[1].addEventListener("click",function(){
        open_window(arr[0])
    })

    arr[2].addEventListener("click",function(){
        close_window(arr[0])
    })

    dragElement(arr[0]);
  }

}

handleAllWindows(all_in_one)

// calculator code
function addValue(val){
  monitorvalue.value += val
}

function remove(){
  monitorvalue.value = ""
}

function deletelast(){
  monitorvalue.value = monitorvalue.value.slice(0,-1)
}
function solve(){
  monitorvalue.value = eval(monitorvalue.value)
}

// date and time code
function count(){
    const now = new Date()
    ampm = now.getHours()
    ampm = ampm > 12 ? "PM" : "AM"
    new_hour = ampm == "PM" ? String(now.getHours() - 12).padStart(2,"0") : String(now.getHours()).padStart(2,"0")
    new_minute = String(now.getMinutes()).padStart(2,"0")
    new_second = String(now.getSeconds()).padStart(2,"0")
    
    time.textContent = `${new_hour}:${new_minute}:${new_second} ${ampm}`
    date.textContent = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
}
count()
setInterval(count,1000)

// note book functionality
const notes_content = document.querySelector("#notes_content")
const file_name = document.querySelector("#file_name")

function handleSaveNotes() {
  key = window.prompt("ensert file name? ")
  if (Boolean(key) == false){
    window.alert("type valid file name!")
  }
  else{
    if ( !(key in localStorage)){
      password = window.prompt("Create a password?")
      localStorage.setItem(key,JSON.stringify([password,notes_content.value]))
      window.alert("Created succesfully!")
    }
    else if(key in localStorage){
      password = window.prompt("We already have that file if you wanna update, type a password?")
      value = JSON.parse(localStorage.getItem(key))
      if (value[0] == password){
        localStorage.setItem(key,JSON.stringify([password,notes_content.value]))
        window.alert("Updated succesfully!")
      }
      else{
        window.alert("Your not able to update, check the password!")
      }
    }
  }

}
function handleLoadNotes(){
  key = window.prompt("ensert file name? ")
  if (key in localStorage){
    password = window.prompt("ensert a password?")
    value = JSON.parse(localStorage.getItem(key))
    if (value[0] == password){
      notes_content.value = value[1]
      file_name.textContent = `${key}.txt`
      window.alert("loaded succesfully!")
    }
    else{
      window.alert("Wrong password check your password again!")
    }
  }
  else{
    window.alert("no file found!")
  }
}

// wallpaper code
links = ['images/samurai.jpg','images/pikachu.jpg','images/spiderman.jpg']
function handleWallpaper(index){
  document.body.style.backgroundImage = `url(${links[index]})`
  document.body.style.backgroundSize = 'cover'
}

// setting code
const show_storage = document.getElementById("show_storage")
const elements = document.querySelectorAll("*")
const font_family = ["system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  "monospace",
  "fantasy",
  "cursive"
]
const app_colors = ["#3636363f","#5d3f3f45","#3f485d3b","#3f5d4237","#61316338","#4131633e","#7047ca3e","#475dca42","#97979739"]
const font_colors = ["#363636","#5d3f3f","#3f485d","#3f5d42","#613163","#413163","#7047ca","#475dca","#979797"]
const scale = [0.9,1,1.1]
const paragraphs = document.querySelectorAll("p")
const apps = document.querySelectorAll(".app")

function handleFontFamily(index){
  elements.forEach((element) => {
    element.style.fontFamily = font_family[index];
  })
}

function handleFontColor(index){
  elements.forEach((element) => {
    element.style.color = font_colors[index];
  })
}
function handleScale(index){
  paragraphs.forEach((p) => {
    p.style.transform = `scale(${scale[index]})`;
  })
}

function handleAppColor(index){
  apps.forEach((app) => {
    app.style.backgroundColor = `${app_colors[index]}`;
  })
}

handleScale(0)

function handleDataClear(){
  key = window.prompt('ensert file name? ')
  if (Boolean(key) == true && key in localStorage){
    password = window.prompt("ensert a password?")
    value = JSON.parse(localStorage.getItem(key))
    if(value[0] == password){
      localStorage.removeItem(key)
      window.alert('Cleared succesfully!')
      handleRefresh()
    }
    else{
      window.alert("Wrong password check your password again!")
    }
  }
  else if(Boolean(key) == true){
    window.alert("Not Found!")
  }
  else{
    window.alert("ensert a file name first!")
  }
}

function handleRefresh(){
  
  let show = Object.keys(localStorage).map((key)=>{
    if (key !== 'music_xp'){
      return `<p>${key}.txt</p>`
    }
  })
  show_storage.innerHTML = show.join("")

}
handleRefresh()

// music functionality
let playing = false
const top_tracks = document.querySelector('#top_tracks')
const play_state = document.getElementById('play_state')
const music_image = document.getElementById('musicimage')
const view = document.getElementById('view')
const audio = document.getElementById('audio')

let music_xp = [['Melkam_wetat','musics/melkam_wetat.mp3','#85005767','images/yamesih.jpg'],
                ['Memhru','musics/memhru.mp3','#00605967','images/memhru.jpg'],
                ['Ya_mesih','musics/ya_mesih.mp3','#00188567','images/marsil_image.jpg'],
                ['Etaye','musics/etaye.mp3','#82450052','images/music_background.jpg'],
                ['G_and_B','musics/gandb.mp3','#54008567','images/music_background.jpg'],
                ['Guzo','musics/guzo.mp3','#85000067','images/music_background.jpg'],
                ['Yenefs','musics/yenefs.mp3','#1b008567','images/music_background.jpg'],
                ['Yiwedegnal_biye','musics/yiwedegn.mp3','#3a850067','images/music_background.jpg'],
              ]

function handleMusicRefresh(){
  let show_music = []
  for (let x in music_xp){
    show_music.push(`<button style="background-color: ${music_xp[x][2]}; color: white" onClick="handleMusicClick(${x})">${music_xp[x][0]}</button>`)
  }
  top_tracks.innerHTML = show_music.join("")
}
handleMusicRefresh()

function handleMusicClick(index){
  music.style.backgroundColor = `${music_xp[index][2]}`
  audio.src = `${music_xp[index][1]}`
  view.textContent = `${music_xp[index][0]}`
  music_image.src = `${music_xp[index][3]}`
  changePlay()
}

function changePlay(){
  if (playing){
    audio.pause()
    play_state.textContent = '▶'
  }
  else{
    audio.play()
    play_state.textContent = '⏸'
  }
  playing = !(playing)
  music_image.classList.toggle('rotate')
}












