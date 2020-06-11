const express = require('express')
const logic = require('./src/logic/index')


const app = express()

app.use('/',express.static('src/public'))
app.use('/video',express.static('src/public'))

app.set('views',`${__dirname}/src/views`)
app.set('view engine','pug')

app.get('/',(req,res)=> {
    return res.render('index')
})
app.get('/preview',async(req,res)=> {
    const tearm = req.query.search;
    console.log(tearm)
    const data = await logic.data(tearm)
    const img = await logic.Find(tearm)
    console.log(data)
    return res.render('preview',{
        img:img,
        eps:data.files,
        video:data.video
    })

})
app.get('/video',(req,res)=> {
    const {search } = req.query
    console.log(search)
    res.render('video',{
        search
    })
})
app.get('/watch',async(req,res)=> {
    console.log(req.query.search)
    console.log(req.param)
    res.set('Content-Type','video/mp4')
    return await logic.Video(res,req.query.search)
})
app.post('/paths',async(req,res)=> {
    const {result,imgs} = await logic.AllPaths()
    return res.send({
        qnt:result.length,
        title:result,
        imgs
    })
})


app.listen('3000',async() => {
    console.clear()
    const {result} = await logic.AllPaths()
    console.log(result)
})