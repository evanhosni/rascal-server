const express = require('express');
const router = express.Router();
const { User, Rascal, EquippedItem, UnlockedItem } = require('../../models');
const tokenAuth = require("../../middleware/tokenAuth")
const sequelize = require("../../config/connection.js")

router.get('/equipped/:id',(req,res)=>{
    EquippedItem.findAll({RascalId:req.params.id}).then(EquippedItems=>{
        res.json(EquippedItems)
    }).catch(err=>{
        console.log(err)
        res.json(err)
    })
})

router.get('/unlocked/:id',(req,res)=>{
    UnlockedItem.findAll({RascalId:req.params.id}).then(UnlockedItems=>{
        res.json(UnlockedItems)
    }).catch(err=>{
        console.log(err)
        res.json(err)
    })
})

router.put('/equipped/:id',(req,res)=>{
    for (let i = 0; i < req.body.length; i++) {
        const item = req.body[i];
        item.id=i+1
        item.RascalId=req.params.id
        EquippedItem.upsert(item).then(data=>{
            if(i==req.body.length-1){
                res.json('success')
            }
        }).catch(err=>{
            console.log(err)
            res.json(err)
        })
        
    }
})
router.post('/unlocked/:id',(req,res)=>{
    UnlockedItem.create({...req.body,RascalId:req.params.id}).then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err)
        res.json(err)
    })
})
// /////////// ANTIQUATED
router.post('/postequip/:id',(req,res)=>{
    EquippedItem.create({...req.body,RascalId:req.params.id}).then(e=>{
        res.json("success")
    }).catch(err=>{
        console.log(err)
        res.json(err)
    })
})
router.put('/putequip/:id',(req,res)=>{
    console.log(req.body)
    EquippedItem.update(req.body,{where:{RascalId:req.params.id,id:req.body.id}}).then(e=>{
        res.json("success")
    }).catch(err=>{
        console.log(err)
        res.json(err)
    })
})
// ////////////////////
// router.delete('/delete/:id',(req,res)=>{
//     EquippedItem.destroy({
//         where:{
//             id:req.params.id
//         }
//     }).then(data=>{
//         res.json(data)
//     }).catch(err=>{
//         console.log(err)
//         res.json(err)
//     })
// })
// router.post('/mass/:id',(req,res)=>{
//     for (const item of req.body) {
//         if(item.id){
//             EquippedItem.update(item,{where:{id:item.id}}).then(data=>{
//                 if(item===req.body[req.body.length-1]){
//                     res.json("success")
//                 }
//             }).catch(err=>{
//                 console.log(err)
//                 res.json(err)
//             })

//         }else{

//             EquippedItem.create({...item,RascalId:req.params.id}).then(dat=>{
//                 if(item===req.body[req.body.length-1]){
//                     res.json("success")
//                 }
//             }).catch(err=>{
//                 console.log(err)
//                 res.json(err)
//             })
//         }
//     }
// })



module.exports = router