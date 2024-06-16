import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from '../layout/layout.component';


@Component({
  selector: 'app-database',
  standalone: true,
  imports: [ MatTableModule,MatPaginator,MatSort,MatFormFieldModule,MatInputModule,HttpClientModule, LayoutComponent],
  templateUrl: './database.component.html',
  styleUrl: './database.component.css'
})
export class DatabaseComponent {
  displayedColumns: string[] = ['artists', 'track', 'album', 'year', 'spotifyTrack', 'features', 'tags'];

  constructor(private http: HttpClient) { }

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchRequest = 
    {
    "artist": "artist value",
    "track": "track value"
  };

  ngOnInit() {
    this.http.post<any>('http://localhost:8080/database/search', this.searchRequest).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.tracks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
