
import React from 'react';
import { COURT_DIMENSIONS } from '../constants';
import { CourtColors, CourtConfig } from '../types';

interface CourtRendererProps {
  colors: CourtColors;
  config: CourtConfig;
}

const CourtRenderer: React.FC<CourtRendererProps> = ({ colors, config }) => {
  const S = 30; // Scale factor (1m = 30px)
  const W = COURT_DIMENSIONS.CANVAS_WIDTH * S;
  const H = COURT_DIMENSIONS.CANVAS_HEIGHT * S;
  
  const cx = W / 2;
  const cy = H / 2;

  const fW = COURT_DIMENSIONS.FUTSAL_WIDTH * S;
  const fH = COURT_DIMENSIONS.FUTSAL_LENGTH * S;
  
  const bW = 15 * S; // Basketball width

  const vW = COURT_DIMENSIONS.VOLLEYBALL_WIDTH * S;
  const vH = COURT_DIMENSIONS.VOLLEYBALL_LENGTH * S;

  const LW = config.lineWidth;

  // Basketball 3pt line calculations (FIBA Standards)
  const b3ptR = 6.75 * S;
  const b3ptX = 6.6 * S; // 7.5m (half width) - 0.9m (distance from sideline)
  const bBasketY = 1.575 * S; // Distance from end line to basket center
  const b3ptArcOffset = Math.sqrt(Math.pow(b3ptR, 2) - Math.pow(b3ptX, 2));
  const b3ptTotalY = bBasketY + b3ptArcOffset;

  // Futsal "D" Area Path Construction
  const R = COURT_DIMENSIONS.FUTSAL_AREA_RADIUS * S;
  const GW = COURT_DIMENSIONS.FUTSAL_GOAL_WIDTH * S;
  
  // Top Area Path (Futsal)
  const topAreaPath = `
    M ${cx - GW/2 - R} ${cy - fH/2}
    A ${R} ${R} 0 0 0 ${cx - GW/2} ${cy - fH/2 + R}
    L ${cx + GW/2} ${cy - fH/2 + R}
    A ${R} ${R} 0 0 0 ${cx + GW/2 + R} ${cy - fH/2}
    Z
  `;

  // Bottom Area Path (Futsal)
  const bottomAreaPath = `
    M ${cx - GW/2 - R} ${cy + fH/2}
    A ${R} ${R} 0 0 1 ${cx - GW/2} ${cy + fH/2 - R}
    L ${cx + GW/2} ${cy + fH/2 - R}
    A ${R} ${R} 0 0 1 ${cx + GW/2 + R} ${cy + fH/2}
    Z
  `;

  return (
    <div className="flex items-center justify-center p-4 lg:p-12 overflow-auto bg-slate-800 rounded-xl shadow-2xl border border-slate-700 min-h-[600px]">
      <svg 
        id="court-svg"
        width={W} 
        height={H} 
        viewBox={`0 0 ${W} ${H}`}
        className="rounded shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* EXTERNAL BUFFER AREA */}
        <rect x="0" y="0" width={W} height={H} fill={colors.external} />

        {/* MAIN FUTSAL COURT AREA (Base) */}
        <rect 
          x={cx - fW/2} 
          y={cy - fH/2} 
          width={fW} 
          height={fH} 
          fill={colors.futsalMain} 
        />

        {/* VOLLEYBALL AREA (Pintura da Quadra de Vôlei) - Rendered before keys/circle to avoid overlap issues */}
        {config.showVolleyball && (
          <rect 
            x={cx - vW/2} 
            y={cy - vH/2} 
            width={vW} 
            height={vH} 
            fill={colors.volleyballArea}
          />
        )}

        {/* FUTSAL PENALTY AREAS (Painted) */}
        {config.showFutsal && (
          <g fill={colors.futsalArea}>
            <path d={topAreaPath} />
            <path d={bottomAreaPath} />
          </g>
        )}

        {/* BASKETBALL KEY AREAS (Pintura do Garrafão) */}
        {config.showBasketball && (
          <g fill={colors.basketballKey}>
            <rect 
              x={cx - (COURT_DIMENSIONS.BASKETBALL_KEY_WIDTH * S) / 2} 
              y={cy - fH/2} 
              width={COURT_DIMENSIONS.BASKETBALL_KEY_WIDTH * S} 
              height={COURT_DIMENSIONS.BASKETBALL_KEY_LENGTH * S} 
            />
            <rect 
              x={cx - (COURT_DIMENSIONS.BASKETBALL_KEY_WIDTH * S) / 2} 
              y={cy + fH/2 - (COURT_DIMENSIONS.BASKETBALL_KEY_LENGTH * S)} 
              width={COURT_DIMENSIONS.BASKETBALL_KEY_WIDTH * S} 
              height={COURT_DIMENSIONS.BASKETBALL_KEY_LENGTH * S} 
            />
          </g>
        )}

        {/* CENTER CIRCLE AREA */}
        {config.showFutsal && (
          <circle cx={cx} cy={cy} r={COURT_DIMENSIONS.FUTSAL_CENTER_CIRCLE_RADIUS * S} fill={colors.centerCircleFutsal} />
        )}
        {config.showBasketball && (
          <circle cx={cx} cy={cy} r={1.8 * S} fill={colors.centerCircleBasketball} />
        )}

        {/* --- LINES RENDERING ORDER: BASKETBALL -> VOLLEYBALL -> FUTSAL (LAST TO BE ON TOP) --- */}

        {/* BASKETBALL LINES */}
        {config.showBasketball && (
          <g fill="none" stroke={colors.basketballLines} strokeWidth={LW}>
             {/* Note: Perimeter rect removed as requested in previous turn */}
             
             {/* 3 point arcs - Corrected geometry centered on basket */}
             <path d={`M ${cx - b3ptX} ${cy - fH/2} L ${cx - b3ptX} ${cy - fH/2 + b3ptTotalY} A ${b3ptR} ${b3ptR} 0 0 0 ${cx + b3ptX} ${cy - fH/2 + b3ptTotalY} L ${cx + b3ptX} ${cy - fH/2}`} />
             <path d={`M ${cx - b3ptX} ${cy + fH/2} L ${cx - b3ptX} ${cy + fH/2 - b3ptTotalY} A ${b3ptR} ${b3ptR} 0 0 1 ${cx + b3ptX} ${cy + fH/2 - b3ptTotalY} L ${cx + b3ptX} ${cy + fH/2}`} />

             {/* Keys (Garrafão) 4.90m wide */}
             <rect x={cx - 2.45*S} y={cy - fH/2} width={4.9*S} height={5.8*S} />
             <rect x={cx - 2.45*S} y={cy + fH/2 - 5.8*S} width={4.9*S} height={5.8*S} />
             
             {/* Free throw circles */}
             <circle cx={cx} cy={cy - fH/2 + 5.8*S} r={1.8*S} />
             <circle cx={cx} cy={cy + fH/2 - 5.8*S} r={1.8*S} />
             
             {/* Center Circle (Basketball) */}
             <circle cx={cx} cy={cy} r={1.8*S} />
          </g>
        )}

        {/* VOLLEYBALL LINES */}
        {config.showVolleyball && (
          <g fill="none" stroke={colors.volleyballLines} strokeWidth={LW}>
            {/* Court border 18x9 */}
            <rect x={cx - vW/2} y={cy - vH/2} width={vW} height={vH} />
            {/* Center Line (Rede) */}
            <line x1={cx - vW/2} y1={cy} x2={cx + vW/2} y2={cy} />
            {/* Attack lines (3m from center) */}
            <line x1={cx - vW/2} y1={cy - 3 * S} x2={cx + vW/2} y2={cy - 3 * S} />
            <line x1={cx - vW/2} y1={cy + 3 * S} x2={cx + vW/2} y2={cy + 3 * S} />
          </g>
        )}

        {/* FUTSAL LINES (RENDERED LAST TO ENSURE END LINE PREDOMINANCE) */}
        {config.showFutsal && (
          <g fill="none" stroke={colors.futsalLines} strokeWidth={LW}>
            {/* Outer perimeter 28x16 - This is the "Linha de Fundo" (End Line) */}
            <rect x={cx - fW/2} y={cy - fH/2} width={fW} height={fH} />
            {/* Center Line */}
            <line x1={cx - fW/2} y1={cy} x2={cx + fW/2} y2={cy} />
            {/* Center Circle */}
            <circle cx={cx} cy={cy} r={COURT_DIMENSIONS.FUTSAL_CENTER_CIRCLE_RADIUS * S} />
            {/* Penalty Areas Boundaries (The "D") */}
            <path d={topAreaPath} />
            <path d={bottomAreaPath} />
            {/* Penalty Spots */}
            <circle cx={cx} cy={cy - fH/2 + COURT_DIMENSIONS.FUTSAL_PENALTY_SPOT * S} r={LW} fill={colors.futsalLines} stroke="none" />
            <circle cx={cx} cy={cy + fH/2 - COURT_DIMENSIONS.FUTSAL_PENALTY_SPOT * S} r={LW} fill={colors.futsalLines} stroke="none" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default CourtRenderer;
