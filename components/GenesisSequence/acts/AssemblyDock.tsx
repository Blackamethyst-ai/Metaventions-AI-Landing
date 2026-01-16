import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AssemblyDockProps {
  active: boolean
  progress: number
}

export function AssemblyDock({ active, progress }: AssemblyDockProps) {
  const groupRef = useRef<THREE.Group>(null)
  const connectionsRef = useRef<THREE.LineSegments>(null)

  // Components that will dock together
  const components = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      startPosition: new THREE.Vector3(
        Math.cos(i * Math.PI / 3) * 25,
        Math.sin(i * Math.PI / 3) * 20,
        (Math.random() - 0.5) * 15
      ),
      endPosition: new THREE.Vector3(
        Math.cos(i * Math.PI / 3) * 8,
        Math.sin(i * Math.PI / 3) * 6,
        0
      ),
      dockTime: i * 0.15
    }))
  }, [])

  // Connection lines between docked components
  const connectionPositions = useMemo(() => {
    const positions = new Float32Array(components.length * 6)
    return positions
  }, [])

  useFrame((state) => {
    if (!active && progress === 0) return
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    // Move components toward docking positions
    groupRef.current.children.forEach((child, i) => {
      if (i >= components.length) return
      if (!(child instanceof THREE.Group)) return

      const component = components[i]
      const dockProgress = Math.max(0, Math.min(1, (progress - component.dockTime) / 0.4))

      // Lerp position
      const currentPos = new THREE.Vector3().lerpVectors(
        component.startPosition,
        component.endPosition,
        easeOutCubic(dockProgress)
      )
      child.position.copy(currentPos)

      // Rotate while docking
      child.rotation.x = (1 - dockProgress) * time * 0.5
      child.rotation.y = (1 - dockProgress) * time * 0.3

      // Scale up as it docks
      const scale = 0.5 + dockProgress * 0.5
      child.scale.setScalar(scale)
    })

    // Update connection lines
    if (connectionsRef.current) {
      const geo = connectionsRef.current.geometry
      const positions = geo.attributes.position.array as Float32Array

      groupRef.current.children.forEach((child, i) => {
        if (i >= components.length - 1) return
        const next = groupRef.current!.children[i + 1]
        if (!child.position || !next.position) return

        positions[i * 6] = child.position.x
        positions[i * 6 + 1] = child.position.y
        positions[i * 6 + 2] = child.position.z
        positions[i * 6 + 3] = next.position.x
        positions[i * 6 + 4] = next.position.y
        positions[i * 6 + 5] = next.position.z
      })
      geo.attributes.position.needsUpdate = true
    }
  })

  if (!active && progress === 0) return null

  return (
    <group>
      {/* Docking components */}
      <group ref={groupRef}>
        {components.map((component) => (
          <group key={component.id} position={component.startPosition.toArray()}>
            {/* Outer shell */}
            <mesh>
              <dodecahedronGeometry args={[3, 0]} />
              <meshBasicMaterial
                color="#18E6FF"
                transparent
                opacity={0.3}
                wireframe
              />
            </mesh>
            {/* Inner core */}
            <mesh>
              <octahedronGeometry args={[1.5, 0]} />
              <meshBasicMaterial
                color="#7B2CFF"
                transparent
                opacity={0.8}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Connection lines */}
      <lineSegments ref={connectionsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={(components.length - 1) * 2}
            array={connectionPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#FFD700"
          transparent
          opacity={progress * 0.6}
        />
      </lineSegments>

      {/* Dock point indicator */}
      <mesh>
        <ringGeometry args={[7, 8, 32]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={progress * 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3)
}

export default AssemblyDock
