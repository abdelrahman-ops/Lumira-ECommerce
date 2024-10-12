import { useEffect, useState } from "react";
import { useProducts } from "../../customHook/ProductContext";

const ListItems = () => {
    // const { products } = useProducts();  // for using new added products only
	const {updateProduct, deleteProduct } = useProducts();
    const [selectedProduct, setSelectedProduct] = useState(null);
    
	const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: []
    });

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            images: product.images
        });
    };

    const handleDelete = (productId) => {
        fetch(`http://localhost:5050/api/products/${productId}`, {
            method: 'DELETE',
        })
		.then(response => response.json())
		.then(() => {
                console.log("Product deleted successfully");
                deleteProduct(productId);
            })
            .catch(error => console.error("Error deleting product: ", error));
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        fetch(`http://localhost:5050/api/products/${selectedProduct._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
		.then(response => response.json())
		.then(updatedProduct => {
                console.log("Product updated successfully");
                updateProduct(updatedProduct);
                setSelectedProduct(null);
            })
            .catch(error => console.error("Error updating product: ", error));
    };

    const handleCancel = () => {
        setSelectedProduct(null);
    };


	const [allProducts, setAllProducts] = useState([]);
	useEffect(() => {
        fetch(`http://localhost:5050/api/products/`, {
            method: 'GET',
        })
        .then(response => {
            // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            console.log(data); // Log the fetched data
            setAllProducts(data); // Store the data in state
        })
        .catch(error => {
            console.error('Error fetching products:', error); // Log any errors
        });
    }, []);
    return (
        <>
            <p className="mb-2">All Products List</p>
            <div className="flex flex-col gap-2">
                <div className="hidden md:grid grid-cols-[0.8fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
                    <b>Image</b>
                    <b className="text-center">Name</b>
                    <b className="text-center ">Description</b>
                    <b className="text-center">Category</b>
                    <b className="text-center">Price</b>
                    <b className="text-center">Action</b>
                </div>
                {allProducts.map((product) => {
                    return (
                        <div key={product._id} className="hidden md:grid grid-cols-[0.8fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
                            {/* {product.images?.length > 0 && (
                                <img src={`http://localhost:5050${product.images[0]}`} alt={product.name} className="w-16" />
                            )} */}
							{console.log(product.image)}
							<img src={`http://localhost:5050${product.image}`} alt={product.name} className="w-16" />
                            <div className="text-center">{product.name}</div>
                            <div className="text-center">{product.description}</div>
                            <div className="text-center">{product.category}</div>
                            <div className="text-center">{product.price}</div>
                            <div className="text-center">
                                <button className="text-white mr-2 p-1 bg-green-700 rounded" onClick={() => handleUpdate(product)}>Update</button>
                                <button className="text-white mr-2 p-1 bg-red-700 rounded" onClick={() => handleDelete(product._id)}>Delete</button>
                            </div>
                        </div>
						
                    );
                })}

                {selectedProduct && (
                    <div className="modal">
                        <h2>Edit Product: {selectedProduct.name}</h2>
                        <form className="flex flex-col gap-2">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                                className="p-2 border"
                            />
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                                className="p-2 border"
                            />
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="Price"
                                className="p-2 border"
                            />
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                placeholder="Category"
                                className="p-2 border"
                            />
                            {/* Add additional form fields as needed */}

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default ListItems;
