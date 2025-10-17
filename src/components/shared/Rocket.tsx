import { useState } from "react";

const Rocket = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [hasLaunched, setHasLaunched] = useState(false);
  const [isLandingBurn, setIsLandingBurn] = useState(false);
  const [legsDeployed, setLegsDeployed] = useState(false);

  const handleLaunch = () => {
    if (hasLaunched) return;

    setIsLaunching(true);
    // After launch, start return sequence - extended to 5 seconds for slower ascent
    setTimeout(() => {
      setIsLaunching(false);
      setIsReturning(true);
      setHasLaunched(true); // Set this AFTER launching to prevent second stage from showing
    }, 5000);
    // Activate landing burn when deceleration begins (slightly before halfway)
    setTimeout(() => {
      setIsLandingBurn(true);
    }, 7500); // 5s launch + 2.5s to match deceleration curve
    // Deploy legs shortly after landing burn starts
    setTimeout(() => {
      setLegsDeployed(true);
    }, 7600); // 100ms after landing burn
    // End return animation
    setTimeout(() => {
      setIsReturning(false);
      setIsLandingBurn(false);
    }, 11000); // 5s launch + 6s descent
  };

  return (
    <button
      onClick={handleLaunch}
      className={`fixed bottom-8 right-8 z-50 ${
        isLaunching
          ? "-translate-y-[150vh] scale-75 transition-all duration-[5000ms] ease-in pointer-events-none"
          : isReturning
          ? "translate-y-0 transition-all duration-[6000ms] cubic-bezier(0.5, 0, 0.3, 1) pointer-events-none"
          : hasLaunched
          ? "translate-y-0 pointer-events-none"
          : "translate-y-0 transition-all duration-300 hover:scale-110"
      }`}
      aria-label="Launch rocket"
      disabled={hasLaunched}
    >
      <svg
        width="80"
        height="400"
        viewBox="-10 0 75 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-light-text-dark dark:stroke-dark-text drop-shadow-lg"
        style={{ marginBottom: '-150px' }}
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
      </svg>
    </button>
  );
};

export default Rocket;
