import { useState, useEffect, useCallback } from 'react';

export type TestPhase = 'idle' | 'ping' | 'download' | 'upload' | 'complete';

export const useTestProgress = (isLoading: boolean) => {
    const [testPhase, setTestPhase] = useState<TestPhase>('idle');
    const [progress, setProgress] = useState(0);

    // Animated progress bar
    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) return 100;
                    return prev + Math.random() * 15;
                });
            }, 200);
            return () => clearInterval(interval);
        } else {
            setProgress(0);
        }
    }, [isLoading]);

    const resetProgress = useCallback(() => {
        setProgress(0);
        setTestPhase('idle');
    }, []);

    const startTest = useCallback(() => {
        setTestPhase('ping');
        setProgress(0);
    }, []);

    const completeTest = useCallback(() => {
        setTestPhase('complete');
    }, []);

    const getPhaseText = useCallback(() => {
        switch (testPhase) {
            case 'ping': return 'Measuring Ping...';
            case 'download': return 'Testing Download Speed...';
            case 'upload': return 'Testing Upload Speed...';
            case 'complete': return 'Test Complete!';
            default: return 'Ready to Test';
        }
    }, [testPhase]);

    return {
        testPhase,
        progress,
        resetProgress,
        startTest,
        completeTest,
        getPhaseText
    };
}; 