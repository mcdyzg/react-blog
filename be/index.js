var express =require('express')
var router =express.Router();
var app=express()
var path =require('path')
var logger=require('morgan')
var bodyParser = require('body-parser');
var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/mongo-blog',function(e){

})

var ModelSchema = new mongoose.Schema({

	title:String,
	content:String,
	intro:String,
	time:String,

	category:String,
	auth:{ type: String, default: 'ljh' },
});

var CategorySchema = new mongoose.Schema({
	name:String,
});


app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
var Model=mongoose.model('Model',ModelSchema)
var Category=mongoose.model('Category',CategorySchema)



app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});






app.use(express.static(path.join(__dirname, 'static')));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');





router.get('/',function(req,res){
	res.render('index');
})



router.post('/add',function(req,res){

	var m1=new Model({
		title:req.query.title,
		content:req.query.content,
		intro:req.query.intro,
		auth:req.query.auth,
		time:req.query.time,
		category:req.query.category,
	})

	m1.save(function(e,product,num){
		if(e) res.send(e.message)

		var html=req.body
		res.json(html)
	})
})



router.get('/find',function(req,res){

	Model.find({

	},{__v:0},function(e,docs){   //_id:0,
		if(e) 
		res.send(e.message)

		res.json(docs)
	})
})


router.get('/findarticle',function(req,res){

	Model.find({
		_id:req.query._id
	},{__v:0},function(e,docs){   //_id:0,
		if(e) 
		res.send(e.message)

		res.json(docs)
	})
})






router.get('/remove',function(req,res){
	Model.remove({
		// id:1
	},function(e){
		if(e)
			res.send(e.message)
		res.send('删除成功')
	})
})

router.get('/addcategory',function(req,res){

	var c1=new Category({
		name:req.query.name,
	})

	c1.save(function(e,product,num){
		if(e) res.send(e.message)

		var html=req.body
		res.json(html)
	})
})

router.get('/findcate',function(req,res){

	Category.find({
		// id:1
	},{__v:0},function(e,docs){   //_id:0,
		if(e) 
		res.send(e.message)

		res.json(docs)
	})
})


router.get('/deletecategory',function(req,res){
	console.log(req.query._id)
	Category.remove({
		_id:req.query._id
	},function(e){
		if(e) {
			res.send(e.message)
		}
		res.json('已完成')
	}) 
})

router.get('/findcategoryarticlelist',function(req,res){
	Model.find({
		category:req.query.name
	},{__v:0},function(e,docs){   //_id:0,
		if(e) 
		res.send(e.message)
		console.log(JSON.stringify(docs))
		res.json(docs)
	})
})


router.get('/removecate',function(req,res){
	Category.remove({
		// id:1
	},function(e){
		if(e)
			res.send(e.message)
		res.send('删除成功')
	}) 
})


app.use('/', router);

app.listen(3004)