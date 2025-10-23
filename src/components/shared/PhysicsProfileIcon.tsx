import { useState, useRef, useEffect, useLayoutEffect } from "react";
import faviconUrl from "@/assets/branding/favicon.png";
import profileFaceUrl from "@/assets/images/Face.png";

interface PhysicsState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationVelocity: number;
}

interface VelocityPoint {
  x: number;
  y: number;
  time: number;
}

const PhysicsProfileIcon = () => {
  const [isPhysicsMode, setIsPhysicsMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isNearSnapZone, setIsNearSnapZone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [usesAccelerometer, setUsesAccelerometer] = useState(false);
  const [physics, setPhysics] = useState<PhysicsState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rotation: 0,
    rotationVelocity: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const normalIconRef = useRef<HTMLDivElement>(null);
  const physicsIconRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const velocityHistory = useRef<VelocityPoint[]>([]);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });
  const isOnGround = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastCollisionTime = useRef<number>(0);
  const originalPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const physicsStartTime = useRef<number>(0);
  const currentPhysics = useRef<PhysicsState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rotation: 0,
    rotationVelocity: 0,
  });

  // Constants
  const GRAVITY = 0.5;
  const BOUNCE_DAMPING = 0.7;
  const AIR_FRICTION = 0.99; // Very low air resistance
  const ROLLING_FRICTION = 0.98; // Friction when rolling on surface
  const ICON_SIZE = 128; // 32 * 4 (w-32 in Tailwind)
  const VELOCITY_HISTORY_LENGTH = 5; // Track last 5 positions for smoother velocity calculation
  const MIN_COLLISION_INTERVAL = 50; // Minimum ms between collision sounds
  const ROLLING_THRESHOLD = 2; // Below this velocity, ball sticks to surface and rolls
  const SNAP_DISTANCE = 80; // Distance threshold for snapping back into place
  const PHYSICS_DELAY = 300; // ms to wait before gravity kicks in

  // Detect if device is mobile and supports accelerometer
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);

      // Check if device orientation is supported
      if (isMobileDevice && typeof DeviceOrientationEvent !== 'undefined') {
        setUsesAccelerometer(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== "undefined" && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  // Accelerometer-based physics for mobile devices
  useEffect(() => {
    if (!usesAccelerometer || !isPhysicsMode) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      // DeviceOrientationEvent provides:
      // - beta: front-to-back tilt in degrees (-180 to 180)
      // - gamma: left-to-right tilt in degrees (-90 to 90)

      const beta = event.beta || 0;  // front-back tilt
      const gamma = event.gamma || 0; // left-right tilt

      // Convert tilt to gravity-like forces with MUCH higher sensitivity
      // Increased from 1.5 to 4.0 for faster movement
      const gravityX = (gamma / 90) * 4.0; // Max 4.0 when fully tilted
      const gravityY = (beta / 90) * 4.0;  // Max 4.0 when fully tilted

      // Apply these as continuous forces with increased multiplier
      // Increased from 0.5 to 1.5 for more responsiveness
      setPhysics((prev) => ({
        ...prev,
        vx: prev.vx + gravityX * 1.5,
        vy: prev.vy + gravityY * 1.5,
      }));
    };

    // Request permission for iOS 13+ devices
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS devices
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [usesAccelerometer, isPhysicsMode]);

  // Synchronously update physics position when entering physics mode to prevent jump
  useLayoutEffect(() => {
    if (isPhysicsMode && physicsIconRef.current) {
      const rect = physicsIconRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Only update if position has changed significantly (more than 5px)
      if (Math.abs(physics.x - centerX) > 5 || Math.abs(physics.y - centerY) > 5) {
        const correctedState = {
          ...physics,
          x: centerX,
          y: centerY,
        };
        setPhysics(correctedState);
        currentPhysics.current = correctedState;
      }
    }
  }, [isPhysicsMode]);

  // Generate collision sound - medium-high pitch marble with natural imperfections
  const playCollisionSound = (impactVelocity: number) => {
    if (!audioContextRef.current) return;

    // Throttle collision sounds
    const now = Date.now();
    if (now - lastCollisionTime.current < MIN_COLLISION_INTERVAL) return;
    lastCollisionTime.current = now;

    const audioContext = audioContextRef.current;

    // Calculate volume based on impact velocity (0-1)
    const volume = Math.min(Math.abs(impactVelocity) / 20, 1) * 0.25;
    if (volume < 0.02) return; // Don't play sound for very soft collisions

    // Create gain node for volume control
    const gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

    const startTime = audioContext.currentTime;

    // Medium-high pitch marble (halfway between marble-3 and marble-4: ~490-720Hz)
    // Add slight randomness to make each hit unique
    const randomness = Math.random() * 0.1 + 0.95; // 0.95-1.05 variation

    // Main body tone - slightly detuned for realism
    const osc1 = audioContext.createOscillator();
    const osc1Gain = audioContext.createGain();
    const baseFreq = (490 + (impactVelocity * 20)) * randomness;

    osc1.frequency.setValueAtTime(baseFreq, startTime);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.68, startTime + 0.075);
    osc1.type = "sine";

    // Irregular envelope - not perfectly smooth
    osc1Gain.gain.setValueAtTime(0, startTime);
    osc1Gain.gain.linearRampToValueAtTime(volume * 0.48, startTime + 0.0025);
    osc1Gain.gain.exponentialRampToValueAtTime(volume * 0.14, startTime + 0.023);
    osc1Gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.09);

    // Detuned harmonic for beating/natural resonance
    const osc2 = audioContext.createOscillator();
    const osc2Gain = audioContext.createGain();
    const harmonic = baseFreq * 1.46 * (1 + (Math.random() - 0.5) * 0.03); // Slightly detuned

    osc2.frequency.setValueAtTime(harmonic, startTime);
    osc2.frequency.exponentialRampToValueAtTime(harmonic * 0.69, startTime + 0.0575);
    osc2.type = "sine";

    osc2Gain.gain.setValueAtTime(0, startTime);
    osc2Gain.gain.linearRampToValueAtTime(volume * 0.27, startTime + 0.002);
    osc2Gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.063);

    // Additional inharmonic partial for complexity
    const osc3 = audioContext.createOscillator();
    const osc3Gain = audioContext.createGain();
    const inharmonic = baseFreq * 2.05 * randomness; // Not a perfect harmonic

    osc3.frequency.setValueAtTime(inharmonic, startTime);
    osc3.frequency.exponentialRampToValueAtTime(inharmonic * 0.62, startTime + 0.0375);
    osc3.type = "sine";

    osc3Gain.gain.setValueAtTime(0, startTime);
    osc3Gain.gain.linearRampToValueAtTime(volume * 0.13, startTime + 0.0012);
    osc3Gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.042);

    // More complex noise - filtered for natural impact sound
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.022, audioContext.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      // Pink-ish noise with more character
      const decay = Math.exp(-i / (noiseData.length * 0.085));
      const amplitude = (Math.random() * 2 - 1) * decay * 0.38;
      noiseData[i] = amplitude;
    }
    const noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // Band-pass filter for more natural noise spectrum
    const bandpass = audioContext.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(baseFreq * 1.15, startTime);
    bandpass.Q.setValueAtTime(1.6, startTime);

    // Subtle low-frequency rumble for body
    const lowOsc = audioContext.createOscillator();
    const lowGain = audioContext.createGain();
    lowOsc.frequency.setValueAtTime(baseFreq * 0.5, startTime);
    lowOsc.type = "triangle";

    lowGain.gain.setValueAtTime(0, startTime);
    lowGain.gain.linearRampToValueAtTime(volume * 0.14, startTime + 0.0045);
    lowGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.042);

    // Connect everything
    osc1.connect(osc1Gain);
    osc2.connect(osc2Gain);
    osc3.connect(osc3Gain);
    lowOsc.connect(lowGain);
    noiseSource.connect(bandpass);

    osc1Gain.connect(gainNode);
    osc2Gain.connect(gainNode);
    osc3Gain.connect(gainNode);
    lowGain.connect(gainNode);
    bandpass.connect(gainNode);

    osc1.start(startTime);
    osc2.start(startTime);
    osc3.start(startTime);
    lowOsc.start(startTime);
    noiseSource.start(startTime);

    osc1.stop(startTime + 0.11);
    osc2.stop(startTime + 0.075);
    osc3.stop(startTime + 0.052);
    lowOsc.stop(startTime + 0.05);
    noiseSource.stop(startTime + 0.022);
  };

  // Pixel-perfect collision detection using element's actual rendered content
  const checkPixelCollision = (x: number, y: number, radius: number) => {
    const collisions: Array<{
      element: HTMLElement;
      side: "left" | "right" | "top" | "bottom";
      distance: number;
    }> = [];

    // Get all collision targets
    const targets = document.querySelectorAll(
      "h1, p, a, svg, .bio-section > *"
    );

    targets.forEach((element) => {
      const htmlElement = element as HTMLElement;

      // Skip if it's the physics icon itself or its children
      if (physicsIconRef.current?.contains(htmlElement)) return;

      // Skip if it's the placeholder/revealed image underneath
      if (placeholderRef.current?.contains(htmlElement) || htmlElement === placeholderRef.current) return;

      const rect = htmlElement.getBoundingClientRect();

      // Quick AABB check first for performance
      const iconLeft = x - radius;
      const iconRight = x + radius;
      const iconTop = y - radius;
      const iconBottom = y + radius;

      const isNearby =
        iconRight > rect.left - 10 &&
        iconLeft < rect.right + 10 &&
        iconBottom > rect.top - 10 &&
        iconTop < rect.bottom + 10;

      if (!isNearby) return;

      // For text elements, create tighter bounds
      if (
        htmlElement.tagName === "H1" ||
        htmlElement.tagName === "P" ||
        htmlElement.tagName === "A"
      ) {
        // Get text metrics for tighter collision
        const range = document.createRange();
        const textNode = htmlElement.childNodes[0];
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          range.selectNodeContents(htmlElement);
          const textRect = range.getBoundingClientRect();

          const isColliding =
            iconRight > textRect.left &&
            iconLeft < textRect.right &&
            iconBottom > textRect.top &&
            iconTop < textRect.bottom;

          if (isColliding) {
            // Calculate which side is closest
            const distances = {
              left: iconRight - textRect.left,
              right: textRect.right - iconLeft,
              top: iconBottom - textRect.top,
              bottom: textRect.bottom - iconTop,
            };

            const minSide = Object.entries(distances).reduce((min, [side, dist]) =>
              dist < min.dist ? { side: side as any, dist } : min
            , { side: "top" as const, dist: Infinity });

            collisions.push({
              element: htmlElement,
              side: minSide.side,
              distance: minSide.dist,
            });
          }
        }
      } else {
        // For SVGs and other elements, use standard bounds
        const isColliding =
          iconRight > rect.left &&
          iconLeft < rect.right &&
          iconBottom > rect.top &&
          iconTop < rect.bottom;

        if (isColliding) {
          const distances = {
            left: iconRight - rect.left,
            right: rect.right - iconLeft,
            top: iconBottom - rect.top,
            bottom: rect.bottom - iconTop,
          };

          const minSide = Object.entries(distances).reduce((min, [side, dist]) =>
            dist < min.dist ? { side: side as any, dist } : min
          , { side: "top" as const, dist: Infinity });

          collisions.push({
            element: htmlElement,
            side: minSide.side,
            distance: minSide.dist,
          });
        }
      }
    });

    // Return the closest collision
    return collisions.length > 0
      ? collisions.reduce((closest, col) =>
          col.distance < closest.distance ? col : closest
        )
      : null;
  };

  // Physics simulation with proper rolling mechanics
  useEffect(() => {
    if (!isPhysicsMode) return;

    const simulate = () => {
      setPhysics((prev) => {
        let { x, y, vx, vy, rotation, rotationVelocity } = prev;

        // Update current physics ref for snap detection
        currentPhysics.current = { x, y, vx, vy, rotation, rotationVelocity };

        // Check distance to snap zone
        const distanceToSnap = Math.sqrt(
          Math.pow(x - originalPosition.current.x, 2) +
          Math.pow(y - originalPosition.current.y, 2)
        );
        setIsNearSnapZone(distanceToSnap < SNAP_DISTANCE && isDragging);

        if (!isDragging) {
          const radius = ICON_SIZE / 2;
          let onGroundThisFrame = false;

          // Apply gravity immediately for natural fall (but not when using accelerometer)
          if (!usesAccelerometer) {
            vy += GRAVITY;
          }

          // Apply air resistance (minimal)
          vx *= AIR_FRICTION;
          vy *= AIR_FRICTION;

          // Apply velocity
          x += vx;
          y += vy;

          // Get viewport bounds
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          // Collision with screen edges
          // Left edge
          if (x - radius < 0) {
            x = radius;
            const impactVelocity = Math.abs(vx);
            vx = Math.abs(vx) * BOUNCE_DAMPING;
            playCollisionSound(impactVelocity);
          }

          // Right edge
          if (x + radius > viewportWidth) {
            x = viewportWidth - radius;
            const impactVelocity = Math.abs(vx);
            vx = -Math.abs(vx) * BOUNCE_DAMPING;
            playCollisionSound(impactVelocity);
          }

          // Top edge
          if (y - radius < 0) {
            y = radius;
            const impactVelocity = Math.abs(vy);
            vy = Math.abs(vy) * BOUNCE_DAMPING;
            playCollisionSound(impactVelocity);
          }

          // Bottom edge (ground)
          if (y + radius > viewportHeight) {
            y = viewportHeight - radius;
            const impactVelocity = Math.abs(vy);
            vy = -Math.abs(vy) * BOUNCE_DAMPING;
            onGroundThisFrame = true;

            if (Math.abs(impactVelocity) > ROLLING_THRESHOLD) {
              playCollisionSound(impactVelocity);
            } else {
              // Stick to ground and start rolling
              vy = 0;
            }
          }

          // Collision with page elements - skip on mobile with accelerometer
          if (!usesAccelerometer) {
            const collision = checkPixelCollision(x, y, radius);
            if (collision) {
              const rect = collision.element.getBoundingClientRect();

              if (collision.side === "left") {
                x = rect.left - radius - 1;
                const impactVelocity = Math.abs(vx);
                vx = -Math.abs(vx) * BOUNCE_DAMPING;
                playCollisionSound(impactVelocity);
              } else if (collision.side === "right") {
                x = rect.right + radius + 1;
                const impactVelocity = Math.abs(vx);
                vx = Math.abs(vx) * BOUNCE_DAMPING;
                playCollisionSound(impactVelocity);
              } else if (collision.side === "top") {
                y = rect.top - radius - 1;
                const impactVelocity = Math.abs(vy);
                vy = -Math.abs(vy) * BOUNCE_DAMPING;
                onGroundThisFrame = true;

                if (Math.abs(impactVelocity) > ROLLING_THRESHOLD) {
                  playCollisionSound(impactVelocity);
                } else {
                  // Stick to surface and start rolling
                  vy = 0;
                }
              } else if (collision.side === "bottom") {
                y = rect.bottom + radius + 1;
                const impactVelocity = Math.abs(vy);
                vy = Math.abs(vy) * BOUNCE_DAMPING;
                playCollisionSound(impactVelocity);
              }
            }
          }

          // ROLLING PHYSICS - Proper friction-based rolling
          if (onGroundThisFrame) {
            // Apply rolling friction
            vx *= ROLLING_FRICTION;

            // Calculate proper rolling: angular velocity = linear velocity / radius
            // For a rolling sphere without slipping: v = ω * r
            // Therefore: ω = v / r (in radians per pixel)
            // Convert to degrees: rotation_velocity = (vx / radius) * (180 / π)
            // Positive vx (moving right) = clockwise rotation (positive degrees in CSS)
            const targetRotationVelocity = (vx / radius) * 57.2958; // radians to degrees

            // Smoothly sync rotation with rolling (simulate friction coupling)
            rotationVelocity = rotationVelocity * 0.7 + targetRotationVelocity * 0.3;
          } else {
            // In air: rotation continues with angular friction
            rotationVelocity *= 0.99;
          }

          // Apply rotation
          rotation += rotationVelocity;

          isOnGround.current = onGroundThisFrame;
        }

        return { x, y, vx, vy, rotation, rotationVelocity };
      });

      animationFrameRef.current = requestAnimationFrame(simulate);
    };

    animationFrameRef.current = requestAnimationFrame(simulate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPhysicsMode, isDragging]);

  const handleClick = async () => {
    if (isPhysicsMode) return;

    // On mobile with accelerometer, request permission first
    if (usesAccelerometer && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState !== 'granted') {
          console.log('Device orientation permission denied');
          return;
        }
      } catch (error) {
        console.error('Error requesting device orientation permission:', error);
        return;
      }
    }

    // Capture the original position for snap-back
    if (normalIconRef.current) {
      const rect = normalIconRef.current.getBoundingClientRect();
      originalPosition.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      // Set initial physics state at exact current position
      const initialState = {
        x: originalPosition.current.x,
        y: originalPosition.current.y,
        vx: 0,
        vy: 0,
        rotation: 0,
        rotationVelocity: 0,
      };

      setPhysics(initialState);
      currentPhysics.current = initialState;

      // Record start time for physics delay
      physicsStartTime.current = Date.now();

      // Immediately switch to physics mode
      setIsPhysicsMode(true);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isPhysicsMode) return;
    // Don't allow dragging on mobile with accelerometer
    if (usesAccelerometer) return;

    e.preventDefault();
    setIsDragging(true);
    lastMousePos.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
    dragStartPos.current = {
      x: e.clientX - physics.x,
      y: e.clientY - physics.y,
    };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isPhysicsMode) return;
    // Don't allow dragging on mobile with accelerometer
    if (usesAccelerometer) return;

    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    lastMousePos.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    dragStartPos.current = {
      x: touch.clientX - physics.x,
      y: touch.clientY - physics.y,
    };
  };

  // Global mouse/touch handlers
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const now = Date.now();

      setPhysics((prev) => ({
        ...prev,
        x: clientX - dragStartPos.current.x,
        y: clientY - dragStartPos.current.y,
      }));

      // Track position history for better velocity calculation
      velocityHistory.current.push({ x: clientX, y: clientY, time: now });

      // Keep only recent history
      if (velocityHistory.current.length > VELOCITY_HISTORY_LENGTH) {
        velocityHistory.current.shift();
      }
    };

    const handleEnd = () => {
      if (!isDragging) return;

      // Check if near snap zone - snap back into place
      // Use currentPhysics ref to get the latest position
      const distanceToSnap = Math.sqrt(
        Math.pow(currentPhysics.current.x - originalPosition.current.x, 2) +
        Math.pow(currentPhysics.current.y - originalPosition.current.y, 2)
      );

      if (distanceToSnap < SNAP_DISTANCE) {
        // Snap back into place - exit physics mode
        setIsPhysicsMode(false);
        setIsDragging(false);
        setIsNearSnapZone(false);
        velocityHistory.current = [];
        return;
      }

      // Calculate velocity from position history
      let vx = 0;
      let vy = 0;

      if (velocityHistory.current.length >= 2) {
        // Use multiple points for smoother velocity
        const recent = velocityHistory.current.slice(-3); // Last 3 points
        let totalVx = 0;
        let totalVy = 0;
        let count = 0;

        for (let i = 1; i < recent.length; i++) {
          const timeDiff = recent[i].time - recent[i - 1].time;
          if (timeDiff > 0 && timeDiff < 100) {
            // Ignore if too slow (stationary)
            const dx = recent[i].x - recent[i - 1].x;
            const dy = recent[i].y - recent[i - 1].y;
            totalVx += dx / timeDiff;
            totalVy += dy / timeDiff;
            count++;
          }
        }

        if (count > 0) {
          // Average velocity, scaled up for more dramatic throws
          vx = (totalVx / count) * 16; // Increased multiplier for more momentum
          vy = (totalVy / count) * 16;
        }
      }

      setPhysics((prev) => ({
        ...prev,
        vx,
        vy,
        rotationVelocity: vx * 0.2,
      }));

      setIsDragging(false);
      velocityHistory.current = []; // Clear history
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  // Always render with the same structure to avoid layout shifts
  return (
    <>
      {/* Container that maintains layout space */}
      <div className="relative h-32 w-32 flex-shrink-0">
        {/* Placeholder/revealed image - shown when physics mode is active */}
        {isPhysicsMode && (
          <div
            ref={placeholderRef}
            className="absolute inset-0 rounded-full overflow-hidden bg-gray-200 shadow-lg pointer-events-none z-0"
          >
            <img
              src={profileFaceUrl}
              alt="Dan alternate portrait"
              className="h-full w-full object-cover"
            />
            {/* Visual indicator when near snap zone */}
            {isNearSnapZone && (
              <div className="absolute inset-0 bg-blue-400/20 rounded-full border-2 border-blue-400" />
            )}
          </div>
        )}

        {/* Main icon */}
        {!isPhysicsMode && (
          <div
            ref={(el) => {
              normalIconRef.current = el;
              placeholderRef.current = el;
            }}
            className="absolute inset-0 rounded-full overflow-hidden bg-gray-100 shadow-lg cursor-pointer z-10"
            onClick={handleClick}
          >
            <img
              src={faviconUrl}
              alt="Dan profile"
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        )}
      </div>

      {/* Physics mode icon - rendered in fixed position */}
      {isPhysicsMode && (
        <div
          ref={physicsIconRef}
          className={`fixed z-[101] ${usesAccelerometer ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
          style={{
            left: physics.x - ICON_SIZE / 2,
            top: physics.y - ICON_SIZE / 2,
            width: ICON_SIZE,
            height: ICON_SIZE,
            transform: `rotate(${physics.rotation}deg)`,
            touchAction: "none",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="relative h-full w-full rounded-full overflow-hidden bg-gray-100 shadow-lg">
            <img
              src={faviconUrl}
              alt="Dan profile"
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        </div>
      )}

      {/* Container for physics simulation */}
      {isPhysicsMode && <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[100]" />}
    </>
  );

  /* COMMENTED OUT - Hover flip effect (may want to bring back in future)
  return (
    <div
      ref={iconRef}
      className="group relative h-32 w-32 flex-shrink-0 [perspective:1000px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div
        className="relative h-full w-full rounded-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
      >
        <div className="absolute inset-0 overflow-hidden rounded-full bg-gray-100 shadow-lg [backface-visibility:hidden]">
          <img
            src={faviconUrl}
            alt="Dan profile"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 overflow-hidden rounded-full bg-gray-200 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <img
            src={profileFaceUrl}
            alt="Dan alternate portrait"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
  */
};

export default PhysicsProfileIcon;
