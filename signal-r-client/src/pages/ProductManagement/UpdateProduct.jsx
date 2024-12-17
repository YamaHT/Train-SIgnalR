import { Close } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
	Typography,
} from '@mui/material'
import { HttpStatusCode } from 'axios'
import { useState } from 'react'
import { SignalRService } from 'src/service/SignalRService'
import AxiosConfig from 'src/utils/AxiosConfig'

const UpdateProduct = ({ open, selectedProduct, handleClose }) => {
	const [product, setProduct] = useState(selectedProduct)

	const handleChangeValue = (e) => {
		const { name, value } = e.target
		setProduct((prev) => ({ ...prev, [name]: value }))
	}

	const handleUpdate = async () => {
		const response = await AxiosConfig.put('/product', product).then((res) => res)
		if (response.status === HttpStatusCode.Ok) {
			SignalRService.ProductHub.invoke('GetProductsAsync')
			handleClose()
		}
	}

	return (
		<Dialog open={open} fullWidth maxWidth={'lg'}>
			<DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography flexGrow={1}>Update #{product.id}</Typography>
				<IconButton onClick={handleClose}>
					<Close />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<TextField label='Id' name='Id' value={product.id} disabled />

				<TextField label='name' name='name' value={product.name} onChange={handleChangeValue} />
				<TextField
					label='description'
					name='description'
					value={product.description}
					onChange={handleChangeValue}
				/>
				<TextField
					label='price'
					type='number'
					name='price'
					value={product.price}
					onChange={handleChangeValue}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleUpdate}>Update</Button>
			</DialogActions>
		</Dialog>
	)
}

export default UpdateProduct
