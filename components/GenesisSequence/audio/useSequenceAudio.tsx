import { useRef, useCallback } from 'react'
import { Howl } from 'howler'
import type { SequencePhase } from '../index'

// Audio configuration for each phase
// In production, these would be actual audio files
// For now, we'll use Web Audio API to generate tones

export function useSequenceAudio() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])
  const gainNodeRef = useRef<GainNode | null>(null)

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      gainNodeRef.current = audioContextRef.current.createGain()
      gainNodeRef.current.connect(audioContextRef.current.destination)
      gainNodeRef.current.gain.value = 0.1 // Master volume
    }
    return audioContextRef.current
  }, [])

  const stopAll = useCallback(() => {
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop()
        osc.disconnect()
      } catch (e) {
        // Already stopped
      }
    })
    oscillatorsRef.current = []
  }, [])

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1)
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration)

    oscillator.connect(gainNode)
    gainNode.connect(gainNodeRef.current!)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + duration)

    oscillatorsRef.current.push(oscillator)

    return oscillator
  }, [getAudioContext])

  const playPhaseAudio = useCallback((phase: SequencePhase) => {
    stopAll()

    switch (phase) {
      case 'void':
        // Subtle white noise / distant tones
        playTone(80, 10, 'sine')
        playTone(120, 10, 'sine')
        break

      case 'gravity':
        // Building low hum
        playTone(40, 15, 'sine')
        playTone(60, 15, 'sine')
        playTone(80, 15, 'triangle')
        // Add harmonic at 5 seconds
        setTimeout(() => playTone(120, 10, 'sine'), 5000)
        break

      case 'synthesis':
        // Crystalline chimes - higher frequencies
        playTone(440, 15, 'sine')
        playTone(554, 15, 'sine')
        playTone(659, 15, 'sine')
        // Random forge sounds
        const forgeInterval = setInterval(() => {
          playTone(200 + Math.random() * 400, 0.3, 'sawtooth')
        }, 500)
        setTimeout(() => clearInterval(forgeInterval), 14000)
        break

      case 'assembly':
        // Mechanical clicks - percussive
        playTone(100, 15, 'sine')
        const clickInterval = setInterval(() => {
          playTone(800, 0.05, 'square')
          setTimeout(() => playTone(600, 0.05, 'square'), 50)
        }, 800)
        setTimeout(() => clearInterval(clickInterval), 14000)
        break

      case 'crystallization':
        // Harmonic convergence - chord building
        playTone(130.81, 15, 'sine') // C3
        setTimeout(() => playTone(164.81, 12, 'sine'), 3000) // E3
        setTimeout(() => playTone(196.00, 9, 'sine'), 6000) // G3
        setTimeout(() => playTone(261.63, 6, 'sine'), 9000) // C4
        break

      case 'invention':
        // Silence then resonant tone
        setTimeout(() => {
          // Perfect fifth chord
          playTone(130.81, 10, 'sine') // C3
          playTone(196.00, 10, 'sine') // G3
          playTone(261.63, 10, 'sine') // C4
          playTone(392.00, 10, 'sine') // G4
        }, 3000)
        break

      case 'complete':
        // Fade out
        stopAll()
        break
    }
  }, [playTone, stopAll])

  return { playPhaseAudio, stopAll }
}

export default useSequenceAudio
