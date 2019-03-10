export const getData = function(){
    return new Date().toISOString().substr(0, 10);
}