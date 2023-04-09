import React, {useEffect, useState} from 'react';
import cl from './TouchTypingTrainer.module.css';
import useKeyPress from "../../hooks/useKeyPress";
import ModalWindow from "../ui/modal_window/ModalWindow";
import {getFormattedTimeString} from "../../utils/time";

function TouchTypingTrainer({lessonText, maxTime}) {
    // Lesson states
    const [isLessonActive, setIsLessonActive] = useState(false);
    const [isShowResult, setIsShowResult] = useState(false);
    // Chars
    const [leftPadding, setLeftPadding] = useState(
        new Array(40).fill( "\u00A0").join('')
    );
    const [outgoingChars, setOutgoingChars] = useState('');
    const [currentChar, setCurrentChar] = useState(lessonText.charAt(0));
    const [incomingChars, setIncomingChars] = useState(lessonText.substring(1));
    const [typedCharsCount, setTypedCharsCount] = useState(0)
    // Timer
    const [passedTime, setPassedTime] = useState(0);
    // Statistic
    const [wordCount, setWordCount] = useState(0);
    const [cpm, setCpm] = useState(0);
    const [errorCount, setErrorCount] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    const handleLessonFinish = () => {
        setIsLessonActive(false);
        setCpm(Math.floor(typedCharsCount / (passedTime / 60)));
        let accuracy = Math.floor(outgoingChars.length * 100 / typedCharsCount) ?? 0;
        setAccuracy(isNaN(accuracy) ? 0 : accuracy);
        setIsShowResult(true);
    }

    const handleLessonRestart = () => {
        setIsShowResult(false);
        setOutgoingChars('');
        setIncomingChars(lessonText.substring(1));
        setCurrentChar(lessonText.charAt(0));
        setTypedCharsCount(0);
        setPassedTime(0);
        setWordCount(0);
        setCpm(0);
        setErrorCount(0);
        setAccuracy(0);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            isLessonActive && setPassedTime((passedTime) => passedTime + 1);
        }, 1000);
        if (maxTime !== -1 && passedTime >= maxTime) handleLessonFinish();
        return () => {
            clearInterval(interval);
        }
    }, [isLessonActive, passedTime]);

    useKeyPress(key => {
        if (isShowResult) return;

        if (isLessonActive) {
            if (key === 'Escape') {
                handleLessonFinish();
                return;
            }

            let updatedOutgoingChars = outgoingChars;
            let updatedIncomingChars = incomingChars;
            let updatedTypedCharsCount = typedCharsCount + 1;

            if (key === currentChar) {
                if (leftPadding > 0) setLeftPadding(leftPadding.substring(1));

                updatedOutgoingChars += currentChar;
                setOutgoingChars(updatedOutgoingChars);

                if (updatedIncomingChars.length === 0) handleLessonFinish();

                setCurrentChar(incomingChars.charAt(0));

                if (incomingChars.charAt(0) === ' ' || incomingChars.length === 0) setWordCount(wordCount + 1);

                updatedIncomingChars = incomingChars.substring(1);
                setIncomingChars(updatedIncomingChars);
            } else {
                setErrorCount(errorCount + 1);
            }

            setTypedCharsCount(updatedTypedCharsCount);
        } else {
            if (key === ' ') setIsLessonActive(true);
        }
    });

    return (
        <div>
            <ModalWindow visible={isShowResult}>
                Results
                <hr width={"100%"}/>
                <span>Time: {getFormattedTimeString(passedTime)}</span>
                <br/>
                <span>Word's count: {wordCount}</span>
                <br/>
                <span>Errors: {errorCount}</span>
                <br/>
                <span>CPM: {cpm}</span>
                <br/>
                <span>Accuracy: {accuracy}%</span>
                <br/>
                <button onClick={handleLessonRestart}>Restart</button>
            </ModalWindow>
            <div className={cl.textField}>
                {isLessonActive
                    ?
                    <>
                        <div className={cl.timer}>
                            {getFormattedTimeString(passedTime)}
                        </div>
                        <p className={cl.chars}>
                        <span className={cl.charsOut}>
                            {(leftPadding + outgoingChars).slice(-39)}
                        </span>
                            <span className={cl.currChar}>{currentChar}</span>
                            <span
                                className={cl.charsIn}>{incomingChars.substring(0, 40)}</span>
                        </p>
                    </>
                    : <span>Press SPACE to start</span>}
            </div>
        </div>
    );
}

export default TouchTypingTrainer;