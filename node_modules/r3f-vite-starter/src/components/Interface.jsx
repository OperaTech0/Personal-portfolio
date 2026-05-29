import {motion} from "framer-motion"
import { useAtom } from "jotai"
import { currentProjectAtom, projects } from "./Projects"
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import EmailFrom from "./EmailFrom";
import { PiLinkedinLogo } from "react-icons/pi";
import { ImGithub } from "react-icons/im";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaFacebookSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { useState, useEffect } from "react";


const Section = ({children,mobileTop})=>{
    
    return (
    <motion.section 
    className={`
    h-screen w-screen p-8 max-w-screen-2xl mx-auto
    flex flex-col items-start 
    ${mobileTop ? "justify-start md:justify-center" :"justify-center"}
    `}
    initial = {{
        opacity:0,
        y:50
    }}
    whileInView={{
        opacity:1,
        y:0,
        transition:{
            duration:1,
            delay:0.6
        }
    }}
    >       
        {children}
    </motion.section>)

}


const Interface = ({setSection}) => {
  return (
    <div className="flex flex-col items-center  w-screen">
     <AboutSection setSection = {setSection}/>
     <SkillSection/>
    <ProjectSection/>
     <ContractSection />


    </div>
  )
}
export default Interface

const AboutSection = ({setSection})=>{
    return(
     <Section mobileTop >
                <h1 className="flex flex-col gap-2">
                    <span className="text-lg md:text-xl text-gray-100 font-medium opacity-95">Hi, I'm</span>
                    <span className="text-3xl md:text-6xl  font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-300 to-blue-400 drop-shadow-xl">
                        OperaTech
                    </span>
                    <span className="mt-1 text-sm md:text-base text-gray-200 tracking-wider">Creative Web Developer & Designer</span>
                </h1>

         <TypewriterWrapper
            initial={{
                opacity:0,
                y:25
            }}
            whileInView={{
                opacity:1,
                y:0
            }}
            transition={{
                duration:1,
                delay:1.5
            }}
         >
           <Typewriter
             lines={["I am  a Web developer", "Graphics Designer", " and an AI Enthusiast."]}
             className="text-lg text-blue-600 mt-4"
           />
         </TypewriterWrapper>
         <motion.button
         onClick={()=> setSection(3)}
          className="bg-indigo-800 text-white py-4 px-8 rounded-lg font-bold text-lg mt-4 md:mt-16"
          initial={{
            opacity:0,
            y:25,
          }}
          whileInView={{
            opacity:1,
            y:0
          }}
          transition={{
            duration:1,
            delay:2
          }}
          >Contact me</motion.button>

     </Section>

    ) 
 }

// Simple typewriter that types each line in sequence and keeps previous lines visible
const Typewriter = ({lines = [], className = '', speed = 40, pause = 700}) => {
    const [index, setIndex] = useState(0);
    const [displayed, setDisplayed] = useState([]);
    const [currentText, setCurrentText] = useState('');

    useEffect(() => {
        if (index >= lines.length) return;

        let i = 0;
        setCurrentText('');
        const line = lines[index];
        const t = setInterval(() => {
            setCurrentText(prev => prev + line[i]);
            i += 1;
            if (i >= line.length) {
                clearInterval(t);
                setDisplayed(prev => [...prev, line]);
                setCurrentText('');
                setTimeout(() => setIndex(index + 1), pause);
            }
        }, speed);

        return () => clearInterval(t);
    }, [index, lines, speed, pause]);

    return (
        <div className={className}>
            <div className="leading-tight">
                {displayed.map((l, i) => (
                    <div key={i} className="text-base md:text-lg text-blue-400">{l}</div>
                ))}
                {index < lines.length && (
                    <div className="text-base md:text-lg text-blue-300">{currentText}</div>
                )}
            </div>
        </div>
    );
};

// motion wrapper for the typewriter to preserve original animation props
const TypewriterWrapper = ({children, ...props}) => (
    <motion.div {...props}>{children}</motion.div>
);

 const skills = [
    {
        title:"Threejs | React Three Fiber",
        level:50
    },
    {
        title:"React",
        level:70
    },
    {
        title:"React-Native",
        level:55
    },
    {
        title:"Java Script",
        level:75
    },
    {
        title:"TypeScript",
        level:75 
    },
    {
        title:"CSS3,TailwindCSS",
        level:70
    },
    {
        title:"NodeJS,Express JS",
        level:70
    },
    {
        title:"GSAP,Framer Motion",
        level:60
    },
    {
        title:"Java",
        level:30
    },
    {
        title:"Python & C-program",
        level:50
    }
 ]

 const SkillSection = ()=>{
    return(
        <Section>
            <motion.div
            className="w-full"
            whileInView={"visible"}
            >
                <h2 className="text-3xl md:text-5xl  font-bold">Skills</h2>
                <div className="mt-8 space-y-4">
                    {skills.map((skill,index) => (
                        <div className="w-full md:w-64" key={index} >
                            <motion.h3 className="text-lg md:text-xl font-bold text-gray-800"
                                        initial={{
                                            opacity:0
                                        }}
                                        variants={{
                                            visible:{
                                                opacity:1,
                                                transition:{
                                                    duration:1,
                                                    delay:1 + index *0.2,
                                                }
                                            }
                                        }}

                            >
                                {skill.title}</motion.h3>


                            <div className="h-2 w-full bg-gray-700 rounded-full mt-2">
                               <motion.div  className="h-full bg-indigo-500 "
                                style={{width:`${skill.level}%`}}
                                initial={{
                                    scaleX:0,
                                    originX:0
                                }}
                                variants={{
                                    visible:{
                                        scaleX:1,
                                        transition:{
                                            duration:1,
                                            delay:1 + index *0.2,
                                    }
                                    }      
                                }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
      </Section>
    )
 };



 const ProjectSection = ()=>{

    const [currentProject , setCurrentProject] = useAtom(currentProjectAtom);

    const nextProject = ()=>{
        setCurrentProject((currentProject + 1 ) % projects.length);
    }

    const previousProject = ()=>{
        setCurrentProject((currentProject - 1 ) % projects.length);
    }
    return (
        <Section>
            <div className="flex w-full h-full gap-8 items-center justify-center">
            <button className="hover:text-indigo-600 text-gray-400 transition-colors text-4xl" onClick={previousProject}> <GrLinkPrevious /> </button>
            <h2 className="text-3xl md:text-5xl text-gray-300 font-bold">Projects</h2>
            <button className="hover:text-indigo-600 text-gray-400 transition-colors text-4xl"
            onClick={nextProject}>
                <GrLinkNext />
            </button>
        </div>
        </Section>
    )
 };


 const ContractSection = ()=>{
    
    return(
        <Section>
            <EmailFrom />
            <footer className="flex m-5">
                
            <div className="relative group">
                <a
                    href="https://drive.google.com/file/d/17Q6-DLqQvr-_pKM3c0YC14-THIQNZcYa/view?usp=sharing"
                >
                    <img src="/Images/cv.png" alt="Resume" className="cursor-pointer w-10 h-8 mr-4 transition duration-300 ease-in-out transform group-hover:grayscale" />
                </a>
                <div
                    className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <p className="p-2">Click to view my resume</p>
                </div>
            </div>
            <a href="https://www.linkedin.com/in/subham-kundu-a06bb2260/">
            <PiLinkedinLogo  className="text-gray-400 text-3xl mr-4 cursor-pointer "/>
            </a>
            <a href="https://github.com/Subham1234kundu">
            <ImGithub className="text-gray-400 text-3xl mr-4 cursor-pointer "/>
            </a>
            
            <a href="https://www.instagram.com/subham._sk_08/">
            <BiLogoInstagramAlt className="text-gray-400 text-3xl mr-4 cursor-pointer "/>
            </a>

    

            <a href="https://wa.me/09158547128">
            <FaWhatsappSquare  className="text-gray-400 text-3xl mr-4 cursor-pointer"/>
            </a>


            </footer>
            

      </Section>
    )
 };
