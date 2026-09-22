export type LSDGTheme =
  | 'Water sufficiency'
  | 'Clean and green villages'
  | 'Self-sufficient infrastructure'
  | 'Good governance';

export type ServiceCategory =
  | 'Drinking water'
  | 'Road / access'
  | 'Drainage / sanitation'
  | 'Solar / public lighting'
  | 'Rainwater / other'
  | 'Rural housing'
  | 'Livelihood / SHG';

export type PriorityLevel = 'High' | 'Medium' | 'Low';

export type GPValidationStatus =
  | 'Pending Review'
  | 'GP Approved'
  | 'Referred to Scheme'
  | 'Field Check Required'
  | 'Duplicate Linked'
  | 'Rejected';

export interface GramPanchayat {
  id: string;
  name: string;
  hindiName: string;
  lgdCode: string;
  block: string;
  district: string;
  state: string;
  villages: string[];
  wards: string[];
  sarpanchName: string; // मुखिया जी
  secretaryName: string; // पंचायत सचिव
  vikasMitraName: string; // विकास मित्र
  jeevikaCmoName: string; // जीविका दीदी अध्यक्ष
  population: number;
  totalHouseholds: number;
}

export interface CitizenNeed {
  id: string;
  callId?: string;
  gpId: string;
  village: string;
  ward: string;
  category: ServiceCategory;
  title: string;
  titleHindi?: string;
  description: string;
  locationDetails: string;
  coordinates?: { lat: number; lng: number };
  gpsAccuracyMeters?: number;
  priority: PriorityLevel;
  estimatedCost: number;
  status: GPValidationStatus;
  submittedBy: string;
  submittedAt: string;
  householdId?: string;
  lsdgTheme: LSDGTheme;
  aiSuggestedScheme?: string;
  aiConfidence?: number;
  hasVoiceNote?: boolean;
  hasPhoto?: boolean;
  officerNotes?: string;
  khesraNo?: string; // खेसरा संख्या (बिहार भू-अभिलेख)
  khataNo?: string;  // खाता संख्या
}

export interface SanctionedSchemeWork {
  id: string; // Work ID e.g. W-JJM-101
  schemeCode:
    | 'JJM'
    | 'PMGSY'
    | 'SBM-G'
    | 'MGNREGS'
    | 'PM-SURYA'
    | 'PM-KUSUM'
    | 'PMAY-G'
    | 'WDC-PMKSY'
    | 'DAY-NRLM'
    | 'CAMPA'
    | 'SAAT_NISCHAY_NAL'
    | 'JAL_JEEVAN_HARIYALI'
    | 'MMGSY_BIHAR'
    | 'BREDA_SOLAR';
  schemeName: string;
  workName: string;
  gpId: string;
  ward: string;
  financialYear: string;
  sanctionReference: string;
  sourceDate: string;
  sanctionedAmount: number;
  releasedAmount: number;
  spentAmount: number;
  committedAmount: number;
  status: 'Sanctioned' | 'In Progress' | 'Completed' | 'Tender Floating';
  contractorOrAgency: string;
  linkedNeedIds: string[];
  components: string[];
}

export interface DigitalTwinAsset {
  id: string;
  name: string;
  hindiName?: string;
  type:
    | 'Panchayat Bhawan'
    | 'School'
    | 'Anganwadi'
    | 'Health Centre'
    | 'Community Hall'
    | 'Water Tank'
    | 'Rooftop Residential'
    | 'Solar Agricultural'
    | 'Ahar Pyne / Pokhar';
  svamitvaParcelId: string;
  khesraNo: string; // खेसरा
  khataNo: string;  // खाता
  rakbaDecimal: number; // रकबा (डिसमिल)
  ward: string;
  x: number; // visual coordinates on map 0-100
  y: number;
  heightMeters: number;
  roofAreaSqM: number;
  surveyDate: string;
  surveyAccuracy: string;
  solarSuitability: {
    feasible: boolean;
    usableRoofAreaSqM: number;
    shadingPercentage: number;
    solarIrradianceKwhM2: number;
    potentialKwp: number;
    estimatedAnnualSavingsInr: number;
    annualGenerationKwh: number;
  };
  waterServiceStatus: 'Adequate' | 'Deficit' | 'Low Pressure' | 'No Pipeline';
  sanitationStatus: 'Twin-pit connected' | 'Open Drain' | 'Defective Outlet';
}

export interface RainwaterCandidate {
  id: string; // e.g. Candidate R-01
  name: string;
  hindiName?: string;
  gpId: string;
  ward: string;
  locationName: string;
  catchmentAreaHa: number;
  slopePercentage: number;
  annualRainfallMm: number;
  suggestedStructure:
    | 'Check Dam'
    | 'Percolation Tank'
    | 'Rooftop Storage Tank'
    | 'Recharge Pit'
    | 'Contour Trenches'
    | 'Ahar-Pyne Rejuvenation'
    | 'Amrit Sarovar / Pokhar';
  evidence: string;
  status: 'Candidate' | 'Field Check Required' | 'Added to Agenda' | 'Verified Feasible' | 'Rejected';
  soilInfiltrationRate: string;
  estStorageCapacityKL: number;
  estCostInr: number;
  x: number;
  y: number;
}

export interface OverlapItem {
  id: string;
  proposedNeedId: string;
  proposedTitle: string;
  matchedWorkId: string;
  matchedSchemeName: string;
  gpName: string;
  type: 'DUPLICATE_WORK' | 'CONVERGENCE_OPPORTUNITY';
  confidenceScore: number;
  aiExplanation: string;
  officerDecision?: 'Keep Separate' | 'Link as Duplicate' | 'Propose Convergence Package';
  officerReason?: string;
  assignedOmOwner?: string;
  lifecycleCostInr?: number;
  shgDroneEvidence?: string;
  reviewedAt?: string;
}

export interface GovernmentSchemeInfo {
  code: string;
  name: string;
  hindiName?: string;
  nameHindi?: string;
  category: ServiceCategory;
  ministry: string;
  description: string;
  benefitSummary: string;
  maxSubsidyAmount?: number;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  officialPortalUrl: string;
  applicationPortalUrl?: string;
}

export interface CitizenProfile {
  name: string;
  aadhaarLast4: string;
  mobileNumber: string;
  gpId: string;
  village: string;
  ward: string;
  socialCategory: 'General' | 'OBC' | 'EBC' | 'SC' | 'ST';
  economicCategory: 'BPL' | 'Antyodaya (AAY)' | 'Small & Marginal Farmer' | 'APL';
  houseType: 'Kutcha' | 'Semi-Pucca' | 'Pucca';
  landHoldingAcres: number;
  hasElectricityConnection: boolean;
  hasFunctionalTap: boolean;
  hasToilet: boolean;
  isShgMember: boolean;
  hasAgriculturalPump: boolean;
  monthlyElectricityBill: number;
}

export interface GrievanceFeedback {
  id: string;
  citizenName: string;
  schemeCode: string;
  schemeName: string;
  village?: string;
  ward?: string;
  issueType: 'Delayed Benefit' | 'Payment Pending' | 'Quality Issue' | 'Application Stuck' | 'Exclusion Error';
  description: string;
  dateSubmitted?: string;
  submittedDate?: string;
  status: 'Open' | 'Under Investigation' | 'Resolved' | 'Escalated';
  officerReply?: string;
  replyDate?: string;
  assignedDepartment?: string;
  resolutionDeadline?: string;
}
