import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditProduct = ({ product, onSave, onCancel }) => {
  // Local state to manage form fields
  const [editedProduct, setEditedProduct] = useState({ ...product });

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle saving changes
  const handleSave = () => {
    // You can implement API calls or other logic to update the product details here
    // For now, just log the updated product details to the console
    console.log('Saving changes:', editedProduct);
    
    // Call onSave to notify the parent component
    onSave(editedProduct);
  };

  // Handle cancel action
  const handleCancel = () => {
    // Close the form and notify the parent component
    onCancel();
  };

  return (
    <div>
      <h2>Actualizar Producto</h2>
      <form>
        <TextField
          label="Nombre"
          name="nombre"
          value={editedProduct.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="¿Cuanto Salio?"
          name="costPrice"
          value={editedProduct.costPrice}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="¿A cuanto lo vendemos?"
          name="price"
          value={editedProduct.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Margen Ganancia"
          name="margin"
          value={editedProduct.margin}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Add more fields for other properties if needed */}
        
        <div>
          <Button variant="contained" onClick={handleSave}>
            Guardar
          </Button>
          <Button variant="contained" onClick={handleCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;