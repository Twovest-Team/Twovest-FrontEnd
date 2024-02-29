
const NotificationNumber = ({number}) => {
  return (
    <div className="w-5 h-5 bg-black text-white caption rounded-full flex items-center justify-center absolute top-3.5 left-3">
        <span className="translate-x-[0.5px]">{number}</span>
    </div>
  )
}

export default NotificationNumber