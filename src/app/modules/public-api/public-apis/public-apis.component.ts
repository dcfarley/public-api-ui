import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PublicApiService } from '../../../core/services/public-api/public-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { API } from 'src/app/core/models/API/api.model';

@Component({
  selector: 'app-public-apis',
  templateUrl: './public-apis.component.html',
  styleUrls: ['./public-apis.component.scss']
})
export class PublicApisComponent implements OnInit, OnDestroy, AfterViewInit {
  private entriesSub: any;
  private categoriesSub: any;
  private entries: Array<API> = new Array<API>();
  public categories: Array<string> = new Array<string>();
  public category: string = 'All';
  public dataSource: MatTableDataSource<API> = new MatTableDataSource<API>();
  public displayedColumns: string[] = ['api', 'description', 'auth', 'https', 'cors', 'link', 'category'];
  public httpsOptions: string[] = ['All', 'true', 'false'];
  public httpsOption: string = 'All';
  public authOptions: string[] = ['All', 'apiKey', 'OAuth'];
  public authOption: string = 'All';
  public description: string = '';
  public filtersHidden: boolean = false;

  private paginator!: MatPaginator;
  private sort!: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor(private publicApiService: PublicApiService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getEntries();
  }

  ngOnDestroy(): void {
    this.entriesSub.unsubscribe();
    this.categoriesSub.unsubscribe();
  }

  getEntries() {
    this.entriesSub = this.publicApiService.getEntries().subscribe(data => {
      this.entries = data;
      this.filterDataSet();
    });
  }

  getCategories() {
    this.categoriesSub = this.publicApiService.getCategories().subscribe(data => {
      this.categories = data;
      this.categories.unshift('All');
      this.filterDataSet();
    });
  }

  setDataSourceAttributes() {
    this.filterDataSet();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterDataSet() {
    this.dataSource.data =
      this.entries
        .filter(x => this.category === 'All' || x.category === this.category)
        .filter(x => this.authOption === 'All' || x.auth === this.authOption)
        .filter(x => this.httpsOption === 'All' || x.https == this.httpsOption)
        .filter(x => !this.description || x.description.toLowerCase().indexOf(this.description.trim().toLowerCase()) > -1);
  }

  resetFilters() {
    this.category = 'All';
    this.authOption = 'All';
    this.httpsOption = 'All';
    this.description = '';
    this.filterDataSet();
  }

  toggleFilters() {
    this.filtersHidden = !this.filtersHidden;
    this.filtersHidden ? this.dataSource.data = this.entries : this.filterDataSet();
  }
}
