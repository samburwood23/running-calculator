# Running Calculator 🏃

A React-based running calculator that helps runners with pace conversions, split calculations, and training zone recommendations.

## Features

- **Pace Converter**: Convert between min/km and min/mile
- **Split Calculator**: Generate km-by-km splits for any distance and target time
- **Training Zones**: Calculate training paces based on recent race performance

## React Concepts Used

### 1. **Components**
The entire app is a single component (`App.jsx`). In React, components are reusable pieces of UI that can manage their own state and logic.

### 2. **State Management with `useState`**
```javascript
const [activeTab, setActiveTab] = useState('pace')
```
- `useState` is a React Hook that lets you add state to functional components
- It returns an array with two elements: the current state value and a function to update it
- When state changes, React automatically re-renders the component

### 3. **Controlled Components**
```javascript
<input
  value={paceMinKm}
  onChange={(e) => setPaceMinKm(parseInt(e.target.value) || 0)}
/>
```
- Input values are controlled by React state
- The `value` prop sets what's displayed
- The `onChange` handler updates state when users type
- This gives you full control over the input behavior

### 4. **Conditional Rendering**
```javascript
{activeTab === 'pace' && (
  <div>Pace converter content...</div>
)}
```
- Shows/hides content based on state
- Only the active tab's content is rendered
- Uses JavaScript's `&&` operator for concise conditionals

### 5. **List Rendering with `.map()`**
```javascript
{splits.map((split) => (
  <div key={split.km}>...</div>
))}
```
- Dynamically generate UI elements from arrays
- The `key` prop helps React track which items changed
- Creates one element for each item in the array

### 6. **Event Handlers**
```javascript
onClick={() => setActiveTab(tab)}
```
- Functions that run when users interact with elements
- Can update state, trigger calculations, etc.
- Arrow functions are common for inline handlers

### 7. **Derived State (Computed Values)**
```javascript
const paceMinMile = (paceMinKm + paceSecKm / 60) * 1.60934
```
- Calculate values from existing state
- React automatically recalculates when dependencies change
- No need to store these in state

### 8. **Template Literals & JSX**
```javascript
className={`flex-1 py-4 ${activeTab === tab ? 'bg-blue-500' : 'text-gray-600'}`}
```
- Dynamic CSS classes based on state
- Template literals (backticks) allow embedded expressions
- JSX uses `className` instead of `class`

## Project Structure

```
running-calculator/
├── src/
│   ├── App.jsx          # Main component with all logic
│   ├── main.jsx         # Entry point that renders App
│   └── index.css        # Tailwind directives
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite bundler config
```

## Tech Stack

- **React 18**: UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploying to Vercel

1. Push this code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Vercel auto-detects Vite - just click "Deploy"
6. Your app will be live in ~30 seconds!

## Learning Resources

- [React Docs](https://react.dev) - Official React documentation
- [useState Hook](https://react.dev/reference/react/useState) - Deep dive into state management
- [Thinking in React](https://react.dev/learn/thinking-in-react) - How to approach React apps
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS

## Next Steps to Extend This App

1. **Add more features**: Race time predictor, VO2 max estimator
2. **Local storage**: Save user's favorite paces/times
3. **Charts**: Visualize training zones with a library like Recharts
4. **Export**: Generate PDF training plans
5. **Multiple runners**: Compare training zones for a running group

## Training Zone Methodology

Training zones are based on Jack Daniels' VDOT system, which calculates training paces from recent race performances. The zones included are:

- **Easy**: 25% slower than race pace - builds aerobic base
- **Tempo**: 8% slower than race pace - improves lactate threshold
- **Interval**: 5% faster than race pace - improves VO2 max
- **Repetition**: 10% faster than race pace - improves speed and form

---

Built with ❤️ for runners by runners
