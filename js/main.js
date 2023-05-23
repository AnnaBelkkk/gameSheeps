let game = document.getElementById('game');
let game_content = game.getContext('2d');

game.height = 150;
game.width = 300;
game_content.mozImageSmoothingEnabled = false;
game_content.webkitImageSmoothingEnabled = false;
game_content.msImageSmoothingEnabled = false;
game_content.imageSmoothingEnabled = false;

let farmer = new Image();
farmer.src = "./image/farmer/farmer.png";


let audio = new Audio("./sound/sound.mp3")
audio.volume = 0.45;


let openZone = new Image();
openZone.src = "./image/trava.png";



//овцы смотрят влево
let shp1 = new Image()
shp1.src = "./image/sheep1/shp1left.png"
let shp2 = new Image()
shp2.src = "./image/sheep2/shp2left.png"
let shp3 = new Image()
shp3.src = "./image/sheep3/shp3left.png"
let shp4 = new Image()
shp4.src = "./image/sheep4/shp4left.png"
let shp5 = new Image()
shp5.src = "./image/sheep5/shp5left.png"

//овцы смотрят вправо
let shp1right = new Image()
shp1right.src = "./image/sheep1/shp1right.png"
let shp2right = new Image()
shp2right.src = "./image/sheep2/shp2right.png"
let shp3right = new Image()
shp3right.src = "./image/sheep3/shp3right.png"
let shp4right = new Image()
shp4right.src = "./image/sheep4/shp4right.png"
let shp5right = new Image()
shp5right.src = "./image/sheep5/shp5right.png"


let modal = document.getElementById("modal");
let modal2 = document.getElementById("modal2");
let closemodal = document.getElementsByClassName("closemodal")[0];


//модальное окно
function openmodal() {
    modal.style.display = "block";
}

closemodal.onclick = function () {
    modal.style.display = "none";
    document.location.reload();
}
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
        document.location.reload();
    }
}

let volume =  document.getElementById("volume")

let leveltwo = document.getElementById("leveltwo")

//модельки и их свойтсва

const models = {
    herdsmanModel: {
        x: (game.width) / 1.1,
        y: (game.height) / 50,
        height: 30,
        width: 22,
        spx: 1,
        spy: -1,
        farmerLeft: false,
        farmerRight: false,
        farmerForward: false,
        farmerBack: false,
    },
    zoneModel: {
        width: Math.round(game.width / 1.5),
        height: Math.round(game.height / 1.8),
        x: Math.round(game.width - game.width / 1.2),
        y: Math.round(game.height - game.height / 1.3),
    },
    sheepSettings: {
        speed: 0.5,
        width: 28,
        height: 24,
        margin: 20
    },
    sheepModels: [
        
        {
            id: 1,
            sheep: shp1,
            x: game.width / 4 + Math.random() * 2,
            y: game.height / 2.4 + Math.random() * 15,
            sx: 1,
            sy: Math.round(Math.random() * 1) == 0 ? -1 : 1, //рандомная координата
            leavedZone: false,
            xlock: false, // блокировки изменения траектории по осям, пока овечка не долетит до препятсвия
            ylock: false // сталкивается, попадает в условие, траектория меняется и появляется заглушка, чтобы  ничего не поменялось пок аона идет до следующего препятсвия
        },
        {
            id: 2,
            sheep: shp2,
            x: game.width / 4 + Math.random() * 25,
            y: game.height / 2.4 + Math.random() * 15,
            sx: 1,
            sy: Math.round(Math.random() * 1) == 0 ? -1 : 1,
            leavedZone: false,
            xlock: false,
            ylock: false
        },
        {
            id: 3,
            sheep: shp3,
            x: game.width / 4 + Math.random() * 25,
            y: game.height / 2.4 + Math.random() * 15,
            sx: 1,
            sy: Math.round(Math.random() * 1) == 0 ? -1 : 1,
            leavedZone: false,
            xlock: false,
            ylock: false
        },
        {
            id: 4,
            sheep: shp4,
            x: game.width / 4 + Math.random() * 25,
            y: game.height / 2.4 + Math.random() * 15,
            sx: 1,
            sy: Math.round(Math.random() * 1) == 0 ? -1 : 1,
            leavedZone: false,
            xlock: false,
            ylock: false
        },
        {
            id: 5,
            sheep: shp5,
            x: game.width / 4 + Math.random() * 25,
            y: game.height / 2.4 + Math.random() * 15,
            sx: 1,
            sy: Math.round(Math.random() * 1) == 0 ? -1 : 1,
            leavedZone: false,
            xlock: false,
            ylock: false
        },
    ],
    openZoneModel: {
        x: 48,
        y: 35 + Math.floor(Math.random() * 50),
        width: 4,
        height: 30,
    }
}

let interval;


let timeMinut;
let min;
let sec;
let timerText = "1";
let start = document.getElementById("start");
let timerNew = document.getElementById("timer");

// таймер
timer = setInterval(function () {
    sec = timeMinut % 60
    min = timeMinut / 60 % 60
    if (isNaN(sec) || isNaN(min)) {
        sec = 0;
        min = 0;
    } else {
        if (timeMinut <= 0) {
            clearInterval(timer);
            openmodal()
        } else {
            let timerStroke = `${Math.trunc(min)}:${sec}`;
            timerNew.innerHTML = timerStroke;
        }
        --timeMinut; // Уменьшаем таймер
    }
}, 1000)

function openmodaltwo() {
  modal2.style.display = "block";
}

window.onclick = function (event) {
  if (event.target === modal) {
    modal2.style.display = "none";
    document.location.reload();
  }
}

//запуск игры и таймера
function launch() {
  start.addEventListener('click', function () {
    timeMinut = parseInt(timerText * 60)
    audio.play();
    modal2.style.display = "none";
    // document.location.reload();
    setInterval(draw, 10)
  })
  document.addEventListener('keyup', (event) => {
    if (event.code === "Space") {
      timeMinut = parseInt(timerText * 60)
      audio.play();
      modal2.style.display = "none";
      // document.location.reload();
      setInterval(draw, 10)
    }
  });

}
launch()

let a = 0;
volume.addEventListener('click', function (){
    if (a == 0) {
        audio.pause();
        a += 1;
    } else {
        audio.play();
        a -= 1;
    }
})


//отрисовка человечка
function herdsmanDraw() {
    game_content.drawImage(farmer, models.herdsmanModel.x, models.herdsmanModel.y, models.herdsmanModel.width, models.herdsmanModel.height)
}

//оритрисовка загона
function zoneDraw() {
    game_content.beginPath();
    game_content.rect(models.zoneModel.x, models.zoneModel.y, models.zoneModel.width, models.zoneModel.height);
    game_content.lineWidth = 3;
    game_content.strokeStyle = "SaddleBrown";
    game_content.stroke();
    game_content.lineWidth = 1;
    game_content.strokeStyle = "Peru";
    game_content.stroke();
    game_content.closePath();
}

let firstStart = true;

//отрисвока овечки
function drawSheep(sheepModel, i) {
    if (firstStart) {
        game_content.drawImage(sheepModel.sheep, sheepModel.x, sheepModel.y, models.sheepSettings.width, models.sheepSettings.height)
    } else {
        game_content.drawImage(sheepModel.sheep, sheepModel.x, sheepModel.y, models.sheepSettings.width, models.sheepSettings.height)
    }
}

for (let i = 0; i < models.sheepModels.length; i++) {
    if (i !== 0) {
        models.sheepModels[i].x = models.sheepModels[i - 1].x + Math.floor(30)
    }
}

//отрисвока овечек
function drawSheeps(count) {
    models.sheepModels.forEach(el => {
        drawSheep(el);
    });
    firstStart = false
}

//отрисовка дырки в загоне
function openZoneDraw() {
    game_content.drawImage(openZone, models.openZoneModel.x, models.openZoneModel.y, models.openZoneModel.width, models.openZoneModel.height)
}
let startWalk = 0;
let noListeners = false;

//начальное движение перед тем как выйти из загона
function sheepWalkStart() {
    if (startWalk < 180){
        for (let i = 0; i < models.sheepModels.length; i++) {
            if (models.sheepModels[i].x > models.openZoneModel.x) {
                //абсолютное число
                models.sheepModels[i].x -= Math.abs(models.sheepModels[i].sx)
                console.log(models.sheepModels[i].x)
            }
            if (models.sheepModels[i].y > models.openZoneModel.y) {
                models.sheepModels[i].y += -Math.abs(models.sheepModels[i].sy)

            } else if (models.sheepModels[i].y < models.openZoneModel.y) {
                models.sheepModels[i].y -= -Math.abs(models.sheepModels[i].sy)
            }
        }
    }

}

//состояние овец перед тем как покинуть зону
function sheepLeaveZone(sheep) {
    sheep.x -= sheep.sx;
    if (sheep.x < 2) {
        sheep.sy = Math.round(Math.random() * 1) == 0 ? -1 : 1;
        sheep.leavedZone = true;
        console.log(sheep.sy)
    }
        
}

//направление овец после того как покинули загон
function sheepWalk(count) {
    for (let i = 0; i < count; i++) {
        let sheep = models.sheepModels[i];
        if (!sheep.leavedZone) {
            sheepLeaveZone(sheep);
        } else {
            if ((sheep.x <= 0 && sheep.sx < 0) || (sheep.x >= game.width - models.sheepSettings.width && sheep.sx > 0)) {
                sheep.sx *= -1;
                sheep.xlock = false;
                sheep.ylock = (Math.round(Math.random() * 10)) > 5;
                console.log(sheep.ylock)
                console.log(sheep.x)
                console.log(sheep.sx)

            }
            //автодвижение овец, ограничитель по краю области с травой
            if ((sheep.y <= 0 && sheep.sy < 0) || (sheep.y >= game.height - models.sheepSettings.height && sheep.sy > 0)) {
                sheep.sy *= -1;
                sheep.xlock = (Math.round(Math.random() * 10)) > 0;
                sheep.ylock = false;
            }
            
            if (sheep.sx < 0) {
                if ((9 <= Math.floor(sheep.y) && Math.floor(sheep.y) <= 99) && (Math.floor(sheep.x) <= 250)) {
                    sheep.sx *= sheep.xlock ? 1 : -1;
                    sheep.xlock = true;
                }
            }
            
            else if (sheep.sx > 0) {
                if ((9 <= Math.floor(sheep.y) && Math.floor(sheep.y) <= 99) && (Math.floor(sheep.x) >= 20)) {
                    sheep.sx *=  sheep.xlock ? 1 : -1;
                    sheep.xlock = true;
                } else if (sheep.x + models.sheepSettings.width >= models.herdsmanModel.x && sheep.y >= 0 && sheep.y <= models.herdsmanModel.height) {
                    sheep.sx *= -1;
                    sheep.xlock = true;
                }
            }
            if (sheep.sy < 0) {
                if ((20 <= Math.floor(sheep.x) && Math.floor(sheep.x) <= 250)  && (Math.floor(sheep.y) <= 99)) {
                    sheep.sy *=  sheep.ylock ? 1 : -1;
                    sheep.ylock = true;
                } else if (sheep.x + models.sheepSettings.width == models.herdsmanModel.x && sheep.y > 0 && sheep.y <= models.herdsmanModel.height + 50) {
                    sheep.sy *=  -1;
                    sheep.xlock = true;
                }
            }
            else if (sheep.sy > 0) {
                if ((20 <= Math.floor(sheep.x) && Math.floor(sheep.x) <= 250) && (Math.floor(sheep.y) >= 9)) {
                    sheep.sy *=  sheep.ylock ? 1 : -1;
                    sheep.ylock = true;
                }
            }
            
            sheep.x += sheep.sx;
            sheep.y += sheep.sy;
        }
        
    }
}
//коллизия канваса с овцой
function sheepCollision(sheep) {
    if ((sheep.x <= 0)) {
        sheep.x = 1
    }
    if (sheep.x > game.width - models.sheepSettings.width) {
        sheep.x = game.width - models.sheepSettings.width -2;
    }
    if ((sheep.y <= 0)) {
        sheep.y = 1
    }
    if (sheep.y > game.height - models.sheepSettings.height) {
        sheep.y = game.height - models.sheepSettings.height -2;
    }
    collisionZoneHerdsmen(sheep);
}

let arr = [];
let contenttext = document.getElementById("contenttext");

//фермер ловит овцу
function heardsmanCatchingSheep() {
    for (let i = 0; i < models.sheepModels.length; i++) {
        let sheep = models.sheepModels[i];
        if (sheep.leavedZone == true) {
            if ((models.herdsmanModel.farmerLeft && (Math.round(sheep.x) == Math.round(models.herdsmanModel.x)) || (Math.round(sheep.x) == Math.round(models.herdsmanModel.x - 1))) 
            && ((models.herdsmanModel.y + models.herdsmanModel.height / 2) > sheep.y && (models.herdsmanModel.y + models.herdsmanModel.height / 2) < sheep.y + models.sheepSettings.height)) {
                sheep.x -= 2;
                sheepCollision(sheep);
                continue; 
            }
            //совпадение координат и чтоб на сеединубралось
            if ((models.herdsmanModel.farmerRight && (Math.round(sheep.x) == Math.round(models.herdsmanModel.x)) || (Math.round(sheep.x) == Math.round(models.herdsmanModel.x + 1))) 
            && ((models.herdsmanModel.y + models.herdsmanModel.height / 2) > sheep.y && (models.herdsmanModel.y + models.herdsmanModel.height / 2) < sheep.y + models.sheepSettings.height)) {
            sheep.x += 2;
                sheepCollision(sheep);
                continue; 
            }
            if ((models.herdsmanModel.farmerBack && (Math.round(sheep.y + models.sheepSettings.height / 2) == Math.round(models.herdsmanModel.y + models.herdsmanModel.height / 2)) || (Math.round(sheep.y + models.sheepSettings.height / 2) == Math.round(models.herdsmanModel.y + models.herdsmanModel.height / 2 - 1))) 
            && ((models.herdsmanModel.x + models.herdsmanModel.width / 2) > sheep.x && (models.herdsmanModel.x + models.herdsmanModel.width / 2) < sheep.x + models.sheepSettings.width)) {
            sheep.y -= 2;
                sheepCollision(sheep);
                continue; 
            }
            if ((models.herdsmanModel.farmerForward && (Math.round(sheep.y) == Math.round(models.herdsmanModel.y)) || (Math.round(sheep.y) == Math.round(models.herdsmanModel.y - 1))) 
            && ((models.herdsmanModel.x + models.herdsmanModel.width / 2 + 5) > sheep.x && (models.herdsmanModel.x + models.herdsmanModel.width / 2 + 5) < sheep.x + models.sheepSettings.width)) {
                sheep.y += 2;
                sheepCollision(sheep);
                continue; 
            }
            if (((Math.round(sheep.x) + Math.round((models.sheepSettings.width))) >= 44 && (Math.round(sheep.x) + Math.round((models.sheepSettings.width))) <= 70) && 
            ((sheep.y + models.sheepSettings.height / 2) >= models.openZoneModel.y && (sheep.y + models.sheepSettings.height / 2) <= models.openZoneModel.y + models.openZoneModel.height)) {
                if (sheep.x < 70) {
                    sheep.x += 2;
                    sheep.leavedZone = false;
                    arr.push(models.sheepModels[i])
                    console.log(arr)
                    console.log(arr.length)

                    if (arr.length >= 5){
                        contenttext.innerHTML = 'вы победили !'
                        openmodal();
                    }
                }
            }
        }
        else {
            if (sheep.x < 60) {
                sheep.x += 2;
            }
            
        }
    }
}

//остановка овец вне загона
function sheepStop(sheep) {
    if (((Math.round(sheep.x) + Math.round((models.sheepSettings.width))) >= 44 && (Math.round(sheep.x) + Math.round((models.sheepSettings.width))) <= 50) && 
    ((sheep.y + models.sheepSettings.height / 2) >= models.openZoneModel.y && (sheep.y + models.sheepSettings.height / 2) <= models.openZoneModel.y + models.openZoneModel.height)) {
        sheep.x -= 7;
    }
}
//коллизия человека с углами канваса
function collisionHerdsman() {
    if (models.herdsmanModel.farmerLeft && models.herdsmanModel.x > 0) {
        models.herdsmanModel.x -= 2;
    } else if (models.herdsmanModel.farmerRight && models.herdsmanModel.x < game.width - models.herdsmanModel.width) {
        models.herdsmanModel.x += 2;
    } else if (models.herdsmanModel.farmerBack && models.herdsmanModel.y > 0) {
        models.herdsmanModel.y -= 2;
    } else if (models.herdsmanModel.farmerForward && models.herdsmanModel.y < game.height + models.herdsmanModel.height && models.herdsmanModel.y !== 123) {
        models.herdsmanModel.y += 2;
    }
}

//коллизия зоны и человека
function collisionZoneHerdsmen(model) {
    // правый снаружи
    if (233 <= model.x && model.x <= 249) {
        if (7 <= model.y && model.y <= 93) {
            model.x += 2;
        }
    }
    // правый внутренний
    if (233 <= model.x && model.x <= 249) {
        if (7 <= model.y && model.y <= 93) {
            model.x -= 2;
        }
    }
    {
        // левый снаружи
        if (25 <= model.x && model.x <= 49) {
            if (7 <= model.y && model.y <= 93) {
                model.x -= 2;
            }
        }
        // левый внутри
        if (25 <= model.x && model.x <= 49) {
            if (7 <= model.y && model.y <= 93) {
                model.x += 2;
            }
        }
    }
    // верхний внутренний
    if (Math.floor(model.y) >= 7 && Math.floor(model.y) <= 9) {
        if (Math.floor(model.x) >= 50 && Math.floor(model.x) <= 232) {
            model.y += 2;
        }
    }

    // верхний внешний
    if (Math.floor(model.y) >= 5 && Math.floor(model.y) <= 7) {
        if (Math.floor(model.x) >= 28 && Math.floor(model.x) <= 245) {
            model.y -= 2;
        }
    }

    // нижний внешний
    if (Math.floor(model.y) >= 95 && Math.floor(model.y) <= 97) {
        if (Math.floor(model.x) >= 28 && Math.floor(model.x) <= 245) {
            model.y += 2;
        }
    }

    // нижний внутренний
    if (Math.floor(model.y) >= 89 && Math.floor(model.y) <= 91) {
        if (Math.floor(model.x) >= 50 && Math.floor(model.x) <= 232) {
            model.y -= 2;
        }
    }
}
openmodaltwo()
let sheepsCount = models.sheepModels.length;
let startedPrevPosition = 1000;

//отрисовка всего
function draw() {

    startWalk += 1
    //console.log(startWalk)
    game_content.clearRect(0, 0, game.width, game.height);
    zoneDraw();
    openZoneDraw();
    herdsmanDraw();
    drawSheeps(5);

    sheepWalkStart();

    if (startWalk > 180 && startWalk < 1000) {
        sheepWalk(models.sheepModels.length);
    } else if (startWalk > 1000 && startWalk <= 1200) {
        if (startWalk <= startedPrevPosition + 50 && !sheepsCount == 0) {

            if (startWalk == startedPrevPosition + 50) {
                sheepsCount--;
                console.log(startedPrevPosition)
                // arr.push(models.sheep)
                // console.log(arr)
                startedPrevPosition = startedPrevPosition + 50;

            }

            sheepWalk(sheepsCount);
        }

    } else if (startWalk > 1200 && !noListeners) {
        if (SheepAwayFromZone()) {
            //sheepWalk(models.sheepModels.length - 1);
            HerdsmanWalk();
            noListeners = true;
            models.sheepModels.forEach(sheep => {
                sheepStop(sheep);
            })
        } else {
            SheepAwayFromZone();
        }
    } else {
        heardsmanCatchingSheep();
    }
    collisionHerdsman();
    collisionZoneHerdsmen(models.herdsmanModel);

//движение человека
    function HerdsmanWalk() {
        document.addEventListener('keydown', (e) => {
            if (e.code === "KeyD") {
                models.herdsmanModel.farmerRight = true;
                models.herdsmanModel.farmerLeft = false;
                models.herdsmanModel.farmerBack = false;
                models.herdsmanModel.farmerForward = false;
                farmer.src = "./image/farmer/farmerright.png";
                game_content.drawImage(farmer, models.herdsmanModel.x, models.herdsmanModel.y, models.herdsmanModel.width, models.herdsmanModel.height)
            } else if (e.code === "KeyA") {
                models.herdsmanModel.farmerLeft = true;
                models.herdsmanModel.farmerRight = false;
                models.herdsmanModel.farmerBack = false;
                models.herdsmanModel.farmerForward = false;
                farmer.src = "./image/farmer/farmerleft.png";
                game_content.drawImage(farmer, models.herdsmanModel.x, models.herdsmanModel.y, models.herdsmanModel.width, models.herdsmanModel.height)
            } else if (e.code === "KeyW") {
                models.herdsmanModel.farmerBack = true;
                models.herdsmanModel.farmerRight = false;
                models.herdsmanModel.farmerLeft = false;
                models.herdsmanModel.farmerForward = false;
                farmer.src = "./image/farmer/farmerback.png";
                game_content.drawImage(farmer, models.herdsmanModel.x, models.herdsmanModel.y, models.herdsmanModel.width, models.herdsmanModel.height)
            } else if (e.code === "KeyS") {
                models.herdsmanModel.farmerForward = true;
                models.herdsmanModel.farmerRight = false;
                models.herdsmanModel.farmerLeft = false;
                models.herdsmanModel.farmerBack = false;
                farmer.src = "./image/farmer/farmer.png";
                game_content.drawImage(farmer, models.herdsmanModel.x, models.herdsmanModel.y, models.herdsmanModel.width, models.herdsmanModel.height)
            }
        })

        document.addEventListener('keyup', (e) => {
            if (e.code === "KeyD") {
                models.herdsmanModel.farmerRight = false;
                farmer.src = "./image/farmer/farmer.png";
                game_content.drawImage(farmer, models.herdsmanModel.x, models.herdsmanModel.y, models.herdsmanModel.width, models.herdsmanModel.height)
            } else if (e.code === "KeyA") {
                models.herdsmanModel.farmerLeft = false;
                farmer.src = "./image/farmer/farmer.png";
                game_content.drawImage(farmer, models.herdsmanModel.x, models.herdsmanModel.y, models.herdsmanModel.width, models.herdsmanModel.height)
            } else if (e.code === "KeyW") {
                models.herdsmanModel.farmerBack = false;
                farmer.src = "./image/farmer/farmer.png";
                game_content.drawImage(farmer, models.herdsmanModel.x, models.herdsmanModel.y, models.herdsmanModel.width, models.herdsmanModel.height)
            } else if (e.code === "KeyS") {
                models.herdsmanModel.farmerForward = false;
                farmer.src = "./image/farmer/farmer.png";
                game_content.drawImage(farmer, models.herdsmanModel.x, models.herdsmanModel.y, models.herdsmanModel.width, models.herdsmanModel.height)
            }
        })
    }
}

//исправление случайного попадания
function SheepAwayFromZone() {
    let notAnyInZone = true;
    models.sheepModels.forEach(sheep => {
        if (((Math.round(sheep.x) + Math.round((models.sheepSettings.width))) >= 44 && (Math.round(sheep.x) + Math.round((models.sheepSettings.width))) <= 100) && 
        ((sheep.y + models.sheepSettings.height / 2) >= models.openZoneModel.y && (sheep.y + models.sheepSettings.height / 2) <= models.openZoneModel.y + models.openZoneModel.height)) {
            sheep.x -= 1;
            notAnyInZone = false;
        }
    });
    return notAnyInZone;
}
leveltwo.addEventListener('click', function () {
            timerText = "0.60";
            timeMinut = parseInt(timerText * 60)
            audio.play();
            modal2.style.display = "none";
            // document.location.reload();
            setInterval(draw, 10)
})
