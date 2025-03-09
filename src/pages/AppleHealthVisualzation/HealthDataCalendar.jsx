import React, { useMemo, useState, useEffect } from 'react';

import Tooltip from '#/components/Tooltip';
import Select from '#/components/Select';
import Card from '#/components/Card';
import Statistic from '#/components/Statistic';
import { Row, Col } from '#/components/Grid'
import Message from '#/components/Message'
import { FireIcon, CalendarIcon } from '#/components/Icons'

import { getColorIntensity } from './utils/dataProcessor';
import { exportAsJson, exportAsCsv } from './utils/exportData';
import './HealthDataCalendar.css';


const HealthDataCalendar = ({ data }) => {
  const [selectedType, setSelectedType] = useState('HKQuantityTypeIdentifierStepCount');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // 添加响应式检测
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const { calendarData, years, activityTypes, stats } = useMemo(() => {
    if (!data || !data.data) return { calendarData: [], years: [], activityTypes: [], stats: {} };
    
    // 提取年份列表
    const years = [...new Set(data.data.map(item => new Date(item.date).getFullYear()))].sort();
    
    // 准备日历数据
    const calendarData = {};
    years.forEach(year => {
      // 初始化 53 周 x 7 天的数组
      calendarData[year] = Array(53).fill().map(() => Array(7).fill(null));
      
      // 获取该年第一天是星期几
      const firstDayOfYear = new Date(year, 0, 1);
      const firstDayOffset = firstDayOfYear.getDay();
      
      // 计算该年最后一天
      const lastDayOfYear = new Date(year, 11, 31);
      const totalDays = Math.ceil((lastDayOfYear - firstDayOfYear) / (24 * 60 * 60 * 1000)) + 1;
      
      // 预填充日期占位符
      for (let day = 0; day < totalDays; day++) {
        const currentDate = new Date(year, 0, day + 1);
        const weekOfYear = Math.floor((day + firstDayOffset) / 7);
        const dayOfWeek = currentDate.getDay();
        
        if (calendarData[year][weekOfYear]) {
          calendarData[year][weekOfYear][dayOfWeek] = {
            date: currentDate.toISOString().split('T')[0],
            count: 0,
            details: {}
          };
        }
      }
    });
    
    // 填充活动数据
    data.data.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const firstDayOfYear = new Date(year, 0, 1);
      const firstDayOffset = firstDayOfYear.getDay();
      const dayOfYear = Math.floor((date - firstDayOfYear) / (24 * 60 * 60 * 1000));
      const weekOfYear = Math.floor((dayOfYear + firstDayOffset) / 7);
      const dayOfWeek = date.getDay();
      
      if (calendarData[year] && calendarData[year][weekOfYear]) {
        calendarData[year][weekOfYear][dayOfWeek] = {
          date: item.date,
          count: item.count,
          details: item.details
        };
      }
    });
    
    // 计算统计数据
    const stats = {
      totalDays: data.data.length,
      totalActivities: data.data.reduce((sum, item) => sum + item.count, 0),
      maxDailyActivities: Math.max(...data.data.map(item => item.count)),
      averageDailyActivities: Math.round(data.data.reduce((sum, item) => sum + item.count, 0) / data.data.length)
    };
    
    return { 
      calendarData, 
      years, 
      activityTypes: ['all', ...data.activityTypes], 
      stats 
    };
  }, [data]);
  
  // 根据选择的活动类型过滤数据
  const getFilteredCount = (cell) => {
    if (!cell) return 0;
    if (selectedType === 'all') return cell.count;
    return cell.details[selectedType] || 0;
  };
  
  // 计算每年的最大值，用于颜色强度
  const yearlyMaxCounts = useMemo(() => {
    const maxCounts = {};
    
    years.forEach(year => {
      let max = 0;
      calendarData[year].forEach(week => {
        week.forEach(day => {
          if (day) {
            const count = getFilteredCount(day);
            if (count > max) max = count;
          }
        });
      });
      maxCounts[year] = max;
    });
    
    return maxCounts;
  }, [calendarData, years, selectedType]);
  
  // 渲染月份标签 - 修改为更好的对齐方式
  const renderMonthLabels = () => {
    const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    // 移动端显示简化月份
    const mobileMonths = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const displayMonths = isMobile ? mobileMonths : months;
    
    return (
      <div className="month-labels">
        {displayMonths.map((month) => (
          <div key={month} className="month-label">
            {month}
          </div>
        ))}
      </div>
    );
  };
  
  // 渲染星期标签
  const renderWeekdayLabels = () => {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return (
      <div className="weekday-labels">
        {weekdays.map((day) => (
          <div key={day} className="weekday-label">
            {day}
          </div>
        ))}
      </div>
    );
  };
  
  // 渲染单个年份的日历
  const renderYearCalendar = (year) => {
    // 使用当前年份的最大值
    const currentYearMaxCount = yearlyMaxCounts[year];
    
    return (
      <div key={year} className="year-calendar">
        <h3>{year}年</h3>
        <div className="calendar-grid">
          {renderMonthLabels()}
          <div className="calendar-body">
            {renderWeekdayLabels()}
            <div className="calendar-cells">
              {calendarData[year].map((week, weekIndex) => (
                <div key={`${year}-w${weekIndex}`} className="calendar-week">
                  {week.map((day, dayIndex) => {
                    const count = getFilteredCount(day);
                    const intensity = getColorIntensity(count, currentYearMaxCount);
                    
                    // 获取步数信息
                    const stepCount = day && selectedType === 'StepCount' 
                      ? (day.details.StepCount || 0) 
                      : (day && day.stepCount || 0);
                    
                    // 构建提示文本
                    let tooltipText = day ? `${day.date}: ${count} 活动` : '无数据';
                    if (day && stepCount > 0) {
                      tooltipText = selectedType === 'StepCount'
                        ? `${day.date}: ${Math.round(stepCount)} 步`
                        : `${day.date}: ${count} 活动 (${Math.round(stepCount)} 步)`;
                    }
                    
                    return (
                      <Tooltip 
                        key={`${year}-w${weekIndex}-d${dayIndex}`}
                        title={tooltipText}
                        placement={isMobile ? "top" : "right"}
                      >
                        <div 
                          className={`calendar-day intensity-${intensity}`}
                          data-date={day ? day.date : ''}
                        />
                      </Tooltip>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // 添加导出函数
  const handleExportJson = () => {
    try {
      exportAsJson(data, `apple-health-data-${new Date().toISOString().split('T')[0]}.json`);
    } catch (error) {
      Message.error(`导出 JSON 失败: ${error.message}`);
    }
  };
  
  const handleExportCsv = () => {
    try {
      exportAsCsv(data, `apple-health-data-${new Date().toISOString().split('T')[0]}.csv`);
    } catch (error) {
      Message.error(`导出 CSV 失败: ${error.message}`);
    }
  };
  
  // 在日历头部添加导出按钮
  return (
    <div className="health-data-calendar">
      <div className="calendar-header">
        <div className="calendar-title">
          <h3>健康数据日历</h3>
        </div>
        <div className="calendar-actions">
          <Select 
            value={selectedType} 
            onChange={setSelectedType}
            options={[
              { value: 'all', label: '所有活动' },
              ...activityTypes.map(type => ({ value: type, label: type }))
            ]}
          />
          <button 
            className="export-button" 
            onClick={handleExportJson}
          >
            导出 JSON
          </button>
          <button 
            className="export-button" 
            onClick={handleExportCsv}
          >
            导出 CSV
          </button>
        </div>
      </div>
      
      <Row gutter={16} className="stats-cards">
        <Col span={isMobile ? 12 : 6} xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="记录天数" 
              value={stats.totalDays} 
              prefix={<CalendarIcon />} 
              suffix="天"
            />
          </Card>
        </Col>
        <Col span={isMobile ? 12 : 6} xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="总活动数" 
              value={stats.totalActivities} 
              prefix={<FireIcon />} 
            />
          </Card>
        </Col>
        <Col span={isMobile ? 12 : 6} xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="单日最高活动" 
              value={stats.maxDailyActivities} 
              prefix={<FireIcon />} 
            />
          </Card>
        </Col>
        <Col span={isMobile ? 12 : 6} xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="日均活动" 
              value={stats.averageDailyActivities} 
              prefix={<FireIcon />} 
            />
          </Card>
        </Col>
      </Row>
      
      <div className="calendar-legend">
        <span>活动频率: </span>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color intensity-0"></div>
            <span>无</span>
          </div>
          <div className="legend-item">
            <div className="legend-color intensity-1"></div>
            <span>低</span>
          </div>
          <div className="legend-item">
            <div className="legend-color intensity-2"></div>
            <span>中</span>
          </div>
          <div className="legend-item">
            <div className="legend-color intensity-3"></div>
            <span>高</span>
          </div>
          <div className="legend-item">
            <div className="legend-color intensity-4"></div>
            <span>很高</span>
          </div>
        </div>
      </div>
      
      {years.map(year => renderYearCalendar(year))}
    </div>
  );
};

export default HealthDataCalendar;
