var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/employees');

var Employee = mongoose.model('Employee', mongoose.Schema({
	name:String,
	dept:String,
	area:String,
	status:String,
	contact:String,
	salary:String
}));

app.get('/', function(req, res){
	res.send("Hi, This is Ray's first site");
})

app.get('/api/employees', function(req, res){
	Employee.find(function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

app.post('/api/employees', function(req, res){
        Employee.create(req.body, function(err, employee){
                if(err)
                        res.send(err);
                res.json(employee);
        });
});


app.get('/api/employees/:id', function(req, res){
        Employee.findOne({_id:req.params.id}, function(err, employee){
                if(err)
                        res.send(err);
                res.json(employee);
        });
});

app.delete('/api/employees/:id', function(req, res){
        Employee.findOneAndRemove({_id:req.params.id}, function(err, employee){
                if(err)
                        res.send(err);
                res.json(employee);
        });
});

app.put('/api/employees/:id', function(req, res){
	var query = {_id:req.params.id};
	update = {
		name: req.body.name,
		dept: req.body.dept,
		area: req.body.area,
		status: req.body.status,
		contact: req.body.contact,
		salary: req.body.salary
	}
        Employee.findOneAndUpdate(query, update, function(err, employee){
                if(err)
                        res.send(err);
                res.json(employee);
        });
});

app.listen(3000, function(){
	console.log('Server is running on port 3000')
})
