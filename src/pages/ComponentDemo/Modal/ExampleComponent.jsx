import { useState } from 'react';
import Modal from '#/components/Modal';

export default function ExampleComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const modalFooter = (
    <>
      <button className="btn btn-danger" onClick={closeModal}>取消</button>
      <button className="btn btn-primary" onClick={() => {
        // 处理确认逻辑
        closeModal();
      }}>确认</button>
    </>
  );
  
  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>打开模态框</button>
      
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="示例模态框"
        size="md"
        footer={modalFooter}
      >
        <p>这是一个示例模态框内容。您可以在这里放置任何内容。</p>
        <input type="text" placeholder="示例输入框" />
      </Modal>
    </div>
  );
}
