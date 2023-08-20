import Login from "./components/login";
import Table from "./components/table";
import {Route, Routes} from "react-router-dom";


function App() {

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path="/table" element={<Table/>} />
            </Routes>
        </div>
    );
}

export default App;
