import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

interface InventionRevealProps {
  active: boolean
  progress: number
}

export function InventionReveal({ active, progress }: InventionRevealProps) {
  const groupRef = useRef<THREE.Group>(null)
  const dRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  // The "D" structure built from geometric shapes
  const dStructure = useMemo(() => {
    // Create points that form the letter D
    return [
      // Vertical bar
      { pos: [0, 4, 0], scale: 1 },
      { pos: [0, 2, 0], scale: 1 },
      { pos: [0, 0, 0], scale: 1 },
      { pos: [0, -2, 0], scale: 1 },
      { pos: [0, -4, 0], scale: 1 },
      // Curve of D
      { pos: [2, 3, 0], scale: 0.8 },
      { pos: [3.5, 1.5, 0], scale: 0.8 },
      { pos: [4, 0, 0], scale: 0.8 },
      { pos: [3.5, -1.5, 0], scale: 0.8 },
      { pos: [2, -3, 0], scale: 0.8 },
    ] as { pos: [number, number, number]; scale: number }[]
  }, [])

  useFrame((state) => {
    if (!active && progress === 0) return
    if (!groupRef.current || !dRef.current) return

    const time = state.clock.elapsedTime

    // Rotate the entire structure for reveal
    // Start from side view, rotate to front
    const rotationProgress = easeOutQuart(Math.min(1, progress * 1.5))
    dRef.current.rotation.y = Math.PI * 0.5 * (1 - rotationProgress)

    // Scale up as it reveals
    const scaleProgress = easeOutBack(Math.min(1, progress * 1.2))
    dRef.current.scale.setScalar(scaleProgress * 2)

    // Pulsing glow
    if (glowRef.current) {
      const pulse = 1 + Math.sin(time * 2) * 0.1
      glowRef.current.scale.setScalar(scaleProgress * 12 * pulse)
      ;(glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        progress * 0.2 * (1 + Math.sin(time * 3) * 0.3)
    }

    // Animate individual components of the D
    groupRef.current.children.forEach((child, i) => {
      if (!(child instanceof THREE.Mesh)) return

      const delay = i * 0.05
      const componentProgress = Math.max(0, Math.min(1, (progress - delay) / 0.5))

      // Scale from 0
      child.scale.setScalar(easeOutBack(componentProgress) * dStructure[i]?.scale || 1)

      // Subtle rotation
      child.rotation.x = time * 0.5
      child.rotation.y = time * 0.3
    })
  })

  if (!active && progress === 0) return null

  return (
    <group>
      {/* The D structure */}
      <group ref={dRef}>
        <group ref={groupRef}>
          {dStructure.map((point, i) => (
            <mesh key={i} position={point.pos}>
              <octahedronGeometry args={[1, 0]} />
              <meshBasicMaterial
                color={i < 5 ? '#18E6FF' : '#7B2CFF'}
                transparent
                opacity={0.9}
              />
            </mesh>
          ))}
        </group>

        {/* Connecting lines within the D */}
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={dStructure.length}
              array={new Float32Array(dStructure.flatMap(p => p.pos))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#18E6FF" transparent opacity={progress * 0.5} />
        </line>
      </group>

      {/* Background glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#7B2CFF"
          transparent
          opacity={0}
        />
      </mesh>

      {/* Radiating rings */}
      {[1, 2, 3].map((ring) => (
        <mesh
          key={ring}
          rotation={[Math.PI / 2, 0, 0]}
          scale={progress * ring * 8}
        >
          <ringGeometry args={[0.9, 1, 64]} />
          <meshBasicMaterial
            color="#18E6FF"
            transparent
            opacity={Math.max(0, (1 - ring * 0.3) * progress * 0.3)}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Final pulse on completion */}
      {progress > 0.9 && (
        <mesh scale={(progress - 0.9) * 100}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={Math.max(0, 1 - (progress - 0.9) * 10)}
          />
        </mesh>
      )}
    </group>
  )
}

function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4)
}

function easeOutBack(x: number): number {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}

export default InventionReveal
