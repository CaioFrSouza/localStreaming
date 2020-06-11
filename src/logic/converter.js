const fs = require('fs')
const child_Process = require('child_process')
const ffmepgExt = `./src/logic/FFMPEG/ffmpeg.exe`

module.exports = {
    convert:async(res,query,pathVideo) => {
        console.log(query)
        const input_file = fs.createReadStream(`${pathVideo}/${query}`)
        input_file.on('error',err=> console.log(err))
        const {size} = fs.statSync(`${pathVideo}/${query}`)
        const ffmpeg =child_Process.spawn(ffmepgExt,[
            '-i',
         'pipe:0',
          '-f',
           'mp4',
           "-vf",
           "scale=1280:720",
            '-movflags',
             'frag_keyframe',
              'pipe:1'])
              
        input_file.pipe(ffmpeg.stdin);
        ffmpeg.stderr.on('data', function (data) {
            return console.log(data.toString());
        });
        ffmpeg.stderr.on('end',()=> console.log('Arquivo convertido com sucesso'))
        return ffmpeg.stdout.pipe(res);
    }
}