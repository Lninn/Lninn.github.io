import React from 'react'
import ReactDOM from 'react-dom'

import './Modal.less'


interface IProps {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal = (props: IProps) => {

  const {
    visible,
    onClose,
    children,
  } = props

  const dom = (
    <ModalWrap visible={visible} onClose={onClose}>
      {children}
    </ModalWrap>
  )

  return ReactDOM.createPortal(
    dom,
    document.body,
  )
}

interface ModalWrapProps {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
}

const ModalWrap = (props: ModalWrapProps) => {

  const {
    visible,
    children,
  } = props

  const style: React.CSSProperties = {
    display: visible ? 'block' : 'none'
  }

  return (
    <div style={style}>
      <div className='modalWrap'>
        <div className="modalWrap-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
