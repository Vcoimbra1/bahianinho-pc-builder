import React, { useState, useMemo } from 'react';

const hardwareData = {
  cpus: [
    { id: 'c1', marca: 'AMD', nome: 'Ryzen 5 5500', socket: 'AM4', ram: 'DDR4', tdp: 65, preco: 650 },
    { id: 'c2', marca: 'AMD', nome: 'Ryzen 5 5600', socket: 'AM4', ram: 'DDR4', tdp: 65, preco: 850 },
    { id: 'c3', marca: 'AMD', nome: 'Ryzen 7 5700X', socket: 'AM4', ram: 'DDR4', tdp: 65, preco: 1200 },
    { id: 'c4', marca: 'Intel', nome: 'Core i3-12100F', socket: 'LGA1700', ram: 'DDR4', tdp: 58, preco: 580 },
    { id: 'c5', marca: 'Intel', nome: 'Core i5-12400F', socket: 'LGA1700', ram: 'DDR4', tdp: 65, preco: 950 },
    { id: 'c6', marca: 'Intel', nome: 'Core i5-13400F', socket: 'LGA1700', ram: 'DDR5', tdp: 65, preco: 1400 },
    { id: 'c7', marca: 'AMD', nome: 'Ryzen 5 7600', socket: 'AM5', ram: 'DDR5', tdp: 65, preco: 1350 },
    { id: 'c8', marca: 'AMD', nome: 'Ryzen 7 7800X3D', socket: 'AM5', ram: 'DDR5', tdp: 120, preco: 2800 },
    { id: 'c9', marca: 'Intel', nome: 'Core i7-14700K', socket: 'LGA1700', ram: 'DDR5', tdp: 125, preco: 2900 },
    { id: 'c10', marca: 'AMD', nome: 'Ryzen 9 7950X', socket: 'AM5', ram: 'DDR5', tdp: 170, preco: 3900 },
    { id: 'c11', marca: 'AMD', nome: 'Ryzen 7 9800X3D', socket: 'AM5', ram: 'DDR5', tdp: 120, preco: 3500 },
    { id: 'c12', marca: 'Intel', nome: 'Core i9-14900K', socket: 'LGA1700', ram: 'DDR5', tdp: 125, preco: 4200 }
  ],
  motherboards: [
    { id: 'm1', nome: 'AsRock A520M-HVS', socket: 'AM4', ram: 'DDR4', formato: 'Micro-ATX', preco: 450 },
    { id: 'm2', nome: 'Gigabyte B550M Aorus', socket: 'AM4', ram: 'DDR4', formato: 'Micro-ATX', preco: 950 },
    { id: 'm3', nome: 'MSI MAG B550 Tomahawk', socket: 'AM4', ram: 'DDR4', formato: 'ATX', preco: 1200 },
    { id: 'm4', nome: 'Asus Prime H610M-E', socket: 'LGA1700', ram: 'DDR4', formato: 'Micro-ATX', preco: 600 },
    { id: 'm5', nome: 'Gigabyte B760M Gaming', socket: 'LGA1700', ram: 'DDR5', formato: 'Micro-ATX', preco: 1100 },
    { id: 'm6', nome: 'MSI PRO Z790-P', socket: 'LGA1700', ram: 'DDR5', formato: 'ATX', preco: 1800 },
    { id: 'm7', nome: 'Asrock A620M-HDV', socket: 'AM5', ram: 'DDR5', formato: 'Micro-ATX', preco: 850 },
    { id: 'm8', nome: 'Asus TUF B650-Plus', socket: 'AM5', ram: 'DDR5', formato: 'ATX', preco: 1600 },
    { id: 'm9', nome: 'Gigabyte X670E Aorus', socket: 'AM5', ram: 'DDR5', formato: 'ATX', preco: 2800 },
    { id: 'm10', nome: 'ROG Maximus Z790 Hero', socket: 'LGA1700', ram: 'DDR5', formato: 'ATX', preco: 4500 }
  ],
  gpus: [
    { id: 'g1', nome: 'Radeon RX 6600 8GB', consumo: 132, preco: 1400 },
    { id: 'g2', nome: 'GeForce RTX 3060 12GB', consumo: 170, preco: 1800 },
    { id: 'g3', nome: 'Radeon RX 7600 8GB', consumo: 165, preco: 1750 },
    { id: 'g4', nome: 'GeForce RTX 4060 8GB', consumo: 115, preco: 2000 },
    { id: 'g5', nome: 'GeForce RTX 4060 Ti 8GB', consumo: 160, preco: 2600 },
    { id: 'g6', nome: 'Radeon RX 7700 XT 12GB', consumo: 245, preco: 3100 },
    { id: 'g7', nome: 'GeForce RTX 4070 Super', consumo: 220, preco: 4300 },
    { id: 'g8', nome: 'Radeon RX 7800 XT 16GB', consumo: 263, preco: 3800 },
    { id: 'g9', nome: 'GeForce RTX 4080 Super', consumo: 320, preco: 7800 },
    { id: 'g10', nome: 'GeForce RTX 4090 24GB', consumo: 450, preco: 14500 }
  ],
  ram: [
    { id: 'r1', nome: '8GB DDR4 3200MHz', tipo: 'DDR4', preco: 180 },
    { id: 'r2', nome: '16GB (2x8) DDR4 3200MHz', tipo: 'DDR4', preco: 320 },
    { id: 'r3', nome: '32GB (2x16) DDR4 3600MHz', tipo: 'DDR4', preco: 650 },
    { id: 'r4', nome: '8GB DDR5 4800MHz', tipo: 'DDR5', preco: 280 },
    { id: 'r5', nome: '16GB DDR5 5200MHz', tipo: 'DDR5', preco: 450 },
    { id: 'r6', nome: '16GB (2x8) DDR5 5600MHz', tipo: 'DDR5', preco: 550 },
    { id: 'r7', nome: '32GB (2x16) DDR5 6000MHz', tipo: 'DDR5', preco: 980 },
    { id: 'r8', nome: '32GB (2x16) DDR5 6400MHz', tipo: 'DDR5', preco: 1150 },
    { id: 'r9', nome: '64GB (2x32) DDR5 6000MHz', tipo: 'DDR5', preco: 1900 },
    { id: 'r10', nome: 'Dominator 32GB DDR5 7200MHz', tipo: 'DDR5', preco: 1600 }
  ],
  storage: [
    { id: 's1', nome: 'SSD 480GB SATA', preco: 220 },
    { id: 's2', nome: 'SSD 1TB SATA', preco: 380 },
    { id: 's3', nome: 'NVMe 500GB Gen3', preco: 280 },
    { id: 's4', nome: 'NVMe 1TB Gen3', preco: 450 },
    { id: 's5', nome: 'NVMe 1TB Gen4 (Fast)', preco: 620 },
    { id: 's6', nome: 'NVMe 2TB Gen4', preco: 980 },
    { id: 's7', nome: 'NVMe 4TB Gen4', preco: 2200 },
    { id: 's8', nome: 'Kingston NV2 1TB', preco: 410 },
    { id: 's9', nome: 'Crucial P3 1TB', preco: 440 },
    { id: 's10', nome: 'WD Black SN850X 1TB', preco: 850 }
  ],
  cases: [
    { id: 'cs1', nome: 'Mancer Goblin (Micro)', suporta: ['Micro-ATX'], preco: 180 },
    { id: 'cs2', nome: 'Pichau Hive (Micro)', suporta: ['Micro-ATX'], preco: 220 },
    { id: 'cs3', nome: 'Gadit 2 (ATX)', suporta: ['ATX', 'Micro-ATX'], preco: 280 },
    { id: 'cs4', nome: 'Montech Air 903 Base', suporta: ['ATX', 'Micro-ATX'], preco: 350 },
    { id: 'cs5', nome: 'NZXT H5 Flow', suporta: ['ATX', 'Micro-ATX'], preco: 650 },
    { id: 'cs6', nome: 'Corsair 4000D Airflow', suporta: ['ATX', 'Micro-ATX'], preco: 750 },
    { id: 'cs7', nome: 'Lian Li O11 Dynamic', suporta: ['ATX', 'Micro-ATX'], preco: 1300 },
    { id: 'cs8', nome: 'Hyte Y60', suporta: ['ATX', 'Micro-ATX'], preco: 1600 },
    { id: 'cs9', nome: 'Cooler Master MasterBox', suporta: ['ATX'], preco: 480 },
    { id: 'cs10', nome: 'DeepCool CC560', suporta: ['ATX', 'Micro-ATX'], preco: 320 }
  ],
  psus: [
    { id: 'p1', nome: 'Mancer Thunder 500W', watts: 500, preco: 250 },
    { id: 'p2', nome: 'MSI MAG A650BN 650W', watts: 650, preco: 320 },
    { id: 'p3', nome: 'Corsair CX650 650W', watts: 650, preco: 420 },
    { id: 'p4', nome: 'XPG Pylon 650W', watts: 650, preco: 380 },
    { id: 'p5', nome: 'XPG Core Reactor 750W', watts: 750, preco: 650 },
    { id: 'p6', nome: 'Corsair RM750e 750W', watts: 750, preco: 780 },
    { id: 'p7', nome: 'XPG Core Reactor 850W', watts: 850, preco: 750 },
    { id: 'p8', nome: 'Super Flower Legion 850W', watts: 850, preco: 820 },
    { id: 'p9', nome: 'Corsair RM1000x 1000W', watts: 1000, preco: 1400 },
    { id: 'p10', nome: 'Rog Thor 1200W Platinum', watts: 1200, preco: 2900 }
  ],
  coolers: [
    { id: 'cl1', nome: 'AMD Wraith Stealth (Stock)', preco: 0 },
    { id: 'cl2', nome: 'DeepCool AG400', preco: 140 },
    { id: 'cl3', nome: 'DeepCool AK400', preco: 180 },
    { id: 'cl4', nome: 'Cooler Master Hyper 212', preco: 220 },
    { id: 'cl5', nome: 'Scytle Fuma 3', preco: 450 },
    { id: 'cl6', nome: 'Noctua NH-D15', preco: 850 },
    { id: 'cl7', nome: 'Water Cooler 240mm Rise', preco: 320 },
    { id: 'cl8', nome: 'Water Cooler 240mm DeepCool', preco: 550 },
    { id: 'cl9', nome: 'Water Cooler 360mm Corsair', preco: 1200 },
    { id: 'cl10', nome: 'Kraken Elite 360mm', preco: 2400 }
  ]
};

export default function App() {
  const [build, setBuild] = useState({ cpu: null, mb: null, gpu: null, ram: null, storage: null, case: null, psu: null, cooler: null });

  
  const filteredMbs = useMemo(() => {
    if (!build.cpu) return hardwareData.motherboards;
    return hardwareData.motherboards.filter(mb => mb.socket === build.cpu.socket);
  }, [build.cpu]);

  const filteredCases = useMemo(() => {
    if (!build.mb) return hardwareData.cases;
    return hardwareData.cases.filter(cs => cs.suporta.includes(build.mb.formato));
  }, [build.mb]);

  
  const powerReq = useMemo(() => {
    const total = (build.cpu?.tdp || 0) + (build.gpu?.consumo || 0) + 50;
    return { total, recommended: Math.ceil(total * 1.3) };
  }, [build.cpu, build.gpu]);

  const totalPrice = Object.values(build).reduce((acc, item) => acc + (item?.preco || 0), 0);

  
  const ramError = build.mb && build.ram && build.mb.ram !== build.ram.tipo;

  const updateItem = (key, value) => {
    setBuild(prev => ({ ...prev, [key]: value }));
    
    if (key === 'cpu') setBuild(prev => ({ ...prev, cpu: value, mb: null, case: null }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-8 border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-black text-cyan-400 tracking-tighter uppercase italic">Bahianinho Pc Parts Configurator</h1>
        <p className="text-zinc-500 text-sm">Teste sua Build de Pc</p>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ÁREA DE SELEÇÃO */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* GRID DE COMPONENTES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Seção: Processador */}
            <ComponentSection title="Processador" items={hardwareData.cpus} selected={build.cpu} 
              onSelect={(val) => updateItem('cpu', val)} renderInfo={(i) => `${i.socket} • ${i.tdp}W`} />

            {/* Seção: Placa-mãe */}
            <ComponentSection title="Placa-mãe" items={filteredMbs} selected={build.mb} 
              onSelect={(val) => updateItem('mb', val)} renderInfo={(i) => `${i.socket} • ${i.formato}`} 
              disabled={!build.cpu} emptyMsg="Selecione uma CPU primeiro" />

            {/* Seção: Placa de Vídeo */}
            <ComponentSection title="Placa de Vídeo" items={hardwareData.gpus} selected={build.gpu} 
              onSelect={(val) => updateItem('gpu', val)} renderInfo={(i) => `${i.consumo}W`} />

            {/* Seção: Memória RAM */}
            <ComponentSection title="Memória RAM" items={hardwareData.ram} selected={build.ram} 
              onSelect={(val) => updateItem('ram', val)} renderInfo={(i) => i.tipo} />

            {/* Seção: Armazenamento */}
            <ComponentSection title="Armazenamento" items={hardwareData.storage} selected={build.storage} 
              onSelect={(val) => updateItem('storage', val)} />

            {/* Seção: Gabinete */}
            <ComponentSection title="Gabinete" items={filteredCases} selected={build.case} 
              onSelect={(val) => updateItem('case', val)} renderInfo={(i) => i.suporta.join('/')}
              disabled={!build.mb} emptyMsg="Selecione a Placa-mãe primeiro" />

            {/* Seção: Fonte */}
            <ComponentSection title="Fonte (PSU)" items={hardwareData.psus} selected={build.psu} 
              onSelect={(val) => updateItem('psu', val)} renderInfo={(i) => `${i.watts}W`} />

            {/* Seção: Cooler */}
            <ComponentSection title="Cooler" items={hardwareData.coolers} selected={build.cooler} 
              onSelect={(val) => updateItem('cooler', val)} />
          </div>
        </div>

        {/* SIDEBAR DE STATUS */}
        <aside className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl sticky top-8">
            <h2 className="text-xl font-bold mb-6 text-cyan-400">Resumo da Build</h2>
            
            <div className="space-y-3 mb-8 text-xs text-zinc-400">
              <SummaryRow label="Consumo Estimado" value={`${powerReq.total}W`} />
              <SummaryRow label="Fonte Recomendada" value={`${powerReq.recommended}W`} color="text-green-400" />
              <div className="h-px bg-zinc-800 my-4" />
              {ramError && <p className="text-red-500 font-bold bg-red-500/10 p-2 rounded">❌ Incompatibilidade de RAM encontrada!</p>}
              {!ramError && build.mb && build.ram && <p className="text-green-500 font-bold">✅ RAM Compatível</p>}
            </div>

            <div className="mb-6">
              <span className="text-zinc-500 text-xs uppercase font-bold">Total Estimado</span>
              <div className="text-3xl font-black text-white">R$ {totalPrice.toLocaleString('pt-BR')}</div>
            </div>

            <button onClick={() => window.print()} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-cyan-900/20">
              Imprimir Orçamento
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}


function ComponentSection({ title, items, selected, onSelect, renderInfo, disabled, emptyMsg }) {
  return (
    <section className={`bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl ${disabled ? 'opacity-50' : ''}`}>
      <h3 className="text-sm font-bold text-zinc-500 mb-4 uppercase tracking-widest">{title}</h3>
      {disabled ? (
        <div className="text-xs text-zinc-600 italic">{emptyMsg}</div>
      ) : (
        <div className="space-y-2">
          {items.map(item => (
            <button key={item.id} onClick={() => onSelect(item)}
              className={`w-full p-3 rounded-xl border-2 text-left transition-all flex justify-between items-center
              ${selected?.id === item.id ? 'border-cyan-500 bg-cyan-500/5' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900'}`}>
              <div>
                <div className="text-sm font-bold">{item.nome}</div>
                {renderInfo && <div className="text-[10px] text-zinc-500 uppercase">{renderInfo(item)}</div>}
              </div>
              <div className="text-xs font-mono text-cyan-400">R$ {item.preco}</div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function SummaryRow({ label, value, color = "text-white" }) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <span className={`font-mono ${color}`}>{value}</span>
    </div>
  );
}