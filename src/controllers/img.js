const path = require("path");
const { randomName } = require("../helpers/libs");
const fs = require("fs-extra");
const { image, Comment } = require("../models");
const md5 = require("md5");
const ctrl = {};
const sidebar =require('../helpers/sidebar');
const { nextTick } = require("process");

ctrl.index = async (req, res) => {
 let viewModel ={imagen:{}, comments:[]}
  const imagen = await image.findOne({
    filename: { $regex: req.params.image_id }
  });

if(imagen){
  imagen.views = imagen.views + 1;
   viewModel.imagen = imagen; 
  await imagen.save();
  const comments = await Comment.find({ image_id: imagen._id });
  viewModel.comments = comments;
  viewModel = await sidebar(viewModel)
  res.render("image", viewModel);
}
   
  
};

ctrl.like = async (req, res) => {

  const imagen = await image.findOne({
    filename: { $regex: req.params.images_id }
  });

if(imagen){
  imagen.likes = imagen.likes +1
  await imagen.save();
  res.json({like:imagen.likes})
}else{
  res.status(500).jason({error:'Internal Error'})
}
};

ctrl.create = (req, res) => {
  const saveImage = async () => {
    const imgUrl = randomName();
    const images = await image.find({ filename: imgUrl });

    if (images.length > 0) {
      saveImage();
    }

    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

    if (ext === ".png" || ext === ".jpg" || ext === ".gif") {
      await fs.rename(imageTempPath, targetPath);
      const newImg = new image({
        title: req.body.title,

        filename: imgUrl + ext,
        description: req.body.description
      });
      const imageSaved = await newImg.save();
      res.redirect("/images/" + imgUrl);
    } else {
      await fs.unlink(imageTempPath);
      res.status(500).json({ error: "Only Images are allowed" });
    }
  };

  saveImage();
};

ctrl.coment = async (req, res) => {
  const imagen = await image.findOne({
    filename: { $regex: req.params.images_id }
  });

  if (imagen) {
    const newComment = new Comment(req.body);
    newComment.gravatar = md5(newComment.email);
    newComment.image_id = imagen._id;
    await newComment.save();
    res.redirect("/images/" + imagen.uniqueID);
  } else {
    res.redirect("/");
  }

  res.send("comment");
};

ctrl.delete = async (req, res) => {
  const imagen = await image.findOne({
    filename: { $regex: req.params.images_id }
  });
  
  if(imagen){
   
await fs.unlink(path.resolve('./src/public/upload/'+imagen.filename))
await Comment.deleteOne({image_id:imagen._id})
await imagen.remove()
res.json(true)
res.redirect("/");


  }
 

};

module.exports = ctrl;
