import React from 'react'
import { Scanner } from '@yudiel/react-qr-scanner';

function ScanQr() {
  
    return <Scanner onScan={(result) => console.log(result)} />;
  
}

export default ScanQr