import { describe, test, expect, beforeAll } from 'vitest';
import { parseHealthRecords, groupRecordsByDateAndType } from './parse';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Apple Health 数据解析', () => {
  let xmlContent;
  let parsedRecords;
  
  beforeAll(() => {
    // 读取测试数据文件
    xmlContent = fs.readFileSync(path.join(__dirname, 'parse.fake-data.txt'), 'utf-8');
    parsedRecords = parseHealthRecords(xmlContent);
  });
  
  test('应该正确解析所有记录', () => {
    expect(parsedRecords).toBeDefined();
    expect(Array.isArray(parsedRecords)).toBe(true);
    expect(parsedRecords.length).toBeGreaterThanOrEqual(49);
  });

  test('2025-03-06 应该有 16 条记录', () => {
    const stepRecords = parsedRecords.filter(record =>
      record.type === 'HKQuantityTypeIdentifierStepCount' &&
      record.startDate.toISOString().split('T')[0] === '2025-03-06'
    );
    expect(stepRecords.length).toBe(16);
  })
  
  test('解析的记录应该包含正确的属性', () => {
    const record = parsedRecords[0];
    expect(record).toHaveProperty('type');
    expect(record).toHaveProperty('startDate');
    expect(record).toHaveProperty('endDate');
    expect(record).toHaveProperty('value');
    
    // 确保不包含其他属性
    expect(Object.keys(record).length).toBe(4);
  });
  
  test('应该正确解析步数记录', () => {
    const stepRecords = parsedRecords.filter(record => 
      record.type === 'HKQuantityTypeIdentifierStepCount'
    );
    expect(stepRecords.length).toBeGreaterThan(0);
    
    const firstStepRecord = stepRecords[0];
    expect(firstStepRecord.type).toBe('HKQuantityTypeIdentifierStepCount');
    expect(firstStepRecord.startDate).toBeInstanceOf(Date);
    expect(firstStepRecord.endDate).toBeInstanceOf(Date);
    expect(typeof firstStepRecord.value).toBe('number');
  });
  
  test('应该正确解析能量消耗记录', () => {
    const energyRecords = parsedRecords.filter(record => 
      record.type === 'HKQuantityTypeIdentifierActiveEnergyBurned'
    );
    expect(energyRecords.length).toBeGreaterThan(0);
    
    const firstEnergyRecord = energyRecords[0];
    expect(firstEnergyRecord.type).toBe('HKQuantityTypeIdentifierActiveEnergyBurned');
    expect(firstEnergyRecord.startDate).toBeInstanceOf(Date);
    expect(firstEnergyRecord.endDate).toBeInstanceOf(Date);
    expect(typeof firstEnergyRecord.value).toBe('number');
  });
  
  test('应该正确解析体重记录', () => {
    const weightRecords = parsedRecords.filter(record => 
      record.type === 'HKQuantityTypeIdentifierBodyMass'
    );
    expect(weightRecords.length).toBeGreaterThan(0);
    
    const firstWeightRecord = weightRecords[0];
    expect(firstWeightRecord.type).toBe('HKQuantityTypeIdentifierBodyMass');
    expect(firstWeightRecord.startDate).toBeInstanceOf(Date);
    expect(firstWeightRecord.endDate).toBeInstanceOf(Date);
    expect(typeof firstWeightRecord.value).toBe('number');
  });
  
  // 移除元数据测试，因为我们不再解析元数据
});

describe('按日期和类型分组健康记录', () => {
  let xmlContent;
  let parsedRecords;
  let groupedRecords;
  
  beforeAll(() => {
    // 读取测试数据文件
    xmlContent = fs.readFileSync(path.join(__dirname, 'parse.fake-data.txt'), 'utf-8');
    parsedRecords = parseHealthRecords(xmlContent);
    groupedRecords = groupRecordsByDateAndType(parsedRecords);
  });

  test('应该返回一个对象', () => {
    expect(groupedRecords).toBeDefined();
    expect(typeof groupedRecords).toBe('object');
  });
  
  test('应该按类型分组记录', () => {
    // 检查是否包含步数记录组
    expect(groupedRecords).toHaveProperty('HKQuantityTypeIdentifierStepCount');
    
    // 检查是否包含能量消耗记录组
    expect(groupedRecords).toHaveProperty('HKQuantityTypeIdentifierActiveEnergyBurned');
    
    // 检查是否包含体重记录组
    expect(groupedRecords).toHaveProperty('HKQuantityTypeIdentifierBodyMass');
  });
  
  test('每个类型组应该包含按日期分组的记录', () => {
    const stepRecords = groupedRecords['HKQuantityTypeIdentifierStepCount'];
    expect(Array.isArray(stepRecords)).toBe(true);
    expect(stepRecords.length).toBeGreaterThan(0);
    
    const firstDayRecord = stepRecords[0];
    expect(firstDayRecord).toHaveProperty('type');
    expect(firstDayRecord).toHaveProperty('date');
    expect(firstDayRecord).toHaveProperty('values');
    expect(firstDayRecord).toHaveProperty('totalValue');
    expect(firstDayRecord.date).toBeInstanceOf(Date);
    expect(Array.isArray(firstDayRecord.values)).toBe(true);
    expect(typeof firstDayRecord.totalValue).toBe('number');
  });
  
  test('同一天的记录应该被合并', () => {
    // 获取所有日期
    const stepRecords = groupedRecords['HKQuantityTypeIdentifierStepCount'];
    const dates = stepRecords.map(record => record.date.toISOString().split('T')[0]);
    
    // 检查日期是否唯一（没有重复的日期）
    const uniqueDates = [...new Set(dates)];
    expect(dates.length).toBe(uniqueDates.length);
  });
  
  test('每个日期记录应该包含该日期所有值的总和', () => {
    const stepRecords = groupedRecords['HKQuantityTypeIdentifierStepCount'];
    
    stepRecords.forEach(dayRecord => {
      // 计算值数组的总和
      const sum = dayRecord.values.reduce((acc, val) => acc + val, 0);
      
      // 检查总和是否等于 totalValue
      expect(dayRecord.totalValue).toBeCloseTo(sum, 5);
    });
  });

  test('2025-03-06 HKQuantityTypeIdentifierStepCount 的值应该等于 934', () => {
    const stepRecords = groupedRecords['HKQuantityTypeIdentifierStepCount'];
    const record = stepRecords.find(record => record.date.toISOString().split('T')[0] === '2025-03-06');
    expect(record.totalValue).toBe(934);
  });
});
