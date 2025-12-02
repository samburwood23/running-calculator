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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏃 Running Calculator</h1>
          <p className="text-gray-600">Your training companion for pace, splits, and zones</p>
        </div>

        {/* Tab Navigation - This demonstrates conditional rendering */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b">
            {['pace', 'splits', 'zones'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab === 'pace' && '⚡ Pace Converter'}
                {tab === 'splits' && '📊 Split Calculator'}
                {tab === 'zones' && '🎯 Training Zones'}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* PACE CONVERTER TAB */}
            {activeTab === 'pace' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pace Converter</h2>
                  <p className="text-gray-600 mb-6">Convert between min/km and min/mile paces</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Input Section */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-4">Min/Km</h3>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-2">Minutes</label>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={paceMinKm}
                          onChange={(e) => setPaceMinKm(parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-2">Seconds</label>
                        <input
                          type="number"
                          min="0"
                          max="59"
                          value={paceSecKm}
                          onChange={(e) => setPaceSecKm(parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Output Section */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-4">Min/Mile</h3>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-800">
                        {paceMinMileWhole}:{paceSecMile.toString().padStart(2, '0')}
                      </div>
                      <div className="text-gray-600 mt-2">per mile</div>
                    </div>
                  </div>
                </div>

                {/* Quick Reference */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Quick Reference</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div className="text-gray-600">5:00/km = 8:03/mile</div>
                    <div className="text-gray-600">4:00/km = 6:26/mile</div>
                    <div className="text-gray-600">3:30/km = 5:38/mile</div>
                    <div className="text-gray-600">3:00/km = 4:50/mile</div>
                  </div>
                </div>
              </div>
            )}

            {/* SPLIT CALCULATOR TAB */}
            {activeTab === 'splits' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Split Calculator</h2>
                  <p className="text-gray-600 mb-6">Calculate your kilometer splits for any race</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distance (km)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      step="0.1"
                      value={distance}
                      onChange={(e) => setDistance(parseFloat(e.target.value) || 1)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Time
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        placeholder="HH"
                        value={targetTime.hours}
                        onChange={(e) => setTargetTime({ ...targetTime, hours: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="self-center">:</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        placeholder="MM"
                        value={targetTime.minutes}
                        onChange={(e) => setTargetTime({ ...targetTime, minutes: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="self-center">:</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        placeholder="SS"
                        value={targetTime.seconds}
                        onChange={(e) => setTargetTime({ ...targetTime, seconds: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Average Pace</div>
                    <div className="text-3xl font-bold text-blue-600">
                      {formatTime(pacePerKm)}/km
                    </div>
                  </div>
                </div>

                {/* Splits Table */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-2 bg-gray-100 font-semibold text-gray-700 p-3">
                    <div>Kilometer</div>
                    <div className="text-right">Cumulative Time</div>
                  </div>
                  <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                    {splits.map((split) => (
                      <div key={split.km} className="grid grid-cols-2 p-3 hover:bg-gray-50">
                        <div className="text-gray-700">{split.km} km</div>
                        <div className="text-right font-medium text-gray-900">{split.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TRAINING ZONES TAB */}
            {activeTab === 'zones' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Training Zones</h2>
                  <p className="text-gray-600 mb-6">Calculate your training paces based on a recent race</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Race Distance
                    </label>
                    <select
                      value={raceDistance}
                      onChange={(e) => setRaceDistance(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="5k">5K</option>
                      <option value="10k">10K</option>
                      <option value="half">Half Marathon</option>
                      <option value="marathon">Marathon</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Race Time
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        placeholder="HH"
                        value={raceTime.hours}
                        onChange={(e) => setRaceTime({ ...raceTime, hours: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="self-center">:</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        placeholder="MM"
                        value={raceTime.minutes}
                        onChange={(e) => setRaceTime({ ...raceTime, minutes: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="self-center">:</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        placeholder="SS"
                        value={raceTime.seconds}
                        onChange={(e) => setRaceTime({ ...raceTime, seconds: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Training Zones Display */}
                <div className="space-y-4">
                  {Object.values(zones).map((zone, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800">{zone.name}</h3>
                          <p className="text-sm text-gray-600">{zone.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatTime(zone.pace)}/km
                          </div>
                          <div className="text-sm text-gray-600">
                            {formatTime(zone.pace * 1.60934)}/mile
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> These zones are estimates based on your race performance. 
                    Adjust based on feel, conditions, and individual fitness. Always listen to your body.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">Built with React + Vite + Tailwind CSS</p>
          <p className="text-xs mt-2">Training zones based on Jack Daniels' VDOT methodology</p>
        </div>
      </div>
    </div>
  )
}

export default App
