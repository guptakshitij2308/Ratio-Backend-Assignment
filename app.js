const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("./Models/User.js");
const mongoose = require("mongoose");

const app = express();

const DB =
  "mongodb+srv://kshitijg:65p31pMH8LdOgAvq@cluster0.1vkr70l.mongodb.net/ratio-backend?retryWrites=true&w=majority";

mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
  console.log("DB connection established successfully.");
});

const port = process.env.PORT || 3000;

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadUserPics = upload.fields([{ name: "images", maxCount: 3 }]);

const resizeUserPhoto = async (req, res, next) => {
  try {
    if (!req.files.images) return next();

    req.body.images = [];

    await Promise.all(
      req.files.images.map(async (file, idx) => {
        const filename = `user-pic-${idx + 1}-${Date.now()}.jpeg`;
        // console.log(filename);
        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/img/users/${filename}`);

        req.body.images.push(filename);
      })
    );

    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

app.get("/hello-world", (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

app.get("/get-users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

app.post("/upload-photo", uploadUserPics, resizeUserPhoto, async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    message: "User successfully created.",
  });
});
