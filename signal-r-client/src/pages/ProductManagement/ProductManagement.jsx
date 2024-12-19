import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { SignalRService } from 'src/service/SignalRService'
import AddProduct from './AddProduct'
import UpdateProduct from './UpdateProduct'
import AxiosConfig from 'src/utils/AxiosConfig'
import { HttpStatusCode } from 'axios'

const ProductManagement = () => {
	const [products, setProducts] = useState([])
	const [openAdd, setOpenAdd] = useState(false)
	const [openUpdate, setOpenUpdate] = useState(false)
	const [selectedProduct, setSelectedProduct] = useState(null)

	useEffect(() => {
		const connection = SignalRService.ProductHub
		connection.invoke('GetProductsAsync')
		connection.on('GetProducts', (products) => {
			setProducts(products)
		})
	}, [])

	const handleDelete = async (id) => {
		const response = await AxiosConfig.delete('/product/' + id).then((res) => res)
		if (response.status === HttpStatusCode.Ok) {
			SignalRService.ProductHub.invoke('GetProductsAsync')
			handleClose()
		}
	}

	const handleOpenUpdate = (product) => {
		setOpenUpdate(true)
		setSelectedProduct(product)
	}

	return (
		<>
			<Button onClick={() => setOpenAdd(true)}>Add</Button>
			<Paper sx={{ width: '75%', mx: 'auto' }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell width={'20%'}>Id</TableCell>
							<TableCell width={'20%'}>Name</TableCell>
							<TableCell width={'20%'}>Description</TableCell>
							<TableCell width={'20%'}>Price</TableCell>
							<TableCell width={'20%'}></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products.map((product) => (
							<TableRow key={product.id}>
								<TableCell>{product.id}</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell>{product.description}</TableCell>
								<TableCell>${product.price}</TableCell>
								<TableCell>
									<Button color='success' onClick={() => handleOpenUpdate(product)}>
										Update
									</Button>
									<Button color='error' onClick={() => handleDelete(product.id)}>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
			{openAdd && <AddProduct open={openAdd} handleClose={() => setOpenAdd(false)} />}
			{openUpdate && (
				<UpdateProduct
					open={openUpdate}
					handleClose={() => setOpenUpdate(false)}
					selectedProduct={selectedProduct}
				/>
			)}
		</>
	)
}

export default ProductManagement
