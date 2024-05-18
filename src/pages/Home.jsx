import React from "react";
import { RiArrowRightSLine } from "react-icons/ri"; // Importing the right arrow icon
import { RiMailLine, RiPhoneLine, RiMapPinLine } from "react-icons/ri";
const Home = () => {
  return (
    <div>
      <div className="h-full sm:h-72 xl:h-96 2xl:h-120 overflow-hidden">
        <img
          src="/banner.png"
          alt="banner"
          className="object-cover w-full h-full"
        />
      </div>
      {/* first section */}
      <div className="flex flex-col sm:flex-row mt-10 h-full">
        <div className="w-full sm:w-1/2 p-6 sm:p-8">
          <div className="rounded-lg p-8 h-full">
            <h2 className="text-4xl font-bold mb-4">
              Nexus: Comprehensive Disaster Management Solution
            </h2>
          </div>
        </div>

        <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-center items-center">
          <p className="text-lg text-center mb-4">
            Stay safe, informed, and supported during disaster with the power of
            the Nexus.
          </p>
          <div className="flex flex-col sm:flex-row">
            <button className="bg-black text-white py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2">
              Learn More
            </button>
            <Link to="/signup">
              <button className="bg-white text-black py-2 px-4 rounded flex items-center">
                Sign Up <RiArrowRightSLine className="ml-2" />{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* second section */}
      <div className="flex flex-col sm:flex-row mt-10">
        <div className="w-full sm:w-1/2 p-6 sm:p-8 h-full">
          <div className="rounded-lg p-8 h-full">
            <h2 className="text-sm mb-4">Stay</h2>
            <p className="mb-4 text-2xl font-extrabold">
              Instant alert for real-time disaster notification
            </p>
            <p className="text-lg mb-4">
              Be the first to know when disaster strikes with our instant alert,
              future, dot, stay informed and take action to keep yourself and
              your community safe.
            </p>
            <div className="flex flex-col">
              <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                  <h3 className="text-lg font-bold">Stay Safe</h3>
                  <p className="text-md mb-2">
                    Receive real-time notifications about approaching disasters
                    and take necessary precautions
                  </p>
                </div>
                <div className="w-1/2 pl-2">
                  <h3 className="text-lg font-bold">Work Together</h3>
                  <p className="text-md mb-2">
                    Connect with community members and emergency responders to
                    coordinate efforts and support each other
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row">
                <button className="bg-black text-white py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2">
                  Learn More
                </button>
                <button className="bg-white text-black py-2 px-4 rounded flex items-center">
                  Sign Up <RiArrowRightSLine className="ml-2" />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-6 sm:p-8 h-full">
          <div className="rounded-lg h-full">
            <img
              src="https://media.istockphoto.com/id/1393054902/photo/continuity-crisis-recovery-business-plan-crisis-disaster-response-words.jpg?s=612x612&w=0&k=20&c=rXzyDYmQDFa2nFYerBUyRwd7UB_UJMq5j82-Of3szBA="
              alt="image"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* third section */}
      <div className="flex flex-col sm:flex-row mt-10">
        <div className="w-full sm:w-1/2 p-6 sm:p-8 h-full">
          <div className="rounded-lg h-full">
            <img
              src="https://media.istockphoto.com/id/1367515302/photo/anonymous-people-avatars-in-virtual-space.jpg?s=612x612&w=0&k=20&c=GNg5sT3r1p6pq08tfzVan95FxAPgQWlff4KtFHAffcA="
              alt="image"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-6 sm:p-8 h-full">
          <div className="rounded-lg p-8 h-full">
            <h2 className="text-2xl font-bold mb-4">
              Empowering Communities Through Collaboration: Uniting for
              Effective Energy Response
            </h2>
            <p className="text-lg">
              The Nexus provides a digital meeting place where community members
              and emergency responders can easily share information, coordinate
              efforts, and work together to ensure an effective emergency
              response.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row mt-10">
        <div className="w-full sm:w-1/2 p-6 sm:p-8 h-full">
          <div className="rounded-lg p-8 h-full">
            <h2 className="text-sm mb-4">Efficiency</h2>
            <p className="mb-4 text-2xl font-extrabold">
              Organizing Emergency Supplies and Shelters for Effective Disaster
              Management
            </p>
            <p className="text-lg mb-4">
              The Nexus provides a comprehensive resource management system that
              ensures efficient organization of emergency supplies and
              shelters.With our platform,you can easily and manage essential
              resources,making disaster management more effetive and
              streamlined.
            </p>
            <div className="flex flex-col">
              <div className="flex mb-4"></div>
              <div className="flex flex-col sm:flex-row">
                <button className="bg-black text-white py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2">
                  Learn More
                </button>
                <button className="bg-white text-black py-2 px-4 rounded flex items-center">
                  Sign Up <RiArrowRightSLine className="ml-2" />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-6 sm:p-8 h-full">
          <div className="rounded-lg h-full">
            <img
              src="https://media.istockphoto.com/id/1432208095/photo/army-doctor-playing-with-refugee-children-at-a-community-center.jpg?s=612x612&w=0&k=20&c=T9PU1CGNuf74yzyD3EJZK_5s7fvAo9tSJFTY-aAM04o="
              alt="image"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row mt-10 h-full">
        <div className="w-full sm:w-1/2 p-6 sm:p-8">
          <div className="rounded-lg p-8 h-full">
            <h2 className="text-4xl font-bold mb-4">
              Stay informed with Real-Time Alerts
            </h2>
          </div>
        </div>

        <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-center items-center">
          <p className="text-lg text-center mb-4">
            Sign up now to receive real-time disaster alerts and updates,
            keeping you informed and prepared for any emergency
          </p>
          <div className="flex flex-col sm:flex-row">
            <button className="bg-black text-white py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2">
              Sign Up
            </button>
            <button className="bg-white text-black py-2 px-4 rounded flex items-center">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 w-full max-w-7xl p-5">
        <h2 className="text-3xl font-bold mb-6">FAQs</h2>
        <p className="mb-8">
          Find answers to common questions about disaster preparedness and
          platform usage
        </p>
        <hr className="my-4 mx-auto w-1/2 border-1 border-gray-300" />
        <div className="w-full">
          <div className="mb-4 flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2">
              What is disaster recovery?
            </h3>
            <p className="text-sm text-center">
              Disaster recovery refers to the process of restoring systems,
              data, and infrastructure after a disaster, ensuring continuity of
              operations.
            </p>
          </div>
          <hr className="my-4 mx-auto w-1/2 border-1 border-gray-300" />

          <div className="mb-4 flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2">
              How to prepare for disasters ?
            </h3>
            <p className="text-sm text-center">
              Disaster preaparedness involves creating an emergency plan,
              assembling a disaster supply kit, and staying informed about
              potenctial risks in your area
            </p>
          </div>
          <hr className="my-4 mx-auto w-1/2 border-1 border-gray-300" />

          <div className="mb-4 flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2">How can i contribute ?</h3>
            <p className="text-sm text-center">
              You can contribute by donating to disaster relief
              efforts,volunteering your time and skills, and spreading awareness
              about the platform to help more people stay during disasters
            </p>
          </div>
          <hr className="my-4 mx-auto w-1/2 border-1 border-gray-300" />

          <div className="mb-4 flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2">Is the platform free ?</h3>
            <p className="text-sm text-center">
              Yes,the platform is free to use for both community members and
              emergency responders.We believe in providing accessible tools for
              disaster management
            </p>
          </div>
          <hr className="my-4 mx-auto w-1/2 border-1 border-gray-300" />

          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2">How can i sign up ?</h3>
            <p className="text-sm text-center">
              To sign up,simply visit our website and follow the registration
              process it only takes a few minutes
            </p>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-6 mt-10">
          Still Have Questions ?
        </h2>
        <p className="mb-8">Contact us for further assistance</p>
        <button className="bg-white text-black py-2 px-4 rounded flex items-center border-2">
          Contact
        </button>
      </div>
      <div className="flex flex-col sm:flex-row mt-10 h-full">
        <div className="w-full sm:w-1/2 p-6 sm:p-8">
          <div className="rounded-lg p-8 h-full">
            <h2 className="text-sm mb-4">Contact</h2>
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p>Have a question or want to get involved ? Contact us today !</p>
          </div>
        </div>

        <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-center items-center">
          <div className="text-lg text-center mb-4">
            <RiMailLine className="text-1xl mb-2" />
            <p className="mb-2">contact@example.com</p>
          </div>
          <div className="text-lg text-center mb-4">
            <RiPhoneLine className="text-1xl mb-2" />
            <p className="mb-2">+1 123 456 7890</p>
          </div>
          <div className="text-lg text-center mb-4">
            <RiMapPinLine className="text-1xl mb-2" />
            <p className="mb-2">123 Main Street, City, Country</p>
          </div>
        </div>
      </div>

      <div className="mt-10 h-full bg-gray-200">
        <div className="p-6 sm:p-8 flex justify-center items-center">
          <img src="/Nexus.png" alt="logo" className="h-16" />
        </div>

        <div className="p-6 sm:p-8 flex flex-col justify-center items-center">
          <div className="text-lg text-center mb-4">
            <RiPhoneLine className="text-2xl mb-2" />
            <p className="mb-2">+1 123 456 7890</p>
          </div>
          <div className="text-lg text-center mb-4">
            <RiMapPinLine className="text-2xl mb-2" />
            <p className="mb-2">123 Main Street, City, Country</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
