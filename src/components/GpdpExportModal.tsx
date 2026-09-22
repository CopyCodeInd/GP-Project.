import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  Building,
  Landmark,
  ShieldCheck,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import { GramPanchayat, CitizenNeed, SanctionedSchemeWork } from '../types';

interface GpdpExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGp: GramPanchayat;
  needs: CitizenNeed[];
  works: SanctionedSchemeWork[];
}

export const GpdpExportModal: React.FC<GpdpExportModalProps> = ({
  isOpen,
  onClose,
  selectedGp,
  needs,
  works,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const gpNeeds = needs.filter((n) => n.gpId === selectedGp.id);
  const totalApprovedEst = gpNeeds.reduce((sum, n) => sum + n.estimatedCost, 0);

  // Group by 4 LSDG Themes
  const lsdgThemes = [
    { name: 'Water Sufficiency', icon: '💧', count: gpNeeds.filter((n) => n.lsdgTheme === 'Water sufficiency').length },
    { name: 'Clean & Green Village', icon: '🌿', count: gpNeeds.filter((n) => n.lsdgTheme === 'Clean and green villages').length },
    { name: 'Self-Sufficient Infrastructure', icon: '🏗️', count: gpNeeds.filter((n) => n.lsdgTheme === 'Self-sufficient infrastructure').length },
    { name: 'Good Governance', icon: '⚖️', count: gpNeeds.filter((n) => n.lsdgTheme === 'Good governance').length },
  ];

  // Real CSV Export
  const handleExportCsv = () => {
    const headers = 'Token_ID,Village,Ward,Work_Title,Scheme,Khesra_No,Khata_No,Estimated_Cost_INR,Priority,LSDG_Theme\n';
    const rows = gpNeeds
      .map(
        (n) =>
          `"${n.id}","${n.village}","${n.ward}","${n.title.replace(/"/g, '""')}","${n.aiSuggestedScheme}","${n.khesraNo || '-'}","${n.khataNo || '-'}","${n.estimatedCost}","${n.priority}","${n.lsdgTheme}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `GPDP_Resolution_${selectedGp.name}_FY2025_26.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('GPDP CSV successfully generated and downloaded (e-GramSwaraj compliant)!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-auto max-h-[92vh] overflow-y-auto">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs">
              <Landmark className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Gram Panchayat Development Plan (GPDP) Approval Package
              </h3>
              <p className="text-xs text-slate-500">
                Bihar Panchayati Raj Directorate • e-GramSwaraj & PFMS Interoperable Format
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {downloadSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Official Printable Resolution */}
        <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4">
          <div className="text-center space-y-1 pb-3 border-b border-slate-200">
            <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 font-mono">
              Government of Bihar • Department of Panchayati Raj
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              Gram Sabha Statutory Resolution & Annual Action Plan (FY 2025–26)
            </h4>
            <div className="text-xs text-slate-600 font-medium">
              Gram Panchayat: <strong>{selectedGp.name}</strong> | LGD Code:{' '}
              <span className="font-mono font-bold text-slate-800">{selectedGp.lgdCode}</span> | Block: {selectedGp.block}, District: {selectedGp.district}
            </div>
          </div>

          {/* LSDG Alignment Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {lsdgThemes.map((t, idx) => (
              <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 text-center shadow-xs">
                <div className="text-base">{t.icon}</div>
                <div className="text-[11px] font-semibold text-slate-800 mt-0.5 leading-tight">{t.name}</div>
                <div className="text-[10px] text-emerald-800 font-semibold mt-1">{t.count} Proposals</div>
              </div>
            ))}
          </div>

          {/* Approved Works Table */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-900 flex items-center justify-between">
              <span>Approved Works & Convergence Matrix:</span>
              <span className="font-mono text-emerald-800 font-bold">
                Total Budget Outlay: ₹{totalApprovedEst.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl bg-white shadow-inner">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900 text-white text-[10px] uppercase font-mono sticky top-0">
                  <tr>
                    <th className="p-2 font-medium">Token ID</th>
                    <th className="p-2 font-medium">Work Title</th>
                    <th className="p-2 font-medium">Convergence Scheme</th>
                    <th className="p-2 font-medium">Cadastral Plot / Ward</th>
                    <th className="p-2 text-right font-medium">Estimated (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px]">
                  {gpNeeds.map((need) => (
                    <tr key={need.id} className="hover:bg-slate-50">
                      <td className="p-2 font-mono text-emerald-800 font-semibold">{need.id}</td>
                      <td className="p-2 font-medium text-slate-900 max-w-[200px] truncate">{need.title}</td>
                      <td className="p-2 text-slate-600">{need.aiSuggestedScheme}</td>
                      <td className="p-2 font-mono text-slate-600">
                        {need.khesraNo ? `Plot ${need.khesraNo}` : need.ward}
                      </td>
                      <td className="p-2 text-right font-mono font-semibold text-slate-900">
                        ₹{need.estimatedCost.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 pt-4 border-t border-slate-200 text-xs text-center text-slate-600">
            <div>
              <div className="h-6"></div>
              <div className="font-semibold text-slate-900">Certified by: Mukhiya (President)</div>
              <div className="text-[10px] text-slate-500">Gram Panchayat {selectedGp.name}</div>
            </div>
            <div>
              <div className="h-6"></div>
              <div className="font-semibold text-slate-900">Verified by: Panchayat Secretary</div>
              <div className="text-[10px] text-slate-500">Block: {selectedGp.block}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Close
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3.5 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print Resolution</span>
            </button>
            <button
              onClick={handleExportCsv}
              className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export e-GramSwaraj CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
