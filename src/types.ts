export type Part = 'Lid' | 'Side' | 'End' | 'Bottom' | 'Divider' | 'Other';

export type DefectType =
  | 'Wrong Dimension - Width'
  | 'Wrong Dimension - Length'
  | 'Thickness - Too Thick'
  | 'Thickness - Too Thin'
  | 'Fastener Defect'
  | 'Wood Defect'
  | 'Assembly Error'
  | 'Sanding'
  | 'Other';

export const STANDARD_PARTS: Part[] = [
  'Lid',
  'Side',
  'End',
  'Bottom',
  'Divider',
  'Other'
];

export const DEFECT_TYPES_LIST: DefectType[] = [
  'Wrong Dimension - Width',
  'Wrong Dimension - Length',
  'Thickness - Too Thick',
  'Thickness - Too Thin',
  'Fastener Defect',
  'Wood Defect',
  'Assembly Error',
  'Sanding',
  'Other'
];

export interface DefectMatrix {
  [part: string]: {
    [defect: string]: number;
  };
}

export interface ShiftAssignments {
  Sides: string[];
  Crates: string[];
  Bottoms: string[];
  Lids: string[];
}

export interface ProductionLineState {
  employees: string[];
  morning: ShiftAssignments;
  afternoon: ShiftAssignments;
}

export interface QCDefectLog {
  id: string;
  date: string;
  sku: string;
  shiftReportedBy: string;
  matrix: DefectMatrix;
  additionalNotes: string;
  createdAt: string;
  positions?: {
    morning: ShiftAssignments;
    afternoon: ShiftAssignments;
  };
}

export function createEmptyMatrix(): DefectMatrix {
  const matrix: DefectMatrix = {};
  for (const part of STANDARD_PARTS) {
    matrix[part] = {};
    for (const defect of DEFECT_TYPES_LIST) {
      matrix[part][defect] = 0;
    }
  }
  return matrix;
}
