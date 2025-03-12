import { useState, useEffect, useRef } from 'react';

export default function useTimer(initialSettings) {
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' 或 'break' 或 'longBreak'
  const [timeLeft, setTimeLeft] = useState(initialSettings.focusTime * 60);
  const [settings, setSettings] = useState(initialSettings);
  const [cycles, setCycles] = useState(0);
  
  // 音频引用
  const alarmSound = useRef(null);
  
  // 初始化音频
  useEffect(() => {
    const soundMap = {
      bell: '/sounds/bell.mp3',
      complete: '/sounds/complete.mp3',
      meditation: '/sounds/meditation-bell.mp3'
    };
    
    alarmSound.current = new Audio(soundMap[settings.soundOption]);
    
    return () => {
      if (alarmSound.current) {
        alarmSound.current.pause();
        alarmSound.current = null;
      }
    };
  }, [settings.soundOption]);
  
  // 计时器逻辑
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // 时间到，播放提示音
      if (alarmSound.current) {
        alarmSound.current.play();
      }
      
      // 切换模式
      if (mode === 'focus') {
        const newCycles = cycles + 1;
        setCycles(newCycles);
        
        // 判断是否需要长休息
        if (newCycles % settings.longBreakInterval === 0) {
          setMode('longBreak');
          setTimeLeft(settings.longBreakTime * 60);
        } else {
          setMode('break');
          setTimeLeft(settings.breakTime * 60);
        }
      } else {
        setMode('focus');
        setTimeLeft(settings.focusTime * 60);
      }
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, settings, cycles]);
  
  // 格式化时间显示
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // 计算进度条百分比
  const calculateProgress = () => {
    const totalTime = mode === 'focus' 
      ? settings.focusTime * 60 
      : mode === 'break' 
        ? settings.breakTime * 60 
        : settings.longBreakTime * 60;
    
    return ((totalTime - timeLeft) / totalTime) * 100;
  };
  
  // 处理开始/暂停
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  
  // 重置计时器
  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'focus') {
      setTimeLeft(settings.focusTime * 60);
    } else if (mode === 'break') {
      setTimeLeft(settings.breakTime * 60);
    } else {
      setTimeLeft(settings.longBreakTime * 60);
    }
  };
  
  // 更新设置
  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    
    // 根据当前模式重置时间
    if (mode === 'focus') {
      setTimeLeft(newSettings.focusTime * 60);
    } else if (mode === 'break') {
      setTimeLeft(newSettings.breakTime * 60);
    } else {
      setTimeLeft(newSettings.longBreakTime * 60);
    }
  };
  
  return {
    isRunning,
    mode,
    timeLeft,
    settings,
    cycles,
    formatTime,
    calculateProgress,
    toggleTimer,
    resetTimer,
    updateSettings
  };
}