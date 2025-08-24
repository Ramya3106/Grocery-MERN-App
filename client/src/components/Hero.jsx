import { assets } from "../assets/assets";
const Hero = () => {
  return (
    <div className="relative">
        <img src={assets.main_banner_bg} alt="" className="hidden md:block w-full" />
        <img src={assets.main_banner_bg_sm} alt="" className="md:hidden w-full" />
    </div>
  )
}

export default Hero;