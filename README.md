# запрос(ы) для вставки данных минимум о двух книгах в коллекцию books
```
db.library.insertMany(
   [ {
  title: "НоваяКнига1",
  description: "Описание1",
  authors: "Автор1"
} , {
  title: "НоваяКнига2",
  description: "Описание2",
  authors: "Автор2"
} ]
)
```
# запрос для поиска полей документов коллекции books по полю title
```
db.library.find( { title: "НоваяКнига2" } )
```
# запрос для редактирования полей: description и authors коллекции books по _id записи
```
db.library.update(
   { _id: 1 },
   {
     description: "Описание3",
     authors: "Автор3"
   }
)
```
