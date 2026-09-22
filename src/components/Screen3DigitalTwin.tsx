import React, { useState } from 'react';
import {
  Layers,
  Sun,
  Eye,
  Box,
  MapPin,
  Sparkles,
  CheckCircle2,
  Droplets,
  Building,
  ShieldAlert,
  Calendar,
  Compass,
  Zap,
  ArrowUpRight,
  Plus,
  Landmark,
  Trees,
} from 'lucide-react';
import { GramPanchayat, DigitalTwinAsset, CitizenNeed } from '../types';

interface Screen3DigitalTwinProps {
  selectedGp: GramPanchayat;
  assets: DigitalTwinAsset[];
  onAddNeed: (need: CitizenNeed) => void;
  onNavigateToScreen: (screenId: '01' | '02' | '03' | '04' | '05' | '06' | '07') => void;
}

export const Screen3DigitalTwin: React.FC<Screen3DigitalTwinProps> = ({
  selectedGp,
  assets,
  onAddNeed,
  onNavigateToScreen,
}) => {
  const [is3DView, setIs3DView] = useState<boolean>(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string>(assets[0]?.id || 'ASSET-BHR-01');

  // Layer toggles
  const [layerSvamitva, setLayerSvamitva] = useState<boolean>(true);
  const [layerSolarSuitability, setLayerSolarSuitability] = useState<boolean>(true);

  const [gapNeedCreated, setGapNeedCreated] = useState<string | null>(null);

  const selectedAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];

  const handleCreateNeedFromGap = () => {
    if (!selectedAsset) return;

    let needCategory = 'Solar / public lighting';
    let title = `Rooftop Solar Plant on ${selectedAsset.name}`;
    let desc = `SVAMITVA survey identifies ${selectedAsset.solarSuitability.usableRoofAreaSqM} sq.m unshaded rooftop. Potential solar capacity: ${selectedAsset.solarSuitability.potentialKwp} kWp, estimated annual electricity savings: ₹${selectedAsset.solarSuitability.estimatedAnnualSavingsInr.toLocaleString('en-IN')}. Cadastral Plot: ${selectedAsset.khesraNo}, Khata: ${selectedAsset.khataNo}.`;
    let cost = Math.round(selectedAsset.solarSuitability.potentialKwp * 52000);

    if (selectedAsset.waterServiceStatus !== 'Adequate') {
      needCategory = 'Drinking water';
      title = `Drinking Water Network Connection for ${selectedAsset.name}`;
      desc = `Service gap detected: Current water status is "${selectedAsset.waterServiceStatus}". Dedicated pipeline branch or borehole connection required under Saat Nischay-2.`;
      cost = 190000;
    }

    const newNeed: CitizenNeed = {
      id: `NEED-TWIN-${Date.now().toString().slice(-4)}`,
      gpId: selectedGp.id,
      village: selectedGp.villages[0] || 'Dharnai Main',
      ward: selectedAsset.ward,
      category: needCategory as any,
      title,
      titleHindi: title,
      description: desc,
      locationDetails: `${selectedAsset.name} (Plot: ${selectedAsset.khesraNo}, Khata: ${selectedAsset.khataNo}, Land Area: ${selectedAsset.rakbaDecimal} Decimals)`,
      priority: 'High',
      estimatedCost: cost,
      status: 'Pending Review',
      submittedBy: 'SVAMITVA Spatial AI Infrastructure Engine',
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lsdgTheme: needCategory === 'Drinking water' ? 'Water sufficiency' : 'Clean and green villages',
      aiSuggestedScheme: needCategory === 'Drinking water' ? 'Saat Nischay-2 (Har Ghar Nal Ka Jal)' : 'PM Surya Ghar / BREDA Rural Solar',
      khesraNo: selectedAsset.khesraNo,
      khataNo: selectedAsset.khataNo,
    };

    onAddNeed(newNeed);
    setGapNeedCreated(`Infrastructure proposal generated: ${selectedAsset.name} added to GPDP draft!`);
    setTimeout(() => setGapNeedCreated(null), 4500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                Screen 03 • SVAMITVA 3D Digital Twin & Clean Energy
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                Survey of India DGPS 5cm Accuracy
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Panchayat Digital Twin, Cadastral Boundaries & BREDA Solar Potential
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {selectedGp.name} • Drone Orthomosaic Surface Model • Cadastral & Khata Attribution
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-mono text-slate-700 border border-slate-200 font-semibold">
              Spatial Resolution: ± 4.2 cm DGPS
            </span>
          </div>
        </div>
      </div>

      {gapNeedCreated && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>{gapNeedCreated}</span>
        </div>
      )}

      {/* Main Grid: Left Interactive Village Canvas + Right Asset Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 8 Columns - 2D/3D Interactive Village Map Viewport */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
            {/* Viewport Header */}
            <div className="bg-slate-900 text-white px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold tracking-wide flex items-center gap-1.5">
                  <Trees className="w-4 h-4 text-emerald-400" />
                  <span>{selectedGp.name} Digital Twin Model</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Cadastral Plots, Building 3D Extrusions & Solar Insolation Layer
                </div>
              </div>

              {/* 2D / 3D Mode Toggle */}
              <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
                <button
                  onClick={() => setIs3DView(false)}
                  className={`px-3 py-1 rounded font-semibold cursor-pointer transition-colors ${
                    !is3DView ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  2D Cadastral
                </button>
                <button
                  onClick={() => setIs3DView(true)}
                  className={`px-3 py-1 rounded font-semibold cursor-pointer transition-colors ${
                    is3DView ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3D Drone Mesh
                </button>
              </div>
            </div>

            {/* Interactive Canvas Rendering */}
            <div className="relative h-96 sm:h-[430px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 overflow-hidden select-none">
              {/* Cadastral Plot Grid lines */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #10B981 1px, transparent 1px), linear-gradient(to bottom, #10B981 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Water Body (Ahar-Pyne & Pond) */}
              <div className="absolute right-6 bottom-6 w-56 h-36 rounded-3xl bg-sky-950/70 border border-sky-500/40 backdrop-blur-xs flex items-center justify-center text-center p-2 shadow-inner">
                <div className="text-white text-[11px] font-semibold">
                  <Droplets className="w-5 h-5 mx-auto text-sky-400 mb-0.5" />
                  Community Reservoir & Ahar (1.8 Acres)
                  <span className="block text-[9px] text-sky-300 font-mono">Plot: 740 • Jal-Jeevan-Hariyali</span>
                </div>
              </div>

              {/* Village Main Road (PCC Road / MMGSY) */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-8 bg-amber-950/40 border-y border-amber-600/30 flex items-center justify-around pointer-events-none">
                <span className="text-[10px] text-amber-300 font-mono tracking-widest uppercase">
                  MMGSY Concrete Roadway
                </span>
                <span className="text-[10px] text-amber-300 font-mono tracking-widest uppercase">
                  Ward 2 ↔ Ward 3 Link
                </span>
              </div>

              {/* Clickable Village Buildings / Assets */}
              {assets.map((asset) => {
                const isSelected = asset.id === selectedAssetId;
                return (
                  <div
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    style={{
                      left: `${asset.x}%`,
                      top: `${asset.y}%`,
                      transform: is3DView
                        ? 'translate(-50%, -50%) perspective(400px) rotateX(25deg)'
                        : 'translate(-50%, -50%)',
                    }}
                    className={`absolute p-3 rounded-2xl cursor-pointer transition-all duration-300 shadow-xl border flex flex-col items-center ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-white ring-4 ring-emerald-500/30 scale-110 z-30'
                        : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:border-emerald-500 hover:scale-105 z-10'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      {asset.type === 'Panchayat Bhawan' && <Landmark className="w-4 h-4" />}
                      {asset.type === 'School' && <Building className="w-4 h-4" />}
                      {asset.type === 'Health Centre' && <Droplets className="w-4 h-4" />}
                      {asset.type === 'Community Hall' && <Trees className="w-4 h-4" />}
                      <span className="text-xs font-semibold whitespace-nowrap">
                        {asset.name}
                      </span>
                    </div>

                    <div className="text-[10px] mt-1 flex items-center gap-1.5 font-mono">
                      <span className="bg-black/40 px-1.5 py-0.5 rounded text-slate-300">
                        Plot: {asset.khesraNo}
                      </span>
                      {asset.solarSuitability.feasible && (
                        <span className="bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Zap className="w-2.5 h-2.5" />
                          {asset.solarSuitability.potentialKwp} kWp
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Layer Controls Pill Overlay */}
              <div className="absolute left-4 bottom-4 bg-slate-900/90 border border-slate-700 rounded-xl p-2.5 shadow-lg backdrop-blur-xs flex flex-wrap gap-3 text-xs">
                <label className="flex items-center space-x-1.5 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layerSvamitva}
                    onChange={(e) => setLayerSvamitva(e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                  <span>SVAMITVA Plots</span>
                </label>
                <label className="flex items-center space-x-1.5 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layerSolarSuitability}
                    onChange={(e) => setLayerSolarSuitability(e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                  <span>Solar Radiation Overlay</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 4 Columns - Land Record & Solar Inspector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Sun className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Parcel & Solar Inspector
                </h3>
                <p className="text-[11px] text-slate-500 font-mono">
                  {selectedAsset.svamitvaParcelId}
                </p>
              </div>
            </div>

            {/* Asset Identity Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="font-semibold text-sm text-slate-900">
                {selectedAsset.name}
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div>
                  <span className="text-slate-400 block font-medium">Cadastral Plot (Khesra):</span>
                  <span className="font-semibold font-mono text-slate-900">{selectedAsset.khesraNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Khata Record:</span>
                  <span className="font-semibold font-mono text-slate-900">{selectedAsset.khataNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Plot Area:</span>
                  <span className="font-semibold font-mono text-slate-900">{selectedAsset.rakbaDecimal} Decimals</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Usable Roof Area:</span>
                  <span className="font-semibold font-mono text-slate-900">{selectedAsset.roofAreaSqM} sq.m</span>
                </div>
              </div>
            </div>

            {/* Solar Feasibility Card */}
            {selectedAsset.solarSuitability.feasible ? (
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-950 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    Rooftop Solar Viability (BREDA)
                  </span>
                  <span className="text-[10px] bg-amber-200/80 text-amber-900 font-semibold px-1.5 py-0.5 rounded">
                    Feasible
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Solar Capacity:</span>
                    <span className="font-bold text-base font-mono text-amber-950">
                      {selectedAsset.solarSuitability.potentialKwp} kWp
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Annual Bill Savings:</span>
                    <span className="font-bold text-base font-mono text-emerald-800">
                      ₹{selectedAsset.solarSuitability.estimatedAnnualSavingsInr.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <div className="text-[10px] text-amber-900 bg-amber-100/50 p-2 rounded">
                  Estimated Generation: {selectedAsset.solarSuitability.annualGenerationKwh.toLocaleString('en-IN')} units (kWh/yr)
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                Community water reservoir site; designated for rainwater catchment rather than solar panels.
              </div>
            )}

            {/* Gap to Need Button */}
            <button
              onClick={handleCreateNeedFromGap}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center space-x-1.5 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Convert Gap into GPDP Proposal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
