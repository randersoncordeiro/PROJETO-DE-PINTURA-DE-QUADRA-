
export interface CourtColors {
  external: string;
  futsalMain: string;
  futsalArea: string; // Added for the penalty "D" areas
  basketballKey: string;
  centerCircleFutsal: string;
  centerCircleBasketball: string;
  volleyballArea: string;
  futsalLines: string;
  basketballLines: string;
  volleyballLines: string;
}

export interface CourtConfig {
  showFutsal: boolean;
  showBasketball: boolean;
  showVolleyball: boolean;
  lineWidth: number;
}
