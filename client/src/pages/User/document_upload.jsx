import React, {useState} from 'react'
import {HiOutlineDocumentAdd} from 'react-icons/hi'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

function DocumentUpload() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 py-2 px-4 text-white bg-[#F38E46] rounded-md"
      >
        Thêm tài liệu <HiOutlineDocumentAdd size={25} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="text-center text-[25px] font-medium">Thêm tài liệu</p>
          <form>
            <p>Tên tài liệu</p>
            <input
              type="text"
              className="my-2 py-1 px-4 w-full border border-[#ccc] rounded-md"
              placeholder="Nhập tên tài liệu"
              name="tentailieu"
            />
            <p>Mô tả</p>
            <input
              type="text"
              className="my-2 py-1 px-4 w-full border border-[#ccc] rounded-md"
              placeholder="Nhập mô tả"
              name="mota"
            />
            <p>Chọn file</p>
            <input type="file" className="my-2" />
            <div className="flex gap-2 justify-end my-4">
              <button className="py-2 px-4 min-w-[100px] text-white font-bold bg-[#F38E46] rounded-md shadow-md">
                Thêm
              </button>
              <button
                className="py-2 px-4 min-w-[100px] text-white font-bold bg-[#F38E46] rounded-md shadow-md"
                onClick={handleClose}
              >
                Hủy
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default DocumentUpload
