/**
 * 网站分析状态组件
 * 用于显示网站分析的进度和状态
 */
export default function AnalysisStatus({ analyzing, analysisStep, analysisError, urlExists }) {
  const steps = ['开始分析', '验证URL格式', '获取网站元数据', '处理分析结果', '分析完成']
  
  return (
    <>
      {analyzing && (
        <div className="analysis-status">
          <h3>正在分析网站...</h3>
          <div className="analysis-steps">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`analysis-step ${analysisStep === step ? 'active' : ''} ${
                  steps.indexOf(step) < steps.indexOf(analysisStep) ? 'complete' : ''
                }`}
              >
                <div className="step-indicator">{index + 1}</div>
                <div className="step-label">{step}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {urlExists && (
        <div className="analysis-error">
          <p>该URL已存在于您的书签中</p>
          <p className="error-tip">提示：您可以在书签列表中查找此网站。</p>
        </div>
      )}
      
      {analysisError && !urlExists && (
        <div className="analysis-error">
          <p>{analysisError}</p>
          <p className="error-tip">提示：请检查网址是否正确，或稍后再试。</p>
        </div>
      )}
    </>
  )
}