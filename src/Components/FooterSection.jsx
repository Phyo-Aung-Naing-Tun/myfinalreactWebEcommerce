import React from "react";
import { BsFacebook, BsFillEnvelopeAtFill } from "react-icons/bs";
import { FaPhoneSquare } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";
import { VscGithub } from "react-icons/vsc";

const FooterSection = () => {
  const technologies = [
    {
      name: "Html",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HTML5_Badge.svg/768px-HTML5_Badge.svg.png?20110131171049",
    },
    {
      name: "Css",
      image:
        "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/121-css3-1024.png",
    },
    {
      name: "JavaScript",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/768px-JavaScript-logo.png",
    },
    {
      name: "React",
      image:
        "https://logos-world.net/wp-content/uploads/2023/08/React-Logo.png",
    },
    {
      name: "tailwind",
      image: "https://files.raycast.com/nwt9ncojkvwmjfkaada8upafvpnu",
    },
    {
      name: "daisyui",
      image:
        "https://blog.openreplay.com/images/building-react-components-with-daisyui/images/hero.png",
    },
    {
      name: "motion",
      image:
        "https://tsh.io/wp-content/uploads/fly-images/32664/framer-motion-logo-1-312x211.png",
    },
  ];
  return (
    <div>
      <div
        style={{
          background:
            "url(https://www.itl.cat/pngfile/big/165-1657011_to-standardize-ecommerce-definition-e-commerce-tech.jpg)",
          backgroundPosition: "center",
        }}
        className=" h-[300px]  relative"
      >
        <div className=" overflow-scroll px-3 py-3 md:flex items-center flex-wrap  gap-[100px] justify-center absolute top-0 left-0 right-0 bottom-0 bg-[#0000009f]">
          <div className="mb-4 lg:mb-0" id="tech-container">
            <h1 className=" mb-4 text-primary tracking-wider font-bold text-[19px] uppercase">
              Technologies
            </h1>
            <div className="flex flex-wrap gap-3 " id="tech-img-container">
              {technologies.map((tech) => (
                <div
                  className=" w-7 bg-white rounded-md overflow-hidden shadow-lg h-7"
                  key={tech.name}
                >
                  {" "}
                  <img
                    className=" w-full h-full object-contain"
                    src={tech.image}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4 lg:mb-0" id="projects-container">
            <h1 className=" mb-2  text-primary tracking-wider font-bold text-[19px] uppercase">
              Other Project
            </h1>

            <div
              className=" text-white tracking-wider font-semibold hover:text-primary flex items-center gap-3  mt-3 cursor-pointer"
              onClick={() => {
                window.open("https://incomparable-maamoul-f4925a.netlify.app/");
              }}
            >
              <BiSolidCameraMovie className="  text-[20px]" /> Movie Project
            </div>
          </div>
          <div className="mb-4 lg:mb-0" id="contacts">
            <h1 className=" mb-4 text-primary tracking-wider font-bold text-[19px] uppercase">
              Contacts
            </h1>
            <div className=" flex w-[120px] justify-between  text-[23px]  text-white">
              <span className=" hover:text-primary cursor-pointer">
                <BsFacebook />
              </span>
              <span className=" hover:text-primary cursor-pointer">
                <FaPhoneSquare />
              </span>
              <span className=" hover:text-primary cursor-pointer">
                <BsFillEnvelopeAtFill />
              </span>
              <span className=" hover:text-primary cursor-pointer">
                <VscGithub />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className=" text-center py-3 bg-primary text-base-100  tracking-wider font-semibold italic">
        Created with &#10084; by P.A.N.T
      </div>
    </div>
  );
};

export default FooterSection;
