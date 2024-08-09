import LandingNav from "./LandingNav";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FreelanoFooter from "../FreelanoFooter";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from "react";

import landingImage from "@/assets/landingImage.png"
import search from "/src/assets/search.png"
import saveWork from "@/assets/saveWorks.png"
import lock from "@/assets/lock.png"
import landingPageJob from "@/assets/landingPageJob.png"

function LandingPage() {

  const categories = [
    { name: "Web Developer", icon: "💻", color: "bg-blue-100" },
    { name: "Graphic Designer", icon: "🎨", color: "bg-purple-100" },
    { name: "Content Writer", icon: "✍️", color: "bg-green-100" },
    { name: "Digital Marketer", icon: "📱", color: "bg-yellow-100" },
    { name: "Data Analyst", icon: "📊", color: "bg-red-100" },
    { name: "Mobile App Developer", icon: "📱", color: "bg-indigo-100" },
    { name: "UI/UX Designer", icon: "🎨", color: "bg-pink-100" },
    { name: "Video Editor", icon: "🎥", color: "bg-teal-100" }
  ];

  const freelancerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: freelancerProgress } = useScroll({
    target: freelancerRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: categoriesProgress } = useScroll({
    target: categoriesRef,
    offset: ["start end", "end start"]
  });

  const freelancerOpacity = useTransform(freelancerProgress, [0, 0.3], [0, 1]);
  const freelancerY = useTransform(freelancerProgress, [0, 0.3], [50, 0]);

  const categoriesOpacity = useTransform(categoriesProgress, [0, 0.3], [0, 1]);
  const categoriesY = useTransform(categoriesProgress, [0, 0.3], [50, 0]);

  return (
    <div className="h-full bg-white">
      <div className="w-full h-auto">
        <LandingNav />
      </div>
      <div className="flex justify-center items-center mt-12 ">
        <img src={landingImage} className="w-[88%] sm:w-[70%] md:w-[70%] lg:w-[75%] xl:w-[80%] sm:h-[550px] md:[600px] max-h-[80%] cursor-pointer" alt="ahfjakfh" />
      </div>
      <div className="flex sm:mt-36 mt-20 justify-center items-center">
        <div className="bg-white w-[70%] sm:h-[180px] h-[500px]  flex flex-col sm:flex-row justify-center items-center sm:justify-between ">
          <div className="w-[85%] mb-5 sm:w-[33%]  flex justify-center ">
            <div className="w-[30%] flex justify-center ">
              <div className="flex flex-col justify-center items-center">
                <img src={lock} className="w-20 h-20" />
                <h1 className="w-[175px] text-2xl items-center sm:text-xl font-bold text-black mt-2">Create Account</h1>
                <h1 className="w-[250px] text-md items-center text-center text-slate-400 mt-2">First you have to create a Freelano account here</h1>
              </div>
            </div>
          </div>
          <div className="w-[85%] mb-5 sm:w-[33%] flex justify-center ">
            <div className="flex justify-center ">
              <div className=" bg-white w-[30%] flex justify-center">
                <div className="flex flex-col justify-center items-center">
                  <img src={search} className="w-20 h-20" />
                  <h1 className="w-[175px] text-xl items-center font-bold text-black mt-2">Find Your Jobs</h1>
                  <h1 className="w-[250px] text-md items-center text-center font- text-slate-400 mt-2">Search the best Freelance work here</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[85%] mb-5 sm:w-[33%] flex justify-center ">
            <div className=" bg-white w-[30%] flex justify-center">
              <div className="flex justify-center ">
                <div className="flex flex-col justify-center items-center">
                  <img src={saveWork} className="w-20 h-20" />
                  <h1 className="w-[175px] text-xl items-center font-bold text-black mt-2">Save and apply</h1>
                  <h1 className="w-[250px] text-md items-center text-center font- text-slate-400 mt-2">Apply or save and start your work</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-20 flex-wrap">
        <div className="hidden sm:flex w-full md:w-1/2">
          <img src={landingPageJob} alt="" className="max-w-full" />
        </div>
        <motion.div
          ref={freelancerRef}
          className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-right max-w-[516px]"
          style={{ opacity: freelancerOpacity, y: freelancerY }}
        >
          <motion.div
            className="text-4xl md:text-6xl font-medium text-black"
            style={{ opacity: useTransform(freelancerProgress, [0.1, 0.3], [0, 1]) }}
          >
            Find The Best <span className="text-sky-500">Freelancers</span> Here
          </motion.div>
          <motion.div
            className="mt-5 text-lg md:text-2xl text-neutral-400"
            style={{ opacity: useTransform(freelancerProgress, [0.2, 0.4], [0, 1]) }}
          >
            Elevate your expertise and experience by diving into the perfect job opportunities tailored to your skills. With unwavering dedication and smart work, pave your way to financial success and fulfillment. Seamlessly post your job or projects whenever you desire, showcasing your evolving skills and meeting the requirements head-on
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-16 sm:mt-32 mb-16 mx-4 sm:mx-8 md:mx-12 lg:mx-16" ref={categoriesRef}>
        <motion.h1
          className="text-black font-medium text-4xl sm:text-6xl tracking-wider text-center mb-12"
          style={{ opacity: categoriesOpacity, y: categoriesY }}
        >
          Choose Your <span className="text-blue-800 font-medium tracking-wider">Category</span>
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
          style={{ opacity: categoriesOpacity }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className={`${category.color} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer`}
              style={{
                y: useTransform(categoriesProgress,
                  [0.1 + index * 0.02, 0.3 + index * 0.02],
                  [50, 0]
                )
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="p-6 sm:p-8 flex flex-col items-center justify-center h-32 sm:h-36">
                <span className="text-4xl sm:text-5xl mb-3">{category.icon}</span>
                <h3 className="text-sm sm:text-base font-medium text-gray-800 text-center">{category.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <section className="bg-white mt-36">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md sm:text-center">
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl text-center dark:text-white">Sign up for our newsletter</h2>
            <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl text-center dark:text-gray-400">Stay up to date with the our progress, announcements </p>
            <form action="#">
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                <div className="relative w-full">
                  <label className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                  </div>
                  <input className="block p-3 pl-10 w-full border-2 text-sm text-gray-900 bg-gray-50 rounded-lg border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email" type="email" id="email" />
                </div>
                <div>
                  <button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center text-black rounded-lg border-2 cursor-pointer bg-blue-600 border-blue-600  sm:rounded-none sm:rounded-r-xl">Subscribe</button>
                </div>
              </div>
              <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="#" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
            </form>
          </div>
        </div>
      </section>
      <footer>
        <FreelanoFooter />
      </footer>
    </div>
  )
}

export default LandingPage;
