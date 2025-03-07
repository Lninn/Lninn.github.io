import { BsTools } from 'react-icons/bs'
import Result from '#/components/Result'

export default function PlaceholderPage({ title }) {
  return (
    <Result
      icon={BsTools}
      title={title}
    />
  )
}