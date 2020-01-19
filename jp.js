const fs = require("fs-extra")
const Kuroshiro = require("kuroshiro")
const Analyzer = require("kuroshiro-analyzer-kuromoji")
const { execSync } = require("child_process")
const path = require("path")

const kuroshiro = new Kuroshiro()

// return: Lyric Object
//  title: string
//  singer: string
//  lines: [Object]
//    conotent: string
//    translation: string?
const parseLyric = str => {
  const result = {}
  // need to consider Windows!
  const lines = str.trim().replace(/\r\n/g, "\n").split("\n")

  result.title = lines[0]
  result.singer = lines[1]
  result.lines = []

  for(let line of lines.slice(2)) {
    if(line === "") {
      result.lines.push({})
      continue
    }

    const lastLyric = result.lines[result.lines.length - 1]

    if(lastLyric.content) {
      lastLyric.translation = line
    } else {
      lastLyric.content = line
    }
  }

  return result
}

const baseHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    $content
  </body>
</html>
`

// 处理汉字，添加标注
const processContent = async line => {
  const result = await kuroshiro.convert(line, {
    mode: "furigana",
    to: "hiragana",
  })

  // 为了保持对齐效果，如果一行没有标注，会加上一个空白标注
  if(result === line) {
    return `
      <ruby>
        ${[...line][0]}
        <rp>(</rp>
        <rt>&nbsp;</rt>
        <rp>)</rp>
      </ruby>
      ${[...line].slice(1).join("")}
    `
  }

  // 特别处理，目前 Kuroshiro 对 `渡鳥` 的处理不对
  const w1 = "<ruby>渡<rp>(</rp><rt>わたりど</rt><rp>)</rp></ruby>り<ruby>鳥<rp>(</rp><rt></rt><rp>)</rp></ruby>"
  const s1 = "<ruby>渡<rp>(</rp><rt>わた</rt><rp>)</rp></ruby>り<ruby>鳥<rp>(</rp><rt>どり</rt><rp>)</rp></ruby>"

  if(result.includes(w1)) {
    return result.replace(w1, s1)
  }

  return result
}

const genHTML = async lyric => {
  const processedSinger = await processContent(lyric.singer)

  let result = `
    <h1>${lyric.title}</h1>
    <h2>${processedSinger}</h2>
    <main>
  `

  for(let line of lyric.lines) {
    const processedContent = await processContent(line.content)

    result += `<div class="line"><p class="content">${processedContent}</p>`

    if(line.translation) {
      result += `<p class="translation">${line.translation}</p>`
    }

    result += "</div>"
  }

  result += "</main>"

  return baseHTML.replace("$content", result)
}

// styleFile: string
// inputPath: string
// outputPath: string?
const genPDF = async (styleFile, inputPath, outputPath) => {
  await kuroshiro.init(new Analyzer)
  const lyric = parseLyric(fs.readFileSync(inputPath, "utf8"))
  const html = await genHTML(lyric)
  const filePath = `/tmp/${Date.now().txt}`
  fs.writeFileSync(filePath, html)

  if(outputPath == null) {
    outputPath = path.join("pdfs", path.basename(inputPath, ".txt") + ".pdf")
  }

  // mkdirp
  await fs.mkdirp(path.dirname(outputPath))

  execSync(`prince ${filePath} -s ${styleFile} -o ${outputPath}`, {
    timeout: 10 * 1000, // 10 seconds
  })

  console.log(`Generate pdf at: ${ outputPath }`)
}

module.exports = genPDF
