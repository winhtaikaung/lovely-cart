import { notification } from 'antd'
interface notificationProps {
  type: 'success' | 'info' | 'error' | 'warning'
  message: string
  description?: string
}
const Notification = ({ type, message, description = '' }: notificationProps) => {
  return notification[type]({
    message: message,
    description: description,
  })
}
export default Notification
