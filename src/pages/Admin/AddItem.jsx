// import React from 'react'

import { assets } from "../../assets/admin_assets/assets"
import { useFormik } from 'formik';
import { useState } from "react";
import * as Yup from 'yup';
// import { useProducts } from "../../customHook/ProductContext";


const AddItem = () => {
	// const { addProduct } = useProducts();
	const [selectedSizes, setSelectedSizes] = useState([]);
    const [images, setImages] = useState({ image1: null, image2: null, image3: null, image4: null });
	
	const toggleSize = (size) => {
        setSelectedSizes((prevSizes) =>
            prevSizes.includes(size) ? prevSizes.filter(s => s !== size) : [...prevSizes, size]
        );
    };
	
	const handleImageUpload = (e) => {
        const { id, files } = e.target;
        setImages({ ...images, [id]: files[0] });
    };
	
	
	const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            category: 'Men',
            subCategory: 'Topwear',
            price: '',
            sizes: '',
            bestseller: false,
        },
        validationSchema: Yup.object({
			name: Yup.string().required('Product name is required'),
			description: Yup.string().required('Description is required'),
			price: Yup.number().required('Price is required').positive('Price must be positive'),
		})
		,
        onSubmit: (values) => {
			if (selectedSizes.length === 0) {
				alert('Please select at least one size.');
				return;
			}
            
			const formData = new FormData();
            
			formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('category', values.category);
            formData.append('subCategory', values.subCategory);
            formData.append('price', values.price);
            formData.append('sizes', selectedSizes.join(', '));
            formData.append('bestseller', values.bestseller ? 'true' : 'false');
            
            Object.keys(images).forEach(key => {
                const file = images[key];
                if (file) {
                    formData.append('images', file);
                }
            });
			
            fetch('http://localhost:5050/api/products/add', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
				console.log('Success:', data);
				
				//context to use newly added products
				// addProduct({
				// 	_id: data.product._id,
				// 	name: values.name,
				// 	description: values.description,
				// 	category: values.category,
				// 	subCategory: values.subCategory,
				// 	price: values.price,
				// 	sizes: selectedSizes,
				// 	images: data.product.image
				// });
            })
            .catch((error) => {
				console.error('Error:', error);
            });
        }
    });
	
	
	return (
		<>
			<form onSubmit={formik.handleSubmit} className="flex flex-col w-full items-start gap-3"  >
				<div>
					<p className="mb-2">Upload Image</p>
					<div className="flex gap-2">
						{[1, 2, 3, 4].map((num) => (
							<label key={num} htmlFor={`image${num}`}>
								<img
									src={images[`image${num}`] ? URL.createObjectURL(images[`image${num}`]) : assets.upload_area}
									className="w-20"
									alt={`Upload Image ${num}`}
								/>
								<input type="file" id={`image${num}`} hidden onChange={handleImageUpload} />
							</label>
						))}
					</div>
				</div>

				<div className="w-full">
					<p className="mb-2">Product name</p>
					<input 
						type="text" 
						name="name"
						onChange={formik.handleChange}
						value={formik.values.name}
						placeholder="Type here" 
						className="w-full max-w-[500px] px-3 py-2 border border-[#c2c2c2] rounded focus:outline-none focus:border-2 focus:border-[#c586a5]" 
						required 
					/>
					{formik.errors.name ? <div>{formik.errors.name}</div> : null}
				</div>

				<div className="w-full">
					<p className="mb-2">Product description</p>
					<textarea 
						type="text" 
						name="description"
						onChange={formik.handleChange}
						value={formik.values.description}
						placeholder="Write content here"  
						className="w-full max-w-[500px] px-3 py-2 border border-[#c2c2c2] rounded focus:outline-none focus:border-2 focus:border-[#c586a5]" 
						required
					/>
					{formik.errors.description ? <div>{formik.errors.description}</div> : null}
				</div>

				<div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
					<div>
						<p className="mb-2">Product category</p>
						<select 
							name="category" 
							onChange={formik.handleChange} 
							value={formik.values.category} 
							className="w-full px-3 py-2 border border-[#c2c2c2] rounded focus:outline-none focus:border-2 focus:border-[#c586a5]"
						>
							<option value="Men">Men</option>
							<option value="Women">Women</option>
							<option value="Kids">Kids</option>
						</select>
					</div>
					<div>
						<p className="mb-2">Sub category</p>
						<select 
							name="subCategory" 
							onChange={formik.handleChange} 
							value={formik.values.subCategory}
							className="w-full px-3 py-2 border border-[#c2c2c2] rounded focus:outline-none focus:border-2 focus:border-[#c586a5]"
						>
							<option value="Topwear">Topwear</option>
							<option value="Bottomwear">Bottomwear</option>
							<option value="Winterwear">Winterwear</option>
						</select>
					</div>
					<div>
						<p className="mb-2">Product Price</p>
						<input 
							className="w-full px-3 py-2 sm:w-[120px] border border-[#c2c2c2] rounded focus:outline-none focus:border-2 focus:border-[#c586a5]" 
							type="Number"
							name="price" 
							placeholder="$" 
							onChange={formik.handleChange}
							value={formik.values.price} 
						/>
						{formik.errors.price ? <div>{formik.errors.price}</div> : null}
					</div>
				</div>
				<div>
					<p className="mb-2">Product Sizes</p>
					<div className="flex gap-3">
						{['S', 'M', 'L', 'XL', 'XXL'].map(size => (
							<div key={size} onClick={() => toggleSize(size)}>
								<p
									className={`px-3 py-1 cursor-pointer ${selectedSizes.includes(size) ? 'bg-blue-500 text-white' : 'bg-slate-200'}`}
								>
									{size}
								</p>
							</div>
						))}
					</div>
				</div>
				<div className="flex gap-2 mt-2">
					<input 
						type="checkbox" 
						id="bestseller" 
						name="bestseller"
						onChange={formik.handleChange}
						checked={formik.values.bestseller}  
					/>
					<label className="cursor-pointer" htmlFor="bestseller">Add to bestseller</label>
				</div>
				<button type="submit" className="w-28 py-3 mt-4 bg-black text-white">ADD</button>
			</form>
		
		</>
	)
}

export default AddItem