import path from "path";
import multer from "multer";
import { v4 } from "uuid";

// DYNAMIC DISK STORAGE CONFIGURATION (based on the given folder address)
function getTargetImageStorage(address: any) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${address}`); // ./uploads/products or ./uploads/members
    },
    // Generates a unique filename for every uploaded file
    filename: function (req, file, cb) {
      const extension = path.parse(file.originalname).ext;
      const random_name = v4() + extension;
      cb(null, random_name);
    },
  });
}

// Creates and returns a multer upload middleware for the given folder address
const makeUploader = (address: string) => {
  const storage = getTargetImageStorage(address); // gets the storage config for given address
  return multer({ storage: storage });
};

export default makeUploader;

/** MULTER CONFIGURATION */
// const product_storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/products"); // saves to ./uploads/products directory
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     const extension = path.parse(file.originalname).ext; // extracts the file extension (.jpg, .png)
//     const random_name = v4() + extension; // generates a unique name using UUID v4 + extension (a1b2c3d4-...jpg)
//     cb(null, random_name); // saves the file with the new unique name
//   },
// });

// export const uploadProductImage = multer({ storage: product_storage });
