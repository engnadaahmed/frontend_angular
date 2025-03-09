import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  movie: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.fetchMovieDetails(movieId);
    } else {
      console.error('Movie ID is null or undefined');
      // Optionally, redirect the user or show an error message
    }
  }

  // Helper function to create headers with the Authorization token
  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  fetchMovieDetails(movieId: string) {
    const headers = this.getHeaders();
    this.http.get(`http://localhost:8080/movies/${movieId}`, { headers }).subscribe(
      (response: any) => {
        this.movie = response;
      },
      (error) => {
        console.error('Failed to fetch movie details', error);
      }
    );
  }
}
