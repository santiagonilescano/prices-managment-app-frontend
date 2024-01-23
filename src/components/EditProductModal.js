// EditProductModal.js

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import EditProduct from './EditProduct';

const EditProductModal = ({ open, onClose, product, onSave, onCancel }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <EditProduct product={product} onSave={onSave} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;