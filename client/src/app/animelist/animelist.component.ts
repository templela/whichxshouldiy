import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { HttpClient } from '@angular/common/http';
import { AnimeList } from '../../../../server/node_modules/jikants/dist/src/interfaces/user/AnimeList';

@Component({
  selector: 'app-animelist',
  templateUrl: './animelist.component.html',
  styleUrls: ['./animelist.component.css']
})
export class AnimelistComponent implements OnInit {

  displayedColumns: string[] = ['mal_id', 'title', 'total_episodes', 'watching_status'];
  // animelist = new MatTableDataSource(DEFAULT_DATA);
  animelistRAW: AnimeList[];
  animelist: MatTableDataSource<AnimeList>;

  url = 'http://localhost:8080/users/ztary/list';

  @ViewChild(MatSort, {static: false}) sort: MatSort;


  constructor(private http: HttpClient) { }

  async ngOnInit() {

    this.animelistRAW = await this.getAnimeList();
    this.animelist = new MatTableDataSource(this.animelistRAW);

    this.animelist.sort = this.sort;

  }

  async getAnimeList() {
    return new Promise<AnimeList[]>(async (resolve, reject) => {

    await this.http
      .get(this.url)
      .subscribe(resp => {
        console.log(resp);
        resolve(resp as AnimeList[]);
      });

    })
  }
}