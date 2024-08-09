import fs from "node:fs";
/*recibe un array de archivos con una propiedad buffer la cual contenga un buffer de archivo valido*/
const getBases64Array = (files) => {
  let bases64Array = [];
  files.forEach(file => bases64Array.push({name:file.originalName,base64:file.toString("base64")}));
  return bases64Array
};

export default getBases64Array;
