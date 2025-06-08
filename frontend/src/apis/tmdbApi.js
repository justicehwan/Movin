import axios from 'axios'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'ko-KR'
  }
})

async function fetchMultiplePages(endpoint, totalPages = 3) {
  const allResults = []
  for (let page = 1; page <= totalPages; page++) {
    const res = await tmdb.get(endpoint, {
      params: {
        language: 'ko-KR',
        region: 'KR',
        page,
      },
    })
    allResults.push(...res.data.results)
  }
  return allResults
}

// ✅ 인기 영화
export function fetchPopularMovies() {
  return fetchMultiplePages('/movie/popular', 9)
}

// ✅ 최고 평점 영화
export function fetchTopRatedMovies() {
  return fetchMultiplePages('/movie/top_rated', 3)
}

// ✅ 상영 중 영화
export function fetchNowPlayingMovies() {
  return fetchMultiplePages('/movie/now_playing', 3)
}

// ✅ 개봉 예정 영화
export function fetchUpcomingMovies() {
  return fetchMultiplePages('/movie/upcoming', 3)
}


// 🔍 장르 목록
export function fetchGenres() {
  return tmdb.get('/genre/movie/list').then(res => res.data.genres)
}

// 🔍 특정 장르로 영화 필터링
export function fetchMoviesByGenre(genreId) {
  return tmdb.get('/discover/movie', {
    params: { with_genres: genreId }
  }).then(res => res.data.results)
}
// 🔍 키워드로 영화 검색 (예: 'batman')
export function searchMoviesByKeyword(keyword) {
  return tmdb.get('/search/movie', {
    params: {
      query: keyword
    }
  }).then(res => res.data.results)
}
// // 🔍 영화 상세 정보 조회
// export function fetchMovieDetail(movieId) {
//   return tmdb.get(`/movie/${movieId}`).then(res => res.data)
// }
// 🔍 영화 예고편 (YouTube) 조회
export function fetchMovieVideos(movieId) {
  return tmdb.get(`/movie/${movieId}/videos`).then(res => res.data.results)
}
// 🔍 영화 제목으로 TMDB 포스터 + ID 검색
export async function fetchMovieByTitle(title) {
  try {
    const res = await tmdb.get('/search/movie', {
      params: {
        query: title
      }
    })

    const movie = res.data.results[0]
    if (!movie) return null

    return {
      id: movie.id,
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null
    }
  } catch (err) {
    console.error('TMDB 검색 오류:', err)
    return null
  }
}