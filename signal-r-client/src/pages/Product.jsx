import { HubConnectionBuilder } from '@microsoft/signalr'
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { Constraints } from 'src/utils/Constraints'

const Product = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		const connection = new HubConnectionBuilder()
			.withUrl(Constraints.BASE_URL + '/product')
			.withAutomaticReconnect()
			.build()

		connection.start().then(() => connection.invoke('GetProductsAsync'))

		connection.on('GetProducts', (products) => {
			setProducts(products)
		})
	}, [])

	return (
		<Table component={Paper} sx={{ width: '75%', mx: 'auto' }}>
			<TableHead>
				<TableRow>
					<TableCell>Id</TableCell>
					<TableCell>Name</TableCell>
					<TableCell>Description</TableCell>
					<TableCell>Price</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{products.map((product) => (
					<TableRow>
						<TableCell>{product.id}</TableCell>
						<TableCell>{product.name}</TableCell>
						<TableCell>{product.description}</TableCell>
						<TableCell>${product.price}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export default Product