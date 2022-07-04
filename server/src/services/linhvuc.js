import { LinhVuc } from "../database/models"

export const getAll = async () =>{
    return await LinhVuc.findAll();
}