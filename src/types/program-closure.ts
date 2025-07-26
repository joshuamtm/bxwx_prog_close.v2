export interface ContactInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  extension?: string;
  department?: string;
  availability?: string;
  preferredContact?: 'email' | 'phone' | 'both';
  authorityLevel?: 'primary' | 'backup' | 'alternate';
}

export interface ProgramDetails {
  programName: string;
  programType: 'education' | 'social-services' | 'healthcare' | 'workforce-development' | 'housing' | 'other';
  description?: string;
  lastServiceDate: Date;
  closureDate: Date;
  closureReason: 'funding-ended' | 'program-completion' | 'relocation' | 'consolidation' | 'other';
  staffCount: number;
  participantCount?: number;
  organizationalStructure?: string;
  complianceRequirements?: string[];
  budgetImplications?: string;
  fundingSource?: string;
  regulatoryConsiderations?: string;
}

export interface LocationDetails {
  building: string;
  floor?: string;
  roomNumbers: string[];
  address: string;
  city: string;
  state: string;
  zipCode: string;
  accessRestrictions?: string;
  securityRequirements?: string;
  keyReturnRequired: boolean;
  keyReturnDate?: Date;
  keyReturnContact?: string;
  specialAccessRequirements?: string;
  parkingConsiderations?: string;
}

export interface AssetItem {
  id: string;
  type: string;
  description: string;
  quantity: number;
  assetTag?: string;
  serialNumber?: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'non-functional';
  location: string;
  disposition: 'transfer' | 'surplus' | 'dispose' | 'return' | 'storage' | 'auction';
  specialInstructions?: string;
  estimatedValue?: number;
  acquisitionDate?: Date;
  warrantyInfo?: string;
  disposalRequirements?: string;
}

export interface ITEquipment extends AssetItem {
  type: 'desktop' | 'laptop' | 'monitor' | 'printer' | 'phone' | 'network-device' | 'server' | 'tablet' | 'mobile-device' | 'other-it';
  networkConnected: boolean;
  dataWipeRequired: boolean;
  manufacturer?: string;
  model?: string;
  operatingSystem?: string;
  dataClassification?: 'public' | 'internal' | 'confidential' | 'restricted';
  backupRequired?: boolean;
  encryptionStatus?: 'encrypted' | 'not-encrypted' | 'unknown';
  softwareLicenses?: string[];
  networkConfiguration?: string;
}

export interface Furniture extends AssetItem {
  type: 'desk' | 'chair' | 'table' | 'cabinet' | 'shelving' | 'storage' | 'seating' | 'workstation' | 'other-furniture';
  dimensions?: string;
  material?: string;
  disassemblyRequired: boolean;
  weight?: number;
  moveComplexity?: 'simple' | 'moderate' | 'complex';
  assemblyInstructions?: string;
  specialMoveRequirements?: string;
}

export interface DigitalAsset {
  id: string;
  type: 'user-account' | 'shared-drive' | 'database' | 'application' | 'email-group' | 'website' | 'cloud-service' | 'other';
  name: string;
  description?: string;
  owner: string;
  backupRequired: boolean;
  retentionPeriod?: string;
  accessPermissions: string[];
  deactivationDate?: Date;
  archivalRequired: boolean;
  complianceNotes?: string;
  dataClassification?: 'public' | 'internal' | 'confidential' | 'restricted';
  businessCriticality?: 'low' | 'medium' | 'high' | 'critical';
  dependencies?: string[];
}

export interface UserAccount extends DigitalAsset {
  type: 'user-account';
  email: string;
  employeeName: string;
  department: string;
  lastLoginDate?: Date;
  forwardingEmail?: string;
  mailboxSize?: number;
  sharedMailboxAccess?: string[];
  groupMemberships?: string[];
  applicationAccess?: string[];
  specialPermissions?: string[];
}

export interface NetworkingRequirements {
  wifiAccessPoints: number;
  networkPrinters: number;
  sharedDrives: string[];
  networkDrops: number;
  phoneLines: number;
  internetCircuits: string[];
  vpnAccess: string[];
  specialNetworkNeeds?: string;
  firewallRules?: string[];
  networkEquipment?: string[];
  ipAddressRanges?: string[];
  dnsEntries?: string[];
  certificateRequirements?: string[];
}

export interface LogisticsRequirements {
  packingRequired: boolean;
  labelingInstructions?: string;
  elevatorRequired: boolean;
  loadingDockAccess: boolean;
  truckAccessRequired: boolean;
  storageNeeded: boolean;
  specialHandling?: string;
  hazardousMaterials?: string;
  insuranceRequired: boolean;
  transportationNeeds?: string;
  coordinationContact?: string;
  accessTimes?: string;
  deliveryRestrictions?: string;
  equipmentNeeded?: string[];
  laborRequirements?: string;
}

export interface Timeline {
  equipmentPickupDate?: Date;
  furniturePickupDate?: Date;
  digitalAssetDeactivationDate?: Date;
  finalVacateDate: Date;
  keyReturnDate?: Date;
  auditDate?: Date;
  documentationDueDate?: Date;
  coordinationMeetingDate?: Date;
  stakeholderNotificationDate?: Date;
  accessDeactivationDate?: Date;
  finalInspectionDate?: Date;
  handoverDate?: Date;
}

export interface QualityChecks {
  informationComplete: boolean;
  contactsVerified: boolean;
  assetsInventoried: boolean;
  timelineConfirmed: boolean;
  stakeholdersNotified: boolean;
  complianceReviewed: boolean;
  risksAssessed: boolean;
  budgetApproved?: boolean;
  regulatoryCleared?: boolean;
  securityCleared?: boolean;
}

export interface StakeholderCommunication {
  itOperationsNotified: boolean;
  adminOperationsNotified: boolean;
  securityNotified: boolean;
  facilitiesNotified: boolean;
  hrNotified: boolean;
  financeNotified: boolean;
  complianceNotified?: boolean;
  legalNotified?: boolean;
  customStakeholders?: string[];
  notificationMethod?: 'email' | 'meeting' | 'both';
  escalationRequired?: boolean;
}

export interface RiskAssessment {
  identifiedRisks: Risk[];
  mitigationStrategies: string[];
  contingencyPlans?: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  approvalRequired?: boolean;
}

export interface Risk {
  id: string;
  category: 'technical' | 'operational' | 'financial' | 'compliance' | 'security' | 'other';
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  mitigationPlan?: string;
  owner?: string;
  status: 'identified' | 'mitigated' | 'accepted' | 'transferred';
}

export interface ProgramClosureData {
  id: string;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'in-progress' | 'completed' | 'cancelled' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  programDetails: ProgramDetails;
  primaryContact: ContactInfo;
  alternateContact?: ContactInfo;
  location: LocationDetails;
  
  itEquipment: ITEquipment[];
  furniture: Furniture[];
  digitalAssets: DigitalAsset[];
  userAccounts: UserAccount[];
  
  networkingRequirements: NetworkingRequirements;
  logisticsRequirements: LogisticsRequirements;
  timeline: Timeline;
  
  qualityChecks: QualityChecks;
  stakeholderCommunication: StakeholderCommunication;
  riskAssessment?: RiskAssessment;
  
  additionalNotes?: string;
  specialRequirements?: string;
  budgetConsiderations?: string;
  successCriteria?: string[];
  lessonsLearned?: string;
  
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastModifiedBy: string;
  
  submittedAt?: Date;
  approvedAt?: Date;
  completedAt?: Date;
  
  auditTrail: AuditEvent[];
  notifications: NotificationEvent[];
  attachments?: Attachment[];
}

export interface AuditEvent {
  id: string;
  timestamp: Date;
  action: 'created' | 'updated' | 'submitted' | 'reviewed' | 'approved' | 'rejected' | 'completed' | 'cancelled' | 'exported' | 'notification-sent';
  user: string;
  userRole: string;
  changes?: Record<string, { from: unknown; to: unknown }>;
  notes?: string;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
}

export interface NotificationEvent {
  id: string;
  timestamp: Date;
  type: 'email' | 'in-app' | 'sms';
  recipient: string;
  subject: string;
  content: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  retryCount?: number;
  deliveredAt?: Date;
}

export interface Attachment {
  id: string;
  filename: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: Date;
  description?: string;
  category: 'document' | 'image' | 'spreadsheet' | 'other';
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  completionPercentage: number;
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
  code?: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
  code?: string;
}

export interface ReportData {
  programClosure: ProgramClosureData;
  generatedAt: Date;
  generatedBy: string;
  reportType: 'comprehensive' | 'it-operations' | 'admin-operations' | 'timeline' | 'compliance' | 'executive-summary';
  format: 'pdf' | 'excel' | 'word' | 'json';
}

export interface StakeholderReport {
  stakeholder: 'it-operations' | 'admin-operations' | 'program-director' | 'compliance' | 'finance' | 'hr' | 'facilities';
  title: string;
  sections: ReportSection[];
  actionItems: ActionItem[];
  timeline: TimelineItem[];
  summary: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface ReportSection {
  id: string;
  title: string;
  content: string;
  data?: Record<string, unknown>;
  priority: number;
  category: string;
}

export interface ActionItem {
  id: string;
  description: string;
  assignedTo?: string;
  dueDate?: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  dependencies?: string[];
  estimatedEffort?: string;
  notes?: string;
}

export interface TimelineItem {
  id: string;
  date: Date;
  event: string;
  description?: string;
  stakeholder?: string;
  status: 'scheduled' | 'completed' | 'overdue' | 'cancelled';
  dependencies?: string[];
}

export type FormStep = 
  | 'program-info'
  | 'contacts'
  | 'location'
  | 'it-equipment'
  | 'furniture'
  | 'digital-assets'
  | 'networking'
  | 'logistics'
  | 'timeline'
  | 'risk-assessment'
  | 'review';

export interface FormStepConfig {
  id: FormStep;
  title: string;
  description: string;
  isRequired: boolean;
  estimatedTime: number; // in minutes
  dependencies?: FormStep[];
  validationRules?: Record<string, unknown>;
}

export interface WorkflowState {
  currentStep: FormStep;
  completedSteps: FormStep[];
  availableSteps: FormStep[];
  canProceed: boolean;
  canGoBack: boolean;
  overallProgress: number;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'in-app';
  subject: string;
  content: string;
  variables: string[];
  triggers: string[];
  stakeholders: string[];
}

export interface SystemSettings {
  autoSaveInterval: number; // in milliseconds
  sessionTimeout: number; // in minutes
  maxFileUploadSize: number; // in bytes
  supportedFileTypes: string[];
  notificationSettings: {
    emailEnabled: boolean;
    smsEnabled: boolean;
    inAppEnabled: boolean;
  };
  complianceSettings: {
    retentionPeriod: number; // in years
    auditTrailEnabled: boolean;
    encryptionRequired: boolean;
  };
}