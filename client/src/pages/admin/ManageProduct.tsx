import { useState } from 'react';
import AddProduct from '../../components/shared/AddProduct';
import EditProduct from '../../components/shared/EditProduct';
import { useUserContext } from '../../context/user.context';
import axios from 'axios';


const ManageProduct = () => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const {products, setProducts} = useUserContext();
  const [allProduct, setProduct] = useState(products);
  

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    spicyLevel: 0,
    isVegetarian: true,
    allergens: '',
  });

  const [editData, setEditData] = useState({
    _id: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    spicyLevel: 0,
    isVegetarian: true,
    allergens: '',
  });

  const openAddModal = () => setAddModalIsOpen(true);
  const closeAddModal = () => {
    setAddModalIsOpen(false);
    resetForm();
  };

  const openEditModal = (product: typeof editData) => {
    setEditData(product);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => setEditModalIsOpen(false);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      spicyLevel: 0,
      isVegetarian: true,
      allergens: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, isEdit: boolean = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditData({ ...editData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Add product to the database
      const response= await axios.post(`${import.meta.env.VITE_SERVER_API_V1}/product/addproduct`, formData);

      if (response.status === 201) {
        console.log('Product Added:', response.data);
        setProducts([...allProduct, response.data.product]);
        setProduct([...allProduct, response.data.product]);
        closeAddModal();
      }

      
    } catch (error:any) {
      console.error('Error adding product:', error.message);
      
    }
  };

  const handleEditSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
       const response = await axios.patch(`${import.meta.env.VITE_SERVER_API_V1}/product/editproduct/${editData._id}`, editData);
       if (response.status === 200) {
        const updatedProduct = response.data.product;
        setProducts(allProduct.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)));
        setProduct(allProduct.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)));
       }
      
    } catch (error:any) {
      console.error('Error editing product:', error);
    }
   
    closeEditModal();
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_API_V1}/product/deleteproduct/${id}`);
      setProducts(allProduct.filter((product) => product._id!== id));
      setProduct(allProduct.filter((product) => product._id!== id));
    } catch (error:any) {
      console.error('Error deleting product:', error);
    }
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '700px',
      borderRadius: '10px',
    },
  };

  return (
    <div className='container mx-auto px-5 py-3 h-screen overflow-y-auto'>
      <h1 className='text-4xl font-bold text-primary text-center mb-2'>Manage Products</h1>
      <button onClick={openAddModal} className='btn btn-primary'>Add Product</button>
    
    
    <input
        type="text"
        placeholder="Search products..."
        className="input input-bordered w-full max-w-xs mx-10 border-2 p-1 rounded"
        onChange={(e) => {

          const searchTerm = e.target.value.toLowerCase();
          const filteredProducts = products.filter((product) =>
              product.name.toLowerCase().includes(searchTerm)

          );
          setProduct(filteredProducts);
        }}
    />
      
      {/* Add Product Modal */}
      <AddProduct addModalIsOpen={addModalIsOpen} closeAddModal={closeAddModal} handleAddSubmit={handleAddSubmit} customStyles={customStyles} formData={formData} handleChange={handleChange}/>

      {/* Edit Product Modal */}
      <EditProduct  editModalIsOpen={editModalIsOpen} closeEditModal={closeEditModal} handleEditSubmit={handleEditSubmit} customStyles={customStyles} editData={editData} handleChange={handleChange}/>
      

    <table className='table-auto w-full mt-5'>
      <thead>
        <tr className='bg-gray-100'>
        <th className='border border-gray-300 px-4 py-2'>Image</th>
        <th className='border border-gray-300 px-4 py-2'>Product Name</th>
        <th className='border border-gray-300 px-4 py-2'>Price</th>
        <th className='border border-gray-300 px-4 py-2'>Description</th>
        <th className='border border-gray-300 px-4 py-2'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {allProduct?.map((product) => (
        <tr key={product.name}>
          <td className='border px-4 py-2'>
            <img src={product.image} alt={product.name} className='w-16 h-16 object-cover' />
          </td>
          <td className='border px-4 py-2'>{product.name}</td>
          <td className='border px-4 py-2'>₹{product.price.toFixed(2)}</td>
          <td className='border px-4 py-2'>{product.description}</td>
          <td className='border px-4 py-2'>
            <button onClick={() => openEditModal(product)} className='btn btn-secondary mr-2'>Edit</button>
            <button onClick={() => handleDelete(product._id)} className='btn btn-danger'>Delete</button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default ManageProduct;
