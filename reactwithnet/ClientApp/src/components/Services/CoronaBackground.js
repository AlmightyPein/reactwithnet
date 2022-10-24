import {Canvas, useFrame, useLoader} from '@react-three/fiber';
import { Box, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import Corona from '../../Assets/corona.gltf';
import { Suspense, useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import '@react-three/flex';
import { Flex } from '@react-three/flex';
import { Box3, MeshStandardMaterial, PointLight,  } from 'three';
import '@react-three/postprocessing';
import { BlendFunction, Resizer, KernelSize} from 'postprocessing';
import { Bloom, DepthOfField, EffectComposer, Glitch, Noise, Vignette, Outline, Sepia, DotScreen, Pixelation, HueSaturation, BrightnessContrast, ToneMapping, ChromaticAberration, ColorAverage, Grid, SMAA } from '@react-three/postprocessing';
import bac from '../../Assets/bacteria.gltf';
const BacteriaModel = (props)=>
{
    const {nodes, materials} = useGLTF(bac);
    
    return(
        
        <mesh scale={props.scale} geometry={nodes.Aerobicbacteria.geometry} material={props.material}/>
        
    )

}
const ShowModel = ()=>
{
    const model_ref = useRef([]);
    
    const [windowSize, setWindowSize] = useState({width:undefined,height:undefined});
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }, []); 
    

      //animations and stuff
    useFrame((state, delta) => {
          
        model_ref.current.map(model=>{
            const time = state.clock.getElapsedTime();
            model.addEventListener('onclick',(e)=>{console.log("asd")});
            
            model.rotation.y += 0.01;
            
           
        });
        
    }, [model_ref.current]);
    //const corona_model = useLoader(GLTFLoader, Corona);
    const {nodes, materials} = useGLTF(Corona);
    
    
    const material = new MeshStandardMaterial({
        color: 0xb30000, 
        transparent: true, opacity: 0.7,
        emissive: 0xb30000, emissiveIntensity:1,
        
   });
   function RandomWc(min, max, dec)
   {
       if(dec)
       return Math.random() * (max - min) + min;
       else
    return Math.floor(Math.random() * (max - min) + min)*(windowSize.width/windowSize.height);
    
   }
   
   
   function size()
   {
    const scale = RandomWc(.5, 4);
    return [scale, scale, scale];
   }

   function setBacteriaSize(factor)
   {
      return [(windowSize.width/windowSize.height)*factor ,(windowSize.width/windowSize.height)*factor,(windowSize.width/windowSize.height)*factor]
   }

    return(
        <Flex >
        <mesh onClick={()=>console.log("asd")} ref={el => model_ref.current[0] = el} position={[RandomWc(1,80,false), RandomWc(1,80,false), RandomWc(1,80,false)]} geometry={nodes.corona005.geometry} scale={size()} material={material}  />
        <mesh rotateX={80} ref={el => model_ref.current[1] = el} position={[RandomWc(1,80,false), RandomWc(1,80,false), RandomWc(1,80,false)]} geometry={nodes.corona005.geometry} scale={size()} material={material}  />
        <mesh ref={el => model_ref.current[2] = el} position={[RandomWc(1,80,false), RandomWc(1,80,false), RandomWc(1,80,false)]} geometry={nodes.corona005.geometry} scale={size()} material={material}  />
        <mesh ref={el => model_ref.current[3] = el} position={[RandomWc(1,80,false), RandomWc(1,80,false), RandomWc(1,80,false)]} geometry={nodes.corona005.geometry} scale={size()} material={material}  />
        <mesh ref={el => model_ref.current[4] = el} position={[RandomWc(1,80,false), RandomWc(1,80,false), RandomWc(1,80,false)]} geometry={nodes.corona005.geometry} scale={size()} material={material}  />
        <mesh ref={el => model_ref.current[5] = el} position={[RandomWc(1,80,false), RandomWc(1,80,false), RandomWc(1,80,false)]} geometry={nodes.corona005.geometry} scale={size()} material={material}  />
        <mesh ref={el => model_ref.current[6] = el} position={[RandomWc(1,80,false), RandomWc(1,80,false), RandomWc(1,80,false)]} geometry={nodes.corona005.geometry} scale={size()} material={material}  />
        <mesh ref={el => model_ref.current[7] = el} position={[RandomWc(1,80,false), RandomWc(1,80,false), RandomWc(1,80,false)]} geometry={nodes.corona005.geometry} scale={size()} material={material}  />
        <mesh ref={el => model_ref.current[8] = el} position={[RandomWc(1,80,false), RandomWc(1,80,false), RandomWc(1,80,false)]} geometry={nodes.corona005.geometry} scale={size()} material={material}  />
        <mesh ref={el => model_ref.current[9] = el} position={[RandomWc(1,80,false), RandomWc(1,80,false), RandomWc(1,80,false)]} geometry={nodes.corona005.geometry} scale={size()} material={material}  />       
        <BacteriaModel scale={setBacteriaSize(2)} material={material}/>
        </Flex>
        
    )
} 
function CoronaBackground(props) {
    function RandomWc(min, max, dec)
   {
       if(dec)
       return Math.random() * (max - min) + min;
       else
    return Math.floor(Math.random() * (max - min) + min);
    
   }
    const [hue, sethue] = useState(0);
    const [sat, setsat] = useState(0);
    useEffect(()=>{sethue(RandomWc(0.1,30,true));setsat(RandomWc(0.1,30,true))},[]);
    
    
    return ( <div className='flex justify-start w-screen h-[300px]'>
        <Canvas className=''  camera={{zoom:3 ,position:[50,30,80]}}>
            <Flex>
            <EffectComposer>
        
        <Vignette
    offset={11} // vignette offset
    darkness={0.5} // vignette darkness
    eskil={true} // Eskil's vignette technique
    blendFunction={BlendFunction.NORMAL} // blend mode
  />
   <HueSaturation
    blendFunction={BlendFunction.NORMAL} // blend mode
    hue={hue} // hue in radians
    saturation={0}
     // saturation in radians
  />

                    </EffectComposer>
            <directionalLight color="red" position={[50,50,80]} intensity={2}/>
            
            <pointLight color="red" intensity={8} />
            
            
            <OrbitControls/>
            <Suspense fallback={null}>
            
            <ShowModel />
            </Suspense>
            
            </Flex>
        </Canvas>
        </div>
     );
}

export default CoronaBackground;