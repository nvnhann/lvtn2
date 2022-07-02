import React, { useEffect, useState } from "react";
import * as $http from '../../utils/httpProvider';
import * as CONFIG from '../../config/configUrl';
import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
// import ModeEditIcon from '@mui/icons-material/ModeEdit';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

function BoMon(props) {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        (async ()=>{
            const res = await $http.getData(CONFIG.API_BASE_URL + '/bomon');
            setData(res.data);
        })()
    }, []);
  return (
    <div>
     <Button onClick={()=>setOpen(true)} className="mb-4" variant="contained" sx={{mb: 2,   textTransform: "none"}}>Thêm bộ môn</Button>
    <TableContainer component={Paper}>
        <Table>
        <TableHead sx={{backgroundColor: '#2554A6'}}>
            <TableRow>
                <TableCell sx={{ color: '#fff'}}>ID</TableCell>
                <TableCell sx={{ color: '#fff'}}>Bộ môn</TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
       <TableBody>
       {data?.map((e, idx)=>(
            <TableRow key={idx}>
                <TableCell>{e.id}</TableCell>
                <TableCell>{e.name}</TableCell>
                <TableCell>
                   <IconButton>
                        {/* <ModeEditIcon /> */}
                   </IconButton>
                </TableCell>
            </TableRow>
        ))}
       </TableBody>
        </Table>
    </TableContainer>
    <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className="flex gap-5 items-center py-4 px-6 mx-auto bg-[#2554A6] rounded-md">
                <div className="text-[25px] text-center font-medium text-white">Thêm bộ môn</div>
            </div>
            <div className="mt-2">
                <Button variant="outlined">Đóng</Button>
                <Button variant="contained">Thêm</Button>
            </div>
        </Box>
      </Modal>

    </div>

  );
}

export default BoMon;
