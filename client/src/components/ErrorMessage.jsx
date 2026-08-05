import './ErrorMessage.css'

const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null

  return (
    <div className="error-message">
      <span>{message}</span>
      {onDismiss && (
        <button className="error-message-close" onClick={onDismiss} aria-label="Dismiss">
          ×
        </button>
      )}
    </div>
  )
}

export default ErrorMessage