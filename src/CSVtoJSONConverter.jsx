import React, { useState } from 'react';
import Papa from 'papaparse'; // 用于解析CSV文件

const CSVtoJSONConverter = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true, // 将CSV的第一行作为JSON的键
        dynamicTyping: true, // 自动转换数据类型
        complete: (result) => {
          setJsonData(result.data); // 解析后的JSON数据
        },
      });
    }
  };

  const downloadJSON = () => {
    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>CSV to JSON Converter</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {jsonData && (
        <div>
          <h2>Converted JSON Data:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          <button onClick={downloadJSON}>Download JSON</button>
        </div>
      )}
    </div>
  );
};

export default CSVtoJSONConverter;
