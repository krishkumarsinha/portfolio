import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Timeline from './components/Timeline/Timeline';
import Proficiency from './components/Proficiency/Proficiency';
import Achievements from './components/Achievements/Achievements';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Timeline />
      <Proficiency />
      <Achievements />
    </div>
  );
}

export default App;
