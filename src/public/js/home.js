const fadeVel = 600

const includeCards = (targetAppend,title,text,img="images/default.png") =>  
$(targetAppend).append(`<div class="card">
<a href="/preview?search=${title}"><img  data-id=${title} src=${img} alt=""></a>

<div class="card-body" id=${title}>
    <h2 class="card-title">${title}</h2>
    <p class="card-text">${text}</p>
</div>
</div>`)
const hover = (contentCards) =>{
    console.log(contentCards)

contentCards.each((index,element ) => {
    console.log('init')
    console.log(element)
    $(element).hover((e)=> {
        id = `#${element.dataset.id}`
        console.log(id)
        console.log(id)
        console.log(e)
        if(e.type == "mouseenter"){
        if(id)
             return $(`${id}`).fadeIn(fadeVel)}
        $(id).fadeOut(fadeVel/2)
})
    

}) 
}
$(document).ready (async()=> {
    $.post('paths',sucess=> {
        console.log(sucess)
        for(let i in sucess.title){
            includeCards('.cards',sucess.title[i],'Clique na imagem para assistir',sucess.imgs[i])
        }
        const contentCards = $('.card img')
        hover(contentCards)
    })


})