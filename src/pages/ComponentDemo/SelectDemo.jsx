import { useState } from 'react'
import Select from '#/components/Select';

export default function MyComponent() {
  const [selectedValue, setSelectedValue] = useState('');
  
  const options = [
    { value: 'option1', label: '选项 1' },
    { value: 'option2', label: '选项 2' },
    { value: 'option3', label: '选项 3' },
  ];
  
  return (
    <Select
      options={options}
      value={selectedValue}
      onChange={setSelectedValue}
      placeholder="请选择一个选项"
    />
  );
}
