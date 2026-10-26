'use client';

import { MapPin } from 'lucide-react';
import { branch } from '@/app/lib/db';

export default function BranchMap() {
  return (
    <div className="space-y-6">
      {/* Info */}
      <div className="glass border border-orange-500/30 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-white mb-2">{branch.name}</h3>
            <p className="text-slate-300 text-sm mb-4">{branch.address}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-slate-400 mb-1">Телефон</div>
                <div className="text-orange-400 font-semibold">{branch.phone}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Email</div>
                <div className="text-orange-400 font-semibold">{branch.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Embed */}
      <div className="glass border border-orange-500/30 rounded-lg overflow-hidden h-96">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyC1FPG0y3t8oqjMz5Z9tE4E9z9z9z9z9z9&q=${branch.latitude},${branch.longitude}&zoom=16`}
        />
      </div>

      {/* Coordinates */}
      <div className="glass border border-orange-500/30 rounded-lg p-4 text-sm">
        <p className="text-slate-400">
          <span className="text-orange-400 font-semibold">Координаты:</span> {branch.latitude}, {branch.longitude}
        </p>
      </div>
    </div>
  );
}
