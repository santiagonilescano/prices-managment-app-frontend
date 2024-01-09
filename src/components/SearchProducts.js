import React, { useRef, useState } from 'react';
import useApi from '../hooks/useApi'; 
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns'; // Import the format function from date-fns
import { Button } from '@mui/material';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const SearchProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: searchResults, loading, error, fetchData } = useApi();
  const [delayedSearch, setDelayedSearch] = useState(null);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (delayedSearch) {
      clearTimeout(delayedSearch);
    }

    if (term.trim() !== '') { 
      setDelayedSearch(
        setTimeout(() => {
          fetchData(`${baseUrl}/Prices?productName=${term}`);
        }, 500)
      );
    } else {
      setDelayedSearch([]);
    }
  };

  const video = useRef(null)
  const canvas = useRef(null)

  const openCam = () =>{
    navigator.mediaDevices.getUserMedia({ video: {width: 300, height:300, facingMode: 'environment'}})
    .then(stream=>{
      video.current.srcObject=stream;
      video.current.play();
      const ctx = canvas.current.getContext('2d');
      const barcode = new window.BarcodeDetector({formats: ['qr_code','ean_13']});
      setInterval(()=>{
        canvas.current.width=video.current.videoWidth;
        canvas.current.height=video.current.videoHeight;
        ctx.drawImage(video.current,0,0,video.current.videoWidth,video.current.videoHeight);
        barcode.detect(canvas.current).then(([data])=>{
          if(data){
            video.current.pause();
            setSearchTerm(data.rawValue);
            handleSearch();
            canvas.current.width=0;
            canvas.current.height=0;
          }
          else{
            console.log('No encontré un código');
          }
        });
      },100)
    })
    .catch(err=> console.log(err))
  }
  

  return (
    <div style={{ padding: '16px', maxWidth: '500px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        <img src={process.env.PUBLIC_URL + '/logo.jpeg'} alt="Logo" style={{ width: '100px', height: '100px' }} />
      </div>
      <Typography variant="h4" gutterBottom>
        Buscame
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Buscar"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />
      <Button
        label="Codigo Barras"
        text="Codigo "
        onClick={openCam}
      >
      Codigo
      </Button>  
      <video ref={video} autoPlay muted hidden/>
      <canvas ref={canvas}/>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Codigo</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio Costo</TableCell>
              <TableCell>Precio Venta</TableCell>
              <TableCell>Margen %</TableCell>
              <TableCell>Fecha Actualización</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.barCode}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.costPrice}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.margin}</TableCell>
                <TableCell>
                  {product.lastUpdate ? ( // Check if lastUpdate exists
                    format(new Date(product.lastUpdate), 'dd/MM/yyyy') // Format the date using date-fns format function
                  ) : (
                    'N/A' // Or display 'N/A' if lastUpdate is null or undefined
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )};
export default SearchProducts;