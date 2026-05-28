function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-green-400 border-t-transparent animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-green-600 border-b-transparent animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '0.6s' }} />
      </div>
      <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.42rem', color: '#4ade80', letterSpacing: '0.1em' }}>
        CALCULANDO...
      </span>
    </div>
  )
}

export default LoadingSpinner