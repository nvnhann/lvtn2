
const {BaiViet, CTKH, TaiLieu, User, LinhVuc } = require('../database/models')
export const createBaiViet = async (noidung, idkh, tailieu) => {
   try{
       console.log('======================',noidung, idkh, tailieu)
       //if(idkh === undefined || noidung !== undefined) return;
       const kh = await CTKH.findOne({
           where: {id: idkh}
       })
        const bv = await BaiViet.create({noidung: noidung});
        await kh.addBaiviet(bv);
          tailieu?.map(async e => {
              const tl = await TaiLieu.findOne({
                  where: { id: e}
              });
          await bv.addTailieu(tl,  {through: 'ct_bv'})
          })


   }catch (e) {
       console.log(e)
   }
}

export const getBaiVietByKH = async id => {
    return await BaiViet.findAll({
        include: [{
            model: CTKH,
            where: {
                id: id
            }
        }, {
            model: TaiLieu,
            include: [{
                model: LinhVuc
            }, {
                model: User
            }]
        }]
    })
}