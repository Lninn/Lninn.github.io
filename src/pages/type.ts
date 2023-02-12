export type IStatus = 'active' | 'done'

export interface ITask {
  id: number
  title: string
  bgColor: string
  status: IStatus
}
