import { useEffect, useState } from "react";

interface LabelProps {
  x: number;
  y: number;
  text: string;
  delay: number;
  connectorPath: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  loaded: boolean;
}

const AnimatedLabel = ({ x, y, text, delay, connectorPath, position = 'right', loaded }: LabelProps) => {
  const textWidth = text.length * 7 + 16;
  const textHeight = 22;

  // Position adjustments for label box
  const boxOffset = position === 'left' ? -textWidth - 8 :
    position === 'right' ? 8 :
      position === 'top' ? -textWidth / 2 :
        -textWidth / 2;
  const boxOffsetY = position === 'top' ? -textHeight - 12 :
    position === 'bottom' ? 12 :
      -textHeight / 2;

  return (
    <g className={`transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${delay}ms` }}>
      {/* Animated connector line */}
      <path
        d={connectorPath}
        className="stroke-primary/50 fill-none"
        strokeWidth="1"
        strokeDasharray="4 3"
        style={{
          strokeDashoffset: loaded ? 0 : 100,
          transition: `stroke-dashoffset 1s ease-out ${delay}ms`
        }}
      />

      {/* Label container with handwritten style */}
      <g style={{ animation: loaded ? `floatLabel 5s ease-in-out infinite ${delay / 1000}s` : 'none' }}>
        {/* Soft glow behind label */}
        <rect
          x={x + boxOffset - 2}
          y={y + boxOffsetY - 2}
          width={textWidth + 4}
          height={textHeight + 4}
          rx="6"
          className="fill-primary/5 blur-sm"
        />

        {/* Label background */}
        <rect
          x={x + boxOffset}
          y={y + boxOffsetY}
          width={textWidth}
          height={textHeight}
          rx="4"
          className="fill-card/90 stroke-primary/30"
          strokeWidth="1"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}
        />

        {/* Animated text with writing effect */}
        <text
          x={x + boxOffset + 8}
          y={y + boxOffsetY + 15}
          className="fill-foreground text-[10px] font-medium"
          style={{
            clipPath: loaded ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
            transition: `clip-path 0.8s ease-out ${delay + 300}ms`
          }}
        >
          {text}
        </text>

        {/* Small accent dot */}
        <circle
          cx={x + boxOffset + textWidth - 6}
          cy={y + boxOffsetY + textHeight / 2}
          r="2"
          className="fill-primary/60"
          style={{
            opacity: loaded ? 1 : 0,
            transition: `opacity 0.3s ease-out ${delay + 800}ms`
          }}
        />
      </g>
    </g>
  );
};

const ComplianceVisual = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-[500px] lg:h-[600px]">
      {/* Subtle glow behind */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-warning/10 rounded-3xl blur-3xl opacity-50" />

      <svg
        viewBox="0 0 500 500"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background grid pattern - subtle */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="0.5" className="fill-muted-foreground/20" />
          </pattern>
          <pattern id="lines" width="80" height="80" patternUnits="userSpaceOnUse">
            <line x1="0" y1="40" x2="80" y2="40" className="stroke-muted-foreground/10" strokeWidth="0.5" strokeDasharray="4 8" />
            <line x1="40" y1="0" x2="40" y2="80" className="stroke-muted-foreground/10" strokeWidth="0.5" strokeDasharray="4 8" />
          </pattern>
        </defs>

        {/* Background fills */}
        <rect width="500" height="500" fill="url(#grid)" className="opacity-60" />
        <rect width="500" height="500" fill="url(#lines)" className="opacity-40" />

        {/* Abstract background shapes - very subtle */}
        <ellipse cx="150" cy="450" rx="120" ry="60" className="fill-primary/3" />
        <ellipse cx="400" cy="100" rx="100" ry="50" className="fill-warning/3" />
        <circle cx="50" cy="250" r="80" className="fill-muted-foreground/2" />

        {/* Animated connecting lines */}
        <g className="stroke-primary/30" strokeWidth="1.5" strokeDasharray="6 4">
          {/* Main flow lines */}
          <path
            d="M100 250 Q 200 200, 250 250 T 400 250"
            className={`transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              strokeDashoffset: loaded ? 0 : 400,
              animation: loaded ? 'flowLine 3s linear infinite' : 'none'
            }}
          />
          <path
            d="M150 150 Q 250 100, 350 150"
            className={`transition-all duration-1000 delay-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ animation: loaded ? 'flowLine 4s linear infinite 0.5s' : 'none' }}
          />
          <path
            d="M150 350 Q 250 400, 350 350"
            className={`transition-all duration-1000 delay-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ animation: loaded ? 'flowLine 3.5s linear infinite 1s' : 'none' }}
          />
          <path
            d="M250 100 L 250 400"
            className={`transition-all duration-1000 delay-400 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ animation: loaded ? 'flowLineVertical 2.5s linear infinite' : 'none' }}
          />
        </g>

        {/* Document Icon - Top Left */}
        <g
          className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '100ms', animation: loaded ? 'floatSoft 4s ease-in-out infinite' : 'none' }}
        >
          <rect x="80" y="120" width="60" height="75" rx="4" className="fill-card stroke-primary/50" strokeWidth="1.5" />
          <rect x="80" y="120" width="60" height="18" rx="4" className="fill-primary/20" />
          <line x1="90" y1="155" x2="130" y2="155" className="stroke-muted-foreground/40" strokeWidth="2" strokeLinecap="round" />
          <line x1="90" y1="165" x2="120" y2="165" className="stroke-muted-foreground/30" strokeWidth="2" strokeLinecap="round" />
          <line x1="90" y1="175" x2="125" y2="175" className="stroke-muted-foreground/30" strokeWidth="2" strokeLinecap="round" />
          {/* Checkmark on document */}
          <circle cx="125" cy="130" r="8" className="fill-success/20 stroke-success" strokeWidth="1.5" />
          <path d="M121 130 L124 133 L130 127" className="stroke-success" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Label for Document */}
        <AnimatedLabel
          x={145}
          y={140}
          text="Statutory Filings"
          delay={800}
          connectorPath="M140 145 Q 145 145, 145 140"
          position="right"
          loaded={loaded}
        />

        {/* Scales of Justice - Top Right */}
        <g
          className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '200ms', animation: loaded ? 'floatSoft 5s ease-in-out infinite 0.5s' : 'none' }}
        >
          <line x1="380" y1="100" x2="380" y2="145" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
          <circle cx="380" cy="95" r="6" className="fill-warning stroke-warning/80" strokeWidth="1.5" />
          <line x1="350" y1="115" x2="410" y2="115" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
          {/* Left pan */}
          <path d="M350 115 L345 135 Q350 140, 355 135 L350 115" className="fill-primary/20 stroke-primary" strokeWidth="1.5" />
          {/* Right pan */}
          <path d="M410 115 L405 135 Q410 140, 415 135 L410 115" className="fill-primary/20 stroke-primary" strokeWidth="1.5" />
          {/* Balance indicator */}
          <circle cx="380" cy="148" r="4" className="fill-success animate-pulse" />
        </g>

        {/* Label for Scales */}
        <AnimatedLabel
          x={380}
          y={70}
          text="Legal Validation"
          delay={1000}
          connectorPath="M380 90 L 380 75"
          position="top"
          loaded={loaded}
        />

        {/* Central Gear System */}
        <g
          className={`transition-all duration-700 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          style={{ transitionDelay: '300ms', transformOrigin: '250px 250px' }}
        >
          {/* Main gear */}
          <g style={{ transformOrigin: '250px 250px', animation: loaded ? 'rotateSlow 20s linear infinite' : 'none' }}>
            <circle cx="250" cy="250" r="45" className="fill-card stroke-primary" strokeWidth="2" />
            <circle cx="250" cy="250" r="30" className="fill-none stroke-primary/50" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="250" cy="250" r="12" className="fill-primary/30" />
            {/* Gear teeth */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <rect
                key={i}
                x="247"
                y="200"
                width="6"
                height="12"
                rx="2"
                className="fill-primary"
                transform={`rotate(${angle} 250 250)`}
              />
            ))}
          </g>

          {/* Secondary gear */}
          <g style={{ transformOrigin: '320px 200px', animation: loaded ? 'rotateSlowReverse 15s linear infinite' : 'none' }}>
            <circle cx="320" cy="200" r="25" className="fill-card stroke-warning" strokeWidth="1.5" />
            <circle cx="320" cy="200" r="8" className="fill-warning/30" />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <rect
                key={i}
                x="318"
                y="172"
                width="4"
                height="8"
                rx="1"
                className="fill-warning"
                transform={`rotate(${angle} 320 200)`}
              />
            ))}
          </g>
        </g>

        {/* Label for Gears - Automation */}
        <AnimatedLabel
          x={250}
          y={310}
          text="Process Automation"
          delay={1200}
          connectorPath="M250 295 L 250 305"
          position="bottom"
          loaded={loaded}
        />

        {/* Shield - Center Left */}
        <g
          className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
          style={{ transitionDelay: '400ms', animation: loaded ? 'floatSoft 4.5s ease-in-out infinite 0.3s' : 'none' }}
        >
          <path
            d="M160 240 L160 275 Q160 295, 180 305 Q200 295, 200 275 L200 240 L180 230 L160 240Z"
            className="fill-card stroke-primary"
            strokeWidth="2"
          />
          <path
            d="M165 245 L165 273 Q165 288, 180 296 Q195 288, 195 273 L195 245 L180 237 L165 245Z"
            className="fill-primary/10"
          />
          <path d="M172 268 L178 274 L190 262" className="stroke-success" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Label for Shield */}
        <AnimatedLabel
          x={160}
          y={270}
          text="Risk Monitoring"
          delay={1400}
          connectorPath="M160 268 Q 155 268, 155 270"
          position="left"
          loaded={loaded}
        />

        {/* Checklist - Bottom Left */}
        <g
          className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '500ms', animation: loaded ? 'floatSoft 3.5s ease-in-out infinite 0.7s' : 'none' }}
        >
          <rect x="100" y="340" width="55" height="70" rx="4" className="fill-card stroke-muted-foreground/30" strokeWidth="1.5" />
          {/* Checkboxes */}
          <rect x="108" y="350" width="10" height="10" rx="2" className="fill-success/20 stroke-success" strokeWidth="1" />
          <path d="M110 355 L113 358 L117 352" className="stroke-success" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="124" y1="355" x2="148" y2="355" className="stroke-muted-foreground/50" strokeWidth="2" strokeLinecap="round" />

          <rect x="108" y="368" width="10" height="10" rx="2" className="fill-success/20 stroke-success" strokeWidth="1" />
          <path d="M110 373 L113 376 L117 370" className="stroke-success" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="124" y1="373" x2="145" y2="373" className="stroke-muted-foreground/50" strokeWidth="2" strokeLinecap="round" />

          <rect x="108" y="386" width="10" height="10" rx="2" className="fill-warning/20 stroke-warning" strokeWidth="1" />
          <line x1="124" y1="391" x2="142" y2="391" className="stroke-muted-foreground/40" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Label for Checklist */}
        <AnimatedLabel
          x={160}
          y={375}
          text="Audit Ready Records"
          delay={1600}
          connectorPath="M155 375 Q 158 375, 160 375"
          position="right"
          loaded={loaded}
        />

        {/* Network Nodes - Right Side */}
        <g
          className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
          style={{ transitionDelay: '600ms' }}
        >
          {/* Main node */}
          <circle cx="380" cy="300" r="20" className="fill-card stroke-primary" strokeWidth="2" style={{ animation: loaded ? 'pulseSoft 3s ease-in-out infinite' : 'none' }} />
          <circle cx="380" cy="300" r="8" className="fill-primary/40" />

          {/* Connected nodes */}
          <line x1="380" y1="320" x2="360" y2="360" className="stroke-primary/40" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="360" cy="370" r="12" className="fill-card stroke-warning" strokeWidth="1.5" style={{ animation: loaded ? 'floatSoft 3s ease-in-out infinite 0.2s' : 'none' }} />
          <circle cx="360" cy="370" r="4" className="fill-warning/50" />

          <line x1="400" y1="300" x2="430" y2="280" className="stroke-primary/40" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="440" cy="275" r="12" className="fill-card stroke-success" strokeWidth="1.5" style={{ animation: loaded ? 'floatSoft 2.5s ease-in-out infinite 0.4s' : 'none' }} />
          <circle cx="440" cy="275" r="4" className="fill-success/50" />

          <line x1="380" y1="280" x2="410" y2="240" className="stroke-primary/40" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>

        {/* Label for Network */}
        <AnimatedLabel
          x={440}
          y={275}
          text="Payroll Compliance"
          delay={1800}
          connectorPath="M400 300 Q 420 305, 440 310"
          position="top"
          loaded={loaded}
        />

        {/* Automation Circle - Bottom Right */}
        <g
          className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '700ms', animation: loaded ? 'floatSoft 4s ease-in-out infinite 1s' : 'none' }}
        >
          <circle cx="420" cy="400" r="28" className="fill-card stroke-primary/50" strokeWidth="1.5" />
          <circle cx="420" cy="400" r="18" className="fill-none stroke-warning" strokeWidth="2" strokeDasharray="25 85" style={{ transformOrigin: '420px 400px', animation: loaded ? 'rotateSlow 4s linear infinite' : 'none' }} />
          <circle cx="420" cy="400" r="18" className="fill-none stroke-success" strokeWidth="2" strokeDasharray="25 85" strokeDashoffset="40" style={{ transformOrigin: '420px 400px', animation: loaded ? 'rotateSlowReverse 5s linear infinite' : 'none' }} />
          {/* Play/auto icon */}
          <path d="M414 393 L414 407 L426 400 Z" className="fill-primary" />
        </g>

        {/* Label for Automation */}
        <AnimatedLabel
          x={420}
          y={445}
          text="Compliance Calendar"
          delay={2000}
          connectorPath="M420 428 L 420 440"
          position="bottom"
          loaded={loaded}
        />

        {/* Floating Particles */}
        <g className={`${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
          {[
            { cx: 130, cy: 280, delay: 0 },
            { cx: 300, cy: 130, delay: 0.5 },
            { cx: 450, cy: 350, delay: 1 },
            { cx: 200, cy: 420, delay: 1.5 },
            { cx: 350, cy: 450, delay: 2 },
            { cx: 70, cy: 380, delay: 2.5 },
            { cx: 480, cy: 180, delay: 3 },
          ].map((particle, i) => (
            <circle
              key={i}
              cx={particle.cx}
              cy={particle.cy}
              r="3"
              className="fill-primary/40"
              style={{ animation: loaded ? `floatParticle 3s ease-in-out infinite ${particle.delay}s` : 'none' }}
            />
          ))}
        </g>

        {/* Checkmark Bursts */}
        <g className={`${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 delay-700`}>
          <g style={{ animation: loaded ? 'checkPulse 4s ease-in-out infinite' : 'none' }}>
            <circle cx="220" cy="180" r="14" className="fill-success/10 stroke-success/50" strokeWidth="1" />
            <path d="M214 180 L218 184 L226 176" className="stroke-success" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g style={{ animation: loaded ? 'checkPulse 4s ease-in-out infinite 2s' : 'none' }}>
            <circle cx="300" cy="380" r="14" className="fill-success/10 stroke-success/50" strokeWidth="1" />
            <path d="M294 380 L298 384 L306 376" className="stroke-success" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>

        {/* Additional faint dotted paths for visual balance */}
        <g className="stroke-muted-foreground/10" strokeWidth="1" strokeDasharray="2 6">
          <path d="M50 150 Q 100 100, 180 120" className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1500ms' }} />
          <path d="M450 420 Q 480 380, 470 320" className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1700ms' }} />
          <path d="M30 350 Q 60 400, 90 380" className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1900ms' }} />
        </g>
      </svg>

      {/* CSS Animations */}
      <style>{`
        @keyframes floatSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatLabel {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes floatParticle {
          0%, 100% { opacity: 0.4; transform: translate(0, 0); }
          50% { opacity: 0.8; transform: translate(5px, -5px); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotateSlowReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes flowLine {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }
        @keyframes flowLineVertical {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes checkPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          svg * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ComplianceVisual;
