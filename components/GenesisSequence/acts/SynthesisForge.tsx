import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SynthesisForgeProps {
  active: boolean
  progress: number
}

export function SynthesisForge({ active, progress }: SynthesisForgeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const sparksRef = useRef<THREE.Points>(null)

  // Artifacts that will be forged
  const artifacts = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      position: new THREE.Vector3(
        Math.cos(i * Math.PI / 4) * 15,
        Math.sin(i * Math.PI / 4) * 10,
        (Math.random() - 0.5) * 10
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      forgeTime: i * 0.1,
      type: ['diamond', 'cube', 'octahedron'][i % 3]
    }))
  }, [])

  // Spark particles for forge effect
  const sparkCount = 300
  const sparkPositions = useMemo(() => {
    const pos = new Float32Array(sparkCount * 3)
    for (let i = 0; i < sparkCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!active && progress === 0) return
    if (!groupRef.current || !sparksRef.current) return

    const time = state.clock.elapsedTime

    // Update sparks - explosive when forging
    const sparkGeo = sparksRef.current.geometry
    const positions = sparkGeo.attributes.position.array as Float32Array
    for (let i = 0; i < sparkCount; i++) {
      const forgeProgress = Math.sin(progress * Math.PI)
      positions[i * 3] += (Math.random() - 0.5) * forgeProgress * 0.5
      positions[i * 3 + 1] += (Math.random() - 0.5) * forgeProgress * 0.5
      positions[i * 3 + 2] += (Math.random() - 0.5) * forgeProgress * 0.5

      // Reset particles that go too far
      const dist = Math.sqrt(
        positions[i * 3] ** 2 +
        positions[i * 3 + 1] ** 2 +
        positions[i * 3 + 2] ** 2
      )
      if (dist > 50) {
        positions[i * 3] = (Math.random() - 0.5) * 10
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      }
    }
    sparkGeo.attributes.position.needsUpdate = true

    // Rotate artifacts and scale based on forge progress
    groupRef.current.children.forEach((child, i) => {
      if (i >= artifacts.length) return
      if (!(child instanceof THREE.Mesh)) return

      const artifact = artifacts[i]
      const forgeStart = artifact.forgeTime
      const artifactProgress = Math.max(0, Math.min(1, (progress - forgeStart) / 0.3))

      child.scale.setScalar(artifactProgress)
      child.rotation.x += 0.01
      child.rotation.y += 0.02

      // Glow effect
      const material = child.material as THREE.MeshBasicMaterial
      material.opacity = artifactProgress * 0.9
    })
  })

  if (!active && progress === 0) return null

  return (
    <group>
      {/* Forge sparks */}
      <points ref={sparksRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={sparkCount}
            array={sparkPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          color="#FF3DF2"
          transparent
          opacity={Math.sin(progress * Math.PI) * 0.8}
          sizeAttenuation
        />
      </points>

      {/* Forged artifacts */}
      <group ref={groupRef}>
        {artifacts.map((artifact) => (
          <mesh
            key={artifact.id}
            position={artifact.position.toArray()}
            rotation={artifact.rotation.toArray() as [number, number, number]}
            scale={0}
          >
            {artifact.type === 'diamond' && <octahedronGeometry args={[2, 0]} />}
            {artifact.type === 'cube' && <boxGeometry args={[2.5, 2.5, 2.5]} />}
            {artifact.type === 'octahedron' && <icosahedronGeometry args={[2, 0]} />}
            <meshBasicMaterial
              color="#18E6FF"
              transparent
              opacity={0}
              wireframe
            />
          </mesh>
        ))}
      </group>

      {/* Central forge glow */}
      <mesh scale={Math.sin(progress * Math.PI) * 5}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#FF3DF2"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

export default SynthesisForge
