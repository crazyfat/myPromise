(function (){
    var msg = 'My Name is LiLei'
    function do1(){
        console.log(`do some thing :${msg.toUpperCase()}`)
    }
    function do2(){
        console.log(`do some thing :${msg.toLowerCase()}`)
    }
    window.myModel = {
        do1,
        do2
    }
})(window)