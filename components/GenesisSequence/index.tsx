import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect, useRef } from 'react'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { VoidParticles } from './acts/VoidParticles'
import { GravityField } from './acts/GravityField'
import { SynthesisForge } from './acts/SynthesisForge'
import { AssemblyDock } from './acts/AssemblyDock'
import { CrystallizationForm } from './acts/CrystallizationForm'
import { InventionReveal } from './acts/InventionReveal'
import { useSequenceAudio } from './audio/useSequenceAudio'

export type SequencePhase =
  | 'void'
  | 'gravity'
  | 'synthesis'
  | 'assembly'
  | 'crystallization'
  | 'invention'
  | 'complete'

interface GenesisSequenceProps {
  onComplete?: () => void
  autoPlay?: boolean
}

export function GenesisSequence({ onComplete, autoPlay = true }: GenesisSequenceProps) {
  const [phase, setPhase] = useState<SequencePhase>('void')
  const [progress, setProgress] = useState(0)
  const [showSkip, setShowSkip] = useState(false)
  const { playPhaseAudio, stopAll } = useSequenceAudio()

  // Phase timing (in seconds)
  const phaseDurations: Record<SequencePhase, number> = {
    void: 10,
    gravity: 15,
    synthesis: 15,
    assembly: 15,
    crystallization: 15,
    invention: 15,
    complete: 0
  }

  const phases: SequencePhase[] = [
    'void', 'gravity', 'synthesis', 'assembly', 'crystallization', 'invention', 'complete'
  ]

  useEffect(() => {
    // Show skip button after 5 seconds
    const skipTimer = setTimeout(() => setShowSkip(true), 5000)
    return () => clearTimeout(skipTimer)
  }, [])

  useEffect(() => {
    if (!autoPlay) return

    playPhaseAudio(phase)

    const duration = phaseDurations[phase] * 1000
    if (duration === 0) {
      onComplete?.()
      return
    }

    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const phaseProgress = Math.min(elapsed / duration, 1)
      setProgress(phaseProgress)

      if (phaseProgress >= 1) {
        clearInterval(interval)
        const currentIndex = phases.indexOf(phase)
        if (currentIndex < phases.length - 1) {
          setPhase(phases[currentIndex + 1])
          setProgress(0)
        }
      }
    }, 16)

    return () => clearInterval(interval)
  }, [phase, autoPlay])

  const handleSkip = () => {
    stopAll()
    setPhase('complete')
    onComplete?.()
  }

  if (phase === 'complete') {
    return null
  }

  return (
    <div className="genesis-sequence" style={{
      position: 'fixed',
      inset: 0,
      background: '#000',
      zIndex: 9999
    }}>
      <Canvas
        camera={{ position: [0, 0, 50], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#000000']} />

        <Suspense fallback={null}>
          {/* Act I: The Void */}
          <VoidParticles
            active={phase === 'void'}
            progress={phase === 'void' ? progress : phase === 'gravity' ? 1 : 0}
          />

          {/* Act II: Gravity */}
          <GravityField
            active={phase === 'gravity'}
            progress={phase === 'gravity' ? progress : 0}
          />

          {/* Act III: Synthesis */}
          <SynthesisForge
            active={phase === 'synthesis'}
            progress={phase === 'synthesis' ? progress : 0}
          />

          {/* Act IV: Assembly */}
          <AssemblyDock
            active={phase === 'assembly'}
            progress={phase === 'assembly' ? progress : 0}
          />

          {/* Act V: Crystallization */}
          <CrystallizationForm
            active={phase === 'crystallization'}
            progress={phase === 'crystallization' ? progress : 0}
          />

          {/* Act VI: Invention */}
          <InventionReveal
            active={phase === 'invention'}
            progress={phase === 'invention' ? progress : 0}
          />
        </Suspense>

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0005, 0.0005]}
          />
          <Vignette darkness={0.5} />
        </EffectComposer>
      </Canvas>

      {/* Phase indicator */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 8
      }}>
        {phases.slice(0, -1).map((p, i) => (
          <div
            key={p}
            style={{
              width: 40,
              height: 2,
              background: phases.indexOf(phase) >= i ? '#18E6FF' : '#333',
              transition: 'background 0.5s'
            }}
          />
        ))}
      </div>

      {/* Skip button */}
      {showSkip && (
        <button
          onClick={handleSkip}
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            background: 'transparent',
            border: '1px solid #333',
            color: '#666',
            padding: '8px 16px',
            fontSize: 12,
            fontFamily: 'monospace',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#18E6FF'
            e.currentTarget.style.color = '#18E6FF'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#333'
            e.currentTarget.style.color = '#666'
          }}
        >
          SKIP
        </button>
      )}

      {/* Tagline reveal for final phase */}
      {phase === 'invention' && progress > 0.7 && (
        <div style={{
          position: 'absolute',
          bottom: 120,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity: (progress - 0.7) / 0.3,
          transition: 'opacity 0.5s'
        }}>
          <p style={{
            fontFamily: 'system-ui',
            fontSize: 24,
            color: '#fff',
            margin: 0,
            letterSpacing: 2
          }}>
            <span style={{ color: '#fff' }}>Let the invention be </span>
            <span style={{ color: '#18E6FF' }}>hidden</span>
            <span style={{ color: '#fff' }}> in your </span>
            <span style={{
              background: 'linear-gradient(90deg, #FF3DF2, #18E6FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>vision.</span>
          </p>
          <p style={{
            fontFamily: 'monospace',
            fontSize: 12,
            color: '#666',
            marginTop: 16,
            letterSpacing: 4
          }}>
            METAVENTIONS AI
          </p>
        </div>
      )}
    </div>
  )
}

export default GenesisSequence
