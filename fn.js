function outer(){
    console.log("i am outer");
    return function inner(){
        console.log("i am innner");
    }
}
inner();