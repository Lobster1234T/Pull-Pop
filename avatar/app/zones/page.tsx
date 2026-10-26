'use client';

import { Cpu, Users, Zap, Monitor } from 'lucide-react';
import Header from '@/app/components/Header';
import NeoButton from '@/app/components/NeoButtton';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import AvatarClubAnimation from '@/app/components/AvatarClubAnimation';
import { getZones, getGamingStations } from '@/app/lib/db';
import Image from 'next/image';

export default function ZonesPage() {
  const zones = getZones();
  const allStations = getGamingStations();

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Avatar Club Animation */}
      <section className="relative w-full pt-24">
        <AvatarClubAnimation
          text="ИГРОВЫЕ ЗОНЫ"
          subtitle="ВЫБЕРИ ИДЕАЛЬНОЕ МЕСТО"
          colorA="#00d9ff"
          colorB="#0099ff"
          speed={1}
        />
      </section>

      {/* Hero */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black mb-6 text-center gradient-text">
            ПРЕМИУМ ОБОРУДОВАНИЕ И КОМФОРТ
          </h1>
          <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto">
            Три зоны с разным уровнем оборудования для любых требований
          </p>
        </div>
      </section>

      {/* Zones Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {zones.map((zone) => {
              const zoneStations = allStations.filter(s => s.zone_id === zone.id);
              const availableStations = zoneStations.filter(s => s.status === 'available').length;

              return (
                <div key={zone.id} className="glass border border-cyan-500/30 rounded-xl p-8 hover:border-cyan-500/60 transition-all">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Side */}
                    <div>
                      {/* Zone Image */}
                      <div className="mb-6 rounded-lg overflow-hidden h-48 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
                        <Image
                          src={zone.type === 'ps5' ? '/photo_2026-10-14_15-32-17.jpg' : '/photo_2026-10-14_15-32-19.jpg'}
                          alt={zone.name}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <h2 className="text-4xl font-black text-cyan-300 mb-3">{zone.name}</h2>
                      <p className="text-slate-300 mb-6 text-lg">{zone.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-800/50 rounded-lg p-4">
                          <div className="text-xs text-slate-400 mb-1">Мест</div>
                          <div className="text-2xl font-bold text-cyan-300">{zone.capacity}</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4">
                          <div className="text-xs text-slate-400 mb-1">Свободно</div>
                          <div className="text-2xl font-bold text-green-400">{availableStations}</div>
                        </div>
                      </div>

                      <NeoButton variant="primary" size="lg" className="w-full">
                        ЗАБРОНИРОВАТЬ
                      </NeoButton>
                    </div>

                    {/* Right Side - Specs */}
                    <div>
                      <h3 className="text-xl font-bold text-cyan-300 mb-6">ХАРАКТЕРИСТИКИ</h3>

                      {zoneStations[0]?.specs && (
                        <div className="space-y-4">
                          {Object.entries(zoneStations[0].specs).map(([key, value]) => (
                            <div key={key} className="border-l-2 border-cyan-500 pl-4">
                              <div className="text-sm text-slate-400 capitalize">{key}</div>
                              <div className="text-lg font-bold text-white">{value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stations */}
                  <div className="mt-12 pt-8 border-t border-cyan-500/20">
                    <h3 className="text-xl font-bold text-cyan-300 mb-6">ДОСТУПНЫЕ МЕСТА</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                      {zoneStations.map((station) => (
                        <button
                          key={station.id}
                          className={`aspect-square rounded-lg font-bold text-sm transition-all hover:scale-110 ${
                            station.status === 'available'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30'
                              : station.status === 'reserved'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                              : 'bg-slate-700/50 text-slate-500 border border-slate-600 cursor-not-allowed'
                          }`}
                          disabled={station.status !== 'available'}
                        >
                          {station.station_number.split('-')[1]}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-6 mt-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500/20 border border-green-500/50 rounded"></div>
                        <span className="text-slate-400">Свободно</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-cyan-500/20 border border-cyan-500/50 rounded"></div>
                        <span className="text-slate-400">Зарезервировано</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-slate-700/50 border border-slate-600 rounded"></div>
                        <span className="text-slate-400">Занято</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

