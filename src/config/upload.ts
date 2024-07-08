import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const uploadFolder = path.resolve(__dirname, '..', '..', 'upload');

//objeto que leva o arquivo convertido em bytes inserido para a pasta upload criada globalmente
export default {
    directory: uploadFolder,
    storage: multer.diskStorage({
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
    
            const filename = `${fileHash}-${file.originalname}`;
    
            callback(null, filename);
        }
    }),
    
}