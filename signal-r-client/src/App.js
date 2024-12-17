import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import ProductManagement from './pages/ProductManagement/ProductManagement'

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/product' element={<Product />} />
					<Route path='/product-management' element={<ProductManagement />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
