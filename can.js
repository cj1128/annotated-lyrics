const axios = require("axios")
const fs = require("fs")
const cheerio = require("cheerio")
const path = require("path")
const { execSync } = require("child_process")

const URL = "http://jyut6.com/lrc.show.php"

const baseHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <article>
      $content
    </article
  </body>
</html>
`

const genHTML = html => {
  const $ = cheerio.load(html, {
    decodeEntities: false,
  })

  let result = `
    <header>
      <h1>${$(".songInfo h1").html()}</h1>
      <p class="singer">${$(".songInfo p").eq(0).html()}</p>
      <p class="lyricist">${$(".songInfo p").eq(1).html()}</p>
    </header>
  `

  result += `
    <main>
    ${$(".songLrc").html()}
    </main>
  `

  return baseHTML.replace("$content", result)
}

// get song title from html
const getTitle = html => {
  const $ = cheerio.load(html, {
    decodeEntities: false,
  })

  return $("title").text().match(/《(.+)》/)[1]

}

const genCAN = async (styleFile, id, outputPath) => {
  const res = await axios.get(URL, {
    params: {
      id,
    },
  })

  const html = genHTML(res.data)
  const filePath = `/tmp/${Date.now().txt}`
  fs.writeFileSync(filePath, html)

  if(outputPath == null) {
    outputPath = path.join("pdfs", getTitle(res.data) + ".pdf")
  }

  execSync(`prince ${filePath} -s ${styleFile} -o ${outputPath}`, {
    timeout: 10 * 1000, // 10 seconds
  })
}

module.exports = genCAN
