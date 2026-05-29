import { useFrame, useThree } from '@react-three/fiber';
import {motion} from "framer-motion-3d";
import React, { useEffect, useRef } from 'react'
import { Image,Text } from '@react-three/drei';
import {atom, useAtom} from "jotai"
import { animate, useMotionValue } from 'framer-motion';

export const projects = [
    {
        title:"Linkedin Clone",
        url:"https://linked-in-clone-wu",
        image:"/Images/Linkedin Clone.png",
        description:"Recomended: join now at 1st then u sign in with google"
    },
    {
        title:"Fashion-website",
        url:"https://dpsalm.vercel.app/",
        image:"Images/WebsiteM.png",
        description:"In Production: Working on this project to give easy access to fashion products with best user experience"
    },
    {
        title:"JEMA store",
        url:"https://jema-website-com.vercel.app/",
        image:"Images/WebsitePM.png",
        description:"This is a website to showcase prodcut of a brand and also can order directly via their Whatsapp direct and get fast response"
    },
    {
        title:"OperaTech Page",
        url:"https://operatech",
        image:"Images/Portfollio.png",
        description:"Yep this is my Porfolio page . thanks to visit my site"
    },
    {
        title:"Graphics Gallary",
        url:"https://github.com/S",
        image:"Images/PIZZACUT.jpg",
        description:"Its a native app with user auth,payment,admin,user portal"
    },
   
];

const Project = ({project,highlighted}) =>{

    const background = useRef();
    const bgOpacity = useMotionValue(0.4);

    useEffect(()=>{
        animate(bgOpacity,highlighted ? 0.7 : 0.4 )
    },[highlighted]);

    useFrame(()=>{
        background.current.material.opacity = bgOpacity.get();
    });

    return (
        <group>
            <mesh 
            ref={background}
            position-z={-0.001}
            onClick={()=> window.open(project.url, "_blank")}
            onPointerEnter={() => (document.body.style.cursor = "pointer")}
            onPointerLeave={() => (document.body.style.cursor = "default")}
            
            >
                <planeGeometry args={[2.2,2]}/>
                <meshBasicMaterial color="#4d5d6d" transparent opacity={0.4} />
            </mesh>
            <Image 
            scale={[2,1.2,1]} 
            url={project.image} 
            toneMapped = {false} 
            position-y={0.3}
            />
            <Text 
            maxWidth={2} 
            anchorX={"left"} 
            anchorY={"top"} 
            fontSize={0.2} 
            position={[-1,-0.4,0]}
            >
                {project.title.toUpperCase()}
            </Text>

            <Text 
            maxWidth={2} 
            anchorX={"left"} 
            anchorY={"top"} 
            fontSize={0.1} 
            position={[-1,-0.6,0]}
            >
                {project.description}
            </Text>

        </group>
    )
}

export const currentProjectAtom = atom(Math.floor(projects.length /2));

const Projects = () => {
    
    const {viewport} = useThree();
    const [currentProject] = useAtom(currentProjectAtom);

    return <group position-y={-viewport.height * 2 + 1}>
        {
            projects.map((project,index)=>(
                <motion.group 
                key={"project_" + index }
                position={[index * 2.5 , 0 ,-3]}
                animate={{
                    x:0+(index - currentProject) * 2.5,
                    y:currentProject === index ? 0 : -0.1,
                    z:currentProject === index ? -2 : -3,
                    rotateX:currentProject === index ? 0 : -Math.PI/3,
                    rotateZ: currentProject === index ? 0 : 0.1 * Math.PI,

                }}
                >
                   <Project project={project} highlighted={index === currentProject}/>
                </motion.group> 
            ))
        }
    </group>
 
}

export default Projects
