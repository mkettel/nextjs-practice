'use client'

// import { Landscape, Surfboard } from '@/components/canvas/Examples'
import dynamic from 'next/dynamic'
import { Suspense, useEffect } from 'react'
import { motion, useScroll, useAnimation, useSpring, useMotionValue } from "framer-motion"
import Image from 'next/image'
import Link from 'next/link'
import { Falcon } from '@/components/canvas/Examples'

/**
 * Loading the components dynamically to avoid SSR issues.
 * Dynamic loading is useful for components that use browser APIs like window, document, etc.
 */
const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Surfboard = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Surfboard), { ssr: false })
const Landscape = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Landscape), { ssr: false })
const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {

  const { scrollYProgress } = useScroll();

  const controls = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();

  const handleHoverStart = () => {
    controls.start({ y: -60, opacity: 1, transition: { duration: 0.5 } });
  };

  const handleHoverEnd = () => {
    controls.start({ y: 0, opacity: 0, transition: { duration: 0.5 } });
  };

  const handleHoverStart2 = () => {
    controls2.start({ y: -60, opacity: 1, transition: { duration: 0.5 } });
  };

  const handleHoverEnd2 = () => {
    controls2.start({ y: 0, opacity: 0, transition: { duration: 0.5 } });
  };

  const handleHoverStart3 = () => {
    controls3.start({ y: -60, opacity: 1, transition: { duration: 0.5 } });
  };

  const handleHoverEnd3 = () => {
    controls3.start({ y: 0, opacity: 0, transition: { duration: 0.5 } });
  };

  // Mouse Moving Controls
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  }

  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 75, damping: 100, mass: 3 }),
    y: useSpring(mouse.y, { stiffness: 75, damping: 100, mass: 3 }),
  }

  const manageMouse = (e) => {
    const { innerWidth, innerHeight } = window
    const { clientX, clientY } = e
    const x = clientX / innerWidth
    const y = clientY / innerHeight
    mouse.x.set(x)
    mouse.y.set(y)
  }

  useEffect(() => {
    window.addEventListener('mousemove', manageMouse)
    return () => window.removeEventListener('mousemove', manageMouse)
  }, [])



  return (
    <>
      {/* Main Two Column Boxes */}
      <div className="flex">
        <div className="w-screen">
          <div className="flex h-[80vh] gap-0.5 mx-0.5 my-0.5 ">
            <div id='bird' className="flex-1 border-1 rounded-3xl border-black z-10">
              <View className='relative flex h-full rounded-3xl z-0 overflow-hidden'>
                <Suspense fallback={null}>
                  <Falcon mouse={smoothMouse} scale={0.8} position={[0, -1.1, -2]} rotation={[0.1, 1, 0]} />
                  {/* <Common color={'black'} /> */}
                </Suspense>
              </View>
            </div>
            <div className="flex flex-1 flex-col justify-between border-1 rounded-3xl border-black bg-hot-blue">
              <div className="flex flex-col my-8 ml-8 mr-20">
                <h1 className='text-7xl font-medium font-header leading-tight'>Jim Kettelkamp</h1>
                <h3 className='text-2xl font-light font-header ml-2 leading-tight'>Nature Enthusiast - Birder</h3>
              </div>
              <div className="flex my-8 ml-8 mr-20">
                <h1 className='text-3xl font-medium font-header leading-tight'>Take a look into my views on nature and life journey as an avid birder</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Select Board button divs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }} className="flex hover:bg-egg-white hover:cursor-pointer bg-white border-1 rounded-3xl border-black mx-0.5">
        <div className="w-screen flex items-center">
          <h2 className='text-3xl font-header font-normal my-8 ml-8'>Services</h2>
          {/* Arrow SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-9 my-8 ml-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" transform="rotate(45)">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M18 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </motion.div>

      {/* Boards */}
      <div className="grid grid-cols-3 rounded-3xl border-1  mx-0.5 my-0.5 gap-0.5">
        <Link href="/guide">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01]
            }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            className="flex-1 relative opacity-0 border-1 bg-white h-[80vh] hover:bg-sexy-yellow transition-all duration-300 cursor-pointer rounded-3xl border-black z-10"
          >

            <div className="flex items-center justify-center h-full mx-2">
              <Image src="/img/finn-pix.jpg" alt="Chupacabra" width={500} height={500} className="rounded-3xl" />
            </div>

            {/* Label */}
            <motion.div
              className='flex absolute bottom-2 items-center justify-center w-full'
              initial={{ y: 0, opacity: 0 }}
              animate={controls}>
              <h2 className='font-body text-3xl'>Guided Tours</h2>
            </motion.div>

          </motion.div>
        </Link>
        <Link href="/blog">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01]
            }}
            onHoverStart={handleHoverStart2}
            onHoverEnd={handleHoverEnd2}
            className="flex-1 flex items-center justify-center relative border-1 bg-white h-[80vh] hover:bg-hot-blue transition-all duration-300 cursor-pointer rounded-3xl border-black">

            <motion.div className="flex items-center justify-center h-full mx-2">
              <Image src="/img/iowa-film.jpg" alt="Chupacabra" width={500} height={600} className="rounded-3xl" />
            </motion.div>

            <motion.div
              className='flex absolute bottom-2 items-center justify-center w-full'
              initial={{ y: 0, opacity: 0 }}
              animate={controls2}>
              <h2 className='font-body text-3xl'>Blog</h2>
            </motion.div>

          </motion.div>
        </Link>
        <Link href="/blob">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01]
            }}
            onHoverStart={handleHoverStart3}
            onHoverEnd={handleHoverEnd3}
            className="flex-1 relative opacity-0 border-1 bg-white h-[80vh] hover:bg-sexy-yellow transition-all duration-300 cursor-pointer rounded-3xl border-black">

            <motion.div
              className='flex absolute bottom-2 items-center justify-center w-full'
              initial={{ y: 0, opacity: 0 }}
              animate={controls3}>
              <h2 className='font-body text-3xl'>Conservation</h2>
            </motion.div>

          </motion.div>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className="flex flex-col hover:bg-egg-white hover:cursor-pointer bg-white border-1 rounded-3xl border-black mx-0.5"
      >
        <div className="w-screen flex items-center">
          <h2 className='text-3xl font-header font-normal my-8 ml-8'>Contact</h2>
          {/* Arrow SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-9 my-8 ml-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" transform="rotate(45)">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M18 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>

      </motion.div>

    </>
  )
}


export function pageExtra() {
  return (
    <>
      {/* Header Component */}
      <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
        {/* jumbo */}
        <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
          <p className='w-full uppercase'>Next.js React Three Fiber</p>
          <h1 className='my-4 text-5xl font-bold leading-tight'>Next 3D</h1>
          <p className='mb-8 text-2xl leading-normal'>A minimalist starter for React, React-three-fiber and Threejs.</p>
        </div>

        {/* Logo */}
        <div className='w-full text-center md:w-3/5'>
          <View className='flex h-96 w-full flex-col items-center justify-center'>
            <Suspense fallback={null}>
              <Logo route='/blob' scale={0.8} position={[0, 0, 0]} />
              <Common />
            </Suspense>
          </View>
        </div>
      </div>


      <div className='mx-auto flex w-full flex-col flex-wrap items-center p-12 md:flex-row  lg:w-4/5'>
        {/* first row */}
        <div className='relative h-48 w-full py-6 sm:w-1/2 md:my-12 md:mb-40'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-gray-800'>3D Item</h2>
          <p className='mb-8 text-gray-600'>Drag, scroll, pinch, and rotate the canvas to explore the 3D scene.</p>
        </div>
        <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
          <View orbit className='relative h-full  sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <Dog scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
              <Common color={'lightpink'} />
            </Suspense>
          </View>
        </div>
        {/* second row */}
        <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
          <View orbit className='relative h-full animate-bounce sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <Duck route='/blob' scale={2} position={[0, -1.6, 0]} />
              <Common color={'lightblue'} />
            </Suspense>
          </View>
        </div>
        <div className='w-full p-6 sm:w-1/2'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-gray-800'>Dom and 3D are synchronized</h2>
          <p className='mb-8 text-gray-600'>
            3D Divs are renderer through the View component. It uses gl.scissor to cut the viewport into segments. You
            tie a view to a tracking div which then controls the position and bounds of the viewport. This allows you to
            have multiple views with a single, performant canvas. These views will follow their tracking elements,
            scroll along, resize, etc.
          </p>
        </div>
      </div>
    </>
  )
}