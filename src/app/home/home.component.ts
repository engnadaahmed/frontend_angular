import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true, // Mark as standalone
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ngOnInit() {


  }
  errorMessage: string = '';
  errorDetails: string[] = [];
  activeSection: string = 'add-movie';
  searchQuery: string = '';
  movies: any = { content: [], page: { size: 10, number: 0, totalElements: 0, totalPages: 0 } };
  newMovie: any = {
    title: '',
    year: '',
    rated: '',
    released: '',
    runtime: '',
    genre: '',
    director: '',
    writer: '',
    actors: '',
    plot: '',
    language: '',
    country: '',
    awards: '',
    poster: '',
    metascore: '',
    imdbRating: '',
    imdbVotes: '',
    imdbID: '',
    type: '',
    dvd: '',
    boxOffice: '',
    production: '',
    website: '',
    response: '',
  };
  selectedFile: File | null = null;
  currentPage: number = 0;

  constructor(private http: HttpClient, private router: Router) { }
  // http = inject(HttpClient);


  showSection(section: string) {
    this.activeSection = section;
    if (section === 'view-movies') {
      this.fetchMovies();
    }
  }
  // Helper function to create headers with the Authorization token
  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  fetchMovies() {
    const headers = this.getHeaders();
    const url = `http://localhost:8080/movies?page=${this.currentPage}&size=10`;
    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        this.movies = response;
      },
      (error) => {
        console.error('Failed to fetch movies', error);
      }
    );
  }

  addMovie() {
    const headers = this.getHeaders();
    this.http.post('http://localhost:8080/movies', this.newMovie, { headers }).subscribe(
      (response: any) => {
        console.log('Movie added successfully!', response);
        alert('Movie added successfully!');
        this.newMovie = { title: '', year: '', rated: '', released: '', runtime: '', genre: '', director: '', writer: '', actors: '', plot: '', language: '', country: '', awards: '', poster: '', metascore: '', imdbRating: '', imdbVotes: '', imdbID: '', type: '', dvd: '', boxOffice: '', production: '', website: '', response: '' };
        this.errorMessage = '';
        this.errorDetails = [];
        this.fetchMovies();
      },
      (error) => {
        if (error.status === 400) { // Handle validation errors (400 Bad Request)
          const errorResponse = error.error; // Extract the error response body
          if (errorResponse.message && errorResponse.details) {
            // Set the error message and details
            this.errorMessage = errorResponse.message;
            this.errorDetails = errorResponse.details;
          } else {
            this.errorMessage = 'An unknown error occurred. Please try again.';
          }
        } else if (error.status === 403) { // Handle permission errors (403 Forbidden)
          this.errorMessage = 'You do not have permission to perform this action.';
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
      }
    );
  }

  deleteMovie(movieId: number) {
    const headers = this.getHeaders();
    this.http.delete(`http://localhost:8080/movies/${movieId}`, { headers }).subscribe(
      (response: any) => {
        alert('Movie deleted successfully!');
        this.fetchMovies();
      },
      (error) => {
        console.error('Failed to delete movie', error);
      }
    );
  }

  deleteSelectedMovies() {
    const headers = this.getHeaders();
    const selectedMovies = this.movies.content.filter((movie: any) => movie.selected);
    const movieIds = selectedMovies.map((movie: any) => movie.id);

    this.http.delete('http://localhost:8080/movies/batch', { body: { ids: movieIds }, headers }).subscribe(
      (response: any) => {
        alert('Selected movies deleted successfully!');
        this.fetchMovies();
      },
      (error) => {
        console.error('Failed to delete movies', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile); // Debugging line
  }

  uploadBatchMovies() {
    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    console.log('FormData:', formData); // Debugging line
    const headers = this.getHeaders();
    this.http.post('http://localhost:8080/movies/batch', formData, { headers }).subscribe(
      (response: any) => {
        alert('Batch movies uploaded successfully!');
        this.fetchMovies();
      },
      (error) => {
        console.error('Failed to upload batch movies', error);
      }
    );
  }

  deleteBatchMovies() {
    this.deleteSelectedMovies();
  }

  searchMovies() {
    const headers = this.getHeaders();
    const url = `http://localhost:8080/movies/search?title=${this.searchQuery}&page=${this.currentPage}&size=10`;
    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        this.movies = response;
      },
      (error) => {
        console.error('Failed to search movies', error);
      }
    );
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchMovies();
    }
  }

  nextPage() {
    if (this.currentPage < this.movies.page.totalPages - 1) {
      this.currentPage++;
      this.fetchMovies();
    }
  }
  viewMovieDetails(movieId: number) {
    this.router.navigate(['/movies', movieId]); // Navigate to the movie details page
  }

}
