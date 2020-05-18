import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { HttpClient } from '@angular/common/http';
import { AnimeList } from '../../../../server/node_modules/jikants/dist/src/interfaces/user/AnimeList';
import { CustomAnime } from '../../../../server/src/anime/anime-list.service.spec'

@Component({
  selector: 'app-animelistcustom',
  templateUrl: './animelistcustom.component.html',
  styleUrls: ['./animelistcustom.component.css']
})
export class AnimelistCustomComponent implements OnInit {

  displayedColumns: string[] = ["mal_id", "watching_status_plain", "title_english", "studio", "type", "total_episodes", "duration_minutes", "ranking_duration", "score", "ranking_score", "members", "ranking_members", "year"];
  // animelist = new MatTableDataSource(DEFAULT_DATA);
  animelistRAW: CustomAnime[];
  animelist: MatTableDataSource<CustomAnime>;

  url = 'http://localhost:8080/users/ztary/customlist';

  @ViewChild(MatSort, {static: false}) sort: MatSort;


  constructor(private http: HttpClient) { }

  async ngOnInit() {

    this.animelistRAW = await this.getAnimeList();
    this.animelist = new MatTableDataSource(this.animelistRAW);

    this.animelist.sort = this.sort;

  }

  async getAnimeList() {
    return new Promise<CustomAnime[]>(async (resolve, reject) => {

    await this.http
      .get(this.url)
      .subscribe(resp => {
        console.log(resp);
        resolve(resp as CustomAnime[]);
      });

    })
  }
}