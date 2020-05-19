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


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // Figure out a way to bind thhis properly
  timeRankWeight: number = 3;
  membersRankWeight: number = 3;
  scoreRankWeight: number = 7;
  constructor(private http: HttpClient) { }

  async ngOnInit() {

    this.animelistRAW = await this.getAnimeList();
    this.animelist = new MatTableDataSource(this.animelistRAW);
    this.animelist.sort = this.sort;
    this.animelist.filter = this.filter;
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

  setTimeRankWeight(event: MatSliderChange) {
    this.timeRankWeight = event.value;
    this.refreshAnimelist();
  }

  setMembersRankWeight(event: MatSliderChange) {
    this.membersRankWeight = event.value;
    this.refreshAnimelist();
  }

  setScoreRankWeight(event: MatSliderChange) {
    this.scoreRankWeight = event.value;
    this.refreshAnimelist();
  }

  async refreshAnimelist() {
    // console.log(`Refresh with weightings - time${this.timeRankWeight} score${this.scoreRankWeight} mem${this.membersRankWeight}`);
    await this.reRank();

    this.animelist.filteredData.forEach((anime) => {
      anime.rank = this.getRank(anime, this.animelist.filteredData.length);
    });

    this.animelist = new MatTableDataSource(this.animelistRAW);
    this.animelist.sort = this.sort;
    this.animelist.filter = this.filter;

    const filteredrank = [];
    this.animelist.filteredData.forEach((anime) => {
      filteredrank.push(anime.rank);
    });
    filteredrank.sort((a,b)=>a-b);
    this.animelist.filteredData.forEach((anime) => {
      anime.rank = filteredrank.indexOf(anime.rank) + 1;
    });

    this.animelist.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter = filterValue.trim().toLowerCase();
    this.animelist.filter = filterValue.trim().toLowerCase();
    this.refreshAnimelist();
  }

  async reRank() {
    const filtered_time = [];
    const filtered_score = [];
    const filtered_members = [];
    this.animelist.filteredData.forEach((anime) => {
      filtered_time.push(anime.duration_minutes);
      filtered_score.push(anime.score);
      filtered_members.push(anime.members);
    });
    // console.log(filtered_score);
    filtered_time.sort((a,b)=>a-b);    //asc
    filtered_score.sort((a,b)=>b-a);   //desc
    filtered_members.sort((a,b)=>a-b); //asc
    // console.log(filtered_score);
    this.animelist.filteredData.forEach((anime) => {
      anime.ranking_duration =  filtered_time.indexOf(anime.duration_minutes) + 1;
      anime.ranking_score =     filtered_score.indexOf(anime.score) + 1;
      anime.ranking_members =   filtered_members.indexOf(anime.members) + 1;
    });
  }

  getRank(anime: CustomAnime, length: number): number {
    // console.log(anime);

    // // Prioritizes the position EXACTLY where the value is (lower is better, higher rank)
    // //    1  gives a positive linear distribution
    // //    5  gives a v shaped linear distribution with the best value at the 50th percentile
    // //    10 gives a negative liear distribution
    function abs(ranking: number, weight: number) {
      return Math.floor(Math.abs(length*weight/10 - ranking));
    }

    // Prioritizes values
    //    1  gives a positive linear distribution
    //    5  gives a flat linear distibution (i.e. NOT AFFTECTIVE)
    //    10 would a negative linear distribution
    function lin(ranking: number, weight: number) {
      return Math.floor((1 - weight/5) * ranking + length * (weight/10));
    }

    // Set the type of ranking we want to use.
    // const func = abs;
    const func = lin;

    const rank = (
      func(anime.ranking_duration, this.timeRankWeight) +
      func(anime.ranking_score,    10 - this.scoreRankWeight) + //This is because we want a 10 to behave inversely (10 gives lower ranks)
      func(anime.ranking_members,  this.membersRankWeight)
    );

    // console.log(rank);
    return rank;
  }

  logRank(prefix: string) {
    this.animelist.filteredData.forEach((anime) => {
      console.log(`${prefix} ID:${anime.mal_id}\tRank:${anime.rank}\tdur${anime.ranking_duration}\tscr${anime.ranking_score}\tmem${anime.ranking_members}`);
    });
  }
}