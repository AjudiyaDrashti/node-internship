const express = require('express')
const app = express()
app.use(express.json())
const posts = []

app.get('/login',(req,res)=>{
    res.send({
        message : 'hello'
    })
})
app.post('/createProduct',(req,res)=>{
  console.log(req.body)
  let obj = req.body

  
  if( obj.ProductName && obj.Cost){
    obj.id=posts.length+1
    obj.isDeleted = 0
  posts.push(obj)
  res.send({
      "isSuccess" : true ,
      "message" : 'product created sucsessfully' ,
      'data' : posts 
  })
}else{
    res.send({
    "isSuccess" : false ,
      "message" : 'error' ,
      'data' : posts 
    })
}
})

app.get('/getProduct',(req,res)=>{
  let filteredProduct = posts.filter((fld)=>(
    fld.isDeleted==0
  ))

 res.send({product : filteredProduct})
    })

app.get('/getProductByName',(req,res)=>{
 let ProductName = req.query.ProductName
 console.log('ProductName',ProductName)
  let product = posts.find((fld)=>(
   fld.ProductName===ProductName
  ))
  res.send({
    product : product
  })
})

app.put('/updateProduct', (req,res)=>{
    let ProductName=req.query.ProductName
    let idx =posts.findIndex((fld)=>(
        fld.ProductName==ProductName

        
    ))
    console.log('ProductName update',posts[idx])

     posts[idx].ProductName=req.body.ProductName 
     posts[idx].Cost = req.body.Cost 
     
console.log(posts)
        res.send(posts)
    
})
app.delete('/softDeleteProduct' , (req,res)=>{
  let ProductName = req.query.ProductName
  let idx=posts.findIndex((fld)=>(
    fld.ProductName==ProductName  
))
if(idx>=0){
posts[idx].isDeleted = 1
res.send({posts})
}else{
  res.send('product not found')
}

})

app.delete('/hardDeleteProduct' , (req,res)=>{
  let ProductName = req.query.ProductName
  let idx=posts.findIndex((fld)=>(
    fld.ProductName==ProductName 
))
console.log('idx' , idx)
if(idx>=0){
  posts.splice(idx,1)
  res.status(200).send({posts})
}else{
  res.status(404).send({message : 'product not found'})
}
})

app.get('/getProductByRange' , (req,res)=>{
  let query = req.query 
  let arr =posts.filter((fld)=>{
    if(!fld.isDeleted){
      return true;
    }
})
console.log('arr1',arr,query.maxVal)
if(query.maxVal){
arr = arr.filter((fld)=>{
  
    if(parseInt(fld.Cost)<=parseInt(query.maxVal)){
      return true;
    }
})
}
console.log('arr2',arr)

if(query.minVal){
  arr = arr.filter((fld)=>{
    if(parseInt(fld.Cost)>parseInt(query.minVal)){
      return true;
    }
  })
}
console.log('arr3',arr)

res.send({products : arr})
})

app.get('/getProductInOrder',(req,res)=>{
  let query = req.query
  console.log(query)
  let arr =posts.filter((fld)=>{
    if(!fld.isDeleted){
      return true;
    }
  });
  if(query.sort && query.sort==='asc'){
    arr =  arr.sort((a,b)=>{
      return a.Cost-b.Cost
    })
    res.send(arr)
    }
    else if (query.sort && query.sort === 'dec'){
      arr =  arr.sort((a,b)=>{
        return b.Cost-a.Cost
      })
      res.send(arr)
    }
  })




app.listen(5002,()=>{
    console.log('server started on 5002')
})