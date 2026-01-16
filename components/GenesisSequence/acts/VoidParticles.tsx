import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'

interface VoidParticlesProps {
  active: boolean
  progress: number
}

const WORDS = [
  'signal', 'research', 'pattern', 'data', 'insight', 'noise',
  'fragment', 'hypothesis', 'synthesis', 'discovery', 'vision',
  'invention', 'architecture', 'sovereign', 'intelligence'
]

export function VoidParticles({ active, progress }: VoidParticlesProps) {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Generate random positions for word particles
  const wordPositions = useMemo(() => {
    return WORDS.map(() => ({
      x: (Math.random() - 0.5) * 80,
      y: (Math.random() - 0.5) * 60,
      z: (Math.random() - 0.5) * 40,
      delay: Math.random() * 5,
      speed: 0.5 + Math.random() * 0.5
    }))
  }, [])

  // Background particle system
  const particleCount = 2000
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!groupRef.current || !particlesRef.current) return

    const time = state.clock.elapsedTime

    // Rotate the particle field slowly
    particlesRef.current.rotation.y = time * 0.02
    particlesRef.current.rotation.x = time * 0.01

    // Pulse effect on words based on progress
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Group) {
        const wordData = wordPositions[i]
        const appearTime = wordData.delay
        const fadeIn = Math.max(0, Math.min(1, (progress * 10 - appearTime) / 2))

        child.children.forEach(mesh => {
          if (mesh instanceof THREE.Mesh) {
            (mesh.material as THREE.MeshBasicMaterial).opacity = fadeIn * 0.6
          }
        })

        // Subtle floating motion
        child.position.y += Math.sin(time * wordData.speed + i) * 0.001
      }
    })
  })

  return (
    <group visible={active || progress > 0}>
      {/* Background particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.3}
          color="#18E6FF"
          transparent
          opacity={0.15 * progress}
          sizeAttenuation
        />
      </points>

      {/* Floating words */}
      <group ref={groupRef}>
        {WORDS.map((word, i) => {
          const pos = wordPositions[i]
          return (
            <Float
              key={word}
              speed={pos.speed}
              rotationIntensity={0.2}
              floatIntensity={0.5}
            >
              <group position={[pos.x, pos.y, pos.z]}>
                <Text
                  fontSize={1.5}
                  color="#18E6FF"
                  anchorX="center"
                  anchorY="middle"
                  font="/fonts/mono.woff"
                  fillOpacity={0}
                >
                  {word}
                  <meshBasicMaterial
                    transparent
                    opacity={0}
                    color="#18E6FF"
                  />
                </Text>
              </group>
            </Float>
          )
        })}
      </group>
    </group>
  )
}

export default VoidParticles
