import {
  // BrowserRouter,
  Routes,
  Route,
  // Link,
} from "react-router-dom";
import Home from "./pages/Home";
import Starred from "./pages/Starred";
import Show from "./pages/Show";
import {ThemeProvider} from "styled-components"

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};


function App() {
  return (
    <ThemeProvider theme={theme}>
    <div >

       <Routes>

        <Route exact path="/" element={ <Home/> } />
        <Route exact path="/starred" element={ <Starred/> } />
        <Route exact path="/show/:id"  element={ <Show/> }  />
        <Route path="*" element={ <h1>404</h1> }/>
      
      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
