import Modal from '#/components/Modal'
import './DeleteConfirmModal.css'

export function DeleteConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  deleteDate, 
  onDateChange 
}) {
  const footer = (
    <>
      <button className="cancel-button" onClick={onClose}>
        取消
      </button>
      <button className="confirm-button danger" onClick={onConfirm}>
        确认删除
      </button>
    </>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="删除历史错误日志"
      size="sm"
      footer={footer}
    >
      <div className="delete-modal-content">
        <p>确定要删除多久以前的错误日志？</p>
        <div className="delete-date-selector">
          <select value={deleteDate} onChange={e => onDateChange(Number(e.target.value))}>
            <option value={7}>7天前</option>
            <option value={30}>30天前</option>
            <option value={90}>90天前</option>
            <option value={180}>180天前</option>
            <option value={365}>一年前</option>
          </select>
        </div>
        <p className="delete-warning">
          注意：此操作不可恢复，将永久删除所选时间之前的所有错误日志记录。
        </p>
      </div>
    </Modal>
  )
}