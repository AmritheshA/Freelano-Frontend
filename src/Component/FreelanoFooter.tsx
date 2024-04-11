import { FaTwitter, FaFacebookSquare, FaDribbble, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function FreelanoFooter() {
  return (
    <footer className="relative bg-gray-600 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-blueGray-700 tracking-wide">𝕱𝖗𝖊𝖊𝖑𝖆𝖓𝖔</h4>
            <h5 className="text-lg mt-2 mb-2 text-gray-400">
              Grow together, Learn together.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6 flex">
              <a href='https://www.linkedin.com/in/amrithesha/'>
                <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <FaTwitter className='ml-3' />
                </button>
              </a>
              <button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <FaFacebookSquare className='ml-3' />
              </button>
              <button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <FaDribbble className='ml-3' />
              </button>
              <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <FaGithub className='ml-3' />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Page</span>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/home" className="text-white hover:text-blueGray-800 pt-2 font-medium block pb-2 text-sm">Home</Link >
                  </li>
                  <li>
                    <Link to="/about us" className="text-white hover:text-blueGray-800 pt-2 font-medium block pb-2 text-sm" >About Us</Link >
                  </li>
                  <li>
                    <Link to="/home" className="text-white hover:text-blueGray-800 pt-2 font-medium block pb-2 text-sm" >Find Works</Link >
                  </li>
                  <li>
                    <Link to="/home" className="text-white hover:text-blueGray-800 pt-2 font-medium block pb-2 text-sm" >Find Freelancer</Link >
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Service</span>
                <ul className="list-unstyled">
                  <li>
                    <h1 className="text-white hover:text-blueGray-800 pt-2 font-medium block pb-2 text-sm" ></h1 >
                  </li>
                  <li>
                    <h1 className="text-white hover:text-blueGray-800 pt-2 font-medium block pb-2 text-sm" >Job Posting</h1 >
                  </li>
                  <li>
                    <h1 className="text-white hover:text-blueGray-800 pt-2 font-medium block pb-2 text-sm" >Project Management</h1 >
                  </li>
                  <li>
                    <h1 className="text-white hover:text-blueGray-800 pt-2 font-medium block pb-2 text-sm" >Contact Us</h1 >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024</span> <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank"></a>
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
}

export default FreelanoFooter;
