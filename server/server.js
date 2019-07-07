const express=require("express");
const app=express();

const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser");
const mongoose=require("mongoose");

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
const {Product}=require("./model/product")
const {auth} =require("./middleware/auth")
const {admin} =require("./middleware/admin")

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
                success: true
            })
        }
    )
})

app.post('/api/users/register',(req,res)=>{
    const user=new User(req.body)
    user.save((err,doc)=>{
        if(err) return res.status(400).json({success:false,err})
        else res.status(200).json({
                success: true,
                doc})
        
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




const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log("App is runnig at",port)
})