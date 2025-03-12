// 在 useTimer 钩子中添加通知功能

import { useState, useEffect, useRef } from 'react';

export default function useTimer(initialSettings, onSessionComplete) {
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' 或 'break' 或 'longBreak'
  const [timeLeft, setTimeLeft] = useState(initialSettings.focusTime * 60);
  const [settings, setSettings] = useState({
    ...initialSettings,
    soundOption: initialSettings.soundOption || 'bell' // 确保有默认值
  });
  const [cycles, setCycles] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  
  // 音频引用
  const alarmSound = useRef(null);
  
  // 添加通知权限请求
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
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
  
  // 记录会话开始时间
  useEffect(() => {
    if (isRunning && mode === 'focus' && !sessionStartTime) {
      setSessionStartTime(new Date());
    }
  }, [isRunning, mode, sessionStartTime]);
  
  // 请求通知权限
  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        setNotificationsEnabled(true);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          setNotificationsEnabled(permission === 'granted');
        });
      }
    }
  }, []);
  
  // 计时器逻辑 - 合并了两个重复的useEffect
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        
        // 如果是专注模式，增加专注时间计数
        if (mode === 'focus') {
          setTotalFocusTime(prev => prev + 1/60); // 转换为分钟
        }
        
        // 当剩余时间为30秒时发出提示音
        if (timeLeft === 30) {
          // 播放轻微提示音
          const reminderSound = new Audio('/sounds/reminder.mp3');
          reminderSound.volume = settings.volume || 0.5;
          reminderSound.play();
        }
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // 时间到，播放提示音
      if (alarmSound.current) {
        alarmSound.current.volume = settings.volume || 1.0;
        alarmSound.current.play();
      }
      
      // 发送通知
      if (notificationsEnabled) {
        const title = mode === 'focus' 
          ? '专注时间结束！' 
          : mode === 'break' 
            ? '休息时间结束！' 
            : '长休息时间结束！';
            
        const body = mode === 'focus' 
          ? '休息一下吧！' 
          : '准备开始新的专注时间';
          
        new Notification(title, { 
          body,
          icon: '/favicon.ico'
        });
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
        // 如果从休息模式切换到专注模式，记录一个完整的周期
        if (onSessionComplete && sessionStartTime) {
          const sessionRecord = {
            focusTime: Math.round(totalFocusTime),
            cycles: cycles,
            mode: mode,
            duration: Math.round((new Date() - sessionStartTime) / 1000 / 60) // 转换为分钟
          };
          onSessionComplete(sessionRecord);
          setSessionStartTime(null);
          setTotalFocusTime(0);
        }
        
        setMode('focus');
        setTimeLeft(settings.focusTime * 60);
      }
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, cycles, settings, notificationsEnabled, onSessionComplete, sessionStartTime, totalFocusTime]);
  
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
    // 停止计时器
    setIsRunning(false);
    
    // 重置模式为专注模式
    setMode('focus');
    
    // 重置时间为当前模式的设定时间
    setTimeLeft(settings.focusTime * 60);
    
    // 重置会话开始时间
    setSessionStartTime(null);
    
    // 重置专注时间计数
    setTotalFocusTime(0);
    
    // 如果当前不是专注模式，不重置周期计数
    // 如果是专注模式，且已经开始计时（有会话开始时间），则记录当前会话
    if (mode === 'focus' && sessionStartTime && totalFocusTime > 0) {
      // 记录未完成的会话
      if (onSessionComplete) {
        onSessionComplete({
          focusTime: Math.round(totalFocusTime),
          cycles: cycles,
          mode: mode,
          completed: false,
          startTime: sessionStartTime,
          endTime: new Date()
        });
      }
    }
  };

  // 更新设置
  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    
    // 如果计时器没有运行，根据当前模式更新剩余时间
    if (!isRunning) {
      if (mode === 'focus') {
        setTimeLeft(newSettings.focusTime * 60);
      } else if (mode === 'break') {
        setTimeLeft(newSettings.breakTime * 60);
      } else if (mode === 'longBreak') {
        setTimeLeft(newSettings.longBreakTime * 60);
      }
    }
  };
  
  // 添加请求通知权限的方法
  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        setNotificationsEnabled(permission === 'granted');
      });
    }
  };

  // 添加自动保存功能
  useEffect(() => {
    // 保存当前状态到本地存储
    const saveState = () => {
      const state = {
        mode,
        timeLeft,
        cycles,
        totalFocusTime,
        isRunning: false, // 页面刷新时总是暂停
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('reading-timer-state', JSON.stringify(state));
    };
    
    // 每5秒保存一次状态
    const saveInterval = setInterval(saveState, 5000);
    
    // 页面关闭或刷新时保存
    window.addEventListener('beforeunload', saveState);
    
    return () => {
      clearInterval(saveInterval);
      window.removeEventListener('beforeunload', saveState);
    };
  }, [mode, timeLeft, cycles, totalFocusTime]);
  
  // 初始化时尝试恢复状态
  useEffect(() => {
    const savedState = localStorage.getItem('reading-timer-state');
    console.log(savedState)
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        const timestamp = new Date(state.timestamp);
        const now = new Date();
        
        // 如果保存时间在30分钟内，恢复状态
        if (now - timestamp < 30 * 60 * 1000) {
          setMode(state.mode);
          setTimeLeft(state.timeLeft);
          setCycles(state.cycles);
          setTotalFocusTime(state.totalFocusTime);
        } else {
          // 超过30分钟，清除保存的状态
          localStorage.removeItem('reading-timer-state');
        }
      } catch (e) {
        console.error('恢复计时器状态失败', e);
        localStorage.removeItem('reading-timer-state');
      }
    }
  }, []);
  
  return {
    isRunning,
    mode,
    timeLeft,
    settings,
    cycles,
    totalFocusTime,
    formatTime,
    calculateProgress,
    toggleTimer,
    resetTimer,
    updateSettings,
    notificationsEnabled,
    requestNotificationPermission
  };
}
