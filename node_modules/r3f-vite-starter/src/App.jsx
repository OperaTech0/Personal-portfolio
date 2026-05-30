import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { ScrollControls,Scroll } from "@react-three/drei";
import { Leva } from "leva";
import Interface from "./components/Interface";
import { Suspense, useEffect, useState, lazy } from "react";
import ScrollManager from "./components/ScrollManager";
import Menu from "./components/Menu";
import { MotionConfig } from "framer-motion";
import { framerMotionConfig } from "./helpers/config";
import {Cursor} from "./components/Cursor";
import LodingScreen from "./components/LodingScreen";

const isMobile = window.innerWidth < 768;
const CursorComponent = lazy(() => Promise.resolve({ default: Cursor }));

function App() {
  const[section , setSection] = useState(0);
  const [menuOpend,setmenuOpend] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(()=>{
    setmenuOpend(false)
  },[section]);

  return (
    <>
    <LodingScreen started={started} setStarted={setStarted}/>
    <MotionConfig transition={{
      ...framerMotionConfig,
    }}>
    <Canvas 
      shadows 
      camera={{ position: [0, 3, 10], fov:42 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
    >
      <color attach="background" args={["#616161"]} />
      
      <ScrollControls pages={4} damping={0.1}>
        <ScrollManager section={section} setSection={setSection}/>
        <Scroll>
          <Suspense fallback={null}>
            {
              started && (
                <Experience section={section} menuOpend={menuOpend}/>
              )
            }
          </Suspense>
        </Scroll>
        <Scroll html>
          {started && (<Interface setSection={setSection}/>)}
        </Scroll>
      </ScrollControls>
    </Canvas>
    
    <Menu 
      setSection={setSection} 
      menuOpend={menuOpend} 
      setmenuOpend={setmenuOpend}
    />
    
    {!isMobile && (
      <Suspense fallback={null}>
        <Cursor/>
      </Suspense>
    )}

    </MotionConfig>
    <Leva hidden/>
    </>
  );
}

export default App;
