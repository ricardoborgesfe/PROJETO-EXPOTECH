function LoadingSpinner() {

  return (

    <div className="flex flex-col items-center gap-4">

      <div className="
        w-12 h-12
        border-4
        border-green-400
        border-t-transparent
        rounded-full
        animate-spin
      "></div>

      <p className="text-green-400 font-bold">
        Calculando carga...
      </p>

    </div>
  )
}

export default LoadingSpinner