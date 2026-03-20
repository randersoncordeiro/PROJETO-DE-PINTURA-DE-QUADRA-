
import React, { useState } from 'react';
import { CourtColors, CourtConfig } from './types';
import { DEFAULT_COLORS } from './constants';
import CourtRenderer from './components/CourtRenderer';
import ColorPickerField from './components/ColorPickerField';

const App: React.FC = () => {
  const [colors, setColors] = useState<CourtColors>(DEFAULT_COLORS);
  const [config, setConfig] = useState<CourtConfig>({
    showFutsal: true,
    showBasketball: true,
    showVolleyball: true,
    lineWidth: 5,
  });

  const handleColorChange = (key: keyof CourtColors, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  const applyPreset = (futsal: boolean, basketball: boolean, volleyball: boolean) => {
    setConfig(prev => ({
      ...prev,
      showFutsal: futsal,
      showBasketball: basketball,
      showVolleyball: volleyball,
    }));
  };

  const exportAsImage = () => {
    const svg = document.getElementById('court-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `quadra-projeto-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-full lg:w-[400px] lg:h-screen lg:fixed lg:left-0 top-0 overflow-y-auto bg-slate-800 border-r border-slate-700 p-6 z-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-400 mb-1 leading-tight">Simulador de Pintura</h1>
          <p className="text-sm text-slate-400 font-medium">Projeto: Quadra Poliesportiva Profissional</p>
        </div>

        <section className="space-y-6">
          {/* NOVA SEÇÃO: MODELOS RÁPIDOS */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 border-b border-slate-700 pb-1">Modelos de Quadra</h2>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => applyPreset(true, true, true)}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-[10px] font-bold transition-all border border-slate-600"
              >
                POLIESPORTIVA COMPLETA
              </button>
              <button 
                onClick={() => applyPreset(true, false, false)}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-[10px] font-bold transition-all border border-slate-600"
              >
                SOMENTE FUTSAL
              </button>
              <button 
                onClick={() => applyPreset(false, true, false)}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-[10px] font-bold transition-all border border-slate-600"
              >
                SOMENTE BASQUETE
              </button>
              <button 
                onClick={() => applyPreset(false, false, true)}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-[10px] font-bold transition-all border border-slate-600"
              >
                SOMENTE VÔLEI
              </button>
              <button 
                onClick={() => applyPreset(true, false, true)}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-[10px] font-bold transition-all border border-slate-600"
              >
                FUTSAL + VÔLEI
              </button>
              <button 
                onClick={() => applyPreset(true, true, false)}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-[10px] font-bold transition-all border border-slate-600"
              >
                FUTSAL + BASQUETE
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 border-b border-slate-700 pb-1">Zonas de Pintura</h2>
            <ColorPickerField 
              label="Área Externa (Buffer 1m)" 
              value={colors.external} 
              onChange={(c) => handleColorChange('external', c)} 
            />
            <ColorPickerField 
              label="Quadra Futsal (Principal)" 
              value={colors.futsalMain} 
              onChange={(c) => handleColorChange('futsalMain', c)} 
            />
            <ColorPickerField 
              label="Área de Futsal (O 'D')" 
              value={colors.futsalArea} 
              onChange={(c) => handleColorChange('futsalArea', c)} 
            />
            <ColorPickerField 
              label="Garrafão Basquete" 
              value={colors.basketballKey} 
              onChange={(c) => handleColorChange('basketballKey', c)} 
            />
            <ColorPickerField 
              label="Círculo Central (Futsal)" 
              value={colors.centerCircleFutsal} 
              onChange={(c) => handleColorChange('centerCircleFutsal', c)} 
            />
            <ColorPickerField 
              label="Círculo Central (Basquete)" 
              value={colors.centerCircleBasketball} 
              onChange={(c) => handleColorChange('centerCircleBasketball', c)} 
            />
            <ColorPickerField 
              label="Área de Vôlei" 
              value={colors.volleyballArea} 
              onChange={(c) => handleColorChange('volleyballArea', c)} 
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 border-b border-slate-700 pb-1">Cores das Linhas</h2>
            <ColorPickerField 
              label="Marcações Futsal" 
              value={colors.futsalLines} 
              onChange={(c) => handleColorChange('futsalLines', c)} 
            />
            <ColorPickerField 
              label="Marcações Basquete" 
              value={colors.basketballLines} 
              onChange={(c) => handleColorChange('basketballLines', c)} 
            />
            <ColorPickerField 
              label="Marcações Vôlei" 
              value={colors.volleyballLines} 
              onChange={(c) => handleColorChange('volleyballLines', c)} 
            />
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 border-b border-slate-700 pb-1">Controle Manual</h2>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setConfig(p => ({ ...p, showFutsal: !p.showFutsal }))}
                className={`px-3 py-2 rounded text-[11px] font-bold transition-all ${config.showFutsal ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-700 text-slate-400'}`}
              >
                FUTSAL: {config.showFutsal ? 'VISÍVEL' : 'OCULTO'}
              </button>
              <button 
                onClick={() => setConfig(p => ({ ...p, showBasketball: !p.showBasketball }))}
                className={`px-3 py-2 rounded text-[11px] font-bold transition-all ${config.showBasketball ? 'bg-red-600 text-white shadow-lg shadow-red-900/40' : 'bg-slate-700 text-slate-400'}`}
              >
                BASQUETE: {config.showBasketball ? 'VISÍVEL' : 'OCULTO'}
              </button>
              <button 
                onClick={() => setConfig(p => ({ ...p, showVolleyball: !p.showVolleyball }))}
                className={`px-3 py-2 rounded text-[11px] font-bold transition-all ${config.showVolleyball ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-900/40' : 'bg-slate-700 text-slate-400'}`}
              >
                VÔLEI: {config.showVolleyball ? 'VISÍVEL' : 'OCULTO'}
              </button>
              <div className="flex flex-col gap-1 bg-slate-700 px-3 py-1.5 rounded">
                 <span className="text-[10px] font-bold text-slate-400 uppercase">Espessura Linha</span>
                 <input 
                  type="range" min="1" max="15" step="1" 
                  value={config.lineWidth} 
                  onChange={(e) => setConfig(p => ({...p, lineWidth: Number(e.target.value)}))}
                  className="w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                 />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 space-y-4">
          <button 
            onClick={exportAsImage}
            className="w-full py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-bold shadow-xl shadow-blue-900/20 transition-all flex items-center justify-center gap-2 group active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-y-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            SALVAR PROJETO (SVG)
          </button>
          
          <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <p className="text-[10px] text-slate-500 text-center leading-relaxed">
              Escala: 1m = 30px | Futsal 28x16m | Basquete 28x15m | Vôlei 18x9m<br/>
              Área Externa: 1m de borda após a linha de futsal.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-[400px] flex items-center justify-center p-4 lg:p-8 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900">
        <div className="w-full max-w-5xl animate-in fade-in zoom-in duration-700">
           <CourtRenderer colors={colors} config={config} />
           
           <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80 hover:opacity-100 transition-opacity">
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-bold text-sm tracking-tight">PADRÃO FUTSAL</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">Medida oficial 28x16m. Área de meta com raio técnico de 4,80m (Norma R4.80).</p>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="font-bold text-sm tracking-tight">PADRÃO BASQUETE</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">Garrafão técnico de 4,90m x 5,80m. Linha de 3 pontos em conformidade técnica de 6,75m.</p>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="font-bold text-sm tracking-tight">PADRÃO VÔLEI</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">Quadra de 18x9m centralizada. Linha de ataque posicionada a exatos 3m da linha central.</p>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;
