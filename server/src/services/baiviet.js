
const {BaiViet, CTKH, TaiLieu } = require('../database/models')
export const createBaiViet = async (noidung, idkh, tailieu) => {
   try{
       console.log(noidung, idkh, tailieu)
       //if(idkh === undefined || noidung !== undefined) return;
       const kh = await CTKH.findOne({
           id: idkh
       })
        const bv = await BaiViet.create({noidung: noidung});
        kh.addBaiviet(bv);
          tailieu?.map(async e => {
              const tl = await TaiLieu.findOne({
                  where: { id: e}
              });
           bv.addTailieu(tl,  {through: 'ct_bv'})
          })


   }catch (e) {
       console.log(e)
   }
}