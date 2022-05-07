const mongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
app.use(express.json());
mongoClient.connect("mongodb://localhost:27017", (err, client)=> {
    if(err) {
        console.log("Error");
    }
    else {
        db = client.db("studb");
    }
})
app.get("/", (req, res)=> {
    res.sendFile(__dirname+"/index.html");
});
app.get("/stu", (req, res)=> {
    db.collection("stu").find().toArray((err, items)=>{
        if(err) {}
        console.log(items);
        res.send(items);
    })
});
app.post("/addstu", (req, res)=> {
    db.collection("stu").insertOne({
        _id:req.body._id,
        name:req.body.name,
        age:req.body.age
    });
    console.log("inserted successfully");
    res.end();
});
app.put("/updatestu/:id", (req, res)=> {
    db.collection("stu").updateOne({"_id":Number(req.params.id)}, {$set:{name:req.body.name}});
    console.log("updated");
    res.send(req.body.name);
    res.end();
});
app.delete("/deletestu/:id", (req, res)=>{
    db.collection("stu").deleteOne({"_id":Number(req.params.id)});
    console.log("deleted");
    res.send("Deleted");
    res.end();
})
app.get("/stu/:id", (req, res)=> {
    db.collection("stu").find({"_id":Number(req.params.id)}).toArray((err, item)=> {
        if(err){}
        console.log(item);
        res.send(item);
        res.end();
    })
});
app.listen("4000", ()=>console.log("server started"));