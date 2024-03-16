import { FaLongArrowAltRight } from "react-icons/fa";

function Details_2() {
  return (
    <div className="absolute bg-white w-full h-screen ">
      <div className="p-10 sm:pl-36">
        <div className="text-white font-bold text-lg">
          <img
            className="h-16 xl:h-35 md:h-35 sm:h-22"
            src="/src/assets/logo.png"
            alt="Logo"
          />
        </div>
      </div>
      {/* Text */}
      <div className="flex flex-col">
        <div className="p-10 sm:pl-36 font-bold text-xl">2/7</div>
        <div className="pr-10 pl-10 sm:pl-36 pb-0 font-bold text-xl sm:text-4xl">
          If you have relevant work experience, add it here
        </div>
        <div className="pr-10 pl-10 pt-2 sm:pl-36 max-w-[1000px] font-semibold text-sm">
          Freelancers who add their experience are twice as likely to win work.
          But if you’re just starting out, you can still create a great profile.
        </div>
        <div className="pl-10 pt-10 sm:pl-36 ">
          Just head on to the next page.
        </div>
        {/* Rounded Button */}
        <div className="pl-10 pt-10 sm:pl-36">
          <button className="flex justify-center items-center w-16 h-16 bg-yellow-400 rounded-full">
            <span className="text-4xl font-bold">+</span>
          </button>
        </div>
        {/* Buttons */}
        <div className="absolute flex bottom-16 right-0">
          <button className="flex mr-5 sm:mr-10 justify-center items-center gap-2 border-2 border-black w-40 h-12 rounded-3xl">
            Back
          </button>
          <button className="flex mr-5 sm:mr-10 justify-center items-center gap-2 bg-orange-500 w-40 h-12 rounded-3xl">
            Next <FaLongArrowAltRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Details_2;
