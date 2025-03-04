import './SyncChangesModal.css';

import { useState } from 'react';


function DiffView({ original, modified }) {
  return (
    <div className="diff-view">
      <div className="diff-column">
        <h3>原数据</h3>
        <pre>{JSON.stringify(original, null, 2)}</pre>
      </div>
      <div className="diff-column">
        <h3>新数据</h3>
        <pre>{JSON.stringify(modified, null, 2)}</pre>
      </div>
    </div>
  );
}

export default function SyncChangesModal({ original, modified, onClose, onConfirm }) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleConfirm = async () => {
    setIsSyncing(true);
    try {
      await onConfirm();
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="sync-changes-modal">
        <div className="modal-header">
          <h2>确认更改</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          <div className="sync-status">
            <p>请确认以下更改是否正确：</p>
          </div>
          <DiffView original={original} modified={modified} />
          <div className="modal-actions">
            <button 
              className="submit-button" 
              onClick={handleConfirm}
              disabled={isSyncing}
            >
              {isSyncing ? '同步中...' : '确认'}
            </button>
            <button 
              className="cancel-button" 
              onClick={onClose}
              disabled={isSyncing}
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
