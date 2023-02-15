import clsx from 'clsx'
import { useState } from 'react'
import './Radio.less'

import checkSvg from '../assets/check.svg'


interface RadioProps {
  checked?: boolean
  onChange?: (value: boolean) => void
}

const useField = (props: RadioProps) => {
  const [checked, setChecked] = useState(false)

  if (
    (
      props.checked !== undefined &&
      props.onChange !== undefined
    )
  ) {
    return {
      checked: props.checked,
      onChange: props.onChange
    }
  }

  return {
    checked,
    onChange: (value: boolean) => {
      setChecked(value)

      if (props.onChange) {
        props.onChange(value)
      }
    }
  }
}

const Radio = (props: RadioProps) => {

  const { checked, onChange } = useField(props)

  const handleClick = () => {
    onChange(!checked)
  }

  const cls = clsx(
    'radio',
    { checked }
  )

  return (
    <div
      className={cls}
      onClick={handleClick}
    >
      {checked ? <img src={checkSvg} /> : null}
    </div>
  )
}

export default Radio
