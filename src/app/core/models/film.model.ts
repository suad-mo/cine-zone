export interface Film {
  id: number;
  title: string;
  genre: string[]; // Array of genres
  duration: number; // in minutes
  description: string;
  image: string; // URL to the film's poster or image
}

// releaseDate: Date; // Release date of the film
// rating: number; // Rating out of 10
// trailerUrl: string; // URL to the film's trailer
// director: string; // Director of the film
// cast: string[]; // Array of cast members
