import { useRef, useState } from "react"
import emailjs from '@emailjs/browser';
import { FaHandshake } from "react-icons/fa6";
import {motion} from "framer-motion-3d";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from 'three';

const ContactSuccessScene = () => {
    const planeRef = useRef();
    const texture = useLoader(THREE.TextureLoader, "/Images/operatech-logo.png");

    useFrame(() => {
        if (planeRef.current) {
            planeRef.current.rotation.y += 0.005;
            planeRef.current.rotation.x += 0.003;
        }
    });

    return (
        <motion.mesh ref={planeRef} scale={[2.5, 2.5, 2.5]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial wireframe map={texture} side={THREE.DoubleSide} />
        </motion.mesh>
    );
};

const EmailFrom = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validError, setValidError] = useState(""); // State to hold validation error messages
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        // --- Validation ---
        if (!name.trim()) {
            setValidError("Name cannot be empty.");
            return;
        }
        if (!email.trim()) {
            setValidError("Email cannot be empty.");
            return;
        }
        if (!message.trim()) {
            setValidError("Message cannot be empty.");
            return;
        }
        setValidError(""); // Clear previous errors if validation passes
        setLoading(true);

        const serviceId = "service_x678bw8";
        const templatedId = "template_nczzvaj";
        const publicKey = "6dKtay0R9xXVAeWgS"

        const templateParams = {
            from_name: name,
            from_email: email,
            to_name: "OperaTech",
            to_email: "opeyemitimileyin102@gmail.com", // <--- IMPORTANT: Replace with your actual email address
            message: message,
        }

        emailjs.init(publicKey);
        // Send email using emailjs
        emailjs.send(serviceId, templatedId, templateParams)
            .then((response)=>{
                console.log("email send sucessfully" , response);
                
                // WhatsApp Redirection logic (always triggered after successful email)
                // Fixed formatting: ensures it is a full international number string
                const whatsappNumber = "919158547128"; 
                const whatsappText = window.encodeURIComponent(`Hi, I'm ${name} (${email}).\n\n${message}`);
                window.open(`https://wa.me/${whatsappNumber}?text=${whatsappText}`, '_blank');

                setName("");
                setEmail("");
                setMessage("");
                setSucceeded(true);
                setLoading(false);

                // Automatically hide the success message and show the form again after 5 seconds
                setTimeout(() => {
                    setSucceeded(false);
                }, 5000);
            })
            .catch((error)=>{
                console.error("Error sending email", error);
                setValidError("Failed to send message: " + (error?.text || "Please check your connection."));
                setLoading(false);
            })
    }
  return (
    <>
        <div className="mt-20 md:mt-40 relative group">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-indigo-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative p-[1px] rounded-xl overflow-hidden w-full max-w-[300px] md:w-96 shadow-2xl">
                {/* Rotating Border Light */}
                <div className="absolute inset-[-1000%] animate-spin [animation-duration:3s] bg-[conic-gradient(from_90deg_at_50%_50%,#6366f1_0%,#a855f7_50%,#6366f1_100%)]" />
                
                <div className="relative p-6 md:p-8 rounded-[11px] bg-slate-950/90 backdrop-blur-sm pointer-events-auto">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-20 h-20 mb-4 rounded-full p-2 bg-slate-800/50 border border-slate-700 flex items-center justify-center overflow-hidden group-hover:border-indigo-500/50 transition-colors">
                            <img src="/Images/operatech-logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <h2 className="text-2xl md:text-3xl text-white font-bold tracking-tight">Contact me</h2>
                    </div>

        {
            succeeded ?<div className="flex gap-4">
                <div className="h-40 w-40">
                    <Canvas>
                        <ambientLight intensity={1.5} />
                        <ContactSuccessScene />
                    </Canvas>
                </div>
                <p className="text-gray-200 font-bold text-xl">Submitted successfully! Wait for our response.<FaHandshake className="text-4xl"/></p> </div>:(
                <form onSubmit={handleSubmit}>


                <label htmlFor="name" className="font-medium text-gray-200 block mb-1 "> Name</label>
                <input type="text"  
                        name="name" 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full rounded-md border-0 text-white shadow-sm placeholder:text-white bg-slate-600 focus:outline-none pl-3 pt-1 pb-1 pr-3"
                         />
    
    
                <label  htmlFor="email" className="font-medium text-gray-200 block mb-1 ">Email</label>
                <input type="email"
                        name="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border-0 text-white shadow-sm bg-slate-600 placeholder:text-white
                        focus:outline-none pl-3 pt-1 pb-1 pr-3"
                         />
    
    
                 <label  htmlFor="message" className="font-medium text-gray-200 block mb-1 ">Message</label>
                 <textarea name="message" 
                            id="message"
                            value={message}
                            onChange={(e)=>setMessage(e.target.value)}
                            className="h-32 block w-full rounded-md border-0 text-white shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 bg-slate-600
                            focus:outline-none pl-3 pt-1 pb-1 pr-3 "
                            >
                 </textarea>
                 {validError && <p className="text-red-500 mt-1"> {validError} </p>}
                
                    
                <button 
                type="submit" 
                disabled={loading}
                className={`text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 cursor-pointer transition-all ${loading ? "bg-gray-500" : "bg-indigo-700 hover:bg-indigo-600"}`}
                >{loading ? "Sending..." : "Submit"}</button>
            </form>
            )
        }

        </div>
        </div>
        </div>
    </>
  )
}

export default EmailFrom
