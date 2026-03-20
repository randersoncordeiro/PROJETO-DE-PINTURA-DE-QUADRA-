
/**
 * All dimensions in meters (m) as per the technical drawings provided.
 * Scale factor will be used for rendering.
 */
export const COURT_DIMENSIONS = {
  // Overall Canvas (Futsal 28x16 + 1m buffer each side)
  CANVAS_WIDTH: 18, 
  CANVAS_HEIGHT: 30,
  
  // Base Court (Futsal)
  FUTSAL_WIDTH: 16,
  FUTSAL_LENGTH: 28,
  BUFFER: 1.0,

  // Basketball (centered within the 28m length)
  BASKETBALL_WIDTH: 15,
  BASKETBALL_LENGTH: 28,
  BASKETBALL_KEY_WIDTH: 4.90,
  BASKETBALL_KEY_LENGTH: 5.80,
  BASKETBALL_3PT_RADIUS: 6.75,
  BASKETBALL_FREE_THROW_RADIUS: 1.80,
  BASKETBALL_CENTER_CIRCLE_RADIUS: 1.80,

  // Volleyball (centered)
  VOLLEYBALL_WIDTH: 9,
  VOLLEYBALL_LENGTH: 18,
  VOLLEYBALL_ATTACK_LINE: 3.0, // from center

  // Futsal Technical Details
  FUTSAL_GOAL_WIDTH: 3.0,
  FUTSAL_AREA_RADIUS: 4.80, // based on R4.80 provided
  FUTSAL_PENALTY_SPOT: 6.0,
  FUTSAL_SECOND_PENALTY_SPOT: 10.0,
  FUTSAL_CENTER_CIRCLE_RADIUS: 3.0,
};

export const DEFAULT_COLORS: { [K in keyof import('./types').CourtColors]: string } = {
  external: '#1e293b', // Slate 800
  futsalMain: '#1d4ed8', // Blue 700
  futsalArea: '#1e40af', // Blue 800 (slightly darker)
  basketballKey: '#b91c1c', // Red 700
  centerCircleFutsal: '#ca8a04', // Yellow 600
  centerCircleBasketball: '#1e40af', // Blue 800
  volleyballArea: '#166534', // Green 800
  futsalLines: '#ffffff',
  basketballLines: '#ffffff',
  volleyballLines: '#facc15', // Yellow 400
};
