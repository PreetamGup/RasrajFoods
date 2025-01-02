import React from 'react'
import Modal from 'react-modal'

interface AddProductProps {
  addModalIsOpen: boolean;
  closeAddModal: () => void;
  handleAddSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  customStyles: ReactModal.Styles;
  formData: {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    spicyLevel: number;
    isVegetarian: boolean;
    allergens: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const AddProduct: React.FC<AddProductProps> = ({addModalIsOpen, closeAddModal, handleAddSubmit, customStyles, formData, handleChange}) => {
  return (
     <Modal isOpen={addModalIsOpen} onRequestClose={closeAddModal} style={customStyles} ariaHideApp={false} contentLabel="Add Product Modal">
          <h2 className='text-2xl font-bold mb-4'>Add Product</h2>
            <form onSubmit={handleAddSubmit} className='p-4 border rounded-lg space-y-4'>
              <div className="grid grid-cols-2 gap-4">
                
                <div>
                  <label className='block font-medium mb-1'>Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className='input input-bordered w-full border-2 px-1 rounded' 
                    required 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className='block font-medium mb-1'>Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    className='textarea textarea-bordered w-full border-2 p-1' 
                    rows={3}
                    required 
                  ></textarea>
                </div>
                <div>
                  <label className='block font-medium mb-1'>Price</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    className='input input-bordered w-full border-2 px-1 rounded' 
                    required 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className='block font-medium mb-1'>Image URL</label>
                  <input 
                    type="text" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleChange} 
                    className='input input-bordered w-full border-2 px-1 rounded' 
                    required 
                  />
                </div>
                <div>
                <label className='block font-medium mb-1'>Category</label>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    className='select select-bordered w-full border-2 px-1 rounded' 
                    required
                  >
                    <option value="North Indian">North Indian</option>
                    <option value="South Indian">South Indian</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Cakes">Cakes</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className='block font-medium mb-1'>Spicy Level (0-4)</label>
                  <input 
                    type="number" 
                    name="spicyLevel" 
                    value={formData.spicyLevel} 
                    onChange={handleChange} 
                    className='input input-bordered w-full border-2 px-1 rounded' 
                    min="0" 
                    max="4" 
                  />
                </div>
                <div>
                  <label className='block font-medium mb-1'>Is Vegetarian?</label>
                  <select 
                    name="isVegetarian" 
                    value={formData.isVegetarian.toString()} 
                    onChange={handleChange} 
                    className='select select-bordered w-full border-2 px-1 rounded'  
                    required
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div>
                <label className='block font-medium mb-1'>Allergens</label>
                <input 
                  type="text" 
                  name="allergens" 
                  value={formData.allergens} 
                  onChange={handleChange} 
                  placeholder="Comma-separated values" 
                  className='input input-bordered w-full border-2 px-1 rounded' 
                  
                />
              </div>
              <div className='flex justify-end space-x-4'>
                <button type="submit" className='btn btn-primary'>Submit</button>
                <button type="button" onClick={closeAddModal} className='btn btn-secondary'>Cancel</button>
              </div>
            </form>
          </Modal>
  )
}

export default AddProduct