import React, { useMemo, useState, useCallback } from 'react';
import Card from '#/components/Card'
import { Row, Col } from '#/components/Grid'
import Statistic from '#/components/Statistic'
import Select from '#/components/Select'
import './DataAnalysis.css';

const DataAnalysis = ({ data }) => {
  const [selectedType, setSelectedType] = useState(null);
  
  // Define calculateTrend before using it in useMemo
  const calculateTrend = useCallback((values) => {
    if (!values || values.length < 2) {
      return null;
    }

    const n = values.length;
    const xValues = values.map((_, index) => index);
    const yValues = values.map(item => item.value);
    
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    
    for (let i = 0; i < n; i++) {
      sumX += xValues[i];
      sumY += yValues[i];
      sumXY += xValues[i] * yValues[i];
      sumX2 += xValues[i] * xValues[i];
    }
    
    const denominator = n * sumX2 - sumX * sumX;
    if (denominator === 0) {
      return {
        overall: 0,
        direction: '稳定',
        recentValues: {
          last7Days: values.slice(-7).map(v => v.value),
          last30Days: values.slice(-30).map(v => v.value)
        },
        recentDates: {
          last7Days: values.slice(-7).map(v => v.date),
          last30Days: values.slice(-30).map(v => v.date)
        }
      };
    }
    
    const slope = (n * sumXY - sumX * sumY) / denominator;
    
    // 计算趋势强度
    const trendStrength = Math.abs(slope) / (Math.max(...yValues) - Math.min(...yValues) || 1);
    
    return {
      overall: slope,
      strength: trendStrength,
      direction: trendStrength < 0.01 ? '稳定' : 
                slope > 0 ? '上升' : '下降',
      recentValues: {
        last7Days: values.slice(-7).map(v => v.value),
        last30Days: values.slice(-30).map(v => v.value)
      },
      recentDates: {
        last7Days: values.slice(-7).map(v => v.date),
        last30Days: values.slice(-30).map(v => v.date)
      }
    };
  }, []);
  
  // Now use calculateTrend in useMemo
  const analysisResults = useMemo(() => {
    if (!data || !data.data || !Array.isArray(data.data)) {
      return null;
    }
    
    const results = {
      totalDays: data.data.length,
      totalRecords: 0,
      activitySummary: {},
      trends: {},
      activityTypes: data.activityTypes || []
    };
    
    // 排序数据，确保按日期顺序
    const sortedData = [...data.data].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // 计算总记录数和活动摘要
    sortedData.forEach(dayData => {
      results.totalRecords += dayData.count || 0;
      
      // 处理每种活动类型
      if (dayData.details) {
        Object.entries(dayData.details).forEach(([type, value]) => {
          if (!results.activitySummary[type]) {
            results.activitySummary[type] = {
              total: 0,
              days: 0,
              max: 0,
              min: Infinity,
              values: [] // 存储每天的值，用于趋势分析
            };
          }
          
          if (value > 0) {
            results.activitySummary[type].total += value;
            results.activitySummary[type].days += 1;
            results.activitySummary[type].max = Math.max(results.activitySummary[type].max, value);
            results.activitySummary[type].min = Math.min(results.activitySummary[type].min, value);
            
            // 保存日期和值，用于趋势分析
            results.activitySummary[type].values.push({
              date: dayData.date,
              value: value
            });
          }
        });
      }
    });
    
    // 计算平均值和趋势
    Object.keys(results.activitySummary).forEach(type => {
      const summary = results.activitySummary[type];
      if (summary.days > 0) {
        summary.average = summary.total / summary.days;
      }
      
      // 如果最小值仍为 Infinity，设置为 0
      if (summary.min === Infinity) {
        summary.min = 0;
      }
      
      // 计算趋势 - 简单的线性回归
      if (summary.values.length > 1) {
        const trend = calculateTrend(summary.values);
        results.trends[type] = trend;
      }
    });
    
    // 设置默认选中的活动类型
    if (!selectedType && results.activityTypes.length > 0) {
      // 优先选择步数，如果有的话
      const stepType = results.activityTypes.find(type => 
        type.includes('Step') || type.includes('步数')
      );
      setSelectedType(stepType || results.activityTypes[0]);
    }
    
    // 修复默认选择逻辑
    const availableTypes = Object.keys(results.activitySummary);
    if (!selectedType && availableTypes.length > 0) {
      const stepType = availableTypes.find(type => 
        type.toLowerCase().includes('step') || 
        type.toLowerCase().includes('步数')
      );
      setTimeout(() => {
        setSelectedType(stepType || availableTypes[0]);
      }, 0);
    }
    
    return results;
  }, [data, selectedType, calculateTrend]); // Add calculateTrend to dependencies

  // 改进趋势指示器渲染
  const renderTrendIndicator = useCallback((trend) => {
    if (!trend) return null;
    
    let icon, color;
    if (trend.direction === '上升') {
      icon = trend.strength > 0.05 ? '⬆️' : '↗️';
      color = '#52c41a';
    } else if (trend.direction === '下降') {
      icon = trend.strength > 0.05 ? '⬇️' : '↘️';
      color = '#f5222d';
    } else {
      icon = '→';
      color = '#1890ff';
    }
    
    return (
      <span style={{ color, marginLeft: '5px' }}>
        {icon} {trend.direction}
        {trend.strength > 0.05 && ' (显著)'}
      </span>
    );
  }, []);
  
  // 渲染简易图表
  const renderSimpleChart = (values, dates, height = 275) => {
    if (!values || values.length < 2) return null;
    
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1; // 避免除以零
    
    return (
      <div className="simple-chart" style={{ height: `${height}px` }}>
        {values.map((value, index) => {
          const normalizedHeight = ((value - min) / range) * 100;
          return (
            <div 
              key={index}
              className="chart-bar"
              style={{ 
                height: `${normalizedHeight}%`,
                backgroundColor: '#1890ff'
              }}
              title={`${dates[index]}: ${value}`}
            />
          );
        })}
      </div>
    );
  };
  
  if (!analysisResults) {
    return <div>无数据可分析</div>;
  }
  
  return (
    <div className="data-analysis">
      <div className="analysis-header">
        <h3>数据分析</h3>
        <Select 
          value={selectedType} 
          onChange={setSelectedType}
          options={[
            ...analysisResults.activityTypes.map(type => ({ value: type, label: type }))
          ]}
          placeholder="选择活动类型"
          style={{ width: '200px' }}
        />
      </div>
      
      <Row>
        <Col style={{ width: '50%' }}>
          <Card>
            <Statistic 
              title="总天数" 
              value={analysisResults.totalDays} 
              suffix="天"
            />
          </Card>
        </Col>
        <Col style={{ width: '50%' }}>
          <Card>
            <Statistic 
              title="总记录数" 
              value={analysisResults.totalRecords} 
              suffix="条"
            />
          </Card>
        </Col>
      </Row>
      
      {selectedType && analysisResults.activitySummary[selectedType] && (
        <div className="selected-activity-analysis">
          <h4 style={{ marginTop: '20px' }}>
            {selectedType} 分析
            {analysisResults.trends[selectedType] && 
              renderTrendIndicator(analysisResults.trends[selectedType])}
          </h4>
          
          <Card style={{ marginBottom: '20px' }}>
            <Row>
              <Col style={{ width: '25%' }}>
                <Statistic 
                  title="总计" 
                  value={analysisResults.activitySummary[selectedType].total.toFixed(2)} 
                />
              </Col>
              <Col style={{ width: '25%' }}>
                <Statistic 
                  title="平均值" 
                  value={analysisResults.activitySummary[selectedType].average.toFixed(2)} 
                />
              </Col>
              <Col style={{ width: '25%' }}>
                <Statistic 
                  title="最大值" 
                  value={analysisResults.activitySummary[selectedType].max.toFixed(2)} 
                />
              </Col>
              <Col style={{ width: '25%' }}>
                <Statistic 
                  title="记录天数" 
                  value={analysisResults.activitySummary[selectedType].days} 
                  suffix="天"
                />
              </Col>
            </Row>
            
            {analysisResults.trends[selectedType] && (
              <div className="trend-charts">
                <h5>最近7天趋势</h5>
                {renderSimpleChart(
                  analysisResults.trends[selectedType].recentValues.last7Days,
                  analysisResults.trends[selectedType].recentDates.last7Days
                )}
                
                <h5>最近30天趋势</h5>
                {renderSimpleChart(
                  analysisResults.trends[selectedType].recentValues.last30Days,
                  analysisResults.trends[selectedType].recentDates.last30Days
                )}
              </div>
            )}
          </Card>
        </div>
      )}
      
      {/* 移除了"所有活动摘要"部分 */}
    </div>
  );
};

export default DataAnalysis;
