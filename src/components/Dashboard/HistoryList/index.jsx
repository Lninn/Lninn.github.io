import './index.css'
import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { supabase } from '../../../supabaseClient'

export default function HistoryList({ onRestore, onNotify }) {
  const [historyList, setHistoryList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchHistory = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('bookmark_history')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setHistoryList(data)
    } catch (err) {
      console.error('获取历史记录失败:', err)
      onNotify?.({
        type: 'error',
        message: '获取历史记录失败'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const handleRestore = async (historyItem) => {
    try {
      const { bookmark_data } = historyItem
      const { error } = await supabase
        .from('bookmark')
        .insert([bookmark_data])

      if (error) throw error

      onNotify?.({
        type: 'success',
        message: '书签恢复成功'
      })
      
      onRestore?.()
      fetchHistory()
    } catch (err) {
      console.error('恢复书签失败:', err)
      onNotify?.({
        type: 'error',
        message: '恢复书签失败'
      })
    }
  }

  return (
    <div className="list-section">
      <div className="section-header">
        <h2>操作历史</h2>
        <span className="history-count">
          {isLoading ? '加载中...' : `${historyList.length} 条记录`}
        </span>
      </div>
      
      {isLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>正在加载历史记录...</p>
        </div>
      ) : (
        <div className="history-list">
          {historyList.map(item => (
            <div key={item.id} className="history-item">
              <div className="history-content">
                <span className="history-action">
                  {item.action === 'add' && '添加了'}
                  {item.action === 'delete' && '删除了'}
                  {item.action === 'update' && '修改了'}
                </span>
                <span className="history-name">
                  {item.bookmark_data.name}
                </span>
                <span className="history-time">
                  {formatDistanceToNow(new Date(item.created_at), {
                    addSuffix: true,
                    locale: zhCN
                  })}
                </span>
              </div>
              {item.action === 'delete' && (
                <button
                  className="restore-button"
                  onClick={() => handleRestore(item)}
                >
                  恢复
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}