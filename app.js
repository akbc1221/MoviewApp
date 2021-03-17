const express = require('express');
const app = express();
const request = require('request');
const PORT = process.env.PORT || 5000 ;

// api key :==> http://www.omdbapi.com/?i=tt3896198&apikey=fdff6de8
//middleware
app.set("view engine","ejs");
app.use('/public',express.static('public'));

app.get('/',(req,res)=>{
    res.render("home");
});

app.get('/result',(req,res)=>{
    const url = `http://www.omdbapi.com/?apikey=fdff6de8&s=${req.query.movieName}`;
    request(url,(error,response,body)=>{
        if(!error && response.statusCode===200){
            const data = JSON.parse(body);
            res.render('result',{movies: data});
        }else{
            res.send("Something went wrong");
        }
    });
});

//
app.get('/result/:id',(req,res)=>{
    const url = `http://www.omdbapi.com/?apikey=fdff6de8&i=${req.params.id}`;
    request(url,(error,response,body)=>{
        if(!error && response.statusCode===200){
            const data = JSON.parse(body);
            res.render('detail',{data: data});
        }else{
            res.send("Something went wrong");
        }
    });
});


//handle undefined paths
app.get('/*',(req,res)=>{
    res.send("Error 404");
});

app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`);
});


