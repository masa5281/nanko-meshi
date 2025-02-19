import { Header } from "./components/Header/Header";
import { CalorieInput } from "./components/CalorieInput/CalorieInput";

export const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/calorie/input" Component={CalorieInput} />
          <Route path="/foods/conversion" Component={FoodConversion} />
        </Routes>
      </Router>  
    </>
  );
}

export default App;
