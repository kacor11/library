let myLibrary = [];
let bookNumber = 0;
let submit = document.querySelector('.enter')
let buttons = document.querySelectorAll('button')


function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(bookArgs) {
    let newBook = new Book(...bookArgs);
    myLibrary.push(newBook);
}

let tolkien = new Book('lotr', 'tolkien', '5645', 'yes');
let rowling = new Book('potter', 'rowling', '456', 'no');
myLibrary.push(tolkien);
myLibrary.push(rowling);
render();

function buttonStatus() {
    let click = document.querySelectorAll('.click')    
    click.forEach((btn) => { if (btn.getAttribute('data-number') == bookNumber) {
    btn.addEventListener('click', () => 
    readStatus(btn)
)}})}

function readStatus(click) {
    (click.innerHTML === 'Yes') ? click.innerHTML = 'No' : click.innerHTML = 'Yes'
}


function createReadButton(i, tableCell, tableRow, isRead) {
    button = document.createElement('button')
    button.setAttribute('data-number', bookNumber)
    button.innerHTML = isRead
    button.classList.add(`button${i}`)
    button.classList.add('click')
    tableCell.appendChild(button)
    tableRow.appendChild(tableCell)
}

function insertDeleteButton(tableRow) {
    let tableCell = document.createElement('td')
    tableCell.classList.add('trashcan')
    deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('data-number', bookNumber)
    deleteBtn.innerHTML = '<img src="kosz.png" />'
    deleteBtn.classList.add('deleteBtn')
    tableCell.appendChild(deleteBtn)
    tableRow.appendChild(tableCell)
}

function deleteBook() { 
    let deleteBtns = document.querySelectorAll('.deleteBtn')    
    deleteBtns.forEach(deleteBtn => { 
        if(deleteBtn.getAttribute('data-number') == bookNumber) {
            deleteBtn.addEventListener('click', () => {
            let rowToRemove = document.querySelector(`tr[data-number = '${deleteBtn.getAttribute('data-number')}'`)
            rowToRemove.remove()
    })}})
}
            


function render() {
    let tableBody = document.querySelector('.body')

    for(let i = bookNumber; i < myLibrary.length; i++) {        
            let tableRow = document.createElement('tr');
            tableRow.setAttribute('data-number', bookNumber)
            for(let key in myLibrary[i]) {                                
                let tableCell = document.createElement('td')
                if (key === 'read') {
                    myLibrary[i][key] === 'read' ? createReadButton(i, tableCell, tableRow, 'Yes')  : createReadButton(i, tableCell, tableRow, 'No')               
                } else {
                    tableCell.innerText = myLibrary[i][key];
                    tableRow.appendChild(tableCell)
                    
                }
                
        } 
        insertDeleteButton(tableRow)
        tableBody.insertAdjacentElement("afterbegin",tableRow);  
        deleteBook()
        buttonStatus()    
        bookNumber ++                                   
}
}


submit.addEventListener('click', (e) => {
    e.preventDefault();
    let form = document.querySelector('form')
    let bookArgs = []
    
    
    for(let element of form.elements) {
        if (element.className === 'read') {
            element.checked ? bookArgs.push('read') : bookArgs.push('not read');
            element.checked = 'false'
        } else {
            bookArgs.push(element.value)
            if (element.className !== "enter"){
                element.value = "";
            }
        }
    }
    
addBookToLibrary(bookArgs)
render() 
})
