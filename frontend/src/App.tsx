import FilteringSection from './components/FilteringSection'
import FlightSection from './components/FlightSection'

const App = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="my-8 mx-40 flex-1 bg-green-100 p-4 shadow-md">
        <FilteringSection />
        <FlightSection />
      </div>
    </div>
  );
}

export default App;