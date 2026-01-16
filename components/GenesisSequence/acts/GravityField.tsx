import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface GravityFieldProps {
  active: boolean
  progress: number
}

export function GravityField({ active, progress }: GravityFieldProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const trailsRef = useRef<THREE.LineSegments>(null)

  // Orbital particles that will be attracted to center
  const particleCount = 500
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      initialPos: new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60
      ),
      velocity: new THREE.Vector3(),
      orbitRadius: 10 + Math.random() * 30,
      orbitSpeed: 0.2 + Math.random() * 0.8,
      orbitPhase: Math.random() * Math.PI * 2
    }))
  }, [])

  // Trail geometry
  const trailPositions = useMemo(() => new Float32Array(particleCount * 6), [])

  useFrame((state) => {
    if (!active && progress === 0) return
    if (!groupRef.current || !coreRef.current) return

    const time = state.clock.elapsedTime

    // Pulsing gravitational core
    const corePulse = 1 + Math.sin(time * 2) * 0.1
    coreRef.current.scale.setScalar(corePulse * progress * 3)

    // Update particles - attraction toward center
    groupRef.current.children.forEach((child, i) => {
      if (i >= particles.length) return
      if (!(child instanceof THREE.Mesh)) return

      const particle = particles[i]
      const targetRadius = particle.orbitRadius * (1 - progress * 0.7)

      // Calculate orbital position
      const angle = particle.orbitPhase + time * particle.orbitSpeed
      const targetX = Math.cos(angle) * targetRadius
      const targetY = Math.sin(angle * 0.7) * targetRadius * 0.5
      const targetZ = Math.sin(angle) * targetRadius

      // Lerp from initial scattered position to orbital position
      const lerpFactor = Math.min(1, progress * 2)
      child.position.lerpVectors(
        particle.initialPos,
        new THREE.Vector3(targetX, targetY, targetZ),
        lerpFactor
      )

      // Update trail positions
      if (trailsRef.current) {
        const geo = trailsRef.current.geometry
        const positions = geo.attributes.position.array as Float32Array
        positions[i * 6] = child.position.x
        positions[i * 6 + 1] = child.position.y
        positions[i * 6 + 2] = child.position.z
        positions[i * 6 + 3] = child.position.x * 0.95
        positions[i * 6 + 4] = child.position.y * 0.95
        positions[i * 6 + 5] = child.position.z * 0.95
        geo.attributes.position.needsUpdate = true
      }
    })
  })

  if (!active && progress === 0) return null

  return (
    <group>
      {/* Gravitational core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#7B2CFF"
          transparent
          opacity={progress * 0.8}
        />
      </mesh>

      {/* Core glow */}
      <mesh scale={progress * 5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#7B2CFF"
          transparent
          opacity={progress * 0.2}
        />
      </mesh>

      {/* Orbital particles */}
      <group ref={groupRef}>
        {particles.map((p) => (
          <mesh key={p.id} position={p.initialPos.toArray()}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshBasicMaterial
              color="#18E6FF"
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Connection trails */}
      <lineSegments ref={trailsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount * 2}
            array={trailPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#18E6FF"
          transparent
          opacity={progress * 0.3}
        />
      </lineSegments>
    </group>
  )
}

export default GravityField
