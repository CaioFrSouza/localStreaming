const fs = require('fs')
const google = require('googleapis').google
const path = require('path')
const converter = require('./converter')

const SearchEngine = google.customsearch('v1')
const config = require ('../config/config.json')


async function image (tearm) {
    console.log('pequisando a imagem',tearm)
    const response = await SearchEngine.cse.list({
        auth:config.apiKey,
        cx:config.searchEngineId,
        q:`${tearm} title`,
        searchType:"image",
        imgType:"photo",
        imgSize:'xxlarge',
        num:1
    })
    const imageUrl = response.data.items.map(itens=> {
        return itens.link
    })
    return imageUrl[0]
}
async function readDb (){
    let file = fs.readFileSync(`${__dirname}/data/data.json`)
    file =  JSON.parse(file)
    return file
}
async function saveDb (file) {
    const json = JSON.stringify(file)
    return file = fs.writeFileSync(`${__dirname}/data/data.json`,json)
}


module.exports = {
    AllPaths: async(dir = '/',local = config.VideosPath) =>
     new Promise(async(resolve,reject)=> fs.readdir(`${local}/${dir}`,async(err,result) => {
            if(err)
            reject({err})
            let db = await readDb()
            
            console.log(db.result.length, result.length)
            if(db.result.length !== result.length){
                const imgs = []
                for (let i in result){
                    const img = await image(result[i])
                    imgs.push(img)
                }
                saveDb({result,imgs})
                db = await readDb()
                return resolve(db)
            }
            return resolve(db)
        })),
    data:async(dir) => new Promise(async (resolve,reject)=>{
        const videosExt = ['.sla','.mp4','.mkv']
        let files = fs.readdirSync(`${config.VideosPath}/${dir}`)
        let videoFiles = []
        videoFiles = files.filter(value => {
            let bolean
            const ext = path.extname(value).toLowerCase()
            bolean = false
            for(let i in videosExt){
                if(videosExt[i] == ext)
                    bolean = true
            }
            console.log(bolean)
            return bolean === true
        })
        if(videoFiles.length >0)
            return resolve({video:true,files:videoFiles})
        return resolve({video:false,files})
     }),
     Find:async(tearm) => {
        const db = await readDb()
        index =  db.result.indexOf(tearm)
        return db.imgs[index]
     },
     Video:async(res,q) => {
         return converter.convert(res,q,config.VideosPath)
     }
}