import { assets } from "../assets/assets";
const Hero = () => {
  return (
    <div className="relative">
        <img src={assets.main_banner_bg} alt="" className="hidden md:block w-full" />
        <img src={assets.main_banner_bg_sm} alt="" className="md:hidden w-full" />
        <div className="absolute inset-0 flex flex-col items-center md:items-center justify-end md:justify-center pb-24 md:pb-0 md:pl-18 lg:pl-24">

        </div>
    </div>
  )
}

export default Hero;