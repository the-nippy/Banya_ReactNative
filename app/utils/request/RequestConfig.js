/**
 created by Lex. 2019/7/29
 **/

const BASE = 'https://douban-api.uieee.com/v2';
// const BASE = 'https://douban-api.now.sh/v2';

export const URLS = {
  MOVIE: {
    Top250: BASE + '/movie/top250',
    New_Movie: BASE + '/movie/new_movies',
    In_Theater: BASE + '/movie/in_theaters',
    Coming_Soon: BASE + '/movie/coming_soon',
    Weekly: BASE + '/movie/weekly',
    US_Box: BASE + '/movie/us_box',
    Detail: BASE + '/movie/subject/',
    Celebrity:BASE+'/movie/celebrity/',
  },

  MAP: {
    COORDS: 'https://apis.map.qq.com/ws/geocoder/v1'
  }


}

