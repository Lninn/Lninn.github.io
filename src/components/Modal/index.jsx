import './index.css'
import { useEffect, useRef } from 'react'
import { FiX } from 'react-icons/fi'

/**
 * 通用模态框组件
 * @param {Object} props 组件属性
 * @param {boolean} props.isOpen 是否显示模态框
 * @param {Function} props.onClose 关闭模态框的回调函数
 * @param {string} props.title 模态框标题
 * @param {ReactNode} props.children 模态框内容
 * @param {ReactNode} props.footer 模态框底部内容
 * @param {string} props.size 模态框尺寸 (sm, md, lg, xl, full)
 * @param {string} props.position 模态框位置 (center, top)
 */
export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md',
  position = 'center'
}) {
  const modalRef = useRef(null)
  
  // 处理ESC键关闭
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])
  
  // 处理点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])
  
  // 打开模态框时禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  if (!isOpen) return null
  
  return (
    <div className="modal-overlay" style={{ alignItems: position === 'top' ? 'flex-start' : 'center' }}>
      <div 
        ref={modalRef}
        className={`modal-container modal-size-${size}`}
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button 
            className="modal-close-button" 
            onClick={onClose}
            aria-label="关闭"
          >
            <FiX />
          </button>
        </div>
        
        <div className="modal-body">
          {children}
        </div>
        
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
