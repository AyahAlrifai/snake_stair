import './index.css';
import Row from './Row.js';
import React, { useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { dimentionsContext } from './index.js';

const Table = (props) => {
    let arr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    let [diceValue, setDiceValue] = useState([0]);
    let [p1State, setP1State] = useState(0);
    let [p2State, setP2State] = useState(0);
    let [p1PerviousState, setP1PerviousState] = useState(0);
    let [p2PerviousState, setP2PerviousState] = useState(0);
    let [player, setPlayer] = useState(-1);
    let p1Circle = useRef();
    let p2Circle = useRef();
    let btn = useRef();
    let dice = useRef();
    let logo = useRef();
    const dimentions = useContext(dimentionsContext);

    useEffect(() => {
        if (diceValue !== 0) {
            if (player === 0) {
                setPlayer(1);
                setP2PerviousState(p2State);
                setP2State(p2State + diceValue[0]);
            } else {
                setPlayer(0);
                setP1PerviousState(p1State);
                setP1State(p1State + diceValue[0]);
            }
        }
    }, [diceValue]);

    useEffect(() => {
        if (p1State > 0 && p1State <= 100 && p1Circle !== undefined) {
            let i = p1PerviousState + 1;
            if(i<=0 || i>100) {
                return;
            }
            const frame1 = () => {
                let left = +p1Circle.current.style.left.split("px")[0];
                let top = +p1Circle.current.style.top.split("px")[0];
                if (i>0 && i<=100 && dimentions[i] != undefined && left === dimentions[i][0] && top === dimentions[i][1]) {
                    i++;
                } else if (left === dimentions[p1State][0] && top === dimentions[p1State][1]) {
                    let isSnake = checkIfSnake(p1State);
                    if (isSnake !== -1) {
                        upDown(p1Circle, setP1State, p1State, isSnake);
                    }

                    let isStaircase = checkIfStaircasee(p1State);
                    if (isStaircase !== -1) {
                        upDown(p1Circle, setP1State, p1State, isStaircase);
                    }
                   
                    if(p1State+diceValue[0]>100) {
                        setTimeout(()=>{
                            btn.current.style.display = "flex";
                            dice.current.style.display = "none";
                        },1000)
                    } else {
                        btn.current.style.display = "flex";
                        dice.current.style.display = "none";
                    }

                    if (p1State === 100) {
                        showLogo();
                    }

                    clearInterval(id);
                } else {
                    if (dimentions[i][0] >= left) {
                        if (dimentions[i][0] - left < 10) {
                            p1Circle.current.style.left = left + (dimentions[i][0] - left) + "px";
                        } else {
                            p1Circle.current.style.left = (left + 10) + "px";
                        }
                    } else {
                        if (left - dimentions[i][0] < 10) {
                            p1Circle.current.style.left = dimentions[i][0] + "px";
                        } else {
                            p1Circle.current.style.left = (left - 10) + "px";
                        }
                    }

                    if (top - dimentions[i][1] < 5 && dimentions[i][1] !== top) {
                        p1Circle.current.style.top = dimentions[i][1] + "px";
                    } else if (top - dimentions[i][1] >= 5) {
                        p1Circle.current.style.top = (top - 5) + "px";
                    }
                }
            }
            let id = setInterval(frame1, 50);
        } else if (p1State > 100) {
            setP1State(p1PerviousState);
        }
    }, [p1State]);

    useEffect(() => {
        if (p2State > 0 && p2State <= 100 && p2Circle !== undefined) {
            let i = p2PerviousState + 1;
            if(i<=0 || i>100) {
                return;
            }
            const frame2 = () => {
                let left = +p2Circle.current.style.left.split("px")[0];
                let top = +p2Circle.current.style.top.split("px")[0];
                if (i>0 && i<=100 && left === dimentions[i][0] && top === dimentions[i][1]) {
                    i++;
                } else if (left === dimentions[p2State][0] && top === dimentions[p2State][1]) {

                    let isSnake = checkIfSnake(p2State);
                    if (isSnake !== -1) {
                        upDown(p2Circle, setP2State, p2State, isSnake);
                    }

                    let isStaircase = checkIfStaircasee(p2State);
                    if (isStaircase !== -1) {
                        upDown(p2Circle, setP2State, p2State, isStaircase);
                    }

                    if(p2State+diceValue[0]>100) {
                        setTimeout(()=>{
                            btn.current.style.display = "flex";
                            dice.current.style.display = "none";
                        },1000)
                    } else {
                        btn.current.style.display = "flex";
                        dice.current.style.display = "none";
                    }

                    if (p2State === 100) {
                        showLogo();
                    }

                    clearInterval(id);
                } else {
                    if (dimentions[i][0] >= left) {
                        if (dimentions[i][0] - left < 10) {
                            p2Circle.current.style.left = left + (dimentions[i][0] - left) + "px";
                        } else {
                            p2Circle.current.style.left = (left + 10) + "px";
                        }
                    } else {
                        if (left - dimentions[i][0] < 10) {
                            p2Circle.current.style.left = dimentions[i][0] + "px";
                        } else {
                            p2Circle.current.style.left = (left - 10) + "px";
                        }
                    }

                    if (top - dimentions[i][1] < 5 && dimentions[i][1] !== top) {
                        p2Circle.current.style.top = dimentions[i][1] + "px";
                    } else if (top - dimentions[i][1] >= 5) {
                        p2Circle.current.style.top = (top - 5) + "px";
                    }
                }
            }
            let id = setInterval(frame2, 50);
        } else if (p2State > 100) {
            setP2State(p2PerviousState)
        }
    }, [p2State]);

    const checkIfSnake = (position) => {
        let data = props.data.down;
        for (let i = 0; i < data.length; i++) {
            if (Math.max(data[i][0], data[i][1]) === position) {
                return Math.min(data[i][0], data[i][1])
            }
        }
        return -1;
    }

    const checkIfStaircasee = (position) => {
        let data = props.data.up;
        for (let i = 0; i < data.length; i++) {
            if (Math.min(data[i][0], data[i][1]) === position) {
                return Math.max(data[i][0], data[i][1])
            }
        }
        return -1;
    }

    const rollDice = (count, rand) => {
        btn.current.style.display = "none";
        dice.current.style.display = "flex";
        if (count === 0) {
            setDiceValue([rand])
            //setDiceValue([100])
            return;
        }

        setTimeout(() => {
            rand = parseInt((Math.random() * 10) % 6 + 1);
            let image = "./img/" + rand + ".png";
            dice.current.innerHTML = `<img src=${image} class='roll' />`;
            rollDice(count - 1, rand);
        }, 50)
    }

    const resetGame = () => {
        setPlayer(-1);
        setDiceValue([0]);
        setP2PerviousState(0);
        setP1PerviousState(0);
        setP1State(0);
        setP2State(0);
        p1Circle.current.style.top = (Math.min(window.screen.width, window.screen.height) - (Math.min(window.screen.width, window.screen.height) / 14)) + "px";
        p1Circle.current.style.left = "0px";
        p2Circle.current.style.top = (Math.min(window.screen.width, window.screen.height) - (Math.min(window.screen.width, window.screen.height) / 14)) + "px";
        p2Circle.current.style.left = "0px";
    }

    const showLogo = () => {
        btn.current.style.display = "none";
        dice.current.style.display = "none";
        logo.current.style.display = "flex";

        setTimeout(() => {
            resetGame();
            btn.current.style.display = "flex";
            dice.current.style.display = "none";
            logo.current.style.display = "none";
        }, 4000)
    }

    const upDown = (pCircle, setPState, from, to) => {
        let x = Math.abs(dimentions[from][0] - dimentions[to][0]) / 10;
        let y = Math.abs(dimentions[from][1] - dimentions[to][1]) / 10;
        const frame = () => {
            let left = +pCircle.current.style.left.split("px")[0];
            let top = +pCircle.current.style.top.split("px")[0];
            if (left === dimentions[to][0] && top === dimentions[to][1]) {
                setPState(to);
                clearInterval(id);
            } else {
                if (dimentions[from][0] > dimentions[to][0]) { // /
                    pCircle.current.style.left = left - x + "px";
                } else { // \
                    pCircle.current.style.left = left + x + "px";
                }

                if (dimentions[from][1] > dimentions[to][1]) { // /
                    pCircle.current.style.top = top - y + "px";
                } else { // \
                    pCircle.current.style.top = top + y + "px";
                }

            }
        }
        let id = setInterval(frame, 50);
    }

    return <>
        <div className='player player1' style={{ left: "0px", top: Math.min(window.screen.width, window.screen.height) - (Math.min(window.screen.width, window.screen.height) / 14) }} ref={p1Circle}></div>
        <div className='player player2' style={{ left: "0px", top: Math.min(window.screen.width, window.screen.height) - (Math.min(window.screen.width, window.screen.height) / 14) }} ref={p2Circle}></div>
        <div className='dice' ref={btn}><input className='roll' type="submit" value="roll" onClick={() => { rollDice(20, 0) }} /></div>
        <div className='dice' ref={dice} style={{ display: "none" }}></div>
        <div className='logo' ref={logo} style={{ display: "none" }} ><img className='logoImg' src="./img/logo.png" /></div>
        {
            arr.map((value) => {
                return <Row key={"row" + value} start={value} />
            })
        }
    </>
}

export default Table;


