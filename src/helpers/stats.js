const {image,Comment} = require('../models')


async function imageCounter(){
return await image.countDocuments()
}

async function commentsCounter(){
return await Comment.countDocuments()
}

async function totalViewsCounter(){
     const result = await image.aggregate([{$group: {
          _id: '1',
          viewsTotal: {$sum: '$views'}
        }}]);

        let viewsTotal = 0;
        if(result.length > 0) {
          viewsTotal += result[0].viewsTotal;
        }
return viewsTotal;
}

async function likesTotalCounter(){
const result = await image.aggregate([{$group:{
     _id:'1',
     likesTotal:{$sum:'$likes'}
}}])
let likesTotal = 0;
  if (result.length > 0) {
    likesTotal += result[0].likesTotal;
  }
  return likesTotal;
}


module.exports = async ()=>{

const result = await Promise.all([
     imageCounter(),
     commentsCounter(),
     totalViewsCounter(),
     likesTotalCounter()

])
return {
     image:result[0],
     comments:result[1],
     views:result[2],
     likes:result[3]
}
}