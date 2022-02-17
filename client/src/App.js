import './App.css';
import MediaCard from './components/MediaCard';
import React, { useEffect} from "react";



function App() {

  useEffect(() => {
    document.title = "Notable Media Cards";  
  }, []);

  return (
        <MediaCard></MediaCard>
  );
}
export default App;
