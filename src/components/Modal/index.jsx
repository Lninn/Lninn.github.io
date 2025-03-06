import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './index.css';

/**
 * 通用 Modal 组件
 * @param {Object} props - 组件属性
 * @param {boolean} props.isOpen - 控制模态框是否打开
 * @param {Function} props.onClose - 关闭模态框的回调函数
 * @param {string} [props.title] - 模态框标题
 * @param {React.ReactNode} props.children - 模态框内容
 * @param {string} [props.size='md'] - 模态框大小 (sm, md, lg, xl, full)
 * @param {boolean} [props.closeOnEsc=true] - 是否允许按 ESC 键关闭
 * @param {boolean} [props.closeOnOverlayClick=true] - 是否允许点击遮罩层关闭
 * @param {boolean} [props.showCloseButton=true] - 是否显示关闭按钮
 * @param {string} [props.position='center'] - 模态框位置 (center, top, bottom)
 * @param {React.ReactNode} [props.footer] - 自定义页脚内容
 * @param {string} [props.className] - 自定义类名
 * @returns {React.ReactPortal|null}
 */
function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnEsc = true,
  closeOnOverlayClick = true,
  showCloseButton = true,
  position = 'center',
  footer,
  className = '',
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // 处理动画效果
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // 保存当前焦点元素
      previousActiveElement.current = document.activeElement;
      // 禁止背景滚动
      document.body.style.overflow = 'hidden';
    } else {
      // 恢复背景滚动
      document.body.style.overflow = '';
      // 恢复之前的焦点
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      // ESC 键关闭模态框
      if (event.key === 'Escape' && closeOnEsc) {
        onClose();
      }

      // Tab 键焦点陷阱
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeOnEsc, onClose]);

  // 自动聚焦到模态框
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // 找到第一个可聚焦元素
      const focusableElement = modalRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElement) {
        focusableElement.focus();
      } else {
        // 如果没有可聚焦元素，则聚焦到模态框本身
        modalRef.current.focus();
      }
    }
  }, [isOpen]);

  // 处理动画结束
  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  // 如果模态框关闭且没有动画，则不渲染
  if (!isOpen && !isAnimating) {
    return null;
  }

  return createPortal(
    <div 
      className={`modal-container ${isOpen ? 'modal-open' : 'modal-close'}`}
      onAnimationEnd={handleAnimationEnd}
      aria-hidden={!isOpen}
    >
      <div 
        className="modal-overlay" 
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />
      <div 
        ref={modalRef}
        className={`modal-content modal-${size} modal-position-${position} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="modal-header">
            {title && <h3 id="modal-title" className="modal-title">{title}</h3>}
            {showCloseButton && (
              <button 
                className="modal-close-button" 
                onClick={onClose}
                aria-label="关闭"
              >
                ×
              </button>
            )}
          </div>
        )}
        <div className="modal-body">
          {children}
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}

export default Modal;