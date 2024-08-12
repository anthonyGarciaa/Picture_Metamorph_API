import sharp from "sharp";
export default function convertFile(file, format) {
      const extension=format.split('/')[1];
      
      const promise = new Promise((resolve, reject) => {
        sharp(file)
          .toFormat(extension)
          .png({ quality: 100 })
          .toBuffer()
          .then(res=>resolve(res))
          .catch(err=>reject(err))
      })
      return promise
}
