const http=require('http')

const server = http.createServer((req,res)=>{
    console.log(req.url,req.method)
if(req.method=='GET'){
    if(req.url=='/login'){
        res.write('home')
        res.end()
    }else{
        res.write('else')
        res.end()
    }
}else{
    res.write('hello world')
    res.end()
}
})

server.listen(5000,()=>{
    console.log('port started at 5000')
})
