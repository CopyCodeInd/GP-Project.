import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  FileCheck,
  Send,
  User,
  ShieldCheck,
  Building,
  HelpCircle,
  MessageSquare,
  RefreshCw,
  X,
  ChevronRight,
  ArrowRight,
  Award,
  Zap,
  Droplets,
  HeartHandshake,
  Landmark,
} from 'lucide-react';
import {
  GramPanchayat,
  CitizenProfile,
  GovernmentSchemeInfo,
  GrievanceFeedback,
} from '../types';

interface Screen7CitizenSchemesProps {
  selectedGp: GramPanchayat;
  schemes: GovernmentSchemeInfo[];
  citizenProfile: CitizenProfile;
  onUpdateProfile: (profile: CitizenProfile) => void;
  grievances: GrievanceFeedback[];
  onAddGrievance: (grievance: GrievanceFeedback) => void;
  onNavigateToScreen: (screenId: '01' | '02' | '03' | '04' | '05' | '06' | '07') => void;
}

export const Screen7CitizenSchemes: React.FC<Screen7CitizenSchemesProps> = ({
  selectedGp,
  schemes,
  citizenProfile,
  onUpdateProfile,
  grievances,
  onAddGrievance,
  onNavigateToScreen,
}) => {
  const [selectedSchemeCode, setSelectedSchemeCode] = useState<string>('JEEVIKA');
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);

  // Profile Form state
  const [profileForm, setProfileForm] = useState<CitizenProfile>(citizenProfile);

  // Feedback / Grievance form state
  const [feedbackType, setFeedbackType] = useState<
    'Delayed Benefit' | 'Payment Pending' | 'Quality Issue' | 'Application Stuck' | 'Exclusion Error'
  >('Application Stuck');
  const [feedbackText, setFeedbackText] = useState(
    'Application for JEEViKA Lakhpati Didi enterprise toolkit and CIF credit support is pending review for 4 weeks.'
  );
  const [ticketCreatedMessage, setTicketCreatedMessage] = useState<string | null>(null);

  // Active scheme details
  const activeScheme = schemes.find((s) => s.code === selectedSchemeCode) || schemes[0];

  const getSchemeEligibility = (schemeCode: string) => {
    switch (schemeCode) {
      case 'JEEVIKA':
      case 'DAY-NRLM':
        return {
          eligible: citizenProfile.isShgMember,
          score: citizenProfile.isShgMember ? 98 : 35,
          reason: citizenProfile.isShgMember
            ? 'Active member of JEEViKA Women Self Help Group (SHG). High eligibility for Lakhpati Didi enterprise incubation and up to ₹1.5L low-interest community investment fund credit.'
            : 'To unlock direct SHG enterprise grants, join or register with the local Gram Panchayat JEEViKA cluster.',
        };
      case 'SAAT_NISCHAY_NAL':
      case 'JJM':
        return {
          eligible: !citizenProfile.hasFunctionalTap,
          score: !citizenProfile.hasFunctionalTap ? 96 : 40,
          reason: !citizenProfile.hasFunctionalTap
            ? 'Household lacks a functional household tap connection (FHTC). High priority under Saat Nischay-2 drinking water augmentation.'
            : 'Records indicate an active pipeline tap connection already assigned to this premises.',
        };
      case 'PM-SURYA':
        return {
          eligible: citizenProfile.hasElectricityConnection,
          score: citizenProfile.hasElectricityConnection ? 94 : 25,
          reason: citizenProfile.hasElectricityConnection
            ? `Domestic power consumer (Monthly bill ~₹${citizenProfile.monthlyElectricityBill}). Eligible for ₹78,000 Direct Benefit Transfer (DBT) subsidy under PM Surya Ghar and BREDA rooftop solar.`
            : 'Requires an active grid consumer identification number.',
        };
      case 'PMAY-G':
        return {
          eligible: citizenProfile.houseType === 'Kutcha' || citizenProfile.houseType === 'Semi-Pucca',
          score: citizenProfile.houseType === 'Kutcha' ? 95 : 20,
          reason:
            citizenProfile.houseType !== 'Pucca'
              ? 'Identified as Kutcha / Semi-Pucca dwelling in socio-economic records. Eligible for ₹1.20 Lakhs direct pucca shelter construction grant.'
              : 'Permanent pucca dwelling already documented in cadastral registry.',
        };
      default:
        return {
          eligible: true,
          score: 85,
          reason: 'Matches general rural development eligibility criteria for citizen entitlement programs.',
        };
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
    setShowProfileModal(false);
  };

  const handleSubmitGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    const newGrievance: GrievanceFeedback = {
      id: `BPGRS-${Date.now().toString().slice(-5)}`,
      schemeCode: activeScheme?.code || 'GOV-BHR',
      schemeName: activeScheme?.name || 'Public Service Delivery',
      citizenName: citizenProfile.name,
      village: citizenProfile.village,
      ward: citizenProfile.ward,
      issueType: feedbackType,
      description: feedbackText,
      status: 'Open',
      submittedDate: new Date().toISOString().split('T')[0],
      assignedDepartment: 'Block Development Office, Makhdumpur (Jehanabad)',
      resolutionDeadline: '7 Working Days (Public Grievance Redressal Act)',
    };
    onAddGrievance(newGrievance);
    setShowFeedbackModal(false);
    setTicketCreatedMessage(
      `Grievance ticket lodged: ${newGrievance.id}. Mandated statutory resolution within 7 working days under the Bihar Public Grievance Redressal Act.`
    );
    setTimeout(() => setTicketCreatedMessage(null), 6000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                Screen 07 • Citizen Entitlements & JEEViKA
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                Direct Benefit Transfer (DBT) & Grievance Redressal
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Welfare Schemes, Personal Eligibility & Statutory Grievance Redressal
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Citizen: {citizenProfile.name} • {citizenProfile.village}, {citizenProfile.ward} • {selectedGp.name}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <User className="w-3.5 h-3.5 text-slate-600" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs shadow-xs transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Lodge Grievance</span>
            </button>
          </div>
        </div>
      </div>

      {ticketCreatedMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-semibold flex items-center space-x-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>{ticketCreatedMessage}</span>
        </div>
      )}

      {/* Main Grid: Left Scheme Selector + Right Scheme Benefit Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 5 Columns - Schemes List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-700" />
                Available Welfare Schemes ({schemes.length})
              </h3>
              <span className="text-[11px] text-slate-400">Ranked by eligibility score</span>
            </div>

            <div className="space-y-2.5">
              {schemes.map((scheme) => {
                const elig = getSchemeEligibility(scheme.code);
                const isSelected = scheme.code === selectedSchemeCode;
                return (
                  <button
                    key={scheme.code}
                    onClick={() => setSelectedSchemeCode(scheme.code)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/70 border-emerald-600 shadow-xs ring-1 ring-emerald-500'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold bg-white text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                        {scheme.code}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          elig.score >= 90
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        Match: {elig.score}%
                      </span>
                    </div>

                    <div className="font-semibold text-xs text-slate-900 mt-1.5">
                      {scheme.name}
                    </div>

                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {scheme.ministry}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: 7 Columns - Selected Scheme Dossier & Application */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-slate-900 text-white shadow-xs">
                  <Landmark className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {activeScheme?.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">{activeScheme?.ministry}</p>
                </div>
              </div>
            </div>

            {/* AI Eligibility Card */}
            {activeScheme && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Personal Eligibility Profile Match
                  </span>
                  <span className="text-[11px] font-bold font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                    Score: {getSchemeEligibility(activeScheme.code).score}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed font-normal">
                  {getSchemeEligibility(activeScheme.code).reason}
                </p>
              </div>
            )}

            {/* Scheme Benefit Details */}
            <div className="space-y-2 text-xs">
              <h4 className="font-semibold text-slate-800">Entitlement & Scope:</h4>
              <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                {activeScheme?.description}
              </p>
            </div>

            {/* Documents Required */}
            {activeScheme?.requiredDocuments && (
              <div className="space-y-1.5 text-xs">
                <h4 className="font-semibold text-slate-800">Required Verification Documents:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeScheme.requiredDocuments.map((doc, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-white border border-slate-300 text-slate-700 px-2.5 py-1 rounded-lg font-medium"
                    >
                      📄 {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Application Button */}
            <div className="pt-2">
              <a
                href={activeScheme?.applicationPortalUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs shadow-xs transition-all flex items-center justify-center space-x-1.5 active:scale-98"
              >
                <span>Direct Online Application Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Socio-Economic Citizen Profile</h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Full Name:</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Dwelling Construction Type:</label>
                  <select
                    value={profileForm.houseType}
                    onChange={(e) => setProfileForm({ ...profileForm, houseType: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 font-medium"
                  >
                    <option value="Kutcha">Kutcha (Thatched/Mud)</option>
                    <option value="Semi-Pucca">Semi-Pucca (Mixed)</option>
                    <option value="Pucca">Pucca (Permanent Concrete)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Average Power Bill (₹/mo):</label>
                  <input
                    type="number"
                    value={profileForm.monthlyElectricityBill}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, monthlyElectricityBill: Number(e.target.value) })
                    }
                    className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 font-medium font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={profileForm.isShgMember}
                    onChange={(e) => setProfileForm({ ...profileForm, isShgMember: e.target.checked })}
                    className="accent-emerald-600 rounded"
                  />
                  <span>Member of JEEViKA Self Help Group (SHG)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={profileForm.hasFunctionalTap}
                    onChange={(e) => setProfileForm({ ...profileForm, hasFunctionalTap: e.target.checked })}
                    className="accent-emerald-600 rounded"
                  />
                  <span>Functional piped water tap connection present</span>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grievance Redressal Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Statutory Public Grievance Application (BPGRS)
              </h3>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitGrievance} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Target Scheme:</label>
                <input
                  type="text"
                  disabled
                  value={activeScheme?.name}
                  className="w-full p-2 border border-slate-200 rounded-lg bg-slate-100 text-slate-700 font-semibold"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Grievance Category:</label>
                <select
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value as any)}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 font-medium"
                >
                  <option value="Application Stuck">Application Stuck / No Action</option>
                  <option value="Delayed Benefit">DBT Transfer Delayed</option>
                  <option value="Payment Pending">Disbursement Blocked</option>
                  <option value="Quality Issue">Workmanship / Material Quality Defect</option>
                  <option value="Exclusion Error">Erroneously Excluded from Entitlement Roll</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Grievance Details:</label>
                <textarea
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 font-medium"
                />
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                ⚖️ <strong>Statutory Guarantee:</strong> Case heard by the Sub-Divisional Public Grievance Redressal Officer (PGRO) within 7 working days.
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-xs"
                >
                  Lodge Grievance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
