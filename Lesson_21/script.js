const VALUE = 'children';
const allChildren = [];

const getJSON = (file, cb) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', file);
    xhr.send();
    
    xhr.addEventListener('load', () => {
        if (xhr.status !== 200) { 
            console.log(`Error of loading ${file}. ${xhr.status}: ${xhr.statusText}`);
            return;
        }

        cb && cb(JSON.parse(xhr.response));
    });
}


getJSON('./data.json', (data) => {
    allChildren.push(...data[VALUE]);
    getJSON('./data2.json', (data) => {
        allChildren.push(...data[VALUE]);
    });
});


console.log(allChildren);