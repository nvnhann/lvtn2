const bcrypt = require('bcryptjs');
const saltRounds = 10;
const password = 'user1234'
const fs = require('fs');


const getpwd = async() => {
    const pass =await bcrypt.hash(password, saltRounds);
        console.log(pass)
}

const compare = async ()=>{
    const rs = await bcrypt.compare('user1234','$2a$10$30iRZeldJ8Czyh59bg0l9Oxd.r2deUY4zSW1oPmzlYRt9.ls/os02');
    console.log(rs)
}


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  const rndInt = randomIntFromInterval(1, 6)
  console.log(rndInt);

  const rs = [];

  const pass = "$2a$10$30iRZeldJ8Czyh59bg0l9Oxd.r2deUY4zSW1oPmzlYRt9.ls\/os02";

  // for(let i = 100; i< 180; i++){
  //   rs.push(
  //       {
  //       "id":i,
  //       "maso":"CB00"+i,
  //       "mat_khau":pass,
  //       "email":"@ctu.edu.vn",
  //       "ho_ten":"",
  //       "sdt":"0794351150",
  //       "dia_chi":"Phú Tân, Châu Thành, Cần Thơ",
  //       "active":1,
  //       "created_at":"2022-07-01 09:50:10",
  //       "updated_at":"2022-07-01 09:50:10",
  //       "ngay_sinh":"2000-01-01 00:00:00",
  //       "gioi_tinh": '',
  //       "bomon_id": ''}

  //   )
  // }

  for(let i = 100; i< 178; i++){
    rs.push(
        {
          "created_at": "2022-07-01 12:20:43.000000", "updated_at": "2022-07-01 12:20:43.000000", "user_id": i, "khoahoc_id": 2

        })
  }
  fs.writeFile('myjsonfile.json', JSON.stringify(rs), 'utf8', ()=>{
    console.log('complete');
    
  });


  console.log(rs)

