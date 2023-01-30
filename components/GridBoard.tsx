import { setUpEverything } from '@/utils';
import { useEffect, useRef } from 'react';

const GridBoard = () => {
    const effectCalled = useRef(false);
    useEffect(() => {
        if (effectCalled.current) return;
        effectCalled.current = true;
        setUpEverything();
    }, []);

    return (
        <>
            <div id="scoreboard">
                <div id="title">2048</div>
                <div className="scoring">
                    <p>Score</p>
                    <div id="score-show">
                        <div id="score">0</div>
                    </div>
                </div>
            </div>
            <div id="gameboard"></div>
        </>
    );
};

export default GridBoard;
