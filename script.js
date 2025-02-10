
let player = document.getElementById("player");
let container = document.getElementById('container');
let row1 = document.getElementById('row1');
let row2 = document.getElementById('row2');
let row3 = document.getElementById('row3');
let counterelement = document.getElementById('counter');
let countermaxelement = document.getElementById("counter-max")
let overlay = document.getElementById('overlay');
let btn = document.getElementById("restart");
let shit = document.getElementById("shit");
let song = document.getElementById("song");
let enemybombspeed = 100;
let enemyspeed = 50;
let enemylunchtime = 2000;
let marginright = 45;
let marginleft = 45;
let id = 0;
let enemyid = 0;
let enemybombid = 0;
let enemycontainerid = 0;
let counter = 0;
let countermax = counter;
let rowarray = [row1,row2,row3];
let idarray = [];
let enemybombarray = [];
let shootable = false;
let enemyshootable = false;
document.addEventListener('keydown',event => {
    if(event.key == 'ArrowRight'||event.key == 'd'){
        if(marginleft >= 90){marginleft = 89;}
        if(marginright <= 0){marginright = 1;}
        marginright--;
        marginleft++;
    }
    if(event.key == 'ArrowLeft'||event.key == 'a'){
        if(marginright >= 90){marginright = 89;}
        if(marginleft <= 0){marginleft = 1;}
        marginleft--;
        marginright++;
    }
    if(event.key == ' '&&shootable){shoot();};
    if(event.ctrlKey && event.key == 'z'){summon1();};
    player.style.marginLeft = marginleft + '%';
    player.style.marginRight = marginright + '%';
});
document.addEventListener('click',()=>{
    if(shootable){
        shoot()
    }
})
function shoot(){
        let height = 0;
        let bullet = document.createElement('div');
        bullet.classList = 'friend';
        bullet.id = id;
        idarray.push(id);
        //bullet.style.height = '20px';
        //bullet.style.width = '7px';
        //bullet.style.backgroundColor = 'red';
        bullet.style.height = '25px';
        bullet.style.width = '13px';
        bullet.style.backgroundImage = 'url(jojo.jpg)';
        bullet.style.backgroundSize = 'cover';
        bullet.style.backgroundRepeat = 'no-repeat';
        bullet.style.marginLeft = marginleft+5+'%';
        bullet.style.marginRight = marginright+5+'%';
        if(document.querySelectorAll('.friend').length<2){
            container.appendChild(bullet);                    
        }else{
            container.insertBefore(bullet,document.getElementById(id-1));
        }
        setInterval(()=>{
            try{
                height++;
                if(document.getElementById(idarray[0]).offsetTop <= 52){
                    kill(container,idarray[0]);
                };
                if(document.querySelectorAll('.friend').length<=(bullet.id+2)){
                    bullet.style.marginBottom = height+'%';
                }
            }catch(error){
                //idc about it.
            }
        },100);
        setInterval(() => {
            try{
                let enemies = document.querySelectorAll('.enemy');
                for(enemy of enemies){
                    let ec = enemy.getBoundingClientRect();
                    let bc = bullet.getBoundingClientRect();
                    if(
                        Math.round(bc.y)+Math.round(bc.height) >= Math.round(ec.y)&&
                        Math.round(bc.y) <= Math.round(ec.y)+Math.round(ec.height)&&
                        Math.round(bc.x)+Math.round(bc.width) >= Math.round(ec.x)&&
                        Math.round(bc.x) <= Math.round(ec.x)+Math.round(ec.width)
                    ){
                        let yes = document.createElement('audio');
                        yes.src = 'yes.mp3';
                        yes.classList = 'yes';
                        yes.autoplay = true;
                        document.body.appendChild(yes);//'<audio class="yes" src="yes.mp3" autoplay></audio>';
                        setTimeout(() => {
                            document.body.removeChild(document.querySelector('.yes'));
                        }, 4000);
                        killboth(bullet,enemy,container,enemy.parentElement.id);
                    }
                }
            }catch(error){
                //idc about it.
            }
        }, 0);
        id++;
}
function kill(container,id){
    try{
        container.removeChild(document.getElementById(id));
        if(id == idarray[0]){
            idarray = idarray.slice(1,idarray.length);
        }
    }catch(error){}
}
function summon1(){
    for(let i=0;i<3;i++){
        let enemy = document.createElement('div');
        //let p  = '<p>ENEMY</p>';
        let r = Math.ceil(Math.random()*2);
        let right = Math.ceil(Math.random()*90);
        let left = 90 - right;
        let ltr;
        enemy.classList = 'enemy';
        enemy.id = 'enemy'+enemyid;
        enemy.style.marginRight = right+'%';
        enemy.style.marginLeft = left+'%';
        rowarray[i].appendChild(enemy);
        //enemy.innerHTML = p;
        enemyid++;
        if(r==1){ltr=true;}
        if(r==2){ltr=false;}
        setInterval(() => {
            if(ltr){
                if(left<90&&right>0){
                    right--;
                    left++;
                    enemy.style.marginRight = right+'%';
                    enemy.style.marginLeft = left+'%';
                }
                if(left == 90){
                    ltr = false;
                }
            }else{
                if(right<90&&left>0){
                    right++;
                    left--;
                    enemy.style.marginRight = right+'%';
                    enemy.style.marginLeft = left+'%';
                }
                if(right == 90){
                    ltr = true;
                }
            }
        }, enemyspeed);
        setInterval(() => {
            try{
                if(enemy.previousSibling.children.length<1){
                    if(enemyshootable){
                    enemyshoot(right,left,enemy.previousSibling)
                    }
                }
            }catch(error){
                //idc about it
            }

        }, enemylunchtime);
    }

}
function killboth(bullet,enemy,container,enemycontainer){
    if(bullet.id/2 == NaN){
        kill(container,bullet.id)
    }else{
        container.removeChild(document.getElementById(bullet.id));
        let idarray2 = [];
        idarray.forEach(value=>{
            if(value == bullet.id){return;}
            else{idarray2.push(value);}
        })
        idarray = [];
        idarray = idarray2;
    }

    //enemy.style.backgroundColor = 'goldenrod';
    //enemy.lastChild.textContent = 'DEAD';
    if(enemy.id == 'player'){
        shit.play();song.pause();
        let audios = document.querySelectorAll('.yes');
        for(yes of audios){
            document.body.removeChild(yes);
        }
    }
    setTimeout(() => {
        try{
            if(enemy.id == 'player'){
                shootable = false;
                enemyshootable = false;
                enemy.style.display = 'none';
                if(counter>countermax){
                    countermax = counter;
                    countermaxelement.textContent = 'highest score:'+countermax;
                }
                counter = 0;
                counterelement.textContent = 'Score:0'+counter;
                overlay.style.display = 'flex';
                let message = document.createElement('p');
                message.textContent = 'YOU LOST!!';
                overlay.prepend(message);
                btn.style.display = 'block';
                btn.textContent = 'RESTART THE GAME';
            }else{
                document.getElementById(enemycontainer).removeChild(document.getElementById(enemy.id));
                counter++;
                counterelement.textContent = 'Score:0'+counter;
                let enemies = document.querySelectorAll(".enemy");
                if(enemies.length == 0){
                    enemybombspeed = enemybombspeed * 0.95;
                    enemyspeed = enemyspeed * 0.95;
                    enemylunchtime = enemylunchtime * 0.95;
                    summon1();
                }
                if(counter == 30){song.play()}
            }
        }catch(error){
            //idc about it
        }
    }, 1000);
}
function enemyshoot(right,left,container){
    let height = 0;
    let bomb = document.createElement('div');
    bomb.id = enemybombid+'bomb';
    enemybombarray.push(id);
    //bomb.style.height = '20px';
    //bomb.style.width = '20px';
    bomb.style.height = '30px';
    bomb.style.width = '30px';
    //bomb.style.backgroundColor = 'orange';
    bomb.classList = 'bomb';
    bomb.style.position = 'absolute';
    bomb.style.marginLeft = left+5+'%';
    bomb.style.marginRight = right+5+'%';
    container.appendChild(bomb);
    setInterval(()=>{
        try{
            height++;
            bomb.style.marginTop = height+'%';
        }catch(error){
            //idc about it.
        }
    },enemybombspeed);
    setInterval(() => {
        try{
            let enemy = document.getElementById('player');
                let ec = enemy.getBoundingClientRect();
                let bc = bomb.getBoundingClientRect();
                if(
                    Math.round(bc.y)+Math.round(bc.height) >= Math.round(ec.y)&&
                    Math.round(bc.y) <= Math.round(ec.y)+Math.round(ec.height)&&
                    Math.round(bc.x)+Math.round(bc.width) >= Math.round(ec.x)&&
                    Math.round(bc.x) <= Math.round(ec.x)+Math.round(ec.width)
                ){
                    killboth(bomb,enemy,bomb.parentElement,enemy.parentElement);
                }


         }catch(error){
            //idc about it.
        }
    }, 0);                
    if(container.id == 'bombrow1'){
        setInterval(() => {
            if(parseFloat(bomb.style.marginTop) >= 43){
                kill(bomb.parentElement,bomb.id);
            };
        }, enemybombspeed);
    }else if(container.id == 'bombrow2'){
        setInterval(() => {
            if(parseFloat(bomb.style.marginTop) >= 36){
                kill(bomb.parentElement,bomb.id);
            };
        }, enemybombspeed);
    }else if(container.id == 'bombrow3'){
        setInterval(() => {
            if(parseFloat(bomb.style.marginTop) >= 29){
                kill(bomb.parentElement,bomb.id);
            };
        }, enemybombspeed);
    }
    enemybombid++;
}
function start(){
    enemybombspeed = 100;
    enemyspeed = 50;
    enemylunchtime = 2000;
    overlay.removeChild(overlay.firstChild);
    let i = 3;
    btn.style.display = 'none';
    let message = document.createElement('p');
    message.textContent = i;
    overlay.prepend(message)
    i--;
    let x = setInterval(() => {
        if(i == -1){
            player.style.display = 'flex';
            player.style.backgroundColor = 'limegreen';
            player.lastChild.textContent = 'YOU';
            shootable = true;
            enemyshootable = true;
            let enemies = document.querySelectorAll(".enemy");
            for(enemy of enemies){
                enemy.parentElement.removeChild(enemy);
            }
            clearInterval(x);
            overlay.removeChild(message);
            overlay.style.display = 'none';
            summon1();
        }
        overlay.removeChild(message);
        message.textContent = i;
        overlay.prepend(message);
        i--;
    }, 1000);
}
btn.onclick = start;