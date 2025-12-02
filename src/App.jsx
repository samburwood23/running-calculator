import { useState } from 'react'

function App() {
  // State for active tab
  const [activeTab, setActiveTab] = useState('pace')
  
  // Pace Converter State
  const [paceMinKm, setPaceMinKm] = useState(5)
  const [paceSecKm, setPaceSecKm] = useState(0)
  
  // Split Calculator State
  const [distance, setDistance] = useState(10)
  const [targetHours, setTargetHours] = useState(0)
  const [targetMinutes, setTargetMinutes] = useState(50)
  const [targetSeconds, setTargetSeconds] = useState(0)
  
  // Training Zones State
  const [raceDistance, setRaceDistance] = useState(5)
  const [raceHours, setRaceHours] = useState(0)
  const [raceMinutes, setRaceMinutes] = useState(25)
  const [raceSeconds, setRaceSeconds] = useState(0)

  // Pace Converter Calculations
  const paceMinMile = Math.floor((paceMinKm + paceSecKm / 60) * 1.60934)
  const paceSecMile = Math.round(((paceMinKm + paceSecKm / 60) * 1.60934 % 1) * 60)

  // Split Calculator Calculations
  const totalSeconds = targetHours * 3600 + targetMinutes * 60 + targetSeconds
  const pacePerKm = totalSeconds / distance
  const splitMinutes = Math.floor(pacePerKm / 60)
  const splitSeconds = Math.round(pacePerKm % 60)
  
  const splits = []
  for (let i = 1; i <= distance; i++) {
    const splitTime = i * pacePerKm
    const cumMinutes = Math.floor(splitTime / 60)
    const cumSeconds = Math.round(splitTime % 60)
    splits.push({
      km: i,
      cumTime: `${cumMinutes}:${cumSeconds.toString().padStart(2, '0')}`
    })
  }

  // Training Zones Calculations
  const raceSeconds = raceHours * 3600 + raceMinutes * 60 + raceSeconds
  const racePacePerKm = raceSeconds / raceDistance
  
  const zones = [
    { name: 'Easy', factor: 1.25, color: 'from-emerald-500 to-green-500', icon: '🏃‍♂️' },
    { name: 'Tempo', factor: 1.08, color: 'from-amber-500 to-orange-500', icon: '💪' },
    { name: 'Interval', factor: 0.95, color: 'from-red-500 to-pink-500', icon: '🔥' },
    { name: 'Repetition', factor: 0.90, color: 'from-purple-500 to-indigo-500', icon: '⚡' }
  ]

  const calculateZonePace = (factor) => {
    const zonePace = racePacePerKm * factor
    const minutes = Math.floor(zonePace / 60)
    const seconds = Math.round(zonePace % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const tabs = [
    { id: 'pace', name: 'Pace Converter', icon: '🔄' },
    { id: 'splits', name: 'Splits', icon: '📊' },
    { id: 'zones', name: 'Training Zones', icon: '🎯' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
            Running Calculator
          </h1>
          <p className="text-slate-300 text-lg">
            Your complete toolkit for training success
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 mb-6 shadow-2xl border border-white/20">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-2xl mr-2">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          {/* Pace Converter */}
          {activeTab === 'pace' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Pace Converter</h2>
                <p className="text-slate-300">Convert between kilometers and miles</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Min/km Input */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <label className="block text-lg font-semibold text-white mb-4">
                    Pace per Kilometer
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={paceMinKm}
                        onChange={(e) => setPaceMinKm(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white text-center text-2xl font-bold focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all outline-none"
                        min="0"
                      />
                      <p className="text-slate-400 text-sm mt-2 text-center">minutes</p>
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={paceSecKm}
                        onChange={(e) => setPaceSecKm(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white text-center text-2xl font-bold focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all outline-none"
                        min="0"
                        max="59"
                      />
                      <p className="text-slate-400 text-sm mt-2 text-center">seconds</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-4xl font-bold text-purple-400">
                      {paceMinKm}:{paceSecKm.toString().padStart(2, '0')}
                    </p>
                    <p className="text-slate-300 text-sm mt-1">min/km</p>
                  </div>
                </div>

                {/* Min/mile Output */}
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-400/30">
                  <label className="block text-lg font-semibold text-white mb-4">
                    Pace per Mile
                  </label>
                  <div className="bg-white/5 rounded-lg p-6 text-center">
                    <p className="text-5xl font-bold text-white mb-2">
                      {paceMinMile}:{paceSecMile.toString().padStart(2, '0')}
                    </p>
                    <p className="text-slate-300 text-lg">min/mile</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Split Calculator */}
          {activeTab === 'splits' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Split Calculator</h2>
                <p className="text-slate-300">Calculate kilometer-by-kilometer splits</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Distance (km)</label>
                    <input
                      type="number"
                      value={distance}
                      onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white text-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all outline-none"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Target Time</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={targetHours}
                        onChange={(e) => setTargetHours(parseInt(e.target.value) || 0)}
                        className="w-1/3 px-2 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white text-center focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all outline-none"
                        placeholder="H"
                        min="0"
                      />
                      <input
                        type="number"
                        value={targetMinutes}
                        onChange={(e) => setTargetMinutes(parseInt(e.target.value) || 0)}
                        className="w-1/3 px-2 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white text-center focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all outline-none"
                        placeholder="M"
                        min="0"
                        max="59"
                      />
                      <input
                        type="number"
                        value={targetSeconds}
                        onChange={(e) => setTargetSeconds(parseInt(e.target.value) || 0)}
                        className="w-1/3 px-2 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white text-center focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all outline-none"
                        placeholder="S"
                        min="0"
                        max="59"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 mb-6 border border-purple-400/30">
                  <p className="text-white text-center">
                    <span className="text-lg">Target Pace: </span>
                    <span className="text-3xl font-bold text-purple-400">
                      {splitMinutes}:{splitSeconds.toString().padStart(2, '0')}
                    </span>
                    <span className="text-lg"> /km</span>
                  </p>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-2">
                  {splits.map((split, index) => (
                    <div
                      key={split.km}
                      className="flex justify-between items-center bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="text-white font-semibold text-lg">
                        Km {split.km}
                      </span>
                      <span className="text-purple-400 font-bold text-xl">
                        {split.cumTime}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Training Zones */}
          {activeTab === 'zones' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Training Zones</h2>
                <p className="text-slate-300">Based on recent race performance</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Race Distance (km)</label>
                    <input
                      type="number"
                      value={raceDistance}
                      onChange={(e) => setRaceDistance(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white text-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all outline-none"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Race Time</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={raceHours}
                        onChange={(e) => setRaceHours(parseInt(e.target.value) || 0)}
                        className="w-1/3 px-2 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white text-center focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all outline-none"
                        placeholder="H"
                        min="0"
                      />
                      <input
                        type="number"
                        value={raceMinutes}
                        onChange={(e) => setRaceMinutes(parseInt(e.target.value) || 0)}
                        className="w-1/3 px-2 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white text-center focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all outline-none"
                        placeholder="M"
                        min="0"
                        max="59"
                      />
                      <input
                        type="number"
                        value={raceSeconds}
                        onChange={(e) => setRaceSeconds(parseInt(e.target.value) || 0)}
                        className="w-1/3 px-2 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white text-center focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all outline-none"
                        placeholder="S"
                        min="0"
                        max="59"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {zones.map((zone, index) => (
                    <div
                      key={zone.name}
                      className={`bg-gradient-to-r ${zone.color} bg-opacity-20 rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{zone.icon}</span>
                          <div>
                            <h3 className="text-xl font-bold text-white">{zone.name}</h3>
                            <p className="text-slate-300 text-sm">
                              {zone.name === 'Easy' && '25% slower - builds aerobic base'}
                              {zone.name === 'Tempo' && '8% slower - improves threshold'}
                              {zone.name === 'Interval' && '5% faster - boosts VO2 max'}
                              {zone.name === 'Repetition' && '10% faster - improves speed'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-white">
                            {calculateZonePace(zone.factor)}
                          </p>
                          <p className="text-slate-300 text-sm">/km</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-400">
          <p>Built with ❤️ for runners by runners</p>
        </div>
      </div>
    </div>
  )
}

export default App
