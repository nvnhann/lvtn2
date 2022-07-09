import React, {useEffect, useState} from "react";
import * as $http from '../../utils/httpProvider';
import * as CONFIG from '../../config/configUrl';
import {
    Box,
    Button,
    IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {useSnackbar} from "notistack";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {postData, putData} from "../../utils/httpProvider";
import {API_BASE_URL} from "../../config/configUrl";
//----------------------------------------------------------------------------------
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
};
//----------------------------------------------------------------------------------

function LinhVuc(props) {
    const [data, setData] = useState([]);
    const [tenBoMon, setTenBoMon] = useState('');
    const [tenBoMonEdit, setTenBoMonEdit] = useState('');
    const [id, setId] = useState(0);
    const [open, setOpen] = useState(false);
    const [openD, setOpenD] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [load, setLoad] = useState(0);

    useEffect(() => {
        (async () => {
            const res = await $http.getData(CONFIG.API_BASE_URL + '/linhvuc');
            setData(res.data);
        })()
    }, [load]);

    const creatBoMon = async () =>{
        try{
            if(!tenBoMon) return enqueueSnackbar('Không được bỏ trống!', {variant: 'error', autoHideDuration: 3000});
            await postData(API_BASE_URL+'/linhvuc', {tenbomon: tenBoMon});
            setLoad(e => e+1)
            enqueueSnackbar('Thêm thành công', {variant: 'success', autoHideDuration: 3000});
        }catch (e) {
            console.log(e)
            enqueueSnackbar(e.response.data.message, {
                variant: "error",
                autoHideDuration: 2000,
            });
        }
    }

    const editBoMon = async () =>{
        try{
            if(!tenBoMonEdit) return enqueueSnackbar('Không được bỏ trống!', {variant: 'error', autoHideDuration: 3000});
            await putData(API_BASE_URL+'/linhvuc', {id: id, name: tenBoMonEdit});
            setLoad(e => e+1)
            enqueueSnackbar('Chỉnh sửa thành thành công', {variant: 'success', autoHideDuration: 3000});
            setId(null);
            setOpen(false)
        }catch (e) {
            console.log(e)
        }
    }

    const updateStatus = async (id, status) =>{
        try{
            await postData(API_BASE_URL+'/linhvuc/status', {id: id, status: status});
            enqueueSnackbar(status === 1 ? 'Đã hiện lĩnh vực' : 'Đã ẩn lĩnh vực', {variant: "success", autoHideDuration: 3000});
            setLoad(e => e+1)
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className="flex my-2 gap-2 items-center">
                <input
                    className="w-[300px] py-2 px-4 border border-slate-500 rounded-lg outline-none"
                    type="text"
                    value={tenBoMon}
                    onChange={(e) => setTenBoMon(e.target.value)}
                    placeholder="Tên lĩnh vực"
                />
                <Button  variant="contained" onClick={()=>creatBoMon()}
                         sx={{textTransform: "none"}}>Thêm lĩnh vực</Button>

            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{backgroundColor: '#2554A6'}}>
                        <TableRow>
                            <TableCell sx={{color: '#fff'}}>ID</TableCell>
                            <TableCell sx={{color: '#fff'}}>Bộ môn</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((e, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{e.id}</TableCell>
                                <TableCell>{e.name}</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <ModeEditIcon onClick={()=>{
                                            setTenBoMonEdit(e.name);
                                            setId(e.id);
                                            setOpen(true)
                                        }}/>
                                    </IconButton>
                                    {e.active && (<IconButton color="info" onClick={()=> updateStatus(e.id, 0)}><VisibilityOffIcon/></IconButton>)}
                                    {!e.active && (<IconButton color="info" onClick={()=> updateStatus(e.id, 1)}><VisibilityIcon /></IconButton>)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={open}>
                <Box sx={style}>
                    <div>
                        <div>
                            <input
                                className="w-full py-2 px-4 my-2 border border-slate-500 rounded-lg outline-none"
                                type="text"
                                value={tenBoMonEdit}
                                onChange={(e) => setTenBoMonEdit(e.target.value)}
                                placeholder="Tên lĩnh vực"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button  variant="contained" onClick={()=>setOpen(false)}
                                     sx={{textTransform: "none"}}>Hủy</Button>
                            <Button  variant="contained" onClick={()=>editBoMon()}
                                     sx={{textTransform: "none"}}>Lưu</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>

    );
}

export default LinhVuc;
