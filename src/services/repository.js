
class Repository {

    //constructor(){}

    saveItems(items){
        localStorage.setItem('items', JSON.stringify([...items]));
    }

    getItems(){
        const items = JSON.parse(localStorage.getItem('items')) || [];
        return items;
    }

}

export default new Repository();