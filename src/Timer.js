import { useEffect, useRef, useState } from "react"


const Timer = () => {
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [start, setStart] = useState(false);
    const [count, setCount] = useState(100);
    const [mins, setMins] = useState(0);
    const [secs, setSecs] = useState(0);
    const [resume, setResume] = useState(0);
    const timer = useRef();
    
    

    useEffect(() => {
        if(start) {
             timerInterval();
        }
        return () => clearTimeout(timer.current);
    },[start])

    const handleReset = () => {
        clearInterval(timer.current);
        setMin(0);
        setSec(0);
        setMins(0);
        setSecs(0);
        setStart(false);
    }

    const timerInterval = () => {
        timer.current = setInterval(() => {
                
            setSecs(sec => {
                if(sec > 0) {
                   return sec-1;
                } else {
                    setMins(m =>m-1);
                    setSecs(60);
                }
            });
        
        setCount(count => count-1);
        
    },1000);
    }

    const handleStart = () => {
        if(sec > 60) {
            let mins = Math.floor(sec /60);
            let minutes = parseInt(min) + mins;
            let seconds = Math.floor(sec%60);
            setMins(minutes);
            setSecs(seconds);

        } else {
            setMins(parseInt(min));
            setSecs(parseInt(sec));
        }
        
            setStart(true);
            
    }

    const handleResume = () => {
        setResume(resume => resume +1);
        if(resume %2 === 0) {
            clearInterval(timer.current);
        } else {
            timerInterval();
        }
        
    }

    
    return (
        <>
        <div className="timer-display">
            <input type="number" value={min} id="minutes" onChange={e => setMin(e.target.value)}/>
            <label htmlFor="minutes">Minutes</label>
            <input type="number" value={sec} id="seconds" onChange={e => setSec(e.target.value)}/>
            <label htmlFor="seconds">Seconds</label>
        </div>
        <div className="btn-grp">
            <button disabled ={start} onClick={handleStart}>Start</button>
            <button onClick={handleResume}>Resume/Pause</button>
            <button onClick={handleReset}>Reset</button>
        </div>
        <h1 style={{textAlign: 'center'}}>{mins < 10 ? `0${mins}` : mins} :{secs<10 ? `0${secs}`:secs}</h1>
        <h2>{count}</h2>
        </>
    )
}

export default Timer;