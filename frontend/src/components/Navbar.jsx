import heroImage from '../assets/hero.png'

function Navbar() {

  return (

    <div className="
      bg-[#2d2d2d]
      border-b-4 border-[#3d3d3d]
      p-4
      shadow-xl
    ">

      <div className="
        flex
        items-center
        gap-4
      ">

        <img
          src={heroImage}
          alt="Hero"
          className="
            w-24
            drop-shadow-xl
          "
        />

        <div>

          <h1 className="
            text-4xl
            font-bold
            text-green-400
          ">
            MinePack Optimizer
          </h1>

          <p className="
            text-gray-300
            mt-1
            text-lg
          ">
            Smart Logistics Platform
          </p>

        </div>

      </div>

    </div>
  )
}

export default Navbar