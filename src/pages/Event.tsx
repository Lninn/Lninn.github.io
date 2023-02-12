import Card from '../components/Card'
import Header from '../components/Header'
import DatePanel from '../components/DatePanel'
import { COLORS } from '../constant'


const Event = () => {
  return (
    <>
      <Header />
      <DatePanel />
      <Card title='DESIGN MEETING' bgColor={COLORS[0]} />
      <Card title='DAILY PROJECT' bgColor={COLORS[1]} />
      <Card title='WEEKLY PLANING' bgColor={COLORS[4]} />
    </>
  )
}

export default Event
