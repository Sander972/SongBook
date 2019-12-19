import { Component } from '@angular/core';
declare var require: any;
var  jsonBook = require('../../assets/book.json');

jsonBook.songs.forEach(el => {
  if(el.text.length > 10){
    //console.log(el.text.slice(0,40))
    el["prem"] = el.text.slice(0,50) + "..."
  }
});
//console.log(jsonBook);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  book = jsonBook.songs;


  constructor() {}

  ngOnInit(){
  }

}
