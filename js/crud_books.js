const getData = () => {
   fetch('https://books-app5.herokuapp.com/api/books').then(
      res => {
         return res.json()
      }
   ).then(
      data => {
         // console.log(data)
         let booksContainer = document.querySelector('#all-books');
         booksContainer.innerHTML = '';
         data.forEach((book) => {
            booksContainer.innerHTML += `
         <tr data-id="${book.id}">
         <td> ${book.bookName}</td>
         <td>$ ${book.bookPrice}</td>
         <td><img src="images/book${book.bookPicture}.jpeg" alt="book"></td>
         <td>
           <button class="btn waves-effect waves-light edit-btn">Edit
             <i class="material-icons right">edit</i>
           </button>
           <button class="btn waves-effect waves-light delete-btn">Delete
             <i class="material-icons right">delete</i>
           </button>
         </td>
       </tr>
         `
         })
      }
   )
}

getData()


const postData = (e) => {
   e.preventDefault();
   const bookName = document.querySelector('#book_name');
   const bookPrice = document.querySelector('#book_price');
   const bookImage = document.querySelector('#sel-img');
   let modal = document.querySelector('#modal1');
   const options = {
      method: 'POST',
      body: JSON.stringify({
         bookName: bookName.value,
         bookPrice: bookPrice.value,
         bookPicture: bookImage.value
      }),
      headers: {
         'Accept': 'application/json',
         'Content-type': 'application/json'
      }

   }
   fetch('https://books-app5.herokuapp.com/api/books', options).then(
      res => {

         return res.json()
      }
   ).then(
      data => {
         console.log(data)
         getData()
      }
   )
   bookName.value = '';
   bookPrice.value = '';
   bookImage.value = '';

   modal.classList.remove('modal-show')
}
document.querySelector('.modal-add').addEventListener('click', postData);

const deletData = (e) => {

   if (e.target.classList.contains('delete-btn')) {
      let bookId = e.target.closest('tr').dataset.id;
      const options = {
         method: 'DELETE'
      }
      fetch(`https://books-app5.herokuapp.com/api/books/${bookId}`, options).then(
         res => {
            return res.json();
         }
      ).then(
         data => {
            console.log(data);
         }
      )
      let bookContainer = e.target.closest('tr');
      bookContainer.remove();
   }

}
document.addEventListener('click', deletData);



const editData = (e) => {
   // if (e.target.classList.contains('edit-btn')) {
   // let bookId = e.target.closest('tr').dataset.id;
   e.preventDefault();
   const bookItem = document.querySelector(`[data-id = "${currentEditBook}"]`);
   const bookName = document.querySelector('#book_name_edit');
   const bookPrice = document.querySelector('#book_price_edit');
   const bookImage = document.querySelector('#sel-img-edit').value;
   // bookItem.children[0].innerText = bookName.value;
   // bookItem.children[1].innerText = bookPrice.value;
   // bookItem.children[2].children[0].src = `images/book${bookImage}.jpeg`;
   const options = {
      method: 'PUT',
      body: JSON.stringify({
         bookName: bookName.value,
         bookPrice: bookPrice.value,
         bookPicture: bookImage.value
      }),
      headers: {
         'Accept': 'application/json',
         'Content-type': 'application/json'
      }
   }
   fetch(`https://books-app5.herokuapp.com/api/books/${currentEditBook}`, options).then(
      res => {

         return res.json()
      }
   ).then(
      data => {
         console.log(data);
         getData()
      }
   )
   closeModalEdit();

   // }
}
document.querySelector('.modal-add-edit').addEventListener('click', editData);