import { useState } from 'react';
import Modal from '#/components/Modal';

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  const footer = (
    <>
      <button className="btn" onClick={onClose}>取消</button>
      <button className="btn btn-primary" onClick={onConfirm}>确认</button>
    </>
  );
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={footer}
    >
      <p>{message}</p>
    </Modal>
  );
}

// 使用示例
export default function DeleteBookmark() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  
  const handleDelete = () => {
    setIsConfirmOpen(true);
  };
  
  const confirmDelete = () => {
    // 执行删除操作
    console.log('删除确认');
    setIsConfirmOpen(false);
  };
  
  return (
    <>
      <button className="btn btn-danger" onClick={handleDelete}>删除书签</button>
      
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="确认删除"
        message="您确定要删除这个书签吗？此操作无法撤销。"
      />
    </>
  );
}
