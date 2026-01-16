import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CrystallizationFormProps {
  active: boolean
  progress: number
}

export function CrystallizationForm({ active, progress }: CrystallizationFormProps) {
  const groupRef = useRef<THREE.Group>(null)
  const moduleRefs = useRef<THREE.Mesh[]>([])
  const energyRef = useRef<THREE.Points>(null)

  // Modules that will crystallize into final form
  const modules = useMemo(() => {
    return [
      { id: 0, position: new THREE.Vector3(0, 8, 0), targetPos: new THREE.Vector3(0, 6, 0) },
      { id: 1, position: new THREE.Vector3(-10, 0, 0), targetPos: new THREE.Vector3(-4, 0, 0) },
      { id: 2, position: new THREE.Vector3(10, 0, 0), targetPos: new THREE.Vector3(4, 0, 0) },
      { id: 3, position: new THREE.Vector3(0, -8, 0), targetPos: new THREE.Vector3(0, -6, 0) },
      { id: 4, position: new THREE.Vector3(0, 0, 10), targetPos: new THREE.Vector3(0, 0, 4) },
      { id: 5, position: new THREE.Vector3(0, 0, -10), targetPos: new THREE.Vector3(0, 0, -4) }
    ]
  }, [])

  // Energy particles swirling around
  const energyCount = 400
  const energyPositions = useMemo(() => {
    const pos = new Float32Array(energyCount * 3)
    for (let i = 0; i < energyCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 15 + Math.random() * 10
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!active && progress === 0) return
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    // Modules converge toward center
    groupRef.current.children.forEach((child, i) => {
      if (i >= modules.length) return
      if (!(child instanceof THREE.Mesh)) return

      const module = modules[i]
      const convergeFactor = easeInOutQuad(progress)

      // Lerp to target position
      child.position.lerpVectors(
        module.position,
        module.targetPos,
        convergeFactor
      )

      // Rotate and pulse
      child.rotation.x = time * 0.2 * (1 - progress)
      child.rotation.y = time * 0.3 * (1 - progress)

      // Color shift from cyan to full spectrum
      const hue = (i / modules.length + time * 0.1) % 1
      const color = new THREE.Color().setHSL(hue, 1, 0.5)
      ;(child.material as THREE.MeshBasicMaterial).color = color
    })

    // Energy particles spiral inward
    if (energyRef.current) {
      const geo = energyRef.current.geometry
      const positions = geo.attributes.position.array as Float32Array

      for (let i = 0; i < energyCount; i++) {
        const idx = i * 3
        const x = positions[idx]
        const y = positions[idx + 1]
        const z = positions[idx + 2]

        // Spiral inward based on progress
        const r = Math.sqrt(x * x + y * y + z * z)
        const targetR = r * (1 - progress * 0.5)
        const scale = targetR / r

        positions[idx] *= scale
        positions[idx + 1] *= scale
        positions[idx + 2] *= scale

        // Add rotation
        const angle = time * 2 + i * 0.01
        const cos = Math.cos(angle * 0.01)
        const sin = Math.sin(angle * 0.01)
        const newX = positions[idx] * cos - positions[idx + 2] * sin
        const newZ = positions[idx] * sin + positions[idx + 2] * cos
        positions[idx] = newX
        positions[idx + 2] = newZ

        // Reset if too close to center
        if (targetR < 3) {
          const theta = Math.random() * Math.PI * 2
          const phi = Math.random() * Math.PI
          const newR = 15 + Math.random() * 10
          positions[idx] = newR * Math.sin(phi) * Math.cos(theta)
          positions[idx + 1] = newR * Math.sin(phi) * Math.sin(theta)
          positions[idx + 2] = newR * Math.cos(phi)
        }
      }
      geo.attributes.position.needsUpdate = true
    }
  })

  if (!active && progress === 0) return null

  return (
    <group>
      {/* Crystallizing modules */}
      <group ref={groupRef}>
        {modules.map((module) => (
          <mesh
            key={module.id}
            position={module.position.toArray()}
            ref={(el) => { if (el) moduleRefs.current[module.id] = el }}
          >
            <icosahedronGeometry args={[3, 1]} />
            <meshBasicMaterial
              color="#18E6FF"
              transparent
              opacity={0.7}
              wireframe
            />
          </mesh>
        ))}
      </group>

      {/* Energy field */}
      <points ref={energyRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={energyCount}
            array={energyPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.4}
          transparent
          opacity={0.6}
          vertexColors={false}
          color={new THREE.Color().setHSL(progress * 0.3, 1, 0.5)}
          sizeAttenuation
        />
      </points>

      {/* Central convergence glow */}
      <mesh scale={progress * 8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={progress * 0.3}
        />
      </mesh>
    </group>
  )
}

function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
}

export default CrystallizationForm
