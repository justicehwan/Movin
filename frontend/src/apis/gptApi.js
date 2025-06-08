// src/apis/gptApi.js
import axios from 'axios'

export async function fetchCharacterRecommendation(characterInfo) {
  return axios.post('http://localhost:8000/recommend/character/', {
    character_info: characterInfo
  })
}











// // GPT 추천 요청 API
// import axios from 'axios'

// export async function fetchCharacterRecommendation(character, movies) {
//   try {
//     const response = await axios.post('/recommend/', {
//       character,
//       movies
//     })
//     // 백엔드는 문자열 형태 JSON 응답을 보내므로 파싱 필요
//     return JSON.parse(response.data.recommendation)
//   } catch (error) {
//     console.error('GPT 추천 실패:', error)
//     throw error
//   }
// }
