import convertFile from "./modules/convertFile.js";
import fs from "node:fs";
import getBases64Array from "./modules/getBases64Array.js";


const getPicture = (req, res) => {

  if (req.files) {
    if (
      req.body.format &&
      !(
        req.body.format !== "image/jpeg" &&
        req.body.format !== "image/png" &&
        req.body.format !== "image/gif" &&
        req.body.format !== "image/tiff" &&
        req.body.format !== "image/webp"
      )
    ) {
      const proms = [];
      for (let i = 0; i < req.files.length; i++) {
        if (
          !(
            req.files[i].mimetype !== "image/png" &&
            req.files[i].mimetype !== "image/jpeg" &&
            req.files[i].mimetype !== "image/tiff" &&
            req.files[i].mimetype !== "image/gif" &&
            req.files[i].mimetype !== "image/webp"
          )
        ) {
          proms.push(
            convertFile(req.files[i].buffer, req.body.format)
          );
        } else {
          res.status(400).json({
            error: true,
            ok: false,
            statusText: "Bad Request",
            message: `Bad Request: "files" must have a valid image format`,
          });
          return;
        }
      }
      Promise.all(proms).then((bufferArr) => {
        const data=[];
        for(let i=0;i<req.files.length;i++){
          data.push({
            name: `${req.files[i].originalname.split(".")[0]}.${
              req.body.format.split("/")[1]
            }`,
            base64: bufferArr[i].toString("base64"),
          });
        }
        console.log(data)
            res.status(200).json({
              error: false,
              ok: true,
              statusText: "Ok",
              message: `Ok: The files were successfully converted`,
              data
            });
      });
    } else {
      res.status(400).json({
        error: true,
        ok: false,
        statusText: "Bad Request",
        message: `Bad Request: A valid format of images must be specified`,
      });
    }
  } else {
    res.status(400).json({
      error: true,
      ok: false,
      statusText: "Bad Request",
      message: `Bad Request: Images must be submitted`,
    });
  }
};
export default getPicture;
