let boxes = document.querySelectorAll('.box')  //কী হচ্ছে? HTML-এর সব .box element একসাথে নেওয়া হচ্ছে।
let turn = 'X'     //একটা variable বানানো হলো। মানে Game শুরু হবে X দিয়ে।
let isGameOver = false    //এটা একটা Boolean Variable। মানে Game এখনও শেষ হয়নি। যদি কেউ জিতে যায় true হয়ে যাবে।
boxes.forEach(ev =>{     //forEach() কী? এটা একে একে সব box-এর উপর কাজ করবে।
    ev.innerHTML = ''    //প্রতিটি Box Empty করে দিচ্ছে। আগে যদি X থাকে তাহলে '' মানে খালি।
    ev.addEventListener('click', () => {   //প্রত্যেক Box-এর উপর Click Event লাগানো হচ্ছে। যখন User Click করবে তখন ভিতরের Code চলবে।
        if(!isGameOver && ev.innerHTML === '') {  //এটা খুব গুরুত্বপূর্ণ। দুইটা Condition Check করছে।প্রথম Condition !isGameOver মানে Game শেষ হয়নি। যদি isGameOver = false হয় তাহলে !false -> true Game চলবে। কিন্তু isGameOver = true হলে false Game আর চলবে না।

                                                //দ্বিতীয় Condition ev.innerHTML === '' মানে এই Box খালি কিনা।যদি '' হয় তাহলে Click করা যাবে। যদি X থাকে আবার Click করলে কিছুই হবে না। দুইটা Condition একসাথে মানে ✔ Game শেষ হয়নি ✔ Box খালি তাহলেই ভিতরের Code চলবে।
            ev.innerHTML = turn   //Box-এর ভিতরে X অথবা O বসে যাবে।
            checkWin()           //Winner হয়েছে কিনা Check করবে।
            checkDraw()            //Draw হয়েছে কিনা Check করবে।
            changeTurn()            //Player Change করবে। যদি X খেলে তাহলে O এর Turn হবে।

        }
    })
})
const changeTurn = () => {       //Arrow Function। এটা Turn Change করার জন্য।
    if(turn === 'X'){               //Condition যদি বর্তমান Player X হয়।
        turn = 'O'                       //Turn Change হয়ে গেল।
        document.querySelector('.bg').style.left = '85px'       //Turn Indicator Move করছে।
    }
    else{
        turn = 'X'   //Else মানে যদি Turn O হয়। turn = 'X' আবার X এর Turn।
        document.querySelector('.bg').style.left = '0px'
    }
}
const checkWin = () => {        //কী হচ্ছে? একটি Arrow Function তৈরি করা হয়েছে। এর কাজ হলো: প্রতি move-এর পর Winner আছে কিনা Check করা।
    let winConditions = [       //এখানে একটি Array তৈরি করা হয়েছে। এর মধ্যে সব Winning Pattern রাখা হয়েছে।
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for(let i = 0; i < winConditions.length; i++) {      //কী হচ্ছে? সব Winning Pattern একে একে Check করবে।
    let play1 = boxes[winConditions[i][0]].innerHTML
    let play2 = boxes[winConditions[i][1]].innerHTML
    let play3 = boxes[winConditions[i][2]].innerHTML
    if(play1 != '' && play1 === play2 && play1 === play3){      //এটাই পুরো Game-এর সবচেয়ে গুরুত্বপূর্ণ Condition।
        isGameOver = true  //Game শেষ। এখন আর কেউ Click করতে পারবে না।
        document.querySelector('#results').innerHTML = `Player ${turn} wins! 🎉`  //Screen-এ দেখাবে Player X Win অথবা Player O Win
        document.querySelector('#btn').style.display = 'inline-block'   //Hidden Button দেখা যাবে।

        for(let j = 0; j < 3; j++) {            //এখানে তিনটা Winning Box-এ Color দিবে।
            boxes[winConditions[i][j]].style.backgroundColor = '#9B7EBD'
            boxes[winConditions[i][j]].style.color = '#000'
        }
  }
 }
}
const checkDraw = () => {       //Draw হয়েছে কিনা Check করবে।
    if(!isGameOver){         //যদি Winner না থাকে তবেই Draw Check করবে। কারণ Winner থাকলে Draw হওয়ার প্রশ্নই আসে না।
    let isDraw = true;       //শুরুতে ধরে নিল Draw হয়েছে।
    boxes.forEach(ev => {       //এরপর সব Box Check করবে।
        if(ev.innerHTML === '') isDraw = false;    //যদি কোনো Box Empty থাকে তাহলে isDraw = false মানে Game এখনও শেষ হয়নি।
    })
    if(isDraw){      //মানে Draw হয়েছে।
        isGameOver = true;          //Game বন্ধ।
        document.querySelector('#results').innerHTML = "It's a Draw!"  //Output: It's Draw
        document.querySelector('#btn').style.display = 'inline-block'    //Play Again Button Show করবে।

    }
}
}
document.querySelector('#btn').addEventListener('click', () => {       //Button Click করলে নিচের Code চলবে।
    isGameOver = false         //আবার Game শুরু।
    turn = 'X'
    document.querySelector('.bg').style.left = '0'
    document.querySelector('#results').innerHTML = ''        //Winner Message মুছে যাবে।
    document.querySelector('#btn').style.display = 'none'    //Button আবার Hide হবে।

    boxes.forEach(ev => {           //সব Box Reset হবে।
        ev.innerHTML = ''           //সব Box Empty।
        ev.style.removeProperty('background-color')   //Winner-এর Purple Background Remove করবে।
        ev.style.color = '#fff'    //Text আবার White হবে।


    })

})
