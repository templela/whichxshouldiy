import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { HttpClient } from '@angular/common/http';
import { AnimeList } from '../../../../server/node_modules/jikants/dist/src/interfaces/user/AnimeList';
import { CustomAnime } from '../../../../server/src/anime/anime-list.service.spec'
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-animelistcustom',
  templateUrl: './animelistcustom.component.html',
  styleUrls: ['./animelistcustom.component.css']
})
export class AnimelistCustomComponent implements OnInit {
  url = 'http://localhost:8080/users/ztary/customlist';

  displayedColumns: string[] = ["mal_id", "watching_status_plain", "title_english", "studio", "type", "total_episodes", "duration_minutes", "ranking_duration", "score", "ranking_score", "members", "ranking_members", "year", "rank"];
  // animelist = new MatTableDataSource(DEFAULT_DATA);
  animelistRAW: CustomAnime[];
  animelist: MatTableDataSource<CustomAnime>;
  filter: string;


  @ViewChild(MatSort, {static: false}) sort: MatSort;

  timeRank = 1;
  membersRank = 1;
  scoreRank = 1;
  constructor(private http: HttpClient) { }

  async ngOnInit() {

    this.animelistRAW = await this.getAnimeList();
    this.refreshAnimelist();

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

  setTimeRank(event: MatSliderChange) {
    this.timeRank = event.value;
    this.refreshAnimelist();
  }

  setMembersRank(event: MatSliderChange) {
    this.membersRank = event.value;
    this.refreshAnimelist();

  }

  setScoreRank(event: MatSliderChange) {
    this.scoreRank = event.value;
    this.refreshAnimelist();
  }

  refreshAnimelist() {
    this.animelistRAW.forEach((anime) => {
      anime.rank =
        this.timeRank * anime.ranking_duration +
        this.scoreRank * anime.ranking_score +
        this.membersRank * anime.ranking_members;
    });
    this.animelist = new MatTableDataSource(this.animelistRAW);
    this.animelist.sort = this.sort;
    this.animelist.filter = this.filter;
    // const ranks = [];
    // this.animelist.filteredData.forEach((anime) => {
    //   ranks.push(anime.rank);
    // });
    // ranks.sort();
    // this.animelist.filteredData.forEach((anime) => {
    //   anime.rank = ranks.indexOf(anime.rank);
    // });
    // this.animelist.sort = this.sort
    // console.log(this.animelist.filteredData.length);
    // console.log(this.animelist.filteredData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter = filterValue.trim().toLowerCase();
    this.animelist.filter = filterValue.trim().toLowerCase();
  }


}