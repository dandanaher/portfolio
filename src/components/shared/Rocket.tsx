import { useState, useRef, useEffect } from "react";
import falcon9Audio from "@/assets/audio/falcon9-engine.mp3";

interface Point {
  x: number;
  y: number;
}

interface HoseState {
  id: 'lox' | 'rp1';
  connected: boolean;
  segments: Point[];
  endPoint: Point;
  isDragging: boolean;
}

const Rocket = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [hasLaunched, setHasLaunched] = useState(false);
  const [isLandingBurn, setIsLandingBurn] = useState(false);
  const [legsDeployed, setLegsDeployed] = useState(false);

  // Fueling system state
  const [loxLevel, setLoxLevel] = useState(0); // 0-100 (booster)
  const [rp1Level, setRp1Level] = useState(0); // 0-100 (booster)
  const [secondStageLoxLevel, setSecondStageLoxLevel] = useState(0); // 0-100 (second stage)
  const [secondStageRp1Level, setSecondStageRp1Level] = useState(0); // 0-100 (second stage)
  const [hoses, setHoses] = useState<HoseState[]>([
    { id: 'lox', connected: false, segments: [], endPoint: { x: 0, y: 0 }, isDragging: false },
    { id: 'rp1', connected: false, segments: [], endPoint: { x: 0, y: 0 }, isDragging: false }
  ]);

  const launchAudioRef = useRef<HTMLAudioElement | null>(null);
  const landingAudioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    // Initialize audio elements with imported audio file
    try {
      launchAudioRef.current = new Audio(falcon9Audio);
      landingAudioRef.current = new Audio(falcon9Audio);

      // Set volumes - launch is louder
      launchAudioRef.current.volume = 0.7;
      landingAudioRef.current.volume = 0.4;
    } catch (error) {
      console.log('Audio initialization failed:', error);
    }

    // Initialize hose positions based on tower position - starting from left side of tower
    const initializeHoses = () => {
      setHoses([
        {
          id: 'lox',
          connected: false,
          segments: Array(10).fill(null).map((_, i) => ({ x: 65, y: 140 + i * 5 })),
          endPoint: { x: 65, y: 185 },
          isDragging: false
        },
        {
          id: 'rp1',
          connected: false,
          segments: Array(10).fill(null).map((_, i) => ({ x: 65, y: 170 + i * 5 })),
          endPoint: { x: 65, y: 215 },
          isDragging: false
        }
      ]);
    };

    initializeHoses();
  }, []);

  // Global mouse/touch event handlers for dragging
  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      const draggingHose = hoses.find(h => h.isDragging);
      if (!draggingHose) return;

      handleHoseDrag(e as any);
    };

    const handleGlobalEnd = () => {
      if (hoses.some(h => h.isDragging)) {
        handleHoseDragEnd();
      }
    };

    document.addEventListener('mousemove', handleGlobalMove);
    document.addEventListener('mouseup', handleGlobalEnd);
    document.addEventListener('touchmove', handleGlobalMove);
    document.addEventListener('touchend', handleGlobalEnd);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMove);
      document.removeEventListener('mouseup', handleGlobalEnd);
      document.removeEventListener('touchmove', handleGlobalMove);
      document.removeEventListener('touchend', handleGlobalEnd);
    };
  }, [hoses]);

  // Physics simulation for hose rope dynamics
  useEffect(() => {
    // Physics always runs for disconnected hoses

    const simulatePhysics = () => {
      setHoses(prev => prev.map(hose => {
        if (hose.connected || hose.isDragging) return hose;

        const newSegments = [...hose.segments];
        const startPoint = { x: 65, y: hose.id === 'lox' ? 140 : 170 };

        // Verlet integration for rope physics
        for (let i = 1; i < newSegments.length; i++) {
          const segment = newSegments[i];
          const prevSegment = i === 0 ? startPoint : newSegments[i - 1];

          // Apply gravity
          const gravity = 0.3;
          segment.y += gravity;

          // Constrain distance to previous segment
          const dx = segment.x - prevSegment.x;
          const dy = segment.y - prevSegment.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const segmentLength = 5;

          if (distance > segmentLength) {
            const diff = (distance - segmentLength) / distance;
            segment.x -= dx * diff * 0.5;
            segment.y -= dy * diff * 0.5;
          }
        }

        // Update end point to follow last segment
        const lastSegment = newSegments[newSegments.length - 1];
        return {
          ...hose,
          segments: newSegments,
          endPoint: { ...lastSegment }
        };
      }));

      animationFrameRef.current = requestAnimationFrame(simulatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(simulatePhysics);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Run continuously, no dependencies

  // Track connection status separately to avoid physics updates triggering this effect
  const [loxConnected, setLoxConnected] = useState(false);
  const [rp1Connected, setRp1Connected] = useState(false);

  // Update connection flags when hoses change
  useEffect(() => {
    const loxHose = hoses.find(h => h.id === 'lox');
    const rp1Hose = hoses.find(h => h.id === 'rp1');

    if (loxHose?.connected !== loxConnected) {
      console.log('LOX connection changed:', loxHose?.connected);
      setLoxConnected(loxHose?.connected || false);
    }

    if (rp1Hose?.connected !== rp1Connected) {
      console.log('RP1 connection changed:', rp1Hose?.connected);
      setRp1Connected(rp1Hose?.connected || false);
    }
  }, [hoses.map(h => h.connected).join(',')]);

  // Fuel filling when hoses are connected
  useEffect(() => {
    console.log('Fueling effect triggered', {
      loxConnected,
      rp1Connected,
      loxLevel,
      rp1Level
    });

    const intervals: NodeJS.Timeout[] = [];

    if (loxConnected && (loxLevel < 100 || secondStageLoxLevel < 100)) {
      console.log('Starting LOX fueling interval');
      const interval = setInterval(() => {
        setLoxLevel(prev => {
          const newLevel = Math.min(100, prev + 1);
          console.log(`LOX level: ${prev} -> ${newLevel}`);
          return newLevel;
        });
        setSecondStageLoxLevel(prev => Math.min(100, prev + 1));
      }, 30);
      intervals.push(interval);
    }

    if (rp1Connected && (rp1Level < 100 || secondStageRp1Level < 100)) {
      console.log('Starting RP1 fueling interval');
      const interval = setInterval(() => {
        setRp1Level(prev => {
          const newLevel = Math.min(100, prev + 1);
          console.log(`RP1 level: ${prev} -> ${newLevel}`);
          return newLevel;
        });
        setSecondStageRp1Level(prev => Math.min(100, prev + 1));
      }, 30);
      intervals.push(interval);
    }

    return () => {
      if (intervals.length > 0) {
        console.log('Cleaning up fueling intervals:', intervals.length);
      }
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [loxConnected, rp1Connected, loxLevel, rp1Level]);

  const handleHoseDragStart = (hoseId: 'lox' | 'rp1', e: React.MouseEvent | React.TouchEvent) => {
    // Prevent dragging after rocket has launched
    if (hasLaunched) return;

    console.log('Drag start!', hoseId);
    e.stopPropagation();
    setHoses(prev => prev.map(h =>
      h.id === hoseId ? { ...h, isDragging: true } : h
    ));
  };

  const handleHoseDrag = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const draggingHose = hoses.find(h => h.isDragging);
    if (!draggingHose || !containerRef.current) return;

    if ('preventDefault' in e) {
      e.preventDefault();
    }

    // Get SVG element from containerRef
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    const rect = svgElement.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    // Convert screen coordinates to SVG viewBox coordinates
    const viewBox = svgElement.viewBox.baseVal;
    const x = ((clientX - rect.left) / rect.width) * viewBox.width + viewBox.x;
    const y = ((clientY - rect.top) / rect.height) * viewBox.height + viewBox.y;

    setHoses(prev => prev.map(hose => {
      if (hose.id !== draggingHose.id) return hose;

      const startPoint = { x: 65, y: hose.id === 'lox' ? 140 : 170 };
      const segmentLength = 5;
      const numSegments = hose.segments.length;

      // Calculate the path from start to cursor
      const dx = x - startPoint.x;
      const dy = y - startPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = segmentLength * numSegments;

      let targetX = x;
      let targetY = y;

      // If cursor is too far, limit it to max rope length
      if (distance > maxDistance) {
        const ratio = maxDistance / distance;
        targetX = startPoint.x + dx * ratio;
        targetY = startPoint.y + dy * ratio;
      }

      // Create smooth segments from start to target
      const newSegments: Point[] = [];
      for (let i = 0; i < numSegments; i++) {
        const t = (i + 1) / numSegments;
        newSegments.push({
          x: startPoint.x + (targetX - startPoint.x) * t,
          y: startPoint.y + (targetY - startPoint.y) * t
        });
      }

      return {
        ...hose,
        segments: newSegments,
        endPoint: newSegments[newSegments.length - 1]
      };
    }));
  };

  const handleHoseDragEnd = () => {
    setHoses(prev => {
      const updated = prev.map(hose => {
        if (!hose.isDragging) return hose;

        // Check if close to connection point on rocket
        // LOX connects at y: 175, RP1 at y: 195, both at x: 27.5 (center of rocket)
        const connectionPoint = {
          x: 27.5,
          y: hose.id === 'lox' ? 175 : 195
        };

        const dx = hose.endPoint.x - connectionPoint.x;
        const dy = hose.endPoint.y - connectionPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const isConnected = distance < 15; // Connection threshold

        console.log(`${hose.id} drag end - distance: ${distance}, connected: ${isConnected}`);

        if (isConnected) {
          // Snap to connection point
          const newSegments = [...hose.segments];
          newSegments[newSegments.length - 1] = connectionPoint;
          console.log(`${hose.id} CONNECTED!`);
          return {
            ...hose,
            connected: true,
            isDragging: false,
            segments: newSegments,
            endPoint: connectionPoint
          };
        }

        return { ...hose, isDragging: false };
      });

      console.log('Updated hoses:', updated);
      return updated;
    });
  };

  const handleLaunch = () => {
    if (hasLaunched || loxLevel < 100 || rp1Level < 100) return;

    // Disconnect hoses
    setHoses(prev => prev.map(h => ({ ...h, connected: false })));
    setLoxConnected(false);
    setRp1Connected(false);

    // Deplete booster fuel during launch (5 seconds) - slower rate, keep ~50% when off-screen
    const fuelDepleteInterval = setInterval(() => {
      setLoxLevel(prev => Math.max(50, prev - 1)); // Depletes to 50% in 5 seconds
      setRp1Level(prev => Math.max(50, prev - 1));
    }, 100);

    setTimeout(() => {
      clearInterval(fuelDepleteInterval);
      // Set small landing fuel reserve (LOX and RP-1)
      setLoxLevel(10); // Small amount for landing burn
      setRp1Level(10);
    }, 5000);

    // Play launch audio starting at 24 seconds (skip silence)
    if (launchAudioRef.current) {
      launchAudioRef.current.currentTime = 24;
      launchAudioRef.current.volume = 0.7;
      launchAudioRef.current.play().catch((error) => {
        console.log('Audio playback failed:', error);
      });
    }

    setIsLaunching(true);

    // Start fading out launch audio after 2.5 seconds
    setTimeout(() => {
      if (launchAudioRef.current) {
        const fadeOutInterval = setInterval(() => {
          if (launchAudioRef.current && launchAudioRef.current.volume > 0) {
            launchAudioRef.current.volume = Math.max(0, launchAudioRef.current.volume - 0.02);
            if (launchAudioRef.current.volume === 0) {
              clearInterval(fadeOutInterval);
              launchAudioRef.current.pause();
              launchAudioRef.current.volume = 0.7; // Reset volume for next time
            }
          }
        }, 100); // Fade out over ~5 seconds (35 steps * 100ms)
      }
    }, 2500);

    // After launch, start return sequence - extended to 5 seconds for slower ascent
    setTimeout(() => {
      setIsLaunching(false);
      setIsReturning(true);
      setHasLaunched(true); // Set this AFTER launching to prevent second stage from showing
    }, 5000);
    // Activate landing burn when deceleration begins (slightly before halfway)
    setTimeout(() => {
      setIsLandingBurn(true);

      // Deplete landing fuel (LOX and RP-1) during burn (3.5 seconds until touchdown)
      const landingFuelInterval = setInterval(() => {
        setLoxLevel(prev => Math.max(0, prev - 0.3)); // Depletes from 10 to 0 in ~3.3 seconds
        setRp1Level(prev => Math.max(0, prev - 0.3));
      }, 100);

      setTimeout(() => {
        clearInterval(landingFuelInterval);
      }, 3500);

      // Play landing burn audio starting at 27 seconds (skip silence)
      if (landingAudioRef.current) {
        landingAudioRef.current.currentTime = 27;
        landingAudioRef.current.volume = 0.4;
        landingAudioRef.current.play().catch((error) => {
          console.log('Landing audio playback failed:', error);
        });
      }
    }, 7500); // 5s launch + 2.5s to match deceleration curve
    // Deploy legs shortly after landing burn starts
    setTimeout(() => {
      setLegsDeployed(true);
    }, 7600); // 100ms after landing burn
    // End return animation and fade out landing audio quickly
    setTimeout(() => {
      setIsReturning(false);
      setIsLandingBurn(false);
      // Quick fade out for landing audio
      if (landingAudioRef.current) {
        const landingFadeInterval = setInterval(() => {
          if (landingAudioRef.current && landingAudioRef.current.volume > 0) {
            landingAudioRef.current.volume = Math.max(0, landingAudioRef.current.volume - 0.03);
            if (landingAudioRef.current.volume === 0) {
              clearInterval(landingFadeInterval);
              landingAudioRef.current.pause();
              landingAudioRef.current.volume = 0.4; // Reset volume for next time
            }
          }
        }, 80); // Smoother fade out over ~1 second
      }
    }, 11000); // 5s launch + 6s descent
  };

  const canLaunch = loxLevel === 100 && rp1Level === 100;

  return (
    <div
      ref={containerRef}
      className="rocket-container fixed bottom-0 right-8 z-50 hidden md:block"
      style={{ width: '200px', height: '500px', pointerEvents: 'none' }}
    >
      {/* Launch Tower - separate fixed SVG */}
      <div className="absolute bottom-0" style={{ zIndex: 2, right: '-30px' }}>
        <svg
          width="150"
          height="500"
          viewBox="-10 0 130 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-light-text-dark dark:stroke-dark-text drop-shadow-lg"
          style={{ marginBottom: '-212px' }}
        >
          {/* Launch Tower - half visible on the right side */}
          <g style={{ pointerEvents: 'none' }}>
            {/* Tower main vertical beams - wider and taller */}
            <line x1="65" y1="45" x2="65" y2="230" strokeWidth="3" />
            <line x1="80" y1="45" x2="80" y2="230" strokeWidth="3" />
            <line x1="95" y1="45" x2="95" y2="230" strokeWidth="3" />

            {/* Large X-pattern crossbeams spanning full width of tower in each row */}
            {/* Row 1: y 60-80 */}
            <line x1="65" y1="60" x2="95" y2="80" strokeWidth="1.5" />
            <line x1="95" y1="60" x2="65" y2="80" strokeWidth="1.5" />

            {/* Row 2: y 80-100 */}
            <line x1="65" y1="80" x2="95" y2="100" strokeWidth="1.5" />
            <line x1="95" y1="80" x2="65" y2="100" strokeWidth="1.5" />

            {/* Row 3: y 100-120 */}
            <line x1="65" y1="100" x2="95" y2="120" strokeWidth="1.5" />
            <line x1="95" y1="100" x2="65" y2="120" strokeWidth="1.5" />

            {/* Row 4: y 120-140 */}
            <line x1="65" y1="120" x2="95" y2="140" strokeWidth="1.5" />
            <line x1="95" y1="120" x2="65" y2="140" strokeWidth="1.5" />

            {/* Row 5: y 140-160 */}
            <line x1="65" y1="140" x2="95" y2="160" strokeWidth="1.5" />
            <line x1="95" y1="140" x2="65" y2="160" strokeWidth="1.5" />

            {/* Row 6: y 160-180 */}
            <line x1="65" y1="160" x2="95" y2="180" strokeWidth="1.5" />
            <line x1="95" y1="160" x2="65" y2="180" strokeWidth="1.5" />

            {/* Row 7: y 180-200 */}
            <line x1="65" y1="180" x2="95" y2="200" strokeWidth="1.5" />
            <line x1="95" y1="180" x2="65" y2="200" strokeWidth="1.5" />

            {/* Row 8: y 200-220 */}
            <line x1="65" y1="200" x2="95" y2="220" strokeWidth="1.5" />
            <line x1="95" y1="200" x2="65" y2="220" strokeWidth="1.5" />

            {/* Row 9 (bottom): Half X - inverted V shape connecting at bottom center */}
            <line x1="65" y1="220" x2="80" y2="230" strokeWidth="1.5" />
            <line x1="95" y1="220" x2="80" y2="230" strokeWidth="1.5" />

            {/* Tower base - wider */}
            <line x1="60" y1="230" x2="100" y2="230" strokeWidth="4" />

            {/* Roof/platform at top */}
            <line x1="60" y1="45" x2="100" y2="45" strokeWidth="3" />
            <line x1="60" y1="45" x2="60" y2="50" strokeWidth="2" />
            <line x1="100" y1="45" x2="100" y2="50" strokeWidth="2" />

            {/* Top decoration: Half X - inverted V shape connecting diagonals from center to roof */}
            <line x1="80" y1="45" x2="65" y2="55" strokeWidth="1.5" />
            <line x1="80" y1="45" x2="95" y2="55" strokeWidth="1.5" />

            {/* Lightning rod at top */}
            <line x1="80" y1="45" x2="80" y2="25" strokeWidth="2" />
            <line x1="80" y1="25" x2="77" y2="30" strokeWidth="1.5" />
            <line x1="80" y1="25" x2="83" y2="30" strokeWidth="1.5" />
            <circle cx="80" cy="25" r="2" fill="currentColor" />

            {/* Connection ports on tower - left side */}
            <circle cx="65" cy="140" r="3" fill="currentColor" />
            <circle cx="65" cy="170" r="3" fill="currentColor" />
          </g>

          {/* Hoses with physics simulation - always visible */}
          {/* RP1 hose first (lower z-index) */}
          {hoses.filter(h => h.id === 'rp1').map(hose => {
            const pathData = hose.segments.length > 0
              ? `M 65 ${hose.id === 'lox' ? 140 : 170} ` +
                hose.segments.map((seg, i) =>
                  i === 0 ? `L ${seg.x} ${seg.y}` : `L ${seg.x} ${seg.y}`
                ).join(' ')
              : '';

            return (
              <g key={hose.id} style={{ pointerEvents: 'auto' }}>
                {/* Hose rope */}
                <path
                  d={pathData}
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke={hose.id === 'lox' ? '#22d3ee' : '#ef4444'}
                  fill="none"
                  style={{ pointerEvents: 'none' }}
                />
                {/* Draggable connector at end */}
                <circle
                  cx={hose.endPoint.x}
                  cy={hose.endPoint.y}
                  r="6"
                  fill={hose.connected ? '#10b981' : hose.id === 'lox' ? '#22d3ee' : '#ef4444'}
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    cursor: hose.connected || hasLaunched ? 'default' : 'grab'
                  }}
                  onMouseDown={(e) => !hose.connected && !hasLaunched && handleHoseDragStart(hose.id, e)}
                  onTouchStart={(e) => !hose.connected && !hasLaunched && handleHoseDragStart(hose.id, e)}
                />
              </g>
            );
          })}
          {/* LOX hose second (higher z-index) */}
          {hoses.filter(h => h.id === 'lox').map(hose => {
            const pathData = hose.segments.length > 0
              ? `M 65 ${hose.id === 'lox' ? 140 : 170} ` +
                hose.segments.map((seg, i) =>
                  i === 0 ? `L ${seg.x} ${seg.y}` : `L ${seg.x} ${seg.y}`
                ).join(' ')
              : '';

            return (
              <g key={hose.id} style={{ pointerEvents: 'auto' }}>
                {/* Hose rope */}
                <path
                  d={pathData}
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke={hose.id === 'lox' ? '#22d3ee' : '#ef4444'}
                  fill="none"
                  style={{ pointerEvents: 'none' }}
                />
                {/* Draggable connector at end */}
                <circle
                  cx={hose.endPoint.x}
                  cy={hose.endPoint.y}
                  r="6"
                  fill={hose.connected ? '#10b981' : hose.id === 'lox' ? '#22d3ee' : '#ef4444'}
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    cursor: hose.connected || hasLaunched ? 'default' : 'grab'
                  }}
                  onMouseDown={(e) => !hose.connected && !hasLaunched && handleHoseDragStart(hose.id, e)}
                  onTouchStart={(e) => !hose.connected && !hasLaunched && handleHoseDragStart(hose.id, e)}
                />
              </g>
            );
          })}

        </svg>
      </div>

      <div
        className={`absolute bottom-0 ${
          isLaunching
            ? "right-0 -translate-y-[150vh] scale-75 transition-all duration-[5000ms] ease-in"
            : isReturning
            ? "left-8 -translate-y-[18px] transition-all duration-[6000ms] cubic-bezier(0.5, 0, 0.3, 1)"
            : hasLaunched
            ? "left-8 -translate-y-[18px]"
            : canLaunch
            ? "right-0 translate-y-0 transition-all duration-300 hover:scale-105"
            : "right-0 translate-y-0"
        }`}
        style={{ pointerEvents: 'auto', zIndex: 1 }}
      >
        <svg
          width="120"
          height="500"
          viewBox="-10 0 100 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-light-text-dark dark:stroke-dark-text drop-shadow-lg"
          style={{
            marginBottom: '-212px',
            cursor: canLaunch ? 'pointer' : 'default',
            pointerEvents: 'auto'
          }}
          onClick={handleLaunch}
        >
        {/* Only show second stage and fairing when launching, not when returning or landed */}
        {(isLaunching || (!hasLaunched && !isReturning)) && (
          <>
            {/* Nose cone - rounded fairing top */}
            <path
              d="M 27.5 5 Q 20 15 20 25"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 27.5 5 Q 35 15 35 25"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Payload fairing - wider than body with rounded shape */}
            <line x1="20" y1="25" x2="20" y2="55" strokeWidth="2" />
            <line x1="35" y1="25" x2="35" y2="55" strokeWidth="2" />

            {/* Fairing taper back to body width */}
            <line x1="20" y1="55" x2="22" y2="60" strokeWidth="2" />
            <line x1="35" y1="55" x2="33" y2="60" strokeWidth="2" />

            {/* Second stage - taller */}
            <line x1="22" y1="60" x2="22" y2="95" strokeWidth="2" />
            <line x1="33" y1="60" x2="33" y2="95" strokeWidth="2" />

            {/* Stage separation line */}
            <line x1="22" y1="95" x2="33" y2="95" strokeWidth="1.5" />
          </>
        )}

        {/* First stage booster - much taller, always visible */}
        <line x1="22" y1="95" x2="22" y2="220" strokeWidth="2" />
        <line x1="33" y1="95" x2="33" y2="220" strokeWidth="2" />

        {/* Interstage (top of booster) - solid black fill, taller to reach red line */}
        <rect
          x="22"
          y="95"
          width="11"
          height="20"
          strokeWidth="2"
          className="fill-light-text-dark dark:fill-dark-text"
        />

        {/* Grid fins - show when returning or landed, solid black, positioned at bottom of interstage */}
        {(isReturning || hasLaunched) && !isLaunching && (
          <>
            {/* Left grid fin - solid black, thinner */}
            <rect
              x="13"
              y="112"
              width="9"
              height="3"
              strokeWidth="1.5"
              className="fill-light-text-dark dark:fill-dark-text"
            />
            <line x1="15" y1="112" x2="15" y2="115" strokeWidth="0.5" className="stroke-light-bg dark:stroke-dark-bg" />
            <line x1="19" y1="112" x2="19" y2="115" strokeWidth="0.5" className="stroke-light-bg dark:stroke-dark-bg" />

            {/* Right grid fin - solid black, thinner */}
            <rect
              x="33"
              y="112"
              width="9"
              height="3"
              strokeWidth="1.5"
              className="fill-light-text-dark dark:fill-dark-text"
            />
            <line x1="35" y1="112" x2="35" y2="115" strokeWidth="0.5" className="stroke-light-bg dark:stroke-dark-bg" />
            <line x1="40" y1="112" x2="40" y2="115" strokeWidth="0.5" className="stroke-light-bg dark:stroke-dark-bg" />
          </>
        )}

        {/* Body detail lines (tank sections) */}
        <line x1="22" y1="145" x2="33" y2="145" strokeWidth="1" />
        <line x1="22" y1="175" x2="33" y2="175" strokeWidth="1" />
        <line x1="22" y1="195" x2="33" y2="195" strokeWidth="1" />

        {/* Fuel visualization inside rocket body */}
        <defs>
          <clipPath id="rocketBody">
            <rect x="22" y="95" width="11" height="125" />
          </clipPath>
          <clipPath id="secondStageBody">
            <rect x="22" y="60" width="11" height="35" />
          </clipPath>
        </defs>

        {/* Second Stage Fuel - only visible when second stage is visible */}
        {(isLaunching || (!hasLaunched && !isReturning)) && (
          <>
            {/* Second stage LOX (upper half of second stage: y 60-77.5) */}
            <rect
              x="22"
              y={77.5 - (secondStageLoxLevel / 100) * 17.5}
              width="11"
              height={(secondStageLoxLevel / 100) * 17.5}
              fill="#22d3ee"
              opacity={0.3}
              clipPath="url(#secondStageBody)"
            />
            {/* Second stage RP-1 (lower half of second stage: y 77.5-95) */}
            <rect
              x="22"
              y={95 - (secondStageRp1Level / 100) * 17.5}
              width="11"
              height={(secondStageRp1Level / 100) * 17.5}
              fill="#ef4444"
              opacity={0.3}
              clipPath="url(#secondStageBody)"
            />
          </>
        )}

        {/* First Stage Booster Fuel */}
        {/* LOX tank (upper section: y 115-175, 60 units tall - fills from bottom of interstage) */}
        <rect
          x="22"
          y={175 - (loxLevel / 100) * 60}
          width="11"
          height={(loxLevel / 100) * 60}
          fill="#22d3ee"
          opacity={0.3}
          clipPath="url(#rocketBody)"
        />

        {/* RP-1 tank (lower section: y 175-220, 45 units tall) */}
        <rect
          x="22"
          y={220 - (rp1Level / 100) * 45}
          width="11"
          height={(rp1Level / 100) * 45}
          fill="#ef4444"
          opacity={0.3}
          clipPath="url(#rocketBody)"
        />

        {/* Engine section */}
        <path
          d="M 22 220 L 20 226 L 20 228 L 35 228 L 35 226 L 33 220"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Landing legs - same element throughout, rotates when legsDeployed */}
        <>
          {/* Left leg - rotates and translates upward during deployment */}
          <g
            style={{
              transformOrigin: "24px 227px",
              transform: legsDeployed ? "translateY(-10px) rotate(0deg)" : "rotate(142deg)",
              transition: legsDeployed ? "transform 3s ease-out" : "none"
            }}
          >
            <path
              d="M 24 227 L 5 255 L 9 255 L 24 239"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="fill-light-text-dark dark:fill-dark-text"
            />
          </g>

          {/* Right leg - rotates and translates upward during deployment */}
          <g
            style={{
              transformOrigin: "31px 227px",
              transform: legsDeployed ? "translateY(-10px) rotate(0deg)" : "rotate(-142deg)",
              transition: legsDeployed ? "transform 3s ease-out" : "none"
            }}
          >
            <path
              d="M 31 227 L 50 255 L 46 255 L 31 239"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="fill-light-text-dark dark:fill-dark-text"
            />
          </g>
        </>

        {/* Merlin engines (9 in a circle, showing 5 visible) */}
        <circle cx="21" cy="226" r="1.5" strokeWidth="1" />
        <circle cx="27.5" cy="224" r="1.5" strokeWidth="1" />
        <circle cx="34" cy="226" r="1.5" strokeWidth="1" />
        <circle cx="24" cy="227" r="1" strokeWidth="1" />
        <circle cx="31" cy="227" r="1" strokeWidth="1" />

        {/* SpaceX logo area */}
        <line x1="24" y1="155" x2="31" y2="155" strokeWidth="0.5" />

        {/* Flame (only shown when launching or returning) */}
        {isLaunching && (
          <>
            {/* Main central flame - static at full length */}
            <path
              d="M 25 228 L 23 320 L 25 300 L 27.5 380 L 30 300 L 32 320 L 30 228"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            />
            {/* Side flames from outer engines - static at full length */}
            <path
              d="M 20 228 L 18 300 L 20 280 L 21 350"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            />
            <path
              d="M 35 228 L 37 300 L 35 280 L 34 350"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            />
          </>
        )}

        {/* Landing burn flame - only center engine, half the height of booster (~62 units) */}
        {isLandingBurn && (
          <path
            d="M 25 228 L 23 260 L 25 250 L 27.5 290 L 30 250 L 32 260 L 30 228"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          />
        )}

        {/* Connection point indicators on rocket body - only show before launch and when not connected */}
        {!isLaunching && !isReturning && !hasLaunched && (
          <>
            {!loxConnected && (
              <circle
                cx="27.5"
                cy="175"
                r="2.5"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="1"
                opacity={0.5}
                style={{ pointerEvents: 'none' }}
              />
            )}
            {!rp1Connected && (
              <circle
                cx="27.5"
                cy="195"
                r="2.5"
                fill="none"
                stroke="#ef4444"
                strokeWidth="1"
                opacity={0.5}
                style={{ pointerEvents: 'none' }}
              />
            )}
          </>
        )}
      </svg>
      </div>
    </div>
  );
};

export default Rocket;
