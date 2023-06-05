'use strict';

const main = document.getElementById('main');
const play = document.getElementById('play');
const field = document.getElementById('field');
let hit = document.getElementById('hit');
let block = document.getElementById('block');
const heroLife = document.getElementById('heroLife');
const heroShield = document.getElementById('heroShield');
const heroBless = document.getElementById('heroBless');
const enemyLife = document.getElementById('enemyLife');
const overlay = document.getElementById('overlay');
const overlayVictory = document.getElementById('overlayVictory');
const gameOver = document.getElementById('gameOver');
const currentScore = document.getElementById('currentScore');
const enemiesKilled = document.getElementById('enemiesKilled');
const previousScore = document.getElementById('previousScore');
const action = document.getElementById('action');
const restart = document.getElementById('restart');
const rules = document.getElementById('rules');
let controlsElem;

const fx = {
    animId: 0,
    element: document.getElementById('fx'),
    fx: ['../assets/fx/fx-hit/Effect 2 - Sprite Sheet 1 (3).png', '../assets/fx/fx-hit/Effect 2 - Sprite Sheet 1 (2).png', '../assets/fx/fx-hit/Effect 2 - Sprite Sheet 1 (1).png', '../assets/fx/fx-hit/Effect 2 - Sprite Sheet 1.png', ],
    fxSuper: ['../assets/fx/fx-super/frame0000.png', '../assets/fx/fx-super/frame0001.png', '../assets/fx/fx-super/frame0002.png', '../assets/fx/fx-super/frame0003.png', '../assets/fx/fx-super/frame0004.png', '../assets/fx/fx-super/frame0005.png', '../assets/fx/fx-super/frame0006.png', '../assets/fx/fx-super/frame0007.png', '../assets/fx/fx-super/frame0008.png', '../assets/fx/fx-super/frame0009.png', '../assets/fx/fx-super/frame0010.png',  '../assets/fx/fx-super/frame0011.png',  '../assets/fx/fx-super/frame0012.png',  '../assets/fx/fx-super/frame0013.png',  '../assets/fx/fx-super/frame0014.png',  '../assets/fx/fx-super/frame0015.png', ],
    fxSuperHero: ['../assets/fx/fx-super-hero/frame0000.png', '../assets/fx/fx-super-hero/frame0001.png', '../assets/fx/fx-super-hero/frame0002.png', '../assets/fx/fx-super-hero/frame0003.png', '../assets/fx/fx-super-hero/frame0004.png', '../assets/fx/fx-super-hero/frame0005.png', '../assets/fx/fx-super-hero/frame0006.png', ],
    fxSuperUndead: ['../assets/fx/fx-undead/fx-undead.png', '../assets/fx/fx-undead/fx-undead (1).png', '../assets/fx/fx-undead/fx-undead (2).png', '../assets/fx/fx-undead/fx-undead (3).png', '../assets/fx/fx-undead/fx-undead (4).png', '../assets/fx/fx-undead/fx-undead (5).png', '../assets/fx/fx-undead/fx-undead (6).png', '../assets/fx/fx-undead/fx-undead (7).png', '../assets/fx/fx-undead/fx-undead.png', '../assets/fx/fx-undead/fx-undead (1).png', '../assets/fx/fx-undead/fx-undead (2).png', '../assets/fx/fx-undead/fx-undead (3).png', '../assets/fx/fx-undead/fx-undead (4).png', '../assets/fx/fx-undead/fx-undead (5).png', '../assets/fx/fx-undead/fx-undead (6).png', '../assets/fx/fx-undead/fx-undead (7).png'],
};

const hero = {
    animId: 0,
    timeoutId: 0,
    element: document.getElementById('hero'),
    superStack: 0,
    idle: ['../assets/hero/idle/idle4.png', '../assets/hero/idle/idle5.png', '../assets/hero/idle/idle6.png', '../assets/hero/idle/idle7.png'],
    attack: ['../assets/hero/attack/attack1.png', '../assets/hero/attack/attack2.png', '../assets/hero/attack/attack3.png', '../assets/hero/attack/attack4.png', ],
    attack2: ['../assets/hero/attack2/adventurer-bow-00.png', '../assets/hero/attack2/adventurer-bow-01.png', '../assets/hero/attack2/adventurer-bow-02.png', '../assets/hero/attack2/adventurer-bow-03.png', '../assets/hero/attack2/adventurer-bow-04.png', '../assets/hero/attack2/adventurer-bow-05.png', '../assets/hero/attack2/adventurer-bow-06.png', '../assets/hero/attack2/adventurer-bow-07.png', '../assets/hero/attack2/adventurer-bow-08.png', ],
    run: ['../assets/hero/run/run1.png', '../assets/hero/run/run2.png', '../assets/hero/run/run3.png', '../assets/hero/run/run4.png', '../assets/hero/run/run5.png', '../assets/hero/run/run6.png', ],
    die: ['../assets/hero/die/die1.png', '../assets/hero/die/die2.png', '../assets/hero/die/die3.png', '../assets/hero/die/die4.png', '../assets/hero/die/die5.png', '../assets/hero/die/die6.png', '../assets/hero/die/die7.png', ],
    block: ['../assets/hero/block/block1.png', '../assets/hero/block/block2.png', '../assets/hero/block/block3.png', ],
    life: 4,
    shield: 3,
    originalShield: 3,
};

const skeleton = {
    animId: 0,
    element: null,
    idle: ['../assets/skeleton/idle/Skeleton Idle1.png', '../assets/skeleton/idle/Skeleton Idle2.png', '../assets/skeleton/idle/Skeleton Idle3.png', '../assets/skeleton/idle/Skeleton Idle4.png', '../assets/skeleton/idle/Skeleton Idle5.png', '../assets/skeleton/idle/Skeleton Idle6.png', '../assets/skeleton/idle/Skeleton Idle7.png', '../assets/skeleton/idle/Skeleton Idle8.png', '../assets/skeleton/idle/Skeleton Idle9.png', '../assets/skeleton/idle/Skeleton Idle10.png', '../assets/skeleton/idle/Skeleton Idle11.png', ],
    attack: ['../assets/skeleton/attack/Skeleton Attack1.png', '../assets/skeleton/attack/Skeleton Attack2.png', '../assets/skeleton/attack/Skeleton Attack3.png', '../assets/skeleton/attack/Skeleton Attack4.png', '../assets/skeleton/attack/Skeleton Attack5.png', ],
    hit: ['../assets/skeleton/hit/Skeleton Hit1.png', '../assets/skeleton/hit/Skeleton Hit2.png', '../assets/skeleton/hit/Skeleton Hit3.png', '../assets/skeleton/hit/Skeleton Hit4.png', '../assets/skeleton/hit/Skeleton Hit5.png',  '../assets/skeleton/hit/Skeleton Hit6.png',  '../assets/skeleton/hit/Skeleton Hit7.png',  '../assets/skeleton/hit/Skeleton Hit8.png', ],
    run: ['../assets/skeleton/run/Skeleton Walk1.png', '../assets/skeleton/run/Skeleton Walk2.png', '../assets/skeleton/run/Skeleton Walk3.png', '../assets/skeleton/run/Skeleton Walk4.png', '../assets/skeleton/run/Skeleton Walk5.png', '../assets/skeleton/run/Skeleton Walk6.png', '../assets/skeleton/run/Skeleton Walk7.png', ],
    die: ['../assets/skeleton/die/Skeleton Dead1.png', '../assets/skeleton/die/Skeleton Dead2.png', '../assets/skeleton/die/Skeleton Dead3.png', '../assets/skeleton/die/Skeleton Dead4.png', '../assets/skeleton/die/Skeleton Dead5.png', ],
    life: 0,
    originalLife: 3,
};

const slime = {
    animId: 0,
    element: null,
    idle: ['../assets/slime/idle/slime-idle-0.png', '../assets/slime/idle/slime-idle-1.png', '../assets/slime/idle/slime-idle-2.png', '../assets/slime/idle/slime-idle-3.png', ],
    attack: ['../assets/slime/attack/slime-attack-0.png', '../assets/slime/attack/slime-attack-1.png', '../assets/slime/attack/slime-attack-2.png', '../assets/slime/attack/slime-attack-3.png', '../assets/slime/attack/slime-attack-4.png', ],
    hit: ['../assets/slime/hit/slime-hurt-0.png', '../assets/slime/hit/slime-hurt-1.png', '../assets/slime/hit/slime-hurt-2.png', '../assets/slime/hit/slime-hurt-3.png',],
    run: ['../assets/slime/run/slime-move-0.png', '../assets/slime/run/slime-move-1.png', '../assets/slime/run/slime-move-2.png', '../assets/slime/run/slime-move-3.png', ],
    die: ['../assets/slime/die/slime-die-0.png', '../assets/slime/die/slime-die-1.png', '../assets/slime/die/slime-die-2.png', '../assets/slime/die/slime-die-3.png', ],
    life: 0,
    originalLife: 2,
};

const undead = {
    animId: 0,
    element: null,
    idle: ['../assets/undead/idle/idle1.png', '../assets/undead/idle/idle2.png', '../assets/undead/idle/idle3.png', '../assets/undead/idle/idle4.png', '../assets/undead/idle/idle5.png', '../assets/undead/idle/idle6.png', '../assets/undead/idle/idle7.png', ],
    attack: ['../assets/undead/attack/attack1.png', '../assets/undead/attack/attack2.png', '../assets/undead/attack/attack3.png', '../assets/undead/attack/attack4.png', ],
    attack2: ['../assets/undead/attack2/hit1.png', '../assets/undead/attack2/hit2.png', '../assets/undead/attack2/hit3.png', '../assets/undead/attack2/hit4.png', '../assets/undead/attack2/hit5.png', '../assets/undead/attack2/hit6.png', '../assets/undead/attack2/hit7.png', '../assets/undead/attack2/hit8.png', '../assets/undead/attack2/hit9.png', '../assets/undead/attack2/hit10.png', '../assets/undead/attack2/hit11.png', ],
    hit: ['../assets/undead/hit/hit1.png', '../assets/undead/hit/hit2.png', '../assets/undead/hit/hit3.png', '../assets/undead/hit/hit4.png',],
    run: ['../assets/undead/run/run1.png', '../assets/undead/run/run2.png', '../assets/undead/run/run3.png', '../assets/undead/run/run4.png',],
    die: ['../assets/undead/die/die1.png', '../assets/undead/die/die2.png', '../assets/undead/die/die3.png', '../assets/undead/die/die4.png', '../assets/undead/die/die5.png', '../assets/undead/die/die6.png', '../assets/undead/die/die7.png', '../assets/undead/die/die8.png', '../assets/undead/die/die9.png', '../assets/undead/die/die10.png', '../assets/undead/die/die11.png', '../assets/undead/die/die12.png', '../assets/undead/die/die13.png', '../assets/undead/die/die14.png', '../assets/undead/die/die15.png', '../assets/undead/die/die16.png', '../assets/undead/die/die17.png', '../assets/undead/die/die18.png', '../assets/undead/die/die19.png', '../assets/undead/die/die20.png'],
    life: 0,
    superStack: 0,
    originalLife: 5,
};

const sound = {
    attack: '../assets/sound/attack/DesignedPunch4.wav',
    attackHero: '../assets/sound/attack/hero.mp3',
    block: '../assets/sound/block/35_Miss_Evade_02.wav',
    die: '../assets/sound/die/69_Enemy_death_01.wav',
    run: '../assets/sound/run/03_Step_grass_03.wav',
    blink: '../assets/sound/attack/5c71c091f8f9bfd.mp3',
    electro: '../assets/sound/attack/electr.mp3',
    bg: '../assets/sound/bg-music.mp3',
}


let currentEnemy = null;
let curScore = 0;
let prevScore = 0;
let killedEnemies = 0;

const playAudio = (type) => {
    let audio = new Audio(`${type}`);
    if (type === sound.run) {
        audio.volume = 0.5;
    } else if (type === sound.attackHero) {
        audio.volume = 0.3;
    } else if (type === sound.bg) {
        audio.volume = 0.4;
    } else {
        audio.volume = 0.5;
    }
    audio.play();
}
const playAudioRepeat = (interval, duration, type) => {
    let audio = setInterval(() => {
        playAudio(type)
    }, interval)
    setTimeout(() => {
        clearInterval(audio);
    }, duration);
}

const summonSkeleton = () => {
    controlsElem.hidden = true;
    const newSkeleton = document.createElement('div');
    newSkeleton.classList.add('skeleton');
    newSkeleton.id = 'skeleton';
    playAudio(sound.run);
    playAudioRepeat(400, 700, sound.run);

    field.append(newSkeleton);
    skeleton.element = newSkeleton;
    skeleton.life = 3;

    skeleton.element.style.transition = `all ${700}ms linear`
    skeleton.element.style.right = -30 + 'px';

    setTimeout(e => {
        skeleton.element.style.right = '';
        playAudio(sound.run);
        playAudioRepeat(400, 700, sound.run);
        animation(skeleton.run, skeleton, 60, 'repeat');
    }, 500);

    setTimeout(e => {
        animation(skeleton.idle, skeleton, 100, 'repeat');
        controlsElem.hidden = false;
    }, (skeleton.run.length * 60) + 900);

    currentEnemy = skeleton;
}

const summonSlime = () => {
    controlsElem.hidden = true;
    const newSlime = document.createElement('div');
    newSlime.classList.add('slime');
    newSlime.id = 'slime';

    field.append(newSlime);
    slime.element = newSlime;
    slime.life = 2;


    slime.element.style.transition = `all ${700}ms linear`
    slime.element.style.right = -30 + 'px';

    setTimeout(e => {
        slime.element.style.right = '';
        playAudio(sound.run);
        playAudioRepeat(400, 700, sound.run);
        animation(slime.run, slime, 60, 'repeat');
    }, 500);

    setTimeout(e => {
        animation(slime.idle, slime, 100, 'repeat');
        controlsElem.hidden = false;
    }, (slime.run.length * 60) + 900);

    currentEnemy = slime;
}

const summonUndead = () => {
    controlsElem.hidden = true;
    const newUndead = document.createElement('div');
    newUndead.classList.add('undead');
    newUndead.id = 'undead';

    field.append(newUndead);
    undead.element = newUndead;
    undead.life = 5;


    undead.element.style.transition = `all ${700}ms linear`
    undead.element.style.right = -100 + 'px';

    setTimeout(e => {
        undead.element.style.right = '';
        playAudio(sound.run);
        playAudioRepeat(400, 700, sound.run);
        animation(undead.run, undead, 60, 'repeat');
    }, 500);

    setTimeout(e => {
        animation(undead.idle, undead, 100, 'repeat');
        controlsElem.hidden = false;
    }, (undead.run.length * 60) + 900);

    currentEnemy = undead;
}

const summonHero = () => {
    const newHero = document.createElement('div');
    newHero.classList.add('hero');
    newHero.id = 'hero';

    field.append(newHero);
    hero.element = newHero;
    hero.life = 5;

    hero.life = 4;
    hero.superStack = 0;
    hero.shield = 3;
    hero.element.style.left = '';
}

const summonControls = () => {
    const controls = document.createElement('div')
    controls.classList.add('controls');
    controls.id = 'controls';

    controls.innerHTML += `
    <div class="controls" id="controls">
           <button class="hit" id="hit"></button>
           <button class="block" id="block"></button>
    </div>
    `

    controlsElem = controls;
    return controls
}

const animation = (type, unit, speed, repeat = 'no') => {
    clearInterval(unit.animId);
    clearTimeout(unit.timeoutId);

    let i = 0;

    if (repeat === 'no') {
        const anim = () => {
            type.forEach((el, i) => {
                unit.timeoutId = setTimeout(() => {
                    unit.element.style.backgroundImage = `url("${el}")`;
                }, (i + 1) * speed)
            })
        }
        anim();
    } else {
        const anim = () => {
            if (i < type.length) {
                unit.element.style.backgroundImage = `url("${type[i]}")`;
                i++;
            } else {
                i = 0;
            }
        }
        anim();
        unit.animId = setInterval(anim, speed);
    }
}

const heroWalk = () => {
    animation(hero.run, hero, 80, 'repeat');
    hero.element.style.transition = `all ${1200}ms linear`
    hero.element.style.left = 320 + 'px';
    playAudio(sound.run);
    playAudioRepeat(400, 1200, sound.run);

    controlsElem.hidden = true;
}
const heroWalkVictory = () => {
    animation(hero.run, hero, 80, 'repeat');
    hero.element.style.transition = `all ${1800}ms linear`
    hero.element.style.left = 500 + 'px';
    playAudio(sound.run);
    playAudioRepeat(400, 1800, sound.run);

    controlsElem.hidden = true;
}

const heroAttack = (enemy) => {
    let enemyIdleTimeout;
    if (enemy.element.classList.contains('undead')) {
        enemyIdleTimeout = 500;
    } else {
        enemyIdleTimeout = 800;
    }

    setTimeout(e => {
        hero.element.style.transition = `none`
        animation(hero.attack, hero, 200);

        setTimeout(e => {
            fx.element.hidden = false;
            animation(fx.fx, fx, 100);
            animation(enemy.hit, enemy, 100);
        }, 400)
        setTimeout(() => {
            playAudio(playAudio(sound.attackHero))
            actionPop(`You hit the enemy!`, '#29a120')
        }, 200)

        setTimeout(e => {
            animation(enemy.idle, enemy, 100, 'repeat');
        }, enemyIdleTimeout);

        setTimeout(e => {
            fx.element.hidden = true;
        }, ((fx.fx.length) * 100) + 550);
    }, 1300);


    setTimeout(e => {
        hero.element.style.left = '';
        animation(hero.idle, hero, 200, 'repeat');
        if (currentEnemy.life > 0) {
            controlsElem.hidden = false;
        }
    }, 1400 + ((hero.attack.length) * 200));
}

const heroSuperAttack = (enemy) => {
    controlsElem.hidden = true;
    animation(hero.attack2, hero, 100);
    actionPop(`Super attack!`, '#430093')

    playAudio(sound.blink)

    fx.element.hidden = false
    fx.element.style.width = 140 + 'px';
    fx.element.style.height = 50 + 'px';
    fx.element.style.right = 315 + 'px';
    fx.element.style.bottom = 65 + 'px';
    fx.element.style.zIndex = '1';
    animation(fx.fxSuperHero, fx, 100);

    setTimeout(() => {
        fx.element.hidden = true
    }, fx.fxSuperHero.length * 100);

    setTimeout(() => {
        playAudio(sound.electro)
        fx.element.hidden = false
        fx.element.style.width = 72 + 'px';
        fx.element.style.height = 72 + 'px';
        fx.element.style.right = 25 + 'px';
        fx.element.style.bottom = 55 + 'px';
        fx.element.style.zIndex = '2';
        animation(fx.fxSuper, fx, 100);
        animation(hero.idle, hero, 200, 'repeat');
    }, hero.attack2.length * 100)

    setTimeout(() => {
        fx.element.hidden = true
        fx.element.style.width = '';
        fx.element.style.height = '';
        fx.element.style.right = '';
        fx.element.style.bottom = '';
        controlsElem.hidden = false;
    }, (hero.attack2.length * 100) + (fx.fxSuper.length * 100))
}

const enemyAttack = (enemy) => {
    controlsElem.hidden = true;
    let distance;
    let heroBlockTimeout;
    let heroIdleTimeout;
    let fxTimeout;
    let fxEndTimeout;
    let walkTime;

    if (enemy.element.classList.contains('undead')) {
        distance = 300;
        heroBlockTimeout = 0;
        heroIdleTimeout = 800;
        fxTimeout = 200;
        fxEndTimeout = 300;
        walkTime = 1000;
    } else {
        distance = 340;
        heroBlockTimeout = 300;
        heroIdleTimeout = 1000;
        fxTimeout = 400;
        fxEndTimeout = 550;
        walkTime = 1000;
    }

    animation(enemy.run, enemy, 60, 'repeat');

    enemy.element.style.transition = `all ${walkTime}ms linear`
    enemy.element.style.right = distance + 'px';
    enemy.element.style.zIndex = '2';
    playAudio(sound.run)
    playAudioRepeat(400, walkTime, sound.run)

    setTimeout(e => {
        enemy.element.style.transition = `none`
        animation(enemy.attack, enemy, 100);

        setTimeout(e => {
            animation(hero.block, hero, 100);
        }, heroBlockTimeout);

        setTimeout(e => {
            actionPop(`Blocked!`, '#fc4d00')
            fx.element.hidden = false;
            fx.element.style.right = '360' + 'px';
            animation(fx.fx, fx, 100);
        }, fxTimeout)

        if (hero.life > 0) {
            setTimeout(e => {
                animation(hero.idle, hero, 100, 'repeat');
            }, heroIdleTimeout)

        }

        setTimeout(e => {
            fx.element.style.right = '';
            fx.element.hidden = true;
        }, ((fx.fx.length) * 100) + fxEndTimeout);
    }, 1000);


    setTimeout(e => {
        enemy.element.style.right = '';
        enemy.element.style.zIndex = '1';
        animation(enemy.idle, enemy, 200, 'repeat');
        controlsElem.hidden = false;
    }, 1200 + ((enemy.attack.length) * 100));
}

const enemyCounterAttack = (enemy) => {
    controlsElem.hidden = true;
    setTimeout(e => {
        animation(enemy.attack, enemy, 100);
        enemy.element.style.transition = '';

        if (hero.life > 0) {
            setTimeout(e => {
                actionPop(`Got hit!`, '#ff0000')
                animation(hero.block, hero, 100);
                playAudio(sound.attack)
            }, 300)
        }
    }, 1200);


    if (hero.life > 0) {
        setTimeout(() => {
            hero.element.style.transition = '';
            hero.element.style.left = '';
            animation(hero.idle, hero, 200, 'repeat');
            controlsElem.hidden = false;
        }, 1700 + hero.block.length * 100);
    }

    setTimeout(e => {
        animation(enemy.idle, enemy, 200, 'repeat');
    }, 1000 + ((enemy.attack.length) * 200));
}

const undeadSuperAttack = () => {
    controlsElem.hidden = true;
    setTimeout(() => {
        controlsElem.hidden = true;
        animation(undead.attack2, undead, 100);
    }, 300)

    setTimeout(() => {
        animation(undead.idle, undead, 100, 'repeat');
    }, undead.attack2.length * 100)

    setTimeout(() => {
        fx.element.hidden = false
        fx.element.style.width = 72 + 'px';
        fx.element.style.height = 72 + 'px';
        fx.element.style.left = 9 + 'px';
        fx.element.style.bottom = 55 + 'px';
        fx.element.style.zIndex = '1';
        actionPop(`Enemy's super attack!`, '#12212c');
        animation(fx.fxSuperUndead, fx, 100);

        setTimeout(() => {
            fx.element.style.width = '';
            fx.element.style.height = '';
            fx.element.style.left = '';
            fx.element.style.bottom = '';
            fx.element.style.zIndex = '';
            fx.element.hidden = true
            controlsElem.hidden = false;
        }, fx.fxSuperUndead.length * 100);
    }, 500)

    setTimeout(() => {
        animation(hero.block, hero, 200);
    }, 800)
    setTimeout(() => {
        animation(hero.idle, hero, 200, 'repeat');
    }, 800 + hero.block.length * 200)
}

const actionPop = (text, color) => {
    action.classList.add('visibility');
    action.innerText = `${text}`;
    action.style.color = `${color}`
    action.style.top = 70 + 'px';
    action.style.opacity = '100%';

    setTimeout(() => {
        action.style.opacity = '0';
        action.style.top = 50 + 'px';
    }, 800)

    setTimeout(() => {
        action.innerText = ``;
        action.style.color = ``
        action.style.top = '';
        action.style.opacity = '';
        action.classList.remove('visibility');
    }, 1500)
}

const checkStats = (allEnemies, undeadAttack = 'no') => {
    console.log('checkStats')
    const summonRandom = (list) => {
        return list[Math.floor((Math.random() * list.length))];
    }

    controlsElem.hidden = true;
    if (currentEnemy.life <= 0) {

            setTimeout(() => {
                animation(currentEnemy.die, currentEnemy, 100);
            }, (currentEnemy.hit.length * 100) + 1500);


            setTimeout(() => {
                killedEnemies++;
                if (currentEnemy === slime) {
                    curScore += 100;
                } else if (currentEnemy === skeleton) {
                    curScore += 200;
                } else {
                    curScore += 500;
                }

                currentScore.innerText = `CURRENT SCORE: ${curScore}`;
                enemiesKilled.innerText = `ENEMIES KILLED: ${killedEnemies}`;

                field.removeChild(currentEnemy.element)
                currentEnemy = null;
                if (curScore >= 1000) {
                    heroWalkVictory();
                    setTimeout(() => {
                        clearScene('victory');
                    }, 1800);
                } else {
                    let summon = summonRandom(allEnemies);
                    summon();

                    setTimeout(() => {
                        watchLifeBarEnemy(currentEnemy.originalLife, currentEnemy);
                    }, 1000)
                }

            }, (currentEnemy.hit.length * 100) + 1500 + (currentEnemy.die.length * 100));
    }


    if (hero.life <= 0) {
        if (undeadAttack === 'undead') {
            setTimeout(() => {
                animation(hero.die, hero, 100);
                clearScene();
            }, 3500)
        } else {
            setTimeout(() => {
                animation(hero.die, hero, 100);
                clearScene();
            }, (hero.block.length * 100) + 1100)
        }
    }
}

const createBarIcon = (png, type, iconType) => {
    const icon = document.createElement('div');
    if (iconType === 'shield') {
        icon.classList.add('shield');
    } else if (iconType === 'bless') {
        icon.classList.add('bless');
    } else {
        icon.classList.add('heart');
    }
    if (type === 'hero') {
        icon.style.backgroundImage = `url("../assets/bar/${png}.png")`;
    } else {
        icon.style.backgroundImage = `url("../assets/bar/${png}-enemy.png")`;
    }
    return icon;
}


const watchHeroBar = (originalStat, type, source, target) => {
    const hit = document.getElementById('hit');
    target.replaceChildren();
    if (source < originalStat && source > 0) {
        for (let i = 0; i < source; i++) {
            target.append(createBarIcon(`${type}-full`, 'hero', type));
        }

        for (let i = 0; i < originalStat - source; i++) {
            target.append(createBarIcon(`${type}-empty`, 'hero', type));
        }
    } else if (source <= 0) {
        for (let i = 0; i < originalStat; i++) {
            target.append(createBarIcon(`${type}-empty`, 'hero', type));
        }
    } else {
        for (let i = 0; i < source; i++) {
            target.append(createBarIcon(`${type}-full`, 'hero', type));
        }
    }
    if (hero.superStack === 3) {
        hit.style.backgroundImage = 'url("../assets/bar/bow-button.png")';
    } else {
        hit.style.backgroundImage = 'url("../assets/bar/attack-button.png")';
    }
}
const watchLifeBarEnemy = (originalEnemyLife, enemy) => {
    enemyLife.replaceChildren();
    if (enemy.life < originalEnemyLife && enemy.life > 0) {
        for (let i = 0; i < originalEnemyLife - enemy.life; i++) {
            enemyLife.append(createBarIcon('heart-empty', 'enemy', 'heart'));
        }

        for (let i = 0; i < enemy.life; i++) {
            enemyLife.append(createBarIcon('heart-full', 'enemy', 'heart'));
        }

    } else if (enemy.life <= 0) {
        for (let i = 0; i < originalEnemyLife; i++) {
            enemyLife.append(createBarIcon('heart-empty', 'enemy', 'heart'));
        }
    } else {
        for (let i = 0; i < enemy.life; i++) {
            enemyLife.append(createBarIcon('heart-full', 'enemy', 'heart'));
        }
    }
}

const clearScene = (victory = 'no') => {
    console.log('clearScene')
    overlay.hidden = false;
    overlay.classList.add('is-visible');

    if (victory === 'no') {
        gameOver.innerText = 'GAME OVER!'
    } else {
        gameOver.innerText = 'VICTORY!'
    }

    console.log(prevScore, curScore);
    prevScore = curScore;
    previousScore.innerText = `PREVIOUS SCORE: ${prevScore}`;

    curScore = 0;
    killedEnemies = 0;

    currentScore.innerText = `CURRENT SCORE: ${curScore}`;
    enemiesKilled.innerText = `ENEMIES KILLED: ${killedEnemies}`;

    overlay.addEventListener('click', () => {
        overlay.classList.remove('is-visible');
        overlay.hidden = true;
        endlessScene();
    });
}

const endlessScene = () => {
    console.log('endlessScene')
    playAudio(sound.bg);
    setInterval(() => {
        playAudio(sound.bg);
    }, 89000);

    hit = document.getElementById('hit');
    block = document.getElementById('block')

    field.removeChild(hero.element);

    if (main.querySelector('.controls')) {
        main.removeChild(main.querySelector('.controls'))
    }
    const controls = summonControls();
    main.append(controls);

    summonHero();


    const enemies = [summonSlime, summonSkeleton, summonUndead];
    const originalHeroLife = hero.life;
    const originalHeroShield = hero.originalShield;

    const willEnemyHit = () => {
        let probability = Math.random();
        return probability < 0.5;
    }

    heroLife.replaceChildren();
    heroShield.replaceChildren();
    heroBless.replaceChildren();

    for (let i = 0; i < hero.life; i++) {
        heroLife.append(createBarIcon('heart-full', 'hero', 'heart'));
    }
    for (let i = 0; i < hero.originalShield; i++) {
        heroShield.append(createBarIcon('shield-full', 'hero', 'shield'));
    }
    for (let i = 0; i < 3; i++) {
        heroBless.append(createBarIcon('bless-empty', 'hero', 'bless'));
    }


    animation(hero.idle, hero, 200, 'repeat');

    if (currentEnemy !== null) {
        field.removeChild(currentEnemy.element);
    }

    summonSlime();

    enemyLife.replaceChildren();

    for (let i = 0; i < currentEnemy.life; i++) {
        enemyLife.append(createBarIcon('heart-full', 'enemy', 'heart'));
    }

    const turn = () => {
        controls.addEventListener('click', e => {
            console.log('aa');
            const target = e.target
            const enemyHit = willEnemyHit();
            let undeadAttack = false;

            if (target.classList.contains('hit')) {
                if (hero.superStack === 3) {
                    heroSuperAttack(currentEnemy);
                    currentEnemy.life -= 2;
                    setTimeout(() => {
                        watchLifeBarEnemy(currentEnemy.originalLife, currentEnemy)
                    }, 1500)
                    if (hero.life < 4) {
                        hero.life++;
                    }
                    if (hero.shield <= 1) {
                        hero.shield += 2;
                        watchHeroBar(originalHeroShield, 'shield', hero.shield, heroShield);
                    } else if (hero.shield === 2) {
                        hero.shield++;
                        watchHeroBar(originalHeroShield, 'shield', hero.shield, heroShield);
                    }
                    watchHeroBar(originalHeroLife, 'heart', hero.life, heroLife);
                    hero.superStack = 0;
                    watchHeroBar(3, 'bless', hero.superStack, heroBless);
                } else {
                    heroWalk();
                    if (enemyHit === false) {
                        heroAttack(currentEnemy);
                        currentEnemy.life -= 1;
                        setTimeout(() => {
                            watchLifeBarEnemy(currentEnemy.originalLife, currentEnemy)
                            if (hero.shield < hero.originalShield) {
                                hero.shield++;
                                watchHeroBar(originalHeroShield, 'shield', hero.shield, heroShield);
                            }
                            hero.superStack++
                            watchHeroBar(3, 'bless', hero.superStack, heroBless);
                        }, 1500)
                    } else {
                        if (currentEnemy === undead) {
                            if (currentEnemy.superStack < 3) {
                                hero.life -= 1;
                                setTimeout(() => {
                                    watchHeroBar(originalHeroLife, 'heart', hero.life, heroLife);
                                }, 1500);
                                enemyCounterAttack(currentEnemy);
                                currentEnemy.superStack++;
                            } else if (currentEnemy.superStack === 3) {
                                currentEnemy.superStack = 0;
                                enemyCounterAttack(currentEnemy);
                                setTimeout(() => {
                                    undeadSuperAttack();
                                }, 1700)
                                hero.life -= 2;
                                undeadAttack = true;
                                setTimeout(() => {
                                    watchHeroBar(originalHeroLife, 'heart', hero.life, heroLife);
                                }, 3000);

                            }

                        } else {
                            hero.life -= 1;
                            setTimeout(() => {
                                watchHeroBar(originalHeroLife, 'heart', hero.life, heroLife);
                            }, 1500);
                            enemyCounterAttack(currentEnemy);
                        }
                    }
                }

                if (undeadAttack) {
                    checkStats(enemies, 'undead');
                } else {
                    checkStats(enemies);
                }
            } else if (target.classList.contains('block')) {
                if (hero.shield > 0) {
                    if (enemyHit === true) {
                        enemyAttack(currentEnemy);
                        setTimeout(() => {
                            playAudio(playAudio(sound.block))
                        }, 1300)
                        setTimeout(() => {
                            if (hero.life < 4) {
                                hero.life++;
                            }
                            if (hero.shield > 0) {
                                hero.shield--;
                            }
                            watchHeroBar(originalHeroLife, 'heart', hero.life, heroLife);
                            watchHeroBar(originalHeroShield, 'shield', hero.shield, heroShield);
                        }, 1500)
                } else {
                        animation(hero.block, hero, 100);
                        playAudio(playAudio(sound.block))
                        setTimeout(() => {

                            if (hero.shield > 0) {
                                hero.shield--;
                                actionPop(`Wasted shield!`, '#3e413b')
                            }
                            watchHeroBar(originalHeroShield, 'shield', hero.shield, heroShield);
                            animation(hero.idle, hero, 200, 'repeat')
                        }, hero.block.length * 100)
                    }
                } else {
                    actionPop('You don\'t have any shields', '#252424');
                }
            }

            console.log(hero.life, currentEnemy.life);
        })


    }

    turn();

}

play.addEventListener('click', e => {
    main.hidden = false;
    play.hidden = true;
    rules.classList.add('is-visible')
    endlessScene();

    previousScore.innerText = `PREVIOUS SCORE: ${prevScore}`;
    currentScore.innerText = `CURRENT SCORE: ${curScore}`;
    enemiesKilled.innerText = `ENEMIES KILLED: ${killedEnemies}`;

    restart.addEventListener('click', () => {
        clearScene();
    })
})






