import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Homepage from "./pages/Homepage.jsx"
import Pricing from "./pages/Pricing.jsx"
import Product from "./pages/Product.jsx"
import PageNotFound from "./pages/PageNotFound.jsx"
import AppLayout from "./pages/AppLayout.jsx"
import Login from "./pages/Login.jsx"
import CityList from "./components/CityList.jsx"
import CountryList from "./components/CountryList.jsx"
import City from "./components/City.jsx"
import Form from "./components/Form.jsx"
import { CititesProvider } from "./contexts/CitiesContext.jsx"

const BASE_URL = 'http://localhost:8000'

function App() {
  return (
    <CititesProvider>

      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />} >
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CititesProvider>
  )
}

export default App
