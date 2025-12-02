import { useState } from 'react'

function App() {
  // STATE MANAGEMENT - useState is React's way to store data that can change
  // When state changes, React automatically re-renders the component
  const [activeTab, setActiveTab] = useState('pace')
  
  // Pace Converter State
  const [paceMinKm, setPaceMinKm] = useState(5)
  const [paceSecKm, setPaceSecKm] = useState(0)
  
  // Split Calculator State
  const [distance, setDistance] = useState(10)
  const [targetTime, setTargetTime] = useState({ hours: 0, minutes: 50, seconds: 0 })
  
  // Training Zones State
  const [raceDistance, setRaceDistance] = useState('5k')
  const [raceTime, setRaceTime] = useState({ hours: 0, minutes: 25, seconds: 0 })

  // CALCULATED VALUES - These are derived from state
  // React re-calculates these whenever the state they depend on changes
  const paceMinMile = (paceMinKm + paceSecKm / 60) * 1.60934
  const paceMinMileWhole = Math.floor(paceMinMile)
  const paceSecMile = Math.round((paceMinMile - paceMinMileWhole) * 60)

  // Helper function to convert time to seconds
  const timeToSeconds = (time) => {
    return time.hours * 3600 + time.minutes * 60 + time.seconds
  }

  // Helper function to format seconds to time string
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.round(totalSeconds % 60)
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Calculate splits
  const totalSeconds = timeToSeconds(targetTime)
  const pacePerKm = totalSeconds / distance
  const splits = []
  for (let i = 1; i <= Math.floor(distance); i++) {
    splits.push({
      km: i,
      time: formatTime(pacePerKm * i)
    })
  }

  // Calculate training zones based on race time
  const raceDistances = {
    '5k': 5,
    '10k': 10,
    'half': 21.0975,
    'marathon': 42.195
  }
  
  const raceTimeSeconds = timeToSeconds(raceTime)
  const racePacePerKm = raceTimeSeconds / raceDistances[raceDistance]
  
  // Training zones (based on Jack Daniels' VDOT calculations - simplified)
  const zones = {
    easy: { name: 'Easy Run', pace: racePacePerKm * 1.25, description: 'Comfortable, conversational pace' },
    tempo: { name: 'Tempo/Threshold', pace: racePacePerKm * 1.08, description: 'Comfortably hard, sustainable effort' },
    interval: { name: 'Interval', pace: racePacePerKm * 0.95, description: 'Hard effort, 3-5 min repeats' },
    repetition: { name: 'Repetition', pace: racePacePerKm * 0.90, description: 'Very hard, 200m-400m repeats' }
  }

  // COMPONENT STRUCTURE - This is what gets rendered
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Modern Header with Gradient */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-2xl shadow-purple-500/50">
            <span className="text-4xl">🏃</span>
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-3">
            Running Calculator
          </h1>
          <p className="text-purple-200 text-lg">Your intelligent training companion</p>
        </div>

        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Modern Tab Navigation */}
          <div className="flex p-2 bg-black/20">
            {['pace', 'splits', 'zones'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-semibold rounded-2xl transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50 transform scale-105'
                    : 'text-purple-200 hover:bg-white/10'
                }`}
              >
                {tab === 'pace' && '⚡ Pace'}
                {tab === 'splits' && '📊 Splits'}
                {tab === 'zones' && '🎯 Zones'}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* PACE CONVERTER TAB */}
            {activeTab === 'pace' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Pace Converter</h2>
                  <p className="text-purple-200">Convert between min/km and min/mile instantly</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Modern Input Card */}
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300">
                    <h3 className="font-bold text-white mb-6 text-xl flex items-center gap-2">
                      <span className="text-2xl">📍</span> Min/Km
                    </h3>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm text-purple-200 mb-2 font-medium">Minutes</label>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={paceMinKm}
                          onChange={(e) => setPaceMinKm(parseInt(e.target.value) || 0)}
                          className="w-full px-5 py-4 bg-black/30 border border-purple-400/30 rounded-xl text-white text-lg font-bold placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-purple-200 mb-2 font-medium">Seconds</label>
                        <input
                          type="number"
                          min="0"
                          max="59"
                          value={paceSecKm}
                          onChange={(e) => setPaceSecKm(parseInt(e.target.value) || 0)}
                          className="w-full px-5 py-4 bg-black/30 border border-purple-400/30 rounded-xl text-white text-lg font-bold placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Modern Output Card */}
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm p-8 rounded-2xl border border-green-400/30 hover:border-green-400/50 transition-all duration-300">
                    <h3 className="font-bold text-white mb-6 text-xl flex items-center gap-2">
                      <span className="text-2xl">🎯</span> Min/Mile
                    </h3>
                    <div className="text-center">
                      <div className="text-7xl font-black text-white drop-shadow-2xl">
                        {paceMinMileWhole}:{paceSecMile.toString().padStart(2, '0')}
                      </div>
                      <div className="text-green-200 mt-3 text-lg font-medium">per mile</div>
                    </div>
                  </div>
                </div>

                {/* Modern Quick Reference */}
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-xl">⚡</span> Quick Reference
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    {[
                      ['5:00/km', '8:03/mile'],
                      ['4:00/km', '6:26/mile'],
                      ['3:30/km', '5:38/mile'],
                      ['3:00/km', '4:50/mile']
                    ].map(([km, mile], i) => (
                      <div key={i} className="bg-purple-500/10 px-4 py-3 rounded-xl text-purple-200 hover:bg-purple-500/20 transition-colors">
                        <div className="font-mono font-bold">{km}</div>
                        <div className="text-xs opacity-75">{mile}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SPLIT CALCULATOR TAB */}
            {activeTab === 'splits' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Split Calculator</h2>
                  <p className="text-purple-200">Calculate your kilometer splits for any race</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-purple-200 mb-3">
                      Distance (km)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      step="0.1"
                      value={distance}
                      onChange={(e) => setDistance(parseFloat(e.target.value) || 1)}
                      className="w-full px-5 py-4 bg-black/30 border border-purple-400/30 rounded-xl text-white text-lg font-bold placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-purple-200 mb-3">
                      Target Time
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        placeholder="HH"
                        value={targetTime.hours}
                        onChange={(e) => setTargetTime({ ...targetTime, hours: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-4 bg-black/30 border border-purple-400/30 rounded-xl text-white text-center font-bold placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                      <span className="self-center text-purple-300 text-xl font-bold">:</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        placeholder="MM"
                        value={targetTime.minutes}
                        onChange={(e) => setTargetTime({ ...targetTime, minutes: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-4 bg-black/30 border border-purple-400/30 rounded-xl text-white text-center font-bold placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                      <span className="self-center text-purple-300 text-xl font-bold">:</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        placeholder="SS"
                        value={targetTime.seconds}
                        onChange={(e) => setTargetTime({ ...targetTime, seconds: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-4 bg-black/30 border border-purple-400/30 rounded-xl text-white text-center font-bold placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-6 rounded-2xl border border-purple-400/30">
                  <div className="text-center">
                    <div className="text-sm text-purple-200 mb-1 font-medium">Average Pace</div>
                    <div className="text-5xl font-black text-white drop-shadow-lg">
                      {formatTime(pacePerKm)}<span className="text-2xl text-purple-300">/km</span>
                    </div>
                  </div>
                </div>

                {/* Modern Splits Table */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
                  <div className="grid grid-cols-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 font-bold text-white p-4">
                    <div className="flex items-center gap-2">
                      <span>📍</span> Kilometer
                    </div>
                    <div className="text-right flex items-center justify-end gap-2">
                      Cumulative Time <span>⏱️</span>
                    </div>
                  </div>
                  <div className="divide-y divide-white/10 max-h-96 overflow-y-auto">
                    {splits.map((split, index) => (
                      <div 
                        key={split.km} 
                        className="grid grid-cols-2 p-4 hover:bg-white/5 transition-colors duration-200"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="text-purple-200 font-medium">{split.km} km</div>
                        <div className="text-right font-bold text-white font-mono">{split.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TRAINING ZONES TAB */}
            {activeTab === 'zones' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Training Zones</h2>
                  <p className="text-purple-200">Calculate your training paces based on a recent race</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-purple-200 mb-3">
                      Race Distance
                    </label>
                    <select
                      value={raceDistance}
                      onChange={(e) => setRaceDistance(e.target.value)}
                      className="w-full px-5 py-4 bg-black/30 border border-purple-400/30 rounded-xl text-white text-lg font-bold focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                    >
                      <option value="5k" className="bg-slate-900">5K</option>
                      <option value="10k" className="bg-slate-900">10K</option>
                      <option value="half" className="bg-slate-900">Half Marathon</option>
                      <option value="marathon" className="bg-slate-900">Marathon</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-purple-200 mb-3">
                      Race Time
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        placeholder="HH"
                        value={raceTime.hours}
                        onChange={(e) => setRaceTime({ ...raceTime, hours: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-4 bg-black/30 border border-purple-400/30 rounded-xl text-white text-center font-bold placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                      <span className="self-center text-purple-300 text-xl font-bold">:</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        placeholder="MM"
                        value={raceTime.minutes}
                        onChange={(e) => setRaceTime({ ...raceTime, minutes: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-4 bg-black/30 border border-purple-400/30 rounded-xl text-white text-center font-bold placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                      <span className="self-center text-purple-300 text-xl font-bold">:</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        placeholder="SS"
                        value={raceTime.seconds}
                        onChange={(e) => setRaceTime({ ...raceTime, seconds: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-4 bg-black/30 border border-purple-400/30 rounded-xl text-white text-center font-bold placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Training Zones Display */}
                <div className="space-y-4">
                  {Object.values(zones).map((zone, index) => {
                    const gradients = [
                      'from-green-500/20 to-emerald-500/20 border-green-400/30',
                      'from-yellow-500/20 to-orange-500/20 border-yellow-400/30',
                      'from-orange-500/20 to-red-500/20 border-orange-400/30',
                      'from-red-500/20 to-pink-500/20 border-red-400/30'
                    ];
                    return (
                      <div 
                        key={index} 
                        className={`bg-gradient-to-br ${gradients[index]} backdrop-blur-sm p-6 rounded-2xl border hover:scale-[1.02] transition-all duration-300`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-bold text-white text-xl mb-1">{zone.name}</h3>
                            <p className="text-sm text-purple-200">{zone.description}</p>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-3xl font-black text-white font-mono">
                              {formatTime(zone.pace)}<span className="text-lg text-purple-300">/km</span>
                            </div>
                            <div className="text-sm text-purple-200 font-mono mt-1">
                              {formatTime(zone.pace * 1.60934)}/mile
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-yellow-500/10 backdrop-blur-sm border border-yellow-400/30 p-5 rounded-2xl">
                  <div className="flex gap-3">
                    <span className="text-2xl">💡</span>
                    <p className="text-sm text-yellow-100">
                      <strong className="text-yellow-200">Note:</strong> These zones are estimates based on your race performance. 
                      Adjust based on feel, conditions, and individual fitness. Always listen to your body.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modern Footer */}
        <div className="text-center mt-12 space-y-2">
          <p className="text-purple-300 font-medium">Built with React + Vite + Tailwind CSS</p>
          <p className="text-purple-400 text-sm">Training zones based on Jack Daniels' VDOT methodology</p>
          <div className="flex items-center justify-center gap-2 text-purple-500 text-xs">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Deployed on Vercel</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
