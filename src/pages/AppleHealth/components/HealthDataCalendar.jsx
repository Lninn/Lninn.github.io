import React, { useMemo, useState } from 'react';
import { 
  Tooltip, 
  Select, 
  Card, 
  Statistic, 
  Row, 
  Col, 
  CalendarIcon, 
  FireIcon 
} from './UIComponents';
import { getColorIntensity } from '../utils/dataProcessor';
import './HealthDataCalendar.css';

const HealthDataCalendar = ({ data }) => {
  const [selectedType, setSelectedType] = useState('all');
  
  const { calendarData, years, activityTypes, stats } = useMemo(() => {
    if (!data || !data.data) return { calendarData: [], years: [], activityTypes: [], stats: {} };
    
    // 提取年份列表
    const years = [...new Set(data.data.map(item => new Date(item.date).getFullYear()))].sort();
    
    // 准备日历数据
    const calendarData = {};
    years.forEach(year => {
      calendarData[year] = Array(53).fill().map(() => Array(7).fill(null));
    });
    
    // 填充日历数据
    data.data.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      
      // 计算周和星期几
      const firstDayOfYear = new Date(year, 0, 1);
      const dayOfYear = Math.floor((date - firstDayOfYear) / (24 * 60 * 60 * 1000));
      const weekOfYear = Math.floor(dayOfYear / 7);
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
  
  // 计算最大值，用于颜色强度
  const maxCount = useMemo(() => {
    let max = 0;
    years.forEach(year => {
      calendarData[year].forEach(week => {
        week.forEach(day => {
          if (day) {
            const count = getFilteredCount(day);
            if (count > max) max = count;
          }
        });
      });
    });
    return max;
  }, [calendarData, years, selectedType]);
  
  // 渲染月份标签
  const renderMonthLabels = () => {
    const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    return (
      <div className="month-labels">
        {months.map((month, index) => (
          <div key={month} className="month-label" style={{ left: `${(index * 8.3) + 2}%` }}>
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
                    const intensity = getColorIntensity(count, maxCount);
                    
                    return (
                      <Tooltip 
                        key={`${year}-w${weekIndex}-d${dayIndex}`}
                        title={day ? `${day.date}: ${count} 活动` : '无数据'}
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
  
  return (
    <div className="health-data-calendar">
      <div className="calendar-header">
        <div className="calendar-title">
          <h2><CalendarIcon /> 健康数据活动热图</h2>
        </div>
        <div className="calendar-filter">
          <span>活动类型: </span>
          <Select 
            value={selectedType} 
            onChange={setSelectedType}
            style={{ width: 200 }}
            options={activityTypes.map(type => ({
              value: type,
              label: type === 'all' ? '所有活动' : type
            }))}
          />
        </div>
      </div>
      
      <Row gutter={16} className="stats-cards">
        <Col span={6}>
          <Card>
            <Statistic 
              title="记录天数" 
              value={stats.totalDays} 
              prefix={<CalendarIcon />} 
              suffix="天"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="总活动数" 
              value={stats.totalActivities} 
              prefix={<FireIcon />} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="单日最高活动" 
              value={stats.maxDailyActivities} 
              prefix={<FireIcon />} 
            />
          </Card>
        </Col>
        <Col span={6}>
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
