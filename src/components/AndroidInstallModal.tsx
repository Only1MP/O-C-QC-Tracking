import React, { useState, useEffect } from 'react';
import { Smartphone, Download, CheckCircle2, Share2, HelpCircle, X, ShieldCheck, Zap, WifiOff, Settings2 } from 'lucide-react';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AndroidInstallModal({ isOpen, onClose }: AndroidInstallModalProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [installSuccess, setInstallSuccess] = useState<boolean>(false);
  const [hapticEnabled, setHapticEnabled] = useState<boolean>(true);

  useEffect(() => {
    // Check if app is running in standalone Android PWA mode
    if (window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone) {
      setIsInstalled(true);
    }

    // Capture Android beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setInstallSuccess(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallSuccess(true);
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-brand-beige-200">
        {/* Header Banner */}
        <div className="bg-brand-forest-800 text-white p-6 relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 rounded-xl bg-amber-400 text-brand-forest-900 shadow-xs">
              <Smartphone className="w-6 h-6" />
            </span>
            <h2 className="text-xl font-bold tracking-tight">
              Android App
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Status Badge */}
          {isInstalled ? (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold">App Installed &amp; Running Standalone</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
              <Zap className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <p className="text-xs font-bold">Android Web App Ready</p>
              </div>
            </div>
          )}

          {/* 1-Click Install Button if browser prompt is available */}
          {deferredPrompt && !isInstalled && (
            <button
              onClick={handleInstallClick}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-forest-600 hover:bg-brand-forest-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2.5 transition-all cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Install App</span>
            </button>
          )}

          {/* Native APK Section */}
          <div className="bg-emerald-50/80 rounded-xl p-4 border border-emerald-200/80 space-y-2">
            <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
              <Download className="w-4 h-4 text-emerald-700" />
              Native APK Download (GitHub):
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed">
              When exported or pushed to GitHub, the automated GitHub Action workflow (<code className="bg-emerald-100 px-1 py-0.5 rounded text-[11px] font-mono">android.yml</code>) automatically builds a native Android <strong>.apk</strong> file.
            </p>
            <div className="text-xs text-emerald-900 pt-1">
              <span className="font-bold">Steps to download native APK:</span>
              <ol className="list-decimal list-inside space-y-1 mt-1 text-[11px] text-emerald-800">
                <li>Go to your repository on <strong>GitHub</strong>.</li>
                <li>Click on the <strong>Actions</strong> tab.</li>
                <li>Select the latest <strong>Build Android APK</strong> run.</li>
                <li>Under <strong>Artifacts</strong>, download <strong>Daily-QC-Defect-Log-Android-APK</strong>.</li>
                <li>Transfer the <code className="font-mono text-[10px]">app-debug.apk</code> file to your Android phone to install and run natively!</li>
              </ol>
            </div>
          </div>

          {/* Manual Installation Instructions */}
          {!isInstalled && (
            <div className="bg-brand-beige-50 rounded-xl p-4 border border-brand-beige-200 space-y-3">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-brand-forest-600" />
                How to Install:
              </h3>
              
              <ol className="text-xs text-gray-700 space-y-2.5 pl-1">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-forest-100 text-brand-forest-800 font-bold text-[11px] flex items-center justify-center shrink-0">1</span>
                  <span>Open this page in Chrome on Android.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-forest-100 text-brand-forest-800 font-bold text-[11px] flex items-center justify-center shrink-0">2</span>
                  <span>Tap the menu button (⋮).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-forest-100 text-brand-forest-800 font-bold text-[11px] flex items-center justify-center shrink-0">3</span>
                  <span>Select <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong>.</span>
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
