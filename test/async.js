
const waiting  = () => { setTimeout(() => {
    console.log('Hi Ia m an async function')
}, 3000)
}




const test = async () => {
    await waiting()
    console.log('Hi Ia m the 2nd line')
}


test()