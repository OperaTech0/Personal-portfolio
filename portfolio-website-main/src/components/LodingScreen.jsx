import {useProgress} from "@react-three/drei"
import { useEffect } from "react";

const LodingScreen = ({started,setStarted}) => {
    const {progress} = useProgress();

    useEffect(()=>{
        if(progress === 100){
            setStarted(true);
        }
    },[progress])
    
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-500 
      ${started ? "opacity-0" : "opacity-100"}
    `}
    style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'}}>
      
      <div className="flex flex-col items-center gap-8">
        {/* Logo/Brand */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">OperaTech</h1>
          <p className="text-sm text-gray-400 font-light tracking-widest">PORTFOLIO</p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64">
          {/* Loading Bar */}
          <div className="relative h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{width: `${progress}%`}}
            />
          </div>
          
          {/* Progress Text */}
          <p className="text-center text-gray-400 text-xs mt-4 font-light tracking-wider">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Loading Text */}
        <p className="text-gray-500 text-sm font-light tracking-wide animate-pulse">
          Loading experience...
        </p>
      </div>
    </div>
  )
}

export default LodingScreen
