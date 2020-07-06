import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../_services/service/article.service';
import { Article } from '../_services/model/article';


@Component({
  selector: 'app-articleview',
  templateUrl: './articleview.component.html',
  styleUrls: ['./articleview.component.css']
})
export class ArticleviewComponent implements OnInit {
  objArticle: Article = {} as any;
  identity: number = 0;
  constructor(private articleService: ArticleService,
    private aroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.aroute.paramMap.subscribe(params => {
      this.identity = +params.get('id');
      if (this.identity > 0) {
        this.articleService.getArticleById(this.identity)
          .subscribe(
            (data: Article) => {
              this.objArticle = data;
            },
            (err: any) =>
              console.log(err)
          );
      }
    });
  }
}


