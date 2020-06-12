const express = require('express')
const logic = require('./src/logic/index')
const colors = require('colors')
colors.enable()

const app = express()

app.use('/',express.static('src/public'))
app.use('/video',express.static('src/public'))
app.use('/video',express.static('node_modules'))

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
        video:data.video,
        title:data.title,
    })

})
app.get('/video',(req,res)=> {
    const {search,title} = req.query
    console.log(search)
    return res.render('video',{
        title,
        search
    })
})
app.get('/watch',async(req,res)=> {
    const {range} = req.headers
    return await logic.Video(res,req.query.search,range)
})
app.post('/paths',async(req,res)=> {
    const {result,imgs} = await logic.AllPaths()
    return res.send({
        qnt:result.length,
        title:result,
        imgs
    })
})

app.get('/subtitles',async(req,res)=> {
    console.log('> Verificando se há legenda....'.yellow)
    res.set('Content-Type',"subtitles/subtitle")
    await logic.Subtitles(res,req.query.search)
})
app.listen(80,async() => {
    console.clear()
    console.log('=================================================='.green);
    console.log('> Servidor do Local Streaming iniciado com sucesso'.green)
    const {result} = await logic.AllPaths()
    console.log(`> Foram achados ${result.length} pastas`.green)
    console.log('=================================================='.green);
    console.log();
    
    for(let i in result){
        console.log(String(result[i]).yellow)
    }
})