const express=require("express");
const app=express();
const formidable=require('express-formidable');
const cloudinary=require('cloudinary')
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser");
const mongoose=require("mongoose");

const moment=require('moment');
const async=require('async');
//pulling env file
require('dotenv').config();

mongoose.Promise=global.Promise;
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true })
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cookieParser())

const {User}=require("./model/user")
const {Brand}=require("./model/brand");
const {Wood}=require("./model/wood");
const {Product}=require("./model/product");
const {Site}=require('./model/site');
const { Payment } = require("./model/payment")
const {auth} =require("./middleware/auth")
const {admin} =require("./middleware/admin")

const {sendEmail}=require('./Utilis/mail')

const SHA1=require("crypto-js/sha1")













cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
// -----------------
//----------BRANDs
// -----------------------------

app.post('/api/product/brand',auth,admin,(req,res)=>{
    const brand=new Brand(req.body);
    brand.save((err,doc)=>{
        if(err) return res.status(200).json({success:false,err})
        res.status(200).json({
            success:true,
            doc
        })
    })
})
app.get('/api/product/get_brand', (req, res) => {
   Brand.find({},(err,brands)=>{
       if(err) return res.status(200).json(err);
        return res.status(200).json(brands)

       })
   })
// -----------------
//----------Woods
// -----------------------------
app.post('/api/product/wood', auth, admin, (req, res) => {
    const wood = new Wood(req.body);
    wood.save((err, doc) => {
        if (err) return res.status(200).json({
            success: false,
            err
        })
        res.status(200).json({
            success: true,
            doc
        })
    })
})

app.get('/api/product/get_wood', (req, res) => {
    Wood.find({}, (err, woods) => {
        if (err) return res.status(200).json(err);
        return res.status(200).json(woods)

    })
})
// -----------------
//----------Products
// -----------------------------
//by arrival
//sortBy=createdAt&order=desc&limit=4
//bysell
//sortby=sold&order=desc&limit=4
app.get('/api/product/articles',(req,res)=>{
    let order = req.query.order ? req.query.order:'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit): 10;
    Product.find()
            .populate('brand')
            .populate('wood')
            .sort([[sortBy,order]])
            .limit(limit)
            .exec((err,articles)=>{
                if(err) return res.status(400).send(err);
                res.send(articles)
            })

})
app.post('/api/product/shop', (req, res) => {
    // console.log(req.body)
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let findArgs = {};
    for (let key in req.body.filters) {
        // console.log(req.body.filters[key])
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }
            else {
                findArgs[key] = req.body.filters[key]
                // console.log("at findArgs[key]", findArgs[key])
            }
        }
    }
    // console.log("at filters",findArgs)
    Product.find(findArgs)
        .populate('wood').populate('brand')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, articles) => {
            if (err) return res.status(400).send(err);
            // console.log(articles.length)
            res.status(200).json({
                size: articles.length,
                articles
            }
            )
        })



})


app.post('/api/product/article', auth, admin, (req, res) => {
    const product = new Product(req.body);
    product.save((err, doc) => {
        if (err) return res.status(200).json({
            success: false,
            err
        })
        res.status(200).json({
            success: true,
            doc
        })
    })
})

app.get('/api/product/get_product_by_id', (req, res) => {
    //?id=adad,dasdb&type=array
    const type=req.query.type;
    var items=req.query.id;
    if(type==="array"){
        let ids=items.split(',');
        items=[];
        items=ids.map(item=>{
            //convert into object id
            return mongoose.Types.ObjectId(item)
        })
    }
    Product.
    find({'_id':{$in:items}})
    .populate('brand')
    .populate('wood')
    .exec((err, products) => {
        if (err) return res.status(200).json(err);
        return res.status(200).json(products)

    })
})
// -----------------
//----------USERS
// -----------------------------

app.get('/api/users/auth', auth,(req, res) => {
    // console.log("server ' '/ api / users / auth'")
   res.status(200).json({
       isAdmin:req.user.role===0?false:true,
       isAuth:true,
       email:req.user.email,
       name:req.user.name,
       lastname:req.user.lastname,
       role:req.user.role,
       cart:req.user.cart,
       history:req.user.history
   })
})
app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate(
        { _id:req.user._id },
        { token: '' },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true,
                data:""
            })
        }
    )
})

app.post('/api/users/register',(req,res)=>{
    const user=new User(req.body)
    user.save((err,doc)=>{
        if(err) return res.status(400).json({success:false,err})
        else {
            sendEmail(doc.email,doc.name,null,"welcome")
            return res.status(200).json({
                success: true,
                doc})}
        
    })
})


app.post('/api/users/login', (req, res) => {
    User.findOne({
        'email': req.body.email
    }, (err, user) => {
        if (!user) return res.json({
            loginSuccess: false,
            message: 'Auth failed, email not found'
        });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({
                loginSuccess: false,
                message: 'Wrong password'
            });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true
                })
            })
        })
    })
})




app.post('/api/users/uploadimage',auth,admin,formidable(),(req,res)=>{
    //upload(filename,cb(),config)
    cloudinary.uploader.upload(req.files.file.path,(result)=>{
        // console.log(result);
        res.status(200).send({
            public_id:result.public_id,
            url:result.url
        })

    },{
        public_id:`${Date.now()}`,
        resource_type:'auto'
    })
})

app.get('/api/users/removeimage', auth, admin,(req,res)=>{
    let image_id=req.query.public_id;
    cloudinary.uploader.destroy(image_id,(error,result)=>{
        if(error) return res.json({
            success:false,
            error
        })
        res.status(200).send('ok')
    })
})

app.post('/api/users/addToCart',auth,(req,res)=>{
    User.findOne({_id:req.user._id},(err,doc)=>{
        let duplicate=false;
        doc.cart.forEach((item)=>{
            // console.log(item.id , req.query.productId)
            if(item.id==req.query.productId){
                duplicate=true
            }
        })
        if(duplicate){
          
            User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": mongoose.Types.ObjectId(req.query.productId) },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true },
                () => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(doc.cart)
                }
            )
        }
        else{
            User.findOneAndUpdate({_id:req.user._id},
                {$push:{cart:{
                    id:mongoose.Types.ObjectId(req.query.productId),
                    quantity:1,
                    date:Date.now()
                }}},{new:true},(err,doc)=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json(doc.cart)
                })
        }
    }
)})


app.get('/app/user/removerFromCart',auth,(req,res)=>{
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "cart": { "id": mongoose.Types.ObjectId(req.query._id) } }
        },
        { new: true },
        (err, doc) => {
            let cart = doc.cart;
            let array = cart.map(item => {
                return mongoose.Types.ObjectId(item.id)
            });

            Product.
                find({ '_id': { $in: array } }).
                populate('brand').
                populate('wood').
                exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail,
                        cart
                    })
                })
        }
    );
})



app.post('/api/user/successBuy', auth, (req, res) => {
    let history = [];
    let transactionData = {}

    const date = new Date();
    const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1(req.user._id).toString().substring(0,8)}`

    // user history
    req.body.cartDetail.forEach((item) => {
        history.push({
            porder:po,
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })

    // PAYMENTS DASH
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    }
    transactionData.data = { ...req.body.paymentData, porder: po};
    transactionData.product = history;

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err });

            const payment = new Payment(transactionData);
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err });
                let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })
                // console.log(products)
                async.eachSeries(products, (item, callback) => {
                    // console.log(item.quantity)
                    Product.update(
                        { _id: item.id },
                        {
                            $inc:{"sold": item.quantity}
                        },
                        { new: false },
                        callback()
                    ) 
                }, (err) => {
                    if (err) return res.json({ success: false, err })
                    sendEmail(user.email,user.name,null,"purchase",transactionData)
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    })
                })
            });
        }
    )
})

app.post('/api/user/updateProfile', auth, (req, res) => {

    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$set": req.body
        },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true,doc
            })
        }
    );
})

app.get('/api/site/sitedata', (req, res) => {
    // console.log('/api/site/sitedata')
    Site.find({}, (err, site) => {

        if (err) return res.status(400).send(err);
        // console.log(site)
        res.status(200).send(site[0].siteInfo)
    });
});

app.post('/api/site/sitedata', auth, admin, (req, res) => {
    // console.log('/api/site//api/site/sitedata_update')
    Site.findOneAndUpdate(
        { name:'Site'},
        { "$set":{siteInfo:req.body }},
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true,
                siteInfo: doc.siteInfo
            })
        }
    )
})

const multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    // fileFilter:(req,file,cb)=>{
    //     const exnt=path.extname(file.orginalname)
    //     if(ext!=='.jpg' && ext!=='.png'){
    //         return cb(res.status(400).end('only png and jpg are allowed'));
    //     }
    //     cb(null,true)
    // }

})



const upload = multer({ storage: storage }).single('file');
app.post('/api/users/uploadFiles', auth, admin, (req, res) => {
    upload(req, res, (err) => {
        if (err) { return res.json({ success: false, err }) }
        return res.json({ success: true })
    })
})

const fs=require('fs');
const path=require('path');

app.get('/api/users/admin_files',auth,admin,(req,res)=>{
    const dir=path.resolve(".")+'/uploads';
    fs.readdir(dir,(err,items)=>{
        return res.status(200).send(items)
    })
})
app.get('/api/users/download/:id', auth, admin, (req, res) => {
    const file = path.resolve(".") + `/uploads/${req.params.id}`;
    console.log(file)
    res.download(file)
})

app.post('/api/user/reset_user',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
    if(err) return res.json({success:false,msg:"No user found"});
    else{
        user.generateResetToken((err,user)=>{
            if (err) return res.json({ success: false, err})
            sendEmail(user.email,user.name,null,"reset_password",user)
            return res.json({success:true,user})
        })
    }
})
})


app.post('/api/users/reset_password',(req,res)=>{
    var today=moment().startOf('day').valueOf();
    User.findOne({
       resetToken:req.body.resetToken, 
       resetTokenExp:{
           $gte:today
       }
    },(err,user)=>{
        console.log(user)
        if(!user) return res.json({success:false,message:"Sorry password Expired"})
        user.password=req.body.password;
        user.resetToken='';
        user.resetTokenExp='';
        user.save((err,doc)=>{
            if(err) return res.json({success:false,err})
            return res.status(200).json({ success: true})
        })
    })
})


const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log("App is runnig at",port)
})

//syntax of async
// async.eachOfSeries(array,
// ()=>{//updating data},
// ()=>{//final callback}) 