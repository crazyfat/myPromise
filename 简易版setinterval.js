const mySetInterval = (callback, time) => {
  const fn = () =>{
      callback()
      setTimeout(()=>{
          fn()
      }, time)
  }
  setTimeout(fn, time)
}
mySetInterval(()=>{
    console.log('11')
}, 1000)