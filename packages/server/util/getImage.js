const superagent = require('superagent')
module.exports = async function getImage(name) {
  const safeName = name.replace(/\W/g, '%20')
  const url = `https://api.qwant.com/api/search/images`

  try {
    const response = await superagent.get(url).set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36').query({
      count: 1,
      q: safeName,
      t: 'images',
      uiv: 4
    })
    return response.body.data.result.items[0].media_preview
  }
  catch (e) {
    return 'https://via.placeholder.com/350'
  }
}