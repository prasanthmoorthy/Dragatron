import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from '../_services/service/article.service';
import { Article } from '../_services/model/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  //Component properties
  allArticles: Article[];
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;

  SearchBy: string = '';
  SearchKeyword: string = '';
  searchText;
  //Create form
  articleForm = new FormGroup({
    ItemName: new FormControl('', Validators.required),
    ItemImage: new FormControl('', Validators.required),
    Itemprice: new FormControl('', Validators.required),
    Itemdescription: new FormControl('', Validators.required),
    ItemadditionDate: new FormControl('', Validators.required),
  });

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.getAllArticles();
  }

  getAllArticles() {
    this.articleService.getAllArticles().subscribe(
      (data) => (this.allArticles = data),
      (errorCode) => (this.statusCode = errorCode)
    );
  }

  onArticleFormSubmit() {
    this.processValidation = true;
    if (this.articleForm.invalid) {
      return;
    }

    let article = this.articleForm.value;
    if (this.articleIdToUpdate === null) {
      this.articleService.getAllArticles().subscribe((articles) => {
        let maxIndex = articles.length - 1;
        let articleWithMaxIndex = articles[maxIndex];
        let articleId = articleWithMaxIndex.id + 1;
        article.id = articleId;

        this.articleService.createArticle(article).subscribe(
          (data) => {
            if (data != null) {
              alert('Added Successfully');
              this.articleForm.reset();
              this.processValidation = false;
            }
            this.getAllArticles();
          },
          (errorCode) => (this.statusCode = errorCode)
        );
      });
    }
  }

  deleteArticle(articleId: string) {
    this.articleService.deleteArticleById(articleId).subscribe(
      (data) => {
        if (data) {
        } else {
          alert('Deleted Successfully');
        }
        this.getAllArticles();
      },
      (errorCode) => (this.statusCode = errorCode)
    );
  }
}
