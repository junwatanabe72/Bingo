//ベースの空配列
const arr=[]
//１から９９までのランダムな数値配列を作成。
function randomArray(ar) {
    for (let i = 0; i < 25; i++){
        checkedNumber(ar,i)
    }
    return ar
}
//数値被りを防ぐ関数
function checkedNumber(ar,num){
   const varNum = Math.floor((Math.random() * 99) + 1)
    if(ar.includes(varNum)){
        checkedNumber(ar,num)
    }else{
        ar[num] = varNum
    }
}
//ビンゴの基礎配列
const baseAr2 = randomArray(arr)


//スピンボタン押した後、ストップボタンを押すまでの挙動を制御
let spin =true
//ビンゴゲームで出てくる数値を決める配列
const Bar = [...baseAr2]
//勝敗確認用のビンゴの盤面をコピーした配列
const br=[];

//描画用
window.addEventListener('load', createDefaultPositions)
// const showCalender = document.getElementById(');
const tbodyElement = document.querySelector('.js-join')
const stopButtonElement = document.querySelector('.stop-button')
const sbinButtonElement = document.querySelector('.sbin-button')
const number1Element = document.querySelector('.number1')
const number2Element = document.querySelector('.number2')
const resetElement = document.querySelector('.reset-button')
    


//デフォルトの配置を決めて描画する関数
function createDefaultPositions(){
    const cells = createCells(baseAr2)
tbodyElement.insertAdjacentHTML('beforeend',cells)
}

//defaultの配置を決める関数
function createCells(argAr) {
    let cellsHtml = ''
    let count = 0
    for (let w = 0; w < 5; w++) {
        cellsHtml += '<tr>'
        for (let d = 0; d < 5; d++) {
            br.push(argAr[count])
            cellsHtml += `<td class="cell"}">${argAr[count]}</td>`
            count += 1
        }
        cellsHtml += '</tr>'
    }
    return cellsHtml
}

//defaultの数値をシャッフルする関数
function shuffle(s) {
    for (let i = s.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1))
        let tmp = s[i]
        s[i] = s[r]
        s[r] = tmp
    }
    return s
}

//与えられた数値のセルのスタイルを変更する関数
function changedCell(targetNumber){
    const [first, second] = String(this.targetNumber)
    const cellsElement = document.querySelectorAll('.cell')
    for(let i=0; i<cellsElement.length; i++){
        if (Number(cellsElement[i].innerHTML) === this.targetNumber){
            cellsElement[i].classList.remove('cell')
            cellsElement[i].classList.add('selected-cell') 
                if (second === undefined){
                    number1Element.innerHTML = 0
                    number2Element.innerHTML = first
                }else{
                    number1Element.innerHTML = first
                    number2Element.innerHTML = second
                }
                //bingo判定
                if(confirmedBingo(this.targetNumber)){
                    return
                }else{
                    spin = !spin
                    return
            }
        }
    }
}

//ビンゴマシーンの動作を定義する関数
function play(){
    if(spin){
        spin=!spin
        const bingoAr = shuffle(Bar)   //shuffle(Bar)
        stopButtonElement.addEventListener('click', { targetNumber: bingoAr[0], handleEvent: changedCell})
        // console.log(bingoAr)
        // // console.log(Bar)
        // console.log(br)
        // console.log(baseAr2)
        bingoAr.shift()
    }else{
        return 
    }
}
//スピンを開始する
sbinButtonElement.addEventListener('click',play)


//ビンゴ判定関数
function confirmedBingo(mainNumber){
    const targetIndexNumber = br.indexOf(mainNumber)
    br.splice(targetIndexNumber,1,0)
    if(
        (br[0] + br[1] + br[2] + br[3] + br[4]) === 0 ||
        (br[5] + br[6] + br[7] + br[8] + br[9]) === 0 ||
        (br[10] + br[11] + br[12] + br[13] + br[14]) === 0 ||
        (br[15] + br[16] + br[17] + br[18] + br[19]) === 0 ||
        (br[20] + br[21] + br[22] + br[23] + br[24]) === 0 ||
        (br[0] + br[5] + br[10] + br[15] + br[20]) === 0 ||
        (br[1] + br[6] + br[11] + br[16] + br[21]) === 0 ||
        (br[2] + br[7] + br[12] + br[17] + br[22]) === 0 ||
        (br[3] + br[8] + br[13] + br[18] + br[23]) === 0 ||
        (br[4] + br[9] + br[14] + br[19] + br[24]) === 0 ||
        (br[5] + br[10] + br[15] + br[20] + br[25]) === 0 ||
        (br[0] + br[6] + br[12] + br[18] + br[24]) === 0 ||
        (br[4] + br[8] + br[12] + br[16] + br[20]) === 0)
    {
        stopButtonElement.innerHTML= "BINGO"
        sbinButtonElement.innerHTML = "BINGO"   
        return true
    }
}

resetElement.addEventListener('click', initalize);

function initalize() {
    location.reload()
}
