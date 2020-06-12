const {statSync,createReadStream,createWriteStream} = require('fs')
const path = require('path')
const {spawn} = require('child_process')
const ffmepgExt = `./src/logic/FFMPEG/ffmpeg.exe`

module.exports = {
    convert:async(res,query,pathVideo,range) => {
        const ext = path.extname(query);
        const videoPath = `${pathVideo}/${query}`;
        const video = query;
        const input_file = createReadStream(videoPath);
        const convertVideoName = video.replace(ext,".mp4");

        const {size} =  statSync(videoPath)
        const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
        const end = size - 1;
        const chunkSize = (end - start) + 2;
        
            console.log('=================================================='.green);
            console.log(`> Iniciando o Streaming padrão de ${query}`.green)
            console.log('=================================================='.green);

        res.set({
            'Content-Range': `bytes ${start}-${end}/${size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4'
        })
        
        
        input_file.on('open',()=> input_file.pipe(res))
        return
        // res.set({
        //     'Content-Length': size,
        //     'Content-Type': 'video/mp4'
        //   });
        //     console.log(convertVideoName)
        // console.log(`> Iniciando o Streaming de ${query}....`)


        // console.log(input_file)
        
        // const ffmpeg = spawn(ffmepgExt,[
        // '-hwaccel','auto','-i'
        // ,'pipe:0','-c:v','libx264','-preset','fast',
        // '-crf','22','-f','mp4','-movflags','frag_keyframe',
        // 'pipe:1'])
        // input_file.pipe(ffmpeg.stdin);
        // res.status(200)
        
        // input_file.on('open',()=> {
        //     ffmpeg.stdout.pipe(res)
        //     console.log('> Iniciando a conversão....')})
        //     ffmpeg.stderr.on('data',data => console.log(String(data.toString()).yellow.bgRed) )
        //     ffmpeg.stdout.on('end',()=> ffmpeg.stdout.pipe(res))
        
},
    subtitleConvert: async (input)=> new Promise((resolve,reject) =>  {
        const ext = path.extname(input)
        console.log(input)
        const output = String(input).replace(ext,'.vtt')
        const process = spawn(
            ffmepgExt,[
        "-sub_charenc",
            "ISO-8859-1",
            "-scodec",
            'srt',
            '-i'
            ,input,
            output,
                ])
        process.stderr.on('error',(e)=> reject(e))
        process.stderr.on('data',data => console.log(data.toString()))
        process.stderr.on('end',(e)=> resolve(e))
        // process = child_Process.spawn(ffmepgExt,['-i',input,output])
         
    })
}