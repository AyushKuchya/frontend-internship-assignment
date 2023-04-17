import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { SubjectsService } from '../../core/services/subjects.service';
import { Book } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  allBooks: Book[] = [];
  subjectName = '';
  isLoading: boolean =true

  constructor(private subjectsService: SubjectsService) {
    this.bookSearch = new FormControl('');
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      ).
      subscribe((value: string) => {
        this.subjectName=value
        this.subjectsService.getAllBooks(value).subscribe((data) => {
          this.allBooks = data?.works;
          this.isLoading=false
          // this.subjectsArray = data;
        });
        this.isLoading=true
        console.log(this.allBooks)
       
      });
      
  } 
}
