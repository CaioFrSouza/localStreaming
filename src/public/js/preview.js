const eps = $('.eps')
const title = $('.card-title ')
const locationSearch = window.location.search
const locationSearchContent = locationSearch.split('=')[1]
console.log(locationSearchContent)
console.log(locationSearch)
$(document).ready(()=> {
    const cards = $('.card-body .eps li a')
    cards.each((index,element)=> {
        console.log(element)
        const data = element.dataset.idTemp
        const data_ep = element.dataset.idep
        console.log(data_ep)
        if(data)
        $(element).click(e => {
            window.location.replace(`${locationSearch}/${data}`)
            console.log(data)

        })
        if(data_ep)
        $(element).click(e => {
            window.location.replace(`video${locationSearch}/${data_ep}&&title=${$('h1.title').text()}`)
        })
    })
})