import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';
import { GridFsStorage } from 'multer-gridfs-storage'



const storage = new GridFsStorage({
    url:"mongodb+srv://pranavbagal4:enp3AVxvhI4iIIsM@clone-whatsapp.qctf01s.mongodb.net/?retryWrites=true&w=majority",
    options:{useNewUrlParser:true},
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-file-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-file-${file.originalname}`
        }
    }

})


export default multer({storage});