import React from 'react'
import Modal from 'react-modal'

interface EditProductProps {
  editModalIsOpen: boolean;
  closeEditModal: () => void;
 
  handleEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  customStyles: ReactModal.Styles;
  editData: {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    spicyLevel: number,
    isVegetarian: boolean,
    allergens: string,
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, isEdit: boolean) => void;
}

const EditProduct: React.FC<EditProductProps> = ({ editModalIsOpen, closeEditModal, handleEditSubmit, customStyles, editData, handleChange}) => {
  return (
    <Modal isOpen={editModalIsOpen}  onRequestClose={closeEditModal} ariaHideApp={false} style={customStyles} contentLabel="Edit Product Modal">
        <h2 className='text-2xl font-bold mb-4'>Edit Product</h2>
        <form onSubmit={handleEditSubmit} className='p-4 border rounded-lg space-y-4'>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className='block font-medium mb-1'>Name</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={(e) => handleChange(e, true)}
                className='input input-bordered w-full border-2 px-1 rounded'
                required
              />
            </div>
            <div>
              <label className='block font-medium mb-1'>Description</label>
              <textarea
                name="description"
                value={editData.description}
                onChange={(e) => handleChange(e, true)}
                className='textarea textarea-bordered w-full border-2 p-1'
                rows={3}
                required
              ></textarea>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className='block font-medium mb-1'>Price</label>
              <input
                type="number"
                name="price"
                value={editData.price}
                onChange={(e) => handleChange(e, true)}
                className='input input-bordered w-full border-2 px-1 rounded'
                required
              />
            </div>
            <div>
              <label className='block font-medium mb-1'>Image URL</label>
              <input
                type="text"
                name="image"
                value={editData.image}
                onChange={(e) => handleChange(e, true)}
                className='input input-bordered w-full border-2 px-1 rounded'
                required
              />
            </div>
            <div>
                <label className='block font-medium mb-1'>Category</label>
                  <select 
                    name="category" 
                    value={editData.category} 
                    onChange={(e) => handleChange(e, true)} 
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
                    value={editData.spicyLevel} 
                    onChange={(e) => handleChange(e, true)}
                    className='input input-bordered w-full border-2 px-1 rounded' 
                    min="0" 
                    max="4" 
                  />
                </div>
                <div>
                  <label className='block font-medium mb-1'>Is Vegetarian?</label>
                  <select 
                    name="isVegetarian" 
                    value={editData.isVegetarian.toString()} 
                    onChange={(e) => handleChange(e, true)}
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
                  value={editData.allergens} 
                  onChange={(e) => handleChange(e, true)}
                  placeholder="Comma-separated values" 
                  className='input input-bordered w-full border-2 px-1 rounded' 
                  
                />
              </div>
          <div className='flex justify-end space-x-4'>
            <button type="submit" className='btn btn-primary'>Save Changes</button>
            <button type="button" onClick={closeEditModal} className='btn btn-secondary'>Cancel</button>
          </div>
        </form>
      </Modal>
  )
}

export default EditProduct